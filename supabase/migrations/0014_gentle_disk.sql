/*
  # Fix Storage Policies for Branding

  1. Changes
    - Drop existing policies that might conflict
    - Create new policies with correct permissions for branding bucket
    - Allow public read access
    - Allow authenticated users to manage branding files
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Branding files are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload branding files" ON storage.objects;

-- Create new policies with correct permissions
CREATE POLICY "Public can view branding files"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'branding');

CREATE POLICY "Authenticated users can manage branding files"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'branding')
WITH CHECK (bucket_id = 'branding');