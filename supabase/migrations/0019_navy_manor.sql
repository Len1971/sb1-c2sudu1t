/*
  # Update appointments table for recurring schedules

  1. Changes
    - Add recurring_frequency column for scheduling patterns
    - Add recurring_start_date and recurring_end_date for permanent appointments
    - Add constraints to ensure valid data

  2. Security
    - Maintain existing RLS policies
*/

-- Add columns for recurring appointments
ALTER TABLE appointments 
ADD COLUMN IF NOT EXISTS recurring_frequency text,
ADD COLUMN IF NOT EXISTS recurring_start_date date,
ADD COLUMN IF NOT EXISTS recurring_end_date date;

-- Add constraint to ensure recurring dates are present for permanent appointments
ALTER TABLE appointments
ADD CONSTRAINT permanent_appointment_dates
CHECK (
  (appointment_type = 'permanent' AND recurring_start_date IS NOT NULL AND recurring_end_date IS NOT NULL)
  OR appointment_type = 'ad-hoc'
);

-- Add constraint for valid recurring frequencies
ALTER TABLE appointments
ADD CONSTRAINT valid_recurring_frequency
CHECK (
  recurring_frequency IN (
    'every-day',
    'every-week',
    'every-2-weeks',
    'every-month',
    'every-2-months',
    'every-3-months',
    'every-4-months',
    'every-5-months',
    'every-6-months',
    'every-year'
  )
  OR recurring_frequency IS NULL
);