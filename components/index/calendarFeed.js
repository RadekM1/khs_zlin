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
  { id: 5, date: '2024-09-04', event: 'Soustředění tatry dlouhý text moc moc dlouhý text', eventStart: '12:00', eventEnd: '' },
  { id: 6, date: '2024-09-05', event: 'Soustředění tatry', eventStart: '', eventEnd: '' },
  { id: 7, date: '2024-09-10', event: 'Soustředění tatry', eventStart: '', eventEnd: '18:00' },
  { id: 8, date: '2024-09-13', event: 'vertikon trénink', eventStart: '19:00', eventEnd: '24:00' },
  { id: 9, date: '2024-09-15', event: 'trénink', eventStart: '19:00', eventEnd: '24:00' },
  { id: 10, date: '2024-09-20', event: 'schůze', eventStart: '19:00', eventEnd: '24:00' },
  { id: 11, date: '2024-09-22', event: 'oslava', eventStart: '19:00', eventEnd: '24:00' }
];

export default function CalendarFeed() {


  return (
    <div className="my-5 flex w-full flex-grow">
  <table aria-label="Novinky" role="feed" className="w-full text-sm table-auto">
    <tbody>
      {calendarFeedInput.map((item) => {
        let tempDay = dayjs(item.date);
        let dayInWeek = tempDay.day();
        let dayInMonth = tempDay.date();

        return (
          <tr key={item.id} className="border-b-[1px] border-gray-500">
            <td className="pl-3 py-2 text-xs text-start sm:text-sm font-thin text-slate-800 dark:text-gray-200 flex-shrink">
              {`${dayInMonth}. ${months[dayjs(item.date).month()]} (${dnyVtydnu[dayInWeek]})`}
            </td>
            <td className="py-2 text-xs sm:text-sm text-start font-thin text-slate-800 dark:text-gray-200 flex-grow">
              {`${item.event}`}
            </td>
            <td className="py-2 text-xs sm:text-sm text-orange-600 dark:text-orange-200 font-thin text-end flex-shrink">
              {`${item.eventStart} - ${item.eventEnd}`}
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
</div>

  )
}