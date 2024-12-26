/*
  # Add appointment type to appointments table

  1. Changes
    - Add appointment_type column to appointments table
    - Update existing appointments to have a default type
    - Make appointment_type required for future entries

  2. Security
    - No changes to RLS policies needed
*/

-- Add appointment_type column with temporary NULL allowance
ALTER TABLE appointments 
ADD COLUMN IF NOT EXISTS appointment_type text;

-- Set default value for existing records
UPDATE appointments 
SET appointment_type = 'ad-hoc' 
WHERE appointment_type IS NULL;

-- Make the column required for future entries
ALTER TABLE appointments 
ALTER COLUMN appointment_type SET NOT NULL,
ALTER COLUMN appointment_type SET DEFAULT 'ad-hoc';

-- Add constraint to ensure valid types
ALTER TABLE appointments
ADD CONSTRAINT valid_appointment_type
CHECK (appointment_type IN ('ad-hoc', 'permanent'));