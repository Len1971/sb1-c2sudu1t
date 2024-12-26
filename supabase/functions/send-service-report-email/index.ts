import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { report } = await req.json()

    // Create email content
    const emailContent = `
      New Service Report
      
      Customer: ${report.customer.name}
      Address: ${report.customer.address}
      Technician: ${report.technician.name}
      Date: ${new Date(report.service_date).toLocaleString()}
      
      Treatment Type: ${report.treatment_type}
      
      Areas Treated:
      ${report.areas_treated.join('\n')}
      
      Products Used:
      ${report.products_used.join('\n')}
      
      Notes:
      ${report.notes || 'No additional notes'}
    `.trim()

    // Configure SMTP client
    const client = new SmtpClient({
      connection: {
        hostname: Deno.env.get('SMTP_HOST') || '',
        port: parseInt(Deno.env.get('SMTP_PORT') || '587'),
        tls: true,
        auth: {
          username: Deno.env.get('SMTP_USERNAME') || '',
          password: Deno.env.get('SMTP_PASSWORD') || '',
        },
      },
    });

    // Send email
    await client.send({
      from: Deno.env.get('SMTP_FROM') || '',
      to: 'lennieuwoudt@gmail.com',
      subject: `New Service Report - ${report.customer.name}`,
      content: emailContent,
    });

    await client.close();

    return new Response(
      JSON.stringify({ message: 'Email sent successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }
})