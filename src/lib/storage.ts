import { supabase } from './supabase';

export async function uploadBrandingImage(file: File) {
  try {
    const { data, error } = await supabase.storage
      .from('branding')
      .upload('ecovest-logo.png', file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error uploading logo:', error);
    throw error;
  }
}

export async function verifyStorageAccess() {
  try {
    const { data, error } = await supabase.storage
      .from('branding')
      .list();

    if (error) throw error;
    
    const logoExists = data.some(file => file.name === 'ecovest-logo.png');
    return {
      bucketAccessible: true,
      logoExists,
      files: data
    };
  } catch (error) {
    console.error('Error verifying storage access:', error);
    return {
      bucketAccessible: false,
      logoExists: false,
      files: []
    };
  }
}