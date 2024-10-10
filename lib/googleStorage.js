import { Storage } from '@google-cloud/storage';


export function getBucket() {
  const storage = new Storage({
    projectId: process.env.PROJECT_ID,
    credentials: {
      client_email: process.env.CLIENT_EMAIL,
      private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
  });

  return storage.bucket('khs-zlin'); // Zde použijte název vašeho bucketu
}