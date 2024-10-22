'use client'

import Image from 'next/image'
import { useEffect, useState} from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { GiHiking, GiMountainClimbing, GiNewspaper, GiSkis  } from "react-icons/gi";
import { MdRssFeed } from "react-icons/md";
import { LiaMountainSolid } from "react-icons/lia";
import BoulderIcon from '../boulderIcon'
import { CiLogout, CiLogin  } from "react-icons/ci";
import { IoIosSettings, IoIosInformationCircleOutline  } from "react-icons/io";
import { FiPhone } from "react-icons/fi";
import ThemeToggle from '../ThemeToggle'
import { VscChecklist } from "react-icons/vsc";
import Link from 'next/link'
import { HiOutlineUserPlus, HiOutlineTrophy  } from "react-icons/hi2";
import { RiBook3Line } from "react-icons/ri";
import { LuCalendarRange } from "react-icons/lu";
import { IoLibraryOutline, IoSchoolOutline } from "react-icons/io5";
import { TbMoodBoy } from "react-icons/tb";
import { GoThumbsup } from "react-icons/go";
import { MdHistory, MdAdminPanelSettings,MdAccountCircle } from "react-icons/md";
import { FaPeopleGroup, FaHillAvalanche, FaListCheck } from "react-icons/fa6";
import { FaIcicles, FaRegSnowflake } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import { IoPeopleOutline } from "react-icons/io5";
import {useSession, signOut } from 'next-auth/react';

const articles = [
  { id:1, name: 'Skály', description: 'Od písků v Ádru až po rulu v Chamonix', href: '/clanky?filter=skaly', filter:'skaly', icon: GiMountainClimbing },
  { id:2, name: 'Horolezectví', description: 'Vícedélky v tatrách, alpách a občas i exotika', href: '/clanky?filter=horolezectvi', filter:'horolezectvi', icon: LiaMountainSolid  },
  { id:3, name: 'Oddíl', description: 'Oddílové akce, soutěže, školení', href: '/clanky?filter=oddil', filter:'oddil', icon: BoulderIcon },
  { id:4, name: 'Ostatní', description: 'Zápisky z výprav po celém světě', href: '/clanky?filter=ostatni', filter:'ostatni', icon: GiHiking  },
]



const proCleny = [
  { id: 1, name: 'Oddílové akce', href: '/clenstvi-v-oddile/oddilove-akce', icon: HiOutlineTrophy },
  { id: 2, name: 'Knihovna', href: '/clenstvi-v-oddile/knihovna', icon: IoLibraryOutline },
  { id: 3, name: 'Půjčovna vybavení', href: '/clenstvi-v-oddile/pujcovna-vybaveni', icon: GiSkis },
  { id: 4, name: 'Výhody členství', href: '/clenstvi-v-oddile/vyhody-clenstvi', icon: GoThumbsup },
  { id: 5, name: 'Podmínky členství', href: '/clenstvi-v-oddile/podminky-clenstvi', icon: FaListCheck },
]
 
const kurzy = [
  { id: 1, name: 'Horoškola - skály', href: '/kurzy/horoskola-skaly', icon: BoulderIcon },
  { id: 2, name: 'Horoškola - vícedélky', href: '/kurzy/horoskola-vicedelky', icon: GiMountainClimbing },
  { id: 3, name: 'Lavinová prevence', href: '/kurzy/lavinova-prevence', icon: FaHillAvalanche },
  { id: 4, name: 'Lezení v ledu', href: '/kurzy/lezeni-v-ledu', icon: FaIcicles },
  { id: 5, name: 'Zimní lezení', href: '/kurzy/zimni-lezeni', icon: FaRegSnowflake },
  { id: 6, name: 'Horokruh - lezecký kroužek pro mládež', href: '/kurzy/horokruh', icon: TbMoodBoy },
]

const oNas = [
  { id: 1, name: 'Historie oddílu', href: '/o-nas/historie-oddilu', icon: MdHistory },
  { id: 2, name: 'Vedení oddílu', href: '/o-nas/vedeni-oddilu', icon: FaPeopleGroup },
  { id: 3, name: 'Instruktoři horoškoly', href: '/o-nas/instruktori-horoskoly', icon: LiaMountainSolid  },
  { id: 4, name: 'Trenéři lezení', href: '/o-nas/treneri-lezeni', icon: BoulderIcon },
]




