/*
  # Initial Schema Setup for PestFlow

  1. New Tables
    - `profiles`
      - Extends auth.users with additional user information
      - Stores technician profiles
    - `customers`
      - Stores customer information
    - `service_reports`
      - Records of completed services
    - `appointments`
      - Scheduled service appointments

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  phone_number text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  phone text,
  email text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create service_reports table
CREATE TABLE IF NOT EXISTS service_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id),
  technician_id uuid REFERENCES profiles(id),
  service_date timestamptz DEFAULT now(),
  treatment_type text NOT NULL,
  areas_treated text[],
  products_used text[],
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id),
  technician_id uuid REFERENCES profiles(id),
  scheduled_time timestamptz NOT NULL,
  service_type text NOT NULL,
  status text DEFAULT 'scheduled',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Technicians can view all customers"
  ON customers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Technicians can view their appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (technician_id = auth.uid());

CREATE POLICY "Technicians can view their service reports"
  ON service_reports FOR SELECT
  TO authenticated
  USING (technician_id = auth.uid());

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_appointments_technician_scheduled 
  ON appointments(technician_id, scheduled_time);

CREATE INDEX IF NOT EXISTS idx_service_reports_technician_date 
  ON service_reports(technician_id, service_date);