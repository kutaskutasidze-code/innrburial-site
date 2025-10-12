import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: 'Root',
  api_key: '278824324183366',
  api_secret: 'FYLYD8YugHI05Ilb6_YzOkuMgoM'
});

export default async function handler(req, res) {
  try {
    const result = await cloudinary.v2.api.resources({
      type: 'upload',
      prefix: 'innrburial/',
      max_results: 500
    });

    res.status(200).json(result.resources);
  } catch (error) {
    console.error('Cloudinary list error:', error);
    res.status(500).json({ error: 'Failed to list media' });
  }
}
