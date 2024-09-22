


const partners = [
    {id: 1, alt: '', title: '', src: '', url: ''},
    {id: 2, alt: '', title: '', src: '', url:''},
    {id: 3, alt: '', title: '', src:'', url: ''},
    {id: 4, alt: '', title: '', src: '', url: ''},
    {id: 5, alt: '', title: '', src: '', url: ''},
    {id: 6, alt: '', title: '', src: '', url: ''},
    {id: 7, alt: '', title: '', src: '', url: ''},
    {id: 8, alt: '', title: '', src: '', url: ''},
    {id: 9, alt: '', title: '', src: '', url: ''},
    {id: 10, alt: '', title: '', src: '', url: ''},
    {id: 11, alt: '', title: '', src: '', url: ''},
    {id: 12, alt: '', title: '', src: '', url: ''},
]


export default function LogoCloudSponsors () {
    return (

    <div className="flex w-full my-5  flex-col flex-grow max-w-screen-xl px-4 sm:px-6 md:px-8 lg:px-4 justify-center items-center mx-auto">
        <div className='flex-grow max-w-screen-xl text-white bg-[#151515] text-2xl my-5  font-bold px-4 sm:px-6 md:px-8 lg:px-4 justify-center items-center mx-auto'>
            Jsme členy těchto organizací
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-5 justify-center self-center" >
            {partners.map((partner) =>{
                return(
                    <a href={partner.url} key={partner.id} >
                    <div  className="  max-h-[200px] max-w-[200px] p-2 self-center justify-center flex" >
                        <img
                        width={300}
                        height={300}
                        alt={partner.alt}
                        title={partner.title}
                        lazy
                        src={partner.src}
                        />
                    </div>
                    </a>
                )})}
        </div>
    </div>
)}