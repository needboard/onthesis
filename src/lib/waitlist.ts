export async function submitToWaitlist(email: string, crm?: string): Promise<{ success: boolean; message: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey) {
    console.warn('Resend credentials not configured. Email not added to waitlist.');
    return {
      success: false,
      message: 'Waitlist temporarily unavailable. Please try again later.',
    };
  }

  // Sanitize CRM (max 80, strip tags)
  const cleanCrm = crm?.trim().slice(0, 80).replace(/[<>]/g, '') || undefined;

  // Try to ensure custom property `crm` exists (best-effort, ignore if already exists)
  if (cleanCrm) {
    try {
      await fetch('https://api.resend.com/contact-properties', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: 'crm',
          type: 'string',
          fallback_value: '',
        }),
      });
    } catch {
      // ignore — property may already exist or endpoint not available in this Resend version
    }
  }

  // Prefer new Contacts API (supports properties) — fallback to Audiences if needed
  // This makes email + crm visible together in Resend dashboard (Contacts → Properties)
  try {
    const contactPayload: Record<string, unknown> = {
      email,
      unsubscribed: false,
    };
    if (cleanCrm) {
      (contactPayload as Record<string, unknown>).properties = { crm: cleanCrm };
    }

    const res = await fetch('https://api.resend.com/contacts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactPayload),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok) {
      // Also add to legacy Audience if audienceId configured (keeps old lists in sync)
      if (audienceId) {
        try {
          await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, unsubscribed: false }),
          });
        } catch {}
      }
      return {
        success: true,
        message: 'You\'re on the list. We\'ll reach out when a spot opens.',
      };
    }

    // If contact already exists, update its crm property so dashboard stays in sync
    if (data.name === 'validation_error' && String(data.message || '').toLowerCase().includes('already exists')) {
      if (cleanCrm) {
        try {
          // Resend update by email (if supported) — try both id and email endpoints
          const updateRes = await fetch(`https://api.resend.com/contacts/${encodeURIComponent(email)}`, {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ properties: { crm: cleanCrm } }),
          });
          if (!updateRes.ok) {
            // Fallback: try PUT
            await fetch(`https://api.resend.com/contacts/${encodeURIComponent(email)}`, {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ properties: { crm: cleanCrm } }),
            });
          }
        } catch {}
      }
      return {
        success: true,
        message: 'You\'re already on the list. We\'ll reach out when a spot opens.',
      };
    }

    throw new Error(data.message || 'Failed to add to waitlist');
  } catch (error) {
    console.error('Waitlist submission error:', error);
    // Last resort: try legacy Audiences endpoint if Contacts API not available
    if (audienceId) {
      try {
        const legacyRes = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, unsubscribed: false }),
        });
        const legacyData = await legacyRes.json().catch(() => ({}));
        if (legacyRes.ok || (legacyData.name === 'validation_error' && String(legacyData.message || '').includes('already exists'))) {
          if (cleanCrm) console.log(`[waitlist] crm captured but not stored in Resend (legacy fallback): ${email} -> ${cleanCrm}`);
          return {
            success: true,
            message: 'You\'re on the list. We\'ll reach out when a spot opens.',
          };
        }
      } catch {}
    }
    return {
      success: false,
      message: 'Something went wrong — try again in a moment.',
    };
  }
}