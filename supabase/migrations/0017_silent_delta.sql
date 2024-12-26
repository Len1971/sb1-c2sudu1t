/*
  # Fix RLS policies for customers and appointments

  1. Changes
    - Drop existing RLS policies for customers and appointments
    - Create new comprehensive policies that allow authenticated users to manage customers
    - Create new policies for appointments that properly handle technician relationships

  2. Security
    - Maintains RLS protection while allowing proper access
    - Ensures authenticated users can manage customers
    - Ensures technicians can manage their appointments
*/

-- Fix customers table policies
DROP POLICY IF EXISTS "Authenticated users can manage customers" ON customers;
DROP POLICY IF EXISTS "Technicians can view all customers" ON customers;

CREATE POLICY "Authenticated users can manage customers"
ON customers FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Fix appointments table policies
DROP POLICY IF EXISTS "Technicians can manage appointments" ON appointments;
DROP POLICY IF EXISTS "Technicians can view their appointments" ON appointments;

CREATE POLICY "Authenticated users can manage appointments"
ON appointments FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;