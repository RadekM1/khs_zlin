import { NextResponse } from 'next/server';
import CalendarService from '@/lib/services/CalendarService';

export async function POST(request) {
    try{
        const body = await request.json();
        const operation = body.operation;


        switch(operation){
            case 'calendarList' : {
                
                const calendarService = new CalendarService(body)
                const calendarListResult = await calendarService.calendarList();

                if (calendarListResult.error) {
                    return NextResponse.json({ error: calendarListResult.error }, { status: calendarListResult.status });
                } else {
                    return NextResponse.json({calendar: calendarListResult}, { status: calendarListResult.status });
                }
            }

            case 'eventAdd' : {
                
                const calendarService = new CalendarService(body)
                const calendarInsertResult = await calendarService.eventInsert();

                if (calendarInsertResult.error) {
                    return NextResponse.json({ error: calendarInsertResult.error }, { status: calendarInsertResult.status });
                } else {
                    return NextResponse.json({calendarInsertResult}, { status: calendarInsertResult.status });
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
            case 'eventEdit' : {
                const calendarService = new CalendarService(body)
                const calendarUpdateResult = await calendarService.calendarUpdate();
            
                if (calendarUpdateResult.error) {
                    return NextResponse.json({ error: calendarUpdateResult.error }, { status: calendarUpdateResult.status });
                } else {
                    return NextResponse.json({status: calendarUpdateResult.status}, { status: calendarUpdateResult.status });
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

            case 'eventDel': {
                console.log('api connected')
                const calendarService = new CalendarService(body)
                const calendarDelResult = await calendarService.deleteEvent();
                console.log('výsledek z metody:',calendarDelResult)
                return NextResponse.json({ status: calendarDelResult.status });
            }
            default:
                return NextResponse.json({ error: 'Neznámý typ operace' }, { status: 400 });
        }
    } catch(error){
        return NextResponse.json({ error: 'nepodařilo se připravit data pro zadání do databáze' + error.message}, {status: 500})
    } 
}