import BooksService from '@/lib/services/BooksService';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try{
        const body = await request.json();
        const operation = body.operation;


        switch(operation){
            case 'booksList' : {
                
                const booksService = new BooksService(body)
                const booksListResult = await booksService.BookslList();
                if (booksListResult.error) {
                    return NextResponse.json({ error: booksListResult.error }, { status: booksListResult.status });
                } else {
                    return NextResponse.json({booksListResult}, { status: booksListResult.status });
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

