-- Remove old admin user if exists
DO $$ 
BEGIN
  -- Delete the profile first (if it exists)
  DELETE FROM profiles 
  WHERE id IN (
    SELECT id 
    FROM auth.users 
    WHERE email = 'accounts@ecovest.co.za'
  );

  -- Then delete the user from auth.users
  DELETE FROM auth.users 
  WHERE email = 'accounts@ecovest.co.za';
END $$;

-- Create new admin user with updated email
DO $$ 
BEGIN
  -- Create admin user if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM auth.users WHERE email = 'info@emtac.co.za'
  ) THEN
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
      gen_random_uuid(),
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
  END IF;

  -- Create corresponding profile
  INSERT INTO profiles (
    id,
    full_name,
    created_at,
    updated_at
  )
  SELECT 
    id,
    'Admin User',
    created_at,
    updated_at
  FROM auth.users 
  WHERE email = 'info@emtac.co.za'
  AND NOT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.users.id
  );
END $$;