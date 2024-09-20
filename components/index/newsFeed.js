import React from "react"
import { MdRssFeed } from "react-icons/md";
import BtnArticleShow from "../blog/BtnArticleShow";

const newsFeedInput = [
  { id:1, date: '17.5.2024', title: 'Na skály v úterý', description: 'Demonstrativní krátky příspěvek který nemá v databázi definováno že obsahuje článek (nebude tlačítko)', article: false, url:'#' },
  { id:2, date: '17.5.2024', title: 'Předpověď počasí pro víkendový výstup', description: 'Tento krátký příspěvek má definováno že obsahuje i článek.', article: true, url:'#' },
  { id:3, date: '14.8.2024', title: 'Deštivé úterý zruší trénink na skále', description: 'Bude pršet v celém Zlíně, takže nebude trénink, nedá se nic dělat, bude se muset jít "bohužel" na pivo', article: false, url:'#' },
  { id:4, date: '10.5.2024', title: 'Počasí na středeční výstup v Zlíně', description: 'Bude pršet v celém Zlíně, takže nebude trénink, nedá se nic dělat, bude se muset jít "bohužel" na pivo', article: true, url:'#' },
  { id:5, date: '3.5.2024', title: 'Čtvrteční slunečný trénink na skále', description: 'Bude krásně, ideální počasí na trénink venku', article: true, url:'#' },
  { id:6, date: '1.4.2024', title: 'Zamračená sobota, trénink pod střechou', description: 'Bude zataženo, možná bude třeba přesunout trénink na stěnu.', article: true, url:'#' },
]  

export default function NewsFeed() {


  return (
    <>
      <div className=" lg:max-h-[600px] dark:bg-[#1E1E1E] dark:border-gray-600 border-[1px]  py-4 my-6  lg:overflow-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-track-gray-800 bg-white flex flex-col text-center rounded shadow-[0_10px_25px_rgba(0,0,0,0.1),0_10px_50px_rgba(0,0,0,0.2)] border-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
        <div className="flex mb-3 pb-2 text-2xl font-bold dark:text-gray-100  border-gray-100  text-gray-800">
          <div className="flex ml-6 justify-center w-1/6">
            <MdRssFeed className="text-gray-400 w-8 h-8 " /> 
          </div>
          <div className="ml-2 flex justify-start text-gray-500 dark:text-gray-100 flex-grow">
            Novinky
          </div>
        </div>
        <div className="flex">
          <ul
            aria-label="Novinky"
            role="feed"
            className="relative flex flex-col pl-3 text-sm before:absolute before:top-0 before:left-6 before:h-full  before:border-slate-200 after:absolute after:top-6 after:left-3 after:bottom-6 after:-translate-x-1/2 after:border dark:after:border-gray-600 after:border-slate-200"
          >
            {newsFeedInput.map((item)=>{
              return (
                <li
              role="article"
              className="relative pl-3 my-1 before:absolute before:left-0 before:top-4 before:z-10 before:h-2 before:w-2 before:-translate-x-1/2 before:rounded-full dark:before:bg-gray-600 before:bg-orange-600 before:ring-2 dark:before:ring-gray-600 before:ring-white"
              key={item.id}
              >

              <div className="flex  flex-col flex-1 text-start flex-grow mr-3">
                
                <h3 className="lg:text-base text-xs dark:border-gray-600 border-gray-200 pt-1  border-t ml-2 leading-7 dark:text-gray-200 text-orange-600">
                  <span className=" text-slate-400 text-end text-xs  mr-5">
                  {item.date}
                  </span>
                {item.title}

                </h3>
                <p className=" text-slate-500 dark:text-gray-300 ml-2 mt text-xs md:text-sm text-start">
                  {item.description}
                </p>
                <div className="flex justify-end">
                  {item.article === true && <BtnArticleShow/>}
                </div>
                
              </div>
              </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  )
}