import React from 'react';
import ServiceTypeSelector from './ServiceTypeSelector';
import PestSelection from './PestSelection';
import TreatmentSection from './TreatmentSection';
import ServiceNotes from './ServiceNotes';
import { Beaker } from 'lucide-react';

interface JobCardFormProps {
  treatmentAreas: string[];
  productsUsed: string[];
  serviceType: string;
  pestsFound: string[];
  notes: string;
  onTreatmentAreasChange: (areas: string[]) => void;
  onProductsUsedChange: (products: string[]) => void;
  onServiceTypeChange: (type: string) => void;
  onPestsFoundChange: (pests: string[]) => void;
  onNotesChange: (notes: string) => void;
  availableAreas: string[];
  availableProducts: string[];
}

export default function JobCardForm({
  treatmentAreas,
  productsUsed,
  serviceType,
  pestsFound,
  notes,
  onTreatmentAreasChange,
  onProductsUsedChange,
  onServiceTypeChange,
  onPestsFoundChange,
  onNotesChange,
  availableAreas,
  availableProducts
}: JobCardFormProps) {
  return (
    <div className="space-y-8">
      <ServiceTypeSelector
        value={serviceType}
        onChange={onServiceTypeChange}
      />

      <PestSelection
        selectedPests={pestsFound}
        onChange={onPestsFoundChange}
      />

      <TreatmentSection
        title="Areas Treated"
        items={availableAreas}
        selectedItems={treatmentAreas}
        onChange={onTreatmentAreasChange}
      />

      <TreatmentSection
        title="Products Used"
        items={availableProducts}
        selectedItems={productsUsed}
        onChange={onProductsUsedChange}
        icon={<Beaker className="w-4 h-4 mr-1" />}
        chipColor="bg-blue-50 hover:bg-blue-100"
      />

      <ServiceNotes
        value={notes}
        onChange={onNotesChange}
      />
    </div>
  );
}