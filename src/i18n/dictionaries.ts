import 'server-only';

export type Dictionary = {
  header: {
    nav: {
      home: string;
      services: string;
      about: string;
      advantages: string;
      process: string;
      contacts: string;
    };
    calculate: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    stats: string;
    form: {
      title: string;
      name: string;
      phone: string;
      from: string;
      to: string;
      type: string;
      info: string;
      button: string;
      privacy: string;
      required: string;
      invalid_phone: string;
      success: string;
      success_desc: string;
      submitting: string;
    };
  };
  whyUs: {
    title: string;
    items: { title: string; desc: string }[];
  };
  services: {
    title: string;
    items: {
      intl: { title: string; desc: string };
      groupage: { title: string; desc: string };
      imp_exp: { title: string; desc: string };
      customs: { title: string; desc: string };
      adr: { title: string; desc: string };
      support: { title: string; desc: string };
    };
  };
  process: {
    title: string;
    button: string;
    steps: { title: string; desc: string }[];
  };
  trust: {
    title: string;
    desc: string;
    experience: string;
    stats: { label: string }[];
  };
  cta: {
    title: string;
    desc: string;
    button: string;
  };
  footer: {
    desc: string;
    nav: string;
    services: string;
    contacts: string;
    city: string;
  };
};

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default as Dictionary),
  uk: () => import('./uk.json').then((module) => module.default as Dictionary),
};

export const getDictionary = async (locale: 'en' | 'uk') => 
  dictionaries[locale]();
