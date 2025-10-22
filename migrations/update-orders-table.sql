-- Updated orders table schema with all required fields
-- Run this migration to update your existing orders table

-- IMPORTANT: Backup your data first!
-- CREATE TABLE IF NOT EXISTS orders_backup AS SELECT * FROM orders;

-- Drop the old orders table if you want a fresh start
-- Or you can ALTER TABLE to add missing columns

-- Option 1: Drop and recreate (if you don't have important data)
DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  city VARCHAR(100) NOT NULL,
  address TEXT NOT NULL,
  floor VARCHAR(20) NOT NULL,
  flat VARCHAR(20) NOT NULL,
  notes TEXT,
  price DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) NOT NULL DEFAULT 'USD',
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  payment_status VARCHAR(50) DEFAULT 'pending',
  paypal_order_id VARCHAR(255),
  paypal_payer_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX idx_orders_email ON orders(email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_orders_updated_at 
BEFORE UPDATE ON orders
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();

-- Option 2: Alter existing table (if you have data to preserve)
-- Uncomment these lines if you want to keep existing data:

/*
ALTER TABLE orders ADD COLUMN IF NOT EXISTS phone VARCHAR(50);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS city VARCHAR(100);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS floor VARCHAR(20);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS flat VARCHAR(20);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS price DECIMAL(10, 2);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS currency VARCHAR(10) DEFAULT 'USD';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'pending';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT 'pending';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS paypal_order_id VARCHAR(255);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS paypal_payer_id VARCHAR(255);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Update NULL values if needed
UPDATE orders SET 
  status = 'pending' WHERE status IS NULL,
  payment_status = 'pending' WHERE payment_status IS NULL,
  currency = 'USD' WHERE currency IS NULL;
*/
