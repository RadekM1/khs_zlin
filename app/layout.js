import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { Roboto } from 'next/font/google';
import Providers from "./providers";
import Image from "next/image";
import Footer from '@/components/footer';



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
                {children}
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
