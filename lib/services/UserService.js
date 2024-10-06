import { validateEmail } from "@/lib/functions/validateEmail";
import { validatePassword } from "@/lib/functions/validatePassword";
import executeQuery from "@/lib/db";
import {hash} from 'bcryptjs';
import validator from 'validator';

class UserService {
    
    constructor (body) {
        this.user = body.user;
        this.password = body.password;
    }
    async registration () {

        try{
            if(!validateEmail(this.user) || !validatePassword(this.password)){
                return {error: 'nevhodné parametry', status: 422 };    
            }
            const verification_token = 'token';
            const verification_token_expire = '2024-12-31 23:59:59';
            const provider = 'email';
            const cleanUser = validator.escape(this.user);
            const cleanPassword = validator.escape(this.password)
            const hashedPassword = await hash(cleanPassword, 12)
            
            const result = await executeQuery({ query: 
                'INSERT INTO users (user, hash_password, verification_token, verification_token_expire, provider) VALUES (?, ?, ?, ?, ?)',
                values: [cleanUser, hashedPassword, verification_token, verification_token_expire, provider],
            });
            if(result.affectedRows > 0){
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
}

export default UserService;