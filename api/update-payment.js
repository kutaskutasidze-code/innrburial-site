import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { orderId, paypalOrderId, paypalPayerId, paymentStatus, status } = req.body;

  if (!orderId) {
    return res.status(400).json({ error: 'Order ID is required' });
  }

  try {
    const result = await pool.query(
      `UPDATE orders 
       SET paypal_order_id = $1, 
           paypal_payer_id = $2, 
           payment_status = $3, 
           status = $4,
           updated_at = NOW()
       WHERE id = $5
       RETURNING id`,
      [paypalOrderId, paypalPayerId, paymentStatus, status, orderId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json({ 
      success: true, 
      orderId: result.rows[0].id 
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to update payment' });
  }
}
