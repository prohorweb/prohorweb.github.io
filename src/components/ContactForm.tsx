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

  return (
    <div className="bg-[var(--surface)] border border-[var(--gold-border)] rounded-[12px] p-[32px]">
      <h3 className="font-[var(--display)] text-[24px] font-semibold mb-[24px] text-[var(--text)]">
        {labels.title}
      </h3>
      
      {status === 'success' ? (
        <p className="text-base leading-[1.6] text-[var(--gold)]">
          {labels.success}
        </p>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-[20px]">
            <label 
              htmlFor="contact-name"
              className="block mb-[8px] text-sm text-[var(--secondary)]"
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
              className={`w-full py-[14px] px-[16px] bg-[var(--elevated)] border rounded-[8px] text-[var(--text)] text-[15px] font-[var(--body)] transition-[border-color] duration-200 ${
                errors.name && touched.name ? 'border-[#e85d5d]' : 'border-[var(--hairline)]'
              }`}
              aria-invalid={!!errors.name && touched.name}
              aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
            />
            {errors.name && touched.name && (
              <div id="name-error" role="alert" className="mt-[6px] text-[13px] text-[#e85d5d] leading-[1.4]">
                {errors.name}
              </div>
            )}
          </div>
          
          <div className="mb-[20px]">
            <label 
              htmlFor="contact-email"
              className="block mb-[8px] text-sm text-[var(--secondary)]"
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
              className={`w-full py-[14px] px-[16px] bg-[var(--elevated)] border rounded-[8px] text-[var(--text)] text-[15px] font-[var(--body)] transition-[border-color] duration-200 ${
                errors.contact && touched.contact ? 'border-[#e85d5d]' : 'border-[var(--hairline)]'
              }`}
              aria-invalid={!!errors.contact && touched.contact}
              aria-describedby={errors.contact && touched.contact ? 'contact-error' : undefined}
            />
            {errors.contact && touched.contact && (
              <div id="contact-error" role="alert" className="mt-[6px] text-[13px] text-[#e85d5d] leading-[1.4]">
                {errors.contact}
              </div>
            )}
          </div>
          
          <div className="mb-[20px]">
            <label 
              htmlFor="contact-message"
              className="block mb-[8px] text-sm text-[var(--secondary)]"
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
              className={`w-full py-[14px] px-[16px] bg-[var(--elevated)] border rounded-[8px] text-[var(--text)] text-[15px] font-[var(--body)] transition-[border-color] duration-200 resize-y min-h-[120px] ${
                errors.message && touched.message ? 'border-[#e85d5d]' : 'border-[var(--hairline)]'
              }`}
              aria-invalid={!!errors.message && touched.message}
              aria-describedby={errors.message && touched.message ? 'message-error' : undefined}
            />
            {errors.message && touched.message && (
              <div id="message-error" role="alert" className="mt-[6px] text-[13px] text-[#e85d5d] leading-[1.4]">
                {errors.message}
              </div>
            )}
          </div>
          
          <input
            type="text"
            name="_gotcha"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            value={formState._gotcha}
            onChange={(e) => setFormState({ ...formState, _gotcha: e.target.value })}
          />
          
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-gold"
          >
            {status === 'loading' ? labels.submitting : labels.submit}
          </button>
          
          {status === 'error' && (
            <p className="mt-[16px] text-[15px] text-[#e85d5d]">
              {labels.error}
            </p>
          )}
        </form>
      )}
      
      <div className="mt-[24px] pt-[24px] border-t border-[var(--hairline)]">
        <p className="text-sm text-[var(--secondary)] mb-[8px]">
          {labels.fallback}
        </p>
        <a
          href={`mailto:${email}`}
          className="text-[var(--gold)] no-underline text-[15px] font-medium"
        >
          {email}
        </a>
      </div>
    </div>
  );
}
