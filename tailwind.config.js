/** @type {import('tailwindcss').Config} */
export const content = [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const darkMode = 'class';
export const plugins = [
  require('tailwind-scrollbar'),
  require('@tailwindcss/typography'),
];
