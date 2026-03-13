require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function test() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { data, error } = await supabaseAdmin.auth.admin.generateLink({
    type: 'recovery',
    email: 'ralphdel14@yahoo.com',
    options: {
      redirectTo: 'https://insta-verify-ai.vercel.app/auth/callback?type=recovery',
    },
  });

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('--- GENERATED LINK ---');
    console.log(data.properties.action_link);
  }
}

test();
