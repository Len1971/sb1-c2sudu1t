/*
  # Add technician management
  
  1. Changes
    - Drop existing policy if it exists to avoid conflicts
    - Re-create technicians table with proper structure
    - Add technician_id reference to appointments
    - Set up RLS and policies
    - Insert default technicians
*/

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Authenticated users can read technicians" ON technicians;

-- Create technicians table
CREATE TABLE IF NOT EXISTS technicians (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add technician_id to appointments if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'appointments' AND column_name = 'technician_id'
  ) THEN
    ALTER TABLE appointments 
    ADD COLUMN technician_id uuid REFERENCES technicians(id);
  END IF;
END $$;

-- Enable RLS
ALTER TABLE technicians ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Authenticated users can read technicians"
  ON technicians FOR SELECT
  TO authenticated
  USING (true);

-- Insert default technicians if they don't exist
INSERT INTO technicians (name) 
SELECT 'Anton'
WHERE NOT EXISTS (SELECT 1 FROM technicians WHERE name = 'Anton');

INSERT INTO technicians (name) 
SELECT 'Juavaun'
WHERE NOT EXISTS (SELECT 1 FROM technicians WHERE name = 'Juavaun');