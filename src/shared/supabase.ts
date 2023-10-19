import { createClient } from "@supabase/supabase-js";

export async function signIn(email: string, password: string) {
  const { data } = await supabase.auth.signInWithPassword({ email, password });
  return data.user;
}

const supabaseUrl = "https://nnboatpalvcxxrznrunn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5uYm9hdHBhbHZjeHhyem5ydW5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY3NzA3OTMsImV4cCI6MjAxMjM0Njc5M30.XYY_S03X38ZIRCrkB6562ynBdcybjKbnvWvuF8lcuLE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
