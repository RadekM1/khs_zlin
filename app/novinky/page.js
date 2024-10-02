'use client'

import Gallery from "@/components/gallery/gallery";


export default function page() {


    return (
      
      <div className="flex w-full flex-col justify-center">
        <span className="text-2xl">Novinky</span>
        <div className="flex mx-10">
          <p className="text-start my-5">Test fotogalerie</p>
        </div>
        <div className="flex w-full">
          <Gallery/>
        </div>
      </div>
    );
  }
  