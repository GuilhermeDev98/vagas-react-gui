import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database 
const options = {
    schema: 'public',
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
}

const supabase = createClient('https://fooqwueuueodzpgsgqms.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDMwNzU5OSwiZXhwIjoxOTU1ODgzNTk5fQ.jMWiqOB_O4MkZA14KdTbxdAKQlOtTFWgv_euGofSgtE', options)

export default supabase