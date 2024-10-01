'use client'
'use strict'


import { FaFacebook } from "react-icons/fa";
import ModalImg from "./modal";
import Link from "next/link";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";


export default function Footer () {

    let path = usePathname();
    const searchParams = useSearchParams();
    const currentFilter = searchParams.get('filter');

        
    
    let clankyClass = 'border-l-gray-300 dark:text-gray-400 dark:hover:border-l-orange-200 hover:border-l-orange-600 dark:border-l-gray-500 border-l-[1px] pl-2 pt-1  dark:hover:text-orange-200 hover:text-orange-600'
    let activeFooterHeadline = 'dark:text-orange-200 text-orange-600'
    let inActiveFooterHeadline = 'dark:text-gray-400  dark:hover:text-orange-200 hover:text-orange-600'
    let activeFooter = 'border-l-[1px] pl-2 pt-1 border-l-orange-200 text-orange-600 dark:text-orange-200 '
    let inActiveFooter = 'dark:text-gray-400  border-l-[1px] text-gray-700 pl-2 pt-1 border-l-gray-300 dark:hover:border-l-orange-200 hover:border-l-orange-600 dark:border-l-gray-500 dark:hover:text-orange-200 hover:text-orange-600'

    return (
        
        <div className='bg-gray-100 w-full  border-t-gray-300 text-gray-700 dark:text-gray-400 dark:border-t-gray-500 dark:bg-[#121212] flex flex-col items-center'>
        <div className='w-full max-w-screen-lg my-5 px-4 sm:px-6 md:px-8 lg:px-0'>
            <div className="grid grid-cols-1 ml-3 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
                <div className="m-2">
                    <div className="text-2xl  py-4 mb-4">
                        <Link href='/kontakt'>Kontakt</Link>    
                        <div className="border-b-gray-300 dark:border-b-gray-500 mt-1 border-b-[1px] mr-80 md:mr-14"></div>
                    </div>
                    <ul className="text-sm">
                        <li> < IoLocationSharp className="w-8 h-8 mb-5 text-gray-600" /> </li>
                        <li>Klub horských sportů Zlín, z.s.</li>
                        <li>Hradská 854</li>
                        <li>760 01 Zlín</li>        
                        <div className="border-b-gray-300 dark:border-b-gray-500 mt-1 border-b-[1px] mr-80 md:mr-14"></div>
                        <div className="mt-4">
                            <li> < MdEmail className="w-8 h-8 mb-3 text-gray-600" /> </li>
                            <li>info@khszlin.com</li>
                            <div className="border-b-gray-300 dark:border-b-gray-500 mt-1 border-b-[1px] mr-80 md:mr-14"></div>
                            <li> < FaPhone className="w-7 h-7 mt-5 mb-3 text-gray-600" /> </li>
                            <li>Předseda – Mirek Ingr: 737 741 740</li>
                            <li>Místopředseda – Filip Kotopulos: 606 647 037</li>
                            <div className="border-b-gray-300 dark:border-b-gray-500 mt-1 border-b-[1px] mr-80 md:mr-14"></div>
                        </div>
                        <div className="mt-4 mb-5">
                            <li className="mt-3">IČO: 65823494</li>
                            <li>Číslo účtu: 6683137002/5500</li>
                            <li>Jsme neplátci DPH.</li>
                            <div className="border-b-gray-300 dark:border-b-gray-500 mt-1 border-b-[1px] mr-80 md:mr-14"></div>
                        </div>
                        <li> 
                            <a href="https://www.facebook.com/khszlin/?locale=cs_CZ" target="_blank">
                                <FaFacebook  className="w-8 h-8 mt-5 text-gray-600" />
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
                        <Link href='/novinky' className={` ${path.includes('/novinky') ? activeFooterHeadline : inActiveFooterHeadline  } `}><li>Novinky</li></Link>
                        <Link className={` ${path.includes('/clanky') ? activeFooterHeadline : inActiveFooterHeadline  } `} href='/clanky'><li className="mt-2 pb-1 pt-2">Články</li></Link>
                        <div>
                            <Link href='/clanky?filter=horolezectvi'><li className= {'horolezectvi' === (currentFilter)  ? activeFooter : inActiveFooter}>Horolezectví</li></Link>
                            <Link href='/clanky?filter=skaly'><li className={'skaly' === (currentFilter)  ? activeFooter : inActiveFooter}>Skály</li></Link>
                            <Link href='/clanky?filter=oddil'><li className={'oddil' === (currentFilter)  ? activeFooter : inActiveFooter}>Oddíl</li></Link>
                            <Link href='/clanky?filter=ostatni'><li className={'ostatni' === (currentFilter)  ? activeFooter : inActiveFooter}>Ostatní</li></Link>
                        </div>
                        <li className="mt-2 pb-1 pt-2">Kurzy</li>
                        <div>
                            <Link href='/kurzy/horoskola-skaly'> <li className= {path.includes('/kurzy/horoskola-skaly') ? activeFooter : inActiveFooter} >Horoškola - skály</li> </Link>
                            <Link href='/kurzy/horoskola-vicedelky'> <li className={path.includes('/kurzy/horoskola-vicedelky') ? activeFooter : inActiveFooter}>Horoškola - vícedélky</li> </Link>
                            <Link href='/kurzy/lavinova-prevence'> <li className={path.includes('/kurzy/lavinova-prevence') ? activeFooter : inActiveFooter}>Lavinová prevence</li> </Link>
                            <Link href='/kurzy/lezeni-v-ledu'> <li className={path.includes('/kurzy/lezeni-v-ledu') ? activeFooter : inActiveFooter}>Lezení v ledu</li> </Link>
                            <Link href='/kurzy/zimni-lezeni'> <li className={path.includes('/kurzy/zimni-lezeni') ? activeFooter : inActiveFooter}>Zimní lezení</li> </Link>
                            <Link href='/kurzy/horokruh'> <li className={path.includes('/kurzy/horokruh') ? activeFooter : inActiveFooter}>Horokruh</li> </Link> 
                        </div>
                        <li className="mt-2 pb-1 pt-2">O nás</li>
                        <div>
                            <Link href='/o-nas/historie-oddilu'> <li className={path.includes('/o-nas/historie-oddilu') ? activeFooter : inActiveFooter}>Historie oddílu</li> </Link>
                            <Link href='/o-nas/vedeni-oddilu'> <li className={path.includes('/o-nas/vedeni-oddilu') ? activeFooter : inActiveFooter}>Vedení oddílu</li> </Link>
                            <Link href='/o-nas/instruktori-horoskoly'> <li className={path.includes('/o-nas/instruktori-horoskoly') ? activeFooter : inActiveFooter}>Instruktoři horoškoly</li> </Link>
                            <Link href='/o-nas/instruktori-lezeni'> <li className={path.includes('/o-nas/instruktori-lezeni') ? activeFooter : inActiveFooter}>Instruktoři lezení</li> </Link>
                        </div>
                        <li className="mt-2 pb-1 pt-2">Členství v oddíle</li>
                        <div>
                            <Link href='/clenstvi-v-oddile/oddilove-akce'> <li className={path.includes('/clenstvi-v-oddile/oddilove-akce') ? activeFooter : inActiveFooter}>Oddílové akce</li> </Link>
                            <Link href='/clenstvi-v-oddile/knihovna'> <li className={path.includes('/clenstvi-v-oddile/knihovna') ? activeFooter : inActiveFooter}>Knihovna</li> </Link>
                            <Link href='/clenstvi-v-oddile/pujcovna-vybaveni'> <li className={path.includes('/clenstvi-v-oddile/pujcovna-vybaveni') ? activeFooter : inActiveFooter}>Půjčovna vybavení</li> </Link>
                            <Link href='/clenstvi-v-oddile/vyhody-clenstvi'> <li className={path.includes('/clenstvi-v-oddile/vyhody-clenstvi') ? activeFooter : inActiveFooter}>Výhody členství</li> </Link>
                            <Link href='/clenstvi-v-oddile/podminky-clenstvi'> <li className={path.includes('/clenstvi-v-oddile/podminky-clenstvi') ? activeFooter : inActiveFooter}>Podmínky členství</li> </Link>
                        </div>
                        <Link className={` ${path.includes('/kontakt') ? activeFooterHeadline : inActiveFooterHeadline  } `} href='/kontakt'> <li className="mt-3">Kontakt</li> </Link>
                    </ul>
                </div>
                <div className="md:w-full flex  justify-start lg:justify-center">
                    <div className="w-2/5 lg:w-full">
                        <ModalImg 
                            imgSrc={'https://storage.googleapis.com/khs-zlin/certifikace_CHS.jpg'} 
                            alt={'certifikace ČHS'} 
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full dark:bg-[#121212] bg-slate-100 flex mt-2 dark:hover:text-orange-200 hover:text-orange-600 border-t-gray-300 dark:border-t-gray-600 border-t-[1px] text-gray-400 justify-end">
            <a href="https://www.radekmorong.cz" target="_blank" className="flex py-2 items-center">
                <span className="mr-10 text-sm">&copy; 2024 crafted by Radek Morong</span>
            </a>
        </div>
    </div>

    )
}