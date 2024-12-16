import React, { useState } from 'react';
import { User, Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSidebar } from '../contexts/SidebarContext';
import { NotificationDropdown } from './NotificationDropdown';
import { LanguageSelector } from './LanguageSelector';
import { Modal } from './Modal';
import { GlobalSearch } from './common/GlobalSearch';

export function Header() {
  const { user, logout } = useAuth();
  const { toggle } = useSidebar();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={toggle}
          className="p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>
        <GlobalSearch />
      </div>

      <div className="flex items-center gap-4">
        <NotificationDropdown />
        <LanguageSelector />
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg"
          >
            <User className="w-6 h-6 text-gray-600" />
            <span className="text-sm font-medium">{user?.name}</span>
          </button>
          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  {t('common.logout')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={confirmLogout}
        title={t('common.confirmLogout')}
        message={t('common.logoutMessage')}
      />
    </header>
  );
}