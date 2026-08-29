'use client';

import { useState, FormEvent } from 'react';
import { Input } from './input';
import { Button } from './button';

interface EmailCaptureProps {
  placeholder: string;
  buttonText: string;
  helperText?: string;
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailCapture({
  placeholder,
  buttonText,
  helperText,
  onSuccess,
  onError,
}: EmailCaptureProps) {
  const [email, setEmail] = useState('');
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

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Something went wrong');

      setStatus('success');
      setMessage(data.message || 'You\'re on the list. We\'ll reach out when a spot opens.');
      setEmail('');
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