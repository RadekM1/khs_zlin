'use client';

import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import SpinnerBigOrange from "../spinners/spinnerBigOrange";




const ceskeMesice = [
  'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 
  'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
];



const ceskeDny = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'];


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


const getCeskyDen = (day) => {
  if (day) {
    const dayOfWeek = day.day(); 
    return ceskeDny[dayOfWeek];
  }
  return '';
};

export default function AdminCalendarFrontend() {



  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDay, setSelectedDay] = useState('');
  const [rowsLoading, setRowsLoading] = useState(false)
  const [rows, setRows] = useState([]);







  const daysOfWeek = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne']; 

  const isHighlighted = (day) => {
    return rows.some((item) =>
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

 

  useEffect(() => {
    fetchData();
  }, []);


  const filteredRows = rows.filter((row) => {
    const eventDate = dayjs(row.date);
    return eventDate.isSame(currentMonth, 'month');
  });

  const sortedRows = filteredRows.sort((a,b) =>{
    return dayjs(a.date).isBefore(b.date) ? -1 : 1;
  })


//------------- fetch API down -----------------------------

  const fetchData = async () => {
    setRowsLoading(true)


    
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
      setRowsLoading(false)


    }
  };

  //------------- fetch API UP -----------------------------



  return (

    <div className='flex w-full flex-col lg:flex-row'>
      
      {rowsLoading ? <SpinnerBigOrange /> : 
      
      
      <div>
        <div className="max-w-[400px] min-w-[300px] lg:mr-5 m-6 p-4 border border-gray-200 dark:border-gray-500 rounded-lg bg-gray-50 dark:bg-[#151515] shadow-lg">
         

          <div className="grid grid-cols-7 gap-2 text-center">
            {daysOfWeek.map((day, index) => (
              <div key={index} className=" text-sm text-gray-700 dark:text-gray-300">
                {day}
              </div>
            ))}

            {calendarDays.map((day, index) => (
              <div
                key={index}
     
                className={`h-8 w-8 m-1  flex items-center justify-center  rounded-full text-xs ${
                    day && isToday(day)
                    ? 'bg-orange-600 dark:bg-orange-200 text-white dark:text-black'
                    : day && isSelected(day)
                    ? 'ring-2 bg-orange-100 dark:bg-orange-100  dark:ring-orange-200 ring-orange-600 text-gray-800 dark:text-gray-200'
                    : day && isHighlighted(day)
                    ? 'ring-1 dark:ring-orange-200 ring-orange-600 text-gray-800 dark:text-gray-200'
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
      
      
      }
      
      
      

         {/* ----------------------------------   event list  --------------------------- */}
        
        

         {rowsLoading ? <SpinnerBigOrange /> :
          
          <table aria-label="Novinky" role="feed" className=" w-full md:ml-5 xl:w-2/3 text-sm items-center justify-center self-center table-auto">
          <tbody>
            {sortedRows.map((row) => {
              let tempDay = dayjs(row.date);
              let dayInWeek = tempDay.day();
              let dayInMonth = tempDay.date();
              let eventStartInCycle = null;
              let eventEndInCycle = null;
              const eventStartTime = new Date(`1970-01-01T${row.event_start}`);
              const formattedEventStart = eventStartTime.toTimeString().slice(0, 5);
              const eventEndTime = new Date(`1970-01-01T${row.event_end}`);
              const formattedEventEnd = eventEndTime.toTimeString().slice(0, 5);
              let checkDay = row.check_whole_day === true ? 'celodenní' : '';
              let checkNoEnd = row.check_no_end === true ? 'neurčeno' : '';

              switch(row.event_start){
                case null : {eventStartInCycle = ''};break;
                case '' : {eventStartInCycle = ''};break;
                case undefined : {eventStartInCycle = ''};break;
                default: eventStartInCycle = formattedEventStart; break;
              }

              switch(row.event_end){
                case null : {eventEndInCycle = ''};break;
                case '' : {eventEndInCycle = ''};break;
                case undefined : {eventEndInCycle = ''};break;
                default: eventEndInCycle = formattedEventEnd; break;
              }

              return (
                <tr key={row.id} className="border-b-[1px] border-b-slate-200 dark:border-b-slate-800 flex">
                  <td className="pl-3 py-2 text-xs text-start sm:text-sm font-thin text-slate-800 dark:text-gray-200 flex-shrink">
                    {`${dayInMonth}. ${ceskeMesice[tempDay.month()]} (${ceskeDny[dayInWeek]})`}
                  </td>
                  <td className="py-2 text-xs sm:text-sm text-start font-thin text-slate-800 dark:text-gray-200 flex-grow">
                    {` - ${row.event}`}
                  </td>
                  <td className="py-2 text-xs sm:text-sm text-orange-600 dark:text-orange-200 font-thin text-end flex-shrink">
                    {
                    
                    ` ${checkDay && checkDay} ${checkDay ? '' : eventStartInCycle} ${ checkDay ? '' : '-'} ${checkNoEnd ? checkNoEnd : ''} ${checkDay || checkNoEnd ? '' : eventEndInCycle}`
                    }
                  </td>
                  
                </tr>
              );
            })}
            
          </tbody>
        
        </table>
          
           }
        
      
        
    </div>


  );
}

