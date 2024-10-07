// app/api/test/route.js
import executeQuery from '@/lib/db'; // Import knihovny

export async function GET(req) {
  try {
    // Provádíme jednoduchý SQL dotaz přes tvoji knihovnu
    const result = await executeQuery({ query: 'select * from users', values: [] });

    if (result.error) {
      throw new Error(result.error);
    }

    // Pokud dotaz uspěje, vrátíme čas a zprávu o úspěšném připojení
    return new Response(JSON.stringify({ message: 'Připojení je úspěšné', time: result.rows[0] }), {
      status: 200,
    });
  } catch (error) {
    console.error('Chyba při připojení k databázi:', error);
    return new Response(JSON.stringify({ error: 'Nepodařilo se připojit k databázi', details: error.message }), {
      status: 500,
    });
  }
}