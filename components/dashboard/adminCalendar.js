'use client';

import React, { useState } from 'react';
import dayjs from 'dayjs';
import { MdDeleteForever } from "react-icons/md";
import SpinnerBigOrange from "../spinners/spinnerBigOrange";
import { FaPen } from "react-icons/fa";

const ceskeMesice = [
  'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 
  'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
];

const ceskeDny = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'];

const calendarFeedInput = [
  { id: 1, date: '2024-09-01' },
  { id: 2, date: '2024-09-03' },
  { id: 3, date: '2024-09-05' },
  { id: 4, date: '2024-09-10' },
  { id: 5, date: '2024-09-13' },
  { id: 6, date: '2024-09-15' },
  { id: 7, date: '2024-09-20' },
  { id: 8, date: '2024-09-22' }
];

// Data událostí
const calendarFeedInputTable = [
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



const handleDel = (id) =>{
    console.log(id)
}


const handleEdit = (id) =>{
    console.log(id)
}


// Generování dní v kalendáři
const generateCalendarDays = (currentMonth) => {
  const startOfMonth = currentMonth.startOf('month');
  const daysInMonth = currentMonth.daysInMonth();
  const firstDayOfWeek = startOfMonth.day();
  const days = [];

  for (let i = 0; i < (firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1); i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(dayjs(currentMonth).date(i));
  }

  return days;
};

// Funkce pro získání názvu dne z pole českých dnů
const getCeskyDen = (day) => {
  if (day) {
    const dayOfWeek = day.day(); // Získá den v týdnu jako číslo (0 = neděle, 1 = pondělí, ...)
    return ceskeDny[dayOfWeek];
  }
  return '';
};

export default function AdminCalendar() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDay, setSelectedDay] = useState('');
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");

  const daysOfWeek = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne']; 

  const isHighlighted = (day) => {
    return calendarFeedInput.some((item) =>
      dayjs(item.date).isSame(day, 'day')
    );
  };

  const isToday = (day) => {
    return dayjs().isSame(day, 'day');
  };

  const isSelected = (day) => {
    return day && selectedDay && day.isSame(dayjs(selectedDay), 'day');
  };

  const calendarDays = generateCalendarDays(currentMonth);

  return (

    <div className='flex w-full flex-col lg:flex-row'>
  
      <div>
        <div className="max-w-md mx-auto lg:mr-5 m-6 p-4 border border-gray-200 dark:border-gray-500 rounded-lg bg-gray-50 dark:bg-[#151515] shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}
              className="text-md bg-transparent border-none cursor-pointer"
            >
              ←
            </button>
            <h2 className="text-sm">
              {ceskeMesice[currentMonth.month()]} {currentMonth.year()}
            </h2>
            <button
              onClick={() => setCurrentMonth(currentMonth.add(1, 'month'))}
              className="text-xl bg-transparent border-none cursor-pointer"
            >
              →
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center">
            {daysOfWeek.map((day, index) => (
              <div key={index} className=" text-sm text-gray-700 dark:text-gray-300">
                {day}
              </div>
            ))}

            {calendarDays.map((day, index) => (
              <div
                key={index}
                onClick={() => setSelectedDay(day?.format('YYYY-MM-DD'))} // Nastavení vybraného dne
                className={`h-8 w-8 flex items-center justify-center rounded-full cursor-pointer text-xs ${
                    day && isToday(day)
                    ? 'bg-orange-600 dark:bg-orange-200 text-white cursor-pointer dark:text-black'
                    : day && isSelected(day)
                    ? 'ring-2 ring-orange-600 dark:ring-orange-200 text-gray-800 cursor-pointer dark:text-gray-200'
                    : day && isHighlighted(day)
                    ? 'ring-1 dark:ring-orange-200 ring-orange-600 text-gray-800 cursor-pointer dark:text-gray-200'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
                >
              {day ? day.date() : ''}
            </div>
            ))}
          </div>

          {selectedDay && (
            <div className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
              Vybraný den: {getCeskyDen(dayjs(selectedDay))}, {selectedDay}
            </div>
          )}
        </div>
      </div>

      
    
      {/* ----------------------------------   table interface --------------------------- */}
      <div className="my-5 justify-center flex flex-col flex-grow">
        <div className='flex justify-center flex-col'>
            <div className='flex flex-grow justify-center w-full'>
                <div className="w-full my-1">
                    <input id="id-s03" type="text" name="id-s03" placeholder="Název události" aria-label="Search content" className="relative w-full h-10 px-4 pr-12 text-sm transition-all border rounded outline-none focus-visible:outline-none peer border-slate-400 text-slate-700 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-orange-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
                </div>
            </div>
            <div className='flex-col md:flex-row flex justify-evenly'>
                <div className='justify-start'>
                    <div className="relative my-6">
                    <input
                        id="id-date07"
                        type="date"
                        name="id-date07"
                        className="peer relative h-10 w-full rounded border border-slate-400 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all"
                        value={selectedDay} 
                        onChange={(e) => setSelectedDay(e.target.value)} 
                        />
                        <label
                            htmlFor="id-date07"
                            className="absolute dark:bg-black -top-2 left-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:left-0 before:top-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white dark:before:bg-[#161616] before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-orange-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                        >
                            Datum Události
                        </label>
                    </div>
                </div>
                <div>
                <form className="max-w-[16rem] mx-auto grid grid-cols-2 gap-4 autofill:bg-white focus:border-orange-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400">
                <div className='focus:border-orange-300'>
                    <div className="relative my-6 focus:border-orange-300">
                        <div className="absolute inset-y-0 focus:border-orange-300 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400 dark:text-gray-400 autofill:bg-white focus:border-orange-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" >
                            <path
                                fillRule="evenodd"
                                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                clipRule="evenodd"
                            />
                            </svg>
                        </div>
                        <input
                            type="time"
                            id="start-time"
                            className="bg-gray-50 border focus-b  leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-200 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-orange-500"
                            min="09:00"
                            max="18:00"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            required
                        />
                        </div>
                </div>
                <div>
                    <div className="relative my-6">
                    <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <input
                        type="time"
                        id="end-time"
                        className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        min="09:00"
                        max="18:00"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                    </div>
                </div>
                </form>
                </div>
                <div className='my-6'>
                    <button className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded dark:bg-orange-800 dark:hover:bg-orange-900 bg-orange-500 px-4 text-xs font-medium tracking-wide text-white shadow-md shadow-orange-200 dark:shadow-none transition duration-300 hover:bg-orange-600 hover:shadow-sm hover:shadow-orange-200 focus:bg-orange-700 dark:focus:bg-orange-950 focus:shadow-sm focus:shadow-orange-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-orange-300 disabled:bg-orange-300 disabled:shadow-none">
                        <span>Uložit</span>
                    </button>
                </div>
            </div>
        </div>
        <table aria-label="Novinky" role="feed" className=" w-full md:ml-5 md:w-2/3 text-sm items-center justify-center self-center table-auto">
          <tbody>
            {calendarFeedInputTable.map((item) => {
              let tempDay = dayjs(item.date);
              let dayInWeek = tempDay.day();
              let dayInMonth = tempDay.date();

              return (
                <tr key={item.id} className="border-b-[1px] flex border-gray-500">
                  <td className="pl-3 py-2 text-xs text-start sm:text-sm font-thin text-slate-800 dark:text-gray-200 flex-shrink">
                    {`${dayInMonth}. ${ceskeMesice[tempDay.month()]} (${ceskeDny[dayInWeek]})`}
                  </td>
                  <td className="py-2 text-xs sm:text-sm text-start font-thin text-slate-800 dark:text-gray-200 flex-grow">
                    {` - ${item.event}`}
                  </td>
                  <td className="py-2 text-xs sm:text-sm text-orange-600 dark:text-orange-200 font-thin text-end flex-shrink">
                    {`${item.eventStart} - ${item.eventEnd}`}
                  </td>
                  <td>
                    <button onClick={()=>handleDel(item.id)} >
                        <MdDeleteForever className='pl-2  h-8 w-8 text-red-500' />
                    </button>
                    
                  </td>
                  <td>
                    <button onClick={()=>handleEdit(item.id)}  >
                        <FaPen className='pl-2 h-6 pt-2 w-6  text-orange-400' />
                    </button>
                    
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
    </div>

</div>
  );
}

