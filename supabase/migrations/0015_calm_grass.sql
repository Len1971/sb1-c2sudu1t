/*
  # Add Customer Management Policies

  1. Security Changes
    - Add policies for authenticated users to manage customers
    - Enable full CRUD operations for authenticated users
    - Maintain existing RLS
*/

-- Enable RLS (if not already enabled)
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Technicians can view all customers" ON customers;
DROP POLICY IF EXISTS "Technicians can manage customers" ON customers;

-- Create comprehensive policy for authenticated users
CREATE POLICY "Authenticated users can manage customers"
ON customers
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);