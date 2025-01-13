import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://hrrwodexesxgushgnrtg.supabase.co', // replace with your Supabase URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhycndvZGV4ZXN4Z3VzaGducnRnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDg5NTAyOCwiZXhwIjoyMDQ2NDcxMDI4fQ.f8JzYeH6EaDolA_wHeHuHrJMDmfb6dtzj8w-B4FHzy4'
);

export default supabase;