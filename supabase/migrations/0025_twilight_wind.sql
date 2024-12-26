/*
  # Add assistants support

  1. New Tables
    - `assistants`
      - `id` (uuid, primary key)
      - `name` (text)
      - `active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Changes
    - Add `assistant_id` to appointments table
    - Add RLS policies for assistants table

  3. Data
    - Insert default assistant "Brandon"
*/

-- Create assistants table
CREATE TABLE IF NOT EXISTS assistants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add assistant_id to appointments
ALTER TABLE appointments 
ADD COLUMN IF NOT EXISTS assistant_id uuid REFERENCES assistants(id);

-- Enable RLS
ALTER TABLE assistants ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Authenticated users can read assistants"
  ON assistants FOR SELECT
  TO authenticated
  USING (true);

-- Insert default assistant
INSERT INTO assistants (name) 
SELECT 'Brandon'
WHERE NOT EXISTS (SELECT 1 FROM assistants WHERE name = 'Brandon');