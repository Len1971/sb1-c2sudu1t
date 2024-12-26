/*
  # Delete admin user

  1. Changes
    - Delete user with email 'admin@ecovest.co./za'
    - Delete user with email 'admin@ecovest.co.za' (corrected version)
    - Remove associated profile entries
*/

DO $$ 
BEGIN
  -- Delete profiles first (if they exist)
  DELETE FROM profiles 
  WHERE id IN (
    SELECT id 
    FROM auth.users 
    WHERE email IN ('admin@ecovest.co./za', 'admin@ecovest.co.za')
  );

  -- Then delete the users from auth.users
  DELETE FROM auth.users 
  WHERE email IN ('admin@ecovest.co./za', 'admin@ecovest.co.za');
END $$;