import BlogCard from "../blog/blogCard"
import pool from "@/lib/pool";
import executeQuery from "@/lib/db";



export default async function ArticleFeed () {


  let rows = [];
  const sqlConnection = await pool.connect();
  try {
    const result = await executeQuery({
      sqlConnection,
      query: `
        SELECT 
          a.slug, 
          a.title, 
          a.created_time, 
          a.description, 
          a.thumbnail, 
          a.category, 
          u.account, 
          a.nickname, 
          u.avatar,
          COUNT(DISTINCT h.user_account_heart) AS hearts_count,  
          COUNT(DISTINCT c.id) AS comments_count,             
          ARRAY_AGG(DISTINCT h.user_account_heart) AS liked_by  
        FROM articles a
        JOIN users u
          ON a.user_email = u.account
        LEFT JOIN hearts h
          ON a.slug = h.article_slug_heart   
        LEFT JOIN comments c
          ON a.slug = c.article_slug         
        GROUP BY 
          a.slug, a.title, a.created_time, a.description, a.thumbnail, a.category, u.account, a.nickname, u.avatar
        ORDER BY a.created_time DESC
        LIMIT 3;
      `, next: { tags: ['articles'] }
    });
  
    rows = result.rows.map(row => ({
      ...row,
      created_time: new Date(row.created_time).toLocaleDateString('cs-CZ'),
      liked_by: row.liked_by || []
    }));
  
  } catch (error) {
    console.error('Chyba při načítání novinek:', error.message);
  } finally {
    sqlConnection.release();
  }
  





    return (
        <div className="flex flex-col justify-center text-center ">
            <div className="w-full dark:bg-[#121212] mt-5 mb-2 text-2xl flex font-bold dark:text-white text-gray-700 justify-center text-center">
                Nejnovější články
            </div>
            <div className="w-full flex justify-center flex-col text-center">
                {rows.map((item) =>{
                    return(
                        <BlogCard key={item.slug} data = {item} />
                    )
                })}
            </div>

        </div>
    )
}