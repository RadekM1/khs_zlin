'use client'
import AdminEditor from '@/components/blog/adminEditor';
import ArticleSimpleEditor from '@/components/blog/articleSimpleEditor';
import { useState ,useEffect } from 'react';
import ModalNewsList from '../modals/modalNewsList';
import {useSession } from 'next-auth/react';
import SpinnerSmallOrange from '../spinners/spinnerSmallOrange';
import { CiViewList } from "react-icons/ci";
import { FaSave } from "react-icons/fa";


export default function NewsMainComponent ({tiny}) {
    const {data: session } = useSession();
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [editorContent, setEditorContent] = useState('')
    const [expirationDate, setExpirationDate] = useState('')
    const [account, setAccount] = useState('')
    const [open, setOpen] = useState(false)
    const [editActive, setEditActive] = useState(false)
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [idToEdit, setIdToEdit] = useState(null)
  


    const onChange = (e, id)=>{
      let tempE = e;
      let tempId = id;

      switch(tempId){
        case 'title' : {setTitle(tempE)};break;
        case 'expirationDate' : {setExpirationDate(tempE)};break;
        case 'summary' : {setSummary(tempE)};break;
        default: break;
      }
    }

    
    useEffect(()=>{
        if(session){
            setAccount(session.user.email)
        }
      }, [session])


      const handleResetForm = () => {
        setTitle('');
        setSummary('')
        setEditorContent('')
        setExpirationDate('')
        setIdToEdit(null)
      }

      
    

//-------------CHANGE API down   ------------------------------------


const handleSqlNewsChange = async () => {
  setDisabled(true)
  setLoading(true) 
  
  if(!title || title === '' || !summary || !editorContent || !expirationDate || !idToEdit){
    alert("není zadán jeden ze čtyř parametrů (titulek, shrnutí, článek, expirace)")
    return;
  }


    try{
      const response = await fetch('/api/news-feed', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          newsId: idToEdit,
          title: title,
          summary: summary,
          editorContent: editorContent,
          expirationDate: expirationDate,
          account: account,
          operation: 'newsUpdate'
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
    if(!title || title === '' || !summary || !editorContent || !expirationDate){
      alert("není zadán jeden ze čtyř parametrů (titulek, shrnutí, článek, expirace)")
      return;
    }

    setDisabled(true)
    setLoading(true)
    try{
      const response = await fetch('/api/news-feed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          title: title,
          summary: summary,
          editorContent: editorContent,
          expirationDate: expirationDate,
          account: account,
          operation: 'newsInsert'
        })
      });
      console.log(response)
      console.log(response.message)
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
                      onClick={()=>{handleSqlNewsChange()}}
                    >
                       {!loading ? <span>Aktualizovat</span> : <SpinnerSmallOrange /> }
                    </button> 
                    

                 
                    <button 
                      disabled={disabled}
                      onClick={()=>{setEditActive(false), handleResetForm()}}
                      className="mx-4 inline-flex items-center justify-center h-10 gap-2 px-4  font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-red-500 hover:bg-red-600 focus:bg-red-700 disabled:cursor-not-allowed disabled:border-orange-300 disabled:bg-orange-300 disabled:shadow-none">
                      {!loading ?   
                      
                      <span> Zrušit úpravy </span> 
                      
                      : <SpinnerSmallOrange /> 
                      }
                    </button> 
                  </div>
                </>
                
                }

              </div>
              {!editActive && 
               
                <button 
                onClick={()=>handleAdd()}
                disabled={disabled}
                className="inline-flex mx-2 dark:bg-green-700 dark:hover:bg-green-800 items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-green-500 hover:bg-green-600 focus:bg-green-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300 disabled:shadow-none">
                  {!loading ?   
                  
                  <>
                    <span>Uložit</span> 
                    <FaSave />
                  </>
                  : <SpinnerSmallOrange /> 
                  }
                </button> 

              }

                <button 
                onClick={()=>setOpen(true)}  
                disabled={disabled}
                className="inline-flex mx-2 dark:bg-orange-700 dark:hover:bg-orange-800 items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-orange-500 hover:bg-orange-600 focus:bg-orange-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-orange-300 disabled:bg-orange-300 disabled:shadow-none">
                    <span>Seznam článků</span>
                    <CiViewList />


                    <ModalNewsList open={open} setIdToEdit={setIdToEdit} setEditActive={setEditActive} setAccount={setAccount} setTitle={setTitle} setSummary={setSummary} setEditorContent={setEditorContent} setExpirationDate={setExpirationDate} setOpen={setOpen} />
                </button>
            </div>
            <div className='my-2'>

            </div>
            <div className='w-full border-t-[1px] border-t-gray-300 '></div>
            <div className='mt-6'>
            
            <span className="text-xl  ">Nadpis</span>    
            </div>

            <div className="max-w-[400px] mb-2 min-w-[300px] my-1">
                <input type="text" 
                onChange={(e)=>onChange(e.target.value, 'title')} 
                value={title}
                placeholder="Název novinky (titulek)" 
                disabled={disabled}
                className="relative w-full dark:text-white h-10 px-4 pr-12 text-sm transition-all border rounded outline-none focus-visible:outline-none peer border-slate-400 text-slate-700 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-orange-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
            </div>

            <div className="max-w-[400px] dark:text-white mt-4 mb-2 min-w-[300px] my-1">
                <span className="text-xl  ">Expirace</span>    
                <input type="date"  
                value={expirationDate}
                disabled={disabled}
                onChange={(e)=>onChange(e.target.value, 'expirationDate')} 
                placeholder="expirace zprávy" 
                className="relative w-full dark:text-white h-10 px-4 pr-12 text-sm transition-all border rounded outline-none focus-visible:outline-none peer border-slate-400 text-slate-700 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-orange-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
            </div>
       

            <div className='flex flex-col justify-center items-center'>
                <span className="text-xl mb-2 mt-6 ">Text na úvodní stránku do feedu</span> 
                <textarea
                type="text"
                onChange={(e)=>onChange(e.target.value, 'summary')} 
                value={summary}
                disabled={disabled}
                rows="4"
                placeholder="Krátký text co jde na index"
                className=" max-w-[800px] dark:text-white min-w-[350px] rounded border border-slate-200 p-4 text-slate-500 invalid:border-pink-500 invalid:text-pink-500 focus:border-orange-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                ></textarea>

            </div>


            <span className="text-xl my-3 pt-4 ">Článek novinky</span>

            {tiny === true ? <AdminEditor editorContent={editorContent} setEditorContent={setEditorContent}  /> : <ArticleSimpleEditor editorContent={editorContent}  setEditorContent={setEditorContent} />}
        </div>
    )
}





 

    

