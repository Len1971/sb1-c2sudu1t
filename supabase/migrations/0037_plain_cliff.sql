-- Create function to safely increment job counter
CREATE OR REPLACE FUNCTION increment_job_counter()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_value jsonb;
  new_counter integer;
BEGIN
  -- Lock the row for update to prevent race conditions
  SELECT value INTO current_value
  FROM settings
  WHERE key = 'job_card_counter'
  FOR UPDATE;

  -- If no counter exists, initialize it
  IF current_value IS NULL THEN
    INSERT INTO settings (key, value)
    VALUES ('job_card_counter', '{"counter": 12500}'::jsonb)
    RETURNING value INTO current_value;
  END IF;

  -- Increment the counter
  new_counter := (current_value->>'counter')::integer + 1;

  -- Update the counter
  UPDATE settings
  SET 
    value = jsonb_build_object('counter', new_counter),
    updated_at = now()
  WHERE key = 'job_card_counter';

  -- Return the new counter value
  RETURN jsonb_build_object('counter', new_counter);
END;
$$;