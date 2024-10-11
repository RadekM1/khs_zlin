'use client';

import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { FaLink, FaCheck } from "react-icons/fa6";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import { VscError } from "react-icons/vsc";
import IconButton from '@mui/material/IconButton';
import { RiArrowDropDownLine } from "react-icons/ri";
import Pagination from '@mui/material/Pagination';
import {handleChangePaginat} from "@/lib/functions/handleChangePaginat";
import { ArraySort } from '@/lib/functions/arraySort';
import SearchField from "./searchField"
import ResetBtn from "./resetBtn";

export default function DefaultTable({inputRows}) {

const [rows, setRows] = useState(inputRows)
const [sortingColumn, setsortingColumn] = useState(null)
const [sortingOrder, setSortingOrder] = useState('asc')
const [currentPage, setCurrentPage] = useState(1)
const [searchField, setSearchField] = useState('')
const [filteredRows, setFilteredRows] = useState(rows)


const columnsNamesMainList = [
  { key: 'details', label: 'Detail', sorting: false },
  { key: 'gtin', label: 'GTIN', sorting: true },
  { key: 'name', label: 'Název', sorting: true },
  { key: 'availability', label: 'Sklad', sorting: false },
  { key: 'image_link', label: 'Náhled', sorting: false },
  { key: 'link', label: 'Url', sorting: false },
];

const handleClick = (id) => {
  console.log(id)
}
    
const rowsPerPage = 50

useEffect(() => {
  const filter = rows.filter((row) => { 
    let keys = Object.keys(row);
    let fulltextTrue = keys.some((key) => {
      return String(row[key]).toLowerCase().includes(String(searchField.toLowerCase()));
    });
    return fulltextTrue;
  });

  setFilteredRows(filter);


  const maxPage = Math.ceil(filter.length / rowsPerPage);
  if (currentPage > maxPage) {
    setCurrentPage(1); 
  }
}, [searchField, rows, currentPage]);
    
    
const handleChange = (event) => {
  setSearchField(event.target.value);
};

const HandleReset = () => {
  setSearchField(''); 
  setFilteredRows(rows); 
};


const handleSorting = (key) => {
  if (sortingColumn === key) {
    const newOrder = sortingOrder === 'asc' ? 'desc' : 'asc'; 
    setSortingOrder(newOrder);
    ArraySort(filteredRows, key, newOrder, setFilteredRows);
  } else {
    setsortingColumn(key);
    setSortingOrder('asc'); 
    ArraySort(filteredRows, key, 'asc', setFilteredRows); 
  }
};

const startIndex = (currentPage - 1) * rowsPerPage
const paginatedRows = filteredRows.slice(startIndex, startIndex + rowsPerPage)
  


return (
  
    <div className="flex-grow md:border bg-white dark:bg-gray-900  rounded-xl w-full"> 
      <div className="flex flex-col md:flex-row">
        <div className="m-4">
          <SearchField searchField ={searchField} handleChange={handleChange} />
        </div>
        <div className="m-4">
          <ResetBtn handleReset={HandleReset} />
        </div>
      </div>
      
      <table className="min-w-full text-xs relative md:text-start md:text-sm  text-gray-500">
        <thead className="text-xs  md:text-sm rounded-xl border-gray-300 text-gray-700  ">
          <tr className=" align-top ">
          {columnsNamesMainList.map((column) => {
            return (
              <th
                key={column.key}
                onClick={column.sorting === true ? () => { handleSorting(column.key) } : undefined}
                scope="col"
                className={` bg-slate-50 border-[1px] border-gray-300 pl-1   ${column.sorting === true ? 'hover:cursor-pointer hover:bg-slate-500 ' : ''}  text-start md:mx-2 z-10 border-[1px]   pr-4 py-2 w-auto md:text-sm text-xs`}
              >
                {column.label}
                {column.sorting === true && 
                <RiArrowDropDownLine 
                  className={`
                  ${(column.key === sortingColumn) && (sortingOrder === 'asc') ?  'text-green-400 rotate-180' : '' } 
                  ${(column.key === sortingColumn) && (sortingOrder === 'desc') ? 'text-red-400 rotate-0' : '' } 
                text-gray-400 w-8 h-8 font-bold`} 
                />}
              </th>
            );
          })}
          </tr>
        </thead>
        <tbody>
          {paginatedRows.map((row) => (
              <React.Fragment key={row.id} >
                  <tr className=" text-xs md:text-sm border-b even:bg-gray-100 odd:bg-white  hover:bg-gray-50 ">
                      {columnsNamesMainList.map((column) => {
                        let cellContent;
                        switch (column.key) {
                            case 'image_link': 
                                cellContent = 
                                row[column.key] !== null ? (<Image src={row[column.key]} alt="produkt" priority width={60} height={60} />) : null; 
                                break;
                            case 'link': 
                                cellContent = 
                                (<a href={row.link} target="_blank" className="flex justify-center" rel="noopener noreferrer"> <FaLink className="text-gray w-5 h-5 " /> </a>); 
                                break;
                            case 'details': 
                                cellContent = 
                                <IconButton >
                                  <IoArrowDownCircleOutline  onClick={()=>handleClick(row.id)} id={row.id} className={`w-6 h-6 text-gray  transform transition ease-in-out duration-500 `} /> 
                                </IconButton>; 
                                break;
                            case 'availability': 
                                cellContent = 
                                row[column.key] === true ? <FaCheck className="text-green-600 text-center ml-3"/> : <VscError className="text-red-600" />;
                                break;
                            default: cellContent = 
                                row[column.key]; 
                                break;
                            }
                      return (
                          <td key={column.key} className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                          {cellContent}
                          </td>
                      );
                      })}
                  </tr>
              </React.Fragment>
          ))}  
        </tbody>
      </table>
      <div className="flex-col flex">
        <div className="flex w-full gap-3 md:justify-between mt-4 flex-col-reverse md:flex-row">

          <Pagination 
            count={Math.ceil(filteredRows.length / rowsPerPage)} 
            page={currentPage}
            id="prepinani-pagination"
            width='120'
            onChange={(event, value)=>handleChangePaginat(event, value, setCurrentPage)} 
          />
        </div>
        <div className="flex justify-end">
          <span className="text-gray-600 items-center text-sm mt-4 m-2 md:mr-6"> {filteredRows.length} položek</span>
        </div>
      </div>
    </div>

  );
}
