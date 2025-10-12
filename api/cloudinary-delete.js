import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: 'Root',
  api_key: '278824324183366',
  api_secret: 'FYLYD8YugHI05Ilb6_YzOkuMgoM'
});

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { publicId } = req.body;

  try {
    await cloudinary.v2.uploader.destroy(publicId);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    res.status(500).json({ error: 'Failed to delete' });
  }
}
