'use client'

import { useSearchParams, usePathname } from "next/navigation";
import BlogCard from "./blog/blogCard";
import { useState, useEffect } from "react";
import SearchField from "@/components/table/searchField";
import ResetBtn from "@/components/table/resetBtn";
import Pagination from '@mui/material/Pagination';
import { handleChangePaginat } from "@/lib/functions/handleChangePaginat";
import CheckBox from "./checkbox";


export default function ArticleList ({importedRows}) {

    const [rows, setRows] = useState(importedRows);
    const [searchField, setSearchField] = useState('');
    const [filteredRows, setFilteredRows] = useState(rows);
    const [currentPage, setCurrentPage] = useState(1);
    const [skaly, setSkaly] = useState(true);
    const [hory, setHory] = useState(true);
    const [oddil, setOddil] = useState(true);
    const [ostatni, setOstatni] = useState(true);


    const searchParams = useSearchParams();
    const currentFilter = searchParams.get('filter'); 

    const rowsPerPage = 5;

   
    useEffect(() => {
        if (currentFilter) {
            switch(currentFilter) {
                case 'skaly':
                    setSkaly(true);
                    setHory(false);
                    setOddil(false);
                    setOstatni(false);
                    break;
                case 'horolezectvi':
                    setSkaly(false);
                    setHory(true);
                    setOddil(false);
                    setOstatni(false);
                    break;
                case 'oddil':
                    setSkaly(false);
                    setHory(false);
                    setOddil(true);
                    setOstatni(false);
                    break;
                case 'ostatni':
                    setSkaly(false);
                    setHory(false);
                    setOddil(false);
                    setOstatni(true);
                    break;
                default:
                    setSkaly(true);
                    setHory(true);
                    setOddil(true);
                    setOstatni(true);
            }
        } else {
          
            setSkaly(true);
            setHory(true);
            setOddil(true);
            setOstatni(true);
        }
    }, [currentFilter]); 

    useEffect(() => {
        const filter = rows.filter((row) => { 

            let matchesCategory = false;

            if (skaly && row.category.toLowerCase().includes('skaly')) {
                matchesCategory = true;
            }

            if (hory && row.category.toLowerCase().includes('hory')) {
                matchesCategory = true;
            }

            if (oddil && row.category.toLowerCase().includes('oddil')) {
                matchesCategory = true;
            }

            if (ostatni && row.category.toLowerCase().includes('ostatni')) {
                matchesCategory = true;
            }

            let keys = Object.keys(row);
            let fulltextTrue = keys.some((key) => {
                return String(row[key]).toLowerCase().includes(String(searchField.toLowerCase()));
            });

            return matchesCategory && fulltextTrue;
        });

        setFilteredRows(filter);

        const maxPage = Math.ceil(filter.length / rowsPerPage);
        if (currentPage > maxPage) {
            setCurrentPage(1); 
        }
    }, [searchField, rows, currentPage, skaly, hory, oddil, ostatni]);

    const handleChange = (event) => {
        setSearchField(event.target.value);
    };

    const HandleReset = () => {
        setSearchField(''); 
        setFilteredRows(rows); 
    };

    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedRows = filteredRows.slice(startIndex, startIndex + rowsPerPage);

    const handleCheckbox = (checkbox) => {
        switch(checkbox) {
            case 'skaly': 
                setSkaly(!skaly); 
                break;
            case 'hory': 
                setHory(!hory); 
                break;
            case 'oddil': 
                setOddil(!oddil); 
                break;
            case 'ostatni': 
                setOstatni(!ostatni); 
                break;
        }
    };

    return (
        <div className="flex flex-col lg:flex-row-reverse">
            <div className="flex-col flex flex-shrink h-min px-5 md:m-2 flex-wrap transition-shadow duration-300 hover:shadow-lg hover:shadow-gray-400 dark:hover:shadow-gray-800 dark:border-gray-600 border-gray-200 border dark:bg-[#1E1E1E] bg-white rounded shadow-lg">
                <span className="text-orange-500 hidden lg:block my-2">Prohledat články</span>
                <div className="flex-row lg:flex-col lg:w-[300px] flex justify-center items-center">
                    <div className="mb-2 flex mx-5 lg:mx-0 justify-center items-center">
                        <SearchField searchField={searchField} handleChange={handleChange} />
                    </div>
                    <div className="mb-4 flex mx-5 lg:mx-0 my-1 justify-center items-center self-center">
                        <ResetBtn handleReset={HandleReset} />
                    </div>
                </div>
                <div className="flex-row mb-2">
                    <span className="text-orange-500">Filtr článků dle témat</span>
                    <div className="flex flex-col">
                        <div className="flex flex-row w-full flex-grow self-start items-start justify-start">
                            <div className="mb-2 self-start items-start justify-start flex flex-grow">
                                <CheckBox label='Hory' checked={hory} handleChange={() => handleCheckbox('hory')} />
                            </div>
                            <div className="mb-2 -ml-2 flex-grow self-start items-start justify-start flex">
                                <CheckBox label='Skály' checked={skaly} handleChange={() => handleCheckbox('skaly')} />
                            </div>
                        </div>
                        <div className="flex flex-row flex-grow">
                            <div className="mb-2 self-start items-start justify-start flex flex-grow">
                                <CheckBox label='Oddíl' checked={oddil} handleChange={() => handleCheckbox('oddil')} />
                            </div>
                            <div className="mb-2 flex-grow self-start items-start justify-start flex">
                                <CheckBox label='Ostatní' checked={ostatni} handleChange={() => handleCheckbox('ostatni')} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-grow flex-col">
                <div className="w-full flex justify-center flex-col text-center">
                    {paginatedRows.map((item) => (
                        <BlogCard key={item.slug} data={item} />
                    ))}
                </div>
                <div className="flex-col flex">
                    <div className="flex w-full dark:text-white  gap-3 md:justify-between mt-4 flex-col-reverse md:flex-row">
                        <Pagination 
                            count={Math.ceil(filteredRows.length / rowsPerPage)} 
                            page={currentPage}
                            color="gray"
                            id="prepinani-pagination"
                            width='120'
                            onChange={(event, value) => handleChangePaginat(event, value, setCurrentPage)} 
                            sx={{
                                '& .MuiPaginationItem-root': {
                                  color: 'gray', 
                                },
                                '& .MuiPaginationItem-root.Mui-selected': {
                                  backgroundColor: 'gray', 
                                  color: 'white',
                                },
                              }}
                        />
                    </div>
                    <div className="flex justify-end">
                        <span className="text-gray-600 items-center dark:text-white text-sm mt-4 m-2 md:mr-6"> počet článků ve filtru: {filteredRows.length} </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
