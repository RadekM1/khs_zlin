'use client'

import Image from "next/image";
import { IoMdSend } from "react-icons/io";
import {useSession } from 'next-auth/react';
import SpinnerSmallOrange from "../spinners/spinnerSmallOrange";
import { useState, useEffect } from "react";
 

export default function CommentCardInput ({setAreaValue, areaValue, disabled, setUser, handleClick, loading, setDisabled})  {
  const { data: session } = useSession();
  const [avatar, setAvatar] = useState('https://storage.googleapis.com/khs-zlin/avatars/User-avatar.svg.png')


  useEffect(()=>{
    if(session){
      let NickName
      setDisabled(false)
      setUser(session.user.email)
      if(session.user.avatar !== null){
        (setAvatar(session.user.avatar))
      }
    }else{
      setDisabled(true)
    }
    
  }, [session])




return (

  
<div className="flex my-4 flex-col ">
  <div className="flex flex-row md:m-2 justify-start self-start flex-wrap    dark:bg-[#161616]  rounded-2xl  ">

    <div className="flex flex-row transition-opacity md:flex-row  md:space-x-2 space-y-3 md:space-y-0  p-1 mx-auto  "> 
      <div className="px-1 w-[50px] self-start py-1   pl-2">
      <div className="flex flex-row overflow-hidden">
              <Image
                width={30}
                height={30}
                alt={`obrázek uživatele`}
                src={avatar}
                className="inline-block  h-10 w-10 self-center object-fill rounded-full ring-2 ring-white dark:ring-[#161616]"
              />
            </div>
        </div>
 


          <div className="flex flex-nowrap justify-start min-w-[250px] relative flex-row">
            <div className="justify-start flex items-start self-start">
              <textarea
                disabled={disabled}
                id="id-01"
                type="text"
                value={areaValue}
                onChange={(e)=>setAreaValue(e.target.value)}
                name="id-01"
                placeholder="Přidat komentář" 
                rows="3"
                className="peer relative lg:w-[450px] md:w-[350px] w-[250px] rounded border border-slate-200 px-4 py-2 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-orange-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              ></textarea>
              <label
                htmlFor="id-01"
                className="absolute left-2 -top-2 z-[1] dark:bg-black cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white dark:before:bg-[#161616] before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-orange-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Přidat komentář
              </label>
            </div>
            <div className="self-end absolute right-0 end-0 m-2 text-end">
              <button
                onClick={()=>handleClick()}
                disabled={disabled}
              >
                {
                  !loading ?

                  <IoMdSend
                    disabled={disabled}
                    className="w-6 h-6 text-gray-400 hover:text-orange-400 disabled:hover:text-gray-400" 
                  />

                  :

                  <SpinnerSmallOrange />
                  
                }                
              </button>
            </div>
          </div>
          </div>
      </div>
      <div>
      
      </div>


    <div className="flex w-full  overflow-hidden ">
  
  </div>
</div>



)
}