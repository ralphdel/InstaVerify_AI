// Quick Brevo SMTP test — with verified sender
require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

async function test() {
  console.log('--- Brevo SMTP Delivery Test ---');
  console.log('Sender:', process.env.BREVO_SENDER_EMAIL);

  const transport = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.BREVO_SMTP_USER,
      pass: process.env.BREVO_SMTP_PASS,
    },
  });

  try {
    const info = await transport.sendMail({
      from: `"InstaVerify-AI" <${process.env.BREVO_SENDER_EMAIL}>`,
      to: 'ralphdel14@yahoo.com',
      subject: 'InstaVerify-AI — Email Delivery Test ✅',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a;">Email Delivery Confirmed!</h2>
          <p>If you're reading this, your Brevo SMTP is correctly configured and delivering emails.</p>
          <p style="color: #64748b; font-size: 12px;">Sent at: ${new Date().toISOString()}</p>
        </div>
      `,
    });
    console.log('✅ Email sent! ID:', info.messageId);
    console.log('Check your inbox in 1-2 minutes.');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

test();
