import React from 'react';
import { TRUST_BADGES } from '../constants';
import { ThemeClasses } from '../types';

interface TrustBadgesProps {
  darkMode: boolean;
  themeClasses: ThemeClasses;
}

const TrustBadges: React.FC<TrustBadgesProps> = ({ darkMode, themeClasses }) => {
  return (
    <div className={`${themeClasses.cardBg} backdrop-blur-sm border-b ${themeClasses.border} rounded-3xl mt-8 shadow-xl`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center mb-4">
          <h3 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>Trusted & Verified Platform</h3>
          <p className={`text-sm ${themeClasses.textSecondary}`}>Industry-leading security and compliance standards</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {TRUST_BADGES.map((badge, index) => (
            <div key={index} className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50/50'} border ${themeClasses.border} rounded-2xl p-4 text-center hover:shadow-xl transition-all duration-300 group`}>
              <div className={`w-10 h-10 bg-gradient-to-r ${badge.color} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <badge.icon className="w-5 h-5 text-white" />
              </div>
              <div className={`text-xs font-medium ${themeClasses.text}`}>
                {badge.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;