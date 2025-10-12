import { writeFile } from 'fs/promises';
import { join } from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { page, content } = req.body;
  
  try {
    const path = join(process.cwd(), `${page}.html`);
    await writeFile(path, content, 'utf8');
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save page' });
  }
}
