import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { ThemeClasses } from '../types';

interface LanguageSelectorProps {
  darkMode: boolean;
  themeClasses: ThemeClasses;
}

const languages = [
  { code: 'en', name: 'English',  nativeName: 'English' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'de', name: 'German',  nativeName: 'Deutsch' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean',  nativeName: '한국어' },
  { code: 'ar', name: 'Arabic',  nativeName: 'العربية' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'it', name: 'Italian',  nativeName: 'Italiano' },
  { code: 'nl', name: 'Dutch',  nativeName: 'Nederlands' },
  { code: 'tr', name: 'Turkish',  nativeName: 'Türkçe' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'zh', name: 'Chinese',  nativeName: '中文' },
  { code: 'es', name: 'Spanish',  nativeName: 'Español' },
  { code: 'fr', name: 'French',nativeName: 'Français' },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ darkMode, themeClasses }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg sm:rounded-xl ${themeClasses.hover} transition-all duration-200 border ${themeClasses.border} ${themeClasses.cardBg} shadow-sm hover:shadow-md`}
      >
        <Globe className={`w-3 h-3 sm:w-4 sm:h-4 ${themeClasses.text}`} />
        <span className="text-sm sm:text-lg">{currentLanguage.flag}</span>
        <span className={`text-sm font-medium ${themeClasses.text} hidden sm:block`}>
          {currentLanguage.nativeName}
        </span>
        <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 ${themeClasses.textSecondary} transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className={`absolute right-0 top-full mt-2 w-64 sm:w-72 ${themeClasses.cardBg} rounded-xl sm:rounded-2xl border ${themeClasses.border} shadow-2xl z-50 overflow-hidden backdrop-blur-xl max-h-80 sm:max-h-96 overflow-y-auto`}>
            <div className={`p-3 border-b ${themeClasses.border} bg-gradient-to-r ${darkMode ? 'from-blue-900/20 to-purple-900/20' : 'from-blue-50 to-purple-50'}`}>
              <div className="flex items-center space-x-2">
                <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                <span className={`text-sm font-semibold ${themeClasses.text}`}>
                  Select Language
                </span>
              </div>
            </div>
            
            <div className="py-2">
              {languages.slice(0, 10).map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 ${themeClasses.hover} transition-all duration-200 group`}
                >
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span className="text-lg sm:text-xl group-hover:scale-110 transition-transform duration-200">
                      {language.flag}
                    </span>
                    <div className="text-left">
                      <div className={`text-xs sm:text-sm font-medium ${themeClasses.text}`}>
                        {language.nativeName}
                      </div>
                      <div className={`text-xs ${themeClasses.textSecondary}`}>
                        {language.name}
                      </div>
                    </div>
                  </div>
                  
                  {currentLanguage.code === language.code && (
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            {languages.length > 10 && (
              <div className="py-2 border-t border-gray-200 dark:border-gray-700">
                {languages.slice(10).map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`w-full flex items-center justify-between px-4 py-3 ${themeClasses.hover} transition-all duration-200 group`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                        {language.flag}
                      </span>
                      <div className="text-left">
                        <div className={`text-sm font-medium ${themeClasses.text}`}>
                          {language.nativeName}
                        </div>
                        <div className={`text-xs ${themeClasses.textSecondary}`}>
                          {language.name}
                        </div>
                      </div>
                    </div>
                    
                    {currentLanguage.code === language.code && (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <Check className="w-4 h-4 text-green-600" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
            
            {/* Footer */}
            <div className={`p-3 border-t ${themeClasses.border} bg-gradient-to-r ${darkMode ? 'from-gray-800/50 to-gray-700/50' : 'from-gray-50 to-gray-100'}`}>
              <div className={`text-xs ${themeClasses.textSecondary} text-center`}>
                Language preference is saved automatically • {languages.length} languages available
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSelector;