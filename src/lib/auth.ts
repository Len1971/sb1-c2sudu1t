import { supabase } from './supabase';
import { AuthError } from '@supabase/supabase-js';

export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export async function signIn(email: string, password: string) {
  if (!email || !password) {
    throw new AuthenticationError('Email and password are required');
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
      password: password.trim()
    });
    
    if (error) {
      if (error.message === 'Invalid login credentials') {
        throw new AuthenticationError('Invalid email or password');
      }
      throw new AuthenticationError(error.message);
    }
    
    return data;
  } catch (error) {
    if (error instanceof AuthenticationError) {
      throw error;
    }
    throw new AuthenticationError('An unexpected error occurred. Please try again later.');
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new AuthenticationError('Failed to sign out');
    }
  } catch (error) {
    if (error instanceof AuthenticationError) {
      throw error;
    }
    throw new AuthenticationError('An unexpected error occurred while signing out');
  }
}