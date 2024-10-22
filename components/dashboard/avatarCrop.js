'use client'

import React, { useState, useEffect, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useSession } from 'next-auth/react';
import SpinnerSmallWhite from '../spinners/spinnerSmallWhite';


export default function AvatarCrop() {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('https://storage.googleapis.com/khs-zlin/avatars/User-avatar.svg.png');
  const [scale, setScale] = useState(1.2);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const editorRef = useRef(null);
  const inputRef = useRef(null);

  const { data: session, update } = useSession();




  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const maxFileSize = 2 * 1024 * 1024; 
  
    if (file) {
      if (file.size > maxFileSize) {
        alert('Velikost souboru je větší než 2 MB. Prosím, nahrajte menší obrázek.');
        return;
      }
  
      // Nastav náhled obrázku pro uživatele ještě před optimalizací
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setFeedback('Obrázek se optimalizuje...');
  
      
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        
        setLoading(true)
        const response = await fetch('/api/avatar-resize', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          const blob = await response.blob(); 
          const optimizedImageUrl = URL.createObjectURL(blob); 
          setLoading(false)
        
          setPreviewImage(optimizedImageUrl); 
          setFeedback('Obrázek byl úspěšně optimalizován.');
        } else {
          setFeedback('Chyba při optimalizaci obrázku');
        }
      } catch (error) {
        console.error('Chyba při volání API pro optimalizaci obrázku:', error);
        setFeedback('Chyba při optimalizaci obrázku.');
      }
    }
  };
  
  const handleUploadClick = () => {
    inputRef.current.click();
  };


  const getSignedUrl = async (fileName) => {
    try {
      
      const response = await fetch(`/api/upload-avatar?file=${fileName}`);
      if (!response.ok) {
        throw new Error('Failed to get signed URL');
      }
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Failed to get signed URL:', error);
      throw new Error('Failed to get signed URL');
    }
  };


  const handleImageUpload = async (blob, fileName) => {
    try {
      const signedUrl = await getSignedUrl(fileName);
      const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'image/png',
        },
        body: blob,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image');
      }
      return true;
    } catch (error) {
      console.error('Failed to upload image:', error);
      return false;
    }
  };

  function shiftCharsBy4(cleanUser) {
    let shiftedString = '';
    
    for (let i = 0; i < cleanUser.length; i++) {
   
        let shiftedChar = String.fromCharCode(cleanUser.charCodeAt(i) + 4);
        shiftedString += shiftedChar;
    }
    return encodeURIComponent(shiftedString);

}

 
  const handleSave = async () => {
    setFeedback('');

    if (!editorRef.current) {
      setFeedback('Editor nenalezen.');
      return;
    }

    setLoading(true);
    try {

      const imageBlob = await new Promise((resolve, reject) => {
        editorRef.current.getImage().toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create image blob'));
          }
        }, 'image/png');
      });

      
      let trimmedEmail = session.user.email;
      let avatarName = shiftCharsBy4(trimmedEmail);
      const fileName = `${avatarName}.png`;
      let avatarToSql = `https://storage.googleapis.com/khs-zlin/avatars/${fileName}`

     
      const success = await handleImageUpload(imageBlob, fileName);

      if (success) {
        setFeedback('Obrázek byl úspěšně nahrán.');

        await update(); 
     
       
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            operation: 'updateAvatar',
            user: session.user.email,
            avatar: avatarToSql
          })
        });

        if(response){
          setFeedback(`Uložení do databáze - OK.
            Je možné, že změna se projeví z důvodu zvolené 
            architektury webu až za několik minut.
            Pokud se vám stále neukáže nový obrázek bude asi uložený 
             v historii prohlížeče a bude potřeba ji trochu promazat (cache) `)
        }

        if (!response.ok) {
          throw new Error('Failed to update avatar in database');
        }
      } else {
        setFeedback('Nahrání obrázku selhalo.');
      }
    } catch (error) {
      console.error('Error saving avatar:', error);
      setFeedback('Nahrání obrázku selhalo.');
    } finally {
      setLoading(false);
    }
  };



  

  return (
    <div className="flex flex-col items-center">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      <button
        onClick={handleUploadClick}
        className="mt-4 bg-orange-500 text-white px-4 py-2 rounded dark:bg-orange-800 dark:hover:bg-orange-900 hover:bg-orange-600"
      >
        Nahrát Obrázek
      </button>

      <div className="w-full max-w-xs mt-4">
        <AvatarEditor
          ref={editorRef}
          image={previewImage}
          width={400}
          crossOrigin="anonymous"
          height={400}
          borderRadius={200}
          border={50}
          color={[255, 255, 255, 0.6]}
          scale={scale}
          rotate={0}
          style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="scale" className="mr-2">Zoom:</label>
        <input
          id="scale"
          type="range"
          min="1"
          max="2"
          step="0.1"
          value={scale}
          onChange={(e) => setScale(parseFloat(e.target.value))} />
      </div>

      <button
        onClick={handleSave}
        className="mt-4 bg-orange-500 text-white px-4 py-2 rounded disabled:bg-orange-300 dark:bg-orange-800 dark:hover:bg-orange-900 hover:bg-orange-600 flex items-center justify-center"
        disabled={loading}
      >
        {loading ? <SpinnerSmallWhite /> : 'Uložit Avatar'}
      </button>

      {feedback && <p className="mt-2 text-sm text-gray-600">{feedback}</p>}
    </div>
  );
}