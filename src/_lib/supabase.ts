import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
if (!supabaseKey || !supabaseUrl) {
  throw new Error("failed to access .env file");
}
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
