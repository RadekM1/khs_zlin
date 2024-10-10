import { NextResponse } from 'next/server';
import { getBucket } from '@/lib/googleStorage';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const fileName = `avatars/${searchParams.get('file')}`; // Název souboru (např. avatar.png)

    const bucket = getBucket(); // Získání bucketu z Google Cloud Storage
    const file = bucket.file(fileName);

    const [url] = await file.getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: Date.now() + 10 * 60 * 1000, // URL platná na 10 minut
      contentType: 'image/png', // Specifikujte typ souboru, který očekáváte
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Failed to generate signed URL:', error);
    return NextResponse.json({ error: 'Failed to generate signed URL' }, { status: 500 });
  }
}
