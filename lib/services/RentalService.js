import pool from "../pool";
import executeQuery from "@/lib/db";


class RentalService {
    constructor (body) {
        this.account = body.user;
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
                    return { error: 'Chyba při zpracování sql dotazu (žádný výsledek)', status: 500 };
                } 
            } catch (error) {
                return { error: 'V průběhu přípravy dat do databáze došlo k chybě: ' + error.message, status: 500 };
        } finally {
            sqlConnection.release();  
        }
    }
    

}


export default RentalService;