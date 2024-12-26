/*
  # Service Reports Table Updates
  
  1. Drop existing policies first to avoid conflicts
  2. Ensure table structure is correct
  3. Recreate policies with proper permissions
  4. Add necessary indexes
*/

-- First drop existing policies if they exist
DROP POLICY IF EXISTS "Authenticated users can read service reports" ON service_reports;
DROP POLICY IF EXISTS "Authenticated users can create service reports" ON service_reports;

-- Ensure table has correct structure
DO $$ 
BEGIN
  -- Add any missing columns or modify existing ones
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'service_reports' AND column_name = 'areas_treated'
  ) THEN
    ALTER TABLE service_reports ADD COLUMN areas_treated text[] NOT NULL DEFAULT '{}';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'service_reports' AND column_name = 'products_used'
  ) THEN
    ALTER TABLE service_reports ADD COLUMN products_used text[] NOT NULL DEFAULT '{}';
  END IF;
END $$;

-- Recreate policies
CREATE POLICY "Authenticated users can read service reports"
  ON service_reports FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create service reports"
  ON service_reports FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Ensure indexes exist
CREATE INDEX IF NOT EXISTS idx_service_reports_customer 
  ON service_reports(customer_id);
CREATE INDEX IF NOT EXISTS idx_service_reports_technician 
  ON service_reports(technician_id);
CREATE INDEX IF NOT EXISTS idx_service_reports_date 
  ON service_reports(service_date);