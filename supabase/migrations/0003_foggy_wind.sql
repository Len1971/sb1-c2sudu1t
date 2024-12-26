/*
  # Create Super User Account

  1. Changes
    - Creates a super user account with email accounts@ecovest.co.za
    - Sets up initial admin permissions
    - Creates corresponding profile entry
*/

-- Create the auth user
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  role,
  aud,
  confirmation_token
)
SELECT
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'accounts@ecovest.co.za',
  crypt('Profiler1', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"is_super_admin":true}',
  now(),
  now(),
  'authenticated',
  'authenticated',
  encode(gen_random_bytes(32), 'hex')
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'accounts@ecovest.co.za'
);

-- Create corresponding profile
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
WHERE email = 'accounts@ecovest.co.za'
AND NOT EXISTS (
  SELECT 1 FROM profiles WHERE id = auth.users.id
);