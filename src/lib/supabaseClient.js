import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://etjmlznvwwcmyunbzqgj.supabase.co';
const supabaseKey = 'sb_publishable_FJf_dM8Gt1gXVZfi9yP32w_EHDfrspd';

export const supabase = createClient(supabaseUrl, supabaseKey);
