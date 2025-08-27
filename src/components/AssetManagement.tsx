import React, { useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Wallet, Smartphone, Layers, Globe, DollarSign, Zap, CheckCircle, Loader, Database,
  ChevronDown, AlertCircle, TrendingUp, BarChart3, ArrowRight, Shield, Lock, Star, Heart,
  Sparkles, Info, BadgeCheck
} from 'lucide-react';
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
  const [introAccepted, setIntroAccepted] = useState(false);

  // gentle entry glow for important actions
  const [pulseOn, setPulseOn] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setPulseOn(p => !p), 2200);
    return () => clearInterval(id);
  }, []);

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
  const getQuoteInCurrency = (code: string) => {
    const q = calculateQuote();
    if (!q) return null;
    const c = currencies.find(x => x.code === code);
    return q * (c?.rate || 1);
  };

  const totalTokenUnits = useMemo(
    () => tokens.reduce((sum, tk) => sum + (Number(tk?.balance || 0)), 0),
    [tokens]
  );
  const walletHasZeroFunds = !loading && (tokens.length === 0 || totalTokenUnits <= 0);

  // ---------- UI micro-components (purely presentational) ----------

 

  const SecurityRibbon = () => (
    <div className="relative mt-3">
      <div className="absolute inset-0 rounded-xl blur-xl bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10" />
      <div className={`relative mx-auto rounded-xl border ${themeClasses.border} ${themeClasses.cardBg} px-3 py-2 text-[11px] sm:text-xs flex items-center justify-center gap-2`}>
        <Sparkles className="w-4 h-4 text-emerald-500" />
        <span className={themeClasses.textSecondary}>
          Your order is protected by escrow — we verify all assets first to ensure a safe, smooth settlement.
        </span>
      </div>
    </div>
  );

  // cute, subtle floating icons around containers
  const CuteCorners = ({ top = true }: { top?: boolean }) => (
    <>
      <Star className={`absolute ${top ? '-top-3 -left-3' : '-bottom-3 -right-3'} w-6 h-6 text-yellow-400/70 drop-shadow`} />
      <Heart className={`absolute ${top ? '-top-3 -right-3' : '-bottom-3 -left-3'} w-6 h-6 text-pink-400/70 drop-shadow`} />
      <Sparkles className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-6 h-6 text-emerald-400/70 drop-shadow" />
    </>
  );

  // ---------- main render ----------

  return (
    <div className={`${themeClasses.cardBg} rounded-3xl ${themeClasses.border} border overflow-hidden shadow-xl relative`}>
      {/* gentle glow ring */}
      <div className={`pointer-events-none absolute -inset-0.5 rounded-[28px] bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 ${pulseOn ? 'opacity-100' : 'opacity-40'} transition-opacity`} />

      <div className={`relative bg-gradient-to-r ${themeClasses.gradient} p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{t('asset.title')}</h2>
            <p className="text-blue-100">{t('asset.subtitle')}</p>
            <TrustBar />
          </div>
          <div className="relative">
            <Smartphone className="w-12 h-12 text-blue-200" />
            {/* floating lock bubble */}
            <div className="absolute -top-2 -right-2 bg-white/20 rounded-full p-1 backdrop-blur">
              <Lock className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
        <SecurityRibbon />
      </div>

      {/* ===== How it works (kept intact semantically) ===== */}
      <div className={`relative bg-gradient-to-r ${darkMode ? 'from-blue-900/20 to-purple-900/20' : 'from-blue-50 to-purple-50'} rounded-3xl border ${darkMode ? 'border-blue-800' : 'border-blue-100'} p-8 mb-10 max-w-3xl mx-auto mt-8 shadow-lg`}>
        <CuteCorners />
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
        {/* --- Pre-step CTA --- */}
        {currentStep === 1 && !introAccepted && (
          <div className={`relative ${themeClasses.cardBg} rounded-2xl border ${themeClasses.border} p-6 shadow-xl text-center`}>
            <CuteCorners />
            <div className="mx-auto mb-5 w-20 h-20 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg relative">
              <DollarSign className="w-10 h-10 text-white" />
              <div className="absolute -bottom-2 right-2 bg-white/70 dark:bg-black/30 rounded-full p-1">
                <Sparkles className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <h3 className={`text-2xl font-bold ${themeClasses.text} mb-2`}>Let’s start — exchange crypto to cash</h3>
            <p className={`${themeClasses.textSecondary} max-w-xl mx-auto mb-6`}>
              Connect your wallet securely on BSC. We’ll only read balances to show available assets and payout quotes. You remain in control.
            </p>
            <button
              onClick={() => setIntroAccepted(true)}
              className={`bg-gradient-to-r ${themeClasses.gradient} text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 inline-flex items-center`}
              aria-label="Continue to wallet connection"
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <div className="mt-4 text-xs text-gray-500 flex items-center justify-center gap-2">
              <Info className="w-4 h-4" />
              By continuing, you agree to a read-only balance check for payout estimation.
            </div>
          </div>
        )}

        {/* --- Step 1: Wallet connection --- */}
        {currentStep === 1 && introAccepted && (
          <div className="relative text-center py-8">
            <CuteCorners />
            <div className={`w-20 h-20 bg-gradient-to-r ${themeClasses.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl`}>
              <Wallet className="w-10 h-10 text-white" />
            </div>
            <h3 className={`text-xl font-semibold ${themeClasses.text} mb-3`}>Connect Wallet (BSC)</h3>
            <p className={`${themeClasses.textSecondary} mb-8 max-w-md mx-auto`}>
              Secure connection to Binance Smart Chain. We never move funds without your signature.
            </p>
            <div className={`bg-gradient-to-r ${darkMode ? 'from-green-900/20 to-emerald-900/20' : 'from-green-50 to-emerald-50'} border ${darkMode ? 'border-green-700' : 'border-green-200'} rounded-2xl p-4 mb-8`}>
              <div className="flex items-center justify-center">
                <Lock className="w-5 h-5 text-green-600 mr-2" />
                <span className={`${darkMode ? 'text-green-300' : 'text-green-800'} font-medium`}>
                  🔒 Secure connection to BSC network • Read-only
                </span>
              </div>
            </div>
            <button
              onClick={connectWallet}
              disabled={loading}
              className={`relative bg-gradient-to-r ${themeClasses.gradient} text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center mx-auto shadow-lg`}
              aria-busy={loading}
              aria-label="Connect wallet"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 mr-3 animate-spin" />
                  <span className={`text-lg ${themeClasses.textSecondary}`}>Scanning your wallet for assets…</span>
                </>
              ) : (
                <>
                  <Wallet className="w-5 h-5 mr-3" />
                  Connect Wallet
                </>
              )}
              {/* subtle animated ring */}
              <span className="absolute inset-0 rounded-2xl ring-2 ring-white/10 animate-pulse" />
            </button>
          </div>
        )}

        {/* --- Step 2: Trade --- */}
        {currentStep === 2 && (
          <div>
            {/* Header card */}
            <div className={`relative overflow-hidden bg-gradient-to-br ${darkMode ? 'from-blue-900/30 via-purple-900/20 to-indigo-900/30' : 'from-blue-50 via-purple-50 to-indigo-50'} border-2 ${darkMode ? 'border-blue-500/30' : 'border-blue-200'} rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 shadow-2xl backdrop-blur-sm`}>
              <CuteCorners />
              <div className="absolute inset-0">
                <div className="absolute -top-10 -right-14 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-16 -left-10 w-48 h-48 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-6">
                  <div className={`relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${darkMode ? 'from-blue-600 to-purple-600' : 'from-blue-500 to-purple-500'} rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl`}>
                    <DollarSign className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    <span className="absolute -top-2 -right-2 rounded-full bg-white/70 dark:bg-black/30 p-1">
                      <Sparkles className="w-4 h-4 text-white" />
                    </span>
                  </div>
                </div>
                <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-3 bg-gradient-to-r ${themeClasses.gradient} bg-clip-text text-transparent px-2`}>
                  {t('asset.tradeAssets')}
                </h3>
                <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 sm:mb-6 max-w-2xl mx-auto`}>
                  {t('asset.tradeSubtitle')}
                </p>
                <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-sm sm:max-w-md mx-auto px-2">
                  {[
                    { label: t('header.trading'), val: '24/7' },
                    { label: 'Markup', val: '5%' },
                    { label: 'Settlement', val: 'Instant' }
                  ].map((x, i) => (
                    <div key={i} className={`${themeClasses.cardBg} rounded-xl sm:rounded-2xl p-2 sm:p-3 border ${themeClasses.border} hover:shadow-lg transition`}>
                      <div className="text-center">
                        <div className={`text-sm sm:text-lg font-bold ${themeClasses.text}`}>{x.val}</div>
                        <div className={`text-xs ${themeClasses.textSecondary}`}>{x.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Loading state */}
            {loading && (
              <div className={`${themeClasses.cardBg} rounded-2xl sm:rounded-3xl border ${themeClasses.border} p-6 sm:p-8 lg:p-12 shadow-xl`}>
                <div className="text-center">
                  <div className="relative">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${themeClasses.gradient} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-xl`}>
                      <Loader className="w-6 h-6 sm:w-8 sm:h-8 animate-spin text-white" />
                    </div>
                    <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full border-4 border-blue-200 border-t-transparent animate-spin" />
                  </div>
                  <h4 className={`text-lg sm:text-xl font-semibold ${themeClasses.text} mb-2`}>{t('asset.scanningAssets')}</h4>
                  <p className={`${themeClasses.textSecondary} mb-4 text-sm sm:text-base px-4`}>{t('asset.analyzing')}</p>
                </div>
              </div>
            )}

            {/* Zero funds message */}
            {!loading && walletHasZeroFunds && (
              <div className={`relative ${themeClasses.cardBg} rounded-2xl border ${themeClasses.border} p-6 shadow-xl mb-6 text-center`}>
                <CuteCorners />
                <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <AlertCircle className="w-7 h-7 text-amber-600" />
                </div>
                <h4 className={`text-xl font-semibold ${themeClasses.text} mb-2`}>No funds detected</h4>
                <p className={`${themeClasses.textSecondary} max-w-lg mx-auto`}>
                  You have 0 funds to initiate conversions. Please make sure you have assets in your wallet before proceeding.
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[12px] text-gray-500">
                  <div className="rounded-lg border border-gray-200/50 dark:border-gray-700/60 px-3 py-2">Top up USDT on BSC (BEP20)</div>
                  <div className="rounded-lg border border-gray-200/50 dark:border-gray-700/60 px-3 py-2">Keep ~0.001–0.01 BNB for gas</div>
                  <div className="rounded-lg border border-gray-200/50 dark:border-gray-700/60 px-3 py-2">Re-open this page to refresh balances</div>
                </div>
              </div>
            )}

            {/* Token selection & trading */}
            {!loading && tokens.length > 0 && (
              <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Asset Selection */}
                <div className={`relative ${themeClasses.cardBg} rounded-2xl sm:rounded-3xl border ${themeClasses.border} p-4 sm:p-6 shadow-xl`}>
                  <CuteCorners top={false} />
                  <div className="flex items-center mb-4 px-2">
                    <div className={`relative w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center mr-3 shadow-lg`}>
                      <Database className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      <Shield className="absolute -top-1 -right-1 w-4 h-4 text-white/80" />
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
                              aria-label={`Select ${token.name}`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <div className={`relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${themeClasses.gradient} rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-lg`}>
                                    {token.symbol?.charAt(0)}
                                    <Sparkles className="absolute -bottom-1 -right-1 w-4 h-4 text-white/70" />
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
                        {/* Selection instructions */}
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

                        {/* Token grid (kept behavior) */}
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
                                  ? `border-blue-600 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'} shadow-2xl scale-105 ring-4 ring-blue-300/30`
                                  : `${themeClasses.border} hover:border-blue-400 hover:shadow-xl`
                              }`}
                              aria-label={`Toggle ${token.name} selection`}
                            >
                              {selectedToken?.contractAddress === token.contractAddress && (
                                <div className="absolute top-4 right-4">
                                  <div className="bg-blue-600 text-white rounded-full p-2 shadow-lg">
                                    <CheckCircle className="w-4 h-4" />
                                  </div>
                                </div>
                              )}
                              <div className="relative z-10">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-16 h-16 bg-gradient-to-r ${themeClasses.gradient} rounded-3xl flex items-center justify-center text-white font-bold text-xl shadow-2xl group-hover:scale-110 transition-transform`}>
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
                                    } group-hover:translate-x-1 transition-transform`} />
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

                {/* Selected token + amount + quote */}
                {selectedToken && (
                  <div className={`relative ${themeClasses.cardBg} rounded-2xl sm:rounded-3xl border ${themeClasses.border} p-4 sm:p-6 shadow-xl`}>
                    <CuteCorners />
                    {/* Selected Token Display */}
                    <div className={`bg-gradient-to-r ${darkMode ? 'from-green-900/20 to-emerald-900/20' : 'from-green-50 to-emerald-50'} border ${darkMode ? 'border-green-700' : 'border-green-200'} rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 mx-2`}>
                      <div className="flex items-center flex-wrap sm:flex-nowrap">
                        <div className={`relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${themeClasses.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg mr-3 sm:mr-4 flex-shrink-0`}>
                          {selectedToken.symbol?.charAt(0)}
                          <Heart className="absolute -top-1 -right-1 w-3.5 h-3.5 text-white/80" />
                        </div>
                        <div className="flex-1">
                          <div className={`font-bold text-base sm:text-lg ${themeClasses.text} truncate`}>{selectedToken.name}</div>
                          <div className={`text-xs sm:text-sm ${themeClasses.textSecondary} truncate`}>
                            Available: {selectedToken.balance} {selectedToken.symbol} • {selectedToken.value}
                          </div>
                        </div>
                        <div className="text-right mt-2 sm:mt-0 w-full sm:w-auto">
                          <div className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1">
                            <BadgeCheck className="w-4 h-4" /> SELECTED
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
                          aria-label="Amount to trade"
                        />
                        <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2">
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
                        {['25%', '50%', '75%', '100%'].map((pct) => (
                          <button
                            key={pct}
                            onClick={() => {
                              const percent = parseInt(pct) / 100;
                              const amount = (parseFloat(selectedToken.balance) * percent).toString();
                              setTradeAmount(amount);
                              setSellAmount(amount);
                              setQuote(null);
                            }}
                            className={`py-2 px-2 sm:px-3 rounded-lg sm:rounded-xl border-2 ${themeClasses.border} ${themeClasses.hover} transition-all duration-200 text-xs sm:text-sm font-medium ${themeClasses.text} hover:border-blue-500`}
                            aria-label={`Use ${pct} of balance`}
                          >
                            {pct}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Live Price Calculation */}
                    <div className={`relative bg-gradient-to-br ${darkMode ? 'from-blue-900/30 via-purple-900/20 to-green-900/20' : 'from-blue-50 via-purple-50 to-green-50'} border-2 ${darkMode ? 'border-blue-700' : 'border-blue-200'} rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-inner mx-2`}>
                      <CuteCorners />
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
                        const balanceNum = Number(selectedToken?.balance ?? 0);
                        const walletValueUSD = Number(String(selectedToken?.value ?? '').replace(/[^0-9.\-]/g, '')) || 0;
                        const walletUnitFallback = balanceNum > 0 ? walletValueUSD / balanceNum : 0;
                        const unitPriceUSD = (tokenPrice ?? walletUnitFallback) || 0;

                        const qty = parseFloat(tradeAmount || '0');
                        const market = qty > 0 ? qty * unitPriceUSD : 0;

                        const fee = 0;
                        const bonus = market * 0.15;
                        const total = market - fee + bonus;

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
                                <div className="absolute inset-0 w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full border-4 border-blue-200 border-t-transparent animate-spin" />
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
                                You can still proceed — price will be calculated manually during processing.
                              </p>
                            </div>
                          );
                        }

                        return (
                          <div className="space-y-4 sm:space-y-6">
                            {/* Quote */}
                            <div className="text-center">
                              <div className={`${themeClasses.cardBg} relative rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-green-400 shadow-lg mx-auto max-w-sm`}>
                                <Sparkles className="absolute -top-3 -left-3 w-6 h-6 text-emerald-400/80" />
                                <div className={`text-sm font-medium ${themeClasses.textSecondary} mb-2`}>{t('asset.youReceive')}</div>
                                <div className="font-bold text-2xl sm:text-3xl text-green-600 mb-2">
                                  ${total.toFixed(4)}
                                </div>
                                <div className="text-xs sm:text-sm text-green-500">{t('asset.usdEquivalent')}</div>
                              </div>
                            </div>

                            {/* Breakdown */}
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
                          setTimeout(() => {
                            const payoutSection = document.querySelector('[data-section="payout-selection"]');
                            if (payoutSection) {
                              (payoutSection as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
                            }
                          }, 100);
                        }}
                        disabled={!selectedToken || !tradeAmount || parseFloat(tradeAmount) <= 0 || Number(tradeAmount) > Number(selectedToken.balance)}
                        className={`relative bg-gradient-to-r ${themeClasses.gradient} text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center mx-auto shadow-lg group text-sm sm:text-base`}
                        aria-label="Proceed to payout selection"
                      >
                        <span>{t('asset.nextPayout')}</span>
                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                        <span className="absolute inset-0 rounded-xl sm:rounded-2xl ring-2 ring-white/10" />
                      </button>
                      <div className="mt-3 text-[11px] text-gray-500 flex items-center justify-center gap-2">
                        <Shield className="w-4 h-4" />
                        Funds never move without your explicit approval/signature.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Truly empty token list fallback */}
            {!loading && tokens.length === 0 && (
              <div className={`relative ${themeClasses.cardBg} rounded-2xl sm:rounded-3xl border ${themeClasses.border} p-6 sm:p-8 lg:p-12 shadow-xl text-center`}>
                <CuteCorners />
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
