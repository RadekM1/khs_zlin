import Link from "next/link";

export default function page() {
    return (
      
      <div className="flex w-full flex-col justify-center">
        <span className="text-2xl">Členství v oddíle</span>
         
        <div className="flex justify-center my-10">
    
              
    <div className='text-start flex flex-col'>
        <span className='my-1'>rychlá navigace v sekci:</span>

        <Link href={'/clenstvi-v-oddile/oddilove-akce'} className='text-orange-500 underline my-1' >Oddílové akce</Link>
        <Link href={'/clenstvi-v-oddile/knihovna'} className='text-orange-500 underline my-1' >Knihovna</Link>
        <Link href={'/clenstvi-v-oddile/pujcovna-vybaveni'} className='text-orange-500 underline my-1' >Půjčovna vybavení</Link>
        <Link href={'/clenstvi-v-oddile/vyhody-clenstvi'} className='text-orange-500 underline my-1' >Výhody členství</Link>
        <Link href={'/clenstvi-v-oddile/podminky-clenstvi'} className='text-orange-500 underline my-1' >Podmínky členství</Link>

  
          </div>
        </div>
      </div>
    );
  }
  