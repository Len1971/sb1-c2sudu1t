/*
  # Add started_at column and status constraints
  
  1. Changes
    - Add started_at timestamp column to appointments table
    - Add constraint to ensure started_at is set when status is 'in_progress'
    - Add constraint for valid status values
  
  2. Security
    - No changes to RLS policies needed
*/

-- Add started_at column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'appointments' AND column_name = 'started_at'
  ) THEN
    ALTER TABLE appointments 
    ADD COLUMN started_at timestamptz;
  END IF;
END $$;

-- Add or update constraints
DO $$ 
BEGIN
  -- Drop existing constraints if they exist
  ALTER TABLE appointments DROP CONSTRAINT IF EXISTS status_started_at_check;
  ALTER TABLE appointments DROP CONSTRAINT IF EXISTS valid_status;

  -- Add constraints
  ALTER TABLE appointments
  ADD CONSTRAINT status_started_at_check
  CHECK (
    (status = 'in_progress' AND started_at IS NOT NULL) OR
    (status != 'in_progress')
  );

  ALTER TABLE appointments
  ADD CONSTRAINT valid_status
  CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled'));
END $$;