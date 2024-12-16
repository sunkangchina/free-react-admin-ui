import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { useTranslation } from 'react-i18next';

// Mock data - replace with real API data later
const generateMockData = () => {
  const now = new Date();
  const data = [];
  for (let i = 0; i < 24; i++) {
    const time = new Date(now.getTime() - (23 - i) * 3600 * 1000);
    data.push({
      time: time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      value: Math.floor(Math.random() * (1000 - 800 + 1)) + 800,
    });
  }
  return data;
};

export function OnlineDevicesChart() {
  const { t } = useTranslation();
  const [data] = useState(generateMockData());

  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        const dataPoint = params[0];
        return `${dataPoint.name}<br/>${t('dashboard.onlineDevices.title')}: ${dataPoint.value}`;
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: data.map(item => item.time),
      axisLabel: {
        rotate: 45,
      },
    },
    yAxis: {
      type: 'value',
      name: t('dashboard.onlineDevices.title'),
      min: (value: { min: number }) => Math.floor(value.min * 0.9),
    },
    series: [
      {
        name: t('dashboard.onlineDevices.title'),
        type: 'line',
        smooth: true,
        data: data.map(item => item.value),
        areaStyle: {
          opacity: 0.1,
        },
        lineStyle: {
          width: 3,
        },
        itemStyle: {
          color: '#3B82F6',
        },
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{t('dashboard.onlineDevices.title')}</h2>
        <div className="text-sm text-gray-500">{t('dashboard.onlineDevices.last24Hours', { defaultValue: '最近24小时' })}</div>
      </div>
      <ReactECharts
        option={option}
        style={{ height: '400px' }}
        className="w-full"
      />
    </div>
  );
}
