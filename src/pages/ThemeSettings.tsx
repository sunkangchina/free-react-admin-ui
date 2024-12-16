import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../components/Card';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeSettings() {
  const { t } = useTranslation();
  const { colors, updateColors } = useTheme();

  const handleColorChange = (key: keyof typeof colors, value: string) => {
    updateColors({ [key]: value });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{t('theme.title')}</h1>
      <p className="text-gray-600 mb-6">{t('theme.description')}</p>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold mb-4">{t('theme.sidebar.title')}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('theme.sidebar.backgroundColor')}
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={colors.sidebarBg}
                    onChange={(e) => handleColorChange('sidebarBg', e.target.value)}
                    className="w-20 h-10"
                  />
                  <span>{colors.sidebarBg}</span>
                </div>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('theme.sidebar.textColor')}
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={colors.sidebarText}
                    onChange={(e) => handleColorChange('sidebarText', e.target.value)}
                    className="w-20 h-10"
                  />
                  <span>{colors.sidebarText}</span>
                </div>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('theme.sidebar.activeItemColor')}
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={colors.sidebarActiveItem}
                    onChange={(e) => handleColorChange('sidebarActiveItem', e.target.value)}
                    className="w-20 h-10"
                  />
                  <span>{colors.sidebarActiveItem}</span>
                </div>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {t('theme.sidebar.borderColor')}
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={colors.sidebarBorder}
                    onChange={(e) => handleColorChange('sidebarBorder', e.target.value)}
                    className="w-20 h-10"
                  />
                  <span>{colors.sidebarBorder}</span>
                </div>
              </label>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4">{t('theme.buttons.title')}</h2>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('theme.buttons.primary')}
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={colors.buttonPrimary}
                        onChange={(e) => handleColorChange('buttonPrimary', e.target.value)}
                        className="w-20 h-10"
                      />
                      <span>{colors.buttonPrimary}</span>
                    </div>
                  </label>
                  <button
                    className="px-4 py-2 rounded-lg text-white"
                    style={{ backgroundColor: colors.buttonPrimary }}
                  >
                    {t('theme.buttons.primary')}
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('theme.buttons.warning')}
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={colors.buttonWarning}
                        onChange={(e) => handleColorChange('buttonWarning', e.target.value)}
                        className="w-20 h-10"
                      />
                      <span>{colors.buttonWarning}</span>
                    </div>
                  </label>
                  <button
                    className="px-4 py-2 rounded-lg text-white"
                    style={{ backgroundColor: colors.buttonWarning }}
                  >
                    {t('theme.buttons.warning')}
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('theme.buttons.danger')}
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={colors.buttonDanger}
                        onChange={(e) => handleColorChange('buttonDanger', e.target.value)}
                        className="w-20 h-10"
                      />
                      <span>{colors.buttonDanger}</span>
                    </div>
                  </label>
                  <button
                    className="px-4 py-2 rounded-lg text-white"
                    style={{ backgroundColor: colors.buttonDanger }}
                  >
                    {t('theme.buttons.danger')}
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('theme.buttons.success')}
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={colors.buttonSuccess}
                        onChange={(e) => handleColorChange('buttonSuccess', e.target.value)}
                        className="w-20 h-10"
                      />
                      <span>{colors.buttonSuccess}</span>
                    </div>
                  </label>
                  <button
                    className="px-4 py-2 rounded-lg text-white"
                    style={{ backgroundColor: colors.buttonSuccess }}
                  >
                    {t('theme.buttons.success')}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t('theme.pagination.title')}
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={colors.paginationActive}
                    onChange={(e) => handleColorChange('paginationActive', e.target.value)}
                    className="w-20 h-10"
                  />
                  <span>{colors.paginationActive}</span>
                </div>
              </label>
              <div className="mt-2 flex gap-2">
                <div
                  className="w-8 h-8 rounded flex items-center justify-center text-white"
                  style={{ backgroundColor: colors.paginationActive }}
                >
                  1
                </div>
                <div className="w-8 h-8 rounded flex items-center justify-center border">
                  2
                </div>
                <div className="w-8 h-8 rounded flex items-center justify-center border">
                  3
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
