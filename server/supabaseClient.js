import {createClient} from '@supabase/supabase-js';

export const supabaseAdmin = createClient(process.env.supabaseUrl, process.env.supabaseAdminKey);
export const supabaseAnon = createClient(process.env.supabaseUrl, process.env.supabaseAnonKey);