import pool from "../pool";
import executeQuery from "@/lib/db";


class RentalService {
    constructor (body) {
        this.account = body.user;
        this.productId = body.productId
        this.productName = body.productName
        this.pieces = body.pieces
        this.onStock = body.onStock
        this.isReserved = body.isReserved
        this.whoReserved = body.whoReserved
        this.whoRented = body.whoRented
    }

    async rentalList() {
        const sqlConnection = await pool.connect(); 
        try {
            const result = await executeQuery({
                sqlConnection,
                query: 'SELECT * FROM rental'
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

    async productUpdate() {
        const sqlConnection = await pool.connect();
        try {
            const result = await executeQuery({
                sqlConnection,
                query: 'UPDATE rental SET item_name = $1, pieces = $2, reserved = $3, on_stock = $4, member_reserved = $5, member_rented = $6 WHERE id = $7',
                values: [this.productName, this.pieces, this.isReserved, this.onStock, this.whoReserved, this.whoRented, this.productId],
            });
            if (result.rowCount > 0) {
              
                return { message: 'Produkt byl úspěšně aktualizován', status: 200 };
            } else {
                return { error: 'Nepodařilo se aktualizovat produkt', status: 400 };
            }
        } catch (error) {
            return { error: 'Chyba při aktualizaci: ' + error.message, status: 500 };
        } finally {
            sqlConnection.release();
        }
    }

    async productInsert() {
        const sqlConnection = await pool.connect();
        try {
            const result = await executeQuery({
                sqlConnection,
                query: 'INSERT INTO rental (item_name, pieces, reserved, on_stock, member_reserved, member_rented) VALUES ($1, $2, $3, $4, $5, $6)',
                values: [this.productName, this.pieces, this.isReserved, this.onStock, this.whoReserved, this.whoRented],
            });
            console.log(result)
            if (result.rowCount > 0) {
                console.log(result)
                return { message: 'Produkt byl úspěšně vytvořen', status: 200 };
            } else {
                return { error: 'Nepodařilo se vytvořit produkt', status: 400 };
            }
        } catch (error) {
            return { error: 'Chyba při přidání produktu: ' + error.message, status: 500 };
        } finally {
            sqlConnection.release();
        }
    }


    async deleteProduct() {
        const sqlConnection = await pool.connect();
        try {
            const result = await executeQuery({
                sqlConnection,
                query: 'DELETE FROM rental WHERE id = $1',
                values: [this.productId],
            });

            if (result.rowCount > 0) {
                return { message: 'Účet byl úspěšně smazán', status: 200 };
            } else {
                return { error: 'Nepodařilo se smazat účet', status: 400 };
            }
        } catch (error) {
            return { error: 'Chyba při mazání účtu: ' + error.message, status: 500 };
        } finally {
            sqlConnection.release();
        }
    }
}


export default RentalService;