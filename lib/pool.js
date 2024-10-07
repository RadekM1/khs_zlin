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

export default pool;