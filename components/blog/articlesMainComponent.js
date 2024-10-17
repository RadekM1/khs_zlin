'use client'

import ArticleSimpleEditor from '@/components/blog/articleSimpleEditor';
import { useState ,useEffect } from 'react';
import ModarArticleList from '../modals/modalArticleList';
import {useSession } from 'next-auth/react';
import SpinnerSmallOrange from '../spinners/spinnerSmallOrange';
import { CiViewList } from "react-icons/ci";
import { FaSave } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import slugify from 'slugify';

export default function ArticlesMainComponent () {
    const {data: session } = useSession();
    const [title, setTitle] = useState('')
    const [editorContent, setEditorContent] = useState('')
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
    const [clearance, setClearance] = useState(null)
    const [textFromEditor, setTextFromEditor] = useState('')
    const [slug, setSlug] = useState('')
    const [description, setDescription] = useState('')


    useEffect(() => {
        const generatedSlug = slugify(title, { lower: true, strict: true, locale: 'cs' });
        setSlug(generatedSlug);

        const generatedDescription = textFromEditor.length >= 200 
            ? `${textFromEditor.slice(0, 200)}...` 
            : textFromEditor;
        setDescription(generatedDescription);
    }, [title, textFromEditor]);

    const slugGallery = [
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/1.jpg", description: 'test popisu', alt: 'obrázek k článku horolezectví' },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/2.jpg", description: 'test popisu2', alt: 'obrázek k článku horolezectví' },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/3.jpg", description: 'test popisu3', alt: 'obrázek k článku horolezectví' },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/4.jpg", description: 'test popisu4', alt: 'obrázek k článku horolezectví' },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/5.jpg", description: 'test popisu5', alt: 'obrázek k článku horolezectví' },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/6.jpg", description: 'test popisu6', alt: 'obrázek k článku horolezectví' },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/7.jpg", description: 'test popisu7', alt: 'obrázek k článku horolezectví' },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/8.jpg", description: 'test popisu8', alt: 'obrázek k článku horolezectví' },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/9.jpg", description: 'test popisu',  alt: 'obrázek k článku horolezectví' },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/10.jpg", description: 'test popisu', alt: 'obrázek k článku horolezectví' },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/11.jpg", description: 'test popisu', alt: 'obrázek k článku horolezectví' },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/12.jpg", description: 'test popisu', alt: 'obrázek k článku horolezectví' },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/13.jpg", description: 'test popisu', alt: 'obrázek k článku horolezectví' },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/14.jpg", description: 'test popisu', alt: 'obrázek k článku horolezectví' },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/15.jpg", description: 'test popisu', alt: 'obrázek k článku horolezectví' },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/16.jpg", description: 'test popisu', alt: 'obrázek k článku horolezectví' },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/17.jpg", description: 'test popisu', alt: 'obrázek k článku horolezectví' },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/18.jpg", description: 'test popisu', alt: 'obrázek k článku horolezectví' },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/19.jpg", description: 'test popisu', alt: 'obrázek k článku horolezectví' },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/20.jpg", description: 'test popisu', alt: 'obrázek k článku horolezectví' },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/21.jpg", description: 'test popisu', alt: 'obrázek k článku horolezectví' },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/22.jpg", description: null },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/23.jpg", description: null },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/24.jpg", description: null },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/25.jpg", description: null },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/26.jpg", description: null },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/27.jpg", description: null },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/28.jpg", description: null },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/29.jpg", description: null },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/30.jpg", description: null },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/31.jpg", description: null },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/32.jpg", description: null },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/33.jpg", description: null },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/34.jpg", description: null },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/35.jpg", description: null },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/36.jpg", description: null },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/37.jpg", description: null },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/38.jpg", description: null },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/39.jpg", description: null },
      { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/40.jpg", description: null }
    ];

    


    console.log('IdToEdit:', idToEdit)
    console.log('slug:',slug)
    console.log('Titulek:', title)
    console.log('Článek:', editorContent)
    console.log('Účet:', account)
    console.log('Thumbnail', thumbnail)
    console.log('Galerie', slugGallery)
    console.log('Kategorie', category)
    console.log('Nickname:', nickName)
    console.log('description:', description)


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
      }


//-------------CHANGE API down   ------------------------------------


