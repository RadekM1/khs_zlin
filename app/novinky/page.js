import pool from "@/lib/pool";
import executeQuery from "@/lib/db";
import NewsFeedPage from "@/components/index/newsFeedPage";

export const revalidate = 3600;  

export default async function page() {
  let rows = [];

  const sqlConnection = await pool.connect();
  try {
    const result = await executeQuery({
      sqlConnection,
      query: 'SELECT title, clanek, created_time, description FROM news_feed'
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

  return (
    <NewsFeedPage />
  );
}
