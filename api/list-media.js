import { readdir } from 'fs/promises';
import { join } from 'path';

export default async function handler(req, res) {
  const { type } = req.query; // 'images' or 'videos'
  
  try {
    const dir = join(process.cwd(), type);
    const files = await readdir(dir);
    res.status(200).json(files.filter(f => !f.startsWith('.')));
  } catch (error) {
    res.status(500).json({ error: 'Could not list files' });
  }
}
