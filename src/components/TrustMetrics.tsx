import React from 'react';
import { useTranslation } from 'react-i18next';
import { TRUST_METRICS } from '../constants';
import { ThemeClasses } from '../types';

interface TrustMetricsProps {
  darkMode: boolean;
  themeClasses: ThemeClasses;
}

const TrustMetrics: React.FC<TrustMetricsProps> = ({ darkMode, themeClasses }) => {
  const { t } = useTranslation();
  
  const translatedMetrics = [
    { ...TRUST_METRICS[0], label: t('trust.totalVolume') },
    { ...TRUST_METRICS[1], label: t('trust.activeUsers') },
    { ...TRUST_METRICS[2], label: t('trust.successRate') },
    { ...TRUST_METRICS[3], label: t('trust.avgSettlement') }
  ];
  
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {translatedMetrics.map((metric, i) => (
        <div key={i} className={`${themeClasses.cardBg} backdrop-blur-xl rounded-2xl p-6 border ${themeClasses.border} hover:shadow-2xl transition-all duration-300 hover:scale-105 group`}>
          <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
            <metric.icon className="w-6 h-6 text-white" />
          </div>
          <div className={`text-2xl font-bold mb-2 ${themeClasses.text}`}>{metric.value}</div>
          <div className={`text-sm ${themeClasses.textSecondary}`}>{metric.label}</div>
        </div>
      ))}
    </div>
  );
};

export default TrustMetrics;