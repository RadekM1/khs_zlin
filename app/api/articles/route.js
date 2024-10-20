import ArticleService from '@/lib/services/ArticleService';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try{
        const body = await request.json();
        const operation = body.operation;


        switch(operation){
            case 'articleList' : {
                
                const articleService = new ArticleService(body)
                const articleListResult = await articleService.articleList();
                if (articleListResult.error) {
                    return NextResponse.json({ error: articleListResult.error }, { status: articleListResult.status });
                } else {
                    return NextResponse.json({articleListResult}, { status: articleListResult.status });
                }
            }

            case 'articleInsert' : {

                const articleService = new ArticleService(body)
                const articleInsertResult = await articleService.articleInsert();

                if (articleInsertResult.error) {
                    return NextResponse.json({ error: articleInsertResult.error }, { status: articleInsertResult.status });
                } else {
                    return NextResponse.json({articleInsertResult}, { status: articleInsertResult.status });
                }
            }
            default:
                return NextResponse.json({ error: 'Neznámý typ operace' }, { status: 400 });
        }
    } catch(error){
        console.log(error)
        return NextResponse.json({ error: 'nepodařilo se připravit data pro zadání do databáze' + error.message}, {status: 500})
    } 

    
}

export async function PUT(request) {
    try{
        const body = await request.json();
        const operation = body.operation;


        switch(operation){
            case 'articleUpdate' : {
                const articleService = new ArticleService(body)
                const articleUpdateResult = await articleService.articleUpdate();
                if (articleUpdateResult.error) {
                    return NextResponse.json({ error: articleUpdateResult.error }, { status: articleUpdateResult.status });
                } else {
                    return NextResponse.json({status: articleUpdateResult.status}, { status: articleUpdateResult.status });
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
    try {
        const body = await request.json();
        const operation = body.operation;

        switch (operation) {
            case 'articleDel': {
                const articleService = new ArticleService(body);
                const articleDelResult = await articleService.deleteArticle();

                if (articleDelResult.error) {
                    return NextResponse.json({ error: articleDelResult.error }, { status: articleDelResult.status });
                } else {
                    return NextResponse.json({ message: 'Článek byl úspěšně smazán', status: 200 });
                }
            }
            default:
                return NextResponse.json({ error: 'Neznámý typ operace' }, { status: 400 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'nepodařilo se připravit data pro zadání do databáze: ' + error.message }, { status: 500 });
    }
}

