import { jsPDF } from 'jspdf';
import { format } from 'date-fns';
import type { ServiceReport } from '../types';

export async function generatePDF(report: ServiceReport): Promise<Blob> {
  const doc = new jsPDF();
  const lineHeight = 10;
  let yPosition = 20;

  // Helper to add text and update y position
  const addLine = (text: string, fontSize = 12) => {
    doc.setFontSize(fontSize);
    doc.text(text, 20, yPosition);
    yPosition += lineHeight;
  };

  // Add header
  doc.setFontSize(20);
  doc.text('Service Report', 20, yPosition);
  yPosition += lineHeight * 2;

  // Add job number
  if (report.job_number) {
    addLine(`Job Number: ${report.job_number}`, 14);
    yPosition += lineHeight;
  }

  // Add customer details
  addLine(`Customer: ${report.customer?.name}`);
  addLine(`Address: ${report.customer?.address}`);
  addLine(`Date: ${format(new Date(report.service_date), 'PPpp')}`);
  addLine(`Treatment: ${report.treatment_type}`);
  yPosition += lineHeight;

  // Add areas treated
  addLine('Areas Treated:', 14);
  report.areas_treated.forEach(area => {
    addLine(`• ${area}`);
  });
  yPosition += lineHeight;

  // Add products used
  addLine('Products Used:', 14);
  report.products_used.forEach(product => {
    addLine(`• ${product}`);
  });
  yPosition += lineHeight;

  // Add notes if any
  if (report.notes) {
    addLine('Notes:', 14);
    const notes = report.notes.split('\n');
    notes.forEach(note => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      addLine(note);
    });
  }

  // Add technician signature
  yPosition = Math.min(yPosition + lineHeight * 2, 250);
  addLine('Technician:', 14);
  addLine(report.technician?.name || 'Unknown');

  // Add footer
  doc.setFontSize(10);
  doc.text(`Archived on ${format(new Date(), 'PPpp')}`, 20, 280);

  return doc.output('blob');
}