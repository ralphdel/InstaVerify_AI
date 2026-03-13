import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { createClient } from '@/utils/supabase/server';
import { sendAdminOnboardingEmail } from '@/lib/mail';

// GET — List all users (Super Admin only)
export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user || user.user_metadata?.role !== 'super_admin') {
      return NextResponse.json({ error: 'Unauthorized. Super Admin required.' }, { status: 403 });
    }

    const adminClient = createAdminClient();
    const { data, error } = await adminClient.auth.admin.listUsers();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const users = data.users.map((u) => ({
      id: u.id,
      email: u.email,
      role: u.user_metadata?.role || 'admin',
      must_change_password: u.user_metadata?.must_change_password || false,
      created_at: u.created_at,
      last_sign_in_at: u.last_sign_in_at,
    }));

    return NextResponse.json({ users });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST — Create a new admin user (Super Admin only)
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.user_metadata?.role !== 'super_admin') {
      return NextResponse.json({ error: 'Unauthorized. Super Admin required.' }, { status: 403 });
    }

    const body = await request.json();
    const { email } = body;
    
    // As per requirement: default password is 'admin1234'
    const defaultPassword = 'admin1234';

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const adminClient = createAdminClient();
    
    // Step 1: Create the user directly so we can force the must_change_password flag
    const { data: userData, error: createError } = await adminClient.auth.admin.createUser({
      email,
      password: defaultPassword,
      email_confirm: true,
      user_metadata: {
        role: 'admin',
        must_change_password: true
      }
    });

    if (createError) {
      return NextResponse.json({ error: createError.message }, { status: 400 });
    }

    if (!userData.user) {
      return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }

    // Step 2: Generate a magic link for their first login/invite
    const { data: linkData, error: linkError } = await adminClient.auth.admin.generateLink({
      type: 'magiclink',
      email: email,
      options: {
        // Point to the server callback to establish the session, then redirect to the change password form
        redirectTo: `${request.headers.get('origin') || 'http://localhost:3000'}/auth/callback?next=/auth/change-password`,
      },
    });

    // Step 3: Send the email via Brevo SMTP
    if (linkData?.properties?.hashed_token) {
      const baseUrl = request.headers.get('origin') || 'http://localhost:3000';
      // Construct a custom link that hits the Next.js server callback directly with the token hash
      const customLink = `${baseUrl}/auth/callback?token_hash=${linkData.properties.hashed_token}&type=magiclink&next=/auth/change-password`;
      
      // Import dynamically to avoid top-level await/env issues
      const { sendAdminInviteViaSMTP } = await import('@/lib/brevo-mail');
      const emailResult = await sendAdminInviteViaSMTP(email, customLink);
      
      if (!emailResult.success) {
        console.error('Failed to send invite email:', emailResult.error);
        // We still return success for user creation, but log the email failure
      }
    } else {
      console.error('Failed to generate invite link:', linkError);
    }

    return NextResponse.json({
      user: {
        id: userData.user.id,
        email: userData.user.email,
        created_at: userData.user.created_at,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE — Delete a user (Super Admin only)
export async function DELETE(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.user_metadata?.role !== 'super_admin') {
      return NextResponse.json({ error: 'Unauthorized. Super Admin required.' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Prevent self-deletion
    if (userId === user.id) {
      return NextResponse.json(
        { error: 'You cannot delete your own account' },
        { status: 400 }
      );
    }

    const adminClient = createAdminClient();
    const { error } = await adminClient.auth.admin.deleteUser(userId);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
