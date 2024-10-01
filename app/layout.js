import Navbar from "../components/navbar/Navbar";
import "./globals.css";
import { Roboto } from 'next/font/google';
import Providers from "./providers";
import Footer from '@/components/footer';
import Breadcrumbs from "@/components/breadcrumbs";


const roboto = Roboto({
  subsets: ['latin'],
  weight: '400'
});

export const metadata = {
  title: "Klub horských sportů Zlín",
  description: "khszlin.com",
  
};

export default function RootLayout({ children }) {


  return (
    <html lang="cs">
      <body className={`${roboto.className}  antialiased  `}>
        <Providers attribute="class">
          <div className="flex mx-auto flex-col bg-gray-100 dark:bg-[#121212] justify-center">
            <Navbar className='-m-8 -mx-16' style={{zIndex:20}} />
            <div className="flex w-full justify-center bg-gray-100  dark:bg-[#121212]" style={{zIndex:1}}>
                <div className="flex flex-col flex-grow max-w-screen-xl  md:px-8 lg:px-4 items-center mx-auto justify-center w-full">    
                  <Breadcrumbs />
                  {children}
                </div>
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
