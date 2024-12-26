-- Create service_reports table
CREATE TABLE IF NOT EXISTS service_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) NOT NULL,
  technician_id uuid REFERENCES technicians(id) NOT NULL,
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
CREATE INDEX IF NOT EXISTS idx_service_reports_customer 
  ON service_reports(customer_id);
CREATE INDEX IF NOT EXISTS idx_service_reports_technician 
  ON service_reports(technician_id);
CREATE INDEX IF NOT EXISTS idx_service_reports_date 
  ON service_reports(service_date);