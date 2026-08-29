export async function submitToWaitlist(email: string): Promise<{ success: boolean; message: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    console.warn('Resend credentials not configured. Email not added to waitlist.');
    return {
      success: false,
      message: 'Waitlist temporarily unavailable. Please try again later.',
    };
  }

  try {
    const res = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        unsubscribed: false,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      if (data.name === 'validation_error' && data.message?.includes('already exists')) {
        return {
          success: true,
          message: 'You\'re already on the list. We\'ll reach out when a spot opens.',
        };
      }
      throw new Error(data.message || 'Failed to add to waitlist');
    }

    return {
      success: true,
      message: 'You\'re on the list. We\'ll reach out when a spot opens.',
    };
  } catch (error) {
    console.error('Waitlist submission error:', error);
    return {
      success: false,
      message: 'Something went wrong — try again in a moment.',
    };
  }
}