/*
  # Add pest control job configuration

  1. New Tables
    - `service_types` (for configurable service types)
      - `id` (uuid, primary key)
      - `name` (text)
      - `active` (boolean)
      - `config` (jsonb, for type-specific settings)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Create service_types table
CREATE TABLE IF NOT EXISTS service_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  active boolean DEFAULT true,
  config jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE service_types ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Authenticated users can read service types"
  ON service_types FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage service types"
  ON service_types FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default pest control service type
INSERT INTO service_types (name, config)
VALUES (
  'Pest Control',
  '{
    "areas": [
      "Kitchen",
      "Bathroom",
      "Living Room",
      "Bedroom",
      "Dining Room",
      "Garage",
      "Basement",
      "Attic",
      "Exterior Perimeter",
      "Garden",
      "Roof",
      "Other"
    ],
    "products": [
      "General Insecticide",
      "Ant Treatment",
      "Cockroach Gel",
      "Rodent Bait",
      "Spider Treatment",
      "Termite Treatment",
      "Mosquito Spray",
      "Fly Control",
      "Other"
    ]
  }'::jsonb
)
ON CONFLICT DO NOTHING;