import { NextResponse } from 'next/server';
import { getBucket } from '@/lib/googleStorage';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const fileName = searchParams.get('file');
    const contentType = 'image/jpeg'; 


    if (!fileName) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const timestamp = new Date().getTime();
    const fullFileName = `img-gallery/${fileName}?t=${timestamp}`;
    console.log(fullFileName)
    const bucket = getBucket();
    const file = bucket.file(fullFileName);

 
    const [url] = file.getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: Date.now() + 10 * 60 * 1000, 
      contentType, 
      responseHeaders: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Expires': '0',
        'Surrogate-Control': 'no-store',
        'Pragma': 'no-cache',
      },
    });

    return NextResponse.json({ url });
  } catch (error) {
    console.error('Failed to generate signed URL:', error);
    return NextResponse.json({ error: 'Failed to generate signed URL' }, { status: 500 });
  }
}
