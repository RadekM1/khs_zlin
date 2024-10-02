'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation';

 


export default function NotFound() {

  let pathName = usePathname();


  return (
    <div className="max-w-screen-xl mb-10 items-center flex flex-col flex-wrap my-4 px-4 sm:px-6 md:px-8 lg:px-0 h-screen  w-full dark:bg-[#161616] ">
      <div className="mt-10 text-2xl text-orange-600 ">
        STRÁNKA s názvem:  <span className='underline'>&apos;{pathName}&apos;</span>   NENALEZENA
      </div>
      <div className="mt-10 text-2xl text-gray-800 dark:text-gray-200  ">
        <Link className='border-b-[1px] border-gray-300 dark:border-gray-600' href={'/'}>tímto odkazem se vrátíte zpět na hlavní stránku</Link>
      </div>
    </div>
      

  )
}