import Image from "next/image"


const partners = [
    {id: 1, alt: 'vertikon', title: 'vertikon lezecké centrum', srcLight: 'https://storage.googleapis.com/khs-zlin/sponsors/verticon_white.png', srcDark:'https://storage.googleapis.com/khs-zlin/sponsors/vertikon_dark.webp', url: 'https://www.vertikon.cz/'},
    {id: 2, alt: 'triop', title: 'triop', srcLight: 'https://storage.googleapis.com/khs-zlin/sponsors/triop_light_v2.png', srcDark:'https://storage.googleapis.com/khs-zlin/sponsors/triop_dark_v2.png', url:'https://www.triop.cz/'},
    {id: 3, alt: 'hudy', title: 'hudy', srcLight: 'https://storage.googleapis.com/khs-zlin/sponsors/hudy.svg', srcDark:'https://storage.googleapis.com/khs-zlin/sponsors/hudy.svg', url: 'https://www.hudy.cz/'},
    {id: 4, alt: 'restday', title: 'restday lezečky', srcLight: 'https://storage.googleapis.com/khs-zlin/sponsors/restday.png', srcDark:'https://storage.googleapis.com/khs-zlin/sponsors/restday.png', url: 'https://restday.cz/'},
    {id: 5, alt: 'decathlon', title: 'decathlon', srcLight: 'https://storage.googleapis.com/khs-zlin/sponsors/decathlon.jpg', srcDark:'https://storage.googleapis.com/khs-zlin/sponsors/decathlon.jpg', url: 'https://www.decathlon.cz/'},
    {id: 6, alt: 'server mechanics', title: 'server mechanics - it consultants', srcLight: 'https://storage.googleapis.com/khs-zlin/sponsors/server_mechanics_light.png', srcDark:'https://storage.googleapis.com/khs-zlin/sponsors/server_mechanics_dark_V3.png', url: 'https://www.servermechanics.cz/'},
    {id: 7, alt: 'lual lunga', title: 'lual lunga s.r.o. přesné obrábění', srcLight: 'https://storage.googleapis.com/khs-zlin/sponsors/lual_light.png', srcDark:'https://storage.googleapis.com/khs-zlin/sponsors/lual_dark.png', url: 'https://www.lual.cz/'},
    {id: 8, alt: 'vwl', title: 'vwl', srcLight: 'https://storage.googleapis.com/khs-zlin/sponsors/vlw.png', srcDark:'https://storage.googleapis.com/khs-zlin/sponsors/vlw.png', url: 'http://www.vlw.cz/'},
    {id: 9, alt: 'dinel', title: 'dinel', srcLight: 'https://storage.googleapis.com/khs-zlin/sponsors/dinel.png', srcDark:'https://storage.googleapis.com/khs-zlin/sponsors/dinel.png', url: 'https://www.dinel.cz/'},
    {id: 10, alt: 'saltic', title: 'saltic', srcLight: 'https://storage.googleapis.com/khs-zlin/sponsors/saltic.png', srcDark:'https://storage.googleapis.com/khs-zlin/sponsors/saltic.png', url: 'https://saltic.cz/'},
    {id: 11, alt: 'sherwin-williams', title: 'sherwin-williams', srcLight: 'https://storage.googleapis.com/khs-zlin/sponsors/sherwin.png', srcDark:'https://storage.googleapis.com/khs-zlin/sponsors/sherwin.png', url: 'https://www.sherwin-williams.com/'},
    {id: 12, alt: 'moutain squat', title: 'moutain squat', srcLight: 'https://storage.googleapis.com/khs-zlin/sponsors/moutain-squat_light.jpg', srcDark:'https://storage.googleapis.com/khs-zlin/sponsors/moutain-squat_dark.jpg', url: 'https://www.facebook.com/p/Mountain-squat-61552162854518/'},
]


export default function LogoCloudSponsors () {
    return (

    <div className="flex w-full my-5  flex-col flex-grow max-w-screen-xl px-4 sm:px-6 md:px-8 lg:px-4 justify-center items-center mx-auto">
        <div className='flex-grow max-w-screen-xl text-2xl my-10 dark:text-gray-200  font-bold px-4 sm:px-6 md:px-8 lg:px-4 justify-center items-center mx-auto'>
            Partneři
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mt-5 items-center" >
            {partners.map((partner) =>{

                
                return(
                    <a href={partner.url} key={partner.id} >
                    <div  className=" relative max-h-[200px] self-center max-w-[200px]  p-2 flex" >
                        <div>
                            <Image
                            width={300}
                            height={300}
                            alt={partner.alt}
                            title={partner.title}

                            src={partner.srcLight}
                            className="max-h-[180px] self-center  dark:hidden block"
                            />
                            <Image
                            width={300}
                            height={300}
                            alt={partner.alt}
                            title={partner.title}

                            src={partner.srcDark}
                            className="max-h-[180px] self-center  dark:block hidden"
                            />
                        </div>
                        </div>

                    </a>
                )})}
        </div>
    </div>
)}