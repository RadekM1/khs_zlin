'use client'

import { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import { useRouter } from "next/navigation";
import Image from "next/image";

const slides = [
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/1.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/2.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/3.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/4.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/5.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/6.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/7.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/8.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/9.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/10.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/11.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/12.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/13.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/14.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/15.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/16.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/17.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/18.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/19.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/20.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/21.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/22.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/23.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/24.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/25.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/26.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/27.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/28.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/29.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/30.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/31.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/32.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/33.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/34.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/35.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/36.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/37.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/38.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/39.jpg" },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/40.jpg" }
];

export default function Gallery() {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

 
  useEffect(() => {
    if (open) {
      
      window.history.pushState({ lightbox: true }, "", `${router.asPath}?gallery=open`);

      const handlePopState = (event) => {
        if (event.state && event.state.lightbox) {
         
          setOpen(false);
        } else {

          setOpen(false);
  
        }
      };
      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [open, router.asPath]);

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  return (
    <>
      <div className="flex flex-row flex-wrap ">
        {slides.map((slide, index) => (
          <Image
            key={index}
            onClick={() => handleThumbnailClick(index)}
            src={slide.src}
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
        plugins={[Thumbnails, Fullscreen]}
        render={{
          slide: (props) => (
            <div className="object-contain w-auto h-100">
              <img
                src={props.slide.src}
                style={{ maxHeight: "100vh", width: "auto" }}
                alt="Fullscreen image"
              />
            </div>
          ),
        }}
      />
    </>
  );
}
