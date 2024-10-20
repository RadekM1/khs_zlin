'use client'

import ArticleSimpleEditor from '@/components/blog/articleSimpleEditor';
import { useState ,useEffect, useRef } from 'react';
import ModarArticleList from '../modals/modalArticleList';
import {useSession } from 'next-auth/react';
import SpinnerSmallOrange from '../spinners/spinnerSmallOrange';
import { CiViewList } from "react-icons/ci";
import { FaSave } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import slugify from 'slugify';
import { FcPicture } from "react-icons/fc";
import Image from 'next/image';
import { MdDeleteForever } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";
import { CiWarning } from "react-icons/ci";
import SpinnerBigOrange from '../spinners/spinnerBigOrange';
import OptimizedImage from './optimizedImage';
import { useCallback } from 'react';
import SpinnerSmallWhite from '../spinners/spinnerSmallWhite';

export default function ArticlesMainComponent () {
    const {data: session } = useSession();
    const [title, setTitle] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [gallery, setGallery] = useState([])
    const [category, setCategory] = useState('')
    const [account, setAccount] = useState('')
    const [open, setOpen] = useState(false)
    const [editActive, setEditActive] = useState(false)
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [idToEdit, setIdToEdit] = useState(null)
    const [nickName, setNickName] = useState('')
    const [clearance, setClearance] = useState('null')
    const [textFromEditor, setTextFromEditor] = useState('')
    const [slug, setSlug] = useState('')
    const [description, setDescription] = useState('')
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(''); 
    const [selectedGoogleImage, setSelectedGoogleImage] = useState('');
    const [editorContent, setEditorContent] = useState('')
    const [allInGallery, setAllInGallery] = useState([])
    const [readyToUploadFiles, setReadyToUploadFiles] = useState([])
    const [imgResize, setImgResize] = useState(false);
    const [editedArticleSlug, setEditedArticleSlug ] = useState('')


console.log(gallery)

  useEffect(() => {
 
    const preventDefault = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    document.addEventListener('dragover', preventDefault);
    document.addEventListener('drop', preventDefault);
  
    return () => {
  
      document.removeEventListener('dragover', preventDefault);
      document.removeEventListener('drop', preventDefault);
    };
  }, []);


    useEffect(() => {
      const renamedFiles = files.map((file) => {
        let fileExtension = file.name.split('.').pop();
        let fileName = file.name.replace(`.${fileExtension}`, '');
        let slugifyName = slugify(fileName, { lower: true, strict: true });
        let newFileName = `${slugifyName}.${fileExtension}`;
    
        let newAlt = `${file.description ? file.description : 'img'}-${title}`;
        let newDescription = !file.description ? '' : file.description;
    
        return {
          file: newFileName,
          description: newDescription,
          alt: newAlt,
          preview: file.preview 
        };
      });
    
      setReadyToUploadFiles(renamedFiles);
      
      const tempAllInGallery = [...gallery, ...renamedFiles.map(file => ({
        src: `https://storage.googleapis.com/khs-zlin/img-gallery/${editedArticleSlug}/${file.file}`, 
        alt: file.alt,
        description: file.description
      }))];
    
      setAllInGallery(tempAllInGallery);
    }, [files, gallery, title]);



  
    const onCommentDropzoneChange = useCallback((e, index) => {
      const updatedFiles = files.map((file, i) => {
        if (i === index) {
          return {
            ...file,
            description: e,
          };
        }
        return file;
      });
  
      setFiles(updatedFiles);
    }, [files]);

    const handleDropzonePictureDel = (index) => {
      const updatedFiles = files.filter((_, i) => i !== index); 
      setFiles(updatedFiles); 
    };
  
    const handleDrop = (e) => {
      e.preventDefault();
      const droppedFiles = Array.from(e.dataTransfer.files);
      addFiles(droppedFiles);
    };
  
    const handleFileChange = (e) => {
      const selectedFiles = Array.from(e.target.files);
      addFiles(selectedFiles);
    };
  
    const addFiles = async (newFiles) => {
      setImgResize(true); 
      const maxFileSize = 3 * 1024 * 1024; 
      const maxFiles = 30;
      let rejectedFiles = [];
      let duplicateFiles = [];
    
      const remainingSlots = maxFiles - files.length;
      if (remainingSlots <= 0) {
        alert(`Maximální počet souborů (30) již byl nahrán.`);
        setImgResize(false); 
        return;
      }
    
      const filesToProcess = newFiles.slice(0, remainingSlots);
    
      const filteredFiles = filesToProcess.filter((file) => {
        if (files.some((f) => f.name === file.name)) {
          duplicateFiles.push(file.name);
          return false;
        }
        if (file.size > maxFileSize) {
          rejectedFiles.push(file.name);
          return false;
        }
        return true;
      });
    
      if (duplicateFiles.length > 0) {
        alert(`Následující soubory byly odmítnuty, protože již byly nahrány:\n${duplicateFiles.join("\n")}`);
      }
    
      if (rejectedFiles.length > 0) {
        alert(`Následující soubory byly odmítnuty, protože přesahují limit 3 MB:\n${rejectedFiles.join("\n")}`);
      }
    
      
      const optimizationPromises = filteredFiles.map(async (file, i) => {
        try {
          const formData = new FormData();
          formData.append('file', file);
    
          const response = await fetch('/api/optimize', {
            method: 'POST',
            body: formData,
          });
    
          const optimizedImage = await response.json();
          const optimizedPreview = optimizedImage.url;
    
       
          setFiles((prevFiles) => [
            ...prevFiles,
            {
              name: file.name,
              preview: optimizedPreview,
            }
          ]);
        } catch (error) {
          console.error('Chyba při zpracování obrázku', error);
        }
      });
    
      await Promise.all(optimizationPromises);
    
      setImgResize(false);
    
      if (files.length >= maxFiles) {
        alert(`Byl dosažen maximální počet souborů (30).`);
      }
    };

    const handleFileClick = (file) => {
      setSelectedFile(file.file);   
      setThumbnail(file.file)
      setSelectedGoogleImage(null)
    };

    const handleGoogleImageClick = (image) => {
      setSelectedGoogleImage(image.file); 
      setThumbnail(image.file)
      setSelectedFile(null)
    };


    useEffect(() => {
        const generatedSlug = slugify(title, { lower: true, strict: true, locale: 'cs' });
        setSlug(generatedSlug);

        const generatedDescription = textFromEditor.length >= 200 
            ? `${textFromEditor.slice(0, 200)}...` 
            : textFromEditor;
        setDescription(generatedDescription);
    }, [title, textFromEditor]);


    const onCommentChange = (e, index) =>{
      let tempVal = e
      let cloneGoogleGallery = [...gallery]
          cloneGoogleGallery[index] = {...cloneGoogleGallery[index], description: tempVal
          }
      setGallery(cloneGoogleGallery)
    }

    const handlePictureDel = (index) =>{
      let tempIndex = index
      let cloneGoogleGallery = gallery.filter((_, index) => index !== tempIndex ) 
      setGallery(cloneGoogleGallery)
    }


    useEffect(()=>{
      if(session){
          setAccount(session.user.email)
          setClearance(session.user.clearance)
          let firstNameTemp = session.user.firstName
          let lastNameTemp = session.user.lastName
          let tempNick = `${firstNameTemp} ${lastNameTemp.slice(0,1)}.`
          setNickName(tempNick)

      }
    }, [session])

    const onChange = (e, id)=>{
      let tempE = e;
      let tempId = id;

      switch(tempId){
        case 'title' : {setTitle(tempE)};break;
        case 'category' : {setCategory(tempE)};break;
        default: break;
      }
    }

      const handleResetForm = () => {
        setTitle('');
        setCategory('')
        setEditorContent('')
        setIdToEdit(null)
        setThumbnail('')
        setGallery('')
        setDescription('')
        setSlug('')
        setReadyToUploadFiles([])
        setSelectedGoogleImage([])
        setAllInGallery([])
        setFiles([])
        setSelectedFile(null)
      }



//-------------CHANGE API down   ------------------------------------


const handleSqlArticleChange = async () => {
  setDisabled(true)
  setLoading(true) 
  let checkedThumbnail 
  let googleResult
  
  if(!title || !category || !editorContent){
    alert("není zadán jeden ze tří parametrů: (titulek, kategorie, článek)")
    setDisabled(false)
    setLoading(false)
    return;
  }

  if(!description || !slug){
    alert("chyba při ukládání parametrů článku které se mají generovat automaticky (popisek z textu na hlavní stránku, identifikátor úpravy), zkuste ještě jednou, případně kontaktujte administrátora.")
    setDisabled(false)
    setLoading(false)
    return;
  }

  if(allInGallery.length < 1){ 
    const proceed = confirm('nejsou nahrány žádné fotografie, pokračovat bez?')
    if(!proceed){
      setDisabled(false)
      setLoading(false)
      return;
    }
  }
  

  if(allInGallery > 0 && !thumbnail){
    const proceed = confirm('nebyl vybrát náhledový obrázek, pokud budete pokračovat vybere se první v pořádí')
    if(!proceed){
      setDisabled(false)
      setLoading(false)
      return;
    }
  }

  if(allInGallery.length > 30){
    alert('u článku je přiložených více jak 30 fotografií, některé je potřeba vymazat.')
    setDisabled(false)
    setLoading(false)
    return;
  }

  
  if(allInGallery && !thumbnail){
    let newThumbnail = allInGallery[0].src
    checkedThumbnail = newThumbnail.includes('https://storage.googleapis.com/') ? newThumbnail : `https://storage.googleapis.com/khs-zlin/img-gallery/${slug}/${newThumbnail}`
  }

  if(allInGallery && allInGallery.length > 30){
    alert('maximální počet obrázků v galerii je 30, dle uvážení některé odeberte')
    return;
  }

    try{
      const response = await fetch('/api/articles', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          idToEdit: idToEdit,
          title: title,
          slug: slug,
          editorContent: editorContent,
          description: description,
          thumbnail: thumbnail ? thumbnail : checkedThumbnail,
          gallery: JSON.stringify(allInGallery),
          category: category,
          operation: 'articleUpdate'
        })
      });
      console.log(response)

      if(!response.ok){
        console.log(response.error)
        setDisabled(false)
        setLoading(false)
        return;
      }
      
      if(readyToUploadFiles.length > 0){
        googleResult = handleGoogleUpload(editedArticleSlug)
        if(googleResult.ok){
          alert('vše proběhlo v pořádku')
          setDisabled(false)
          setLoading(false)
        }
      }else{
        alert('aktualizovaný článek uložen')
      }
      
      setEditActive(false)
      handleResetForm();
      console.log(response)
    } catch (error) {
      console.log(error)
    }finally{
    setDisabled(false)
    setLoading(false)
    }
  };


  //-------------CHANGE API up   ------------------------------------
  

  //-------------ADD API down   ------------------------------------

  const handleAdd = async () => {
    if(!title || !category || !editorContent){
      alert("není zadán jeden ze tří parametrů: (titulek, kategorie, článek)")
      return;
    }

    if(!slug || !account || !description || !nickName){
      alert("chyba při ukládání parametrů článku které se mají generovat automaticky (odkaz, účet, popis nebo přezdívka), zkuste znovu, případně kontaktujte administrátora.")
      return;
    }
    

    if(readyToUploadFiles.length < 1){ 
      const proceed = confirm('nejsou nahrány žádné fotografie, pokračovat bez?')
      if(!proceed){
        return;
      }
    }
    

    if(readyToUploadFiles.length > 0 && !thumbnail){
      const proceed = confirm('nebyl vybrát náhledový obrázek, pokud budete pokračovat vybere se první v pořádí')
      if(!proceed){
        return;
      }
    }

    if(readyToUploadFiles.length > 0 && !thumbnail){
      setThumbnail(allInGallery[0].src)
    }

    let metadataToApi = readyToUploadFiles.map(({file, description, alt}) => ({file, description, alt}))



    try{
      setDisabled(true)
      setLoading(true)
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          slug: slug,
          title: title,
          editorContent: editorContent,
          account: account,
          description: description,
          thumbnail: thumbnail,
          metadataToApi: JSON.stringify(metadataToApi),
          category: category,
          nickName: nickName,
          operation: 'articleInsert'
        })
      });
      const data = await response.json();
      let returnedSlug =  data.articleInsertResult.slug
      console.log('vrácený slug:',data.articleInsertResult.slug)

      if(!response.ok){
        console.log(response.error)

        return;
      }

      setEditActive(false)
      handleResetForm()
      if(readyToUploadFiles.length > 0 && returnedSlug){
        let googleResponse = await handleGoogleUpload(returnedSlug)
       
        console.log('google response',googleResponse)
        if(googleResponse){
          alert('uloženo')
          
        }else {
          alert('vyskytl se problém při nahrávání fotografií. Zkuste znovu nebo kontaktujte administrátora')
          }
      }
      console.log(response)
    } catch (error) {
      console.log(error)
    }finally{
    setDisabled(false)
    setLoading(false)
    }
  };


