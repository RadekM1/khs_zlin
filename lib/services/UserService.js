import { validateEmail } from "@/lib/functions/validateEmail";
import { validatePassword } from "@/lib/functions/validatePassword";
import {hash} from 'bcryptjs';
import validator from 'validator';
import nodeMailer from "../functions/nodeMailer";
import generateToken from "../functions/generateToken";
import pool from "../pool";
import executeQuery from "@/lib/db";


class UserService {
    constructor (body) {
        this.account = body.user;
        this.password = body.password;
        this.EmailForRestorePass = body.EmailForRestorePass;
        this.forgotenPassChangeToken = body.forgotenPassChangeToken;
        this.firstName = body.firstName;
        this.lastName = body.lastName;
        this.authToken = body.authToken;
    }

    async registration () {
        const sqlConnection = await pool.connect(); 
        try {
            if (!validateEmail(this.account) || !validatePassword(this.password)) {
                return { error: 'Nevhodné parametry', status: 422 };
            }
            const verification_token = generateToken();
            const verification_token_expire = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 
            const provider = 'email';
            const cleanUser = validator.escape(this.account);
            const cleanPassword = validator.escape(this.password);
            const hashedPassword = await hash(cleanPassword, 12);
            const cleanFirstName = validator.escape(this.firstName);
            const cleanLastName = validator.escape(this.lastName);

 
            const result = await executeQuery({
                sqlConnection,  
                query: 'INSERT INTO users (name, last_name, account, hash_password, verification_token, verification_token_expire, provider, ban_time_stamp) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())',
                values: [cleanFirstName, cleanLastName, cleanUser, hashedPassword, verification_token, verification_token_expire, provider],
            });

  
            
            if (result.rowCount > 0) {
                const confirmLink = `https://khs-zlin.vercel.app/potvrzeni-registrace?token=${verification_token}&UserToAuth=${this.account}`;
                const subjectReg = 'KHS Zlín - potvrzení registrace';
                const textReg = `Dobrý den, pro potvrzení registrace prosím přejděte na tento odkaz: ${confirmLink}
                S pozdravem, KHS Team`;
                
                await nodeMailer(cleanUser, subjectReg, textReg);
                return { message: 'Registrace byla úspěšná, na váš email byl odeslán ověřovací email', status: 200 };
            } else {
                return { error: 'Registrace nebyla úspěšná, email již může být v databázi', status: 500 };
            }
        } catch (error) {
            return { error: 'Chyba při registraci: ' + error.message, status: 500 };
        } finally {
            sqlConnection.release();  
        }
    }

    
    async restorePassword() {
        const sqlConnection = await pool.connect(); 
        try {
            const cleanEmail = validator.escape(this.EmailForRestorePass);
            if (!validateEmail(cleanEmail)) {
                return { error: 'Nevhodné parametry', status: 422 };
            }

     
            const result = await executeQuery({
                sqlConnection,  
                query: 'SELECT * FROM users WHERE account = $1',
                values: [cleanEmail],
            });

            if (result.rows.length > 0) {
                const row = result.rows[0];
                const userFromDatabase = row.account;

                if (userFromDatabase === cleanEmail) {
                    const resetToken = generateToken();
                    const resetTokenExpire = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                    
                    await executeQuery({
                        sqlConnection,  
                        query: 'UPDATE users SET reset_token = $1, reset_token_exp = $2 WHERE account = $3',
                        values: [resetToken, resetTokenExpire, cleanEmail]
                    });

                    const resetLink = `https://khs-zlin.vercel.app/login?token=${resetToken}`;
                    const subject = 'KHS Zlín - obnova hesla';
                    const text = `Dobrý den, pro obnovu hesla prosím přejděte na tento odkaz: ${resetLink}
                    S pozdravem, KHS Team`;
                    
                    await nodeMailer(cleanEmail, subject, text);
                    return { message: 'Na váš email byla odeslána zpráva pro obnovu hesla', status: 200 };
                } else {
                    return { error: 'Email se nenachází v databázi', status: 401 };
                }
            } else {
                return { error: 'Nepodařilo se najít uživatele', status: 404 };
            }
        } catch (error) {
            return { error: 'Chyba při obnově hesla: ' + error.message, status: 500 };
        } finally {
            sqlConnection.release(); 
        }
    }

    async forgotenPasswordChange () {
        const sqlConnection = await pool.connect(); 
        try{
            const cleanPassword = validator.escape(this.password);
            const cleanToken = validator.escape(this.forgotenPassChangeToken);
            if(!cleanPassword || !cleanToken){
                return {error: 'nebyly správně předány parametry', status: 400};
            }
            const result = await executeQuery({
                sqlConnection,
                query: 'SELECT * FROM users WHERE reset_token = $1',
                values: [cleanToken],
            })
            if(result.rows.length === 0){
                return {error: 'token nesouhlasí', status: 400}
            }
            const tokenFromDatabase = result.rows[0].reset_token
            const expirationDate = new Date(result.rows[0].reset_token_exp);
            const nowDate = new Date();
            if(tokenFromDatabase === cleanToken){
                if(expirationDate > nowDate){
                    const newHashedPassword = await hash(cleanPassword, 12)
                    const updateResult = await executeQuery({
                        sqlConnection,
                        query: 'UPDATE users SET hash_password = $1, reset_token = NULL, reset_token_exp = NULL WHERE reset_token = $2 ', 
                        values:[newHashedPassword, cleanToken],
                    })
                    if(updateResult.rowCount > 0){
                        return {message: 'změna hesla proběhla v pořádku', status: 200}
                    } else {
                        return {message: 'token je platný a správný, nicméně se nepodařilo aktualizovat heslo', status: 500}
                    }
                }else{
                    return {error: 'token je sice správný, nicméně platnost již vypršela', status: 400}
                }
            }
            } catch (error){
            return {error: 'něco uvnitř metody je špatně' + error.message, status: 500}
        }finally {
            sqlConnection.release(); 
        }
    }


    async authentication() {
        const sqlConnection = await pool.connect(); 
        try {
            const authToken = this.authToken;
            await sqlConnection.query('BEGIN');    
            const result = await executeQuery({
                sqlConnection,
                query: 'SELECT * FROM users WHERE verification_token = $1',
                values: [authToken],
            });
            if (result.rowCount > 0) {
                const resultUnlocked = await executeQuery({
                    sqlConnection,
                    query: `UPDATE users 
                            SET locked = FALSE 
                            WHERE verification_token = $1`,
                    values: [authToken],
                });
                if (resultUnlocked.rowCount > 0) {
                    await sqlConnection.query('COMMIT');
                    return { message: 'Uživatelský účet byl ověřen a odemčen. Můžete se přihlásit', status: 200 };
                } else {
                    
                    await sqlConnection.query('ROLLBACK');
                    return { error: 'Token se nepodařilo ověřit v databázi', status: 500 };
                }
            } else {
                await sqlConnection.query('ROLLBACK');
                return { error: 'Token nenalezen v databázi', status: 404 };
            }
        } catch (error) {
            await sqlConnection.query('ROLLBACK');
            return { error: 'V průběhu přípravy dat do databáze došlo k chybě: ' + error.message, status: 500 };
        } finally {
            sqlConnection.release();  
        }
    }

}


export default UserService;