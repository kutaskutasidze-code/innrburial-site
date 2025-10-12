import { readdir } from 'fs/promises';
import { join } from 'path';

export default async function handler(req, res) {
  try {
    const dir = join(process.cwd(), 'videos');
    const files = await readdir(dir);
    const videos = files.filter(f => 
      !f.startsWith('.') && 
      (f.endsWith('.mp4') || f.endsWith('.mov') || f.endsWith('.webm'))
    );
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Could not list videos' });
  }
}
