-- Create storage bucket for archived reports if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('archived-reports', 'archived-reports', false)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Authenticated users can upload archived reports" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can read archived reports" ON storage.objects;

-- Create comprehensive policies for archived reports
CREATE POLICY "Authenticated users can manage archived reports"
ON storage.objects
FOR ALL
TO authenticated
USING (bucket_id = 'archived-reports')
WITH CHECK (bucket_id = 'archived-reports');

-- Ensure archived column exists and has correct default
ALTER TABLE service_reports 
ALTER COLUMN archived SET DEFAULT false;

-- Update any NULL archived values to false
UPDATE service_reports 
SET archived = false 
WHERE archived IS NULL;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_service_reports_archived_date 
ON service_reports(archived, service_date DESC);

-- Add function to archive report
CREATE OR REPLACE FUNCTION archive_service_report(report_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE service_reports
  SET 
    archived = true,
    updated_at = now()
  WHERE id = report_id;
END;
$$;