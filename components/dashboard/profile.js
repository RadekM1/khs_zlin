'use client'

import {useSession} from 'next-auth/react';
import { useState, useEffect } from 'react';
import ModalCrop from '../modals/modalCrop';
import AvatarPicture from './avatarPicture';
import { IoMdHelpCircleOutline } from "react-icons/io";
import { AiFillCamera } from "react-icons/ai";

export default function Profile () {

    const { data: session } = useSession();
    const [clearance, setClearance]=useState(undefined)
    const [firstName, setFirstName] = useState(undefined)
    const [lastName, setLastName] = useState(undefined)
    const [email, setEmail] = useState(undefined)
    const [open, setOpen] = useState(false)

    useEffect(()=>{
        if(session){
          setClearance(session.user.clearance)
          setFirstName(session.user.firstName)
          setLastName(session.user.lastName)
          setEmail(session.user.email)
        }else{
          setClearance(undefined)
        }
        
      }, [session])

      const handleCLick = () =>{
        setOpen(true)
      }

     

    return (
        <div className="justify-center container mx-auto overflow-hidden lg:justify-normal flex-col-reverse flex lg:flex-row w-full mt-5">
            {/*  */} 
            <div className="justify-start w-full lg:w-2/3 dark:bg-[#161616] overflow-hidden mt-2 bg-white lg:m-5 dark:text-gray-200 dark:border-gray-800 border-gray-200 border-[1px] p-3 shadow-md  rounded-2xl flex flex-col">
            <section className="w-full divide-y divide-slate-200 rounded">
                <div className='flex-row flex'>
                    <div className=' text-slate-700 font-bold mr-4 text-xl text-start mb-2'>
                        <IoMdHelpCircleOutline className='text-orange-400 w-8 h-8'/>
                    </div>
                    <div className=' text-slate-700 dark:hover:text-white font-bold text-xl text-start mb-2'>
                        Nápověda
                    </div>
                </div>
                 
                <details className="p-4 group" open>
                    <summary className="relative text-start dark:text-white cursor-pointer dark:hover:text-white list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none   [&::-webkit-details-marker]:hidden">
                        Vítejte v administrační části webu !
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 stroke-slate-700 group-open:rotate-45"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-labelledby="title-ac01 desc-ac01"
                        >
                        <title id="title-ac01">Open icon</title>

                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                        />
                        </svg>
                    </summary>
                    <p className="mt-4 text-start dark:text-gray-300 dark:hover:text-white text-slate-500">
                        Zde naleznete základní údaje o tom jak funguje administrační část, rozkliknutím
                        sekcí níže se zobrazí podrobnosti k uvedeným tématům. 
                    </p>
                    </details>
                    <details className="p-4 group">
                    <summary className="relative text-start dark:text-white cursor-pointer dark:hover:text-white list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none   [&::-webkit-details-marker]:hidden">
                        Jak funguje navigace v administrační části ? 
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-0 w-4 h-4 transition duration-300 top-1  shrink-0 stroke-slate-700 group-open:rotate-45"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-labelledby="title-ac02 desc-ac02"
                        >
                        <title id="title-ac02">Open icon</title>
 
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                        />
                        </svg>
                    </summary>
                    <p className="mt-4 text-start  dark:text-gray-300 dark:hover:text-white  text-slate-500">
                        Povolené stránky naleznete pod vaší profilovkou v pravém horním rohu. Případně ještě pod logem v pravo od ikony domečku klikněte na tlačítko
                        dashboard a zobrazí se základní navigace stránek.
                    </p>
                    </details>
                    <details className="p-4 group">
                    <summary className="relative text-start dark:text-white dark:hover:text-white cursor-pointer list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
                        Přidání článku krok za krokem
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-0 w-4 h-4 transition duration-300 top-1 shrink-0 stroke-slate-700 group-open:rotate-45"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-labelledby="title-ac02 desc-ac02"
                        >
                        <title id="title-ac02">Open icon</title>
 
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                        />
                        </svg>
                    </summary>
                    <p className="mt-4 text-start  dark:text-gray-300 text-slate-500">
                        Po kliknutí na tlačítko 'články' v menu:
                        <ul>
                            <li>
                                - Vyberte kategorii příspěvku
                            </li>
                            <li>
                                - Zadejte titulek článku
                            </li>
                            <li>
                                - Vyplňte obsah článku
                            </li>
                            <li>
                                - Nahrajte fotografie
                            </li>
                            <li>
                                - Klikněte na některou z fotografií (zvolí se jako náhledá v kartě článků)
                                Pokud nebude zvolena stane se náhledovou automaticky první nahraná.
                            </li>
                            <li>
                                - Pokud budete chtít provést na článku po nahrátí nějaké změnu tak v seznamu článků najděte publikovaný článek,
                                klikněte na ikonku tužky a článek se objeví k editování. Proveďte úpravy, klikněte na uložit.
                            </li>
                        </ul>
                    </p>
                    </details>
                    <details className="p-4 group">
                    <summary className="relative text-start dark:text-white cursor-pointer dark:hover:text-white list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none   [&::-webkit-details-marker]:hidden">
                        Nahrání novinky 
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-0 w-4 h-4 transition duration-300 top-1  shrink-0 stroke-slate-700 group-open:rotate-45"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-labelledby="title-ac02 desc-ac02"
                        >
                        <title id="title-ac02">Open icon</title>
 
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                        />
                        </svg>
                    </summary>
                    <p className="mt-4 text-start dark:text-gray-300 dark:hover:text-white  text-slate-500">
                        Nahrání novinky funguje ve stejném duchu jako článek s tou vyjímkou že obsahuje jiný (komplexnější) textový
                        editor a nelze nahrávat fotogalerii (z důvodu povahy novinky jenž má omezenou platnost a následně se maže).
                        Nicméně jedná se o zdarma verzi s omezením (1000x načtení měsíčně zdarma) tak moc neklikejte refresh :).
                        Po zvoleném expiračním datu se nebude novinka již nadále zobrazovat v seznamu. 
                    </p>
                    </details>
                    <details className="p-4 group">
                    <summary className="relative text-start dark:text-white cursor-pointer dark:hover:text-white list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none   [&::-webkit-details-marker]:hidden">
                        Kalendář
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-0 w-4 h-4 transition duration-300 top-1  shrink-0 stroke-slate-700 group-open:rotate-45"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-labelledby="title-ac02 desc-ac02"
                        >
                        <title id="title-ac02">Open icon</title>
 
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                        />
                        </svg>
                    </summary>
                    <p className="mt-4 text-start dark:text-gray-300 dark:hover:text-white  text-slate-500">
                        To co nahrajete na kalendář se automaticky projeví na hlavní stránce. Na rozdíl od hlavní stránky
                        je kalendář v adminu interaktivní (na hlavní stránce je zamčený).
                        Lze vkládat, mazat, editovat nové události. 
                        Na hlavní stránce se zobrazuje pouze aktuální měsíc, v adminu lze vyplnit dopředu. Akce na více dní
                        je bohužel nutno naklikat "po dni". Zadání v intervalech taky není naprogramováno, musí se naklikat.
                    </p>
                    </details>
                    <details className="p-4 group">
                    <summary className="relative text-start dark:text-white cursor-pointer dark:hover:text-white list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none   [&::-webkit-details-marker]:hidden">
                        Knihovna
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-0 w-4 h-4 transition duration-300 top-1  shrink-0 stroke-slate-700 group-open:rotate-45"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-labelledby="title-ac02 desc-ac02"
                        >
                        <title id="title-ac02">Open icon</title>
 
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                        />
                        </svg>
                    </summary>
                    <p className="mt-4 text-start dark:text-gray-300 dark:hover:text-white  text-slate-500">
                        Knihovna je taky plně interaktivní, lze do prvního řádku vkládat nové 
                        příspěvky, případně po kliknutí na tužku v první řádku položku editovat.
                        Opět na veřejné části stránky je umožněno pouze prohlížení, nezobrazují se citlivá data (kdo má vypůjčeno, atd)
                    </p>
                    </details>
                    <details className="p-4 group">
                    <summary className="relative text-start dark:text-white cursor-pointer dark:hover:text-white list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none   [&::-webkit-details-marker]:hidden">
                        Půjčovna
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-0 w-4 h-4 transition duration-300 top-1  shrink-0 stroke-slate-700 group-open:rotate-45"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-labelledby="title-ac02 desc-ac02"
                        >
                        <title id="title-ac02">Open icon</title>
 
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                        />
                        </svg>
                    </summary>
                    <p className="mt-4 text-start dark:text-gray-300 dark:hover:text-white  text-slate-500">
                        Půjčovma má stejně jako knihovna a kalendář dvě verze (admin interaktivní a veřejná k prohlížení). Lze přidávat, 
                        upravovat, mazat nové položky. Veškeré citlivé údaje nejsou na veřejné stránce k dispozici. 
                    </p>
                    </details>
                    <details className="p-4 group">
                    <summary className="relative text-start dark:text-white cursor-pointer dark:hover:text-white list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none   [&::-webkit-details-marker]:hidden">
                        Profil a výměna obrázku
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-0 w-4 h-4 transition duration-300 top-1  shrink-0 stroke-slate-700 group-open:rotate-45"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-labelledby="title-ac02 desc-ac02"
                        >
                        <title id="title-ac02">Open icon</title>
 
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                        />
                        </svg>
                    </summary>
                    <p className="mt-4 text-start dark:text-gray-300 dark:hover:text-white  text-slate-500">
                        Úvodní profilová stránka slouží převážně pro poskytnutí informací o úrovni oprávnění, jaké lze provádět operace, 
                        změnu úvodní fotografie. Nahrání nové fotografie by mělo proběhnout rychle, změna fotografie se dle zvolené architektury 
                        webu může projevit se zpožděním až několika minut. 
                    </p>
                    </details>
                    

                    <details className="p-4 group">
                    <summary className="relative text-start dark:text-white cursor-pointer dark:hover:text-white list-none pr-8 font-medium text-slate-700 transition-colors duration-300 focus-visible:outline-none   [&::-webkit-details-marker]:hidden">
                        Vkládání komentářů a lajkování (srdíčka)
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-0 w-4 h-4 transition duration-300 top-1  shrink-0 stroke-slate-700 group-open:rotate-45"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-labelledby="title-ac02 desc-ac02"
                        >
                        <title id="title-ac02">Open icon</title>
 
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                        />
                        </svg>
                    </summary>
                    <p className="mt-4 text-start dark:text-gray-300 dark:hover:text-white  text-slate-500">
                        Ke každému článku lze vložit komentáře a "lajk" buď pod hlavní textem článku, případně 
                        srdíčko ještě na kartě článku buď v sekci "články" nebo u nejnovějších článků na hlavní straně. 
                    </p>
                    </details>


                    


            </section>
            </div>







            <div className="lg:flex-grow lg:flex-shrink items-end flex flex-col">
                <div className='flex flex-row w-full ' >
                    <div className='flex-grow items-start text-start justify-end mr-10 lg:mr-0 lg:justify-start  flex '>
                        <ul className='text-slate-700 dark:text-white'>
                            <li className='text-2xl dark:text-white mb-2 font-bold'>
                                {firstName} {lastName}
                            </li>
                            <li className='mb-2 dark:text-white text-slate-500'>
                                {email}
                            </li>
                            <li className='mb-2 dark:text-white text-slate-500'>
                                Úroveň oprávnění: {clearance}
                            </li>
                            <li className='text-slate-500 dark:text-white '>
                                Povolené aktivity:
                            </li>




                        </ul>
                        
                    </div>
                    <div className='mx-2 flex-shrink'>
                        <AvatarPicture handleCLick={handleCLick}/>
                    </div>
                </div>
                <div className='flex dark:text-white  justify-start w-full'>
                    <ul className="divide-y justify-start divide-slate-200">
                        <li className="flex items-start gap-4 px-4 py-3">
                            <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center w-full">
                                <h4 className="text-base text-inherit text-slate-700">Lajkovat články, vkládat komentáře</h4>
                                <p className="w-full text-start text-sm truncate text-slate-500">Každý článek lze pod hlavním textem okomentovat, případně přidat "srdíčko"</p>
                            </div>
                        </li>
                        <li className="flex items-start  gap-4 px-4 py-3">
                            <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center w-full">
                                <h4 className="text-base text-inherit text-slate-700">Profil a výměna obrázku</h4>
                                <p className="w-full text-sm text-start truncate text-slate-500">Na stránce profil (první stránka po přihlášení) lze měnit fotografii, více info v nápovědě.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4 px-4 py-3">
                            <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center w-full">
                                <h4 className="text-base text-inherit text-slate-700">Customizable</h4>
                                <p className="w-full text-sm text-start truncate text-slate-500">Easily modify design and color scheme to fit brand.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4 px-4 py-3">
                            <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center w-full">
                                <h4 className="text-base text-inherit text-slate-700">Low Learning Curve</h4>
                                <p className="w-full text-sm text-start truncate text-slate-500">Simple and intuitive syntax for CSS thats easy to learn and progress.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-4 px-4 py-3">
                            <div className="flex flex-col gap-0 min-h-[2rem] items-start justify-center w-full">
                                <h4 className="text-base text-inherit text-slate-700">Scalability</h4>
                                <p className="w-full text-sm text-start truncate text-slate-500">Easily maintainable and reusable code for large projects.</p>
                            </div>
                        </li>
                    </ul>
                </div>

                    


                <div className='hidden'>
                    <ModalCrop  open={open} setOpen={setOpen}/>
                </div>
                

            </div>
           
        </div>
    )
}