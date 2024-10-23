
import pool from "@/lib/pool";
import executeQuery from "@/lib/db";
import Image from "next/image"; 
import Heart from "@/components/blog/heart";
import Gallery from "@/components/gallery/gallery";
import { GiNewspaper } from "react-icons/gi";
import SessionCover from "./sessionCover";



export const revalidate = 3600; 


export default async function page ({params}) {

    const article = params.clanek

    let rows = [];

const sqlConnection = await pool.connect();
try {
  const result = await executeQuery({
    sqlConnection,
    query:
     `SELECT a.title, a.clanek, a.created_time, a.thumbnail, a.article_img_gallery, a.category, a.nickname, u.avatar
      FROM articles a
      JOIN users u
      ON a.user_email = u.account
     WHERE slug = $1`,
     values: [article]
  });

  rows = result.rows.map(row => ({
    ...row,
    created_time: new Date(row.created_time).toLocaleDateString('cs-CZ') 
  }));


} catch (error) {
  console.error('Chyba při načítání novinek:', error.message);
} finally {
  sqlConnection.release();
}

if(rows.length === 0) {
  return <div>Novinka nenalezena</div>
}


let category

switch(rows[0].category){
  case 'skaly' : {category =  'skály' ; break;} 
  case 'hory' : {category = 'hory' ; break  ;} 
  case 'oddil' : {category = 'oddíl' ; break;} 
  case 'ostatni' : {category = 'ostatní'; break;} 
  default: break ;
}



    return (
        <div className="flex flex-col mx-1 md:mx-3 min-h-screen items-center text-center lg:mx-10 ">
          <div className="flex flex-row mb-4 justify-start items-cebter border-b-[1px] border-b-gray-300 dark:border-b-gray-700 ">
            <div className="items-center">
              <GiNewspaper className="text-gray-500 w-8 h-8 mr-3 dark:text-gray-200" />
            </div>
            <div className="text-2xl text-gray-500 dark:text-gray-200">
            {rows[0].title}
            </div>
          </div>
          <div className="flex flex-row w-full">


            <div className="flex flex-col text-start flex-grow  mb-4">

              <div className="text-gray-500 text-xs md:text-sm ">
                <div className="flex-row flex">
                  <div className="mr-2">
                    <Image
                      width={30}
                      height={30}
                      alt={`avatar uživatele`}
                      src={rows[0].avatar}
                      className="inline-block dark:ring-[#1E1E1E] h-6 w-6 self-center object-fill rounded-full ring-2 ring-white"
                    />
                  </div>
                  <div>
                    {rows[0].nickname}
                  </div>
                </div>
                
              </div>
              <div className="text-gray-500 text-xs md:text-sm "> 
                Datum: {rows[0].created_time}
              </div>
              <div className="text-gray-500 text-xs md:text-sm ">
                kategorie: {category}
              </div>
            </div>
          </div>
          <div>
          </div>
          <div className="w-full dark:bg-[#1E1E1E] bg-gray-50 pl-2 py-1 border-b-[1px] mb-4 pb-4 border-b-gray-300 dark:border-b-gray-700">
            <div className="text-start mr-10 border-b-[1px] mb-4 pb-4 border-b-gray-300 dark:border-b-gray-700 " dangerouslySetInnerHTML={{ __html: rows[0].clanek }} ></div>
            <Gallery await dataIn={rows[0].article_img_gallery} />
          </div>
          <div>
            <SessionCover article={article} />
          </div>
          
        </div>
        
  

    )
}