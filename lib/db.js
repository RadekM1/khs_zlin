import { Pool } from 'pg';



const pool = new Pool({
  user: process.env.active_user,
  host: process.env.active_host,
  database: process.env.active_database,
  password: process.env.active_password,
  port: process.env.active_port,
  max: 10,
  connectionTimeoutMillis: 2000, 
  idleTimeoutMillis: 30000, 
  allowExitOnIdle: false, 
});


{/*    
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  ssl: { rejectUnauthorized: false },
  max: 10,
  connectionTimeoutMillis: 2000, 
  idleTimeoutMillis: 30000, 
  allowExitOnIdle: false, 
});
*/}

export default async function executeQuery({ query, values }) {
  try {
      const client = await pool.connect();
      const result = await client.query(query, values);
      client.release();
      return result;  
  } catch (error) {
      console.error('Chyba při vykonání dotazu:', error);
      return { error };
  }
}

