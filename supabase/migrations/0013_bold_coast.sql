/*
  # Create storage bucket for favicons and logos

  1. New Storage Bucket
    - `branding` bucket for storing favicons and logos
  
  2. Security
    - Enable public access for reading branding files
    - Restrict uploads to authenticated users
*/

-- Create the storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('branding', 'branding', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to branding files
CREATE POLICY "Branding files are publicly accessible"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'branding');

-- Allow authenticated users to upload branding files
CREATE POLICY "Users can upload branding files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'branding');