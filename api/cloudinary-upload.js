import formidable from 'formidable';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: 'Root',
  api_key: '278824324183366',
  api_secret: 'FYLYD8YugHI05Ilb6_YzOkuMgoM'
});

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

    try {
      const file = files.file[0];
      const folder = fields.folder[0] || 'innrburial';
      
      const result = await cloudinary.v2.uploader.upload(file.filepath, {
        folder: folder,
        resource_type: 'auto'
      });

      res.status(200).json({ 
        success: true, 
        url: result.secure_url,
        publicId: result.public_id
      });
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      res.status(500).json({ error: 'Failed to upload to Cloudinary' });
    }
  });
}
