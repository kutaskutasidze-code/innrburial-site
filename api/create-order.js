import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, city, address, floor, flat, notes, price, currency } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO orders (name, email, phone, city, address, floor, flat, notes, price, currency, status, created_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW()) 
       RETURNING id`,
      [name, email, phone, city, address, floor, flat, notes, price, currency, 'pending']
    );

    res.status(200).json({ 
      success: true, 
      orderId: result.rows[0].id 
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
}
