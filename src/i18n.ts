import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zhJSON from './locales/zh.json';
import enJSON from './locales/en.json';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  zh: {
    translation: zhJSON
  },
  en: {
    translation: enJSON
  }
};

// 从 localStorage 获取语言设置，如果没有则默认为中文
const getStoredLanguage = () => {
  const storedLang = localStorage.getItem('preferredLanguage');
  return storedLang || 'zh';
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: getStoredLanguage(),
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'preferredLanguage',
      caches: ['localStorage']
    },
    react: {
      useSuspense: true,
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
      skipTransRender: false
    }
  });

// 监听语言变化并保存到 localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('preferredLanguage', lng);
});

export default i18n;
