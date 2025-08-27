import React from 'react';
import { Shield, CheckCircle } from 'lucide-react';
import { ThemeClasses } from '../types';

interface SecurityFeaturesProps {
  darkMode: boolean;
  themeClasses: ThemeClasses;
}

const SecurityFeatures: React.FC<SecurityFeaturesProps> = ({ darkMode, themeClasses }) => {
  const securityFeatures = [
    'Multi-signature security',
    'AML/KYC compliance',
    'Real-time monitoring',
    'Insurance coverage'
  ];

  return (
    <div className={`bg-gradient-to-r ${darkMode ? 'from-green-900/20 to-emerald-900/20' : 'from-green-50 to-emerald-50'} border ${darkMode ? 'border-green-700' : 'border-green-200'} rounded-3xl p-6 shadow-xl`}>
      <h3 className={`font-semibold ${darkMode ? 'text-green-300' : 'text-green-900'} mb-4 flex items-center`}>
        <Shield className="w-5 h-5 mr-2" />
        Security Features
      </h3>
      <div className="space-y-3 text-sm">
        {securityFeatures.map((feature, index) => (
          <div key={index} className={`flex items-center ${darkMode ? 'text-green-300' : 'text-green-800'}`}>
            <CheckCircle className="w-4 h-4 mr-2" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityFeatures;