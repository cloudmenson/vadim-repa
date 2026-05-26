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
      route: string;
      type: string;
      button: string;
      privacy: string;
    };
  };
  services: {
    title: string;
    items: {
      intl: { title: string; desc: string };
      imp_exp: { title: string; desc: string };
      customs: { title: string; desc: string };
      special: { title: string; desc: string };
      support: { title: string; desc: string };
    };
  };
};

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default as Dictionary),
  uk: () => import('./uk.json').then((module) => module.default as Dictionary),
};

export const getDictionary = async (locale: 'en' | 'uk') => 
  dictionaries[locale]();
