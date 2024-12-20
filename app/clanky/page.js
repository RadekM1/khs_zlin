
import pool from "@/lib/pool";
import executeQuery from "@/lib/db";
import ArticleList from "@/components/articleList";
import { GiNewspaper } from "react-icons/gi";

export const revalidate = 60;  

export default async function page() {

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
      `, next: {tags: ['articles']}
    });
    
    rows = result.rows.map(row => ({
      ...row,
      created_time: new Date(row.created_time).toLocaleDateString('cs-CZ'),
      liked_by: row.liked_by || [],
      hearts_count: row.hearts_count || 0,
      comments_count: row.comments_count || 0
    }));

  } catch (error) {
    console.error('Chyba při načítání novinek:', error.message);
    return {
      notFound: true, 
    };
  } finally {
    sqlConnection.release();
  }


    return (
      
      <div className="flex w-full align-top  min-h-screen items-center text-center flex-col ">
        <div className="flex border-b-[1px]  border-b-gray-300 dark:border-b-gray-700 mb-4 flex-row">
          <div className="mb-1">
            <GiNewspaper className="text-gray-600 w-8 h-8 mr-3 dark:text-gray-200" />
          </div>
          <div>
              <span className="text-2xl text-gray-600 dark:text-gray-200">Články</span>
          </div>
        </div>

        <div className="flex md:mx-5">


        
        <ArticleList importedRows={rows} />


        </div>
      </div>
    );
  }
  