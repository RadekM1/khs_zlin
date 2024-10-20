import { NextResponse } from 'next/server';
import { getBucket } from '@/lib/googleStorage';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const fileName = searchParams.get('file');
    const contentType = 'image/jpg'; 


    if (!fileName) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const fullFileName = `img-gallery/${fileName}`;
    console.log(fullFileName)
    const bucket = getBucket();
    const file = bucket.file(fullFileName);

    // Generujeme podpisovaný URL
    const [url] = await file.getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: Date.now() + 10 * 60 * 1000, 
      contentType, 
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Failed to generate signed URL:', error);
    return NextResponse.json({ error: 'Failed to generate signed URL' }, { status: 500 });
  }
}
