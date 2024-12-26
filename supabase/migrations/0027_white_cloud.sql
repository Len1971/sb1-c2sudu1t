-- Drop existing foreign key constraint if it exists
ALTER TABLE appointments
DROP CONSTRAINT IF EXISTS appointments_technician_id_fkey;

-- Make sure technician_id exists and is NOT NULL
ALTER TABLE appointments
ALTER COLUMN technician_id SET NOT NULL;

-- Add the foreign key constraint back
ALTER TABLE appointments
ADD CONSTRAINT appointments_technician_id_fkey
FOREIGN KEY (technician_id) REFERENCES technicians(id)
ON DELETE RESTRICT
ON UPDATE CASCADE;