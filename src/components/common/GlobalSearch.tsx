import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  title: string;
  type: 'user' | 'product' | 'report' | 'setting' | 'login' | 'theme';
  path: string;
  parent?: string;
}

export function GlobalSearch() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock search data - 在实际应用中，这些数据应该从API获取
  const mockSearch = (searchQuery: string): SearchResult[] => {
    if (!searchQuery) return [];

    const searchData: SearchResult[] = [
      // 主菜单项
      {
        id: '1',
        title: t('common.dashboard'),
        type: 'user',
        path: '/'
      },
      {
        id: '2',
        title: t('common.users'),
        type: 'user',
        path: '/users'
      },
      // 产品管理及其子菜单
      {
        id: '3',
        title: t('common.products'),
        type: 'product',
        path: '/products'
      },
      {
        id: '4',
        title: t('common.add'),
        type: 'product',
        path: '/products/new',
        parent: t('common.products')
      },
      // 报表统计
      {
        id: '5',
        title: t('common.reports'),
        type: 'report',
        path: '/reports'
      },
      // 系统设置及其子菜单
      {
        id: '6',
        title: t('common.settings'),
        type: 'setting',
        path: '/settings'
      },
      {
        id: '7',
        title: t('common.loginSettings'),
        type: 'login',
        path: '/settings',
        parent: t('common.settings')
      },
      {
        id: '8',
        title: t('common.themeSettings'),
        type: 'theme',
        path: '/settings/theme',
        parent: t('common.settings')
      }
    ];

    return searchData.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.parent?.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    const searchResults = mockSearch(value);
    setResults(searchResults);
    setIsOpen(true);
    setSelectedIndex(-1);
  };

  const handleResultClick = (result: SearchResult) => {
    navigate(result.path);
    setIsOpen(false);
    setQuery('');
  };

  // 键盘导航
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultClick(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  // 点击外部关闭搜索结果
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex-1 max-w-md" ref={searchRef}>
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={t('common.search')}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
          {results.map((result, index) => (
            <button
              key={result.id}
              onClick={() => handleResultClick(result)}
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                index === selectedIndex ? 'bg-gray-50' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                {result.parent && (
                  <span className="text-xs text-gray-400">{result.parent} /</span>
                )}
                <span className="text-sm font-medium text-gray-900">{result.title}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
