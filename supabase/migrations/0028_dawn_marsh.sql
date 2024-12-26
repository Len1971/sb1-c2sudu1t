/*
  # Fix recurring appointment constraints

  1. Updates
    - Update valid_recurring_frequency constraint to include first weekday options
    - Add constraint to ensure recurring dates are present for permanent appointments
    - Add constraint for valid appointment status values

  2. Changes
    - Modifies existing constraints to be more precise
    - Ensures data consistency for recurring appointments
*/

-- Drop existing constraints
ALTER TABLE appointments 
DROP CONSTRAINT IF EXISTS valid_recurring_frequency,
DROP CONSTRAINT IF EXISTS permanent_appointment_dates,
DROP CONSTRAINT IF EXISTS valid_status;

-- Add updated constraints
ALTER TABLE appointments
ADD CONSTRAINT valid_recurring_frequency
CHECK (
  recurring_frequency IN (
    'every-day',
    'every-week',
    'every-2-weeks',
    'every-month',
    'first-monday-of-month',
    'first-tuesday-of-month',
    'first-wednesday-of-month',
    'first-thursday-of-month',
    'first-friday-of-month',
    'every-2-months',
    'every-3-months',
    'every-4-months',
    'every-5-months',
    'every-6-months',
    'every-year'
  )
  OR recurring_frequency IS NULL
);

-- Ensure recurring dates are present for permanent appointments
ALTER TABLE appointments
ADD CONSTRAINT permanent_appointment_dates
CHECK (
  (appointment_type = 'permanent' AND recurring_frequency IS NOT NULL)
  OR appointment_type = 'ad-hoc'
);

-- Add constraint for valid status values
ALTER TABLE appointments
ADD CONSTRAINT valid_status
CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled'));