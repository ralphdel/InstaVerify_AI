const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

const transport = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: parseInt(process.env.BREVO_SMTP_PORT || '2525'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
  connectionTimeout: 15000,
});

async function test() {
  console.log('--- Brevo SMTP Delivery Test ---');
  console.log(`Port: ${process.env.BREVO_SMTP_PORT || '2525'}`);
  
  try {
    console.log('Attempting to send...');
    const info = await transport.sendMail({
      from: `"InstaVerify-AI Test" <${process.env.BREVO_SENDER_EMAIL}>`,
      to: 'ralphdel1@yahoo.com', 
      subject: 'Brevo SMTP Test (Alternate Port 2525)',
      html: '<p>If you see this, the port 2525 switch worked!</p>'
    });
    console.log('✅ Success! Message ID:', info.messageId);
  } catch(err) {
    console.error('❌ Failed:', err);
  }
}

test();
