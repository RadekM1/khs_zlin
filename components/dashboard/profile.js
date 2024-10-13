'use client'

import {useSession} from 'next-auth/react';
import { useState, useEffect } from 'react';
import ModalCrop from '../modals/modalCrop';
import AvatarPicture from './avatarPicture';
import { IoMdHelpCircleOutline } from "react-icons/io";
import { AiFillCamera } from "react-icons/ai";

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
            {/*  */} 
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
                 
                <details className="p-4 group" open>
                    <summary className="relative cursor-pointer list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
                        How does TailwindCSS works?
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 stroke-slate-700 group-open:rotate-45"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-labelledby="title-ac01 desc-ac01"
                        >
                        <title id="title-ac01">Open icon</title>
                        <desc id="desc-ac01">
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
                        Tailwind CSS works by scanning all of your HTML files, JavaScript
                        components, and any other templates for className names, generating
                        the corresponding styles and then writing them to a static CSS file.
                    </p>
                    </details>
                    <details className="p-4 group">
                    <summary className="relative cursor-pointer list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
                        How do I install TailwindCSS?
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 stroke-slate-700 group-open:rotate-45"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-labelledby="title-ac02 desc-ac02"
                        >
                        <title id="title-ac02">Open icon</title>
                        <desc id="desc-ac02">
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
                        The simplest and fastest way to get up and running with Tailwind CSS
                        from scratch is with the Tailwind CLI tool. The CLI is also
                        available as a standalone executable if you want to use it without
                        installing Node.js. Install tailwindcss via npm, and create your
                        tailwind.config.js file.
                    </p>
                    </details>
                <details className="group p-4">
                <summary className="relative flex cursor-pointer list-none gap-4 pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
                <AiFillCamera />
                    Are the components only available in green?
                    <AiFillCamera />
                </summary>
                <p className="mt-4 text-slate-500">
                    All components are easily customizable to match your own project.
                </p>
                </details>
                <details className="group p-4">
                <summary className="relative flex cursor-pointer list-none gap-4 pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
                <AiFillCamera />
                    Are the components only available in green?
                    <AiFillCamera />
                </summary>
                <p className="mt-4 text-slate-500">
                    All components are easily customizable to match your own project.
                </p>
                </details>
                <details className="group p-4">
                <summary className="relative flex cursor-pointer list-none gap-4 pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none group-hover:text-slate-900  [&::-webkit-details-marker]:hidden">
                <AiFillCamera />
                    Are the components only available in green?
                    <AiFillCamera />
                </summary>
                <p className="mt-4 text-slate-500">
                    All components are easily customizable to match your own project.
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

                    


                <div className='hidden'>
                    <ModalCrop  open={open} setOpen={setOpen}/>
                </div>
                

            </div>
           
        </div>
    )
}