'use client'

import React, { useState } from 'react';
import dayjs from 'dayjs';


const ceskeMesice = [
  'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 
  'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
];


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

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const daysOfWeek = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne']; 

  const isHighlighted = (day) => {
    return calendarFeedInput.some((item) =>
      dayjs(item.date).isSame(day, 'day')
    );
  };

  const isToday = (day) => {
    return dayjs().isSame(day, 'day');
  };

  const calendarDays = generateCalendarDays(currentMonth);

  return (
    <div className="w-full max-w-md mx-auto m-4 p-4 border border-gray-200  dark:border-gray-500 rounded-lg bg-gray-50 dark:bg-[#151515] shadow-lg">
      <div className="flex justify-between items-center mb-4">
        
      {/*
      
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
      
      */}  
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
            className={`h-8 w-8 flex items-center justify-center rounded-full text-xs ${
              day && isToday(day)
                ? 'bg-orange-600 dark:bg-orange-200 text-white dark:text-black'  
                : day && isHighlighted(day)
                ? 'ring-1 dark:ring-orange-200 ring-orange-600 text-gray-800 dark:text-gray-200 ' 
                : ' text-gray-700 dark:text-gray-300'
            }`}
          >
            {day ? day.date() : ''}
          </div>
        ))}
      </div>
    </div>
  );
}
