/*
  # Add technician assignment support
  
  1. New Tables
    - `technicians`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `active` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Changes
    - Add `technician_id` to appointments table
    - Add foreign key constraint
    
  3. Security
    - Enable RLS on technicians table
    - Add policies for authenticated users
*/

-- Create technicians table
CREATE TABLE IF NOT EXISTS technicians (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add technician_id to appointments
ALTER TABLE appointments 
ADD COLUMN IF NOT EXISTS technician_id uuid REFERENCES technicians(id);

-- Enable RLS
ALTER TABLE technicians ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Authenticated users can read technicians"
  ON technicians FOR SELECT
  TO authenticated
  USING (true);

-- Insert default technicians
INSERT INTO technicians (name) VALUES
  ('Anton'),
  ('Juavaun')
ON CONFLICT DO NOTHING;