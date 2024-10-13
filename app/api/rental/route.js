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

            case 'productInsert' : {
                console.log('case in api signal')
                const rentalService = new RentalService(body)
                const productInsertResult = await rentalService.productInsert();
                console.log('after insert signal')
                if (productInsertResult.error) {
                    return NextResponse.json({ error: productInsertResult.error }, { status: productInsertResult.status });
                } else {
                    return NextResponse.json({productInsertResult}, { status: productInsertResult.status });
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

export async function PUT(request) {
    try{
        const body = await request.json();
        const operation = body.operation;


        switch(operation){
            case 'productUpdate' : {
                const rentalService = new RentalService(body)
                const productUpdateResult = await rentalService.productUpdate();
                if (productUpdateResult.error) {
                    return NextResponse.json({ error: productUpdateResult.error }, { status: productUpdateResult.status });
                } else {
                    return NextResponse.json({status: productUpdateResult.status}, { status: productUpdateResult.status });
                }
            }
            default:
                return NextResponse.json({ error: 'Neznámý typ operace' }, { status: 400 });
        }
    } catch(error){
        
        return NextResponse.json({ error: 'nepodařilo se připravit data pro zadání do databáze' + error.message}, {status: 500})
    } 
}

export async function DELETE(request) {
    try{
        const body = await request.json();
        const operation = body.operation;


        switch(operation){

            case 'productDel': {
                console.log('api connected')
                const rentalService = new RentalService(body)
                const rentalDelResult = await rentalService.deleteProduct();
                console.log('výsledek z metody:',rentalDelResult)
                return NextResponse.json({ status: rentalDelResult.status });
            }
            default:
                return NextResponse.json({ error: 'Neznámý typ operace' }, { status: 400 });
        }
    } catch(error){
        return NextResponse.json({ error: 'nepodařilo se připravit data pro zadání do databáze' + error.message}, {status: 500})
    } 
}