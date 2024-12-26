/*
  # Fix appointments table structure and permissions

  1. Changes
    - Ensure appointments table has correct structure
    - Update RLS policies for proper access
    - Add missing indexes
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can manage appointments" ON appointments;

-- Recreate appointments table with correct structure
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) NOT NULL,
  technician_id uuid REFERENCES technicians(id) NOT NULL,
  assistant_id uuid REFERENCES assistants(id),
  scheduled_time timestamptz NOT NULL,
  service_type text NOT NULL,
  status text NOT NULL DEFAULT 'scheduled',
  appointment_type text NOT NULL DEFAULT 'ad-hoc',
  notes text,
  recurring_frequency text,
  recurring_start_date timestamptz,
  recurring_end_date timestamptz,
  started_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_status CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  CONSTRAINT valid_appointment_type CHECK (appointment_type IN ('ad-hoc', 'permanent'))
);

-- Enable RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create comprehensive policy for authenticated users
CREATE POLICY "Authenticated users can manage appointments"
ON appointments FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_appointments_customer ON appointments(customer_id);
CREATE INDEX IF NOT EXISTS idx_appointments_technician ON appointments(technician_id);
CREATE INDEX IF NOT EXISTS idx_appointments_scheduled_time ON appointments(scheduled_time);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);