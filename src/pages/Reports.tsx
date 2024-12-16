import React from 'react';
import { BarChart3 } from 'lucide-react';
import ReactECharts from 'echarts-for-react';
import { useTranslation } from 'react-i18next';

interface StatCard {
  label: string;
  value: string;
  trend: number;
}

// Mock data generator for statistics
const generateMockStats = (): StatCard[] => {
  return [
    { label: 'reports.periods.today', value: '¥12,345', trend: 15.2 },
    { label: 'reports.periods.yesterday', value: '¥11,876', trend: -5.8 },
    { label: 'reports.periods.thisWeek', value: '¥85,432', trend: 8.4 },
    { label: 'reports.periods.lastWeek', value: '¥78,965', trend: 3.2 },
    { label: 'reports.periods.thisMonth', value: '¥342,198', trend: 12.5 },
    { label: 'reports.periods.lastMonth', value: '¥315,876', trend: -2.3 },
    { label: 'reports.periods.thisYear', value: '¥3,654,789', trend: 25.8 },
    { label: 'reports.periods.lastYear', value: '¥2,987,654', trend: 18.4 },
  ];
};

// Mock data generator for monthly chart
const generateMonthlyData = () => {
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  const revenue = months.map(() => Math.floor(Math.random() * 500000 + 100000));
  const orders = months.map(() => Math.floor(Math.random() * 1000 + 200));

  return {
    months,
    revenue,
    orders,
  };
};

const StatisticCard = ({ stat }: { stat: StatCard }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-500 text-sm font-medium">{t(stat.label)}</h3>
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
          stat.trend >= 0 
            ? 'text-green-800 bg-green-100' 
            : 'text-red-800 bg-red-100'
        }`}>
          {stat.trend >= 0 ? '+' : ''}{stat.trend}%
        </span>
      </div>
      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
    </div>
  );
};

export function Reports() {
  const { t } = useTranslation();
  const stats = generateMockStats();
  const monthlyData = generateMonthlyData();

  const chartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: [t('reports.chart.revenue'), t('reports.chart.orders')]
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: monthlyData.months,
      axisLabel: {
        interval: 0,
        rotate: 30
      }
    },
    yAxis: [
      {
        type: 'value',
        name: t('reports.chart.revenue'),
        min: 0,
        axisLabel: {
          formatter: (value: number) => {
            return (value / 10000).toFixed(0) + 'w';
          }
        }
      },
      {
        type: 'value',
        name: t('reports.chart.orders'),
        min: 0,
        axisLine: {
          show: true,
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: t('reports.chart.revenue'),
        type: 'bar',
        data: monthlyData.revenue,
        itemStyle: {
          color: '#3B82F6'
        }
      },
      {
        name: t('reports.chart.orders'),
        type: 'line',
        yAxisIndex: 1,
        data: monthlyData.orders,
        itemStyle: {
          color: '#10B981'
        },
        lineStyle: {
          width: 3
        },
        symbol: 'circle',
        symbolSize: 8
      }
    ]
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <BarChart3 className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">{t('reports.title')}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatisticCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">{t('reports.monthlyStats')}</h2>
        <ReactECharts 
          option={chartOption}
          style={{ height: '500px' }}
          className="w-full"
        />
      </div>
    </div>
  );
}
