export interface JobCardData {
  customer: string;
  address: string;
  serviceType: string;
  areas: string[];
  products: string[];
  notes?: string;
  date?: string;
}

export interface JobCardCreationResult {
  success: boolean;
  message: string;
  data?: any;
}