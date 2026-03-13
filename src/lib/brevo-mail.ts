import nodemailer from 'nodemailer';

// Direct Brevo SMTP transport — works for ANY recipient, no domain needed
function createTransport() {
  const host = process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com';
  const port = parseInt(process.env.BREVO_SMTP_PORT || '587');
  const user = process.env.BREVO_SMTP_USER;
  const pass = process.env.BREVO_SMTP_PASS;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: { user, pass },
  });
}

export async function sendEmailViaSMTP({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const transport = createTransport();
  const senderEmail = process.env.BREVO_SENDER_EMAIL || process.env.BREVO_SMTP_USER || 'noreply@instaverify.ai';

  if (!transport) {
    console.warn('⚠️ Brevo SMTP not configured. Email not sent.');
    console.log('--- [MOCKED EMAIL] ---');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('---------------------');
    return { success: true, mock: true };
  }

  try {
    console.log(`📧 Sending email to ${to} via Brevo SMTP...`);
    const info = await transport.sendMail({
      from: `"InstaVerify-AI" <${senderEmail}>`,
      to,
      subject,
      html,
    });
    console.log(`✅ Email sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Brevo SMTP Error:', error);
    return { success: false, error };
  }
}

export async function sendPasswordResetViaSMTP(email: string, resetLink: string) {
  return sendEmailViaSMTP({
    to: email,
    subject: 'Reset your InstaVerify-AI password',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #000; font-weight: 800;">Password Reset Request</h2>
        <p>We received a request to reset your password for your InstaVerify-AI account.</p>
        <p>Click the button below to set a new password:</p>
        
        <div style="margin: 32px 0;">
          <a href="${resetLink}" style="display: inline-block; background: #0f172a; color: #fff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">Reset Password</a>
        </div>
        
        <p style="margin-top: 24px; font-size: 14px; color: #64748b;">Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all; font-size: 12px; color: #94a3b8; background: #f8fafc; padding: 12px; border-radius: 6px;">${resetLink}</p>
        
        <p style="margin-top: 32px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 16px;">
          If you did not request a password reset, please ignore this email.
        </p>
      </div>
    `,
  });
}

export async function sendAdminInviteViaSMTP(email: string, inviteLink: string) {
  return sendEmailViaSMTP({
    to: email,
    subject: 'Welcome to InstaVerify-AI — You\'ve Been Invited!',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #000; font-weight: 800;">Welcome to InstaVerify-AI</h2>
        <p>You've been invited to join InstaVerify-AI as an administrator.</p>
        <p>Click the button below to set up your account:</p>

        <div style="margin: 32px 0;">
          <a href="${inviteLink}" style="display: inline-block; background: #0f172a; color: #fff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">Accept Invitation</a>
        </div>

        <p style="margin-top: 24px; font-size: 14px; color: #64748b;">Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all; font-size: 12px; color: #94a3b8; background: #f8fafc; padding: 12px; border-radius: 6px;">${inviteLink}</p>
        
        <p style="margin-top: 32px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 16px;">
          If you did not expect this invitation, please ignore this email.
        </p>
      </div>
    `,
  });
}
