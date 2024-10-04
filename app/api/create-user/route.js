import executeQuery from "@/lib/db";
import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const result = await executeQuery({ query: 'SELECT 1'});
        return NextResponse.json({status: 'Connected', result});
    } catch (error){
        console.log('Connection error', error);
        return NextResponse.json({ status: 'Connection failed', error: error.message}, {status: 500 });
    }
}