import { NextResponse } from "next/server";
import pool from "@/lib/pool";
import executeQuery from "@/lib/db";
import { revalidatePath } from 'next/cache';
import { revalidateTag } from "next/cache";

export async function POST(request) {
  let sqlConnection;
  
  try {
    sqlConnection = await pool.connect();
    const body = await request.json();
    const { operation, article_slug, user_account, areaValue, article } = body;

    switch(operation) {
      case 'insert': {
        if (!article_slug || !user_account || !areaValue) {
          return NextResponse.json(
            { message: "Chybí potřebné parametry" },
            { status: 400 }
          );
        }

        const result = await executeQuery({
          sqlConnection,
          query: 'INSERT INTO comments (article_slug, user_account, comment, created) VALUES ($1, $2, $3, NOW())',
          values: [article_slug, user_account, areaValue],
        });

      

        if (result.rowCount > 0) { 
      
          revalidatePath('/clanky');
          revalidatePath(`/clanky/${article_slug}`);
          revalidateTag('articles');

          return NextResponse.json(result.rows[0], { status: 201 });
        } else {
          return NextResponse.json(
            { message: "Komentář vložen, ale nelze vrátit data" },
            { status: 201 }
          );
        }
      }

      case 'getter': {
        if (!article) {
          return NextResponse.json(
            { message: "Chybí potřebné parametry" },
            { status: 400 }
          );
        }

        const result = await executeQuery({
          sqlConnection,
          query: `
            SELECT 
            c.id, 
            c.article_slug, 
            c.comment, 
            c.created, 
            u.avatar, 
            u.name, 
            LEFT(u.last_name, 1) AS last_name_initial,
            CONCAT(u.name, ' ', LEFT(u.last_name, 1)) AS nickname,
            u.account 
            FROM comments c
            JOIN users u 
            ON c.user_account = u.account
            WHERE c.article_slug = $1;
          `,
          values: [article],
        });

        if (result.rows.length > 0) {
          return NextResponse.json({ result: result.rows }, { status: 200 });
        } else {
          return NextResponse.json(
            { message: "Žádné komentáře nebyly nalezeny" },
            { status: 200 }
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