//-------------ADD API up   ------------------------------------



//-----------------GOOGLE API----------------------------

const handleGoogleUpload = async (slug) => {
  if (!readyToUploadFiles || readyToUploadFiles.length === 0) {
    alert("Nejsou připravené žádné soubory k nahrání.");
    return false; 
  }

  const uploadPromises =  readyToUploadFiles.map(async (fileObj) => {
    const imgNameToGoogle = `${slug}/${fileObj.file}`;
    
   

    try {
      const response = await fetch(`/api/article-img-upload?file=${imgNameToGoogle}`, {
        method: 'GET',
      });

      const data = await response.json();

      if (response.ok && data.url) {
        const base64Image = fileObj.preview;
        const base64Data = base64Image.split(',')[1];

        const uploadResponse = await fetch(data.url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'image/jpg', 
          },
          body: Buffer.from(base64Data, 'base64'), 
        });

        if (uploadResponse.ok) {
          return true;
        } else {
          return false; 
        }
      } else {
        return false; 
      }
    } catch (error) {
      console.error(`Chyba při nahrávání souboru:`, error);
      return false; 
    }
  });


  const uploadResults = await Promise.all(uploadPromises);

  
  return uploadResults.every(result => result === true);
};

    //-----------------GOOGLE API----------------------------





    return (
        <div className='w-full justify-center items-center flex flex-col'>
                  <div className='flex-row'>

              <div className='flex flex-row mb-4'>

              {editActive && 
                <>
                  <div  className="py-2 md:mx-2 md:px-2  text-gray-800  md:text-sm max-w border-gray-300 whitespace-normal">
                  
                    <button 
                      className="inline-flex mx-4 items-center justify-center h-10 gap-2 px-4  font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-green-500 hover:bg-green-600 focus:bg-green-700 disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300 disabled:shadow-none"
                      disabled={disabled}
                      onClick={()=>{handleSqlArticleChange()}}
                    >
                       {!loading ? <span>Aktualizovat</span> : <SpinnerSmallWhite /> }
                    </button> 
                    

                 
                    <button 
                      disabled={disabled}
                      onClick={()=>{setEditActive(false), handleResetForm()}}
                      className="mx-4 inline-flex items-center justify-center h-10 gap-2 px-4  font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-red-500 hover:bg-red-600 focus:bg-red-700 disabled:cursor-not-allowed disabled:border-orange-300 disabled:bg-orange-300 disabled:shadow-none">
                      {!loading ?   <span> Zrušit úpravy </span> : <SpinnerSmallWhite /> }
                    </button> 
                  </div>
                </>
                
                }

              </div>
              {!editActive && 
               
                <button 
                onClick={()=>handleAdd()}
                disabled={disabled}
                className="inline-flex mx-2 mb-4 min-w-[180px] dark:bg-green-700 dark:hover:bg-green-800 items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-green-500 hover:bg-green-600 focus:bg-green-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300 disabled:shadow-none">
                  {!loading ?   
                  <>
                  <span>Uložit a publikovat</span> 
                  <FaSave />
                  </>

                  : <SpinnerSmallWhite /> 
                  
                  }
                </button> 
              

              }

                <button 
                onClick={()=>setOpen(true)}  
                disabled={disabled}
                className="inline-flex mx-2 min-w-[180px] dark:bg-orange-700 dark:hover:bg-orange-800 items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-orange-500 hover:bg-orange-600 focus:bg-orange-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-orange-300 disabled:bg-orange-300 disabled:shadow-none">
                    {!loading ?   
                    <>
                    <span>Seznam článků</span>
                    <ModarArticleList open={open} setIdToEdit={setIdToEdit} setEditedArticleSlug={setEditedArticleSlug} setEditActive={setEditActive} setGallery={setGallery} setThumbnail={setThumbnail}  setCategory={setCategory}  setTitle={setTitle}  setEditorContent={setEditorContent}  setOpen={setOpen} />
                    <CiViewList />
                    </>
                    : <SpinnerSmallWhite /> 
                    }
                </button>
            </div>
            <div className='my-2'>
            </div>
            <div className="relative my-6 min-w-[300px]">
        <select
          onChange={(e)=>onChange(e.target.value, 'category')}
          required
          value={category}

          className="peer relative h-10 w-full appearance-none border rounded dark:border-gray-700 dark:bg-[#121212] border-slate-200 bg-white px-4 text-sm text-slate-7n00 dark:text-white outline-none transition-all autofill:bg-white focus:border-orange-500 focus-visible:outline-none focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
        >
          <option className='dark:bg-[#121212]' disabled hidden value = ''></option>
          <option value="skaly">Skály</option>
          <option value="hory">Hory</option>
          <option value="ostatni">Ostatní</option>
          {(clearance === 'editor' || clearance === 'admin' ) && <option value="oddil">Oddíl</option>}
        </select>

        <label
          htmlFor="id-01"
          className="pointer-events-none dark:bg-[#121212]  absolute top-2.5 left-2 z-[1] px-2 text-sm text-slate-400 dark:text-white transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white dark:before:bg-[#121212] before:transition-all peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-valid:-top-2 peer-valid:text-xs peer-focus:-top-2 peer-focus:text-xs peer-focus:text-orange-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
        >
          Vyberte kategorii
        </label>
        <MdOutlineKeyboardArrowDown className='absolute top-2.5 right-2 h-5 w-5' />
      </div>

      <div className="max-w-[400px] dark:bg-[#121212] mb-10 dark:text-white min-w-[300px] my-1">
        <input
          type="text"
          onChange={(e) => onChange(e.target.value, 'title')}
          value={title}
          placeholder="Vyplňte titulek článku"
          disabled={disabled}
          className="relative w-full dark:bg-[#121212] dark:border-gray-700 dark:text-white h-10 px-4 pr-12 text-sm transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-700 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-orange-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 dark:disabled:dark:bg-[#121212] disabled:text-slate-400 placeholder:text-slate-400 dark:placeholder:text-white"
        />
      </div>
      <div>
        <span className="text-xl my-3 pt-4 ">
          Obsah článku
        </span>
      </div>
      <div className='w-full flex'>
        <ArticleSimpleEditor editorContent={editorContent}  setEditorContent={setEditorContent} setTextFromEditor={setTextFromEditor} />
      </div>
      <div className="text-xl  flex flex-col my-3 mb-30 pt-24">

      <>
        <div
          className="relative my-6 w-full"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="dropzone"
            className="peer hidden"
            accept=".gif,.jpg,.png,.jpeg"
            multiple
            onChange={handleFileChange}
          />
          <label
            htmlFor="dropzone"
            className="flex cursor-pointer flex-col items-center gap-6 rounded border border-dashed dark:bg-gray-800 bg-slate-50 border-slate-300 px-6 py-10 text-center"
          >
            <span className="inline-flex h-12 items-center justify-center self-center rounded bg-slate-100/70 px-3 text-slate-400">
              <FcPicture />
            </span>

            {!imgResize ? 
            
              <p className="flex flex-grow w-full flex-col py-10 items-center justify-center gap-1 text-sm">
                <span className="text-orange-500 text-2xl hover:text-orange-500">
                  Nahrát fotografie
                </span>
                <span className="text-slate-500 w-full">
                  klikněte a vyberte fotografie nebo je přetáhněte ze složky do vyhrazené oblasti
                </span>
                <span className="text-slate-600"> PNG, JPG, JPEG max 3MB</span>
                <span className="text-slate-600"> max 30 fotek u článku</span>
              </p>

            :
            
            <div className='flex items-center align-center flex-col'>
              <p className='text-orange-500 mb-4'>Optimalizace obrázků</p>
              <SpinnerBigOrange />
            </div>
            }

            
          </label>
        </div>
        <div className=' text-orange-500 justify-center my-5 flex flex-col md:flex-row text-sm'>
        <CiWarning className='text-orange-500 w-8 mr-2 md:mb-2 items-center self-center h-8' />
        <span className='aling-center self-center'>Kliknutím na jednu z fotografií zvolíte která se bude zobrazovat jako náhledová v menu článků (objeví se oranžový rámeček)</span>
        </div>

        {/*  ------------------- DROPZONE FOTKY down ------------------------- */}



          
          <div className="mt-4">

            {readyToUploadFiles.length > 0 && (
              <div className="grid grid-cols-1   md:grid-cols-3 gap-4">
                {readyToUploadFiles.map((file, index) => (
                  
                  <div key={index} className='border-[1px] border-gray-300 rounded-2xl' >
                    <div
                      className={`cursor-pointer p-2 rounded border ${
                        selectedFile === file.file
                          ? "border-orange-500 dark:border-orange-900 bg-orange-200 rounded-t-2xl dark:bg-orange-900 border-[1px]"
                          : "border-transparent"
                      }`}
                    >
                      <OptimizedImage
                        key={index}
                        file={file}
                        selectedFile={selectedFile}
                        handleFileClick={handleFileClick}
                        index={index}
                      />
                    </div>
                    <div className='flex flex-col'>
                    <div className="flex relative items-center w-full">
                      <FaRegComment className="absolute left-3 text-gray-400" />
                      <input
                        type="text"
                        onChange={(e) => onCommentDropzoneChange(e.target.value, index)}
                        value={file.description}
                        placeholder="komentář"
                        disabled={disabled}
                        className="pl-10 p-1 w-full dark:bg-[#121212] dark:border-gray-700  dark:text-white rounded-b-2xl h-10 px-4 pr-12 text-sm transition-all outline-none focus-visible:outline-none peer border-slate-200 text-slate-700 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-orange-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 dark:disabled:dark:bg-[#121212] disabled:text-slate-400 placeholder:text-slate-400 dark:placeholder:text-white"
                      />
                      <MdDeleteForever 
                      onClick={()=>handleDropzonePictureDel(index)}
                      className='text-red-400 cursor-pointer h-6 w-6 absolute right-3' />
                    </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

{/*  ------------------- DROPZONE FOTKY up ------------------------- */}

{/*  ------------------- GOOGLE CLOUD FOTKY down ------------------------- */}

          {(editActive && gallery) &&
          
          <div className="mt-4">
            <h3 className="text-lg my-6 text-orange-500 font-semibold">Již nahrané fotky článku</h3>
            {gallery.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {gallery.map((image, index) => (
                  
                  <div key={index} className='border-[1px] border-gray-300 rounded-2xl' >
           
                    <div
                      onClick={() => handleGoogleImageClick(image)}
                      className={`cursor-pointer p-2 rounded border ${
                        selectedGoogleImage === image.file
                          ? "border-orange-500 dark:border-orange-900 bg-orange-200 dark:bg-orange-900 border-[1px]"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={image.file}
                        alt={image.alt || "Google gallery image"}
                        className="w-full h-72 lg:h-72 object-contain rounded"
                      />
                    </div>
                    <div className='flex flex-col'>
                    <div className="flex relative items-center w-full">
                      <FaRegComment className="absolute left-3 text-gray-400" />
                      <input
                        type="text"
                        onChange={(e) => onCommentChange(e.target.value, index)}
                        value={image.description}
                        placeholder="komentář"
                        disabled={disabled}
                        className="pl-10 p-1 w-full dark:bg-[#121212] dark:border-gray-700  dark:text-white rounded-b-2xl h-10 px-4 pr-12 text-sm transition-all outline-none focus-visible:outline-none peer border-slate-200 text-slate-700 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-orange-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 dark:disabled:dark:bg-[#121212] disabled:text-slate-400 placeholder:text-slate-400 dark:placeholder:text-white"
                      />
                      <MdDeleteForever 
                      onClick={()=>handlePictureDel(index)}
                      className='text-red-400 cursor-pointer h-6 w-6 absolute right-3' />
                    </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        }
          {/*  ------------------- GOOGLE CLOUD FOTKY UP ------------------------- */}
      </>
    </div> 
  </div>
)}





 

    

