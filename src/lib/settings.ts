import { supabase } from './supabase';

interface PestControlConfig {
  areas: string[];
  products: string[];
}

export async function updatePestControlConfig(config: PestControlConfig) {
  // First update the settings table
  const { error: settingsError } = await supabase
    .from('settings')
    .upsert({
      key: 'pest_control_config',
      value: config,
      updated_at: new Date().toISOString()
    });

  if (settingsError) throw settingsError;

  // Then update the service_types table
  const { error: serviceTypeError } = await supabase
    .from('service_types')
    .update({
      config,
      updated_at: new Date().toISOString()
    })
    .eq('name', 'Pest Control');

  if (serviceTypeError) throw serviceTypeError;
}

export async function getPestControlConfig(): Promise<PestControlConfig> {
  // Try to get from service_types first
  const { data: serviceTypeData, error: serviceTypeError } = await supabase
    .from('service_types')
    .select('config')
    .eq('name', 'Pest Control')
    .single();

  if (!serviceTypeError && serviceTypeData?.config) {
    return serviceTypeData.config as PestControlConfig;
  }

  // Fallback to settings table
  const { data: settingsData, error: settingsError } = await supabase
    .from('settings')
    .select('value')
    .eq('key', 'pest_control_config')
    .single();

  if (settingsError) {
    // Return default config if nothing is found
    return {
      areas: [
        'Kitchen',
        'Bathroom',
        'Living Room',
        'Bedroom',
        'Dining Room',
        'Garage',
        'Basement',
        'Attic',
        'Exterior Perimeter',
        'Garden',
        'Roof',
        'Other'
      ],
      products: [
        'General Insecticide',
        'Ant Treatment',
        'Cockroach Gel',
        'Rodent Bait',
        'Spider Treatment',
        'Termite Treatment',
        'Mosquito Spray',
        'Fly Control',
        'Other'
      ]
    };
  }

  return settingsData.value as PestControlConfig;
}