'use client'

import { useSearchParams, usePathname } from "next/navigation";
import BlogCard from "./blog/blogCard";
import { useState, useEffect } from "react";
import SearchField from "@/components/table/searchField"
import ResetBtn from "@/components/table/resetBtn";
import Pagination from '@mui/material/Pagination';
import {handleChangePaginat} from "@/lib/functions/handleChangePaginat";
import CheckBox from "./checkbox";

export default function ArticleList ({importedRows}) {

    const [rows, setRows] = useState(importedRows)
    const [searchField, setSearchField] = useState('')
    const [filteredRows, setFilteredRows] = useState(rows)
    const [currentPage, setCurrentPage] = useState(1)

    let path = usePathname();
    const searchParams = useSearchParams();
    const currentFilter = searchParams.get('filter');

    const rowsPerPage = 5

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

    const startIndex = (currentPage - 1) * rowsPerPage
    const paginatedRows = filteredRows.slice(startIndex, startIndex + rowsPerPage)

    const handleCheckbox = () =>{
        console.log('checkbox fire')
    }


    return (
    <div className="flex  flex-col lg:flex-row-reverse">
        <div className="flex-col  flex flex-shrink h-min lg:my-10 py-2 lg:py-10 px-5 md:m-2 flex-wrap transition-shadow duration-300 hover:shadow-lg hover:shadow-gray-400 dark:hover:shadow-gray-800  dark:border-gray-600 border-gray-200 border dark:bg-[#1E1E1E] bg-white rounded shadow-lg">
            <span className="text-orange-500">Prohledat články</span>
            <div className="flex-row w-[300px]">
                <div className="mb-4">
                    <SearchField searchField={searchField} handleChange={handleChange}/>
                </div>
                <div className="mb-4">
                    <ResetBtn handleReset={HandleReset} />
                </div>
            </div>
            <div className="flex-row mb-2">
            <span className="text-orange-500">Filtr článků dle témat</span>
                <div className="mb-2">
                    <CheckBox  label='Hory'  handleChange={handleCheckbox} />
                </div>
                <div className="mb-2">
                    <CheckBox  label='Skály'  handleChange={handleCheckbox} />
                </div>                
                <div className="mb-2">
                    <CheckBox  label='Oddíl'  handleChange={handleCheckbox} />
                </div>                
                <div className="mb-2">
                    <CheckBox  label='Ostatní'  handleChange={handleCheckbox} />
                </div>

            </div>
        </div>
        <div className="flex flex-grow flex-col">
        <div className="w-full  flex justify-center flex-col text-center">
            {paginatedRows.map((item) =>{
                return(
                        <BlogCard key={item.slug} data = {item} />
                )
            })}
        </div>
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


    </div>
    
    )
}