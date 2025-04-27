import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tlcytnpiefvopefokaen.supabase.co'; // ganti dengan URL kamu
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY; // ganti dengan anon key kamu

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
