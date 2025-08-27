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
        
        
      </div>
    </div>
  );
};

export default TrustBadges;