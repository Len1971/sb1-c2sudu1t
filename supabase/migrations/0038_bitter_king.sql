-- Add archived column to service_reports
ALTER TABLE service_reports
ADD COLUMN IF NOT EXISTS archived boolean DEFAULT false;

-- Add job_number column to service_reports
ALTER TABLE service_reports
ADD COLUMN IF NOT EXISTS job_number text;

-- Create index for archived flag
CREATE INDEX IF NOT EXISTS idx_service_reports_archived 
  ON service_reports(archived);

-- Create index for job number
CREATE INDEX IF NOT EXISTS idx_service_reports_job_number 
  ON service_reports(job_number);