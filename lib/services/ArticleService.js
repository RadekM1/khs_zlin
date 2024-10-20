import pool from "../pool";
import executeQuery from "@/lib/db";
import { revalidatePath } from 'next/cache';


class ArticleService {
    constructor (body) {
        this.articleId = body.idToEdit;
        this.slug = body.slug
        this.title = body.title
        this.account = body.account
        this.editorContent = body.editorContent
        this.account = body.account
        this.thumbnail = body.thumbnail
        this.gallery = body.gallery
        this.category = body.category
        this.nickName = body.nickName
        this.description = body.description
        this.metadataToApi = body.metadataToApi
        this.idToDel = body.idToDel
    }

    async articleList() {
        const sqlConnection = await pool.connect(); 
        try {
            const result = await executeQuery({
                sqlConnection,
                query: 'SELECT * FROM articles'
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

    async articleUpdate() {
        const sqlConnection = await pool.connect();
        try {
            const result = await executeQuery({
                sqlConnection,
                query: 'UPDATE articles SET title = $1, clanek = $2, description = $3, thumbnail = $4, article_img_gallery = $5, category = $6 WHERE article_id = $7',
                values: [this.title, this.editorContent, this.description, this.thumbnail, this.gallery, this.category ,this.articleId],
            });
            if (result.rowCount > 0) {
                revalidatePath('/clanky')

                return { message: 'Článek byl úspěšně aktualizován', status: 200 };
            } else {
                return { error: 'Nepodařilo se aktualizovat článek', status: 400 };
            }
        } catch (error) {
            console.log(error.message)
            return { error: 'Chyba při aktualizaci: ' + error.message, status: 500 };
            
        } finally {
            sqlConnection.release();
        }
    }

    async articleInsert() {
        const sqlConnection = await pool.connect();
        try {
            let slug = this.slug;
            let slugExists = true;
            let i = 1;
    

            while (slugExists) {
                const checkSlugResult = await executeQuery({
                    sqlConnection,
                    query: 'SELECT EXISTS(SELECT 1 FROM articles WHERE slug = $1)',
                    values: [slug],
                });
    
                if (checkSlugResult.rows[0].exists) {
                    slug = `${this.slug}-${i++}`;
                } else {
                    slugExists = false; 
                }
            }
    
       
            let metadataTemp = JSON.parse(this.metadataToApi);
            let metadataToSql = metadataTemp.map(object => {
                return { 
                    file: `https://storage.googleapis.com/khs-zlin/img-gallery/${slug}/${object.file}`, 
                    alt: object.alt, 
                    description: object.description 
                };
            });
    
         
            let metadataToSqlString = JSON.stringify(metadataToSql);
    
            let prepairedThumbNailUrl = `https://storage.googleapis.com/khs-zlin/img-gallery/${slug}/${this.thumbnail}`;
 
            const result = await executeQuery({
                sqlConnection,
                query: 'INSERT INTO articles (slug, title, clanek, user_email, description, thumbnail, article_img_gallery, category, nickname) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                values: [slug, this.title, this.editorContent, this.account, this.description, prepairedThumbNailUrl, metadataToSqlString, this.category, this.nickName],
            });
   
            if (result.rowCount > 0) {
                return { message: 'Článek byl úspěšně vytvořen', slug: slug, status: 200 };
            } else {
                return { error: 'Nepodařilo se vytvořit článek', status: 400 };
            }
        } catch (error) {
            console.error('Chyba při přidání článku:', error.message);
            return { error: 'Chyba při přidání článku: ' + error.message, status: 500 };
        } finally {
            sqlConnection.release();
        }
    }
    
    
    


    async deleteArticle() {
        const sqlConnection = await pool.connect();

        try {
            const result = await executeQuery({
                sqlConnection,
                query: 'DELETE FROM articles WHERE article_id = $1',
                values: [this.idToDel],
            });

            
            if (result.rowCount > 0) {
                return { message: 'Článek byl úspěšně smazán', status: 200 };
            } else {
                return { error: 'Nepodařilo se smazat článek', status: 400 };
            }
        } catch (error) {
            return { error: 'Chyba při mazání účtu: ' + error.message, status: 500 };
        } finally {
            sqlConnection.release();
        }
    }
}


export default ArticleService;