import { FaFacebook } from "react-icons/fa";
import ModalImg from "./modal";


export default function Footer () {
    return (
        
        <div className='bg-gray-100 w-full border-t-gray-300 dark:text-gray-400 dark:border-t-gray-500 dark:bg-[#121212] flex flex-col items-center'>
        <div className='w-full max-w-screen-lg my-5 px-4 sm:px-6 md:px-8 lg:px-0'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
             
                <div className="m-2">
                    <div className="text-2xl py-4 mb-4">
                        Kontakt
                        <div className="border-b-gray-300 dark:border-b-gray-500 mt-1 border-b-[1px] mr-80 md:mr-44"></div>
                    </div>
                    <ul className="text-sm">
                        <li>Klub horských sportů Zlín, z.s.</li>
                        <li>Hradská 854</li>
                        <li>760 01 Zlín</li>        
                        <div className="mt-4">
                            <li className="mt-3">IČO: 65823494</li>
                            <li>Číslo účtu: 6683137002/5500</li>
                            <li>Jsme neplátci DPH.</li>
                        </div>
                        <div className="mt-4">
                            <li>info@khszlin.com</li>
                            <li>Předseda – Mirek Ingr 737 741 740</li>
                            <li>Místopředseda – Filip Kotopulos 606 647 037</li>
                        </div>
                        <li> 
                            <a href="https://www.facebook.com/khszlin/?locale=cs_CZ" target="_blank">
                                <FaFacebook  className="w-10 h-10 mt-16 text-gray-600" />
                            </a>
                        </li>
                    </ul>
                </div>
    
               
                <div className="m-2 md:ml-10">
                    <div className="text-2xl py-4 mb-4">
                        Navigace
                        <div className="border-b-gray-300 dark:border-b-gray-500 mt-1 border-b-[1px] mr-80 md:mr-36"></div>
                    </div>
                    <ul className="text-sm">
                        <li>Novinky</li>
                        <li className="mt-2">Články</li>
                        <div className="ml-2 mt-1 border-l-gray-400 dark:border-l-gray-500 border-l-[1px]">
                            <li className="ml-2">Horolezectví</li>
                            <li className="ml-2">Skály</li>
                            <li className="ml-2">Oddíl</li>
                            <li className="ml-2">Ostatní</li>
                        </div>
                        <li className="mt-2">Kurzy</li>
                        <div className="ml-2 border-l-gray-400 dark:border-l-gray-500 border-l-[1px]">
                            <li className="ml-2 mt-1">Horoškola</li>
                            <li className="ml-2">Horokruh</li>
                        </div>
                        <li className="mt-2">O nás</li>
                        <li className="mt-2">Kontakt</li>
                        <li className="mt-2">Oddílové akce</li>
                        <li className="mt-2">Pro členy</li>
                    </ul>
                </div>
    
                
                <div className="md:w-full flex justify-start lg:justify-center">
                    <div className="w-2/5 lg:w-full  ">
                        <ModalImg 
                            imgSrc={'https://storage.googleapis.com/khs-zlin/certifikace_CHS.jpg'} 
                            alt={'certifikace ČHS'} 
                        />
                    </div>

                </div>
            </div>
        </div>
    
        <div className="w-full dark:bg-[#121212] bg-slate-100 flex mt-2 border-t-gray-300 dark:border-t-gray-600 border-t-[1px] text-gray-400 justify-end">
            <a href="https://www.radekmorong.cz" target="_blank" className="flex py-2 items-center">
                <span className="mr-10 text-sm">&copy; 2024 crafted by Radek Morong</span>
            </a>
        </div>
    </div>

    )
}