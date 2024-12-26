/*
  # Add Email Notifications Support
  
  1. Create notifications table for tracking email status
  2. Add policies for authenticated access
  3. Create function to send email notifications
*/

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_report_id uuid REFERENCES service_reports(id),
  email_to text NOT NULL,
  sent_at timestamptz,
  error text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users
CREATE POLICY "Authenticated users can manage notifications"
  ON notifications FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create function to send email notification
CREATE OR REPLACE FUNCTION notify_service_report()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO notifications (service_report_id, email_to)
  VALUES (NEW.id, 'lennieuwoudt@gmail.com');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to send notification on new service report
DROP TRIGGER IF EXISTS service_report_notification ON service_reports;
CREATE TRIGGER service_report_notification
  AFTER INSERT ON service_reports
  FOR EACH ROW
  EXECUTE FUNCTION notify_service_report();