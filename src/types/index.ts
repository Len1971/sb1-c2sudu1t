export interface ServiceReport {
  id: string;
  appointment_id?: string;
  customer_id: string;
  technician_id: string;
  service_date: string;
  treatment_type: string;
  areas_treated: string[];
  products_used: string[];
  notes?: string;
  job_number?: string;
  archived?: boolean;
  created_at?: string;
  customer?: {
    id: string;
    name: string;
    address: string;
  };
  technician?: {
    id: string;
    name: string;
  };
  appointment?: {
    id: string;
    service_type: string;
  };
}