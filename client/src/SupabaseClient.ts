// supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nfdsxcxgfxlzwdwulhcp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5mZHN4Y3hnZnhsendkd3VsaGNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY5MDYxNjMsImV4cCI6MjA0MjQ4MjE2M30.PV53rvnXWpjMJYzZcUZ8nnjUy5p_Qel94EVXmCLXT_Q'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
