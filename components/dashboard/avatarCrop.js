'use client'

import React, { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';

export default function AvatarCrop() {
  const [image, setImage] = useState('https://storage.googleapis.com/khs-zlin/img-gallery/test/35.jpg');
  const [scale, setScale] = useState(1.2); // Výchozí hodnota zoomu
  const editorRef = useRef(null); // Ref pro přístup k editoru

  // Funkce pro změnu obrázku
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Funkce pro uložení oříznutého obrázku
  const handleSave = () => {
    if (editorRef.current) {
      // Získání oříznutého obrázku jako data URL
      const canvas = editorRef.current.getImage().toDataURL();
      console.log('Oříznutý obrázek:', canvas);

      // Odeslání upraveného obrázku na server (případně)
      // sendToServer(canvas); // Příklad funkce pro odeslání na server
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-bold mb-4">Avatar Crop Tool</h2>
      
      {/* Input pro nahrání obrázku */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />

      {/* Editor avataru */}
      <div className="w-full max-w-xs">
        <AvatarEditor
          ref={editorRef}
          image={image}
          width={300}
          height={300}
          border={20}
          color={[255, 255, 255, 0.6]} // Poloprůhledné bílé pozadí
          scale={scale}
          rotate={0}
          style={{ width: '100%', height: 'auto', maxWidth: '100%' }} // Přidání dynamické šířky a výšky
        />
      </div>

      {/* Slider pro nastavení zoomu */}
      <div className="mt-4">
        <label htmlFor="scale" className="mr-2">Zoom:</label>
        <input
          id="scale"
          type="range"
          min="1"
          max="2"
          step="0.1"
          value={scale}
          onChange={(e) => setScale(parseFloat(e.target.value))}
        />
      </div>

      {/* Tlačítko pro uložení oříznutého obrázku */}
      <button
        onClick={handleSave}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Uložit Avatar
      </button>
    </div>
  );
}
