'use client'

import { useTheme } from 'next-themes'
import { IoSunnySharp } from "react-icons/io5";
import { useState, useEffect } from 'react';
import { MdDarkMode } from "react-icons/md";

export default function ThemeToggle () {

  const { resolvedTheme, setTheme } = useTheme()
  const [themeIcon, setThemeIcon] = useState(null)

  useEffect(() => {
    setThemeIcon(resolvedTheme);
  }, [resolvedTheme]);



    return (

    <button
      onClick={() => {
        setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
        setThemeIcon(resolvedTheme)
      }}
    >
      {themeIcon === 'light' && <MdDarkMode className='text-gray-800 w-8 h-8'/>}
      {themeIcon === 'dark' && <IoSunnySharp className='text-white   w-8 h-8 '/>}
    </button>
  )
}

