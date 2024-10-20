import { revalidatePath } from "next/cache";
import pool from "../pool";
import executeQuery from "@/lib/db";


class NewsService {
    constructor (body) {
        this.title = body.title;
        this.summary = body.summary
        this.editorContent = body.editorContent
        this.expirationDate = body.expirationDate
        this.account = body.account
        this.newsId = body.newsId
    }

    async newsList() {
        const sqlConnection = await pool.connect(); 
        try {
            const result = await executeQuery({
                sqlConnection,
                query: 'SELECT * FROM news_feed'
            });
            if (result.rowCount > 0) {
                const rows = result.rows
                return rows;
                }else{
                    return { error: 'Chyba při zpracování sql dotazu (žádný výsledek)', status: 400 };
                } 
            } catch (error) {
                return { error: 'V průběhu přípravy dat do databáze došlo k chybě: ' + error.message, status: 500 };
        } finally {
            sqlConnection.release();  
        }
    }

    async newsUpdate() {
        const sqlConnection = await pool.connect();
        try {
            const result = await executeQuery({
                sqlConnection,
                query: 'UPDATE news_feed SET title = $1, clanek = $2, account = $3, description = $4, expiration_date = $5 WHERE id = $6',
                values: [this.title, this.editorContent, this.account, this.summary, this.expirationDate ,this.newsId],
            });
            if (result.rowCount > 0) {
                revalidatePath('/novinky')
                revalidatePath(`/novinky/${this.newsId}`)
                return { message: 'News feed byl úspěšně aktualizován', status: 200 };
            } else {
                return { error: 'Nepodařilo se aktualizovat news feed', status: 400 };
            }
        } catch (error) {
            return { error: 'Chyba při aktualizaci: ' + error.message, status: 500 };
        } finally {
            sqlConnection.release();
        }
    }

    async newsInsert() {
        const sqlConnection = await pool.connect();
        try {
            const result = await executeQuery({
                sqlConnection,
                query: 'INSERT INTO news_feed (title, clanek, account, description, expiration_date) VALUES ($1, $2, $3, $4, $5)',
                values: [this.title, this.editorContent, this.account, this.summary, this.expirationDate],
            });
            console.log(result)
            if (result.rowCount > 0) {
                revalidatePath('/novinky')
                
                return { message: 'News feed byl úspěšně vytvořen', status: 200 };
            } else {
                return { error: 'Nepodařilo se vytvořit news feed', status: 400 };
            }
        } catch (error) {
            return { error: 'Chyba při přidání feedu: ' + error.message, status: 500 };
        } finally {
            sqlConnection.release();
        }
    }


    async deleteNews() {
        const sqlConnection = await pool.connect();
        try {
            const result = await executeQuery({
                sqlConnection,
                query: 'DELETE FROM news_feed WHERE id = $1',
                values: [this.newsId],
            });

            if (result.rowCount > 0) {
                return { message: 'News feed byl úspěšně smazán', status: 200 };
            } else {
                return { error: 'Nepodařilo se smazat news feed', status: 400 };
            }
        } catch (error) {
            return { error: 'Chyba při mazání účtu: ' + error.message, status: 500 };
        } finally {
            sqlConnection.release();
        }
    }
}


export default NewsService;