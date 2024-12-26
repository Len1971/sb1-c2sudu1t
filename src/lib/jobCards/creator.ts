import { supabase } from '../supabase';
import { getNextJobCardNumber } from '../jobCards';
import type { JobCardData } from '../../types/jobCards';

export async function createJobCardsFromExcel(data: JobCardData[]) {
  const results = [];

  for (const card of data) {
    try {
      // First create or get customer
      const { data: customer } = await supabase
        .from('customers')
        .select('id')
        .eq('name', card.customer)
        .eq('address', card.address)
        .single();

      let customerId;
      if (customer) {
        customerId = customer.id;
      } else {
        const { data: newCustomer } = await supabase
          .from('customers')
          .insert({
            name: card.customer,
            address: card.address
          })
          .select('id')
          .single();
        customerId = newCustomer?.id;
      }

      // Get job number
      const jobNumber = await getNextJobCardNumber();

      // Create service report
      const { data: report, error } = await supabase
        .from('service_reports')
        .insert({
          customer_id: customerId,
          service_date: card.date || new Date().toISOString(),
          treatment_type: card.serviceType,
          areas_treated: card.areas,
          products_used: card.products,
          notes: card.notes,
          job_number: jobNumber
        })
        .select()
        .single();

      if (error) throw error;
      results.push(report);
    } catch (error) {
      console.error('Error creating job card:', error);
      throw error;
    }
  }

  return results;
}