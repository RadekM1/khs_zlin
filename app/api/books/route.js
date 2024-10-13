import BooksService from '@/lib/services/BooksService';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try{
        const body = await request.json();
        const operation = body.operation;


        switch(operation){
            case 'booksList' : {
                console.log('active signal ? ')
                const booksService = new BooksService(body)
                const booksListResult = await booksService.booksList();
                
                if (booksListResult.error) {
                    return NextResponse.json({ error: booksListResult.error }, { status: booksListResult.status });
                } else {
                    return NextResponse.json({ books: booksListResult }, { status: 200 });
                }
            }

            case 'bookAdd' : {
                console.log('case in api signal')
                const booksService = new BooksService(body)
                const booktInsertResult = await booksService.bookInsert();
                console.log('after insert signal')
                if (booktInsertResult.error) {
                    return NextResponse.json({ error: booktInsertResult.error }, { status: booktInsertResult.status });
                } else {
                    return NextResponse.json({booktInsertResult}, { status: booktInsertResult.status });
                }
            }

            default:
                return NextResponse.json({ error: 'Neznámý typ operace' }, { status: 400 });
        }
    } catch(error){

        return NextResponse.json({ error: 'nepodařilo se připravit data pro zadání do databáze' + error.message}, {status: 500})
    }     
}

export async function PUT(request) {
    try{
        const body = await request.json();
        const operation = body.operation;


        switch(operation){
            case 'bookUpdate' : {
                const booksService = new BooksService(body)
                const bookUpdateResult = await booksService.bookUpdate();
                if (bookUpdateResult.error) {
                    return NextResponse.json({ error: bookUpdateResult.error }, { status: bookUpdateResult.status });
                } else {
                    return NextResponse.json({status: bookUpdateResult.status}, { status: bookUpdateResult.status });
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

            case 'bookDel': {
                console.log('api connected')
                const booksService = new BooksService(body)
                const booksDelResult = await booksService.deleteBook();
                console.log('výsledek z metody:',booksDelResult)
                return NextResponse.json({ status: booksDelResult.status });
            }
            default:
                return NextResponse.json({ error: 'Neznámý typ operace' }, { status: 400 });
        }
    } catch(error){
        return NextResponse.json({ error: 'nepodařilo se připravit data pro zadání do databáze' + error.message}, {status: 500})
    } 
}

