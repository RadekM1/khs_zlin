'use client';

import React, { useEffect, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import Pagination from '@mui/material/Pagination';
import { handleChangePaginat } from "@/lib/functions/handleChangePaginat";
import { ArraySort } from '@/lib/functions/arraySort';
import SearchField from "./searchField";
import ResetBtn from "./resetBtn";
import { MdDeleteForever } from "react-icons/md";
import SpinnerBigOrange from "../spinners/spinnerBigOrange";
import { CiEdit } from "react-icons/ci";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";


export default function RentalTable() {

  

  const [rows, setRows] = useState([]);
  const [sortingColumn, setsortingColumn] = useState(null)
  const [sortingOrder, setSortingOrder] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchField, setSearchField] = useState('')
  const [filteredRows, setFilteredRows] = useState(rows)
  const [rowsLoading, setRowsLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [editActive, setEditActive] = useState(false)
  const [idToEdit, setIdToEdit] = useState(undefined)
  const [productName, setProductName] = useState(undefined)
  const [pieces, setPieces] = useState(undefined)
  const [onStock, setOnStock] = useState(false)
  const [isReserved, setIsReserved] = useState(false)
  const [whoReserved, setWhoResereved] = useState(undefined)
  const [whoRented, setWhoRented] = useState(undefined)


//------------- first fetch API DOWN -----------------------------


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

  //------------- first fetch API UP -----------------------------




  const columnsNamesMainList = [
    { key: 'id', label: 'kod', sorting: true },
    { key: 'item_name', label: 'Vybavení', sorting: true },
    { key: 'pieces', label: 'ks', sorting: true },
    { key: 'on_stock', label: 'skladem', sorting: true },
    { key: 'reserved', label: 'zarezervováno', sorting: true },
    { key: 'member_reserved', label: 'zarezervoval', sorting: true },
    { key: 'member_rented', label: 'vypůjčil', sorting: true },
    { label: 'del', id:'delLabel', sorting: false },
    { label: 'edit', id:'editLabel', sorting: false },
  ];

//-------------DELETE API down   ------------------------------------



  const handleDel = async (id) => {
    let confirmDel = confirm(`opravdu chcete smazat produkt č. ${id} ?`)
    if(!confirmDel){
      return;
    }
    setDisabled(true)
    try{
      const response = await fetch('/api/rental', {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          operation: 'productDel',
          product: id,
        })
      })
      if(!response.ok){
        console.log(response.error)
      }
      fetchData();
    }catch (error) {
      console.log(error)
    }finally{
      setDisabled(false)
    }
  };


//-------------DELETE API UP   --------------------------------------





