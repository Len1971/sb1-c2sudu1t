-- First clean up any existing data
DO $$ 
BEGIN
  -- Delete any preferences for existing users
  DELETE FROM user_preferences 
  WHERE user_id IN (
    SELECT id FROM auth.users 
    WHERE email IN ('info@emtac.co.za', 'info@emtact.co.za')
  );

  -- Delete any identities
  DELETE FROM auth.identities 
  WHERE user_id IN (
    SELECT id FROM auth.users 
    WHERE email IN ('info@emtac.co.za', 'info@emtact.co.za')
  );

  -- Delete profiles
  DELETE FROM profiles 
  WHERE id IN (
    SELECT id FROM auth.users 
    WHERE email IN ('info@emtac.co.za', 'info@emtact.co.za')
  );

  -- Delete users
  DELETE FROM auth.users 
  WHERE email IN ('info@emtac.co.za', 'info@emtact.co.za');
END $$;

-- Create new superuser
DO $$ 
DECLARE
  new_user_id uuid := gen_random_uuid();
BEGIN
  -- Insert user
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
    confirmation_token,
    recovery_token,
    last_sign_in_at,
    is_super_admin
  ) VALUES (
    new_user_id,
    '00000000-0000-0000-0000-000000000000',
    'info@ecovest.co.za',
    crypt('Admin123!', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"is_super_admin":true}',
    now(),
    now(),
    'authenticated',
    'authenticated',
    encode(gen_random_bytes(32), 'hex'),
    encode(gen_random_bytes(32), 'hex'),
    now(),
    true
  );

  -- Create profile
  INSERT INTO profiles (
    id,
    full_name,
    created_at,
    updated_at
  ) VALUES (
    new_user_id,
    'Admin User',
    now(),
    now()
  );

  -- Create identity
  INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    provider_id,
    last_sign_in_at,
    created_at,
    updated_at
  ) VALUES (
    new_user_id,
    new_user_id,
    jsonb_build_object(
      'sub', new_user_id::text,
      'email', 'info@ecovest.co.za'
    ),
    'email',
    'info@ecovest.co.za',
    now(),
    now(),
    now()
  );

  -- Set up initial preferences
  INSERT INTO user_preferences (
    user_id,
    default_date_range,
    default_appointment_type
  ) VALUES (
    new_user_id,
    'today',
    ''
  );
END $$;