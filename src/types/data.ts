export interface ProfileLink {
  label: string;
  url: string;
  icon: string;
  primary?: boolean;
}

export interface ProfileData {
  name: string;
  title: string;
  label: string;
  tagline: string;
  photo: string;
  links: ProfileLink[];
}

export interface AboutData {
  sectionNumber: string;
  title: string;
  paragraphs: string[];
}

export interface AICard {
  label: string;
  title: string;
  description: string;
}

export interface AIData {
  sectionNumber: string;
  title: string;
  intro: string;
  cards: AICard[];
}

export interface StackCategory {
  name: string;
  tags: string[];
}

export interface StackData {
  sectionNumber: string;
  title: string;
  categories: StackCategory[];
}

export interface ContactLink {
  label: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  label: string;
  value: string;
}

export interface ContactFormLabels {
  title: string;
  fields: {
    name: string;
    contact: string;
    message: string;
  };
  submit: string;
  submitting: string;
  success: string;
  error: string;
  fallback: string;
  validation: {
    nameEmpty: string;
    emailEmpty: string;
    emailInvalid: string;
    messageEmpty: string;
    messageTooShort: string;
  };
}

export interface ContactsData {
  sectionNumber: string;
  title: string;
  email: string;
  intro: string;
  links: ContactLink[];
  info: ContactInfo[];
  form: ContactFormLabels;
}
