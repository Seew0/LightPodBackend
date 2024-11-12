// supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zypxyyvzrxlczctvorpd.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5cHh5eXZ6cnhsY3pjdHZvcnBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzNTUwMTgsImV4cCI6MjA0NjkzMTAxOH0.NLE26JHlLWZe2_8EtCv1-x1unmkNzig9TP5nOqJKCeY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
