import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://fdaoaoimpqnviaozjyzx.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkYW9hb2ltcHFudmlhb3pqeXp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxOTMzODksImV4cCI6MjA2MTc2OTM4OX0.1RzuPQgLO5UivDBNc5T3f8NUEtGKN9ygK1gx64Dq9cU"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)