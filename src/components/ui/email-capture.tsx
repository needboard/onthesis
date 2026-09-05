'use client';

import { useState, FormEvent } from 'react';
import { Input } from './input';
import { Button } from './button';

interface EmailCaptureProps {
  placeholder: string;
  buttonText: string;
  helperText?: string;
  showCrmField?: boolean;
  crmPlaceholder?: string;
  crmOtherPlaceholder?: string;
  crmHelperText?: string;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailCapture({
  placeholder,
  buttonText,
  helperText,
  showCrmField = false,
  crmPlaceholder = 'What CRM do you use? (optional)',
  crmOtherPlaceholder = 'Your CRM — e.g. Notion, Copper, HubSpot',
  crmHelperText,
  onSuccess,
  onError,
}: EmailCaptureProps) {
  const [email, setEmail] = useState('');
  const [crmChoice, setCrmChoice] = useState('');
  const [crmOther, setCrmOther] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!EMAIL_REGEX.test(email)) {
      setStatus('error');
      setMessage('That doesn\'t look like a valid email.');
      onError?.('That doesn\'t look like a valid email.');
      return;
    }

    setStatus('submitting');
    setMessage('');

    const crmFinal =
      crmChoice === '__other__' ? crmOther.trim().slice(0, 80).replace(/[<>]/g, '') : crmChoice.replace(/[<>]/g, '').slice(0, 80);
    const payload: Record<string, string> = { email };
    if (crmFinal) payload.crm = crmFinal;

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      setStatus('success');
      setMessage(data.message || 'You\'re on the list. We\'ll reach out when a spot opens.');
      setEmail('');
      setCrmChoice('');
      setCrmOther('');
      onSuccess?.(data.message || 'You\'re on the list. We\'ll reach out when a spot opens.');
    } catch {
      setStatus('error');
      setMessage('Something went wrong — try again in a moment.');
      onError?.('Something went wrong — try again in a moment.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto" noValidate>
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'submitting' || status === 'success'}
          aria-describedby={status !== 'idle' ? 'email-status' : undefined}
          aria-invalid={status === 'error'}
        />
        <Button type="submit" size="default" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Joining...' : buttonText}
        </Button>
      </div>

      {showCrmField && (
        <div className="mt-3 space-y-2">
          <select
            value={crmChoice}
            onChange={(e) => {
              setCrmChoice(e.target.value);
              if (e.target.value !== '__other__') setCrmOther('');
            }}
            disabled={status === 'submitting' || status === 'success'}
            aria-label="What CRM do you use"
            className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:opacity-50 md:text-sm cursor-pointer"
          >
            <option value="">{crmPlaceholder}</option>
            <option value="Decile Hub">Decile Hub</option>
            <option value="Attio">Attio</option>
            <option value="Streak">Streak</option>
            <option value="Affinity">Affinity</option>
            <option value="__other__">Other — tell us</option>
          </select>
          {crmChoice === '__other__' && (
            <Input
              type="text"
              placeholder={crmOtherPlaceholder}
              value={crmOther}
              onChange={(e) => setCrmOther(e.target.value.slice(0, 80))}
              disabled={status === 'submitting' || status === 'success'}
              aria-label="Other CRM name"
              maxLength={80}
            />
          )}
          {crmHelperText && <p className="text-xs text-muted-foreground">{crmHelperText}</p>}
        </div>
      )}
      {(status === 'success' || status === 'error') && (
        <p
          id="email-status"
          role="status"
          aria-live="polite"
          className={`mt-3 text-sm text-center ${status === 'success' ? 'text-accent' : 'text-destructive'}`}
        >
          {message}
        </p>
      )}
      {status === 'idle' && helperText && (
        <p className="mt-3 text-center text-sm text-muted-foreground">{helperText}</p>
      )}
    </form>
  );
}