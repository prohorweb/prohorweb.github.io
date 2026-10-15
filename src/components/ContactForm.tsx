import { useState, FormEvent } from 'react';
import type { ContactFormLabels } from '../types/data';

interface ContactFormProps {
  labels: ContactFormLabels;
  email: string;
}

// ⚠️ Replace YOUR_FORM_ID with your actual Formspree form ID
// Create a form at https://formspree.io for prohorweb@gmail.com
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

export default function ContactForm({ labels, email }: ContactFormProps) {
  const [formState, setFormState] = useState({
    name: '',
    contact: '',
    message: '',
    _gotcha: '', // honeypot
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (formState._gotcha) return; // spam protection
    
    setStatus('loading');
    
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          contact: formState.contact,
          message: formState.message,
        }),
      });
      
      if (response.ok) {
        setStatus('success');
        setFormState({ name: '', contact: '', message: '', _gotcha: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: 'var(--elevated)',
    border: '1px solid var(--hairline)',
    borderRadius: '8px',
    color: 'var(--text)',
    fontSize: '15px',
    fontFamily: 'var(--body)',
  };

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--gold-border)',
      borderRadius: '12px',
      padding: '32px',
    }}>
      <h3 style={{
        fontFamily: 'var(--display)',
        fontSize: '24px',
        fontWeight: 600,
        marginBottom: '24px',
        color: 'var(--text)',
      }}>
        {labels.title}
      </h3>
      
      {status === 'success' ? (
        <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--gold)' }}>
          {labels.success}
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--secondary)' }}>
              {labels.fields.name}
            </label>
            <input
              type="text"
              required
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              style={inputStyle}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--secondary)' }}>
              {labels.fields.contact}
            </label>
            <input
              type="text"
              required
              value={formState.contact}
              onChange={(e) => setFormState({ ...formState, contact: e.target.value })}
              style={inputStyle}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--secondary)' }}>
              {labels.fields.message}
            </label>
            <textarea
              required
              rows={5}
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
            />
          </div>
          
          {/* Honeypot */}
          <input
            type="text"
            name="_gotcha"
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
            value={formState._gotcha}
            onChange={(e) => setFormState({ ...formState, _gotcha: e.target.value })}
          />
          
          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              padding: '14px 32px',
              background: 'var(--gold)',
              color: 'var(--bg)',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background .2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--gold-light)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--gold)'}
          >
            {status === 'loading' ? labels.submitting : labels.submit}
          </button>
          
          {status === 'error' && (
            <p style={{ marginTop: '16px', fontSize: '15px', color: 'var(--orange)' }}>
              {labels.error}
            </p>
          )}
        </form>
      )}
      
      <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--hairline)' }}>
        <p style={{ fontSize: '14px', color: 'var(--secondary)', marginBottom: '8px' }}>
          {labels.fallback}
        </p>
        <a
          href={`mailto:${email}`}
          style={{
            color: 'var(--gold)',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: 500,
          }}
        >
          {email}
        </a>
      </div>
    </div>
  );
}
