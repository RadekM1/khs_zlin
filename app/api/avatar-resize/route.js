import sharp from 'sharp';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file'); 
    const buffer = await file.arrayBuffer();
    const imageBuffer = Buffer.from(buffer);

   
    const optimizedImageBuffer = await sharp(imageBuffer)
      .resize({ width: 500 }) 
      .jpeg({ quality: 80 }) 
      .toBuffer(); 

    return new Response(optimizedImageBuffer, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Length': optimizedImageBuffer.length,
        'Content-Disposition': 'inline; filename="optimized-avatar.jpg"',
      },
    });
  } catch (error) {
    console.error('Chyba při optimalizaci obrázku:', error);
    return NextResponse.json({ error: 'Chyba při optimalizaci obrázku' }, { status: 500 });
  }
}
