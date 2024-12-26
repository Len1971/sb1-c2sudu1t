/*
  # Fix Authentication Setup

  1. Changes
    - Remove any existing user creation attempts
    - Ensure proper table structure
    - Set up correct RLS policies
    
  2. Security
    - Enable RLS on all tables
    - Add proper authentication policies
*/

-- First, ensure the profiles table exists with correct structure
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  phone_number text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Ensure policies exist
DO $$ 
BEGIN
    -- Delete any existing policies to avoid conflicts
    DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
    DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
    
    -- Create new policies
    CREATE POLICY "Users can read own profile"
        ON profiles FOR SELECT
        TO authenticated
        USING (id = auth.uid());

    CREATE POLICY "Users can update own profile"
        ON profiles FOR UPDATE
        TO authenticated
        USING (id = auth.uid())
        WITH CHECK (id = auth.uid());

    CREATE POLICY "Users can insert own profile"
        ON profiles FOR INSERT
        TO authenticated
        WITH CHECK (id = auth.uid());
END $$;