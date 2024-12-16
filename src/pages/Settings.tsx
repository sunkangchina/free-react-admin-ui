import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Lock, Globe, Bell, Key } from 'lucide-react';

interface SettingCard {
  title: string;
  description: string;
  icon: React.ElementType;
  fields: {
    key: string;
    label: string;
    type: 'text' | 'password' | 'switch';
    value: string | boolean;
  }[];
}

export function Settings() {
  const { t } = useTranslation();
  const [settings, setSettings] = useState<Record<string, string | boolean>>({
    googleClientId: '',
    googleClientSecret: '',
    googleRedirectUri: '',
    enableGoogleLogin: false,
  });

  const handleChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const settingCards: SettingCard[] = [
    {
      title: t('settings.authentication.google.title'),
      description: t('settings.authentication.google.description'),
      icon: Key,
      fields: [
        {
          key: 'googleClientId',
          label: t('settings.authentication.google.clientId'),
          type: 'text',
          value: settings.googleClientId as string,
        },
        {
          key: 'googleClientSecret',
          label: t('settings.authentication.google.clientSecret'),
          type: 'password',
          value: settings.googleClientSecret as string,
        },
        {
          key: 'googleRedirectUri',
          label: t('settings.authentication.google.redirectUri'),
          type: 'text',
          value: settings.googleRedirectUri as string,
        },
        {
          key: 'enableGoogleLogin',
          label: t('settings.authentication.google.enabled'),
          type: 'switch',
          value: settings.enableGoogleLogin as boolean,
        },
      ],
    },
  ];

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving settings:', settings);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('settings.title')}</h1>
          <p className="mt-1 text-sm text-gray-500">{t('settings.description')}</p>
        </div>
        <button
          onClick={handleSave}
          className="btn-primary px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{
            borderColor: 'var(--button-primary)'
          }}
        >
          {t('common.save')}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {settingCards.map((card) => (
          <div key={card.title} className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <card.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{card.title}</h2>
                  <p className="text-sm text-gray-500">{card.description}</p>
                </div>
              </div>

              <div className="space-y-6">
                {card.fields.map((field) => (
                  <div key={field.key} className="flex flex-col space-y-1.5">
                    <label className="text-sm font-medium text-gray-700">
                      {field.label}
                    </label>
                    {field.type === 'switch' ? (
                      <div className="flex items-center">
                        <button
                          onClick={() => handleChange(field.key, !field.value)}
                          className={`
                            relative inline-flex h-6 w-11 items-center rounded-full
                            ${field.value ? 'bg-blue-600' : 'bg-gray-200'}
                            transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                          `}
                        >
                          <span
                            className={`
                              inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out
                              ${field.value ? 'translate-x-6' : 'translate-x-1'}
                            `}
                          />
                        </button>
                        <span className="ml-3 text-sm text-gray-500">
                          {field.value ? t('common.enabled') : t('common.disabled')}
                        </span>
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        value={field.value as string}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        className="
                          block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5
                          text-gray-900 
                          focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
                          disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500
                        "
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
