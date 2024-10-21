

 import Image from "next/image";
 import Link from "next/link";



export default function CommentCard ({row})  {




return (

  
  
<div className="flex my-4 flex-col ">
  <div className="flex flex-row md:m-2 flex-wrap    dark:bg-[#161616]  rounded-2xl  ">

    <div className="flex flex-row transition-opacity md:flex-row  md:space-x-2 space-y-3 md:space-y-0  p-1 mx-auto  "> 
      <div className="px-1 w-[50px] self-start py-1   pl-2">
      <div className="flex flex-row overflow-hidden">
              <Image
                width={30}
                height={30}
                alt={`úvodní obrázek z článku na téma: ${row.title}`}
                src={row.avatar}
                className="inline-block  h-10 w-10 self-center object-fill rounded-full ring-2 ring-white dark:ring-[#161616]"
              />
            </div>
        </div>
        <div className="w-2/3 min-w-[300px] rounded-2xl min-h-[100px] dark:bg-[#1E1E1E] bg-white  dark:border-gray-600 border-gray-200 border justify-start flex flex-col ">
          <div className="flex-row  flex justify-between">
            <span className="font-black m-2 dark:text-gray-300  text-gray-700  md:text-base text-start text-xs">
              {row.nickname}
            </span>
            <span className="text-xs m-2 text-gray-500 ">
              {row.created_time}
            </span>
          </div>
          

          <div className="flex flex-nowrap  flex-row">
            <div className="text-xs md:text-sm m-2 text-start dark:text-gray-500 text-gray-500  flex self-center ">
              tohle je testovací komentář tak tu všechno pohejtuju protože mi to stejně nikdo nemůže smazat, haha !
              ještě by to možná chtělo pár úprav a hlavně víc srdíček všude klikat ať je to tu světový !
            </div>
          </div>

          </div>
      </div>
      <hr className="m[1px] mx-2 dark:border-gray-600 border-gray-200"/>

    <div className="flex w-full   overflow-hidden ">
  
  </div>
</div>
</div>


)
}