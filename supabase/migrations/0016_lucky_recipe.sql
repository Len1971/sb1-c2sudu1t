/*
  # Add Appointment Management Policies

  1. Security Changes
    - Add policies for authenticated users to manage appointments
    - Enable full CRUD operations for technicians on their appointments
    - Maintain existing RLS
*/

-- Enable RLS (if not already enabled)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Technicians can view their appointments" ON appointments;
DROP POLICY IF EXISTS "Technicians can manage appointments" ON appointments;

-- Create comprehensive policy for authenticated users
CREATE POLICY "Technicians can manage appointments"
ON appointments
FOR ALL
TO authenticated
USING (
  technician_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
  )
)
WITH CHECK (
  technician_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
  )
);