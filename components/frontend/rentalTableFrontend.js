'use client';

import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import Pagination from '@mui/material/Pagination';
import { handleChangePaginat } from "@/lib/functions/handleChangePaginat";
import { ArraySort } from '@/lib/functions/arraySort';
import SearchField from "@/components/table/searchField";
import ResetBtn from "@/components/table/resetBtn";
import SpinnerBigOrange from "../spinners/spinnerBigOrange";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";




export default function RentalTableFrontEnd() {

  

  const [rows, setRows] = useState([]);
  const [sortingColumn, setsortingColumn] = useState(null)
  const [sortingOrder, setSortingOrder] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchField, setSearchField] = useState('')
  const [filteredRows, setFilteredRows] = useState(rows)
  const [rowsLoading, setRowsLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [editActive, setEditActive] = useState(false)
  const [idToEdit, setIdToEdit] = useState('')
  const [productName, setProductName] = useState('')
  const [pieces, setPieces] = useState('')
  const [onStock, setOnStock] = useState(false)
  const [isReserved, setIsReserved] = useState(false)
  const [whoReserved, setWhoResereved] = useState('')
  const [whoRented, setWhoRented] = useState('')
  const [loading, setLoading] = useState(false)


//------------- fetch API down -----------------------------


  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    setRowsLoading(true)
    try {
      const response = await fetch('/api/rental', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ operation: 'rentalList' })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch rental list');
      }

      const data = await response.json();
      console.log(data.rentalListResult)
      setRows(data.rentalListResult); 
    } catch (error) {
      console.error('Error fetching user list:', error);
    }finally{
      setRowsLoading(false)
      
    }
  };

  //------------- fetch API UP -----------------------------




  const columnsNamesMainList = [
    { key: 'id', label: 'id', sorting: true },
    { key: 'item_name', label: 'Vybavení', sorting: true },
    { key: 'pieces', label: 'ks', sorting: true },
    { key: 'on_stock', label: 'skladem', sorting: true },
    { key: 'reserved', label: 'zarezervováno', sorting: true },
  ];


  const rowsPerPage = 30;

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

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedRows = filteredRows.slice(startIndex, startIndex + rowsPerPage);


  const handleProductChange = (e, id) => {

    let tempE = e
    let tempId = id

    switch(tempId){
      case 'productName' : {setProductName(tempE)};break;
      case 'pieces' : {setPieces(tempE)};break;
      case 'onStock' : {setOnStock(tempE)};break;
      case 'isReserved' : {setIsReserved(tempE)};break;
      case 'whoReserved' : {setWhoResereved(tempE)};break;
      case 'whoRented' : {setWhoRented(tempE)};break;
      default: break;
    }
  }

  const handleProductEdit = (rowId) =>{
    let tempId = rowId;
    let row = rows.find(row => tempId === row.id);
    let rentedPerson = row.member_rented === null ? '' : row.member_rented
    let reservedPerson = row.member_reserved === null ? '' : row.member_reserved

    setEditActive(true)
    setIdToEdit(row.id);
    setProductName(row.item_name)
    setPieces(row.pieces)
    setOnStock(row.on_stock)
    setIsReserved(row.reserved)
    setWhoResereved(row.member_reserved) === null ? setWhoRented('') : setWhoResereved(reservedPerson)
    setWhoRented(row.member_rented) ===  setWhoRented(rentedPerson) 
  }

  const handleResetForm = () => {
    setIdToEdit('');
    setProductName('')
    setPieces('')
    setOnStock(false)
    setIsReserved(false)
    setWhoResereved('')
    setWhoRented('')
  }



  return (
    <div className="flex-grow md:border bg-white dark:bg-zinc-400 dark:border-gray-400 w-full">
      <div className="flex flex-col overflow-hidden  md:flex-row">
        <div className="m-4">
          <SearchField searchField={searchField} handleChange={handleChange} />
        </div>
        <div className="m-4 flex-start">
          <ResetBtn handleReset={HandleReset} />
        </div>
      </div>
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
        <table className="min-w-full overflow-auto text-xs relative md:text-start md:text-sm text-gray-500">
          <thead className="text-xs md:text-sm rounded-xl border-gray-300 text-gray-700">
            <tr className="align-top">
              {columnsNamesMainList.map((column) => (
                <th
                  key={column.label}
                  onClick={column.sorting === true ? () => handleSorting(column.key) : undefined}
                  scope="col"
                  className={`bg-slate-50 dark:bg-zinc-500 dark:text-white font-thin  border-[1px] border-gray-300 pl-1 ${
                    column.sorting === true ? 'hover:cursor-pointer hover:bg-slate-200' : ''
                  } text-start md:mx-2 z-10 border-[1px] pr-4 py-2 w-auto md:text-sm text-xs`}
                >
                  {column.label !== 'del' && column.label !== 'edit' && column.label}
                  {column.sorting === true && (
                    <RiArrowDropDownLine
                      className={`${
                        column.key === sortingColumn && sortingOrder === 'asc'
                          ? 'text-green-400 rotate-180'
                          : ''
                      } ${
                        column.key === sortingColumn && sortingOrder === 'desc' ? 'text-red-400 rotate-0' : ''
                      } text-gray-400 w-8 h-8 font-bold`}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>

            {paginatedRows.map((row) => (
              <React.Fragment key={row.id}>
                <tr className="text-xs md:text-sm border-b text-start dark:bg-gray-300 dark:text-white dark:even:bg-gray-200 even:bg-zinc-100 odd:bg-white dark:hover:bg-gray hover:bg-gray-50">
                  
          
                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                    {row.id}
                  </td>
       
                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                    {row.item_name}
                  </td>
  
                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                    {row.pieces}
                  </td>
                  
            
                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                    {row.on_stock ? (
                      <FaThumbsUp className="h-5 w-5 text-green-700" />
                    ) : (
                      <FaThumbsDown className="h-5 w-5 text-red-700" />
                    )}
                  </td>
         
                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                  {row.reserved ? (
                    <span className="text-red-700">ANO</span>
                  ) : (
                    <span className="text-green-700">NE</span>
                  )}
                  </td>

                

                </tr>
              </React.Fragment>
            ))}
          </tbody>


        </table>

      </div>
      <div className="my-5">
        {rowsLoading && <SpinnerBigOrange /> }
      </div>
      
      
      <div className="flex-col flex">
        <div className="flex w-full dark:text-white gap-3 md:justify-between mt-4 flex-col-reverse md:flex-row">
          <Pagination
            count={Math.ceil(filteredRows.length / rowsPerPage)}
            page={currentPage}
            id="prepinani-pagination"
            width="120"
            onChange={(event, value) => handleChangePaginat(event, value, setCurrentPage)}
          />
        </div>
        <div className="flex dark:text-white justify-end">
          <span className="text-gray-600 dark:text-white items-center text-sm mt-4 m-2 md:mr-6"> {filteredRows.length} položek</span>
        </div>
      </div>

    </div>
  );
}
