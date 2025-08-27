import React from 'react';
import { CheckCircle, Fingerprint, Loader } from 'lucide-react';
import { Token, ThemeClasses } from '../types';

interface TokenVerificationProps {
  tokens: Token[];
  showApprovalAnimation: string;
  approvalInProgress: string;
  darkMode: boolean;
  themeClasses: ThemeClasses;
  approveToken: (token: Token) => void;
  setCurrentStep: (step: number | (() => Promise<void>)) => void;
}

const TokenVerification: React.FC<TokenVerificationProps> = ({
  tokens,
  showApprovalAnimation,
  approvalInProgress,
  darkMode,
  themeClasses,
  approveToken,
  setCurrentStep
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-xl font-semibold ${themeClasses.text}`}>Verify All Assets</h3>
        <div className={`text-sm ${themeClasses.textSecondary}`}>
          {tokens.filter(t => t.approved).length} of {tokens.length} verified
        </div>
      </div>
      
      <div className={`mb-6 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} border ${darkMode ? 'border-blue-800' : 'border-blue-200'} rounded-2xl p-4`}>
        <div className={`flex items-center ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
          <Fingerprint className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">
  Your order is protected by escrow — we verify all assets first to ensure a safe and smooth settlement.<br />
  <span className="text-xs text-gray-500">
    This protects you from fraud or delivery issues.
  </span>
</span>

        </div>
      </div>

      <div className="space-y-3">
        {tokens.map((token, index) => (
          <div key={token.contractAddress} className={`${themeClasses.cardBg} rounded-2xl p-4 ${themeClasses.hover} transition-all duration-300 ${themeClasses.border} border ${
            showApprovalAnimation === token.symbol ? 'ring-4 ring-green-300 ring-opacity-50 scale-105' : ''
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${themeClasses.gradient} rounded-2xl flex items-center justify-center text-white font-bold shadow-lg`}>
                  {token.symbol?.charAt(0)}
                </div>
                <div>
                  <div className={`font-semibold ${themeClasses.text}`}>{token.name}</div>
                  <div className={`text-sm ${themeClasses.textSecondary}`}>
                    {token.balance} {token.symbol} • {token.value}
                  </div>
                  <div className={`text-xs ${themeClasses.textSecondary} font-mono`}>
                    {token.contractAddress?.slice(0, 10)}...
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                {token.approved ? (
                  <div className={`flex items-center text-green-600 ${darkMode ? 'bg-green-900/20' : 'bg-green-50'} px-3 py-2 rounded-xl transition-all duration-500 ${
                    showApprovalAnimation === token.symbol ? 'animate-pulse' : ''
                  }`}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Verified</span>
                    {showApprovalAnimation === token.symbol && (
                      <Fingerprint className="w-4 h-4 ml-2 text-green-600 animate-bounce" />
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => approveToken(token)}
                    disabled={approvalInProgress === token.symbol}
                    className={`bg-gradient-to-r ${themeClasses.gradient} text-white px-4 py-2 rounded-xl text-sm font-medium hover:shadow-lg disabled:opacity-50 flex items-center transition-all duration-300`}
                  >
                    {approvalInProgress === token.symbol ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Fingerprint className="w-4 h-4 mr-2" />
                        Verify Asset
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {tokens.every(t => t.approved) && (
        <div className={`mt-6 ${darkMode ? 'bg-green-900/20' : 'bg-green-50'} border ${darkMode ? 'border-green-700' : 'border-green-200'} rounded-2xl p-4`}>
          <div className={`flex items-center ${darkMode ? 'text-green-300' : 'text-green-800'} mb-2`}>
            <CheckCircle className="w-5 h-5 mr-2" />
            <span className="font-medium">All assets verified successfully!</span>
          </div>
          <p className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
            You can now proceed to confirm your order.
          </p>
          <p className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
            ⚠️ Please note: Funds will not be auto-debited or processed until the payout amount has been fully settled to your selected payment method.
To ensure a smooth and secure transaction, please do not withdraw or move your funds until processing is completed.
          </p>
        </div>
      )}
      
      <button
        onClick={() => {
          if (typeof setCurrentStep === 'function' && setCurrentStep.constructor.name === 'AsyncFunction') {
            (setCurrentStep as () => Promise<void>)();
          } else {
            (setCurrentStep as (step: number) => void)(5);
          }
        }}
        disabled={!tokens.every(t => t.approved)}
        className={`w-full bg-gradient-to-r ${themeClasses.gradient} text-white py-3 rounded-2xl font-semibold hover:shadow-xl disabled:opacity-50 mt-6 transition-all duration-300`}
      >
        {tokens.every(t => t.approved) ? 'Proceed to Order Confirmation' : `Verify ${tokens.filter(t => !t.approved).length} More Asset${tokens.filter(t => !t.approved).length > 1 ? 's' : ''}`}
      </button>
    </div>
  );
};

export default TokenVerification;