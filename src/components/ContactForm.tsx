import { useState, FormEvent, useRef } from 'react';
import type { ContactFormLabels } from '../types/data';

interface ContactFormProps {
  labels: ContactFormLabels;
  email: string;
}

interface FormErrors {
  name?: string;
  contact?: string;
  message?: string;
}

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mppqkryk';

export default function ContactForm({ labels, email }: ContactFormProps) {
  const [formState, setFormState] = useState({
    name: '',
    contact: '',
    message: '',
    _gotcha: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState({
    name: false,
    contact: false,
    message: false,
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const nameRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const validateField = (field: keyof FormErrors, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!value.trim()) return labels.validation.nameEmpty;
        break;
      case 'contact':
        if (!value.trim()) return labels.validation.emailEmpty;
        if (!validateEmail(value.trim())) return labels.validation.emailInvalid;
        break;
      case 'message':
        if (!value.trim()) return labels.validation.messageEmpty;
        if (value.trim().length < 10) return labels.validation.messageTooShort;
        break;
    }
    return undefined;
  };

  const validateAllFields = (): FormErrors => {
    const newErrors: FormErrors = {};
    const nameError = validateField('name', formState.name);
    const contactError = validateField('contact', formState.contact);
    const messageError = validateField('message', formState.message);
    
    if (nameError) newErrors.name = nameError;
    if (contactError) newErrors.contact = contactError;
    if (messageError) newErrors.message = messageError;
    
    return newErrors;
  };

  const handleBlur = (field: keyof FormErrors) => {
    setTouched({ ...touched, [field]: true });
    const error = validateField(field, formState[field]);
    setErrors({ ...errors, [field]: error });
  };

  const handleChange = (field: keyof typeof formState, value: string) => {
    setFormState({ ...formState, [field]: value });
    if (touched[field as keyof typeof touched]) {
      const error = validateField(field as keyof FormErrors, value);
      setErrors({ ...errors, [field]: error });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (formState._gotcha) return;
    
    const newErrors = validateAllFields();
    setErrors(newErrors);
    setTouched({ name: true, contact: true, message: true });
    
    if (Object.keys(newErrors).length > 0) {
      if (newErrors.name) {
        nameRef.current?.focus();
      } else if (newErrors.contact) {
        contactRef.current?.focus();
      } else if (newErrors.message) {
        messageRef.current?.focus();
      }
      return;
    }
    
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
        setErrors({});
        setTouched({ name: false, contact: false, message: false });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputStyle = (hasError: boolean) => ({
    width: '100%',
    padding: '14px 16px',
    background: 'var(--elevated)',
    border: `1px solid ${hasError ? '#e85d5d' : 'var(--hairline)'}`,
    borderRadius: '8px',
    color: 'var(--text)',
    fontSize: '15px',
    fontFamily: 'var(--body)',
    transition: 'border-color .2s',
  });

  const errorStyle = {
    marginTop: '6px',
    fontSize: '13px',
    color: '#e85d5d',
    lineHeight: 1.4,
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
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: '20px' }}>
            <label 
              htmlFor="contact-name"
              style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--secondary)' }}
            >
              {labels.fields.name}
            </label>
            <input
              id="contact-name"
              ref={nameRef}
              type="text"
              value={formState.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              style={inputStyle(!!errors.name && touched.name)}
              aria-invalid={!!errors.name && touched.name}
              aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
            />
            {errors.name && touched.name && (
              <div id="name-error" role="alert" style={errorStyle}>
                {errors.name}
              </div>
            )}
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label 
              htmlFor="contact-email"
              style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--secondary)' }}
            >
              {labels.fields.contact}
            </label>
            <input
              id="contact-email"
              ref={contactRef}
              type="text"
              value={formState.contact}
              onChange={(e) => handleChange('contact', e.target.value)}
              onBlur={() => handleBlur('contact')}
              style={inputStyle(!!errors.contact && touched.contact)}
              aria-invalid={!!errors.contact && touched.contact}
              aria-describedby={errors.contact && touched.contact ? 'contact-error' : undefined}
            />
            {errors.contact && touched.contact && (
              <div id="contact-error" role="alert" style={errorStyle}>
                {errors.contact}
              </div>
            )}
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label 
              htmlFor="contact-message"
              style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--secondary)' }}
            >
              {labels.fields.message}
            </label>
            <textarea
              id="contact-message"
              ref={messageRef}
              rows={5}
              value={formState.message}
              onChange={(e) => handleChange('message', e.target.value)}
              onBlur={() => handleBlur('message')}
              style={{ ...inputStyle(!!errors.message && touched.message), resize: 'vertical', minHeight: '120px' }}
              aria-invalid={!!errors.message && touched.message}
              aria-describedby={errors.message && touched.message ? 'message-error' : undefined}
            />
            {errors.message && touched.message && (
              <div id="message-error" role="alert" style={errorStyle}>
                {errors.message}
              </div>
            )}
          </div>
          
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
            <p style={{ marginTop: '16px', fontSize: '15px', color: '#e85d5d' }}>
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
