-- Initialize job card counter if it doesn't exist
DO $$ 
BEGIN
  -- First check if the settings table exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables WHERE tablename = 'settings'
  ) THEN
    -- Create settings table
    CREATE TABLE settings (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      key text UNIQUE NOT NULL,
      value jsonb NOT NULL,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    );

    -- Enable RLS
    ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

    -- Create policies
    CREATE POLICY "Authenticated users can read settings"
      ON settings FOR SELECT
      TO authenticated
      USING (true);

    CREATE POLICY "Authenticated users can manage settings"
      ON settings FOR ALL
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;

  -- Insert initial job card counter if it doesn't exist
  INSERT INTO settings (key, value)
  VALUES ('job_card_counter', '{"counter": 12499}'::jsonb)
  ON CONFLICT (key) DO NOTHING;
END $$;