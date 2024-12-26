import { supabase } from './supabase';

export async function sendServiceReportEmail(reportId: string) {
  try {
    const { data: report } = await supabase
      .from('service_reports')
      .select(`
        *,
        customer:customers (
          name,
          address
        ),
        technician:technicians (
          name
        )
      `)
      .eq('id', reportId)
      .single();

    if (!report) {
      throw new Error('Service report not found');
    }

    // Send email using Supabase Edge Functions
    const { error } = await supabase.functions.invoke('send-service-report-email', {
      body: { report }
    });

    if (error) throw error;

    // Update notification status
    await supabase
      .from('notifications')
      .update({ 
        sent_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('service_report_id', reportId);

  } catch (error) {
    console.error('Error sending service report email:', error);
    
    // Update notification with error
    await supabase
      .from('notifications')
      .update({ 
        error: error instanceof Error ? error.message : 'Failed to send email',
        updated_at: new Date().toISOString()
      })
      .eq('service_report_id', reportId);

    throw error;
  }
}