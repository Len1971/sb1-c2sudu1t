import { supabase } from './supabase';
import { compressReport } from '../utils/compression';
import type { ServiceReport } from '../types';

export async function createServiceReport(data: Omit<ServiceReport, 'id' | 'created_at'>): Promise<ServiceReport> {
  try {
    const { data: report, error } = await supabase
      .from('service_reports')
      .insert({
        customer_id: data.customer_id,
        technician_id: data.technician_id,
        service_date: data.service_date,
        treatment_type: data.treatment_type,
        areas_treated: data.areas_treated,
        products_used: data.products_used,
        notes: data.notes,
        job_number: data.job_number
      })
      .select()
      .single();

    if (error) throw error;
    return report;
  } catch (error) {
    console.error('Error creating service report:', error);
    throw error;
  }
}

export async function getServiceReports(): Promise<ServiceReport[]> {
  try {
    const { data, error } = await supabase
      .from('service_reports')
      .select(`
        *,
        customer:customers (
          id,
          name,
          address
        ),
        technician:technicians (
          id,
          name
        )
      `)
      .eq('archived', false)
      .order('service_date', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching service reports:', error);
    throw error;
  }
}

export async function updateServiceReport(id: string, data: Partial<ServiceReport>): Promise<void> {
  try {
    const { error } = await supabase
      .from('service_reports')
      .update({
        treatment_type: data.treatment_type,
        areas_treated: data.areas_treated,
        products_used: data.products_used,
        notes: data.notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating service report:', error);
    throw error;
  }
}

export async function archiveServiceReport(report: ServiceReport): Promise<void> {
  try {
    // Generate compressed archive
    const zipBlob = await compressReport(report);
    
    // Upload to storage
    const fileName = `${report.job_number || report.id}.zip`;
    const { error: uploadError } = await supabase.storage
      .from('archived-reports')
      .upload(fileName, zipBlob, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) throw uploadError;

    // Mark as archived in database
    const { error: archiveError } = await supabase
      .rpc('archive_service_report', { report_id: report.id });

    if (archiveError) throw archiveError;
  } catch (error) {
    console.error('Error archiving service report:', error);
    throw error;
  }
}