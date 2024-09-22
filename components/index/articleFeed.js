import BlogCard from "../blog/blogCard"

const blogPostsOnIndex = [
    {id: 1, title: 'Výstup na Tetnuldi (4 858m), oblast Svanetie, gruzínský Kavkaz', visited: 14, theme: 'horské lezení', created: '17.9.2024' , articlePartfBigScreen: 'Gruzie je horský ráj. Je to relativně blízko ČR, nepotřebujete vízum, je tam levně, místní lidé jsou příjemní, jídlo a pití skvělé, ale hlavně….všude jsou ... ', avatar: 'https://storage.googleapis.com/khs-zlin/avatar1.jpg', articlePartfSmallScreen: 'Gruzie je horský ráj. Je to relativně blízko ČR, nepotřebujete vízum, je tam...', image:'https://storage.googleapis.com/khs-zlin/blog/blog1.jpg', userFullName: 'Miroslav Ingr', likes: 10, url: '/' },
    {id: 2, title: 'Briancon 2023', visited: 324, theme: 'skalní lezení', created: '14.8.2024' , articlePartfBigScreen: 'Okolí francouzského městečka Briancon je lezecký ráj a pro mnohé lezce srdcovka, kam se s oblibou vrací. S místní drsnou žulou už máme své zkušenosti a možná o to víc se těšíme na letní sraz... ', avatar: 'https://storage.googleapis.com/khs-zlin/avatar3.jpg', articlePartfSmallScreen: 'Gruzie je horský ráj. Je to relativně blízko ČR, nepotřebujete vízum, je tam...', image:'https://storage.googleapis.com/khs-zlin/blog/blog2.jpg', userFullName: 'Petr Halašta', likes: 0, url: '/' },
    {id: 3, title: 'Oddílové lezení ve Švýcarsku na Furkapasse 2023 aneb Furkaplech', visited: 972, theme: 'skalní lezení', created: '12.7.2024' , articlePartfBigScreen: 'Kdo nečetl článek o první lezecké výpravě KHS do sedla Furka z r. 2011 (doporučuji přečíst) – Furka je silniční sedlo na jihu Švýcarska ve výšce 2436 m, v jehož blízkosti se nacházejí lezecké cesty na vesměs pevné a kompaktní žule. Letos se výpravy na svatého Václava zúčastnily tři dvojice ...', avatar: 'https://storage.googleapis.com/khs-zlin/avatar2.png', articlePartfSmallScreen: 'Kdo nečetl článek o první lezecké výpravě KHS do sedla Furka z r. 2011 (doporučuji přečíst) – Furka je silniční sedlo na jihu Švýcarska ...', image:'https://storage.googleapis.com/khs-zlin/blog/blog3.jpg', userFullName: 'Vladimír Náhodný', likes: 53, url: '/' }
]

export default function ArticleFeed () {
    return (
        <div className="flex flex-col justify-center text-center ">
            <div className="w-full dark:bg-[#121212] mt-5 mb-2 text-2xl flex font-bold dark:text-white text-gray-700 justify-center text-center">
                Nejnovější články
            </div>
            <div className="w-full flex justify-center flex-col text-center">
                {blogPostsOnIndex.map((item) =>{
                    return(
                            <BlogCard key={item.id} data = {item} />
                    )
                })}
                

            </div>

        </div>
    )
}