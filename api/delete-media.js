import { unlink } from 'fs/promises';
import { join } from 'path';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, fileName } = req.body;
  
  try {
    const filePath = join(process.cwd(), type, fileName);
    await unlink(filePath);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete file' });
  }
}
