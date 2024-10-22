import { NextResponse } from 'next/server';
import { getBucket } from '@/lib/googleStorage';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const fileName = `avatars/${searchParams.get('file')}`; 

    const bucket = getBucket(); 
    const file = bucket.file(fileName);

    const [url] = await file.getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: Date.now() + 10 * 60 * 1000, 
      contentType: 'image/png', 
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Failed to generate signed URL:', error);
    return NextResponse.json({ error: 'Failed to generate signed URL' }, { status: 500 });
  }
}
