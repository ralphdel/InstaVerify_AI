import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with the API key from the environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, company, role } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'A valid email address is required' },
        { status: 400 }
      );
    }

    if (!firstName || !lastName || !company || !role) {
      return NextResponse.json(
        { error: 'All fields (First Name, Last Name, Company, Role) are required' },
        { status: 400 }
      );
    }

    // 1. Add contact to EmailOctopus
    let eoSuccess = false;
    const eoApiKey = process.env.EMAILOCTOPUS_API_KEY;
    const eoListId = process.env.EMAILOCTOPUS_LIST_ID;

    if (eoApiKey && eoListId) {
      try {
        const eoUrl = `https://emailoctopus.com/api/1.6/lists/${eoListId}/contacts`;
        const eoResponse = await fetch(eoUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            api_key: eoApiKey,
            email_address: email,
            fields: {
              FirstName: firstName,
              LastName: lastName,
              CompanyName: company,
              UserRole: role,
            },
            status: 'SUBSCRIBED',
          }),
        });

        if (!eoResponse.ok) {
          // Parse the error to see if they already exist
          let errData;
          try {
            errData = await eoResponse.json();
          } catch (e) {
            console.error('[EmailOctopus Error Text]', await eoResponse.text());
          }

          if (errData && errData.error && errData.error.code === 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {
            return NextResponse.json(
              { error: 'Looks like you have already requested access! We will be in touch shortly.' },
              { status: 400 }
            );
          }

          console.error('[EmailOctopus Error]', errData || 'Unknown error');
        } else {
          eoSuccess = true;
          console.log('[EmailOctopus] Contact successfully added to list');
        }
      } catch (err) {
        console.error('[EmailOctopus Exception]', err);
      }
    } else {
      console.warn('[EmailOctopus] API Key or List ID missing in environment variables. Skipping subscriber addition.');
    }

    // 2. Admin Email Notification (via Resend)
    // Graceful fallback for local MVP testing if the API key isn't provided yet
    if (!process.env.RESEND_API_KEY) {
      console.log('=========================================');
      console.log('📬 NEW ACCESS REQUEST RECEIVED (SIMULATED)');
      console.log(`Name: ${firstName} ${lastName}`);
      console.log(`Email from: ${email}`);
      console.log(`Company: ${company}`);
      console.log(`Role: ${role}`);
      console.log('To: ralphdel14@yahoo.com');
      console.log('Note: RESEND_API_KEY is not set. Go to resend.com to get a key to send real emails.');
      console.log('=========================================');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return NextResponse.json({ 
        success: true, 
        message: 'Request simulated successfully (API key missing)',
        emailOctopusAdded: eoSuccess
      });
    }

    // Attempt to send the real email using Resend
    const { data, error } = await resend.emails.send({
      from: 'InstaVerify Admin <onboarding@resend.dev>', // resend.dev is the default testing domain provided by Resend
      to: 'ralphdel14@yahoo.com',
      subject: 'New Dashboard Access Request - InstaVerify-AI',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #0A192F;">New Access Request</h2>
          <p>A user has requested operator access to the InstaVerify-AI dashboard.</p>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0;">
            <p style="margin: 0 0 10px 0; font-size: 16px;"><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p style="margin: 0 0 10px 0; font-size: 16px;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 0 0 10px 0; font-size: 16px;"><strong>Company:</strong> ${company}</p>
            <p style="margin: 0; font-size: 16px;"><strong>Role:</strong> ${role}</p>
          </div>
          <p style="color: #64748b; font-size: 14px;">Log in to your Supabase dashboard to create an account for this user and assign them an operator role.</p>
        </div>
      `,
    });

    if (error) {
      console.error('[Resend Error]', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, id: data?.id, emailOctopusAdded: eoSuccess });
    
  } catch (error: any) {
    console.error('[Request Access Error]', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred processing your request' },
      { status: 500 }
    );
  }
}
