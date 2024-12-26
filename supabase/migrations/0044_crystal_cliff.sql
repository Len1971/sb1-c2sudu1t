-- First clean up any references in user_preferences
DO $$ 
BEGIN
  -- Delete any preferences for the users we want to remove
  DELETE FROM user_preferences 
  WHERE user_id IN (
    SELECT id 
    FROM auth.users 
    WHERE email IN ('accounts@ecovest.co.za', 'info@emtac.co.za')
  );

  -- Delete the profiles
  DELETE FROM profiles 
  WHERE id IN (
    SELECT id 
    FROM auth.users 
    WHERE email IN ('accounts@ecovest.co.za', 'info@emtac.co.za')
  );

  -- Finally delete the users
  DELETE FROM auth.users 
  WHERE email IN ('accounts@ecovest.co.za', 'info@emtac.co.za');
END $$;

-- Create new admin user
DO $$ 
DECLARE
  new_user_id uuid := gen_random_uuid();
BEGIN
  -- Insert the user with proper auth setup
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
    'info@emtac.co.za',
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

  -- Create corresponding profile
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

  -- Create auth identity with provider_id
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
    jsonb_build_object('sub', new_user_id::text, 'email', 'info@emtac.co.za'),
    'email',
    'info@emtac.co.za',  -- Use email as provider_id for email provider
    now(),
    now(),
    now()
  );
END $$;