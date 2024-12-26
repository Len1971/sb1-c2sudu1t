-- First clean up any existing data
DO $$ 
BEGIN
  -- Delete any preferences for existing users
  DELETE FROM user_preferences 
  WHERE user_id IN (
    SELECT id FROM auth.users 
    WHERE email IN ('info@ecovest.co.za', 'info@emtact.co.za', 'info@emtac.co.za')
  );

  -- Delete any identities
  DELETE FROM auth.identities 
  WHERE user_id IN (
    SELECT id FROM auth.users 
    WHERE email IN ('info@ecovest.co.za', 'info@emtact.co.za', 'info@emtac.co.za')
  );

  -- Delete profiles
  DELETE FROM profiles 
  WHERE id IN (
    SELECT id FROM auth.users 
    WHERE email IN ('info@ecovest.co.za', 'info@emtact.co.za', 'info@emtac.co.za')
  );

  -- Delete users
  DELETE FROM auth.users 
  WHERE email IN ('info@ecovest.co.za', 'info@emtact.co.za', 'info@emtac.co.za');
END $$;