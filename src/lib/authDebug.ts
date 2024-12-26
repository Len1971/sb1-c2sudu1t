import { AuthError } from '@supabase/supabase-js';

export function logAuthError(error: unknown) {
  if (error instanceof AuthError) {
    console.error('Auth Error:', {
      message: error.message,
      status: error.status,
      name: error.name
    });
  } else if (error instanceof Error) {
    console.error('Generic Error:', error.message);
  } else {
    console.error('Unknown Error:', error);
  }
}