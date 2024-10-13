'use client'

import {useSession} from 'next-auth/react';
import { useState, useEffect } from 'react';
import ModalCrop from '../modals/modalCrop';
import AvatarPicture from './avatarPicture';
import { IoMdHelpCircleOutline } from "react-icons/io";

export default function Profile () {

    const { data: session } = useSession();
    const [clearance, setClearance]=useState(undefined)
    const [firstName, setFirstName] = useState(undefined)
    const [lastName, setLastName] = useState(undefined)
    const [email, setEmail] = useState(undefined)
    const [open, setOpen] = useState(false)

    useEffect(()=>{
        if(session){
          setClearance(session.user.clearance)
          setFirstName(session.user.firstName)
          setLastName(session.user.lastName)
          setEmail(session.user.email)
        }else{
          setClearance(undefined)
        }
        
      }, [session])

      const handleCLick = () =>{
        setOpen(true)
      }

     

    return (
        <div className="justify-center lg:justify-normal mx-4 flex-col-reverse flex lg:flex-row w-full mt-5">
            
            <div className="justify-start w-full lg:w-2/3   overflow-hidden mt-2 bg-white lg:m-5 dark:text-gray-200 dark:border-gray-800 border-gray-200 border-[1px] p-3 shadow-md dark:bg-gray-900 rounded-2xl flex flex-col">
            <section className="w-full divide-y divide-slate-200 rounded">
                <div className='flex-row flex'>
                    <div className=' text-slate-700 font-bold mr-4 text-xl text-start mb-2'>
                        <IoMdHelpCircleOutline className='text-orange-400 w-8 h-8'/>
                    </div>
                    <div className=' text-slate-700 font-bold text-xl text-start mb-2'>
                        Nápověda
                    </div>
                </div>
                
                <details className="group p-4">
                <summary className="relative flex cursor-pointer list-none gap-4 pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6  shrink-0  stroke-amber-500  "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-labelledby="title-ac05 desc-ac05"
                    >
                    <title id="title-ac05">Leading icon</title>
                    <desc id="desc-ac05">Icon that describes the summary</desc>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6zM7.5 6h.008v.008H7.5V6zm2.25 0h.008v.008H9.75V6z"
                    />
                    </svg>
                    What browsers are supported?
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-labelledby="title-ac06 desc-ac06">
                    <title id="title-ac06">Open icon</title>
                    <desc id="desc-ac06">
                        icon that represents the state of the summary
                    </desc>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                    />
                    </svg>
                </summary>
                <p className="mt-4 text-slate-500">
                    The components in Wind UI are designed to work in the latest, stable
                    releases of all major browsers, including Chrome, Firefox, Safari,
                    and Edge.
                </p>
                </details>
                <details className="group p-4">
                <summary className="relative flex cursor-pointer list-none gap-4 pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6  shrink-0  stroke-amber-500  "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-labelledby="title-ac07 desc-ac07"
                    >
                    <title id="title-ac07">Leading icon</title>
                    <desc id="desc-ac07">Icon that describes the summary</desc>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
                    />
                    </svg>
                    Are the components only available in green?
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-labelledby="title-ac08 desc-ac08"
                    >
                    <title id="title-ac08">Open icon</title>
                    <desc id="desc-ac08">
                        icon that represents the state of the summary
                    </desc>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                    />
                    </svg>
                </summary>
                <p className="mt-4 text-slate-500">
                    All components are easily customizable to match your own project.
                </p>
                </details>
                <details className="group p-4">
                <summary className="relative flex cursor-pointer list-none gap-4 pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6  shrink-0  stroke-amber-500  "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-labelledby="title-ac09 desc-ac09"
                    >
                    <title id="title-ac09">Leading icon</title>
                    <desc id="desc-ac09">Icon that describes the summary</desc>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
                    />
                    </svg>
                    Is WindUi open source?
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-labelledby="title-ac10 desc-ac10"
                    >
                    <title id="title-ac10">Open icon</title>
                    <desc id="desc-ac10">
                        icon that represents the state of the summary
                    </desc>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                    />
                    </svg>
                </summary>
                <p className="mt-4 text-slate-500">
                    WindUI is not an open source project yet, but we don't guarantee
                    that it won't become in the future.
                </p>
                </details>
                <details className="group p-4">
                <summary className="relative flex cursor-pointer list-none gap-4 pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6  shrink-0  stroke-amber-500  "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-labelledby="title-ac11 desc-ac11"
                    >
                    <title id="title-ac11">Leading icon</title>
                    <desc id="desc-ac11">Icon that describes the summary</desc>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    />
                    </svg>
                    How can I help improve WindUI?
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-0 top-1 h-4 w-4 shrink-0 stroke-slate-700 transition duration-300 group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-labelledby="title-ac12 desc-ac12"
                    >
                    <title id="title-ac12">Open icon</title>
                    <desc id="desc-ac12">
                        icon that represents the state of the summary
                    </desc>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                    />
                    </svg>
                </summary>
                <p className="mt-4 text-slate-500">
                    You can help our team improve WindUI by giving us feedback on our
                    discord channel.
                </p>
                </details>
            </section>
            </div>


            <div className="lg:flex-grow lg:flex-shrink items-end flex flex-col">
                <div className='flex flex-row w-full ' >
                    <div className='flex-grow items-start text-start justify-end mr-10 lg:mr-0 lg:justify-start  flex '>
                        <ul className='text-slate-700'>
                            <li className='text-2xl mb-2 font-bold'>
                                {firstName} {lastName}
                            </li>
                            <li className='mb-2 text-slate-500'>
                                {email}
                            </li>
                            <li className='mb-2 text-slate-500'>
                                Úroveň oprávnění: {clearance}
                            </li>
                            <li className='text-slate-500 '>
                                Povolené aktivity:
                            </li>




                        </ul>
                        
                    </div>
                    <div className='flex-shrink'>
                        <AvatarPicture handleCLick={handleCLick}/>
                    </div>
                </div>
                <div className='flex justify-start w-full'>
                    <ul className="divide-y justify-start divide-slate-200">
                        <li className="flex items-start gap-4 px-4 py-3">
                            <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center w-full">
                                <h4 className="text-base text-slate-700">Faster Development</h4>
                                <p className="w-full text-start text-sm truncate text-slate-500">Rapidly build UI with pre-designed components.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4 px-4 py-3">
                            <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center w-full">
                                <h4 className="text-base text-slate-700">Mobile-First Approach</h4>
                                <p className="w-full text-sm text-start truncate text-slate-500">Optimize design for mobile and small screens.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4 px-4 py-3">
                            <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center w-full">
                                <h4 className="text-base text-slate-700">Customizable</h4>
                                <p className="w-full text-sm text-start truncate text-slate-500">Easily modify design and color scheme to fit brand.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4 px-4 py-3">
                            <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center w-full">
                                <h4 className="text-base text-slate-700">Low Learning Curve</h4>
                                <p className="w-full text-sm text-start truncate text-slate-500">Simple and intuitive syntax for CSS thats easy to learn and progress.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4 px-4 py-3">
                            <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center w-full">
                                <h4 className="text-base text-slate-700">Scalability</h4>
                                <p className="w-full text-sm text-start truncate text-slate-500">Easily maintainable and reusable code for large projects.</p>
                            </div>
                        </li>
                    </ul>
                </div>

                    


                
                <div className='text-start'>
                    
                </div>
                
                <div className='text-start text-sm'>
                    
                    {clearance === 'visitor' && <span> <br /> - Vkládání komentářů <br /> - hodnocení článků <br /> - změna hesla <br /> - změna profilového obrázku</span>}  

                </div>
           
                <div className='hidden'>
                    <ModalCrop  open={open} setOpen={setOpen}/>
                </div>
                

            </div>
            
        </div>
    )
}