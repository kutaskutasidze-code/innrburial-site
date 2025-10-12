import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { settings } = req.body;

  try {
    // Create table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id SERIAL PRIMARY KEY,
        key VARCHAR(255) UNIQUE NOT NULL,
        value TEXT,
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Save each setting
    for (const [key, value] of Object.entries(settings)) {
      await pool.query(
        `INSERT INTO site_settings (key, value, updated_at) 
         VALUES ($1, $2, NOW())
         ON CONFLICT (key) 
         DO UPDATE SET value = $2, updated_at = NOW()`,
        [key, value]
      );
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({ error: 'Failed to save settings' });
  }
}
