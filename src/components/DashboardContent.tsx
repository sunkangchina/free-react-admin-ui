import React from 'react';
import { Users, Package, DollarSign, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { OnlineDevicesChart } from './OnlineDevicesChart';

const generateStats = () => [
  { label: 'dashboard.stats.totalUsers', value: '12,345', icon: Users, trend: '+12%' },
  { label: 'dashboard.stats.totalProducts', value: '892', icon: Package, trend: '+5%' },
  { label: 'dashboard.stats.revenue', value: '$45,678', icon: DollarSign, trend: '+8%' },
  { label: 'dashboard.stats.growth', value: '23%', icon: TrendingUp, trend: '+2%' },
];

export function DashboardContent() {
  const { t } = useTranslation();
  const stats = generateStats();

  return (
    <div className="p-6 bg-gray-50 flex-1">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{t('dashboard.title')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <stat.icon className="w-6 h-6 text-blue-500" />
              </div>
              <span className="text-green-500 text-sm font-medium">{stat.trend}</span>
            </div>
            <h3 className="text-gray-500 text-sm">{t(stat.label)}</h3>
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <OnlineDevicesChart />
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('dashboard.recentActivity.title')}</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gray-100 rounded-full"></div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-800">
                    {t('dashboard.recentActivity.item', { number: item })}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {t('dashboard.recentActivity.description')}
                  </p>
                </div>
                <span className="text-sm text-gray-400">2h ago</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}