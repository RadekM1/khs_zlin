import { MdRssFeed } from "react-icons/md";
import pool from "@/lib/pool";
import executeQuery from "@/lib/db";
import Share from "@/components/blog/share";

export const revalidate = 3600; 

export default async function page ({params}) {

    const slugNovinka = params.novinka

  

    let rows = [];

const sqlConnection = await pool.connect();
try {
  const result = await executeQuery({
    sqlConnection,
    query:
     `SELECT title, clanek, created_time FROM news_feed WHERE id = $1`,
     values: [slugNovinka]
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


    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className=" flex-shrink flex flex-row justify-center">
                <div className="border-b-[1px] flex-row flex mb-8 border-b-gray-300 dark:border-b-gray-700">
                    <div className="mb-1">
                        <MdRssFeed className="text-gray-600 w-8 h-8 mr-3 dark:text-gray-200" />
                    </div>
                    <div>
                        <span className="text-2xl text-gray-800 dark:text-gray-200   ">{rows[0].title}</span>
                    </div>
                </div>

            </div>
        
        <div className="flex flex-col  justify-center">
            <div className="flex flex-col border-b-[1px] mb-4 border-gray-200 dark:border-gray-800 mx-10 justify-center">
              <div>
                <span>vytvořeno: {rows[0].created_time}</span>
              </div>
              <div>
                <Share share={`/novinky/${slugNovinka}`} title={rows[0].title} />
              </div>
                
            </div>
            <div className="flex text-start mx-2 md:mx-4 lg:mx-16 text-gray-800 ">
            <div className="break-words break-all" dangerouslySetInnerHTML={{ __html: rows[0].clanek }} />
            </div>


        
        </div>
      </div>
    )
}