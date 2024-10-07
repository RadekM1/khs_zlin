export default async function executeQuery({ sqlConnection, query, values }) {
  try {
      const result = await sqlConnection.query(query, values); 
      return result;  
  } catch (error) {
      console.error('Chyba při vykonání dotazu:', error);
      return { error };
  }
}
