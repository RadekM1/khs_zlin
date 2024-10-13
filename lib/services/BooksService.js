import pool from "../pool";
import executeQuery from "@/lib/db";

class BooksService {
    constructor(body) {
        this.bookId = body.bookId;
        this.name = body.name;
        this.creator = body.creator;
        this.onStock = body.onStock;
        this.whoRented = body.whoRented;
        this.release = body.release;
        this.pictureUrl = body.pictureUrl;
        this.description = body.description;
    }

    async booksList() {
        const sqlConnection = await pool.connect();
        try {
            const result = await executeQuery({
                sqlConnection,
                query: 'SELECT * FROM books'
            });
            if (result.rowCount > 0) {
                return result.rows;
            } else {
                return { error: 'Žádné výsledky', status: 400 };
            }
        } catch (error) {
            return { error: 'Chyba při načítání dat: ' + error.message, status: 500 };
        } finally {
            sqlConnection.release();
        }
    }

    async bookInsert() {
        const sqlConnection = await pool.connect();
        try {
            const query = `
                INSERT INTO books (name, creator, on_stock, member_rented, release, picture_url, description)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *;
            `;
            const values = [this.name, this.creator, this.onStock, this.whoRented, this.release, this.pictureUrl, this.description];
            const result = await executeQuery({
                sqlConnection,
                query,
                values
            });

            if (result.rowCount > 0) {
                return { success: true, book: result.rows[0], status: 201 };
            } else {
                return { error: 'Nepodařilo se vložit knihu', status: 400 };
            }
        } catch (error) {
            return { error: 'Chyba při vkládání knihy: ' + error.message, status: 500 };
        } finally {
            sqlConnection.release();
        }
    }

    async bookUpdate() {
        const sqlConnection = await pool.connect();
        try {
            const query = `
                UPDATE books
                SET name = $1, creator = $2, on_stock = $3, member_rented = $4, release = $5, picture_url = $6, description = $7
                WHERE id = $8
                RETURNING *;
            `;
            const values = [this.name, this.creator, this.onStock, this.whoRented, this.release, this.pictureUrl, this.description, this.bookId];
            const result = await executeQuery({
                sqlConnection,
                query,
                values
            });

            if (result.rowCount > 0) {
                return { success: true, book: result.rows[0], status: 200 };
            } else {
                return { error: 'Nepodařilo se aktualizovat knihu', status: 400 };
            }
        } catch (error) {
            return { error: 'Chyba při aktualizaci knihy: ' + error.message, status: 500 };
        } finally {
            sqlConnection.release();
        }
    }

    async deleteBook() {
        const sqlConnection = await pool.connect();
        try {
            const query = `DELETE FROM books WHERE id = $1 RETURNING *;`;
            const values = [this.bookId];
            const result = await executeQuery({
                sqlConnection,
                query,
                values
            });
            
            if (result.rowCount > 0) {
                return { success: true, status: 200 };
            } else {
                return { error: 'Nepodařilo se smazat knihu', status: 400 };
            }
        } catch (error) {
            return { error: 'Chyba při mazání knihy: ' + error.message, status: 500 };
        } finally {
            sqlConnection.release();
        }
    }
}

export default BooksService;
