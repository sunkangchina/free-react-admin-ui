import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from '../ui/Select';

const languages = [
  { value: 'zh', label: '中文' },
  { value: 'en', label: 'English' }
];

export function LanguageSelector() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select
      value={i18n.language}
      onChange={handleLanguageChange}
      options={languages}
      className="w-24"
    />
  );
}
