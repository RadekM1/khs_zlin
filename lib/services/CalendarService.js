import pool from "../pool";
import executeQuery from "@/lib/db";


class calendarService {
    constructor (body) {
        this.id = body.id;
        this.date = body.eventDate;
        this.event = body.event;
        this.event_start = body.startTime;
        this.event_end = body.endTime;
        this.eventId = body.eventId;
        this.check_whole_day = body.checkBoxDayValue;
        this.check_no_end =body.checkBoxNoEndValue;
    }

    async calendarList() {
        const sqlConnection = await pool.connect(); 
        try {
            const result = await executeQuery({
                sqlConnection,
                query: 'SELECT * FROM calendar'
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

    async calendarUpdate() {
        const sqlConnection = await pool.connect();

        try {
            const result = await executeQuery({
                sqlConnection,
                query: 'UPDATE calendar SET date = $1, event = $2, event_start = $3, event_end = $4, check_whole_day = $5, check_no_end = $6 WHERE id = $7',
                values: [this.date, this.event, this.event_start, this.event_end, this.check_whole_day, this.check_no_end, this.id],
            });
            console.log(result)
            if (result.rowCount > 0) {
              
                return { message: 'Event byl úspěšně aktualizován', status: 200 };
            } else {
                return { error: 'Nepodařilo se aktualizovat event', status: 400 };
            }
        } catch (error) {
            return { error: 'Chyba při aktualizaci: ' + error.message, status: 500 };
        } finally {
            sqlConnection.release();
        }
    }

    async eventInsert() {

        const sqlConnection = await pool.connect();
        try {
            const result = await executeQuery({
                sqlConnection,
                query: 'INSERT INTO calendar (date, event, event_start, event_end, check_whole_day, check_no_end) VALUES ($1, $2, $3, $4, $5, $6)',
                values: [this.date, this.event, this.event_start, this.event_end, this.check_whole_day, this.check_no_end],
            });
          
            if (result.rowCount > 0) {
        
                return { message: 'Produkt byl úspěšně vytvořen', status: 200 };
            } else {
                return { error: 'Nepodařilo se vytvořit event', status: 400 };
            }
        } catch (error) {
            return { error: 'Chyba při přidání event: ' + error.message, status: 500 };
        } finally {
            sqlConnection.release();
        }
    }


    async deleteEvent() {
        const sqlConnection = await pool.connect();
        try {
            const result = await executeQuery({
                sqlConnection,
                query: 'DELETE FROM calendar WHERE id = $1',
                values: [this.eventId],
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


export default calendarService;