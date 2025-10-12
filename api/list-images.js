import { readdir } from 'fs/promises';
import { join } from 'path';

export default async function handler(req, res) {
  try {
    const dir = join(process.cwd(), 'images');
    const files = await readdir(dir);
    const images = files.filter(f => 
      !f.startsWith('.') && 
      (f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png') || f.endsWith('.webp'))
    );
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: 'Could not list images' });
  }
}
