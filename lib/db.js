import mysql from "serverless-mysql";

const db = mysql({
    config: {
      host: 'mysql80.r3.websupport.cz',
      database: 'khs_database_v2',
      user: 'khsadmin',
      password: 'BMWm3white',
      port: 3314,
    },
  });


export default async function executeQuery ({query, values}) {
    
    try {
        const results = await db.query(query, values);
        await db.end();
        return results;
    } catch (error){
        return {error} ;
    }
}


