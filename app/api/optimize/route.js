import { NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const buffer = await file.arrayBuffer();
    const imageBuffer = Buffer.from(buffer);

  
    const optimizeImageToMaxSize = async (inputBuffer, maxSizeMb, maxWidth, quality = 80) => {
      let optimizedBuffer = await sharp(inputBuffer)
        .rotate()
        .resize({ width: maxWidth }) 
        .jpeg({ quality }) 
        .toBuffer();

      const maxSizeBytes = maxSizeMb * 1600 * 1600; 

      // Pokud obrázek přesahuje limit, snížíme kvalitu a opakujeme
      while (optimizedBuffer.length > maxSizeBytes && quality > 10) {
        quality -= 10; // Snížení kvality o 10
        optimizedBuffer = await sharp(inputBuffer)
          .rotate()
          .resize({ width: maxWidth }) // Zmenšení na max. šířku 1000px
          .jpeg({ quality })
          .toBuffer();
      }

      return optimizedBuffer;
    };

    const optimizedImageBuffer = await optimizeImageToMaxSize(imageBuffer, 2, 1600); 

    
    const optimizedImage = optimizedImageBuffer.toString('base64');

    return NextResponse.json({ url: `data:image/jpeg;base64,${optimizedImage}` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Chyba při optimalizaci obrázku' }, { status: 500 });
  }
}
