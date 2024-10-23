import { NextResponse } from "next/server";
import pool from "@/lib/pool";
import executeQuery from "@/lib/db";

export async function POST(request) {
  try {

    const sqlConnection = await pool.connect();
    const body = await request.json();

    const operation = body.operation

    switch(operation){
        case 'insert': {

            if (!article_slug || !user_account || !areaValue) {
                return NextResponse.json(
                  { message: "Chybí potřebné parametry" },
                  { status: 400 }
                );
              }
          
              const result = await executeQuery({
                  sqlConnection,
                  query: 'INSERT INTO comments (article_slug, user_account, comment, created) VALUES ($1, $2, $3, NOW()) ',
                  values: [body.article_slug, body.user_account, body.areaValue],
              });
          
              if (result.rows.length > 0) {
                  return NextResponse.json(result.rows[0], { status: 201 });
                } else {
                  return NextResponse.json({ message: "Komentář vložen, ale nelze vrátit data" }, { status: 201 });
                }
        }

        case 'getter' : {

            if (!article) {
                return NextResponse.json(
                  { message: "Chybí potřebné parametry" },
                  { status: 400 }
                );
              }
          
              const result = await executeQuery({
                  sqlConnection,
                  query: 'SELECT * FROM comments WHERE article_slug = $1',
                  values: [body.article],
              });
          
              if (result.rows.length > 0) {
                  return NextResponse.json(result.rows, { status: 201 });
                } else {
                  return NextResponse.json({ message: "Komentář vložen, ale nelze vrátit data" }, { status: 201 });
                }
        }

    }

  } catch (error) {
    console.error("Error inserting comment:", error);
    return NextResponse.json({ message: "Chyba při vkládání komentáře" }, { status: 500 });
  }
}

