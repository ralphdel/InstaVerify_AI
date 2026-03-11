import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string | string[];
  subject: string;
  html: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set. Email not sent.');
    console.log('--- Mock Email ---');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('Body:', html);
    return { success: true, mock: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'InstaVerify-AI <onboarding@resend.dev>',
      to,
      subject,
      html,
    });

    if (error) {
      console.error('Resend Error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email Send Error:', error);
    return { success: false, error };
  }
}

export async function sendAdminOnboardingEmail({
  email,
  password,
  loginUrl,
}: {
  email: string;
  password: string;
  loginUrl: string;
}) {
  return sendEmail({
    to: email,
    subject: 'Welcome to InstaVerify-AI - Your Admin Account is Ready!',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #000; font-weight: 800; tracking-tight;">Welcome to InstaVerify-AI</h2>
        <p>An administrator account has been created for you. Use the credentials below to log in.</p>
        
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 24px; border-radius: 12px; margin: 24px 0;">
          <p style="margin: 0; font-size: 14px; color: #64748b;">Login Email</p>
          <p style="margin: 4px 0 16px; font-weight: 600; color: #0f172a;">${email}</p>
          
          <p style="margin: 0; font-size: 14px; color: #64748b;">Temporary Password</p>
          <p style="margin: 4px 0 0; font-weight: 600; color: #0f172a;">${password}</p>
        </div>

        <div style="background: #fff7ed; border: 1px solid #fed7aa; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
          <p style="margin: 0; font-size: 13px; color: #9a3412; font-weight: 600;">⚠️ Security Notice</p>
          <p style="margin: 4px 0 0; font-size: 13px; color: #c2410c;">You are required to change this temporary password immediately upon your first login.</p>
        </div>

        <a href="${loginUrl}" style="display: inline-block; background: #0f172a; color: #fff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">Login to Dashboard</a>
        
        <p style="margin-top: 32px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; pt-24;">
          If you did not expect this invitation, please ignore this email.
        </p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(email: string, resetLink: string) {
  return sendEmail({
    to: email,
    subject: 'Reset your InstaVerify-AI password',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #000; font-weight: 800; tracking-tight;">Password Reset Request</h2>
        <p>We received a request to reset your password for your InstaVerify-AI account.</p>
        <p>Click the button below to set a new password:</p>
        
        <div style="margin: 32px 0;">
          <a href="${resetLink}" style="display: inline-block; background: #0f172a; color: #fff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">Reset Password</a>
        </div>
        
        <p style="margin-top: 24px; font-size: 14px; color: #64748b;">Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all; font-size: 12px; color: #94a3b8; background: #f8fafc; padding: 12px; border-radius: 6px;">${resetLink}</p>
        
        <p style="margin-top: 32px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; pt-24;">
          If you did not request a password reset, please ignore this email.
        </p>
      </div>
    `,
  });
}

export async function sendPasswordChangedNotification(email: string) {
  return sendEmail({
    to: email,
    subject: 'Security Alert: Your password has been changed',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #000; font-weight: 800; tracking-tight;">Password Changed</h2>
        <p>This is a confirmation that the password for your InstaVerify-AI account has been successfully changed.</p>
        
        <div style="background: #fff1f2; border: 1px solid #fecdd3; padding: 16px; border-radius: 8px; margin: 24px 0;">
          <p style="margin: 0; font-size: 13px; color: #be123c; font-weight: 600;">Didn't do this?</p>
          <p style="margin: 4px 0 0; font-size: 13px; color: #e11d48;">If you didn't change your password, please contact the superadmin immediately.</p>
        </div>
        
        <p style="margin-top: 32px; font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; pt-24;">
          This is an automated security notification.
        </p>
      </div>
    `,
  });
}
