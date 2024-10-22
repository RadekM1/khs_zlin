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

export default function UserTable() {

  

  const [rows, setRows] = useState([]);
  const [sortingColumn, setsortingColumn] = useState(null)
  const [sortingOrder, setSortingOrder] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchField, setSearchField] = useState('')
  const [filteredRows, setFilteredRows] = useState(rows)
  const [rowsLoading, setRowsLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)



//------------- first fetch API DOWN -----------------------------


  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    setRowsLoading(true)
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ operation: 'userList' })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user list');
      }

      const data = await response.json();
      console.log(data.userListResult)
      setRows(data.userListResult); 
    } catch (error) {
      console.error('Error fetching user list:', error);
    }finally{
      setRowsLoading(false)
      
    }
  };

  //------------- first fetch API UP -----------------------------




  const columnsNamesMainList = [
    { key: 'account', label: 'účet (email)', sorting: true },
    { key: 'name', label: 'Jméno', sorting: true },
    { key: 'last_name', label: 'Příjmení', sorting: true },
    { key: 'clearance', label: 'Oprávnění', sorting: true },
    { key: 'verification_token_expire', label: 'Platnost ověření registrace', sorting: false },
    { key: 'locked', label: 'Blokovaný účet', sorting: false },
    { label: '', id:'delLabel', sorting: false },
  ];

//-------------DELETE API down   ------------------------------------



  const handleDel = async (account) => {
    let confirmDel = confirm(`opravdu chcete smazat účet ${account} ?`)
    if(!confirmDel){
      return;
    }
    setDisabled(true)
    try{
      const response = await fetch('/api/users', {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          operation: 'accountDel',
          user: account,
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
          operation: 'updateClearance',
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











  return (
    <div className="flex-grow md:border bg-white dark:bg-gray-500 dark:border-gray-400 w-full">
      <div className="flex flex-col overflow-hidden  md:flex-row">
        <div className="m-4">
          <SearchField searchField={searchField} handleChange={handleChange} />
        </div>
        <div className="m-4">
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
                  className={`bg-slate-50 dark:bg-gray-600 dark:text-white font-thin  border-[1px] border-gray-300 pl-1 ${
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
            
            {paginatedRows.map((row) => (
              <React.Fragment key={row.account}>
                <tr className="text-xs md:text-sm border-b text-start dark:bg-gray-300 dark:text-white dark:even:bg-gray-500  even:bg-gray-100 odd:bg-white  dark:hover:bg-gray hover:bg-gray-50">
                  {columnsNamesMainList.map((column) => {
                    let cellContent;
                    if (column.id === 'delLabel') {
                      cellContent = (
                        <button disabled={disabled} onClick={() => handleDel(row.account)} >
                            <MdDeleteForever  className={`h-6 w-6  hover:cursor-pointer ${disabled ? 'dark:text-red-800 text-red-200' : 'text-red-500'} `}  />
                        </button>
                        
                      );
                    } else {
                      switch (column.key) {
                        case 'clearance':
                          cellContent = (
                            <select
                              value={row.clearance}
                              disabled={disabled}
                              onChange={(event) => handleSqlChange(row.account, event.target.value, 'updateClearance')}
                              className="bg-white h-8 dark:text-white dark:bg-gray-600 text-gray-800 disabled:text-gray-300  border border-gray-300 rounded"
                            >
                              <option value="visitor">Visitor</option>
                              <option value="member">Member</option>
                              <option value="editor">Editor</option>
                              <option value="admin">Admin</option>
                            </select>
                          );
                          break;
                        case 'locked':
                          cellContent = (
                            <select
                              value={row.locked ? "true" : "false"} 
                              disabled={disabled}
                              onChange={(event) => handleSqlChange(row.account, event.target.value, 'updateLocked')}
                              className="bg-white h-8 dark:bg-gray-600 text-gray-800 disabled:text-gray-300 dark:text-gray-200 border border-gray-300 rounded"
                            >
                              <option value="false">Odemčeno</option>
                              <option value="true">Zamčeno</option>
                            </select>
                          );
                          break;
                        default:
                          cellContent = row[column.key];
                          break;
                      }
                    }
                    return (
                      <td
                        key={column.label}
                        className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal"
                      >
                        {cellContent}
                      </td>
                    );
                  })}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>

      </div>

      <div className="my-10">
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
