'use client'
import { usePathname } from "next/navigation";
import { IoHomeSharp } from "react-icons/io5";
import Link from "next/link";

export default function Breadcrumbs () {

   
    let pathName = usePathname();
    const pathNames = pathName.split('/').filter(path => path)


    if (pathName === '/') { 
        return null;
    }

    return (

        <div className="mt-20 border-b[1px] justify-start w-full dark:text-gray-500 border-b-gray-300 dark:border-b-gray-600 flex flex-row flex-grow max-w-screen-xl px-4 sm:px-6 md:px-8 lg:px-4  mx-auto">
            <div className="flex items-center">
            <Link href='/'> <IoHomeSharp className="hover:text-orange-600 dark:hover:text-orange-200 text-gray-500 mr-2" /> </Link>  


                


                {pathNames.map((item, index) => {
                let odkaz =  `/${pathNames.slice(0, index +1).join('/')}`
                let label = item.includes('-') ? item.replace('-',' ') : item
    
                return  (
                    <span key={index}> / 
                    <Link className="hover:text-orange-600 text-gray-600 dark:text-gray-200 dark:hover:text-orange-200" href={odkaz}>{label}</Link>
                    
                    </span>
                )
            })}

            </div>
        </div> 
    );
}
