import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://qrnngqrsyeiaqhyybhyt.supabase.co"   
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFybm5ncXJzeWVpYXFoeXliaHl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MDg0MzUsImV4cCI6MjA2NTI4NDQzNX0.22XB5Wa9ly1_Kg0N7VZrINHaXCyShoJYgBUnHcWQqLc"

export const supabase = createClient(supabaseUrl, supabaseKey)
