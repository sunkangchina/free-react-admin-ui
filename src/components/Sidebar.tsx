import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Package, 
  FileText,
  LogOut,
  Boxes,
  PlusCircle,
  ChevronDown,
  ChevronRight,
  LogIn,
  Palette
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSidebar } from '../contexts/SidebarContext';
import { useAuth } from '../contexts/AuthContext';
import { Modal } from './Modal';

const menuItems = [
  { icon: LayoutDashboard, label: 'common.dashboard', href: '/' },
  { icon: Users, label: 'common.users', href: '/users' },
  { 
    icon: Package, 
    label: 'common.products',
    isExpandable: true,
    subItems: [
      { icon: Boxes, label: 'common.product', href: '/products' },
      { icon: PlusCircle, label: 'common.add', href: '/products/new' }
    ]
  },
  { icon: FileText, label: 'common.reports', href: '/reports' },
  { 
    icon: Settings, 
    label: 'common.settings',
    isExpandable: true,
    subItems: [
      { icon: LogIn, label: 'common.loginSettings', href: '/settings' },
      { icon: Palette, label: 'common.themeSettings', href: '/settings/theme' }
    ]
  },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen } = useSidebar();
  const { t } = useTranslation();
  const { logout } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    logout();
    setIsLogoutModalOpen(false);
    navigate('/login');
  };

  const toggleMenu = (label: string, item: typeof menuItems[0]) => {
    const isCurrentlyExpanded = expandedMenus.includes(label);
    
    setExpandedMenus(prev => 
      isCurrentlyExpanded
        ? prev.filter(menuLabel => menuLabel !== label)
        : [...prev, label]
    );

    // When expanding and there are sub-items, navigate to the first sub-item
    if (!isCurrentlyExpanded && item.subItems && item.subItems.length > 0) {
      navigate(item.subItems[0].href);
    }
  };

  const isCurrentPath = (item: typeof menuItems[0]) => {
    if (item.isExpandable && item.subItems) {
      return false; // 如果有子菜单，父菜单永远不显示选中效果
    }
    return location.pathname === item.href;
  };

  return (
    <div className={`fixed h-screen flex flex-col transition-all duration-300 ${
      isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'
    }`}
    style={{
      backgroundColor: 'var(--sidebar-bg)',
      color: 'var(--sidebar-text)',
      borderRight: '1px solid var(--sidebar-border)'
    }}>
      <div className="p-5" style={{ borderBottom: '1px solid var(--sidebar-border)' }}>
        <h1 className="text-xl font-bold">{t('common.adminPanel')}</h1>
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              {item.isExpandable ? (
                <button
                  onClick={() => toggleMenu(item.label, item)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors hover:bg-opacity-80`}
                  style={{
                    backgroundColor: 'transparent',
                    color: 'var(--sidebar-text)'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    <span>{t(item.label)}</span>
                  </div>
                  {expandedMenus.includes(item.label) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              ) : (
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-opacity-80`}
                  style={{
                    backgroundColor: isCurrentPath(item) ? 'var(--sidebar-active-item)' : 'transparent',
                    color: 'var(--sidebar-text)'
                  }}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{t(item.label)}</span>
                </Link>
              )}
              {item.subItems && expandedMenus.includes(item.label) && (
                <ul className="ml-6 mt-1 space-y-1">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.label}>
                      <Link
                        to={subItem.href}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:bg-opacity-80`}
                        style={{
                          backgroundColor: location.pathname === subItem.href ? 'var(--sidebar-active-item)' : 'transparent',
                          color: 'var(--sidebar-text)'
                        }}
                      >
                        <subItem.icon className="w-4 h-4" />
                        <span>{t(subItem.label)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4" style={{ borderTop: '1px solid var(--sidebar-border)' }}>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-opacity-80 rounded-lg transition-colors w-full"
          style={{
            color: 'var(--sidebar-text)'
          }}
        >
          <LogOut className="w-5 h-5" />
          <span>{t('common.logout')}</span>
        </button>
      </div>

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={confirmLogout}
        title={t('common.confirmLogout')}
        message={t('common.logoutMessage')}
      />
    </div>
  );
}