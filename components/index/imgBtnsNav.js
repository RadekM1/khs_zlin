import ImgBtnNav from "./imgBtnNav";
import Link from "next/link";


const images = [
    {   
        id: 1,
        img: 'https://storage.googleapis.com/khs-zlin/horoskola_main.jpg',
        title: 'Kurzy',
        url: '/kurzy'
    },
    {
        id: 2,
        img: 'https://storage.googleapis.com/khs-zlin/horokrouzek.jpg',
        title: 'Výhody členství',
        url: '/clenstvi-v-oddile/vyhody-clenstvi'
    },
    {
        id: 3,
        img: 'https://storage.googleapis.com/khs-zlin/for_members.jpg',
        title: 'Pro členy',
        url: '/clenstvi-v-oddile'
    },
    {
        id: 4,
        img: 'https://storage.googleapis.com/khs-zlin/about_us.jpg',
        title: 'O nás',
        url: '/o-nas'
    },
  ];
export default function ImgBtnsNav () {

    return (

            <div className="grid grid-cols-1 mt-10 pt-10 md:mt-5 m-10 justify-between md:grid-cols-4 w-full gap-3" >
                    {images.map((image)=>{
                        return(
                            <Link key={image.id} href={image.url} passHref>
                                <ImgBtnNav data={image} />
                            </Link>   
                        )
                    })}
            </div>

    )
}