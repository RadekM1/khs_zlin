

 import Image from "next/image";
 import { IoMdSend } from "react-icons/io";


export default function CommentCardInput ({row})  {




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
 


          <div className="flex flex-nowrap min-w-[250px] relative flex-row">
            <div className="">
              <textarea
                id="id-01"
                type="text"
                name="id-01"
                placeholder="Přidat komentář"
                rows="3"
                className="peer relative w-[250px] rounded border border-slate-200 px-4 py-2 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-orange-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              ></textarea>
              <label
                for="id-01"
                className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-orange-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Přidat komentář
              </label>
            </div>
            <div className="self-end absolute right-0 end-0 m-2 text-end">
              <IoMdSend className="w-6 h-6 text-gray-400 hover:text-orange-400" />
            </div>
            
          </div>
      
         
          </div>
      </div>
      <div>
      
      </div>


    <div className="flex w-full   overflow-hidden ">
  
  </div>
</div>



)
}