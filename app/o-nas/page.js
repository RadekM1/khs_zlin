import Link from "next/link";


export default function page() {
    return (

        <div className="flex w-full flex-col">
          <span className="text-2xl">O nás</span>
          
          <div className="flex justify-center my-10">
    
              
                <div className='text-start flex flex-col'>
                    <span className='my-1'>rychlá navigace v sekci:</span>

                    <Link href={'/o-nas/historie-oddilu'} className='text-orange-500 underline my-1' >Historie oddílu</Link>
                    <Link href={'/o-nas/vedeni-oddilu'} className='text-orange-500 underline my-1' >Vedení oddílu</Link>
                    <Link href={'/o-nas/instruktori-horoskoly'} className='text-orange-500 underline my-1' >Instruktoři horoškoly</Link>
                    <Link href={'/o-nas/treneri-lezeni'} className='text-orange-500 underline my-1' >Trenéři lezení</Link>

                    

                    

                    

                </div>






        </div>
      </div>
    );
  }
  