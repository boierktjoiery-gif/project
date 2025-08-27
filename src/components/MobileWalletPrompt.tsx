import React, { useState, useEffect } from 'react';
import { Smartphone, ExternalLink, X, Wallet, Shield, Zap, AlertTriangle } from 'lucide-react';
import { isRegularMobileBrowser, getTrustWalletDeeplink, isDappBrowser } from '../utils';
import { ThemeClasses } from '../types';

interface MobileWalletPromptProps {
  darkMode: boolean;
  themeClasses: ThemeClasses;
  show?: boolean;
  onClose?: () => void;
}

const MobileWalletPrompt: React.FC<MobileWalletPromptProps> = ({ darkMode, themeClasses, show, onClose }) => {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Skip prompt if already in Trust Wallet or MetaMask
    if (isDappBrowser()) {
      setShowPrompt(false);
      return;
    }
    
    // If show prop is provided, use it to control visibility (for manual trigger)
    if (show !== undefined) {
      setShowPrompt(show);
      return;
    }
    
    // Auto-show logic (only if no manual control)
    if (isRegularMobileBrowser()) {
      // Show prompt after a short delay
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [show]);

  const handleOpenInTrustWallet = () => {
    const currentUrl = window.location.href;
    const trustWalletUrl = getTrustWalletDeeplink(currentUrl);
    
    // Log for debugging
    console.log('Opening Trust Wallet with URL:', trustWalletUrl);
    console.log('Current URL:', currentUrl);
    
    // Try to open in Trust Wallet
    window.location.href = trustWalletUrl;
    
    // Close the prompt
    handleClose();
  };

  const handleClose = () => {
    setShowPrompt(false);
    if (onClose) {
      onClose();
    }
  };

  const handleContinueHere = () => {
    setShowPrompt(false);
    if (onClose) {
      onClose();
    }
  };

  if (!showPrompt) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
        {/* Modal */}
        <div className={`${themeClasses.cardBg} rounded-3xl shadow-2xl max-w-md w-full border-2 ${darkMode ? 'border-blue-800' : 'border-blue-200'} overflow-hidden relative z-[10000]`}>
          {/* Header */}
          <div className={`bg-gradient-to-r ${darkMode ? 'from-blue-900/30 to-purple-900/30' : 'from-blue-50 to-purple-50'} p-6 border-b ${themeClasses.border} relative`}>
            <button
              onClick={handleClose}
              className={`absolute top-4 right-4 p-2 rounded-full ${themeClasses.hover} transition-colors`}
            >
              <X className={`w-5 h-5 ${themeClasses.textSecondary}`} />
            </button>
            
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${themeClasses.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className={`text-xl font-bold ${themeClasses.text}`}>Mobile DApp Access</h3>
                <p className={`text-sm ${themeClasses.textSecondary}`}>Better experience available</p>
              </div>
            </div>
            
            <div className={`${darkMode ? 'bg-orange-900/20' : 'bg-orange-50'} border ${darkMode ? 'border-orange-700' : 'border-orange-200'} rounded-xl p-3 flex items-start space-x-2`}>
              <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
              <div className={`text-xs ${darkMode ? 'text-orange-300' : 'text-orange-800'}`}>
                <strong>Mobile Browser Detected:</strong> This DApp requires a Web3 wallet browser for full functionality. Regular mobile browsers like Safari and Chrome don't support direct wallet connections.
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <img 
                  src="https://trustwallet.com/assets/images/media/assets/trust_platform.svg" 
                  alt="Trust Wallet" 
                  className="w-16 h-16 rounded-2xl"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className={`hidden w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center`}>
                  <Wallet className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h4 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>
                Open in Trust Wallet Browser
              </h4>
              <p className={`text-sm ${themeClasses.textSecondary} mb-4`}>
                For the best experience and full functionality, open this DApp in Trust Wallet's built-in browser.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center`}>
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className={`text-sm font-medium ${themeClasses.text}`}>Secure Wallet Integration</div>
                  <div className={`text-xs ${themeClasses.textSecondary}`}>Direct access to your crypto assets</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center`}>
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className={`text-sm font-medium ${themeClasses.text}`}>Instant Transactions</div>
                  <div className={`text-xs ${themeClasses.textSecondary}`}>Fast and seamless crypto swaps</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl flex items-center justify-center`}>
                  <Wallet className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className={`text-sm font-medium ${themeClasses.text}`}>Full DApp Support</div>
                  <div className={`text-xs ${themeClasses.textSecondary}`}>Access all features without limitations</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleOpenInTrustWallet}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Open in Trust Wallet</span>
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleContinueHere}
                  className={`border-2 ${themeClasses.border} ${themeClasses.text} py-3 rounded-xl font-medium ${themeClasses.hover} transition-all duration-300`}
                >
                  Remind Later
                </button>
                
                <button
                  onClick={handleClose}
                  className={`${themeClasses.textSecondary} py-3 rounded-xl font-medium ${themeClasses.hover} transition-all duration-300`}
                >
                  Continue Here
                </button>
              </div>
            </div>

            {/* Help Text */}
            <div className={`mt-4 text-center text-xs ${themeClasses.textSecondary}`}>
              <p>Don't have Trust Wallet? Download it from your app store first.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileWalletPrompt;