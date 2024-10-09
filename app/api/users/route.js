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

            case 'restorePassword' : {
                const userService = new UserService(body)
                const restorePasswordResult = await userService.restorePassword();
                if (restorePasswordResult.error) {
                    return NextResponse.json({ error: restorePasswordResult.error }, { status: restorePasswordResult.status });
                } else {
                    return NextResponse.json({ message: restorePasswordResult.message }, { status: restorePasswordResult.status });
                }
            }
            case 'forgotenPasswordChange' : {
                const userService = new UserService(body)
                const forgotenPasswordChangeResult = await userService.forgotenPasswordChange();
                if (forgotenPasswordChangeResult.error) {
                    return NextResponse.json({ error: forgotenPasswordChangeResult.error }, { status: forgotenPasswordChangeResult.status });
                } else {
                    return NextResponse.json({ message: forgotenPasswordChangeResult.message }, { status: forgotenPasswordChangeResult.status });
                }
            }
            default:
                return NextResponse.json({ error: 'Neznámý typ operace' }, { status: 400 });
        }
    } catch(error){
        return NextResponse.json({ error: 'nepodařilo se připravit data pro zadání do databáze' + error.message}, {status: 500})
    } 
}