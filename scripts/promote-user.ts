import { createClient } from '@supabase/supabase-js';
import * as readline from 'readline';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.local so the script can access environment variables
config({ path: resolve(process.cwd(), '.env.local') });

/**
 * Promote User Script
 * Sets the 'role' metadata for a user to 'super_admin'.
 * 
 * Usage: npx tsx scripts/promote-user.ts --email user@example.com
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
  console.log('\n🚀 InstaVerify-AI — Promote User to Super Admin\n');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error(
      '❌ Missing environment variables in .env.local\n'
    );
    process.exit(1);
  }

  const email = process.argv.find(arg => arg.startsWith('--email='))?.split('=')[1] || await question('📧 User email to promote: ');

  if (!email) {
    console.error('❌ Email is required.');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  console.log(`\n⏳ Finding user: ${email}...`);

  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();

  if (listError) {
    console.error(`\n❌ Failed to list users: ${listError.message}`);
    process.exit(1);
  }

  const user = users.find(u => u.email === email);

  if (!user) {
    console.error(`\n❌ User with email "${email}" not found.`);
    process.exit(1);
  }

  console.log(`✅ Found user: ${user.id}`);
  console.log(`⏳ Updating metadata to role: 'super_admin'...`);

  const { error: updateError } = await supabase.auth.admin.updateUserById(
    user.id,
    { user_metadata: { ...user.user_metadata, role: 'super_admin' } }
  );

  if (updateError) {
    console.error(`\n❌ Failed to update user: ${updateError.message}`);
    process.exit(1);
  }

  console.log(`\n✨ Successfully promoted ${email} to Super Admin!`);
  console.log(`   They may need to log out and log back in for changes to take effect.\n`);

  rl.close();
}

main();
