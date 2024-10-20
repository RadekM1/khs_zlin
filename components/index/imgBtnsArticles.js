import ImgBtnArticles from "./imgBtnArticles";
import Link from "next/link";


const images = [
    {
        id: 1,
        img: 'https://storage.googleapis.com/khs-zlin/picture_btn/horolezectvi.png',
        title: 'HOROLEZECTVÍ',
        url: '/clanky?filter=horolezectvi'
    },
    {   
        id: 2,
        img: 'https://storage.googleapis.com/khs-zlin/picture_btn/skalni_lezeni.jpg',
        title: 'SKÁLY',
        url: '/clanky?filter=skaly'
    },
    {
        id: 3,
        img: 'https://storage.googleapis.com/khs-zlin/picture_btn/oddil.jpeg',
        title: 'ODDÍL',
        url: '/clanky?filter=oddil'
    },
    {   
        id: 4,
        img: 'https://storage.googleapis.com/khs-zlin/blog/blog4.jpg',
        title: 'OSTATNÍ',
        url: '/clanky?filter=ostatni'
      }
  ];
export default function ImgBtnsArticles () {

    return (

            <div className="grid grid-cols-2 mt-10 md:mt-5 m-10 justify-between lg:grid-cols-4 w-full gap-4" >
                    {images.map((image)=>{
                        return(
                            <Link key={image.id} href={image.url} passHref>
                                <ImgBtnArticles data={image} />
                            </Link>   
                        )
                    })}
            </div>

    )
}