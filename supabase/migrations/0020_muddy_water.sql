/*
  # Add started_at column to appointments table
  
  1. Changes
    - Add started_at timestamp column to appointments table
    - Add status constraint to ensure started_at is set when status is 'in_progress'
  
  2. Security
    - No changes to RLS policies needed
*/

-- Add started_at column
ALTER TABLE appointments 
ADD COLUMN IF NOT EXISTS started_at timestamptz;

-- Add constraint to ensure started_at is set when status is 'in_progress'
ALTER TABLE appointments
ADD CONSTRAINT status_started_at_check
CHECK (
  (status = 'in_progress' AND started_at IS NOT NULL) OR
  (status != 'in_progress')
);

-- Add constraint for valid status values
ALTER TABLE appointments
ADD CONSTRAINT valid_status
CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled'));