export default function Navbar() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get('filter');
  const [clearance, setClearance] = useState(undefined)
  const [avatar, setAvatar] = useState('https://storage.googleapis.com/khs-zlin/avatars/User-avatar.svg.png')
  let pathName = usePathname();


  let active = 'text-orange-600 dark:text-orange-300 border-b-orange-600 dark:border-b-orange-200  border-b-2'
  let inActive = 'text-gray-700 dark:text-white dark:hover:text-orange-200 hover:text-orange-600'
  let activeMobile = 'dark:border-orange-200 border-orange-600 text-orange-600 dark:text-orange-200 border-l '
  let inActiveMobile = 'dark:hover:border-orange-200 hover:bg-gray-50 dark:hover:bg-slate-800 dark:border-gray-500  border-l border-gray-200 hover:border-orange-600  dark:hover:text-orange-200 hover:text-orange-600'

 
  
  useEffect(()=>{
    if(session){
      setClearance(session.user.clearance)
      if(session.user.avatar !== null){
        (setAvatar(session.user.avatar))
      }
      
    }else{
      
      setClearance(undefined)
    }
  }, [session])
 

  const handleLogout = () => {
   
    signOut({
      callbackUrl: '/login?filter=logout'
    })
  }



  return (

      
    <header className=" fixed z-30 w-full top-0 backdrop-blur-sm bg-slate-100/90 dark:bg-[#1E1E1E]/80 border-b-gray-300 dark:border-b-gray-600 border-b
     
    " > 
      <nav aria-label="Global" className="mx-auto flex  max-w-7xl items-end justify-between lg:justify-start p-2 lg:px-8">
        <div className="flex lg:flex-4">
          <div className="flex lg:hidden ">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="m-1 inline-flex items-center justify-center rounded-lg dark:text-white text-gray-700">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-10 w-10" />
            </button>
          </div>
          <div className='mr-8 pr-8'>
            <Link href="/">
              <Image priority  width={200} style={{width:'auto',height: '60px'}} height={200} alt="logo" src="https://storage.googleapis.com/khs-zlin/logo.svg" className=" absolute top-1 -ml-4 hidden lg:block" />
            </Link>
            <Link href="/">
              <Image priority  width={150} style={{width:'auto',height: '50px'}} height={150} alt="logo" src="https://storage.googleapis.com/khs-zlin/logo_small.svg" className=" absolute  flex ml-6 lg:hidden" />
            </Link>
          </div>
        </div>

       


        <div className='flex-grow ml-4  flex relative mr-2'>                               
        </div> {/* NAVIGAČNÍ LIŠTA DOLE */}
        <PopoverGroup className="hidden lg:flex flex-grow ml-10 lg:gap-x-5">
          <Link href="/novinky" className={`text-sm ml-10 leading-6 link ${pathName.includes('/novinky')  ? active : inActive } hover:border-b-2 z-50 -mb-2 hover:border-b-orange-600 dark:border-b-orange-200`}>Novinky</Link>
          <Popover className={`hover:border-b-2 z-50 -mb-2 ${pathName === '/clanky' ? active : inActive } hover:border-b-orange-600 dark:border-b-orange-200`}>
            {({ open, close }) => (
              <>
                <PopoverButton className={`flex focus:outline-none items-center gap-x-1 text-sm  leading-6`}>
                  Články
                  <ChevronDownIcon aria-hidden="true" className={`h-5  w-5 flex-none  text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
                </PopoverButton>
                <PopoverPanel className="absolute drop-shadow-xl dark:text-gray-300 top-full z-10  w-screen max-w-lg overflow-hidden rounded-3xl  dark:bg-gray-800 bg-slate-100 shadow-lg">
                <div className="p-4">
                    
                    <Link onClick={()=>close()} href='/clanky'>       
                        <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 dark:hover:bg-gray-700 hover:bg-white">
                          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg dark:bg-gray-800 bg-slate-100 dark:group-hover:bg-gray-700 group-hover:bg-white">
                            <VscChecklist aria-hidden="true" className= {` z-50 -mb-2 ${(pathName === '/clanky' && currentFilter === null)  ? 'text-orange-600 dark:text-orange-200' : '  text-gray-600 dark:text-gray-300  group-hover:text-orange-600 dark:group-hover:text-orange-200 ' } h-6 w-6 `} />
                          </div> 
                          <div className={` z-50 -mb-2 ${pathName === '/clanky' && currentFilter === null ? 'text-orange-600 dark:text-orange-200' : ' ' } `}>
                              Zobrazit všechny články
                            <p className="mt-1 text-gray-600 dark:text-gray-300 font-thin">Seznam všech článků bez filtrování</p>
                          </div>
                        </div>
                      </Link>
                       
                </div>
                  <div className="p-4 -mt-7">
                    {articles.map((item) => (
                    
                      <Link href={item.href} key={item.id} onClick={()=>close()} className=" ml-5 block font-semibold dark:text-gray-300 text-gray-700">       
                          
                        <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 dark:hover:bg-gray-700 hover:bg-white">
                          <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg dark:bg-gray-800 bg-slate-100 dark:group-hover:bg-gray-700 group-hover:bg-white">
                            <item.icon aria-hidden="true" className={` ${item.filter === currentFilter ? 'dark:text-orange-200 text-orange-600' : 'text-gray-600 dark:text-gray-300  group-hover:text-orange-600 dark:group-hover:text-orange-200' } h-6 w-6 `} />
                            
                          </div>
                          <div className={` ${item.filter.includes(currentFilter)  ? 'text-orange-600 dark:text-orange-200'  : 'dark:hover:text-orange-200 hover:text-orange-600'}  flex-auto  `}>
                              {item.name}
                            <p className="mt-1 text-gray-600 dark:text-gray-300 font-thin">{item.description}</p>
                          </div>
                        </div>
                           
                      </Link>
                   
                  ))}
                  </div>
                </PopoverPanel>
              </>
            )}
          </Popover>
          <Popover className={`hover:border-b-2 z-50 -mb-2 ${pathName.includes('/kurzy') ? 'border-b-2 border-b-orange-600' : '' }  hover:border-b-orange-600 dark:border-b-orange-200`}>
            {({ open, close }) => (
              <>
                <PopoverButton className={`flex  ${pathName.includes('/kurzy') ? 'text-orange-600 dark:text-orange-300' : 'dark:hover:text-orange-200 dark:text-white' } hover:text-orange-600  focus:outline-none items-center gap-x-1 text-sm  leading-6 text-gray-700`}>
                  Kurzy
                  <ChevronDownIcon aria-hidden="true" className={`h-5  w-5 flex-none text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
                </PopoverButton>
                <PopoverPanel className=" absolute drop-shadow-xl dark:text-gray-300 top-full z-10  w-screen max-w-lg overflow-hidden rounded-3xl  dark:bg-gray-800 bg-slate-100 shadow-lg">
                  <div className="p-4">
                    {kurzy.map((item) => (
                    <Link href={item.href} onClick={()=>close()} key={item.id}>       
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 dark:hover:bg-gray-700 hover:bg-white">
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg dark:bg-gray-800 bg-slate-100 dark:group-hover:bg-gray-700 group-hover:bg-white">
                          <item.icon aria-hidden="true" className={` ${pathName.includes(item.href) ? 'dark:text-orange-200 text-orange-600' : 'text-gray-600 dark:text-gray-300  group-hover:text-orange-600 dark:group-hover:text-orange-200' } h-6 w-6 `} />
                        </div>
                        <div className={` ${pathName.includes(item.href) ? 'text-orange-600 dark:text-orange-200' : ' dark:group-hover:text-orange-200 group-hover:text-orange-400'} flex-auto `}>
                            {item.name}
                          <p className="mt-1 text-gray-600 dark:text-gray-300 font-thin">{item.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                  </div>
                </PopoverPanel>
              </>
            )}
          </Popover>

          <Popover className={`${pathName.includes('/clenstvi-v-oddile') ? active : inActive } hover:border-b-2 z-50 -mb-2  hover:border-b-orange-600 dark:border-b-orange-200 `}>
            {({ open, close }) => (
              <>
                <PopoverButton className="flex focus:outline-none items-center gap-x-1 text-sm  leading-6 ">
                  Členství v oddíle
                  <ChevronDownIcon aria-hidden="true" className={`h-5  w-5 flex-none text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
                </PopoverButton>
                <PopoverPanel className=" absolute drop-shadow-xl text-gray-700 dark:text-gray-300 top-full z-10  w-screen max-w-lg overflow-hidden rounded-3xl  dark:bg-gray-800 bg-slate-100 shadow-lg">
                  <div className="p-4">
                    {proCleny.map((item) => (
                    <Link href={item.href} onClick={()=>close()} key={item.id}>       
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 dark:hover:bg-gray-700 hover:bg-white">
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg dark:bg-gray-800 bg-slate-100 dark:group-hover:bg-gray-700 group-hover:bg-white">
                          <item.icon aria-hidden="true" className={` ${pathName.includes(item.href) ? 'dark:text-orange-200 text-orange-600' : 'text-gray-600 dark:text-gray-300  group-hover:text-orange-600 dark:group-hover:text-orange-200' } h-6 w-6 `} />
                        </div>
                        <div className={` ${pathName.includes(item.href) ? 'text-orange-600 dark:text-orange-200' : ' dark:group-hover:text-orange-200 group-hover:text-orange-400'} flex-auto `}>
                            {item.name}
                          <p className="mt-1 text-gray-600 dark:text-gray-300 font-thin">{item.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                  </div>
                </PopoverPanel>
              </>
            )}
          </Popover>

          <Popover className={`${pathName.includes('/o-nas') ? active : inActive } hover:border-b-2 z-50 -mb-2  hover:border-b-orange-600 dark:border-b-orange-200 `}>
            {({ open, close }) => (
              <>
                <PopoverButton className="flex focus:outline-none items-center gap-x-1 text-sm  leading-6 ">
                  O nás
                  <ChevronDownIcon aria-hidden="true" className={`h-5  w-5 flex-none text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
                </PopoverButton>
                <PopoverPanel className=" absolute drop-shadow-xl text-gray-700 dark:text-gray-300 top-full z-10  w-screen max-w-lg overflow-hidden rounded-3xl  dark:bg-gray-800 bg-slate-100 shadow-lg">
                  <div className="p-4">
                    {oNas.map((item) => (
                    <Link href={item.href} onClick={()=>close()} key={item.id}>       
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 dark:hover:bg-gray-700 hover:bg-white">
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg dark:bg-gray-800 bg-slate-100 dark:group-hover:bg-gray-700 group-hover:bg-white">
                          <item.icon aria-hidden="true" className={` ${pathName.includes(item.href) ? 'dark:text-orange-200 text-orange-600' : 'text-gray-600 dark:text-gray-300  group-hover:text-orange-600 dark:group-hover:text-orange-200' } h-6 w-6 `} />
                        </div>
                        <div className={` ${pathName.includes(item.href) ? 'text-orange-600 dark:text-orange-200' : ' dark:group-hover:text-orange-200 group-hover:text-orange-400'} flex-auto `}>
                            {item.name}
                          <p className="mt-1 text-gray-600 dark:text-gray-300 font-thin">{item.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                  </div>
                </PopoverPanel>
              </>
            )}
          </Popover>

           <Link href="/kontakt" className={` ${pathName.includes('/kontakt') ? active : inActive } text-sm leading-6 hover:border-b-2 z-50 -mb-2  hover:border-b-orange-600 dark:border-b-orange-200 flex`}>Kontakt</Link>
          <div className="text-sm leading-6  dark:text-white  z-50 -mb-2  m-3 text-white/0 "> </div>
        </PopoverGroup>
        <div className='flex flex-row '>
              <div className='mr-2 items-center flex'>
              <ThemeToggle className='flex self-center'/>
              </div>
              <div>
                <PopoverGroup>
                  <Popover className='relative flex  '>
                    {({ open, close }) => (
                      <>
                        <PopoverButton className="ml-5 flex rounded-full focus:outline-none items-center gap-x-2 text-sm leading-6 dark:text-gray-300 text-gray-700">
                          <img
                            src={`${avatar}?v=${Date.now()}`} 
                            alt="User Avatar" 
                            className="rounded-full img-contain" 
                            width={50} 
                            height={50} 
                          />
                        </PopoverButton>
                        <PopoverPanel className="border-gray-200 top-14 right-0 border-[1px] dark:border-gray-500  shadow-gray-400/50 dark:shadow-gray-700/50 border- absolute drop-shadow-xl z-10 w-60 rounded dark:bg-gray-800 bg-slate-100 shadow-lg">
                          <div className="p-4">

                            {(clearance === 'member' || clearance === 'editor' || clearance === 'admin' ) && 
                              <Link 
                              onClick={()=>close()}
                              href='/dashboard/dashboard-clanky' 
                              className={`text-sm leading-6 dark:text-gray-300 text-gray-700`}>
                              <div className="group relative flex items-center border-b-[1px] border-b-gray-200 dark:border-b-gray-700 gap-x-6  text-sm leading-6 hover:bg-gray-200 dark:hover:bg-gray-700">
                                <div className="flex h-11 w-11  flex-none items-center justify-center  bg-slate-100 dark:bg-gray-800 dark:group-hover:bg-gray-700 group-hover:bg-gray-200 ">
                                  <GiNewspaper aria-hidden="true" className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-white" />
                                </div>
                                <div className="flex-auto group-hover:text-orange-600 dark:group-hover:text-white">
                                  Články
                                </div>
                              </div>
                          </Link>
                            }

                            {(clearance === 'editor' || clearance === 'admin' ) && 
                            
                            <Link 
                                onClick={()=>close()}
                                href='/dashboard/dashboard-novinky' 
                                className={`text-sm leading-6 dark:text-gray-300 text-gray-700`}>
                                <div className="group relative flex items-center border-b-[1px] border-b-gray-200 dark:border-b-gray-700 gap-x-6  text-sm leading-6 hover:bg-gray-200 dark:hover:bg-gray-700">
                                  <div className="flex h-11 w-11  flex-none items-center justify-center  bg-slate-100 dark:bg-gray-800 dark:group-hover:bg-gray-700 group-hover:bg-gray-200 ">
                                    <MdRssFeed aria-hidden="true" className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-white" />
                                  </div>
                                  <div className="flex-auto group-hover:text-orange-600 dark:group-hover:text-white">
                                    Novinky
                                  </div>
                                </div>
                              </Link>
                            }
                              
                              {(clearance === 'editor' || clearance === 'admin' ) && 
                                 <Link 
                                 onClick={()=>close()}
                                 href='/dashboard/kalendar' 
                                 className={`text-sm leading-6 dark:text-gray-300 text-gray-700`}>
                                 <div className="group relative flex items-center border-b-[1px] border-b-gray-200 dark:border-b-gray-700 gap-x-6  text-sm leading-6 hover:bg-gray-200 dark:hover:bg-gray-700">
                                   <div className="flex h-11 w-11  flex-none items-center justify-center  bg-slate-100 dark:bg-gray-800 dark:group-hover:bg-gray-700 group-hover:bg-gray-200 ">
                                     <LuCalendarRange aria-hidden="true" className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-white" />
                                   </div>
                                   <div className="flex-auto group-hover:text-orange-600 dark:group-hover:text-white">
                                     Kalendář
                                   </div>
                                 </div>
                               </Link>
                              }

                              {(clearance === 'editor' || clearance === 'admin' ) && 
                              <Link 
                              onClick={()=>close()}
                              href='/dashboard/knihovna' 
                              className={`text-sm leading-6 dark:text-gray-300 text-gray-700`}>
                              <div className="group relative flex items-center border-b-[1px] border-b-gray-200 dark:border-b-gray-700 gap-x-6  text-sm leading-6 hover:bg-gray-200 dark:hover:bg-gray-700">
                                <div className="flex h-11 w-11  flex-none items-center justify-center  bg-slate-100 dark:bg-gray-800 dark:group-hover:bg-gray-700 group-hover:bg-gray-200 ">
                                  <IoLibraryOutline aria-hidden="true" className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-white" />
                                </div>
                                <div className="flex-auto group-hover:text-orange-600 dark:group-hover:text-white">
                                  Knihovna
                                </div>
                              </div>
                              </Link>
                              }
                              
                              {(clearance === 'editor' || clearance === 'admin' ) && 
                              
                              <Link 
                                onClick={()=>close()}
                                href='/dashboard/pujcovna' 
                                className={`text-sm leading-6 dark:text-gray-300 text-gray-700`}>
                                <div className="group relative flex items-center border-b-[1px] border-b-gray-200 dark:border-b-gray-700 gap-x-6  text-sm leading-6 hover:bg-gray-200 dark:hover:bg-gray-700">
                                  <div className="flex h-11 w-11  flex-none items-center justify-center  bg-slate-100 dark:bg-gray-800 dark:group-hover:bg-gray-700 group-hover:bg-gray-200 ">
                                    <RiBook3Line aria-hidden="true" className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-white" />
                                  </div>
                                  <div className="flex-auto group-hover:text-orange-600 dark:group-hover:text-white">
                                    Půjčovna
                                  </div>
                                </div>
                              </Link>
                              }
                                  
                              {session &&   
                              <Link 
                                onClick={()=>close()}
                                href='/dashboard/profil' 
                                className={`text-sm leading-6 dark:text-gray-300 text-gray-700`}>
                                <div className="group relative flex items-center border-b-[1px] border-b-gray-200 dark:border-b-gray-700 gap-x-6  text-sm leading-6 hover:bg-gray-200 dark:hover:bg-gray-700">
                                  <div className="flex h-11 w-11  flex-none items-center justify-center  bg-slate-100 dark:bg-gray-800 dark:group-hover:bg-gray-700 group-hover:bg-gray-200 ">
                                    <MdAccountCircle aria-hidden="true" className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-white" />
                                  </div>
                                  <div className="flex-auto group-hover:text-orange-600 dark:group-hover:text-white">
                                    Profil
                                  </div>
                                </div>
                              </Link>
                              }

                              {(clearance === 'admin' ) && 
                              
                              <Link 
                                onClick={()=>close()}
                                href='/dashboard/uzivatele' 
                                className={`text-sm leading-6 dark:text-gray-300 text-gray-700`}>
                                <div className="group relative flex items-center border-b-[1px] border-b-gray-200 dark:border-b-gray-700 gap-x-6  text-sm leading-6 hover:bg-gray-200 dark:hover:bg-gray-700">
                                  <div className="flex h-11 w-11  flex-none items-center justify-center  bg-slate-100 dark:bg-gray-800 dark:group-hover:bg-gray-700 group-hover:bg-gray-200 ">
                                    <MdAdminPanelSettings aria-hidden="true" className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-white" />
                                  </div>
                                  <div className="flex-auto group-hover:text-orange-600 dark:group-hover:text-white">
                                    Uživatelé
                                  </div>
                                </div>
                              </Link>
                              }
                              

                              {session && 
                                <a 
                                  href='#' 
                                  onClick={()=>{close(); handleLogout();}}
                                  className={`text-sm leading-6 dark:text-gray-300 text-gray-700`}>
                                  <div className="group relative flex items-center border-b-[1px] border-b-gray-200 dark:border-b-gray-700 gap-x-6  text-sm leading-6 hover:bg-gray-200 dark:hover:bg-gray-700">
                                    <div className="flex h-11 w-11  flex-none items-center justify-center  bg-slate-100 dark:bg-gray-800 dark:group-hover:bg-gray-700 group-hover:bg-gray-200 ">
                                      <CiLogout aria-hidden="true" className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-white" />
                                    </div>
                                    <div className="flex-auto group-hover:text-orange-600 dark:group-hover:text-white">
                                    Odhlásit
                                    </div>
                                  </div>
                                </a>
                              }

                              {!session && 
                                 <a 
                                 href='/login' 
                                 onClick={()=>close()}
                                 className={`text-sm leading-6 dark:text-gray-300 text-gray-700`}>
                                 <div className="group relative flex items-center border-b-[1px] border-b-gray-200 dark:border-b-gray-700 gap-x-6  text-sm leading-6 hover:bg-gray-200 dark:hover:bg-gray-700">
                                   <div className="flex h-11 w-11  flex-none items-center justify-center  bg-slate-100 dark:bg-gray-800 dark:group-hover:bg-gray-700 group-hover:bg-gray-200 ">
                                     <CiLogin aria-hidden="true" className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-white" />
                                   </div>
                                   <div className="flex-auto group-hover:text-orange-600 dark:group-hover:text-white">
                                     Přihlásit
                                   </div>
                                 </div>
                               </a>
                              }
                           
                              {!session &&                               
                                <Link 
                                href='/registration' 
                                onClick={()=>close()}
                                className={`text-sm leading-6 dark:text-gray-300 text-gray-700`}>
                                <div className="group relative flex items-center border-b-[1px] border-b-gray-200 dark:border-b-gray-700 gap-x-6  text-sm leading-6 hover:bg-gray-200 dark:hover:bg-gray-700">
                                  <div className="flex h-11 w-11  flex-none items-center justify-center  bg-slate-100 dark:bg-gray-800 dark:group-hover:bg-gray-700 group-hover:bg-gray-200 ">
                                    <HiOutlineUserPlus aria-hidden="true" className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-white" />
                                  </div>
                                  <div className="flex-auto group-hover:text-orange-600 dark:group-hover:text-white">
                                    Registrovat
                                  </div>
                                </div>
                              </Link>}

                          </div>
                        </PopoverPanel>
                      </>
                    )}
                  </Popover>
                </PopoverGroup>
              </div>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-slate-100/30" />
        <DialogPanel className="fixed z-50 inset-y-0 left-0 w-4/6 sm:w-6/12 overflow-y-auto dark:bg-slate-800 dark:hover:bg-slate-800  bg-slate-100 px-3 py-3 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between ">
            <button type="button" onClick={() => setMobileMenuOpen(false)} className="rounded-lg   text-gray-700">
              <XMarkIcon aria-hidden="true" className="h-10 w-10 dark:text-white" />
            </button>
          </div>

          {/* mobile menu  */}


          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-5 ">
              <Link href='/novinky' onClick={() => setMobileMenuOpen(false)} className="block -mx-3  py-1 leading-7  text-gray-700 hover:bg-gray-50  dark:hover:bg-slate-800 hover:bg-none  border-b dark:border-gray-500 border-gray-200 ">
                <div className='flex w-5/6 justify-start '>
                  <div className='w-1/6 justify-center  pl-5 align-bottom flex'>
                    <IoIosInformationCircleOutline  className='h-6 w-6 self-center flex dark:text-gray-400 '/>
                  </div>
                  <div className={` ${pathName.includes('/novinky') ? 'text-orange-600 dark:text-orange-300' : 'text-gray-700 dark:text-white '}  w-5/6 pl-2  justify-start  align-middle flex`}>
                      Novinky
                  </div>
                </div>
                </Link>
                <Disclosure as="div" className="-mx-3 border-b dark:border-gray-500 border-gray-200">
                  <DisclosureButton className="group dark:text-gray-400 flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base leading-7 text-gray-700 dark:hover:bg-slate-800   hover:bg-gray-50">
                    <div className='flex w-5/6 justify-start align-middle'>
                      <div className='w-1/6 justify-center align-middle flex'>
                        <GiNewspaper className='h-6 w-6 justify-center align-middle flex'/>
                      </div>
                      <div className={` ${pathName.includes('/clanky') ? 'text-orange-600 dark:text-orange-300' : 'text-gray-700 dark:text-white '}  w-5/6 justify-start  align-middle flex`}>
                        <a href="#" className="align-middle ">Články</a>
                      </div>
                    </div>
                    <ChevronDownIcon aria-hidden="true" className="h-5  w-5 dark:text-gray-400 flex-none group-data-[open]:rotate-180" />
                  </DisclosureButton>
                    <DisclosurePanel className="mt-2">
                    <DisclosureButton

                        className="block rounded-lg w-full text-start pl-6 pr-3 text-sm leading-7 ">
                          <Link href='/clanky' onClick={() => setMobileMenuOpen(false)} passHref>
                            <div className={`flex p-2 flex-grow ${ pathName.includes('/clanky')  ? activeMobile : inActiveMobile } `}>
                              <div className='w-full ml-2 text-start' >
                                Zobrazit vše
                              </div>
                            </div>
                        </Link>
                        
                      </DisclosureButton>
                      {articles.map((item) => (
                        <DisclosureButton
                        key={item.name}
                        className="block rounded-lg w-full text-start pl-6 pr-3 text-sm leading-7 ">
                          <Link href={item.href} onClick={() => setMobileMenuOpen(false)} passHref>
                            
                            <div className={`flex p-2 flex-grow ${ item.filter === (currentFilter)  ? activeMobile : inActiveMobile } `}>
                              <div className='w-full ml-2 text-start' >
                                {item.name}
                              </div>
                            </div>
                             
                        </Link>

                      </DisclosureButton>
                      ))}
                    </DisclosurePanel>
                </Disclosure>


                <Disclosure as="div" className="-mx-3 border-b dark:border-gray-500 border-gray-200">
                  <DisclosureButton className="group dark:text-gray-400 flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base leading-7 text-gray-700 dark:hover:bg-slate-800   hover:bg-gray-50">
                    <div className='flex w-5/6 justify-start align-middle'>
                      <div className='w-1/6 justify-center align-middle flex'>
                        <IoSchoolOutline   className='h-6 w-6 justify-center align-middle flex'/>
                      </div>
                      <div className={` ${pathName.includes('/kurzy') ? 'text-orange-600 dark:text-orange-300' : 'text-gray-700 dark:text-white '}  w-5/6 justify-start  align-middle flex`}>
                        <a href="#" className="align-middle ">Kurzy</a>
                      </div>
                    </div>
                    <ChevronDownIcon aria-hidden="true" className="h-5  w-5 dark:text-gray-400 flex-none group-data-[open]:rotate-180" />
                  </DisclosureButton>
                    <DisclosurePanel className="mt-2">
                      {kurzy.map((item) => (
                        <DisclosureButton
                        key={item.name}
                        className="block rounded-lg w-full text-start pl-6 pr-3 text-sm leading-7 ">
                          <Link href={item.href} onClick={() => setMobileMenuOpen(false)} passHref>
                          <div className={`flex p-2 flex-grow ${pathName.includes(item.href) ? activeMobile : inActiveMobile } `}>
                            <div className='w-full ml-2 text-start' >
                              {item.name}
                            </div>
                          </div>
                        </Link>
                      </DisclosureButton>
                      ))}
                    </DisclosurePanel>
                </Disclosure>

                <Disclosure as="div" className="-mx-3 border-b dark:border-gray-500 border-gray-200">
                  <DisclosureButton className="group dark:text-gray-400 flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base leading-7 text-gray-700 dark:hover:bg-slate-800   hover:bg-gray-50">
                    <div className='flex w-5/6 justify-start align-middle'>
                      <div className='w-1/6 justify-center align-middle flex'>
                        <GiSkis className='h-6 w-6 justify-center align-middle flex'/>
                      </div>
                      <div className={` ${pathName.includes('/clenstvi-v-oddile') ? 'text-orange-600 dark:text-orange-300' : 'text-gray-700 dark:text-white '}  w-5/6 justify-start  align-middle flex`}>
                        <a href="#" className="align-middle ">Pro členy</a>
                      </div>
                    </div>
                    <ChevronDownIcon aria-hidden="true" className="h-5  w-5 dark:text-gray-400 flex-none group-data-[open]:rotate-180" />
                  </DisclosureButton>
                    <DisclosurePanel className="mt-2">
                      {proCleny.map((item) => (
                        <DisclosureButton
                        key={item.name}
                        className="block rounded-lg w-full text-start pl-6 pr-3 text-sm leading-7 ">
                          <Link href={item.href} onClick={() => setMobileMenuOpen(false)} passHref>
                          <div className={`flex p-2 flex-grow ${pathName.includes(item.href) ? activeMobile : inActiveMobile } `}>
                            <div className='w-full ml-2 text-start' >
                              {item.name}
                            </div>
                          </div>
                        </Link>
                      </DisclosureButton>
                      ))}
                    </DisclosurePanel>
                </Disclosure> 

                
                <Disclosure as="div" className="-mx-3 border-b dark:border-gray-500 border-gray-200">
                  <DisclosureButton className="group dark:text-gray-400 flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base leading-7 text-gray-700 dark:hover:bg-slate-800   hover:bg-gray-50">
                    <div className='flex w-5/6 justify-start align-middle'>
                      <div className='w-1/6 justify-center align-middle flex'>
                        <IoPeopleOutline className='h-6 w-6 justify-center align-middle flex'/>
                      </div>
                      <div className={` ${pathName.includes('/o-nas/') ? 'text-orange-600 dark:text-orange-300' : 'text-gray-700 dark:text-white '}  w-5/6 justify-start  align-middle flex`}>
                        <a href="#" className="align-middle ">O nás</a>
                      </div>
                    </div>
                    <ChevronDownIcon aria-hidden="true" className="h-5  w-5 dark:text-gray-400 flex-none group-data-[open]:rotate-180" />
                  </DisclosureButton>
                    <DisclosurePanel className="mt-2">
                      {oNas.map((item) => (
                        <DisclosureButton
                        key={item.name}
                        className="block rounded-lg w-full text-start pl-6 pr-3 text-sm leading-7 ">
                          <Link href={item.href} onClick={() => setMobileMenuOpen(false)} passHref>
                          <div className={`flex p-2 flex-grow ${pathName.includes(item.href) ? activeMobile : inActiveMobile } `}>
                            <div className='w-full ml-2 text-start' >
                              {item.name}
                            </div>
                          </div>
                        </Link>
                      </DisclosureButton>
                      ))}
                    </DisclosurePanel>
                </Disclosure>

                <Link href='/kontakt' onClick={() => setMobileMenuOpen(false)} className={` ${pathName.includes('/kontakt') ? 'dark:text-orange-200 ' : 'dark:text-white text-gray-500' } block -mx-3  py-1 leading-7  hover:bg-gray-50  dark:hover:bg-slate-800 hover:bg-none  border-b dark:border-gray-500 border-gray-200`} >
                <div className='flex w-5/6 justify-start '>
                  <div className='w-1/6 justify-center  pl-5 align-bottom flex'>
                    <FiPhone  className='h-6 w-6 self-center flex dark:text-gray-400 text-gray-700 '/>
                  </div>
                  <div className={` ${pathName.includes('/kontakt') ? 'text-orange-600 dark:text-orange-300'  : 'dark:text-gray-200 text-gray-700' } w-5/6 pl-2  justify-start   align-middle flex `}>
                      Kontakt
                  </div>
                </div>
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    
    </header>
    
  )
}
