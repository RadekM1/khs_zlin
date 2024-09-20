'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
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
import { TbTrees } from "react-icons/tb";
import { FaSkiing } from "react-icons/fa";
import { LiaMountainSolid } from "react-icons/lia";
import boulderIcon from '../boulderIcon'
import { CiUser, CiLogout  } from "react-icons/ci";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoIosSettings, IoIosHelpCircleOutline, IoIosInformationCircleOutline  } from "react-icons/io";
import { FaSchool } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";
import { IoSchoolOutline, IoHomeOutline  } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import ThemeToggle from '../ThemeToggle'
import { VscChecklist } from "react-icons/vsc";


const articles = [
  { id:1, name: 'Skalní lezení', description: 'Od písků v Ádru až po  rulu ve Chamonix', href: '#', icon: GiMountainClimbing },
  { id:2, name: 'Horské lezení', description: 'Vícedélky v tatrách, alpách a občas i exotika', href: '#', icon: LiaMountainSolid },
  { id:3, name: 'Bouldering', description: 'Boulderování v okolí a vyhodnocení závodů', href: '#', icon: boulderIcon },
  { id:4, name: 'Trekking, VHT', description: 'Zápisky z výprav po celém světě', href: '#', icon: GiHiking  },
  { id:5, name: 'Příroda', description: 'O toulkách v přírodě', href: '#', icon: TbTrees },
  { id:6, name: 'Zimní akce', description: 'Skialpinismus, lezení ledů, zimní výpravy', href: '#', icon: FaSkiing }
]

const userPanel = [
  { id: 1, name: 'Admin panel', href: '#', icon: MdAdminPanelSettings },
  { id: 2, name: 'Profil', href: '#', icon: CiUser },
  { id: 3, name: 'Nastavení',  href: '#', icon: IoIosSettings },
  { id: 4, name: 'Nápověda', icon: IoIosHelpCircleOutline },
  { id: 5, name: 'Odhlásit', href: '#', icon: CiLogout },
]

const menuMobil = [
  { id: 1, name: 'Půjčovna', href: '#', icon: GiSkis },
  { id: 2, name: 'O nás', href: '#', icon: BsPeople },
  { id: 3, name: 'Kontakt',  href: '#', icon: FiPhone },
  { id: 4, name: 'Oddílové akce', href:'#', icon: MdOutlineEmojiEvents },
]

