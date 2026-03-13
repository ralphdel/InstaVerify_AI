import { sendEmail } from '../src/lib/mail';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function test() {
  console.log('--- Manual Email Test ---');
  console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'Set' : 'Not Set');
  
  const result = await sendEmail({
    to: 'ralphdel14@yahoo.com', // Using the user's email as it's the most likely "authorized recipient"
    subject: 'Manual Test Email',
    html: '<h1>If you see this, Resend is working!</h1>'
  });
  
  console.log('Result:', JSON.stringify(result, null, 2));
}

test();
