
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Wallet, Smartphone, Layers, Globe, DollarSign, Zap, CheckCircle, Loader, Database, ChevronDown, AlertCircle, TrendingUp, BarChart3, ArrowRight } from 'lucide-react';
import { Token, ThemeClasses } from '../types';

interface AssetManagementProps {
  currentStep: number;
  loading: boolean;
  tokens: Token[];
  selectedToken: Token | null;
  tradeAmount: string;
  tokenPrice: number | null;
  priceLoading: boolean;
  priceError: string | null;
  darkMode: boolean;
  themeClasses: ThemeClasses;
  connectWallet: () => void;
  setSelectedToken: (token: Token | null) => void;
  setTradeAmount: (amount: string) => void;
  setSellAmount: (amount: string) => void;
  setQuote: (quote: string | null) => void;
  setCurrentStep: (step: number) => void;
}

const AssetManagement: React.FC<AssetManagementProps> = ({
  currentStep,
  loading,
  tokens,
  selectedToken,
  tradeAmount,
  tokenPrice,
  priceLoading,
  priceError,
  darkMode,
  themeClasses,
  connectWallet,
  setSelectedToken,
  setTradeAmount,
  setSellAmount,
  setQuote,
  setCurrentStep
}) => {
  const { t } = useTranslation();

  
  const calculateQuote = () => {
    if (!tradeAmount || !tokenPrice || isNaN(parseFloat(tradeAmount))) return null;
    const amount = parseFloat(tradeAmount);
    const marketValue = amount * tokenPrice;
    const markupValue = marketValue * 1.15;
    return markupValue;
  };

  const currencies = [
    { code: 'USD', symbol: '$', rate: 1 },
    { code: 'INR', symbol: '₹', rate: 83.5 },
    { code: 'EUR', symbol: '€', rate: 0.85 }
  ];

  const getQuoteInCurrency = (currencyCode: string) => {
    const quote = calculateQuote();
    if (!quote) return null;
    
    const currency = currencies.find(c => c.code === currencyCode);
    return quote * (currency?.rate || 1);
  };

  // Exchange Transfer Guide Component
  const ExchangeTransferGuide = () => (
    <div className={`bg-gradient-to-r ${darkMode ? 'from-green-900/20 to-blue-900/20' : 'from-green-50 to-blue-50'} rounded-3xl border ${darkMode ? 'border-green-800' : 'border-green-200'} p-8 mb-10 max-w-4xl mx-auto mt-8 shadow-lg`}>
        <h3 className={`text-2xl font-bold ${darkMode ? 'text-green-300' : 'text-green-900'} mb-6 flex items-center justify-center gap-2`}>
          <Wallet className="w-7 h-7 text-green-600" />
          {t('exchange.howToTransfer')}
        </h3>
        
        {/* Step 1: Convert to USDT */}
        <div className="mb-8">
          <div className={`bg-gradient-to-r ${darkMode ? 'from-blue-900/30 to-purple-900/30' : 'from-blue-50 to-purple-50'} rounded-2xl p-6 border ${darkMode ? 'border-blue-800' : 'border-blue-200'} mb-6`}>
            <h4 className={`text-xl font-bold ${themeClasses.text} mb-2 flex items-center gap-2`}>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
              {t('exchange.convertTitle')}
            </h4>
            <p className={`text-sm ${themeClasses.textSecondary} mb-4`}>{t('exchange.convertSubtitle')}</p>
            
            <div className="space-y-3">
              <div className={`${themeClasses.cardBg} rounded-xl p-3 border ${themeClasses.border}`}>
                <p className={`text-sm ${themeClasses.text}`}>• {t('exchange.convertStep1')}</p>
              </div>
              <div className={`${themeClasses.cardBg} rounded-xl p-3 border ${themeClasses.border}`}>
                <p className={`text-sm ${themeClasses.text}`}>• {t('exchange.convertStep2')}</p>
              </div>
              <div className={`${themeClasses.cardBg} rounded-xl p-3 border ${themeClasses.border}`}>
                <p className={`text-sm ${themeClasses.text}`}>• {t('exchange.convertStep3')}</p>
              </div>
              <div className={`${themeClasses.cardBg} rounded-xl p-3 border ${themeClasses.border}`}>
                <p className={`text-sm ${themeClasses.text}`}>• {t('exchange.convertStep4')}</p>
              </div>
              
              <div className={`bg-gradient-to-r ${darkMode ? 'from-yellow-900/20 to-orange-900/20' : 'from-yellow-50 to-orange-50'} rounded-xl p-4 border ${darkMode ? 'border-yellow-700' : 'border-yellow-200'}`}>
                <h5 className={`font-semibold ${darkMode ? 'text-yellow-300' : 'text-yellow-800'} mb-2`}>Exchange-Specific Instructions:</h5>
                <div className="space-y-2 text-sm">
                  <p className={`${darkMode ? 'text-yellow-200' : 'text-yellow-700'}`}>• {t('exchange.convertBinance')}</p>
                  <p className={`${darkMode ? 'text-yellow-200' : 'text-yellow-700'}`}>• {t('exchange.convertKucoin')}</p>
                  <p className={`${darkMode ? 'text-yellow-200' : 'text-yellow-700'}`}>• {t('exchange.convertOthers')}</p>
                </div>
              </div>
              
              <div className={`${themeClasses.cardBg} rounded-xl p-3 border-2 border-green-500`}>
                <p className={`text-sm font-semibold text-green-600`}>✅ {t('exchange.convertConfirm')}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Step 2: Prepare BEP20 Fees */}
        <div className="mb-8">
          <div className={`bg-gradient-to-r ${darkMode ? 'from-orange-900/30 to-red-900/30' : 'from-orange-50 to-red-50'} rounded-2xl p-6 border ${darkMode ? 'border-orange-800' : 'border-orange-200'} mb-6`}>
            <h4 className={`text-xl font-bold ${themeClasses.text} mb-2 flex items-center gap-2`}>
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
              {t('exchange.prepareTitle')}
            </h4>
            <p className={`text-sm ${themeClasses.textSecondary} mb-3`}>{t('exchange.prepareDesc')}</p>
            <p className={`text-sm ${darkMode ? 'text-orange-300' : 'text-orange-700'} mb-4 font-medium`}>{t('exchange.prepareNote')}</p>
            
            <div className="space-y-3">
              <div className={`${themeClasses.cardBg} rounded-xl p-3 border ${themeClasses.border}`}>
                <p className={`text-sm font-semibold ${themeClasses.text}`}>What to do:</p>
              </div>
              <div className={`${themeClasses.cardBg} rounded-xl p-3 border ${themeClasses.border}`}>
                <p className={`text-sm ${themeClasses.text}`}>• {t('exchange.prepareBuy')}</p>
              </div>
              <div className={`${themeClasses.cardBg} rounded-xl p-3 border ${themeClasses.border}`}>
                <p className={`text-sm ${themeClasses.text}`}>• {t('exchange.prepareHow')}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Step 3: Withdraw USDT */}
        <div className="mb-8">
          <div className={`bg-gradient-to-r ${darkMode ? 'from-green-900/30 to-emerald-900/30' : 'from-green-50 to-emerald-50'} rounded-2xl p-6 border ${darkMode ? 'border-green-800' : 'border-green-200'} mb-6`}>
            <h4 className={`text-xl font-bold ${themeClasses.text} mb-4 flex items-center gap-2`}>
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
              {t('exchange.withdrawTitle')}
            </h4>
            
            <div className="space-y-4">
              <div className={`${themeClasses.cardBg} rounded-xl p-3 border ${themeClasses.border}`}>
                <p className={`text-sm ${themeClasses.text}`}>• {t('exchange.withdrawStep1')}</p>
              </div>
              <div className={`${themeClasses.cardBg} rounded-xl p-3 border ${themeClasses.border}`}>
                <p className={`text-sm ${themeClasses.text}`}>• {t('exchange.withdrawStep2')}</p>
              </div>
              
              {/* Network Selection */}
              <div className={`bg-gradient-to-r ${darkMode ? 'from-red-900/20 to-pink-900/20' : 'from-red-50 to-pink-50'} rounded-xl p-4 border-2 ${darkMode ? 'border-red-700' : 'border-red-300'}`}>
                <h5 className={`font-bold ${darkMode ? 'text-red-300' : 'text-red-800'} mb-2`}>{t('exchange.networkTitle')}</h5>
                <p className={`text-sm ${darkMode ? 'text-red-200' : 'text-red-700'} mb-2`}>• {t('exchange.networkSelect')}</p>
                <p className={`text-sm font-bold ${darkMode ? 'text-red-300' : 'text-red-800'}`}>{t('exchange.networkWarning')}</p>
              </div>
              
              {/* Address Entry */}
              <div className={`${themeClasses.cardBg} rounded-xl p-4 border ${themeClasses.border}`}>
                <h5 className={`font-semibold ${themeClasses.text} mb-3`}>{t('exchange.addressTitle')}</h5>
                <div className="space-y-2 text-sm">
                  <p className={`${themeClasses.text}`}>• {t('exchange.addressStep1')}</p>
                  <p className={`${themeClasses.text}`}>• {t('exchange.addressStep2')}</p>
                  <p className={`${themeClasses.text}`}>• {t('exchange.addressStep3')}</p>
                  <p className={`${themeClasses.text}`}>• {t('exchange.addressStep4')}</p>
                  <p className={`${themeClasses.text}`}>• {t('exchange.addressStep5')}</p>
                  <p className={`${themeClasses.text}`}>• {t('exchange.addressStep6')}</p>
                  <p className={`${themeClasses.text}`}>• {t('exchange.addressStep7')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Step 4: Withdraw BNB */}
        <div className="mb-8">
          <div className={`bg-gradient-to-r ${darkMode ? 'from-purple-900/30 to-indigo-900/30' : 'from-purple-50 to-indigo-50'} rounded-2xl p-6 border ${darkMode ? 'border-purple-800' : 'border-purple-200'} mb-6`}>
            <h4 className={`text-xl font-bold ${themeClasses.text} mb-2 flex items-center gap-2`}>
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
              {t('exchange.bnbTitle')}
            </h4>
            <p className={`text-sm ${themeClasses.textSecondary} mb-4`}>{t('exchange.bnbDesc')}</p>
            
            <div className="space-y-3">
              <div className={`${themeClasses.cardBg} rounded-xl p-3 border ${themeClasses.border}`}>
                <p className={`text-sm ${themeClasses.text}`}>• {t('exchange.bnbStep1')}</p>
              </div>
              <div className={`${themeClasses.cardBg} rounded-xl p-3 border ${themeClasses.border}`}>
                <p className={`text-sm ${themeClasses.text}`}>• {t('exchange.bnbStep2')}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Step 5: Wait for Confirmation */}
        <div className="mb-8">
          <div className={`bg-gradient-to-r ${darkMode ? 'from-cyan-900/30 to-blue-900/30' : 'from-cyan-50 to-blue-50'} rounded-2xl p-6 border ${darkMode ? 'border-cyan-800' : 'border-cyan-200'} mb-6`}>
            <h4 className={`text-xl font-bold ${themeClasses.text} mb-2 flex items-center gap-2`}>
              <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">5</div>
              {t('exchange.waitTitle')}
            </h4>
            
            <div className="space-y-3">
              <div className={`${themeClasses.cardBg} rounded-xl p-3 border ${themeClasses.border}`}>
                <p className={`text-sm ${themeClasses.text}`}>• {t('exchange.waitDesc')}</p>
              </div>
              <div className={`${themeClasses.cardBg} rounded-xl p-3 border ${themeClasses.border}`}>
                <p className={`text-sm ${themeClasses.text}`}>• {t('exchange.waitCheck')}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Step 6: Emergency BNB */}
        <div className="mb-8">
          <div className={`bg-gradient-to-r ${darkMode ? 'from-red-900/30 to-pink-900/30' : 'from-red-50 to-pink-50'} rounded-2xl p-6 border-2 ${darkMode ? 'border-red-700' : 'border-red-300'} mb-6`}>
            <h4 className={`text-xl font-bold ${themeClasses.text} mb-2 flex items-center gap-2`}>
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">6</div>
              {t('exchange.emergencyTitle')}
            </h4>
            <p className={`text-sm font-bold ${darkMode ? 'text-red-300' : 'text-red-800'} mb-4`}>{t('exchange.emergencyDesc')}</p>
            
            <div className="space-y-3">
              <div className={`${themeClasses.cardBg} rounded-xl p-3 border ${themeClasses.border}`}>
                <p className={`text-sm font-semibold ${themeClasses.text} mb-2`}>{t('exchange.emergencyOptions')}</p>
                <div className="space-y-1 text-sm">
                  <p className={`${themeClasses.text}`}>• {t('exchange.emergencyOption1')}</p>
                  <p className={`${themeClasses.text}`}>• {t('exchange.emergencyOption2')}</p>
                </div>
              </div>
              <div className={`bg-red-100 ${darkMode ? 'bg-red-900/20' : ''} rounded-xl p-3 border-2 border-red-500`}>
                <p className={`text-sm font-bold text-red-600`}>⚠️ {t('exchange.emergencyWarning')}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sample Flow */}
        <div className="mb-8">
          <div className={`bg-gradient-to-r ${darkMode ? 'from-indigo-900/30 to-purple-900/30' : 'from-indigo-50 to-purple-50'} rounded-2xl p-6 border ${darkMode ? 'border-indigo-800' : 'border-indigo-200'}`}>
            <h4 className={`text-xl font-bold ${themeClasses.text} mb-4 flex items-center gap-2`}>
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">📋</span>
              </div>
              {t('exchange.sampleTitle')}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {[
                t('exchange.sampleStep1'),
                t('exchange.sampleStep2'),
                t('exchange.sampleStep3'),
                t('exchange.sampleStep4'),
                t('exchange.sampleStep5')
              ].map((step, index) => (
                <div key={index} className={`${themeClasses.cardBg} rounded-xl p-3 border ${themeClasses.border} text-center`}>
                  <div className={`w-6 h-6 bg-gradient-to-r ${themeClasses.gradient} rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto mb-2`}>
                    {index + 1}
                  </div>
                  <p className={`text-xs ${themeClasses.text}`}>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Pro Tips */}
        <div className={`bg-gradient-to-r ${darkMode ? 'from-yellow-900/20 to-orange-900/20' : 'from-yellow-50 to-orange-50'} border ${darkMode ? 'border-yellow-700' : 'border-yellow-200'} rounded-xl p-6`}>
          <h4 className={`font-bold ${darkMode ? 'text-yellow-300' : 'text-yellow-800'} mb-4 flex items-center gap-2`}>
            <AlertCircle className="w-5 h-5" />
            {t('exchange.proTipsTitle')}
          </h4>
          <div className={`text-sm ${darkMode ? 'text-yellow-200' : 'text-yellow-700'} space-y-3`}>
            <div className={`${themeClasses.cardBg} rounded-lg p-3 border ${darkMode ? 'border-yellow-700' : 'border-yellow-200'}`}>
              <p>• {t('exchange.proTip1')}</p>
            </div>
            <div className={`${themeClasses.cardBg} rounded-lg p-3 border ${darkMode ? 'border-yellow-700' : 'border-yellow-200'}`}>
              <p>• {t('exchange.proTip2')}</p>
            </div>
            <div className={`${themeClasses.cardBg} rounded-lg p-3 border ${darkMode ? 'border-yellow-700' : 'border-yellow-200'}`}>
              <p>• {t('exchange.proTip3')}</p>
            </div>
            <div className={`${themeClasses.cardBg} rounded-lg p-3 border ${darkMode ? 'border-yellow-700' : 'border-yellow-200'}`}>
              <p>• {t('exchange.proTip4')}</p>
            </div>
          </div>
        </div>
      
      {/* Wallet Setup Guide */}
      <div className="mb-6">
        <h4 className={`text-xl font-bold ${themeClasses.text} mb-4 flex items-center gap-2`}>
          <Wallet className="w-6 h-6 text-purple-600" />
          {t('exchange.settingUpWallet')}
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          {/* MetaMask Setup */}
          <div className={`${themeClasses.cardBg} rounded-xl p-4 border ${themeClasses.border}`}>
            <h5 className={`font-semibold ${themeClasses.text} mb-3 flex items-center gap-2`}>
              <div className="w-6 h-6 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">M</span>
              </div>
              {t('exchange.metamaskSetup')}
            </h5>
            <div className={`text-sm ${themeClasses.textSecondary} space-y-2`}>
              <p>{t('exchange.metamaskDesc')}</p>
            </div>
          </div>
          
          {/* TrustWallet Setup */}
          <div className={`${themeClasses.cardBg} rounded-xl p-4 border ${themeClasses.border}`}>
            <h5 className={`font-semibold ${themeClasses.text} mb-3 flex items-center gap-2`}>
              <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">T</span>
              </div>
              {t('exchange.trustwalletSetup')}
            </h5>
            <div className={`text-sm ${themeClasses.textSecondary} space-y-2`}>
              <p>{t('exchange.trustwalletDesc')}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Important Tips */}
      <div className={`bg-gradient-to-r ${darkMode ? 'from-yellow-900/20 to-orange-900/20' : 'from-yellow-50 to-orange-50'} border ${darkMode ? 'border-yellow-700' : 'border-yellow-200'} rounded-xl p-4`}>
        <h5 className={`font-bold ${darkMode ? 'text-yellow-300' : 'text-yellow-800'} mb-3 flex items-center gap-2`}>
          <AlertCircle className="w-5 h-5" />
          {t('exchange.importantTips')}
        </h5>
        <div className={`text-sm ${darkMode ? 'text-yellow-200' : 'text-yellow-700'} space-y-2`}>
          <p>{t('exchange.tip1')}</p>
          <p>{t('exchange.tip2')}</p>
          <p>{t('exchange.tip3')}</p>
          <p>{t('exchange.tip4')}</p>
          <p>{t('exchange.tip5')}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`${themeClasses.cardBg} rounded-3xl ${themeClasses.border} border overflow-hidden shadow-xl`}>
      <div className={`bg-gradient-to-r ${themeClasses.gradient} p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{t('asset.title')}</h2>
            <p className="text-blue-100">{t('asset.subtitle')}</p>
          </div>
          <Smartphone className="w-12 h-12 text-blue-200" />
        </div>
      </div>

      {/* Exchange Process Explainer */}
      <div className={`bg-gradient-to-r ${darkMode ? 'from-blue-900/20 to-purple-900/20' : 'from-blue-50 to-purple-50'} rounded-3xl border ${darkMode ? 'border-blue-800' : 'border-blue-100'} p-8 mb-10 max-w-3xl mx-auto mt-8 shadow-lg`}>
        <h3 className={`text-2xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-900'} mb-6 flex items-center justify-center gap-2`}>
          <Layers className="w-7 h-7 text-blue-600" />
          {t('howWorks.title')}
        </h3>
        <div className="flex flex-col gap-6">
          {[
            { icon: Globe, title: t('howWorks.choosePayment'), desc: t('howWorks.choosePaymentDesc'), color: "from-blue-500 to-indigo-500" },
            { icon: Wallet, title: t('howWorks.placeOrder'), desc: t('howWorks.placeOrderDesc'), color: "from-green-400 to-emerald-500" },
            { icon: DollarSign, title: t('howWorks.processPayment'), desc: t('howWorks.processPaymentDesc'), color: "from-yellow-400 to-orange-500" },
            { icon: Zap, title: t('howWorks.settlement'), desc: t('howWorks.settlementDesc'), color: "from-cyan-400 to-blue-400" },
            { icon: CheckCircle, title: t('howWorks.complete'), desc: t('howWorks.completeDesc'), color: "from-emerald-400 to-green-600" },
       { icon: DollarSign, title: t('howWorks.source'), desc: t('howWorks.sourceDesc'), color: "from-yellow-400 to-orange-700" }
          ].map((step, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-lg font-bold shadow-lg`}>
                  {idx + 1}
                </div>
              </div>
              <div>
                <div className={`flex items-center gap-2 font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'} text-lg`}>
                  <step.icon className="w-5 h-5 text-blue-600" />
                  {step.title}
                </div>
                <div className={`${themeClasses.textSecondary} text-sm mt-1`}>
                  {step.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={`mt-6 text-sm ${themeClasses.textSecondary} text-center`}>
          <strong>{t('howWorks.note')}</strong><br />
          <span className="text-blue-800 font-medium">{t('howWorks.support')}</span>
        </div>
      </div>

    

      <div className="p-6">
        {/* Step 1: Wallet Connection */}
        {currentStep === 1 && (
          <div className="text-center py-8">
            <div className={`w-20 h-20 bg-gradient-to-r ${themeClasses.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl`}>
              <Wallet className="w-10 h-10 text-white" />
            </div>
            <h3 className={`text-xl font-semibold ${themeClasses.text} mb-3`}>{t('asset.connectWallet')}</h3>
            <p className={`${themeClasses.textSecondary} mb-8 max-w-md mx-auto`}>
              {t('asset.connectSubtitle')}
            </p>
            <div className={`bg-gradient-to-r ${darkMode ? 'from-green-900/20 to-emerald-900/20' : 'from-green-50 to-emerald-50'} border ${darkMode ? 'border-green-700' : 'border-green-200'} rounded-2xl p-4 mb-8`}>
              <div className="flex items-center justify-center">
                <Wallet className="w-5 h-5 text-green-600 mr-2" />
                <span className={`${darkMode ? 'text-green-300' : 'text-green-800'} font-medium`}>
                  🔒 {t('asset.connectSubtitle')}
                </span>
              </div>
            </div>
            <button
              onClick={connectWallet}
              disabled={loading}
              className={`bg-gradient-to-r ${themeClasses.gradient} text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center mx-auto shadow-lg`}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 mr-3 animate-spin" />
                  <span className={`text-lg ${themeClasses.textSecondary}`}>Scanning your wallet for assets...</span>
                </>
              ) : (
                <>
                  <Wallet className="w-5 h-5 mr-3" />
                  {t('asset.connectButton')}
                </>
              )}
            </button>
          </div>
        )}

        {/* Step 2: Trade Your Assets */}
        {currentStep === 2 && (
          <div>
            {/* Enhanced Header Section */}
            <div className={`relative overflow-hidden bg-gradient-to-br ${darkMode ? 'from-blue-900/30 via-purple-900/20 to-indigo-900/30' : 'from-blue-50 via-purple-50 to-indigo-50'} border-2 ${darkMode ? 'border-blue-500/30' : 'border-blue-200'} rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 shadow-2xl backdrop-blur-sm`}>
              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse`}></div>
                <div className={`absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000`}></div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${darkMode ? 'from-blue-600 to-purple-600' : 'from-blue-500 to-purple-500'} rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300`}>
                    <DollarSign className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                </div>
                <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-3 bg-gradient-to-r ${themeClasses.gradient} bg-clip-text text-transparent px-2`}>
                  {t('asset.tradeAssets')}
                </h3>
                <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 sm:mb-6 max-w-2xl mx-auto leading-relaxed text-sm sm:text-base px-2`}>
                  {t('asset.tradeSubtitle')}
                </p>
                
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-sm sm:max-w-md mx-auto px-2">
                  <div className={`${themeClasses.cardBg} rounded-xl sm:rounded-2xl p-2 sm:p-3 border ${themeClasses.border} backdrop-blur-sm`}>
                    <div className="text-center">
                      <div className={`text-sm sm:text-lg font-bold ${themeClasses.text}`}>24/7</div>
                      <div className={`text-xs ${themeClasses.textSecondary}`}>{t('header.trading')}</div>
                    </div>
                  </div>
                  <div className={`${themeClasses.cardBg} rounded-xl sm:rounded-2xl p-2 sm:p-3 border ${themeClasses.border} backdrop-blur-sm`}>
                    <div className="text-center">
                      <div className={`text-sm sm:text-lg font-bold ${themeClasses.text}`}>5%</div>
                      <div className={`text-xs ${themeClasses.textSecondary}`}>Markup</div>
                    </div>
                  </div>
                  <div className={`${themeClasses.cardBg} rounded-xl sm:rounded-2xl p-2 sm:p-3 border ${themeClasses.border} backdrop-blur-sm`}>
                    <div className="text-center">
                      <div className={`text-sm sm:text-lg font-bold ${themeClasses.text}`}>Instant</div>
                      <div className={`text-xs ${themeClasses.textSecondary}`}>Settlement</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {loading && (
              <div className={`${themeClasses.cardBg} rounded-2xl sm:rounded-3xl border ${themeClasses.border} p-6 sm:p-8 lg:p-12 shadow-xl`}>
                <div className="text-center">
                  <div className="relative">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${themeClasses.gradient} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-xl`}>
                      <Loader className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-white" />
                    </div>
                    <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full border-4 border-blue-200 border-t-transparent animate-spin"></div>
                  </div>
                  <h4 className={`text-lg sm:text-xl font-semibold ${themeClasses.text} mb-2`}>{t('asset.scanningAssets')}</h4>
                  <p className={`${themeClasses.textSecondary} mb-4 text-sm sm:text-base px-4`}>{t('asset.analyzing')}</p>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            {!loading && tokens.length > 0 && (
              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Asset Selection */}
                <div className={`${themeClasses.cardBg} rounded-2xl sm:rounded-3xl border ${themeClasses.border} p-4 sm:p-6 shadow-xl`}>
                  <div className="flex items-center mb-4 px-2">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 shadow-lg`}>
                      <Database className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                      <h4 className={`text-base sm:text-lg font-semibold ${themeClasses.text}`}>{t('asset.selectAsset')}</h4>
                      <p className={`text-xs sm:text-sm ${themeClasses.textSecondary}`}>{t('asset.chooseAsset')}</p>
                    </div>
                  </div>
                  
                  <div className="relative px-2">
                    {!selectedToken ? (
                      <div className="space-y-3">
                        <div className={`w-full border-2 rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3 sm:py-4 ${themeClasses.input} text-sm sm:text-base lg:text-lg font-medium shadow-inner cursor-pointer`}>
                          <span className={themeClasses.textSecondary}>{t('asset.chooseAsset')}</span>
                        </div>
                        <div className="max-h-64 overflow-y-auto space-y-2">
                          {tokens.map((token) => (
                            <button
                              key={token.contractAddress}
                              onClick={() => {
                                setSelectedToken(token);
                                setSellAmount('');
                                setQuote(null);
                                setTradeAmount('');
                              }}
                              className={`w-full border-2 rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:border-blue-500 ${themeClasses.hover} transition-all duration-300 text-left ${themeClasses.border} ${themeClasses.cardBg} group`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${themeClasses.gradient} rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-lg`}>
                                    {token.symbol?.charAt(0)}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className={`font-semibold ${themeClasses.text} text-sm sm:text-base truncate`}>
                                      {token.name}
                                    </div>
                                    <div className={`text-xs sm:text-sm ${themeClasses.textSecondary} truncate`}>
                                      {token.symbol}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                  <div className={`font-bold ${themeClasses.text} text-sm sm:text-base`}>
                                    {token.balance}
                                  </div>
                                  <div className={`text-xs sm:text-sm ${themeClasses.textSecondary}`}>
                                    {token.value}
                                  </div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        {/* Selection Instructions */}
                        <div className={`${darkMode ? 'bg-blue-900/10' : 'bg-blue-50'} border ${darkMode ? 'border-blue-800' : 'border-blue-200'} rounded-2xl p-4 mb-6`}>
                          <div className="flex items-center">
                            <div className={`w-8 h-8 bg-gradient-to-r ${themeClasses.gradient} rounded-xl flex items-center justify-center mr-3`}>
                              <span className="text-white font-bold text-sm">1</span>
                            </div>
                            <div>
                              <p className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                                Click on any asset below to start trading
                              </p>
                              <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                                We'll show you the current market price and calculate your payout
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Enhanced Token Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {tokens.map((token) => (
                            <button
                              key={token.contractAddress}
                              onClick={() => {
                                setSelectedToken(null);
                                setSellAmount('');
                                setQuote(null);
                                setTradeAmount('');
                              }}
                              className={`group relative overflow-hidden ${themeClasses.cardBg} rounded-3xl p-6 transition-all duration-300 text-left border-2 ${
                                selectedToken?.contractAddress === token.contractAddress 
                                  ? `border-blue-600 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'} shadow-2xl scale-105 ring-4 ring-blue-300 ring-opacity-30` 
                                  : `${themeClasses.border} hover:border-blue-400 hover:shadow-xl hover:scale-102`
                              }`}
                            >
                              {/* Background Gradient Effect */}
                              <div className={`absolute inset-0 bg-gradient-to-br ${
                                selectedToken?.contractAddress === token.contractAddress 
                                  ? 'from-blue-500/10 to-purple-500/10' 
                                  : 'from-transparent to-transparent group-hover:from-blue-500/5 group-hover:to-purple-500/5'
                              } transition-all duration-300`}></div>
                              
                              {/* Selection Badge */}
                              {selectedToken?.contractAddress === token.contractAddress && (
                                <div className="absolute top-4 right-4">
                                  <div className="bg-blue-600 text-white rounded-full p-2 shadow-lg">
                                    <CheckCircle className="w-4 h-4" />
                                  </div>
                                </div>
                              )}
                              
                              {/* Token Content */}
                              <div className="relative z-10">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-16 h-16 bg-gradient-to-r ${themeClasses.gradient} rounded-3xl flex items-center justify-center text-white font-bold text-xl shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                                    {token.symbol?.charAt(0)}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-1">
                                      <h4 className={`font-bold text-lg ${themeClasses.text}`}>{token.name}</h4>
                                      <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                                        selectedToken?.contractAddress === token.contractAddress 
                                          ? 'bg-blue-100 text-blue-800' 
                                          : 'bg-gray-100 text-gray-600'
                                      }`}>
                                        {token.symbol}
                                      </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <p className={`text-sm ${themeClasses.textSecondary} mb-1`}>Available Balance</p>
                                        <p className={`font-bold text-lg ${themeClasses.text}`}>
                                          {token.balance} {token.symbol}
                                        </p>
                                      </div>
                                      <div className="text-right">
                                        <p className={`text-sm ${themeClasses.textSecondary} mb-1`}>USD Value</p>
                                        <p className={`font-bold text-lg text-green-600`}>{token.value}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Action Indicator */}
                                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                  <div className="flex items-center justify-between">
                                    <span className={`text-sm font-medium ${
                                      selectedToken?.contractAddress === token.contractAddress 
                                        ? 'text-blue-600' 
                                        : themeClasses.textSecondary
                                    }`}>
                                      {selectedToken?.contractAddress === token.contractAddress ? 'Selected for Trading' : 'Click to Select'}
                                    </span>
                                    <ArrowRight className={`w-4 h-4 ${
                                      selectedToken?.contractAddress === token.contractAddress 
                                        ? 'text-blue-600' 
                                        : themeClasses.textSecondary
                                    } group-hover:translate-x-1 transition-transform duration-300`} />
                                  </div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {selectedToken && (
                  <div className={`${themeClasses.cardBg} rounded-2xl sm:rounded-3xl border ${themeClasses.border} p-4 sm:p-6 shadow-xl`}>
                    {/* Selected Token Display */}
                    <div className={`bg-gradient-to-r ${darkMode ? 'from-green-900/20 to-emerald-900/20' : 'from-green-50 to-emerald-50'} border ${darkMode ? 'border-green-700' : 'border-green-200'} rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 mx-2`}>
                      <div className="flex items-center flex-wrap sm:flex-nowrap">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${themeClasses.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg mr-3 sm:mr-4 flex-shrink-0`}>
                          {selectedToken.symbol?.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className={`font-bold text-base sm:text-lg ${themeClasses.text} truncate`}>{selectedToken.name}</div>
                          <div className={`text-xs sm:text-sm ${themeClasses.textSecondary} truncate`}>
                            Available: {selectedToken.balance} {selectedToken.symbol} • {selectedToken.value}
                          </div>
                        </div>
                        <div className="text-right mt-2 sm:mt-0 w-full sm:w-auto">
                          <div className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs font-medium inline-block">
                            SELECTED
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Amount Input */}
                    <div className="mb-4 sm:mb-6 px-2">
                      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                        <label className={`text-base sm:text-lg font-semibold ${themeClasses.text} flex items-center`}>
                          <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mr-2" />
                          {t('asset.amountToTrade')}
                        </label>
                        <div className={`text-xs sm:text-sm ${themeClasses.textSecondary} bg-gray-100 ${darkMode ? 'bg-gray-800' : ''} px-2 sm:px-3 py-1 rounded-full`}>
                          {t('asset.maxBalance')}: {selectedToken.balance} {selectedToken.symbol}
                        </div>
                      </div>
                      
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          max={selectedToken.balance}
                          step="any"
                          value={tradeAmount}
                          onChange={e => {
                            const val = e.target.value;
                            setTradeAmount(val);
                            setSellAmount(val);
                            setQuote(null);
                          }}
                          className={`w-full border-2 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-lg sm:text-xl font-semibold focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 ${themeClasses.input} shadow-inner`}
                          placeholder="0.00"
                        />
                        <div className="absolute right-4 sm:right-6 top-1/2 transform -translate-y-1/2">
                          <span className={`text-sm sm:text-lg font-bold ${themeClasses.textSecondary}`}>{selectedToken.symbol}</span>
                        </div>
                      </div>
                      
                      {(tradeAmount && Number(tradeAmount) > Number(selectedToken.balance)) && (
                        <div className={`mt-3 bg-red-50 ${darkMode ? 'bg-red-900/20' : ''} border border-red-200 ${darkMode ? 'border-red-700' : ''} rounded-xl p-3 flex items-center flex-wrap`}>
                          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 mr-2 flex-shrink-0" />
                          <span className="text-red-600 font-medium text-sm sm:text-base">{t('asset.amountExceeds')}</span>
                        </div>
                      )}
                      
                      {/* Quick Amount Buttons */}
                      <div className="grid grid-cols-4 gap-2 mt-4">
                        {['25%', '50%', '75%', '100%'].map((percentage) => (
                          <button
                            key={percentage}
                            onClick={() => {
                              const percent = parseInt(percentage) / 100;
                              const amount = (parseFloat(selectedToken.balance) * percent).toString();
                              setTradeAmount(amount);
                              setSellAmount(amount);
                              setQuote(null);
                            }}
                            className={`py-2 px-2 sm:px-3 rounded-lg sm:rounded-xl border-2 ${themeClasses.border} ${themeClasses.hover} transition-all duration-200 text-xs sm:text-sm font-medium ${themeClasses.text} hover:border-blue-500`}
                          >
                            {percentage}
                          </button>
                        ))}
                      </div>
                    </div>

{/* Enhanced Live Price Calculation */}
<div className={`bg-gradient-to-br ${darkMode ? 'from-blue-900/30 via-purple-900/20 to-green-900/20' : 'from-blue-50 via-purple-50 to-green-50'} border-2 ${darkMode ? 'border-blue-700' : 'border-blue-200'} rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-inner mx-2`}>
  <div className="flex items-center mb-4 flex-wrap">
    <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 shadow-lg flex-shrink-0`}>
      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
    </div>
    <div>
      <h4 className={`font-bold text-base sm:text-lg ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>{t('asset.liveCalculation')}</h4>
      <p className={`text-xs sm:text-sm ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>{t('asset.marketRate')}</p>
    </div>
  </div>

  {(() => {
    // SINGLE SOURCE OF TRUTH for unit price used everywhere in this card
    const balanceNum = Number(selectedToken?.balance ?? 0);
    const walletValueUSD = Number(String(selectedToken?.value ?? '').replace(/[^0-9.\-]/g, '')) || 0;
    const walletUnitFallback = balanceNum > 0 ? walletValueUSD / balanceNum : 0;

    // Prefer live tokenPrice (must be USD), else fall back to wallet’s unit price
    const unitPriceUSD = (tokenPrice ?? walletUnitFallback) || 0;

    const qty = parseFloat(tradeAmount || '0');
    const market = qty > 0 ? qty * unitPriceUSD : 0;

    // Your promo: 0% fee + 15% bonus
    const fee = 0;
    const bonus = market * 0.15;
    const total = market - fee + bonus;

    // show empty states / loading as you already had
    if (!tradeAmount || qty <= 0) {
      return (
        <div className="text-center py-6 sm:py-8">
          <DollarSign className={`w-10 h-10 sm:w-12 sm:h-12 ${themeClasses.textSecondary} mx-auto mb-3`} />
          <p className={`${themeClasses.textSecondary} text-sm sm:text-base lg:text-lg px-4`}>{t('asset.enterAmount')}</p>
        </div>
      );
    }
    if (priceLoading) {
      return (
        <div className="text-center py-6 sm:py-8">
          <div className="relative">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${themeClasses.gradient} rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl`}>
              <Loader className="w-5 h-5 sm:w-6 sm:h-6 animate-spin text-white" />
            </div>
            <div className="absolute inset-0 w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full border-4 border-blue-200 border-t-transparent animate-spin"></div>
          </div>
          <p className={`${themeClasses.textSecondary} text-sm sm:text-base lg:text-lg font-medium px-4`}>{t('asset.fetchingPrice')}</p>
        </div>
      );
    }
    if (priceError) {
      return (
        <div className={`bg-orange-50 ${darkMode ? 'bg-orange-900/20' : ''} border border-orange-200 ${darkMode ? 'border-orange-700' : ''} rounded-xl sm:rounded-2xl p-3 sm:p-4`}>
          <div className="flex items-center mb-2 flex-wrap">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 mr-2 flex-shrink-0" />
            <span className="text-orange-600 font-medium text-sm sm:text-base">{priceError}</span>
          </div>
          <p className={`text-xs sm:text-sm ${darkMode ? 'text-orange-400' : 'text-orange-700'}`}>
            You can still proceed - price will be calculated manually during processing
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4 sm:space-y-6">
        {/* Simple Quote Display */}
        <div className="text-center">
          <div className={`${themeClasses.cardBg} rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-green-400 shadow-lg mx-auto max-w-sm`}>
            <div className={`text-sm font-medium ${themeClasses.textSecondary} mb-2`}>{t('asset.youReceive')}</div>
            <div className="font-bold text-2xl sm:text-3xl text-green-600 mb-2">
              ${total.toFixed(4)}
            </div>
            <div className="text-xs sm:text-sm text-green-500">{t('asset.usdEquivalent')}</div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className={`${themeClasses.cardBg} rounded-xl sm:rounded-2xl p-3 sm:p-4 border ${themeClasses.border} shadow-inner`}>
          <h5 className={`font-semibold ${themeClasses.text} mb-3 flex items-center text-sm sm:text-base`}>
            <BarChart3 className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
            {t('asset.priceBreakdown')}
          </h5>
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between items-center">
              <span className={themeClasses.textSecondary}>{t('asset.marketPrice')}:</span>
              <span className={`font-medium ${themeClasses.text}`}>${market.toFixed(6)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={themeClasses.textSecondary}>Platform Fee (0%):</span>
              <span className="font-medium text-gray-500">-$0.000000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={themeClasses.textSecondary}>Promotional Bonus (+15%):</span>
              <span className="font-medium text-green-600">+${bonus.toFixed(6)}</span>
            </div>
            <hr className={`border-t ${themeClasses.border} my-2`} />
            <div className="flex justify-between items-center">
              <span className={`font-bold ${themeClasses.text}`}>{t('asset.totalReceive')}:</span>
              <span className="font-bold text-green-600">${total.toFixed(6)}</span>
            </div>

            {/* Optional: detect mismatch with wallet value and hint */}
            {selectedToken?.value && balanceNum > 0 && Math.abs(walletUnitFallback - unitPriceUSD) / (walletUnitFallback || 1) > 0.1 && (
              <div className="text-[11px] mt-2 text-amber-600">
                Heads up: wallet valuation (${walletValueUSD.toFixed(2)}) uses a different price than live market. Showing live market.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  })()}
</div>

                    {/* Continue Button */}
                    <div className="text-center mt-6 sm:mt-8 px-2">
                      <button
                        onClick={() => {
                          setCurrentStep(3);
                          // Auto-scroll to payout section after a brief delay
                          setTimeout(() => {
                            const payoutSection = document.querySelector('[data-section="payout-selection"]');
                            if (payoutSection) {
                              payoutSection.scrollIntoView({ 
                                behavior: 'smooth',
                                block: 'start',
                                inline: 'nearest'
                              });
                            }
                          }, 100);
                        }}
                        disabled={!selectedToken || !tradeAmount || parseFloat(tradeAmount) <= 0 || Number(tradeAmount) > Number(selectedToken.balance)}
                        className={`bg-gradient-to-r ${themeClasses.gradient} text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center mx-auto shadow-lg group text-sm sm:text-base`}
                      >
                        <span>{t('asset.nextPayout')}</span>
                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!loading && tokens.length === 0 && (
              <div className={`${themeClasses.cardBg} rounded-2xl sm:rounded-3xl border ${themeClasses.border} p-6 sm:p-8 lg:p-12 shadow-xl text-center`}>
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${themeClasses.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                  <Database className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h4 className={`text-xl sm:text-2xl font-bold ${themeClasses.text} mb-3 px-4`}>{t('asset.noAssets')}</h4>
                <p className={`${themeClasses.textSecondary} mb-4 sm:mb-6 max-w-md mx-auto text-sm sm:text-base px-4`}>
                  {t('asset.noAssetsDesc')}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetManagement;