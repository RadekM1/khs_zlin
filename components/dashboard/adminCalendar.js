'use client';

import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { MdDeleteForever } from "react-icons/md";
import SpinnerBigOrange from "../spinners/spinnerBigOrange";
import { FaPen } from "react-icons/fa";
import CheckBox from '../checkbox';
import SpinnerSmallOrange from '../spinners/spinnerSmallOrange';



const ceskeMesice = [
  'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 
  'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec'
];



const ceskeDny = ['Neděle', 'Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota'];

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


const getCeskyDen = (day) => {
  if (day) {
    const dayOfWeek = day.day(); 
    return ceskeDny[dayOfWeek];
  }
  return '';
};

export default function AdminCalendar() {



  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDay, setSelectedDay] = useState('');

  const [rowsLoading, setRowsLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [rows, setRows] = useState([]);
  const [disabled, setDisabled] = useState(false)
  const [idToHandle, setIdToHandle] = useState(null)
  const [event, setEvent] = useState('')
  const [eventDate, setEventDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [startTime, setStartTime] = useState('09:00:00');
  const [endTime, setEndTime] = useState('15:00:00');
  const [checkBoxDayValue, setCheckBoxDayValue] = useState(false)
  const [checkBoxNoEndValue, setCheckBoxNoEndValue] = useState(false)
  const [editActive, setEditActive] = useState(false)

  console.log('event: ',event)
  console.log('event date: ',eventDate)
  console.log('start time: ',startTime)
  console.log('end time: ',endTime)
  console.log('checkbox Day: ',checkBoxDayValue)
  console.log('checkbox No End: ',checkBoxNoEndValue)


const handleEdit = (id) =>{
  let row = rows.find(row => id === row.id);

  if(!row){
    return;
  }


  setEditActive(true)
  setIdToHandle(id)
  setEvent(row.event || null); 
  setEventDate(row.date ? dayjs(row.date).format('YYYY-MM-DD') : null); 
  setStartTime(row.event_start || '')
  setEndTime(row.event_end || '')
  setCheckBoxDayValue(row.check_whole_day || false); 
  setCheckBoxNoEndValue(row.check_no_end || false);
}


  const handleChange = (e, id) => {

    console.log(e, id)
    let tempVal = e;
    let tempId = id;

    if(tempId === 'checkBoxNoEnd' && tempVal === true){
      setCheckBoxDayValue(false)

    }else if(tempId === 'checkBoxDay' && tempVal === true){
      setCheckBoxNoEndValue(false)

    }
    switch(tempId){
      case 'checkBoxNoEnd' : 
      setCheckBoxNoEndValue(tempVal); 
      if(tempVal === true){setEndTime('')}
      break;
      case 'checkBoxDay' : setCheckBoxDayValue(tempVal); 
      if(tempVal === true){setStartTime(''); setEndTime('')};
      default: break;
    }
  }




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
    setDisabled(true)
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
      setRowsLoading(false)
      setDisabled(false)
      setLoading(false)
      handleReset();
    }
  };

  //------------- fetch API UP -----------------------------



  //------------- delete API down -----------------------------

  const handleDel = async (id) =>{
    setDisabled(true)
    setLoading(true)
    const confirmed = confirm('opravdu chcete smazat tuto událost z kalendáře ?')
    if(!confirmed){
      return;
    }

    try{
      const response = await fetch('/api/calendar', {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          operation: 'eventDel',
          eventId: id,
      })
    })


      console.log(response)
      if(!response.ok){
        console.log(response.error)
      }
      fetchData();
    } catch (error) {
      console.log(error)
    } finally{
      setDisabled(false)
      setLoading(false)
    }
  }

  const handleReset = () => {
    setEditActive(false)
    setIdToHandle('')
    setEvent(''); 
    setEventDate(selectedDay); 
    setStartTime('09:00')
    setEndTime('15:00')
    setCheckBoxDayValue(false); 
    setCheckBoxNoEndValue(false);
  }



    //------------- delete API up -----------------------------


    //------------- add API down -----------------------------

    

    const handleAdd = async () =>{
      
   if (!event || event.trim() === '') {  
    alert('Není zadaný název události');
    setDisabled(false);
    setLoading(false);
    return;
  }

  if ((!startTime && checkBoxDayValue === false) || !eventDate || eventDate.trim() === '') {
    alert('Není zadané datum nebo čas události');
    setDisabled(false);
    setLoading(false);
    return;
  }
      let prepairedStartTime = (startTime === null || startTime === undefined || startTime === '') ? null : startTime;
      let prepairedEndTime = (endTime === null || endTime === undefined || endTime === '') ? null : endTime;
      setDisabled(true)
      setLoading(true)
      try{

        const response = await fetch('/api/calendar', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            event:event,
            eventDate: eventDate,
            startTime: prepairedStartTime,
            endTime: prepairedEndTime,
            checkBoxDayValue: checkBoxDayValue,
            checkBoxNoEndValue: checkBoxNoEndValue,
            operation: 'eventAdd',
            
        })
      })

        if(!response.ok){
          console.log(response.error)
        }
        fetchData();
      } catch (error) {
        console.log(error)
      } finally{
        setDisabled(false)
        setLoading(false)
      }
    }

    //------------- add API down -----------------------------



    //-------------edit API down-------------------------------


    const handleRowEdit = async () =>{
      if (!event || event.trim() === '') {  // Kontrola, zda je event prázdný nebo jen obsahuje mezery
        alert('Není zadaný název události');
        setDisabled(false);
        setLoading(false);
        return;
      }
    
      if ((!startTime && checkBoxDayValue === false) || !eventDate || eventDate.trim() === '') {
        alert('Není zadané datum nebo čas události');
        setDisabled(false);
        setLoading(false);
        return;
      }
      let prepairedStartTime = (startTime === null || startTime === undefined || startTime === '') ? null : startTime;
      let prepairedEndTime = (endTime === null || endTime === undefined || endTime === '') ? null : endTime;
      
      setDisabled(true)
      setLoading(true)
      try{

        const response = await fetch('/api/calendar', {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            id:idToHandle,
            event:event,
            eventDate: eventDate, 
            startTime: prepairedStartTime,
            endTime: prepairedEndTime,
            checkBoxDayValue: checkBoxDayValue,
            checkBoxNoEndValue: checkBoxNoEndValue,
            operation: 'eventEdit',
        })
      })

        if(!response.ok){
          console.log(response.error)
        }
        
        fetchData();
      } catch (error) {
        console.log(error)
      } finally{
        setDisabled(false)
        setLoading(false)
        
      }




    }

    //-------------edit API up---------------------------------


  return (

    <div className='flex w-full flex-col mx-3 lg:flex-row'>
      
      {rowsLoading ? <SpinnerBigOrange /> : 
      
      
      <div>
        <div className="max-w-[400px] mx-auto lg:mr-5 m-6 p-4 border border-gray-200 dark:border-gray-500 rounded-lg bg-gray-50 dark:bg-[#151515] shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <button
              disabled={disabled}
              onClick={() => setCurrentMonth(currentMonth.subtract(1, 'month'))}
              className="text-md bg-transparent border-none cursor-pointer"
            >
              ←
            </button>
            <h2 className="text-sm">
              {ceskeMesice[currentMonth.month()]} {currentMonth.year()}
            </h2>
            <button
              disabled={disabled}
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
                onClick={() => {
                  if (day) {
                    const formattedDate = day.format('YYYY-MM-DD'); 
                    setEventDate(formattedDate);
                    setSelectedDay(formattedDate);
                  }
                }}
                className={`h-8 w-8 flex items-center justify-center cursor-pointer rounded-full text-xs ${
                    day && isToday(day)
                    ? 'bg-orange-600 dark:bg-orange-200 text-white cursor-pointer dark:text-black'
                    : day && isSelected(day)
                    ? 'ring-2 bg-orange-100 dark:bg-orange-100 cursor-pointer dark:ring-orange-200 ring-orange-600 text-gray-800 dark:text-gray-200'
                    : day && isHighlighted(day)
                    ? 'ring-1 dark:ring-orange-200 ring-orange-600 cursor-pointer text-gray-800 dark:text-gray-200'
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
      
      
      

      
    
      {/* ----------------------------------   table interface --------------------------- */}
      <div className="my-5 justify-center  lg:self-start align-top flex flex-col flex-grow">
        <div className='flex justify-center flex-col'>
            <div className='flex flex-grow justify-center w-full'>
                <div className="w-full my-1">
                    <input type="text"  
                    value={event}
                    placeholder="Název události" 
                    aria-label="Search content" 
                    onChange={(e)=> setEvent(e.target.value)}
                    className="relative w-full h-10 px-4 pr-12 text-sm transition-all border rounded outline-none focus-visible:outline-none peer border-slate-400 text-slate-700 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-orange-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
                </div>
            </div>
            <div className='flex-col md:flex-row flex justify-evenly'>
                <div className='justify-start mx-3 '>
                    <div className="relative my-6">
                    <input
                        id="id-date07"
                        type="date"
                        name="id-date07"
                        className="peer relative h-10 w-full rounded border border-slate-400 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all"
                        value={eventDate} 
                        onChange={(e) => {
                          const selectedDate = dayjs(e.target.value, 'YYYY-MM-DD');  
                          setEventDate(selectedDate.format('YYYY-MM-DD'));  
                          setSelectedDay(selectedDate.format('YYYY-MM-DD'));  
                        }} 
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
                <div className='my-6 mx-3'>

                  {!editActive ? 
                  
                  
                  <button 
                  disabled={disabled}
                  onClick={()=>handleAdd()}
                  className="inline-flex items-center justify-center h-10 gap-2 mx-4 px-4 text-sm shadow-md dark:bg-green-800 dark:hover:bg-green-900 shadow-green-200 dark:shadow-none font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-green-500 hover:bg-green-600 focus:bg-green-700 disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300 disabled:shadow-none">
                     {loading ? <SpinnerSmallOrange /> : <span>Uložit</span> } 
                  </button>

                  :
                  <div className='flex flex-row'>
                  <button 
                  onClick={()=>handleRowEdit()}
                  disabled={disabled}
                  className="inline-flex items-center justify-center h-10 mx-4 gap-2 px-4 text-sm font-medium dark:bg-green-800 dark:hover:bg-green-900 shadow-md shadow-green-200 dark:shadow-none tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-green-500 hover:bg-green-600 focus:bg-green-700 disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300 disabled:shadow-none">
                      {loading ? <SpinnerSmallOrange /> : <span>Aktualizovat</span>  }  
                  </button>

                  <button 
                  onClick={()=>handleReset()}
                  disabled={disabled}
                  className="inline-flex h-10 items-center mx-4 justify-center gap-2 justify-self-center whitespace-nowrap rounded dark:bg-orange-800 dark:hover:bg-orange-900 bg-orange-500 px-4 text-xs font-medium tracking-wide text-white shadow-md shadow-orange-200 dark:shadow-none transition duration-300 hover:bg-orange-600 hover:shadow-sm hover:shadow-orange-200 focus:bg-orange-700 dark:focus:bg-orange-950 focus:shadow-sm focus:shadow-orange-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-orange-300 disabled:bg-orange-300 disabled:shadow-none">
                      {loading? <SpinnerSmallOrange /> : <span>Zrušit</span> }  
                  </button>
                  </div>
                  }



                </div>
            </div>
        </div>
        <div className='border-b-[1px] border-b-slate-200 mb-6 dark:border-b-slate-800 self-center flex flex-row'>
          <CheckBox handleChange={handleChange} disabled={disabled} checked={checkBoxDayValue} id='checkBoxDay' label='celodenní' helperText={'místo hodin pouze "celodenní"'}  />
          <CheckBox handleChange={handleChange} disabled={disabled} checked={checkBoxNoEndValue} id='checkBoxNoEnd' label='bez ukončení   ' helperText={'text bude: "neurčeno"'} />
        </div>




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
                    
                    ` ${checkDay && checkDay} ${checkDay ? '' : eventStartInCycle} ${ checkDay ? '' : '-'} ${checkNoEnd ? checkNoEnd : ''} ${checkDay ? '' : eventEndInCycle}`
                    }
                  </td>
                  <td>
                    <button disabled={disabled} onClick={()=>handleDel(row.id)} >
                      {loading? '' : <MdDeleteForever className='pl-2  h-8 w-8 text-red-500' /> }
                    </button>
                    
                  </td>
                  <td>
                    <button disabled={disabled} onClick={()=>handleEdit(row.id)}  >
                      {loading? '' : <FaPen className='pl-2 h-6 pt-2 w-6  text-orange-400' /> }    
                    </button>
                    
                  </td>
                </tr>
              );
            })}
            
          </tbody>
        
        </table>
          
           }
        
      
        
    </div>

</div>
  );
}

