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
import SpinnerSmallOrange from "../spinners/spinnerSmallOrange";


export default function ArticleTable({setTitle, setThumbnail, setGallery, setCategory, setIdToEdit,  setEditActive, setEditorContent, setOpen}) {

  

  const [rows, setRows] = useState([])
  const [sortingColumn, setsortingColumn] = useState(null)
  const [sortingOrder, setSortingOrder] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchField, setSearchField] = useState('')
  const [filteredRows, setFilteredRows] = useState(rows)
  const [rowsLoading, setRowsLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)



  const HandleReset = () => {
    setSearchField('');
    setFilteredRows(rows);
  };

//------------- fetch API down -----------------------------


  useEffect(() => {
    fetchData();
  }, []);



  const fetchData = async () => {
    setRowsLoading(true)
    try {
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ operation: 'articleList' })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch article list');
      }

      const data = await response.json();

      setRows(data.articleListResult); 
    } catch (error) {
      console.error('Error fetching article list:', error);
    }finally{
      setRowsLoading(false)
      
    }
  };

  //------------- fetch API UP -----------------------------




  const columnsNamesMainList = [
    { key: 'title', label: 'Titulek', sorting: true },
    { key: 'user_email', label: 'Účet', sorting: true },
    { key: 'category', label: 'Kategorie', sorting: true },
    { key: 'nickname', label: 'Jméno', sorting: true },
    { label: 'del', id:'delLabel', sorting: false },
    { label: 'edit', id:'editLabel', sorting: false },
  ];

//-------------DELETE API down   ------------------------------------



  const handleDel = async (id) => {

    let confirmDel = confirm(`opravdu chcete smazat článek ?`)
    if(!confirmDel){
      return;
    }
    setDisabled(true)
    setLoading(true)
    try{
      const response = await fetch('/api/articles', {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          operation: 'articleDel',
          articleId: id,
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
      setLoading(false)
    }
  };


//-------------DELETE API UP   --------------------------------------






  const rowsPerPage = 10;

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

  const handleArticlePropsEdit = (idArticleToEdit) =>{
    let tempId = idArticleToEdit
    let tempRow = rows.find(row => row.article_id === tempId)
    setTitle(tempRow.title)
    setEditorContent(tempRow.clanek)
    setThumbnail(tempRow.thumbnail)
    setGallery(tempRow.article_img_gallery)
    setCategory(tempRow.category)
    setEditActive(true)
    setOpen(false)
    setIdToEdit(tempId)
  } 

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
              <React.Fragment key={row.article_id}>
                <tr className="text-xs md:text-sm border-b text-start dark:bg-gray-300 dark:text-white dark:even:bg-gray-200 even:bg-zinc-100 odd:bg-white dark:hover:bg-gray hover:bg-gray-50">
                  
          
                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                    {row.title}
                  </td>

                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                    {row.user_email}
                  </td>
                  
                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                    {row.category}
                  </td>
                  
       
                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                    {row.nickname}
                  </td>
                  
                
                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                    {!loading ?
                    <button disabled={disabled} onClick={() => handleDel(row.article_id)}>
                      <MdDeleteForever
                        className={`h-7 w-7 hover:cursor-pointer ${
                          disabled ? 'dark:text-red-800 text-red-200' : 'text-red-500'
                        }`}
                      />
                    </button>
                    :
                    <SpinnerSmallOrange />
                    }
                  </td>
                  
            
                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                    <button disabled={disabled} onClick={() => handleArticlePropsEdit(row.article_id)}>
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
          <span className="text-gray-600 dark:text-white items-center text-sm mt-4 m-2 md:mr-6"> položek: {filteredRows.length} </span>
        </div>
      </div>

    </div>
  );
}
