import * as XLSX from 'xlsx';

interface JobCardData {
  customer: string;
  address: string;
  serviceType: string;
  areas: string[];
  products: string[];
  notes?: string;
  date?: string;
}

export async function parseExcelJobCards(file: File): Promise<JobCardData[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Validate and transform the data
        const jobCards = jsonData.map((row: any) => ({
          customer: row.Customer,
          address: row.Address,
          serviceType: row['Service Type'],
          areas: row.Areas?.split(',').map((a: string) => a.trim()) || [],
          products: row.Products?.split(',').map((p: string) => p.trim()) || [],
          notes: row.Notes,
          date: row.Date
        }));

        // Validate required fields
        const invalidCards = jobCards.filter(
          card => !card.customer || !card.address || !card.serviceType
        );

        if (invalidCards.length > 0) {
          throw new Error('Some records are missing required fields');
        }

        resolve(jobCards);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsArrayBuffer(file);
  });
}