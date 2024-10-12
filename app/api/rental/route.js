import RentalService from '@/lib/services/RentalService';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try{
        const body = await request.json();
        const operation = body.operation;


        switch(operation){
            case 'rentalList' : {
                
                const rentalService = new RentalService(body)
                const rentalListResult = await rentalService.rentalList();
                if (rentalListResult.error) {
                    return NextResponse.json({ error: rentalListResult.error }, { status: rentalListResult.status });
                } else {
                    return NextResponse.json({rentalListResult}, { status: rentalListResult.status });
                }
            }
            default:
                return NextResponse.json({ error: 'Neznámý typ operace' }, { status: 400 });
        }
    } catch(error){
        console.log('penetration test')
        return NextResponse.json({ error: 'nepodařilo se připravit data pro zadání do databáze' + error.message}, {status: 500})
    } 
}
