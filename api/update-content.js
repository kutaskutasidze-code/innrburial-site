import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, data } = req.body;

  try {
    if (type === 'text') {
      // Update text content
      const { page, selector, content } = data;
      const filePath = join(process.cwd(), `${page}.html`);
      let html = await readFile(filePath, 'utf8');
      
      // Simple replacement based on selector
      html = html.replace(new RegExp(selector, 'g'), content);
      
      await writeFile(filePath, html, 'utf8');
      res.status(200).json({ success: true });
    } else if (type === 'image') {
      // Update image
      const { filename, base64data } = data;
      const buffer = Buffer.from(base64data.split(',')[1], 'base64');
      const filePath = join(process.cwd(), 'images', filename);
      
      await writeFile(filePath, buffer);
      res.status(200).json({ success: true });
    } else if (type === 'video') {
      // Update video
      const { filename, base64data } = data;
      const buffer = Buffer.from(base64data.split(',')[1], 'base64');
      const filePath = join(process.cwd(), 'videos', filename);
      
      await writeFile(filePath, buffer);
      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Failed to update content' });
  }
}
