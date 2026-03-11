/**
 * Mock Email Service
 * Simulates sending onboarding emails to new admins.
 * In a production environment, this would use a service like Resend, SendGrid, or AWS SES.
 */
export async function sendAdminOnboardingEmail({
  email,
  password,
  loginUrl,
}: {
  email: string;
  password: string;
  loginUrl: string;
}) {
  const emailContent = `
    📧 SUBJECT: Welcome to InstaVerify-AI - Your Admin Account is Ready!

    Hello,

    An administrator account has been created for you on InstaVerify-AI.

    Your Login Details:
    ------------------
    Website: ${loginUrl}
    Email: ${email}
    Temporary Password: ${password}

    ⚠️ IMPORTANT: SECURITY REQUIREMENT
    For security reasons, you are REQUIRED to change this temporary password 
    immediately upon your first login. You will be automatically redirected 
    to the password update page.

    Please keep your credentials secure.

    Best regards,
    The InstaVerify-AI Team
  `;

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Log to server console for "delivery" verification
  console.log('\n--- 📧 MOCK EMAIL SENT ---');
  console.log(emailContent);
  console.log('--------------------------\n');

  return { success: true };
}
