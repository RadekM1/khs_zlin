'use client'

import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import SpinnerBigOrange from "../spinners/spinnerBigOrange";







export default function Calendar() {

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(dayjs());


  
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

  const daysOfWeek = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne']; 

  const isHighlighted = (day) => {
    return rows.some((item) =>
      dayjs(item.date).isSame(day, 'day')
    );
  };


  console.log(rows)

  
useEffect(() => {
  fetchData();
}, []);



//------------- fetch API down -----------------------------

const fetchData = async () => {
  setLoading(true)
  
  try {
    const response = await fetch('/api/calendar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ operation: 'calendarList' })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch events list');
    }
    const data = await response.json();

    setRows(data.calendar); 
  } catch (error) {
    console.error('Error fetching user list:', error);
  }finally{

    setLoading(false)

  }
};

//------------- fetch API UP -----------------------------






  const isToday = (day) => {
    return dayjs().isSame(day, 'day');
  };

  const calendarDays = generateCalendarDays(currentMonth);

  return (
    <div className="w-full max-w-[400px]  mx-auto m-4 p-4 border border-gray-200  dark:border-gray-500 rounded-lg bg-gray-50 dark:bg-[#151515] shadow-lg">


  
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