const kurzy = [
  { id: 1, name: 'Horoškola', description: 'Staňte se lezci a horolezci pod vedením zkušených instruktorů', href: '#', icon: FaUniversity },
  { id: 2, name: 'Horokruh', description: 'Lezecký kroužek pro mládež od 8 do 12 let', href: '#', icon: FaSchool },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [firstPopoverOpen, setFirstPopoverOpen] = useState(false);
  const [secondPopoverOpen, setSecondPopoverOpen] = useState(false);
  const [thirdPopoverOpen, setThirdPopoverOpen] = useState(false);

  useEffect(() => {
    
  }, [firstPopoverOpen, secondPopoverOpen, thirdPopoverOpen]);

  return (
    
    <header className=" fixed z-30 w-full top-0 backdrop-blur-sm bg-slate-100/80 dark:bg-[#1E1E1E]/80 border-b-gray-300 dark:border-b-gray-600 border-b
     
    " >
      <nav aria-label="Global" className="mx-auto flex  max-w-7xl items-center justify-between lg:justify-start p-2 lg:px-8">
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
            <a href="#">
              <Image priority  width={200} style={{width:'200px',height: '200px'}} height={200} alt="" src="https://storage.googleapis.com/khs-zlin/logo.svg" className=" absolute -top-16 -ml-4 hidden lg:block" />
            </a>
            <a href="#">
            <Image priority  width={150} style={{width:'150',height: '150'}} height={150} alt="" src="https://storage.googleapis.com/khs-zlin/logo_small.svg" className=" absolute flex ml-6 lg:hidden" />
          </a>
          </div>
        </div>
        <div className='flex-grow ml-4 flex relative mr-2'>
        </div>
        <PopoverGroup className="hidden  lg:flex flex-grow ml-10 lg:gap-x-5">
          <a href="#" className="text-sm ml-10 leading-6 hover:text-orange-600 dark:hover:text-orange-200 text-gray-700 dark:text-white  ">Novinky</a>
          <Popover>
            {({ open }) => (
              <>
                <PopoverButton className="flex  hover:text-orange-600 dark:hover:text-orange-200 dark:text-white focus:outline-none items-center gap-x-1 text-sm  leading-6 text-gray-700">
                  Články
                  <ChevronDownIcon aria-hidden="true" className={`h-5  w-5 flex-none text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
                </PopoverButton>
                <PopoverPanel className="absolute drop-shadow-xl dark:text-gray-300 top-full z-10  w-screen max-w-lg overflow-hidden rounded-3xl  dark:bg-gray-800 bg-slate-100 shadow-lg">
                <div className="p-4">
                <a href='#' className="block font-semibold dark:text-gray-300 text-gray-700 border-b dark:border-gray-400 ">       
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 dark:hover:bg-gray-700 hover:bg-white">
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg dark:bg-gray-800 bg-slate-100 dark:group-hover:bg-gray-700 group-hover:bg-white">
                          <VscChecklist aria-hidden="true" className="h-6 w-6 text-gray-600 dark:text-gray-300  group-hover:text-orange-600 dark:group-hover:text-orange-200" />
                        </div>
                        <div className="flex-auto group-hover:text-orange-400 dark:group-hover:text-orange-200 ">
                            Zobrazit všechny články
                          <p className="mt-1 text-gray-600 dark:text-gray-300 font-thin">Seznam všech článků bez filtrování</p>
                        </div>
                      </div>
                    </a>

                </div>
                  <div className="p-4 -mt-7">
                    {articles.map((item) => (
                    <a href={item.href} key={item.id} className=" ml-5 block font-semibold dark:text-gray-300 text-gray-700">       
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 dark:hover:bg-gray-700 hover:bg-white">
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg dark:bg-gray-800 bg-slate-100 dark:group-hover:bg-gray-700 group-hover:bg-white">
                          <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 dark:text-gray-300  group-hover:text-orange-600 dark:group-hover:text-orange-200" />
                        </div>
                        <div className="flex-auto dark:group-hover:text-orange-200 group-hover:text-orange-400">
                            {item.name}
                          <p className="mt-1 text-gray-600 dark:text-gray-300 font-thin">{item.description}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                  </div>
                </PopoverPanel>
              </>
            )}
          </Popover>
          <Popover>
            {({ open }) => (
              <>
                <PopoverButton className="flex dark:hover:text-orange-200 hover:text-orange-600 dark:text-white focus:outline-none items-center gap-x-1 text-sm  leading-6 text-gray-700">
                  Kurzy a kroužky
                  <ChevronDownIcon aria-hidden="true" className={`h-5  w-5 flex-none text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
                </PopoverButton>
                <PopoverPanel className=" absolute drop-shadow-xl dark:text-gray-300 top-full z-10  w-screen max-w-lg overflow-hidden rounded-3xl  dark:bg-gray-800 bg-slate-100 shadow-lg">
                  <div className="p-4">
                    {kurzy.map((item) => (
                    <a href={item.href} key={item.id} className="block font-semibold dark:text-gray-300 text-gray-700">       
                      <div className="group relative flex items-center gap-x-6 rounded-lg p-2 text-sm leading-6 dark:hover:bg-gray-700 hover:bg-white">
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg dark:bg-gray-800 bg-slate-100 dark:group-hover:bg-gray-700 group-hover:bg-white">
                          <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 dark:text-gray-300  group-hover:text-orange-600 dark:group-hover:text-orange-200" />
                        </div>
                        <div className="flex-auto dark:group-hover:text-orange-200 group-hover:text-orange-400">
                            {item.name}
                          <p className="mt-1 text-gray-600 dark:text-gray-300 font-thin">{item.description}</p>
                        </div>
                      </div>
                    </a>
                  ))}
                  </div>
                </PopoverPanel>
              </>
            )}
          </Popover>
          <a href="#" className="text-sm leading-6 hover:text-orange-600 dark:hover:text-orange-200 dark:text-white text-gray-700">Půjčovna</a>
          <a href="#" className="text-sm leading-6 hover:text-orange-600 dark:hover:text-orange-200 dark:text-white text-gray-700">O nás</a>
          <a href="#" className="text-sm leading-6 hover:text-orange-600 dark:hover:text-orange-200 dark:text-white text-gray-700">Kontakt</a>
          <a href="#" className="text-sm leading-6 hover:text-orange-600 dark:hover:text-orange-200 dark:text-white text-gray-700">Oddílové akce</a>
        </PopoverGroup>
        <div className='flex flex-row '>
              <div className='mr-2 items-center flex'>
              <ThemeToggle className='flex self-center'/>
              </div>
              <div>
                <PopoverGroup>
                  <Popover className='relative flex '>
                    {({ open }) => (
                      <>
                        <PopoverButton className="ml-5 flex focus:outline-none items-center gap-x-2 text-sm leading-6 dark:text-gray-300 text-gray-700">
                          <Image 
                            src="https://storage.googleapis.com/khs-zlin/avatar4.jpg" 
                            alt="User Avatar" 
                            className="rounded-full" 
                            width={50} 
                            height={50} 
                            priority 
                          />
                        </PopoverButton>
                        <PopoverPanel className="border-gray-200 top-14 right-0   shadow-gray-400/50 dark:shadow-gray-700/50 border- absolute drop-shadow-xl z-10 w-60 rounded-3xl dark:bg-gray-800 bg-slate-100 shadow-lg">
                          <div className="p-4">
                            {userPanel.map((item) => (
                              <a 
                                href="#" 
                                key={item.id} 
                                className="text-sm leading-6 dark:text-gray-300 text-gray-700"
                              >
                                <div className="group relative flex items-center gap-x-6 rounded-lg text-sm leading-6 hover:bg-gray-200 dark:hover:bg-gray-700">
                                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-slate-100 dark:bg-gray-800 dark:group-hover:bg-gray-700 group-hover:bg-gray-200 ">
                                    <item.icon 
                                      aria-hidden="true" 
                                      className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-orange-600 dark:group-hover:text-white" 
                                    />
                                  </div>
                                  <div className="flex-auto group-hover:text-orange-600 dark:group-hover:text-white">
                                    {item.name}
                                  </div>
                                </div>
                              </a>
                            ))}
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
        <DialogPanel className="fixed z-50 inset-y-0 left-0 w-9/12 sm:w-6/12 overflow-y-auto dark:bg-slate-800 dark:hover:bg-slate-800  bg-slate-100 px-3 py-3 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between ">
            <button type="button" onClick={() => setMobileMenuOpen(false)} className="rounded-lg   text-gray-700">
              <XMarkIcon aria-hidden="true" className="h-10 w-10 dark:text-white" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
            
              <div className="space-y-2 py-5 ">
              <a href='#' className="block -mx-3  py-1 leading-7 text-gray-700 hover:bg-gray-50  dark:hover:bg-slate-800 hover:bg-none  border-b dark:border-gray-500 border-gray-200 ">
                <div className='flex w-5/6 justify-start '>
                  <div className='w-1/6 justify-center  pl-5 align-bottom flex'>
                    <IoIosInformationCircleOutline  className='h-5 w-5 self-center flex dark:text-gray-400 '/>
                  </div>
                  <div className='w-5/6 pl-2  justify-start dark:text-white align-middle flex'>
                      Novinky
                  </div>
                </div>
                </a>
                <Disclosure as="div" className="-mx-3 border-b dark:border-gray-500 border-gray-200">
                  <DisclosureButton className="group dark:text-gray-400 flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base leading-7 text-gray-700 dark:hover:bg-slate-800   hover:bg-gray-50">
                    <div className='flex w-5/6 justify-start align-middle'>
                      <div className='w-1/6 justify-center align-middle flex'>
                        <GiNewspaper className='h-6 w-6 justify-center align-middle flex'/>
                      </div>
                      <div className='w-5/6 justify-start align-middle flex'>
                        <a href="#" className="align-middle dark:text-white">Články</a>
                      </div>
                    </div>
                    <ChevronDownIcon aria-hidden="true" className="h-5  w-5 dark:text-gray-400 flex-none group-data-[open]:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2">
                    {articles.map((item) => (
                      <DisclosureButton
                      key={item.name}
                      href={item.href}
                      className="block rounded-lg  pl-6 pr-3 text-sm leading-7 dark:text-white text-gray-700 ">
                      <div className='flex p-2  hover:bg-gray-50 dark:hover:bg-slate-800 dark:border-gray-500  border-l border-gray-200 hover:border-orange-600 dark:hover:border-orange-200 hover:text-orange-600'>
                        <div className='w-1/6 mr-2'>
                        </div>
                        <div className='w-5/6 ml-2  mr-40' >
                          {item.name}
                        </div>
                      </div>
                    </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <Disclosure as="div" className="-mx-3 border-b dark:border-gray-500 border-gray-200">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base leading-7  text-gray-700 dark:text-white dark:hover:bg-slate-800  hover:bg-gray-50">
                    <div className='flex w-5/6 justify-start align-middle'>
                      <div className='w-1/6 justify-center align-middle flex'>
                        <IoSchoolOutline  className='h-6 w-6 justify-center dark:text-gray-400  align-middle flex'/>
                      </div>
                      <div className='w-5/6 justify-start align-middle flex'>
                        <a href="#" className="align-middle ">Kurzy a kroužky</a>
                      </div>
                    </div>
                    <ChevronDownIcon aria-hidden="true" className="h-5 w-5 dark:text-gray-400 flex-none group-data-[open]:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 ">
                    {kurzy.map((item) => (
                      <DisclosureButton
                        key={item.name}
                        href={item.href}
                        className="block rounded-lg dark:hover:bg-slate-800  pl-6 pr-3 text-sm leading-7 dark:text-white text-gray-700 ">
                       <div className='flex p-2  hover:bg-gray-50 dark:hover:bg-slate-800 dark:hover:border-orange-200  border-l dark:border-gray-500 border-gray-200 hover:border-orange-600 hover:text-orange-600'>
                        <div className='w-1/6 mr-2'>
                        </div>
                        <div className='w-5/6 ml-2  flex-grow mr-40' > 
                          {item.name}
                        </div>
                       </div>
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                {menuMobil.map((item) => (
                   <a href='#' key={item.id} className=" -m-2 block rounded-lg py-1 leading-7 text-gray-700 dark:hover:bg-slate-800 hover:bg-gray-50 dark:group-hover:text-orange-200r:bg-slate-800  dark:hover:text-orange-300">
                <div className='flex justify-start border-b border-gray-200 dark:border-gray-500'>
                  <div className='w-1/6 justify-center align-bottom flex'>
                    <item.icon  className='h-5 w-5 self-center flex dark:text-gray-400'/>
                  </div>
                  <div className='w-5/6 -ml-1 mb-1 justify-start   dark:text-gray-200 align-middle flex '>
                  {item.name}
                  </div>
                </div>
                </a>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
