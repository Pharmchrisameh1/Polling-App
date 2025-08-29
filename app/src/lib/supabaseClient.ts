import { createClient } from '@supabase/supabase-js'


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string


// If envs are missing, we still create a client but recommend mock mode in AuthContext
export const supabase = createClient(supabaseUrl || 'https://example.supabase.co', supabaseAnonKey || 'anon')
