'use client';

import React, { useEffect, useState, useRef } from "react";
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
import SpinnerSmallOrange from "../spinners/spinnerSmallOrange";


export default function BooksTable() {

  
  const fileInputRef = useRef(null);
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
  const [name, setName] = useState('')
  const [creator, setCreator] = useState('')
  const [onStock, setOnStock] = useState(false)
  const [whoRented, setWhoRented] = useState('')
  const [release, setRelease] = useState('')
  const [pictureUrl, setPictureUrl] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null);
  const [imgNameToSql, setImgNameToSql] = useState('')
  const [imgNameToGoogle, setImgNameToGoogle] = useState('')
  const [nextHighestId, setNextHighestId] = useState('')

//------------- fetch API down -----------------------------


  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    setRowsLoading(true)
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ operation: 'booksList' })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch books list');
      }

      const data = await response.json();

      const nextDatabaseId = Math.max(...data.books.map(row => row.id)) + 1;
      setNextHighestId(nextDatabaseId)

 
      setRows(data.books); 
    } catch (error) {
      console.error('Error fetching user list:', error);
    }finally{
      setRowsLoading(false)
      
    }
  };

  //------------- fetch API UP -----------------------------



  const columnsNamesMainList = [
    { key: 'id', label: 'kod', sorting: true },
    { key: 'name', label: 'Název', sorting: true },
    { key: 'creator', label: 'Autor', sorting: true },
    { key: 'on_stock', label: 'Skladem', sorting: true },
    { key: 'whoRented', label: 'Zapůjčil', sorting: true },
    { key: 'release', label: 'Rok vydání', sorting: true },
    { key: 'picture_url', label: 'Fotka', sorting: false },
    { key: 'description', label: 'Popis', sorting: true },
    { label: 'del', id:'delLabel', sorting: false },
    { label: 'edit', id:'editLabel', sorting: false },
  ];

