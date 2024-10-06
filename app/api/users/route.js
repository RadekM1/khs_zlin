import UserService from '@/lib/services/UserService';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try{
        const body = await request.json();
        const operation = body.operation;

        switch(operation){
            case 'registration': {
                const userService = new UserService(body);
                const registrationResult = await userService.registration();
                if (registrationResult.error) {
                    return NextResponse.json({ error: registrationResult.error }, { status: registrationResult.status });
                } else {
                    return NextResponse.json({ message: registrationResult.message }, { status: registrationResult.status });
                }
            }; 
            case 'login' : {
                const userService = new UserService(body)
                const loginResult = await userService.login();
                if (loginResult.error) {
                    return NextResponse.json({ error: loginResult.error }, { status: loginResult.status });
                } else {
                    return NextResponse.json({ message: loginResult.message }, { status: loginResult.status });
                }
            }
            default:
                return NextResponse.json({ error: 'Neznámý typ operace' }, { status: 400 });
        }
    } catch(error){
        return NextResponse.json({ error: 'nepodařilo se připravit zadaná data pro zadání do databáze'}, {status: 500})
    } 
}