const handleSqlArticleChange = async () => {
  setDisabled(true)
  setLoading(true) 
  
  if(!title || !category || !slug || !editorContent){
    alert("není zadán jeden ze tří parametrů: (titulek, kategorie, článek)")
    return;
  }

  if(!slug || !account || !description || !nickName){
    alert("chyba při ukládání parametrů článku které se mají generovat automaticky (odkaz, účet, popis nebo přezdívka), kontaktujte administrátora.")
    return;
  }

  if(!slugGallery){ 
    const proceed = confirm('nejsou nahrány žádné fotografie, pokračovat bez?')
    if(!proceed){
      return;
    }
  }
  

  if(slugGallery && !thumbnail){
    const proceed = confirm('nebyl vybrát náhledový obrázek, pokud budete pokračovat vybere se první v pořádí')
    if(!proceed){
      return;
    }
  }

  
  if(slugGallery && !thumbnail){
    setThumbnail(slugGallery[0].src)
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
          editorContent: editorContent,
          description: description,
          thumbnail: thumbnail,
          gallery: JSON.stringify(slugGallery),
          category: category,
          operation: 'articleUpdate'
        })
      });
      console.log(response)
      if(!response.ok){
        console.log(response.error)
        return;
      }
      setEditActive(false)
      alert('uloženo do databáze')
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
    if(!title || !category || !slug || !editorContent){
      alert("není zadán jeden ze tří parametrů: (titulek, kategorie, článek)")
      return;
    }

    if(!slug || !account || !description || !nickName){
      alert("chyba při ukládání parametrů článku které se mají generovat automaticky (odkaz, účet, popis nebo přezdívka), kontaktujte administrátora.")
      return;
    }

    if(!slugGallery){ 
      const proceed = confirm('nejsou nahrány žádné fotografie, pokračovat bez?')
      if(!proceed){
        return;
      }
    }
    

    if(slugGallery && !thumbnail){
      const proceed = confirm('nebyl vybrát náhledový obrázek, pokud budete pokračovat vybere se první v pořádí')
      if(!proceed){
        return;
      }
    }

    
    if(slugGallery && !thumbnail){
      setThumbnail(slugGallery[0].src)
    }

    setDisabled(true)
    setLoading(true)
    try{
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          slug:slug,
          title: title,
          editorContent: editorContent,
          account: account,
          description: description,
          thumbnail: thumbnail,
          gallery: JSON.stringify(slugGallery),
          category: category,
          nickName: nickName,
          operation: 'articleInsert'
        })
      });
      console.log(response)
      console.log(response.message)
      if(!response.ok){
        console.log(response.error)
        return;
      }
      setEditActive(false)
      alert('článek uložen')
      handleResetForm();
      console.log(response)
    } catch (error) {
      console.log(error)
    }finally{
    setDisabled(false)
    
    setLoading(false)
    }
  };


    //-------------ADD API up   ------------------------------------


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
                       {!loading ? <span>Aktualizovat</span> : <SpinnerSmallOrange /> }
                    </button> 
                    

                 
                    <button 
                      disabled={disabled}
                      onClick={()=>{setEditActive(false), handleResetForm()}}
                      className="mx-4 inline-flex items-center justify-center h-10 gap-2 px-4  font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-red-500 hover:bg-red-600 focus:bg-red-700 disabled:cursor-not-allowed disabled:border-orange-300 disabled:bg-orange-300 disabled:shadow-none">
                      {!loading ?   <span> Zrušit úpravy </span> : <SpinnerSmallOrange /> }
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

                  : <SpinnerSmallOrange /> 
                  
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
                    <ModarArticleList open={open} setIdToEdit={setIdToEdit} setEditActive={setEditActive} setGallery={setGallery} setThumbnail={setThumbnail}  setCategory={setCategory}  setTitle={setTitle}  setEditorContent={setEditorContent}  setOpen={setOpen} />
                    <CiViewList />
                    </>
                    : <SpinnerSmallOrange /> 
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

          className="peer relative h-10 w-full appearance-none border rounded dark:border-gray-700 dark:bg-[#121212] border-slate-200 bg-white px-4 text-sm text-slate-400 dark:text-white outline-none transition-all autofill:bg-white focus:border-orange-500 focus-visible:outline-none focus:focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
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

      <div className="max-w-[400px] dark:bg-[#121212] dark:text-white mb-2 min-w-[300px] my-1">
        <input
          type="text"
          onChange={(e) => onChange(e.target.value, 'title')}
          value={title}
          placeholder="Vyplňte titulek článku"
          disabled={disabled}
          className="relative w-full dark:bg-[#121212] dark:border-gray-700 dark:text-white h-10 px-4 pr-12 text-sm transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-700 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-orange-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 dark:disabled:dark:bg-[#121212] disabled:text-slate-400 placeholder:text-slate-400 dark:placeholder:text-white"
        />
      </div>
            <span className="text-xl my-3 pt-4 ">Obsah článku</span>

             <ArticleSimpleEditor editorContent={editorContent}  setEditorContent={setEditorContent} setTextFromEditor={setTextFromEditor} />

              <div className="text-xl flex flex-col my-3 mb-20 pt-24">

              <span className='my-2'>Fotogalerie</span>


              ----- DROP ZONE ------
              </div>

        </div>
    )
}





 

    

