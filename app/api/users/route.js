import { validateEmail } from "@/functions/validateEmail";
import { validatePassword } from "@/functions/validatePassword";
import executeQuery from "@/lib/db";
import { NextResponse } from 'next/server';
import {hash} from 'bcryptjs';

export async function POST(request) {
    try{

        const body = await request.json();

        const {user, password, operation} = body;

        const verification_token = 'token'
        const verification_token_expire = '2024-12-31 23:59:59'
        const provider = 'email'
        const hashedPassword = hash(password, 12)

        if(!validateEmail(user) || !validatePassword(password)){
           return NextResponse.json({error: 'zadán nevhodný vstup'}, {status: 422})
        }

        switch(operation){
            case 'registration': {
                const result = await executeQuery({ query: 
                    'INSERT INTO users (email, hash_password, verification_token, verification_token_expire, provider) VALUES (?, ?, ?, ?, ?)',
                    values: [user, hashedPassword, verification_token, verification_token_expire, provider],
                });
                return NextResponse.json({ message: 'SQL dotaz odeslán, výsledek:', result})
            }; 
            default:
                return NextResponse.json({ error: 'Unknown operation' }, { status: 400 });
        }
    } catch(error){
        return NextResponse.json({ error: 'nepodařilo se získat users data'}, {status: 500})
    } 



}

