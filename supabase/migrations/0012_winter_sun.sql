/*
  # Create storage bucket for media files

  1. New Storage Bucket
    - `media` bucket for storing images and other media files
  
  2. Security
    - Enable public access for reading media files
    - Restrict uploads to authenticated users
*/

-- Create the storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to media files
CREATE POLICY "Media files are publicly accessible"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'media');

-- Allow authenticated users to upload media files
CREATE POLICY "Users can upload media files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');