//-------------DELETE API down   ------------------------------------


  const handleDel = async (id) => {
    
    let confirmDel = confirm(`opravdu chcete smazat knihu č. ${id} ?`)
    if(!confirmDel){
      return;
    }
    setDisabled(true)
    setLoading(true)
    try{
      const response = await fetch('/api/books', {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          operation: 'bookDel',
          bookId: id,
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





//-------------CHANGE API down   ------------------------------------




  const handleSqlProductChange = async () => {
    setDisabled(true)
    setLoading(true)
    if(name.length <= 1){
      alert("není zadán název knihy")
      return
    }

    if(selectedFile){
      await handleFileChange(selectedFile, imgNameToGoogle)
    }


    try{
      const response = await fetch('/api/books', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          bookId: idToEdit,
          name: name,
          creator: creator,
          onStock: onStock,
          whoRented: whoRented,
          release: release, 
          pictureUrl: imgNameToSql,
          description: description,
          operation: 'bookUpdate'
        })
      });
      console.log(response)
      if(!response.ok){
        console.log(response.error)
        return;
      }
      setEditActive(false)
      fetchData();
      handleResetForm();
      console.log(response)
    } catch (error) {
      console.log(error)
    }finally{
    setDisabled(false)
    
    setLoading(false)
    }
  };
  

  //-------------CHANGE API up   ------------------------------------
  

  //-------------ADD API down   ------------------------------------

  const handleAdd = async () => {
    if(name.length <= 1){
      alert("není zadán název knihy")
      return
    }

    if(selectedFile){
      await handleFileChange(selectedFile, imgNameToGoogle)
    }

    setDisabled(true)
    setLoading(true)
    try{
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: name,
          creator: creator,
          onStock: onStock,
          whoRented: whoRented,
          release: release, 
          pictureUrl: imgNameToSql,
          description: description,
          operation: 'bookAdd'
        })
      });
      console.log(response.message)
      if(!response.ok){
        console.log(response.error)
        return;
      }
      setEditActive(false)
      fetchData();
      handleResetForm();
      console.log(response)
    } catch (error) {
      console.log(error)
    }finally{
    setDisabled(false)
    
    setLoading(false)
    }
  };






    //-------------ADD API up   ------------------------------------

  const rowsPerPage = 20;

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
      case 'name' : {setName(tempE)};break;
      case 'creator' : {setCreator(tempE)};break;
      case 'onStock' : {setOnStock(tempE)};break;
      case 'whoRented' : {setWhoRented(tempE)};break;
      case 'release' : {setRelease(tempE)};break;
      case 'pictureUrl' : {setPictureUrl(tempE)};break;
      case 'description' : {setDescription(tempE)};break;
      default: break;
    }
  }

    
  const handleProductEdit = (rowId) =>{
    let tempId = rowId;
    let row = rows.find(row => tempId === row.id);
    let RepairedUrl = row.picture_url === null ? '' : row.picture_url
    let whoRentedRepaired = row.member_rented === null ? '' : row.member_rented


    setEditActive(true)
    setIdToEdit(row.id)
    setName(row.name)
    setCreator(row.creator)
    setOnStock(row.on_stock)
    setPictureUrl(RepairedUrl)
    setRelease(row.release)
    setWhoRented(whoRentedRepaired) 
    setDescription(row.description)
  }

  const handleResetForm = () => {
    setIdToEdit('');
    setName('')
    setCreator('')
    setOnStock(false)
    setWhoRented('')
    setDescription('')
    setRelease('')
    setPictureUrl('')
    setSelectedFile(null);
    fileInputRef.current.value = ""
  }

  useEffect(()=>{
    let bookName = ''
    let googleBookName = ''
    if(editActive === true) {
      bookName = `https://storage.googleapis.com/khs-zlin/books/book-${idToEdit}.png`
      googleBookName = `book-${idToEdit}.png`
    } else {
      bookName = `https://storage.googleapis.com/khs-zlin/books/book-${nextHighestId}.png`
      googleBookName = `book-${nextHighestId}.png`
    }
    
    setImgNameToSql(bookName)
    setImgNameToGoogle(googleBookName)

  }, [editActive, idToEdit, nextHighestId])

  useEffect(() => {

  }, [imgNameToSql, imgNameToGoogle]);

  const handleFileChange = async (file) => {
    const response = await fetch(`/api/book-img-upload?file=${imgNameToGoogle}`, {
      method: 'GET',
    });
  
    const data = await response.json();
  
    if (response.ok && data.url) {
 
      const uploadResponse = await fetch(data.url, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type, 
        },
        body: file,
      });


  
      if (uploadResponse.ok) {
        console.log('Soubor byl úspěšně nahrán');
        setPictureUrl(data.url); 
      } else {
        console.error('Nahrání souboru selhalo', uploadResponse);
      }
    } else {
      console.error('Získání podpisovaného URL selhalo:', data.error);
    }
  };
  


  return (
    <div className="flex-grow bg-white dark:bg-zinc-400 dark:border-gray-400 w-full">
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
              onChange={(event) => handleProductChange(event.target.value, 'name')}
              value={name}
              disabled={disabled}
            />
          </td>

      
          <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
          <input
              type="text"
              placeholder="Zadejte název"
              className="w-full min-w-32 h-8 border rounded dark:bg-zinc-100"
              onChange={(event) => handleProductChange(event.target.value, 'creator')}
              value={creator}
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
          
          <td className="py-2 md:mx-2 md:px-2 border-[1px]  text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
            <input
              type="text"
              placeholder="Zadejte název"
              className="w-full min-w-32 h-8 border rounded dark:bg-zinc-100"
              onChange={(event) => handleProductChange(event.target.value, 'whoRented')}
              value={whoRented}
              disabled={disabled}
            />
          </td>
          <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
            <input
              type="text"
              className="w-full min-w-24 h-8 px-1 border dark:bg-zinc-100 rounded"
              onChange={(event) => handleProductChange(event.target.value, 'release')}
              value={release}
              disabled={disabled}
            />
          </td>

              
          <td className="py-2 md:mx-2 md:px-2 flex-col  text-gray-800 text-xs md:text-sm max-w whitespace-normal">
          <div className="relative w-full">
            <svg xmlns="http://www.w3.org/2000/svg" aria-label="File input icon" role="graphics-symbol" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="absolute w-5 h-5 left-4 top-3 stroke-slate-400 text-slate-400 peer-disabled:cursor-not-allowed">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
            <input
              type="file"
              ref={fileInputRef}
              className="peer relative min-w-[180px] h-10 w-full rounded border border-slate-200 px-4 py-2.5 pl-12 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-amber-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 [&::file-selector-button]:hidden"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              disabled={disabled}
            />
          </div>


            
          </td>
          <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
            <input
              type="text"
              className="w-full min-w-24 h-20 px-1 border dark:bg-zinc-100 rounded"
              onChange={(event) => handleProductChange(event.target.value, 'description')}
              value={description}
              disabled={disabled}
            />
          </td>

          {!editActive && 
          <td colSpan={2} className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
            
            <button 
            onClick={()=>handleAdd()}
            className="inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-green-500 hover:bg-green-600 focus:bg-green-700 disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300 disabled:shadow-none"
            disabled={disabled}
            >
              {!loading ? 
              <span>Přidat</span>
              :
              <SpinnerSmallOrange />
            }
              
            </button>
          </td>
          }

          {editActive && 
          <>
            <td  className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
            {!loading ?
            <button 
              className="inline-flex items-center justify-center h-8 gap-2 px-4 text-xs font-medium tracking-wide text-white transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-green-500 hover:bg-green-600 focus:bg-green-700 disabled:cursor-not-allowed disabled:border-green-300 disabled:bg-green-300 disabled:shadow-none"
              disabled={disabled}
              onClick={()=>{handleSqlProductChange()}}
            >
              <span>OK</span>
            </button> : <SpinnerSmallOrange /> }
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
                  
          
                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                    {row.id}
                  </td>
       
                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                    {row.name}
                  </td>
  
                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                    {row.creator}
                  </td>
                  
            
                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                    {row.on_stock ? (
                      <FaThumbsUp className="h-5 w-5 text-green-700" />
                    ) : (
                      <FaThumbsDown className="h-5 w-5 text-red-700" />
                    )}
                  </td>
         
                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                  {row.member_rented}

                  </td>
             
                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                    {row.release}
                  </td>

                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">

                  <div className="relative w-full h-full"> 
                    {row.picture_url && 
                    <img
                    alt=""
                    src={row.picture_url}
                    className="object-cover rounded "
                  />
                    
                    }
                  </div>
                  </td>

                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                    {row.description}
                  </td>
                  <td className="py-2 md:mx-2 md:px-2 border-[1px] text-gray-800 text-xs md:text-sm max-w border-gray-300 whitespace-normal">
                    {!loading ?
                    <button disabled={disabled} onClick={() => handleDel(row.id)}>
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