//-------------CHANGE API down   ------------------------------------

  const handleSqlChange = async (account, value, id) => {
    let tempAcc = account;
    let tempId = id;
    let tempVal = value;

    setDisabled(true)
    try{
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          operation: id,
          user: account,
          clearance: value,
          locked: value
        })
      });
      
      if(!response.ok){
        console.log(response.error)
      }
      fetchData();
      console.log(response)
    } catch (error) {
      console.log(error)
    }finally{
     setDisabled(false)
      
    }
  };
  

  //-------------CHANGE API up   ------------------------------------
  

  const rowsPerPage = 50;

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


  const HandleAdd = () => {
    console.log('add console log test')
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

    setEditActive(true)
    setIdToEdit(row.id);
    setProductName(row.item_name)
    setPieces(row.pieces)
    setOnStock(row.on_stock)
    setIsReserved(row.reserved)
    setWhoResereved(row.member_reserved)
    setWhoRented(row.member_rented)
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
                  {column.label}
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

          <tr className="text-xs md:text-sm border-b text-start dark:bg-gray-300 dark:text-white dark:even:bg-gray-500 even:bg-gray-100 odd:bg-white dark:hover:bg-gray hover:bg-gray-50">
    
          {/* Input pro ID (může být prázdný nebo automaticky generován) */}
          <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
            <input
              type="text"
              placeholder="ID"
              className="w-full h-8  border rounded"
              disabled
              value={idToEdit}
            />
          </td>
          

          <td className="py-2 md:mx-2 md:px-2 border-[1px]  text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
            <input
              type="text"
              placeholder="Zadejte název"
              className="w-full min-w-32 h-8 border rounded dark:bg-zinc-100"
              onChange={(event) => handleProductChange(event.target.value, 'productName')}
              value={productName}
              disabled={disabled}
            />
          </td>
          
   
          <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
            <input
              type="number"
              placeholder="Zadejte počet"
              className="w-full h-8 border dark:bg-zinc-100 rounded"
              onChange={(event) => handleProductChange(event.target.value, 'pieces')}
              value={pieces}
              disabled={disabled}
            />
          </td>
         
          <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
            <select 
            className="w-full min-w-20 h-8 dark:bg-zinc-100 border rounded"
            onChange={(event) => handleProductChange(event.target.value, 'onStock')}
            value={onStock}
            disabled={disabled}
            >
              <option value="true">Ano</option>
              <option value="false">Ne</option>
            </select>
          </td>
          
    
          <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
            <select 
            className="w-full min-w-20 h-8 dark:bg-zinc-100 border rounded"
            onChange={(event) => handleProductChange(event.target.value, 'isReserved')}
            value={isReserved}
            disabled={disabled}
            >
              <option value="true">Ano</option>
              <option value="false">Ne</option>
            </select>
          </td>
          
      
          <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
            <input
              type="text"
              className="w-full min-w-24 h-8 px-1 border dark:bg-zinc-100 rounded"
              onChange={(event) => handleProductChange(event.target.value, 'whoReserved')}
              value={whoReserved}
              disabled={disabled}
            />
          </td>

              
          <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
            <input
              type="text"
              className="w-full min-w-24 h-8 px-1 border dark:bg-zinc-100 rounded"
              onChange={(event) => handleProductChange(event.target.value, 'whoRented')}
              value={whoRented}
              disabled={disabled}
            />
          </td>

          {!editActive && 
          <td colSpan={2} className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
            <button 
            className="inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-green-500 hover:bg-green-600 focus:bg-green-700 disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300 disabled:shadow-none"
            disabled={disabled}
            >
              <span>Přidat</span>
            </button>
          </td>
          }

          {editActive && 
          <>
            <td  className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
            <button 
            className="inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-green-500 hover:bg-green-600 focus:bg-green-700 disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300 disabled:shadow-none"
            disabled={disabled}
            >
              <span>OK</span>
            </button>
            </td>
            <td  className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
              <button 
                disabled={disabled}
                onClick={()=>{setEditActive(false), handleResetForm()}}
                className="inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-orange-500 hover:bg-orange-600 focus:bg-orange-700 disabled:cursor-not-allowed disabled:border-orange-300 disabled:bg-orange-300 disabled:shadow-none">
                <span> x </span>
              </button>
            </td>
          </>
          
          }


          
        </tr>
            {paginatedRows.map((row) => (
              <React.Fragment key={row.id}>
                <tr className="text-xs md:text-sm border-b text-start dark:bg-gray-300 dark:text-white dark:even:bg-gray-200 even:bg-zinc-100 odd:bg-white dark:hover:bg-gray hover:bg-gray-50">
                  
                  {/* Sloupec ID */}
                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                    {row.id}
                  </td>
                  
                  {/* Sloupec Vybavení */}
                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                    {row.item_name}
                  </td>
                  
                  {/* Sloupec ks celkem */}
                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                    {row.pieces}
                  </td>
                  
                  {/* Sloupec skladem */}
                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                    {row.on_stock ? (
                      <FaThumbsUp className="h-5 w-5 text-green-700" />
                    ) : (
                      <FaThumbsDown className="h-5 w-5 text-red-700" />
                    )}
                  </td>
                  
                  {/* Sloupec zarezervováno */}
                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                  {row.reserved ? (
                    <span className="text-green-700">ANO</span>
                  ) : (
                    <span className="text-red-700">NE</span>
                  )}
                  </td>
                  
                  {/* Sloupec zarezervoval */}
                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                    {row.member_reserved}
                  </td>
                  
                  {/* Sloupec vypůjčil */}
                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                    {row.member_rented}
                  </td>
                  
                
                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                    <button disabled={disabled} onClick={() => handleDel(row.id)}>
                      <MdDeleteForever
                        className={`h-7 w-7 hover:cursor-pointer ${
                          disabled ? 'dark:text-red-800 text-red-200' : 'text-red-500'
                        }`}
                      />
                    </button>
                  </td>
                  
            
                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                    <button disabled={disabled} onClick={() => handleProductEdit(row.id)}>
                      <CiEdit
                        className={`h-7 w-7 hover:cursor-pointer ${
                          disabled ? 'dark:text-orange-800 text-orange-200' : 'text-orange-600'
                        }`}
                      />
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>


        </table>

      </div>
      
      {rowsLoading && <SpinnerBigOrange /> }
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
