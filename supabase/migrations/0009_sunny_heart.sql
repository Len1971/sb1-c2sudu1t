/*
  # Delete Specific User

  1. Changes
    - Remove user lennieuwoudt@gmail.com and associated profile
    
  2. Security
    - Safely remove user data while maintaining referential integrity
*/

DO $$ 
BEGIN
  -- Delete the profile first (if it exists)
  DELETE FROM profiles 
  WHERE id IN (
    SELECT id 
    FROM auth.users 
    WHERE email = 'lennieuwoudt@gmail.com'
  );

  -- Then delete the user from auth.users
  DELETE FROM auth.users 
  WHERE email = 'lennieuwoudt@gmail.com';
END $$;