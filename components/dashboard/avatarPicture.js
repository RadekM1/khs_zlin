'use client'
import {useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import React from 'react';
import { FaEdit } from 'react-icons/fa'; // Import ikony tužky z react-icons


export default function AvatarPicture({ handleCLick }) {
  const [imageSrc, setImageSrc] = useState(undefined)
  const { data: session } = useSession();
  useEffect(()=>{
    if(session){
      setImageSrc(session.user.avatar)
    }else{
      setImageSrc(undefined)
    }
  }, [session])

  return (
    <div className="relative group w-32 h-32">
      {/* Fotka */}
      <img
        src={imageSrc ? imageSrc : 'https://storage.googleapis.com/khs-zlin/avatars/User-avatar.svg.png'}
        alt="Profile"
        className="w-full h-full object-cover rounded-full"
        width={100}
        height={100}
      />
      
      {/* Overlay s tužkou */}
      <div onClick={()=>{handleCLick()}} className= {` absolute inset-0 hover:cursor-pointer bg-black bg-opacity-80 rounded-full flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-300`}>
        <button
          onClick={()=>{handleCLick()}}
          className="text-white text-xl"
        >
          <FaEdit className='h-8 w-8 left-12 absolute bottom-0 flex' />
        </button>
      </div>
    </div>
  );
}
