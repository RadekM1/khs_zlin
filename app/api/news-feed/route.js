import NewsService from '@/lib/services/NewsService';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try{
        const body = await request.json();
        const operation = body.operation;


        switch(operation){
            case 'newsList' : {
                
                const newsService = new NewsService(body)
                const newsListResult = await newsService.newsList();
                if (newsListResult.error) {
                    return NextResponse.json({ error: newsListResult.error }, { status: newsListResult.status });
                } else {
                    return NextResponse.json({newsListResult}, { status: newsListResult.status });
                }
            }

            case 'newsInsert' : {

                const newsService = new NewsService(body)
                const newsInsertResult = await newsService.newsInsert();

                if (newsInsertResult.error) {
                    return NextResponse.json({ error: newsInsertResult.error }, { status: newsInsertResult.status });
                } else {
                    return NextResponse.json({newsInsertResult}, { status: newsInsertResult.status });
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
            case 'newsUpdate' : {
                const newsService = new NewsService(body)
                const newsUpdateResult = await newsService.newsUpdate();
                if (newsUpdateResult.error) {
                    return NextResponse.json({ error: newsUpdateResult.error }, { status: newsUpdateResult.status });
                } else {
                    return NextResponse.json({status: newsUpdateResult.status}, { status: newsUpdateResult.status });
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

            case 'newsDel': {
                console.log('api connected')
                const newsService = new NewsService(body)
                const newsDelResult = await newsService.deleteNews();
                console.log('výsledek z metody:',newsDelResult)
                return NextResponse.json({ status: newsDelResult.status });
            }
            default:
                return NextResponse.json({ error: 'Neznámý typ operace' }, { status: 400 });
        }
    } catch(error){
        return NextResponse.json({ error: 'nepodařilo se připravit data pro zadání do databáze' + error.message}, {status: 500})
    } 
}