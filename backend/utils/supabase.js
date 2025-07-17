const { createClient } = require('@supabase/supabase-js');

// Ensure you have SUPABASE_URL and SUPABASE_ANON_KEY in your .env file
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing. Please check your .env file.');
  // Exit or handle the absence of credentials appropriately
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = supabase;
