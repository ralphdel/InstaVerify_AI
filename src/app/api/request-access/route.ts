import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with the API key from the environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'A valid email address is required' },
        { status: 400 }
      );
    }

    // Graceful fallback for local MVP testing if the API key isn't provided yet
    if (!process.env.RESEND_API_KEY) {
      console.log('=========================================');
      console.log('📬 NEW ACCESS REQUEST RECEIVED (SIMULATED)');
      console.log(`Email from: ${email}`);
      console.log('To: ralphdel14@yahoo.com');
      console.log('Note: RESEND_API_KEY is not set. Go to resend.com to get a key to send real emails.');
      console.log('=========================================');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return NextResponse.json({ 
        success: true, 
        message: 'Request simulated successfully (API key missing)' 
      });
    }

    // Attempt to send the real email using Resend
    const { data, error } = await resend.emails.send({
      from: 'InstaVerify Admin <onboarding@resend.dev>', // resend.dev is the default testing domain provided by Resend
      to: 'ralphdel14@yahoo.com',
      subject: 'New Dashboard Access Request - InstaVerify-AI',
      html: `
        <div style="font-family: Arial, sans-serif; max-w-[600px] margin: 0 auto;">
          <h2 style="color: #0A192F;">New Access Request</h2>
          <p>A user has requested operator access to the InstaVerify-AI dashboard.</p>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0;">
            <p style="margin: 0; font-size: 16px;"><strong>Requested Email:</strong> ${email}</p>
          </div>
          <p style="color: #64748b; font-size: 14px;">Log in to your Supabase dashboard to create an account for this user and assign them an operator role.</p>
        </div>
      `,
    });

    if (error) {
      console.error('[Resend Error]', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, id: data?.id });
    
  } catch (error: any) {
    console.error('[Request Access Error]', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred processing your request' },
      { status: 500 }
    );
  }
}
