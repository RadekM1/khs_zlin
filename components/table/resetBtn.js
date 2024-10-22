'use client'


import * as React from 'react';

export default function ResetBtn({ handleReset }) {
  return (
      <button 
      onClick={handleReset}
      className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded dark:bg-orange-700 bg-orange-50 px-5 text-sm font-medium tracking-wide text-orange-500 dark:text-white shadow-md shadow-orange-100 dark:shadow-none transition duration-300 hover:bg-orange-100 dark:hover:bg-orage-800 hover:text-orange-900 dark:hover:text-gray-200 hover:shadow-md dark:hover:shadow-none hover:shadow-orange-100     disabled:cursor-not-allowed disabled:border-orange-100 dark:disabled:border-orange-800 disabled:bg-orange-100 dark:disabled:bg-orange-600 disabled:shadow-none">
        <span>Resetovat filtr</span>
      </button>
  );
}
