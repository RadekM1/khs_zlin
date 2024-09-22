import React from "react"
import dayjs from 'dayjs';

const dnyVtydnu = ['neděle', 'pondělí' ,'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota']

const months = [
  'ledna', 'února', 'března', 'dubna', 'května', 'června', 
  'července', 'srpna', 'září', 'října', 'listopadu', 'prosince'
];


const calendarFeedInput = [
  { id: 1, date: '2024-09-01', event: 'trénink', eventStart: '19:00', eventEnd: '24:00' },
  { id: 2, date: '2024-09-03', event: 'vertikon večírek', eventStart: '19:00', eventEnd: '24:00' },
  { id: 3, date: '2024-09-03', event: 'trénink', eventStart: '19:00', eventEnd: '24:00' },
  { id: 4, date: '2024-09-03', event: 'skály trénink', eventStart: '19:00', eventEnd: '24:00' },
  { id: 5, date: '2024-09-04', event: 'Soustředění tatry', eventStart: '12:00', eventEnd: '' },
  { id: 6, date: '2024-09-05', event: 'Soustředění tatry', eventStart: '', eventEnd: '' },
  { id: 7, date: '2024-09-10', event: 'Soustředění tatry', eventStart: '', eventEnd: '18:00' },
  { id: 8, date: '2024-09-13', event: 'vertikon trénink', eventStart: '19:00', eventEnd: '24:00' },
  { id: 9, date: '2024-09-15', event: 'trénink', eventStart: '19:00', eventEnd: '24:00' },
  { id: 10, date: '2024-09-20', event: 'schůze', eventStart: '19:00', eventEnd: '24:00' },
  { id: 11, date: '2024-09-22', event: 'oslava', eventStart: '19:00', eventEnd: '24:00' }
];

export default function CalendarFeed() {


  return (
    <div className="my-5 flex-grow">
          <ul
            aria-label="Novinky"
            role="feed"
            className="relative flex flex-col pl-3 text-sm before:absolute before:top-0 before:left-6 before:h-full  "
          >
            {calendarFeedInput.map((item)=>{
            
              let tempDay =  dayjs(item.date)
              let dayInWeek = tempDay.day()
              let dayInMonth = tempDay.date()
    


              return (
                <li
              className="relative pl-3 my-1 before:absolute before:left-0 before:top-1 before:z-10 before:h-2 before:w-2 before:-translate-x-1/2 before:rounded-full dark:before:bg-gray-600 before:bg-orange-600 before:ring-2 dark:before:ring-gray-600 before:ring-white"
              key={item.id}
              >
              <div className="flex flex-col flex-1 text-start flex-grow mr-3 mb-1 border-b-[1px] border-gray-500 ">
                <div className="flex flex-shrink flex-row ">
                  <div className="text-slate-800 text-end dark:text-gray-200 text-xs sm:text-sm font-thin mr-1 ">
                    {`${dayInMonth}. ${months[dayjs(item.date).month()]} (${dnyVtydnu[dayInWeek]})  `}
                  </div>
                  <div className="flex flex-grow  text-end text-xs sm:text-sm text-orange-600 dark:text-orange-200 font-thin mr-5">
                    {`${item.event}`}
                  </div>
                  <div className="flex flex-shrink text-end text-xs sm:text-sm dark:text-gray-200 font-thin">
                    {`${item.eventStart} - ${item.eventEnd} `}
                  </div>
                </div>
                </div>
              </li>
              )
            })}
          </ul>
    </div>
  )
}