import React from 'react';
import { CheckCircle, CreditCard } from 'lucide-react';
import { Token, PaymentDetails, ThemeClasses } from '../types';
import { COUNTRIES } from '../constants';

interface OrderConfirmationProps {
  selectedToken: Token | null;
  tradeAmount: string;
  tokenPrice: number | null;
  selectedCountry: string;
  selectedPaymentMethod: string;
  paymentDetails: PaymentDetails;
  darkMode: boolean;
  themeClasses: ThemeClasses;
  onConfirm: () => void;
  onBack: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  selectedToken,
  tradeAmount,
  tokenPrice,
  selectedCountry,
  selectedPaymentMethod,
  paymentDetails,
  darkMode,
  themeClasses,
  onConfirm,
  onBack
}) => {
  const calculateQuote = () => {
    if (!tradeAmount || !tokenPrice || isNaN(parseFloat(tradeAmount))) return null;
    const marketValue = parseFloat(tradeAmount) * tokenPrice;
    const markupValue = marketValue * 1.15;
    return markupValue;
  };

  const selectedCountryData = COUNTRIES.find(c => c.code === selectedCountry);

  return (
    <div>
      <div className="text-center mb-6">
        <div className={`w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl`}>
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className={`text-xl font-semibold ${themeClasses.text} mb-2`}>Ready to Process Order</h3>
        <p className={themeClasses.textSecondary}>Please review your order details before final confirmation</p>
      </div>

      {/* Order Summary Card */}
      <div className={`bg-gradient-to-r ${darkMode ? 'from-blue-900/20 to-purple-900/20' : 'from-blue-50 to-purple-50'} border ${darkMode ? 'border-blue-800' : 'border-blue-200'} rounded-2xl p-6 mb-6`}>
        <h4 className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-900'} mb-4 flex items-center`}>
          <CreditCard className="w-5 h-5 mr-2" />
          Order Summary
        </h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center">
            <span className={themeClasses.textSecondary}>Asset:</span>
            <span className={`font-semibold ${themeClasses.text}`}>{selectedToken?.name} ({selectedToken?.symbol})</span>
          </div>
          <div className="flex justify-between items-center">
            <span className={themeClasses.textSecondary}>Amount:</span>
            <span className={`font-semibold ${themeClasses.text}`}>{tradeAmount} {selectedToken?.symbol}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className={themeClasses.textSecondary}>Market Price:</span>
            <span className="font-medium">
              {tokenPrice ? `$${tokenPrice.toFixed(4)}` : 'Loading...'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className={themeClasses.textSecondary}>Our Rate (Market + 15%):</span>
            <span className="font-medium text-blue-600">
              {tokenPrice ? `$${(tokenPrice * 1.15).toFixed(4)}` : 'Loading...'}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className={themeClasses.textSecondary}>You'll receive:</span>
            <span className="font-bold text-lg text-green-700">
              {tokenPrice && calculateQuote() ? `$${calculateQuote()?.toFixed(2)}` : 'Calculating...'}
            </span>
          </div>
          <div className={`border-t ${darkMode ? 'border-blue-700' : 'border-blue-200'} pt-3`}>
            <div className="flex justify-between items-center">
              <span className={themeClasses.textSecondary}>Country:</span>
              <span className={`font-semibold ${themeClasses.text}`}>
                {selectedCountryData?.flag} {selectedCountryData?.name}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className={themeClasses.textSecondary}>Payment Method:</span>
              <span className={`font-semibold ${themeClasses.text}`}>{selectedPaymentMethod}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <button
          onClick={onConfirm}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          Confirm & Process Order
        </button>
        
        <button
          onClick={onBack}
          className={`w-full border-2 ${themeClasses.border} ${themeClasses.text} py-3 rounded-2xl font-semibold ${themeClasses.hover} transition-all duration-300`}
        >
          Back to Verification
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;