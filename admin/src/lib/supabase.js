import { createClient } from '@supabase/supabase-js';
import { databaseService } from '../../../src/services/databaseService';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

// Create admin client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  }
});

export { databaseService };
export default supabase; 