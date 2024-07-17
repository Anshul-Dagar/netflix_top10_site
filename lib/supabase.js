import { createClient } from '@supabase/supabase-js';

const options = {
    db: { schema: 'netflix_top10' }
  };

export const supabase =createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    options
);