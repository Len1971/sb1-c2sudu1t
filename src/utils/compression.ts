import JSZip from 'jszip';
import { format } from 'date-fns';
import { generatePDF } from './pdfGenerator';
import type { ServiceReport } from '../types';

export async function compressReport(report: ServiceReport): Promise<Blob> {
  const zip = new JSZip();
  
  // Generate PDF
  const pdfBlob = await generatePDF(report);
  
  // Add PDF to zip
  const pdfFileName = `${report.job_number || report.id}.pdf`;
  zip.file(pdfFileName, pdfBlob);

  // Add metadata JSON
  const metadata = {
    jobNumber: report.job_number,
    customer: report.customer?.name,
    date: format(new Date(report.service_date), 'yyyy-MM-dd'),
    technician: report.technician?.name,
    treatmentType: report.treatment_type,
    areasTreated: report.areas_treated,
    productsUsed: report.products_used,
    notes: report.notes,
    archivedAt: new Date().toISOString()
  };
  
  zip.file('metadata.json', JSON.stringify(metadata, null, 2));

  // Generate zip file
  return await zip.generateAsync({ type: 'blob' });
}