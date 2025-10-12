import { writeFile } from 'fs/promises';
import { join } from 'path';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Upload failed' });
    }

    const type = fields.type[0]; // 'images' or 'videos'
    const uploadedFiles = Array.isArray(files.files) ? files.files : [files.files];

    try {
      for (const file of uploadedFiles) {
        const data = await readFile(file.filepath);
        const filename = file.originalFilename;
        const path = join(process.cwd(), type, filename);
        await writeFile(path, data);
      }

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save files' });
    }
  });
}
