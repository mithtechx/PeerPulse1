import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pyqndtmdjtppgwcwwdsy.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5cW5kdG1kanRwcGd3Y3d3ZHN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcyMjI2NzQsImV4cCI6MjEwMjc5ODY3NH0.wMVKUntEbLHUf8f1oZoSCQU8HbedzmDRuCduVC2lUb4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
