import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const serviceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create the main client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create admin client if service role key exists
export const supabaseAdmin = serviceRoleKey ? 
  createClient(supabaseUrl, serviceRoleKey) : null;

export default supabase;