import { format } from 'date-fns';
import jsPDF from 'jspdf';
import type { ServiceReport } from '../types';

export function saveReportToPDF(report: ServiceReport) {
  const doc = new jsPDF();
  const lineHeight = 10;
  let yPosition = 20;

  // Helper to add text and update y position
  const addLine = (text: string, fontSize = 12) => {
    doc.setFontSize(fontSize);
    doc.text(text, 20, yPosition);
    yPosition += lineHeight;
  };

  // Add company header
  doc.setFontSize(20);
  doc.text('ECOVEST', 20, yPosition);
  yPosition += lineHeight * 2;

  // Add report title
  doc.setFontSize(16);
  doc.text('Service Report', 20, yPosition);
  yPosition += lineHeight * 1.5;

  // Add customer details
  addLine(`Customer: ${report.customer?.name}`);
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
    // Split notes into lines to prevent overflow
    const notes = report.notes.split('\n');
    notes.forEach(note => {
      // Check if we need a new page
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      addLine(note);
    });
  }

  // Add footer
  doc.setFontSize(10);
  doc.text('Generated on ' + format(new Date(), 'PPpp'), 20, 280);

  // Save the PDF
  const fileName = `service-report-${format(new Date(report.service_date), 'yyyy-MM-dd')}.pdf`;
  doc.save(fileName);
}