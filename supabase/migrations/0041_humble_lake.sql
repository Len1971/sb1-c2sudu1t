-- Create storage bucket for archived reports if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('archived-reports', 'archived-reports', false)
ON CONFLICT (id) DO NOTHING;

-- Create policy for authenticated users to upload archived reports
CREATE POLICY "Authenticated users can upload archived reports"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'archived-reports');

-- Create policy for authenticated users to read archived reports
CREATE POLICY "Authenticated users can read archived reports"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'archived-reports');