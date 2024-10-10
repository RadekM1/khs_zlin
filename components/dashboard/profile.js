'use client'

import {useSession} from 'next-auth/react';
import { useState, useEffect } from 'react';
import AvatarCrop from './avatarCrop';

export default function Profile () {

    const { data: session } = useSession();
    const [clearance, setClearance]=useState(undefined)
    const [firstName, setFirstName] = useState(undefined)
    const [lastName, setLastName] = useState(undefined)
    const [email, setEmail] = useState(undefined)

    useEffect(()=>{
        if(session){
          setClearance(session.user.clearance)
          setFirstName(session.user.firstName)
          setLastName(session.user.lastName)
        }else{
          setClearance(undefined)
        }
      }, [session])

  

    return (
        <div className="flex-col justify-center md:justify-normal flex md:flex-row w-full mt-5">
            <div className="justify-start bg-gray-100 m-5 dark:text-gray-200 dark:border-gray-800 border-gray-200 border-[1px] p-3 shadow-md dark:bg-gray-900 rounded-2xl flex flex-col">
                <div className='text-start'>
                    {firstName} {lastName}
                </div>
                <div className='text-start border-b-[1px] mb-4 mt-2'>
                    Úroveň oprávnění: {clearance}  
                </div>
                <div className='text-start'>
                    Povolené činnosti:
                </div>
                <div className='text-start text-sm'>
                    
                    {clearance === 'visitor' && <span> <br /> - Vkládání komentářů <br /> - hodnocení článků <br /> - změna hesla <br /> - změna profilového obrázku</span>}  

                </div>
            </div>

            

            
            <div className="md:ml-auto">
                <AvatarCrop />
            </div>
            
        </div>
    )
}