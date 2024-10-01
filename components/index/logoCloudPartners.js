import Image from "next/image"

const partners = [
    {id: 1, alt: 'UIAA', title: 'UIAA', srcLight: 'https://storage.googleapis.com/khs-zlin/partners/uiaa_repaired.svg', srcDark: 'https://storage.googleapis.com/khs-zlin/partners/uiaa_dark.png', url: 'https://www.theuiaa.org/'},
    {id: 2, alt: 'ČHS', title: 'ČHS', srcLight: 'https://storage.googleapis.com/khs-zlin/partners/chs.png', srcDark:'https://storage.googleapis.com/khs-zlin/partners/chs_dark_repair_v2.png', url:'https://www.horosvaz.cz/'},
    {id: 3, alt: 'Národní sportovní agentura', title: 'Národní sportovní agentura', srcLight:'https://storage.googleapis.com/khs-zlin/partners/nsa_light.png', srcDark: 'https://storage.googleapis.com/khs-zlin/partners/nsa_dark_v2.png', url: 'https://nsa.gov.cz/'},
    {id: 4, alt: 'Česká unie sportu', title: 'Česká unie sportu', srcLight: 'https://storage.googleapis.com/khs-zlin/partners/ceska_unie_sportu.png', srcDark:'https://storage.googleapis.com/khs-zlin/partners/ceska_unie_sportu.png', url: 'https://www.cuscz.cz/'},
    {id: 5, alt: 'Město Zlín', title: 'Město Zlín', srcLight: 'https://storage.googleapis.com/khs-zlin/partners/zlin_black.png', srcDark: 'https://storage.googleapis.com/khs-zlin/partners/zlin_dark.png', url: 'https://www.zlin.eu/'},
]


export default function LogoCloudPartners () {
    return (

    <div className="flex w-full my-24  flex-col flex-grow max-w-screen-xl px-4 sm:px-6 md:px-8 lg:px-4 justify-center items-center mx-auto">
        <div className='flex-grow max-w-screen-xl text-2xl my-5 dark:text-gray-200  font-bold px-4 sm:px-6 md:px-8 lg:px-4 justify-center items-center mx-auto'>
            Jsme členy těchto organizací
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-5 items-center" >
            {partners.map((partner) =>{

                
                return(
                    <a href={partner.url} key={partner.id} >
                    <div  className="  max-h-[150px] max-w-[150px]  p-2  justify-center flex" >
                        <div>
                            <Image
                            width={300}
                            height={300}
                            alt={partner.alt}
                            title={partner.title}

                            src={partner.srcLight}
                            className="max-h-[150px] max-w-[150px] dark:hidden block"
                            />
                            <Image
                            width={300}
                            height={300}
                            alt={partner.alt}
                            title={partner.title}

                            src={partner.srcDark}
                            className="max-h-[180px] dark:block hidden"
                            />
                        </div>
                        </div>

                    </a>
                )})}
        </div>
    </div>
)}