
import pool from "@/lib/pool";
import executeQuery from "@/lib/db";
import Image from "next/image"; 
import Heart from "@/components/blog/heart";
import Gallery from "@/components/gallery/gallery";

export const revalidate = 3600; 


export default async function page ({params}) {

    const article = params.clanek

    let rows = [];

const sqlConnection = await pool.connect();
try {
  const result = await executeQuery({
    sqlConnection,
    query:
     `SELECT title, clanek, created_time, thumbnail, article_img_gallery, category, nickname from articles WHERE slug = $1`,
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

    return (
        <div className="flex flex-col mx-1 md:mx-3 min-h-screen lg:mx-10 items-start">
          <div>Titulek : {rows[0].title}</div>
          <div>Vytvořil: {rows[0].nickname}</div>
          <div>Datum: {rows[0].created_time}</div>
          <div className="w-1/3 self-start max-w-[200px]  py-1 dark:bg-[#1E1E1E] bg-white pl-2">
            <Image
              src={rows[0].thumbnail}
              alt={rows[0].title}
              className="rounded max-h-[100px] md:max-h-[150px] w-auto object-cover flex self-start "
              width={250}
              height={100}
            />
          </div>
          <div>kategorie: {rows[0].category}</div>

          <div className="text-start" dangerouslySetInnerHTML={{ __html: rows[0].clanek }} ></div>
          <Gallery await dataIn={rows[0].article_img_gallery} />
        </div>

    )
}