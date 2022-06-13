import {createClient} from '@supabase/supabase-js';
import config from './config.js'

export const supabaseAdmin = createClient(config.supabaseUrl, config.supabaseAdminKey);
export const supabaseAnon = createClient(config.supabaseUrl, config.supabaseAnonKey);