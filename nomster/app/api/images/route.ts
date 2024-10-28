import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const directoryPath = path.join(process.cwd(), 'public/Pixeltiers_16x16_Food_Pack_V4/Meals');
  
  try {
    const files = fs.readdirSync(directoryPath);
    const images = files.filter(file => /\.(png|jpe?g|svg)$/.test(file));
    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: 'Unable to scan directory' }, { status: 500 });
  }
}
