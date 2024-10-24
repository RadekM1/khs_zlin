import { NextResponse } from "next/server";
import pool from "@/lib/pool";
import executeQuery from "@/lib/db";
import { revalidatePath } from 'next/cache';

export async function POST(request) {
  let sqlConnection;
  
  try {
    sqlConnection = await pool.connect();
    const body = await request.json();
    const { operation, article_slug_heart, user_account_heart } = body;

    switch(operation) {
      case 'insert': {
        if (!article_slug_heart || !user_account_heart) {
          return NextResponse.json(
            { message: "Chybí potřebné parametry" },
            { status: 400 }
          );
        }

        const result = await executeQuery({
          sqlConnection,
          query: 'INSERT INTO hearts (user_account_heart, article_slug_heart) VALUES ($1, $2)',
          values: [user_account_heart, article_slug_heart],
        });



        if (result.rows.length > 0) {
          revalidatePath('/clanky')
          revalidatePath(`/clanky/${article_slug_heart}`)
          return NextResponse.json(result.rows[0], { status: 201 });
        } else {
          return NextResponse.json(
            { message: "Komentář vložen, ale nelze vrátit data" },
            { status: 201 }
          );
        }
      }


      default: {
        return NextResponse.json(
          { message: "Neznámá operace" },
          { status: 400 }
        );
      }
    }
  } catch (error) {
    console.error("Error handling comments operation:", error);
    return NextResponse.json(
      { message: "Chyba při zpracování komentářů" },
      { status: 500 }
    );
  } finally {
    if (sqlConnection) sqlConnection.release();
  }
}
