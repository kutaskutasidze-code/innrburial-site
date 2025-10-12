import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export default async function handler(req, res) {
  try {
    const result = await pool.query('SELECT key, value FROM site_settings');
    
    const settings = {};
    result.rows.forEach(row => {
      settings[row.key] = row.value;
    });

    res.status(200).json(settings);
  } catch (error) {
    res.status(200).json({});
  }
}
