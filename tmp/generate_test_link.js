const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function generateTestLink() {
  const email = 'ralphdel14@yahoo.com';
  
  const { data, error } = await supabaseAdmin.auth.admin.generateLink({
    type: 'recovery',
    email: email,
    options: {
      redirectTo: 'http://localhost:3000/auth/callback?next=/auth/reset-password',
    },
  });

  if (error) {
    console.error('Error:', error.message);
  } else {
    const customLink = `http://localhost:3000/auth/callback?token_hash=${data.properties.hashed_token}&type=recovery&next=/auth/reset-password`;
    console.log('Success! Navigate to this custom link to test the callback route:');
    console.log(customLink);
  }
}

generateTestLink();
