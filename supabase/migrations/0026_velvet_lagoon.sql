/*
  # Fix appointments technician constraint

  1. Changes
    - Remove old foreign key constraint to profiles table
    - Update technician_id to reference technicians table
    - Add NOT NULL constraint to technician_id
  
  2. Data Migration
    - Ensure existing appointments have valid technician IDs
*/

-- First, drop the existing foreign key constraint if it exists
ALTER TABLE appointments
DROP CONSTRAINT IF EXISTS appointments_technician_id_fkey;

-- Update the technician_id column to reference the technicians table
ALTER TABLE appointments
ADD CONSTRAINT appointments_technician_id_fkey
FOREIGN KEY (technician_id) REFERENCES technicians(id);

-- Make technician_id required
ALTER TABLE appointments
ALTER COLUMN technician_id SET NOT NULL;