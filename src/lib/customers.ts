import { supabase } from './supabase';
import type { Customer } from '../types';

export async function createCustomer(data: Omit<Customer, 'id' | 'notes'>) {
  const { data: customer, error } = await supabase
    .from('customers')
    .insert({
      name: data.name,
      address: data.address,
      phone: data.phone,
      email: data.email
    })
    .select()
    .single();

  if (error) throw error;
  return customer;
}