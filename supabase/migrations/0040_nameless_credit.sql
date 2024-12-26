-- Add archived column to service_reports if it doesn't exist
ALTER TABLE service_reports 
ADD COLUMN IF NOT EXISTS archived boolean DEFAULT false;

-- Add job_number column if it doesn't exist
ALTER TABLE service_reports 
ADD COLUMN IF NOT EXISTS job_number text;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_service_reports_archived 
  ON service_reports(archived);

CREATE INDEX IF NOT EXISTS idx_service_reports_job_number 
  ON service_reports(job_number);

-- Update existing records to have archived = false
UPDATE service_reports 
SET archived = false 
WHERE archived IS NULL;