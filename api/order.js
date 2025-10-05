const nodemailer = require('nodemailer');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, bookType, address, phone } = req.body;

    if (!name || !email || !bookType) {
      return res.status(400).json({ error: 'Name, email, and book type are required' });
    }

    // Initialize table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        book_type VARCHAR(100) NOT NULL,
        address TEXT,
        phone VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Save to database
    const result = await pool.query(
      'INSERT INTO orders (name, email, book_type, address, phone) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [name, email, bookType, address || null, phone || null]
    );

    // Send confirmation email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Order Confirmation - INNRBURIAL',
      html: `
        <h2>Thank you for your order!</h2>
        <p>Hi ${name},</p>
        <p>We've received your order for: <strong>${bookType}</strong></p>
        <p>We'll be in touch soon with shipping details.</p>
        <br>
        <p>Best regards,<br>The INNRBURIAL Team</p>
      `
    });

    // Notify admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Book Order: ${bookType}`,
      html: `
        <h2>New Book Order</h2>
        <p><strong>Customer:</strong> ${name} (${email})</p>
        <p><strong>Book:</strong> ${bookType}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Address:</strong> ${address || 'Not provided'}</p>
      `
    });

    res.json({ 
      success: true, 
      message: 'Order placed successfully',
      orderId: result.rows[0].id 
    });

  } catch (error) {
    console.error('Order error:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
};
