import { validateEmail } from "@/lib/functions/validateEmail";
import { validatePassword } from "@/lib/functions/validatePassword";
import executeQuery from "@/lib/db";
import {hash} from 'bcryptjs';
import validator from 'validator';
import {compare} from 'bcryptjs'
import nodeMailer from "../functions/nodeMailer";
import generateToken from "../functions/generateToken";

class UserService {
    
    constructor (body) {
        this.account = body.user;
        this.password = body.password;
        this.EmailForRestorePass = body.EmailForRestorePass;
        this.forgotenPassChangeToken = body.forgotenPassChangeToken
    }
    async registration () {

        try{
            if(!validateEmail(this.account) || !validatePassword(this.password)){
                return {error: 'nevhodné parametry', status: 422 };    
            }
            const verification_token = generateToken();
            const verification_token_expire = new Date(Date.now () + 7 * 24 * 60 * 60 * 1000) 
            const provider = 'email';
            const cleanUser = validator.escape(this.account);
            const cleanPassword = validator.escape(this.password)
            const hashedPassword = await hash(cleanPassword, 12)
            
            const result = await executeQuery({ query: 
                'INSERT INTO users (account, hash_password, verification_token, verification_token_expire, provider) VALUES ($1, $2, $3, $4, $5)',
                values: [cleanUser, hashedPassword, verification_token, verification_token_expire, provider],
            });


            if(result.rowCount > 0){
                return {message: 'Registrace byla úspěšná, na Váš email byla odeslána zpráva pro ověření účtu a dokončení registrace', status: 200};
            } else {
                return {
                    error: 'Registrace nebyla úspěšná kvůli odmítnutí v databázi, pravděpodobně již obsahuje uvedený email',
                    status:500,
                };
            }
        } catch (error){
             return {error: 'Chyba při registraci' + error.message, status: 500}
        }
    }

    async login() {
    try {
        if (!validateEmail(this.account) || !validatePassword(this.password)) {
            return { error: 'Nevhodné parametry', status: 422 };
        }

        const cleanUser = validator.escape(this.account);
        const result = await executeQuery({
            query: 'SELECT * FROM users WHERE account = $1',
            values: [cleanUser],
        });
        if (!result || result.error) {
            return { error: 'Chyba při připojení nebo dotazu do databáze', status: 500 };
        }

        if (result.rows.length === 0) {
            return { error: 'Uživatel nenalezen', status: 404 };
        }

        const row = result.rows[0];
        const passFromDatabase = row.hash_password;
        const passFromClient = validator.escape(this.password);
        const passEqual = await compare(passFromClient, passFromDatabase);

        if (passEqual) {
            return { message: 'Přihlášení bylo úspěšné', status: 200 };
        } else {
            return { error: 'Zadané heslo nebo email nesouhlasí', status: 401 };
        }
    } catch (error) {
        return { error: 'Chyba při přihlášení: ' + error.message, status: 500 };
    }
}

    async restorePassword () {

        try{
            const cleanEmail = validator.escape(this.EmailForRestorePass);
            if(!validateEmail(cleanEmail)){
                return {error: 'nevhodné parametry', status: 422 };    
            }
            const result = await executeQuery({ query: 
                'SELECT *  FROM users WHERE account = $1 ',
                values: [cleanEmail],
            });
            if(result.rows.length > 0){
                const row = result.rows[0]
                const userFromDatabase = row.account
                const userFromClient = cleanEmail
                if(userFromDatabase === userFromClient){
                    const resetToken = generateToken();
                    const resetTokenExpire = new Date(Date.now () + 7 * 24 * 60 * 60 * 1000);
                    await executeQuery({
                        query: 'UPDATE users SET reset_token = $1, reset_token_exp = $2 WHERE account = $3',
                        values: [resetToken, resetTokenExpire, cleanEmail ]
                    })
                    const to = userFromDatabase
                    const resetLink = `https://khs-sand.vercel.app/obnova-hesla?token=${resetToken}`
                    const subject = 'KHS Zlín - obnova hesla'
                    const text = `
                        Dobrý den, pro obnovu hesla prosím přejděte na tento odkaz: 
                        ${resetLink}
                        Platnost odkazu pro obnovu hesla je týden. 
                        S pozdravem, KHS Zlín Team
                        ` 
                    await nodeMailer(to, subject, text);
                    return {message: 'na zadaný email byla odeslána obnova hesla',  status: 200};
                } else {
                    return {error: 'zadaný email se nenalezá v databázi', status: 401}
                }
            } else {
                return {
                    error: 'Nepodařilo se získat email z databáze',
                    status:500,
                };
            }
        } catch (error){
             return {error: 'Chyba při přihlášení' + error.message, status: 500}
        }
    }

    async forgotenPasswordChange () {

        try{
            const cleanPassword = validator.escape(this.password);
            const cleanToken = validator.escape(this.forgotenPassChangeToken);
            if(!cleanPassword || !cleanToken){
                return {error: 'nebyly správně předány parametry', status: 400};
            }
            const result = await executeQuery({
                query: 'SELECT * FROM users WHERE reset_token = $1',
                values: [cleanToken],
            })
            if(!result.rows.length){
                return {error: 'token nesouhlasí', status: 400}
            }
            const tokenFromDatabase = result.rows[0].reset_token
            const expirationDate = new Date(result.rows[0].reset_token_exp);
            const nowDate = new Date();
            
            if(tokenFromDatabase === cleanToken){
                if(expirationDate > nowDate){
                    const newHashedPassword = await hash(cleanPassword, 12)
                    const result = await executeQuery({
                        query: 'UPDATE users SET hash_password = $1, reset_token = NULL, reset_token_exp = NULL WHERE reset_token = $2 ', 
                        values:[newHashedPassword, cleanToken],
                    })
                    console.log('object::', result )
                    console.log('počet řádků:', result.rowCount)
                    if(result.rowCount > 0){
                        return {message: 'změna hesla proběhla v pořádku', status: 200}
                    } else {
                        return {error: 'token je platný a správný, nicméně se nepodařilo aktualizovat heslo', status: 500}
                    }
                }else{
                    return {error: 'token je sice správný, nicméně platnost již vypršela', status: 400}
                }
            }
            } catch (error){
            return {error: 'něco uvnitř metody řešící obnovu hesla je špatně' + error.message, status: 500}
        }
    }
}

export default UserService;