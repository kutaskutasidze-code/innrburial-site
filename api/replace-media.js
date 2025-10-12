import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import formidable from 'formidable';
import { readFile } from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Upload failed' });
    }

    const type = fields.type[0];
    const oldFileName = fields.oldFileName[0];
    const newFile = files.file[0];

    try {
      const data = await readFile(newFile.filepath);
      const newPath = join(process.cwd(), type, oldFileName);
      await writeFile(newPath, data);

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to replace file' });
    }
  });
}
