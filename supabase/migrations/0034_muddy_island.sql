/*
  # Fix Service Reports Table Structure
  
  1. Drop and recreate service_reports table with correct relationships
  2. Add proper foreign key constraints
  3. Enable RLS and create policies
  4. Add necessary indexes
*/

-- Drop existing table and policies
DROP TABLE IF EXISTS service_reports CASCADE;

-- Create service_reports table with correct relationships
CREATE TABLE service_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES customers(id),
  technician_id uuid NOT NULL REFERENCES technicians(id),
  service_date timestamptz NOT NULL DEFAULT now(),
  treatment_type text NOT NULL,
  areas_treated text[] NOT NULL DEFAULT '{}',
  products_used text[] NOT NULL DEFAULT '{}',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE service_reports ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Authenticated users can read service reports"
  ON service_reports FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create service reports"
  ON service_reports FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes
CREATE INDEX idx_service_reports_customer 
  ON service_reports(customer_id);
CREATE INDEX idx_service_reports_technician 
  ON service_reports(technician_id);
CREATE INDEX idx_service_reports_date 
  ON service_reports(service_date);