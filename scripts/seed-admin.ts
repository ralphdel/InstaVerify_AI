import { createClient } from '@supabase/supabase-js';
import * as readline from 'readline';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.local so the script can access environment variables
config({ path: resolve(process.cwd(), '.env.local') });

/**
 * Seed Admin Script
 * Creates the first admin user in Supabase Auth.
 * 
 * Usage: npx tsx scripts/seed-admin.ts
 */

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function main() {
  console.log('\n🔐 InstaVerify-AI — Seed Admin User\n');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error(
      '❌ Missing environment variables.\n' +
      '   Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY\n' +
      '   are set in your .env.local file.\n'
    );
    process.exit(1);
  }

  const email = await question('📧 Admin email: ');
  const password = await question('🔑 Admin password: ');

  if (!email || !password) {
    console.error('❌ Email and password are required.');
    process.exit(1);
  }

  if (password.length < 8) {
    console.error('❌ Password must be at least 8 characters.');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  console.log('\n⏳ Creating super admin user...');

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Auto-confirm the email
    user_metadata: {
      role: 'super_admin',
    },
  });

  if (error) {
    console.error(`\n❌ Failed to create admin: ${error.message}`);
    process.exit(1);
  }

  console.log(`\n✅ Admin user created successfully!`);
  console.log(`   Email: ${data.user.email}`);
  console.log(`   ID:    ${data.user.id}`);
  console.log(`\n   You can now log in at http://localhost:3000/login\n`);

  rl.close();
}

main();
