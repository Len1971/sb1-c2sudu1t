-- First clean up any existing data
DO $$ 
BEGIN
  -- Delete any preferences for existing users
  DELETE FROM user_preferences 
  WHERE user_id IN (
    SELECT id FROM auth.users 
    WHERE email IN ('info@ecovest.co.za', 'info@emtac.co.za', 'info@emtact.co.za')
  );

  -- Delete any identities
  DELETE FROM auth.identities 
  WHERE user_id IN (
    SELECT id FROM auth.users 
    WHERE email IN ('info@ecovest.co.za', 'info@emtac.co.za', 'info@emtact.co.za')
  );

  -- Delete profiles
  DELETE FROM profiles 
  WHERE id IN (
    SELECT id FROM auth.users 
    WHERE email IN ('info@ecovest.co.za', 'info@emtac.co.za', 'info@emtact.co.za')
  );

  -- Delete users
  DELETE FROM auth.users 
  WHERE email IN ('info@ecovest.co.za', 'info@emtac.co.za', 'info@emtact.co.za');

  -- Now create the new superuser if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'accounts@ecovest.co.za') THEN
    WITH new_user AS (
      INSERT INTO auth.users (
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
        '00000000-0000-0000-0000-000000000000',
        'accounts@ecovest.co.za',
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
      ) RETURNING id
    )
    -- Create profile for the new user
    INSERT INTO profiles (
      id,
      full_name,
      created_at,
      updated_at
    )
    SELECT 
      id,
      'Super Admin',
      now(),
      now()
    FROM new_user;
  END IF;
END $$;