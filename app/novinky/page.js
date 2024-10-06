'use client'

import Gallery from "@/components/gallery/gallery";

const slugGallery = [
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/1.jpg", description: 'test popisu', alt: 'obrázek k článku horolezectví' },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/2.jpg", description: 'test popisu2', alt: 'obrázek k článku horolezectví' },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/3.jpg", description: 'test popisu3', alt: 'obrázek k článku horolezectví' },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/4.jpg", description: 'test popisu4', alt: 'obrázek k článku horolezectví' },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/5.jpg", description: 'test popisu5', alt: 'obrázek k článku horolezectví' },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/6.jpg", description: 'test popisu6', alt: 'obrázek k článku horolezectví' },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/7.jpg", description: 'test popisu7', alt: 'obrázek k článku horolezectví' },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/8.jpg", description: 'test popisu8', alt: 'obrázek k článku horolezectví' },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/9.jpg", description: 'test popisu',  alt: 'obrázek k článku horolezectví' },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/10.jpg", description: 'test popisu', alt: 'obrázek k článku horolezectví' },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/11.jpg", description: 'test popisu', alt: 'obrázek k článku horolezectví' },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/12.jpg", description: 'test popisu', alt: 'obrázek k článku horolezectví' },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/13.jpg", description: 'test popisu', alt: 'obrázek k článku horolezectví' },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/14.jpg", description: 'test popisu', alt: 'obrázek k článku horolezectví' },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/15.jpg", description: 'test popisu', alt: 'obrázek k článku horolezectví' },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/16.jpg", description: 'test popisu', alt: 'obrázek k článku horolezectví' },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/17.jpg", description: 'test popisu', alt: 'obrázek k článku horolezectví' },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/18.jpg", description: 'test popisu', alt: 'obrázek k článku horolezectví' },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/19.jpg", description: 'test popisu', alt: 'obrázek k článku horolezectví' },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/20.jpg", description: 'test popisu', alt: 'obrázek k článku horolezectví' },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/21.jpg", description: 'test popisu', alt: 'obrázek k článku horolezectví' },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/22.jpg", description: null },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/23.jpg", description: null },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/24.jpg", description: null },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/25.jpg", description: null },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/26.jpg", description: null },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/27.jpg", description: null },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/28.jpg", description: null },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/29.jpg", description: null },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/30.jpg", description: null },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/31.jpg", description: null },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/32.jpg", description: null },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/33.jpg", description: null },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/34.jpg", description: null },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/35.jpg", description: null },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/36.jpg", description: null },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/37.jpg", description: null },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/38.jpg", description: null },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/39.jpg", description: null },
  { src: "https://storage.googleapis.com/khs-zlin/img-gallery/test/40.jpg", description: null }
];

export default function page() {

console.log('MYSQL_HOST:', process.env.MYSQL_HOST)
console.log('MYSQL_DATABASE:', process.env.MYSQL_DATABASE)
console.log('MYSQL_USER:', process.env.MYSQL_USER)
console.log('MYSQL_PORT:', process.env.MYSQL_PORT)
console.log('Email_user:', process.env.Email_user)
console.log('Email_pass:', process.env.Email_pass)


    return (
      
      <div className="flex w-full flex-col justify-center">
        <span className="text-2xl">Novinky</span>
        <div className="flex mx-10">
          <p className="text-start my-5">Test fotogalerie</p>
        </div>
        <div className="flex w-full">
          <Gallery slugGallery={slugGallery}/>
        </div>
      </div>
    );
  }
  