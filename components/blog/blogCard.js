
import Image from "next/image";
import Link from "next/link";
import HeartSessionCover from "./heartSessionCover";
import Share from "./share"
import { FaRegComment } from "react-icons/fa";


export default function BlogCard ({data})  {


  let tempShortDescription = `${data.description.slice(0,100)}...`

  let category

  switch(data.category){
    case 'skaly' : {category =  'skály' ; break;} 
    case 'hory' : {category = 'hory' ; break  ;} 
    case 'oddil' : {category = 'oddíl' ; break;} 
    case 'ostatni' : {category = 'ostatní'; break;} 
    default: break ;
  }
  
let share = `/clanky/${data.slug}`
let heartsSum = data.hearts_count
let heartsList = data.liked_by
let slug = data.slug


return (


  
  
<div className="flex mt-4 md:mt-2 flex-col ">
  <div className="flex flex-row md:m-2 flex-wrap transition-shadow duration-300 hover:shadow-lg hover:shadow-gray-400 dark:hover:shadow-gray-800  dark:border-gray-600 border-gray-200 border dark:bg-[#1E1E1E] bg-white rounded shadow-lg  ">
  <Link href={`/clanky/${data.slug}`}>
    <div className="flex flex-row transition-opacity  duration-300 hover:opacity-80 md:flex-row  md:space-x-5 space-y-3 md:space-y-0  p-1 mx-auto  "> 
      <div className="px-3 w-1/3 self-start max-w-[200px]  py-1 dark:bg-[#1E1E1E] bg-white pl-2">
          <Image
            src={data.thumbnail}
            alt={data.title}
            className="rounded max-h-[100px] md:max-h-[150px] w-auto object-cover flex self-start "
            width={250}
            height={100}
          />
        </div>
        <div className="w-2/3 dark:bg-[#1E1E1E] bg-white justify-start flex flex-col ">
          <span className="font-black dark:text-gray-300  text-gray-700 -mt-2 md:mt-2  md:text-base text-start text-xs">
            {data.title}
          </span>
          <div className="flex flex-nowrap  flex-row">
            <div className="flex mt-1 flex-row overflow-hidden">
              <Image
                width={30}
                height={30}
                alt={`úvodní obrázek z článku na téma: ${data.title}`}
                src={data.avatar}
                className="inline-block dark:ring-[#1E1E1E] h-6 w-6 self-center object-fill rounded-full ring-2 ring-white"
              />
            </div>
            <div className="text-xs mx-2 dark:text-gray-500 flex text-gray-500 self-center ">
              {data.nickname}
            </div>
            <div className="text-xs mx-2 dark:text-gray-500 text-gray-500  flex self-center ">
              {data.created_time}
            </div>
          </div>
            <p className=" hidden sm:block dark:text-gray-200 text-gray-500 mt-3 text-xs  md:text-sm text-start">
              {data.description}
            </p>
            <p className="block sm:hidden mt-1 dark:text-gray-200 text-gray-500 text-xs text-start">
              {tempShortDescription}
            </p>
          </div>
      </div>
      <hr className="m[1px] mx-2 dark:border-gray-600 border-gray-200"/>
    </Link>
    <div className="flex w-full   overflow-hidden ">
      <div className='flex w-full flex-row'>
        <div className="text-xs justify-end flex-row  flex  flex-nowrap">
          <div className="justify-center  dark:text-gray-100 text-gray-600 flex ">
            <FaRegComment className="mx-2 w-5 h-5 dark:text-gray-600 text-gray-400 self-center"/>
          </div>
          <div className="text-xs mr-2 flex dark:text-gray-200 self-center">
            {data.comments_count}
          </div>
          <button className="mx-2 dark:text-gray-100 ">
          <HeartSessionCover 
            likes = {heartsSum}
            heartsList = {heartsList}
            slug = {slug}
            />
          </button>
        </div>
        <div className="text-sm mx-2  flex self-center">
          <Share share={share} />
        </div>
        <div className="self-center mx-2  ">
          <div className="bg-gray-200 dark:text-gray-300 dark:bg-gray-600 self-center px-3 py-1 rounded-full text-xs text-gray-600">
            {category}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


)
}