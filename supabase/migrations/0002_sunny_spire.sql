/*
  # Create super user account
  
  1. Changes
    - Insert super user profile
    - Set admin role for super user
*/

-- Create the super user profile
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  role
) VALUES (
  gen_random_uuid(),
  'accounts@ecovest.co.za',
  crypt('Profiler1', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"is_super_admin":true}',
  now(),
  now(),
  'authenticated'
);

-- Insert corresponding profile
INSERT INTO profiles (
  id,
  full_name,
  created_at,
  updated_at
)
SELECT 
  id,
  'Super Admin',
  created_at,
  updated_at
FROM auth.users 
WHERE email = 'accounts@ecovest.co.za';