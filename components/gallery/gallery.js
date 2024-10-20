'use client'

import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Image from "next/image";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

export default function Gallery({dataIn}) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);  

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const slides = dataIn.map((slide) => ({
    src: slide.file, // Převod "file" na "src", což Lightbox očekává
    title: slide.title, // Pokud je titulek, můžeš ho přiřadit zde
    description: slide.description, // Přiřadit popis, pokud je k dispozici
  }));


  return (
    <>
      <div className="flex flex-row flex-wrap ">
        {dataIn.map((slide, index) => (
       
          <Image
            key={index}
            onClick={() => handleThumbnailClick(index)}
            src={slide.file}
            
            title={slide.title}  
            width={400}
            height={400}
            alt={`Thumbnail ${index + 1}`}
            className="w-1/2 md:w-1/4 h-100 p-2 object-cover rounded-xl cursor-pointer"
          />
        ))}
      </div>  
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={currentIndex}
        plugins={[Thumbnails , Fullscreen, Zoom, Captions]}
        zoom={{ maxZoomLevel: 3, zoomLevel, setZoomLevel }} 
        captions={{description: dataIn.description,
          descriptionTextAlign: 'center'
        }}
      />
      <button
        className="hidden"
        type="button"
        onClick={() => setZoomLevel((prevZoom) => Math.min(prevZoom + 0.5, 3))}
      >
        Zoom In
      </button>
      <button
      className="hidden"
        type="button"
        onClick={() => setZoomLevel((prevZoom) => Math.max(prevZoom - 0.5, 1))}
      >
        Zoom Out
      </button>
    </>
  );
}
