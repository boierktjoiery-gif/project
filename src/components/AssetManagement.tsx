import React, { useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Wallet, Smartphone, Layers, Globe, DollarSign, Zap, CheckCircle, Loader, Database,
  AlertCircle, TrendingUp, BarChart3, ArrowRight, Shield, Lock, BadgeCheck, ChevronDown
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
  const [howMobileOpen, setHowMobileOpen] = useState(false);

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

  /** High-contrast trust badges (visible over gradients) */
  const TrustBar = () => (
    <div className="mt-4">
      <div className="inline-flex flex-wrap gap-2 rounded-xl backdrop-blur-md px-2 py-2"
        style={{ background: darkMode ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.85)' }}>
        <span className={`inline-flex items-center gap-2 text-[12px] sm:text-xs font-medium px-3 py-1 rounded-full shadow-sm
          ${darkMode ? 'bg-emerald-700 text-white' : 'bg-emerald-100 text-emerald-800'}`}>
          <Shield className="w-4 h-4" />
          Escrow Protected
        </span>
        <span className={`inline-flex items-center gap-2 text-[12px] sm:text-xs font-medium px-3 py-1 rounded-full shadow-sm
          ${darkMode ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-800'}`}>
          <BadgeCheck className="w-4 h-4" />
          SOC-2 • ISO 27001
        </span>
        <span className={`inline-flex items-center gap-2 text-[12px] sm:text-xs font-medium px-3 py-1 rounded-full shadow-sm
          ${darkMode ? 'bg-amber-700 text-white' : 'bg-amber-100 text-amber-800'}`}>
          <Lock className="w-4 h-4" />
          Read-only balance checks
        </span>
      </div>
    </div>
  );

  /** Small security ribbon under headers */
  const SecurityRibbon = () => (
    <div className="relative mt-3">
      <div className={`relative mx-auto rounded-xl border ${themeClasses.border} ${themeClasses.cardBg} px-3 py-2 text-[11px] sm:text-xs flex items-center justify-center`}>
        <span className={themeClasses.textSecondary}>
          Your order is protected by escrow — we verify all assets first to ensure a safe, smooth settlement.
        </span>
      </div>
    </div>
  );

  /** HOW IT WORKS content block (we keep content; collapsible on mobile) */
  const HowItWorks = () => (
    <div className="space-y-6">
      {[
        { icon: Globe, title: t('howWorks.choosePayment'), desc: t('howWorks.choosePaymentDesc'), color: "from-blue-500 to-indigo-500", n: 1 },
        { icon: Wallet, title: t('howWorks.placeOrder'), desc: t('howWorks.placeOrderDesc'), color: "from-green-400 to-emerald-500", n: 2 },
        { icon: DollarSign, title: t('howWorks.processPayment'), desc: t('howWorks.processPaymentDesc'), color: "from-yellow-400 to-orange-500", n: 3 },
        { icon: Zap, title: t('howWorks.settlement'), desc: t('howWorks.settlementDesc'), color: "from-cyan-400 to-blue-400", n: 4 },
        { icon: CheckCircle, title: t('howWorks.complete'), desc: t('howWorks.completeDesc'), color: "from-emerald-400 to-green-600", n: 5 },
        { icon: DollarSign, title: t('howWorks.source'), desc: t('howWorks.sourceDesc'), color: "from-yellow-400 to-orange-700", n: 6 }
      ].map((step, idx) => (
        <div key={idx} className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-base font-bold shadow`}>
              {step.n}
            </div>
          </div>
          <div>
            <div className={`flex items-center gap-2 font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'} text-[15px]`}>
              <step.icon className="w-5 h-5 text-blue-600" />
              {step.title}
            </div>
            <div className={`${themeClasses.textSecondary} text-sm mt-1`}>
              {step.desc}
            </div>
          </div>
        </div>
      ))}
      <div className={`mt-2 text-sm ${themeClasses.textSecondary} text-center`}>
        <strong>{t('howWorks.note')}</strong><br />
        <span className="text-blue-800 font-medium">{t('howWorks.support')}</span>
      </div>
    </div>
  );

  return (
    <div className={`${themeClasses.cardBg} rounded-3xl ${themeClasses.border} border overflow-hidden shadow-xl`}>

      {/* DESKTOP/TABLET HEADER */}
      <div className={`hidden md:block bg-gradient-to-r ${themeClasses.gradient} p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">{t('asset.title')}</h2>
            <p className="text-blue-100 text-sm">{t('asset.subtitle')}</p>
            <TrustBar />
          </div>
          <Smartphone className="w-12 h-12 text-blue-100" />
        </div>
        <SecurityRibbon />
      </div>

      {/* MOBILE COMPACT HEADER (single card) */}
      <div className={`md:hidden bg-gradient-to-r ${themeClasses.gradient} p-4 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-0.5">{t('asset.title')}</h2>
            <p className="text-blue-100 text-xs">{t('asset.subtitle')}</p>
          </div>
          <Smartphone className="w-8 h-8 text-blue-100" />
        </div>
        <TrustBar />
        <SecurityRibbon />
      </div>

      {/* DESKTOP/TABLET HOW IT WORKS */}
      <div className="hidden md:block">
        <div className={`bg-gradient-to-r ${darkMode ? 'from-blue-900/20 to-purple-900/20' : 'from-blue-50 to-purple-50'} rounded-3xl border ${darkMode ? 'border-blue-800' : 'border-blue-100'} p-8 mb-10 max-w-3xl mx-auto mt-8 shadow-lg`}>
          <h3 className={`text-2xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-900'} mb-6 flex items-center justify-center gap-2`}>
            <Layers className="w-6 h-6 text-blue-600" />
            {t('howWorks.title')}
          </h3>
          <HowItWorks />
        </div>
      </div>

      {/* MOBILE COMPACT: Intro + How It Works inside SAME card (accordion) */}
      <div className="md:hidden px-4 pt-4 pb-2">
        <div className={`${themeClasses.cardBg} rounded-2xl border ${themeClasses.border} p-4 shadow`}>
          {/* Intro CTA */}
          {currentStep === 1 && !introAccepted && (
            <div className="text-center">
              <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <h3 className={`text-[18px] font-bold ${themeClasses.text} mb-1`}>Let’s start — exchange crypto to cash</h3>
              <p className="text-xs text-gray-500 mb-3">
                Connect your wallet securely on BSC. Read-only balance checks for payout estimates.
              </p>
              <button
                onClick={() => setIntroAccepted(true)}
                className={`bg-white/90 text-slate-900 px-5 py-2 rounded-xl font-semibold hover:opacity-95 transition inline-flex items-center`}
              >
                Continue <ArrowRight className="w-4 h-4 ml-1.5" />
              </button>
            </div>
          )}

          {/* Mobile accordion for How it works */}
          <div className="mt-4">
            <button
              onClick={() => setHowMobileOpen(v => !v)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg border text-sm font-medium bg-gray-50 dark:bg-gray-900/30"
            >
              <span className="inline-flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" /> How It Works
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${howMobileOpen ? 'rotate-180' : ''}`} />
            </button>
            {howMobileOpen && (
              <div className="mt-3">
                <HowItWorks />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MAIN BODY */}
      <div className="p-6">
        {/* STEP 1: Wallet connect (desktop/tablet) */}
        {currentStep === 1 && introAccepted && (
          <div className="text-center py-6 hidden md:block">
            <div className={`w-20 h-20 bg-gradient-to-r ${themeClasses.gradient} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl`}>
              <Wallet className="w-10 h-10 text-white" />
            </div>
            <h3 className={`text-xl font-semibold ${themeClasses.text} mb-2`}>Connect Wallet (BSC)</h3>
            <p className={`${themeClasses.textSecondary} mb-6 max-w-md mx-auto`}>
              Secure connection to Binance Smart Chain. We never move funds without your signature.
            </p>
            <div className={`bg-gradient-to-r ${darkMode ? 'from-green-900/20 to-emerald-900/20' : 'from-green-50 to-emerald-50'} border ${darkMode ? 'border-green-700' : 'border-green-200'} rounded-2xl p-4 mb-6`}>
              <div className="flex items-center justify-center text-sm">
                <Lock className="w-4 h-4 text-green-600 mr-2" />
                <span className={`${darkMode ? 'text-green-300' : 'text-green-800'} font-medium`}>
                  Secure connection to BSC • Read-only
                </span>
              </div>
            </div>
            <button
              onClick={connectWallet}
              disabled={loading}
              className={`bg-gradient-to-r ${themeClasses.gradient} text-white px-8 py-3 rounded-2xl font-semibold hover:shadow-2xl disabled:opacity-50 transition inline-flex items-center`}
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 mr-3 animate-spin" />
                  Scanning your wallet…
                </>
              ) : (
                <>
                  <Wallet className="w-5 h-5 mr-3" />
                  Connect Wallet
                </>
              )}
            </button>
          </div>
        )}

        {/* STEP 1: Wallet connect (mobile compact) */}
        {currentStep === 1 && introAccepted && (
          <div className="md:hidden px-1">
            <div className={`${themeClasses.cardBg} rounded-2xl border ${themeClasses.border} p-4 text-center`}>
              <div className="mx-auto mb-4 w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <h3 className={`text-[16px] font-semibold ${themeClasses.text} mb-1`}>Connect Wallet (BSC)</h3>
              <p className="text-[12px] text-gray-500 mb-3">Read-only connection. Your approval required for any transfers.</p>
              <button
                onClick={connectWallet}
                disabled={loading}
                className={`w-full bg-gradient-to-r ${themeClasses.gradient} text-white py-2.5 rounded-xl font-semibold disabled:opacity-50 transition inline-flex items-center justify-center`}
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    Scanning…
                  </>
                ) : (
                  <>
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Trade */}
        {currentStep === 2 && (
          <div>
            {/* Compact header stats (desktop only) */}
            <div className={`hidden md:block relative overflow-hidden bg-gradient-to-br ${darkMode ? 'from-blue-900/25 via-purple-900/15 to-indigo-900/25' : 'from-blue-50 via-purple-50 to-indigo-50'} border ${darkMode ? 'border-blue-500/30' : 'border-blue-200'} rounded-2xl p-6 mb-6 shadow-2xl`}>
              <div className="flex items-center justify-center mb-4">
                <div className={`w-16 h-16 bg-gradient-to-r ${darkMode ? 'from-blue-600 to-purple-600' : 'from-blue-500 to-purple-500'} rounded-2xl flex items-center justify-center shadow-2xl`}>
                  <DollarSign className="w-9 h-9 text-white" />
                </div>
              </div>
              <h3 className={`text-2xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r ${themeClasses.gradient}`}>
                {t('asset.tradeAssets')}
              </h3>
              <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-5`}>{t('asset.tradeSubtitle')}</p>
              <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
                {[
                  { label: t('header.trading'), val: '24/7' },
                  { label: 'Markup', val: '5%' },
                  { label: 'Settlement', val: 'Instant' }
                ].map((x, i) => (
                  <div key={i} className={`${themeClasses.cardBg} rounded-xl p-3 border ${themeClasses.border}`}>
                    <div className="text-center">
                      <div className={`text-lg font-bold ${themeClasses.text}`}>{x.val}</div>
                      <div className={`text-xs ${themeClasses.textSecondary}`}>{x.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Loading */}
            {loading && (
              <div className={`${themeClasses.cardBg} rounded-2xl border ${themeClasses.border} p-6 shadow-xl text-center`}>
                <div className="mx-auto mb-4 w-12 h-12 bg-gradient-to-r ${themeClasses.gradient} rounded-full flex items-center justify-center">
                  <Loader className="w-6 h-6 animate-spin text-white" />
                </div>
                <h4 className={`text-lg font-semibold ${themeClasses.text} mb-1`}>{t('asset.scanningAssets')}</h4>
                <p className={`${themeClasses.textSecondary} text-sm`}>{t('asset.analyzing')}</p>
              </div>
            )}

            {/* Zero funds */}
            {!loading && walletHasZeroFunds && (
              <div className={`${themeClasses.cardBg} rounded-2xl border ${themeClasses.border} p-6 shadow-xl text-center`}>
                <div className="mx-auto mb-3 w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                </div>
                <h4 className={`text-lg font-semibold ${themeClasses.text} mb-1`}>No funds detected</h4>
                <p className={`${themeClasses.textSecondary} text-sm max-w-md mx-auto`}>
                  You have 0 funds to initiate conversions. Please make sure you have assets in your wallet before proceeding.
                </p>
              </div>
            )}

            {/* Token selection */}
            {!loading && tokens.length > 0 && (
              <div className="space-y-6">
                {/* Selection list */}
                <div className={`${themeClasses.cardBg} rounded-2xl border ${themeClasses.border} p-4 shadow-xl`}>
                  <div className="flex items-center mb-3">
                    <div className="w-9 h-9 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-3">
                      <Database className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className={`text-base font-semibold ${themeClasses.text}`}>{t('asset.selectAsset')}</h4>
                      <p className={`text-xs ${themeClasses.textSecondary}`}>{t('asset.chooseAsset')}</p>
                    </div>
                  </div>

                  {!selectedToken ? (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {tokens.map((token) => (
                        <button
                          key={token.contractAddress}
                          onClick={() => {
                            setSelectedToken(token);
                            setSellAmount('');
                            setQuote(null);
                            setTradeAmount('');
                          }}
                          className={`w-full border rounded-xl p-3 hover:border-blue-500 transition text-left ${themeClasses.border} ${themeClasses.cardBg}`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 bg-gradient-to-r ${themeClasses.gradient} rounded-xl flex items-center justify-center text-white font-bold`}>
                                {token.symbol?.charAt(0)}
                              </div>
                              <div>
                                <div className={`font-semibold ${themeClasses.text}`}>{token.name}</div>
                                <div className={`text-xs ${themeClasses.textSecondary}`}>{token.symbol}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`font-bold ${themeClasses.text}`}>{token.balance}</div>
                              <div className={`text-xs ${themeClasses.textSecondary}`}>{token.value}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className={`bg-gradient-to-r ${darkMode ? 'from-blue-900/10' : 'from-blue-50'} border ${darkMode ? 'border-blue-800' : 'border-blue-200'} rounded-xl p-3`}>
                      <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                        Click on any asset below to start trading. We’ll show current market price and payout.
                      </p>
                    </div>
                  )}
                </div>

                {/* Selected token + amount + quote */}
                {selectedToken && (
                  <div className={`${themeClasses.cardBg} rounded-2xl border ${themeClasses.border} p-4 shadow-xl`}>
                    {/* Selected token head */}
                    <div className={`bg-gradient-to-r ${darkMode ? 'from-green-900/20 to-emerald-900/20' : 'from-green-50 to-emerald-50'} border ${darkMode ? 'border-green-700' : 'border-green-200'} rounded-xl p-3 mb-4`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 bg-gradient-to-r ${themeClasses.gradient} rounded-xl flex items-center justify-center text-white font-bold`}>
                            {selectedToken.symbol?.charAt(0)}
                          </div>
                          <div>
                            <div className={`font-bold ${themeClasses.text}`}>{selectedToken.name}</div>
                            <div className={`text-xs ${themeClasses.textSecondary}`}>
                              Avail: {selectedToken.balance} {selectedToken.symbol} • {selectedToken.value}
                            </div>
                          </div>
                        </div>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-[11px] inline-flex items-center gap-1">
                          <BadgeCheck className="w-3.5 h-3.5" /> SELECTED
                        </span>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <label className={`text-sm font-semibold ${themeClasses.text} flex items-center gap-2`}>
                          <Zap className="w-4 h-4 text-orange-500" />
                          {t('asset.amountToTrade')}
                        </label>
                        <div className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500">
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
                          className={`w-full border rounded-xl px-4 py-3 text-lg font-semibold focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition ${themeClasses.input}`}
                          placeholder="0.00"
                          aria-label="Amount to trade"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500">{selectedToken.symbol}</div>
                      </div>

                      {(tradeAmount && Number(tradeAmount) > Number(selectedToken.balance)) && (
                        <div className="mt-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-2 flex items-center">
                          <AlertCircle className="w-4 h-4 text-red-600 mr-2" />
                          <span className="text-red-600 text-sm">{t('asset.amountExceeds')}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-4 gap-2 mt-3">
                        {['25%', '50%', '75%', '100%'].map(pct => (
                          <button
                            key={pct}
                            onClick={() => {
                              const percent = parseInt(pct) / 100;
                              const amount = (parseFloat(selectedToken.balance) * percent).toString();
                              setTradeAmount(amount);
                              setSellAmount(amount);
                              setQuote(null);
                            }}
                            className={`py-2 rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} text-xs font-medium hover:border-blue-500`}
                          >
                            {pct}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Live calc */}
                    <div className={`bg-gradient-to-br ${darkMode ? 'from-blue-900/25 via-purple-900/15 to-green-900/15' : 'from-blue-50 via-purple-50 to-green-50'} border ${darkMode ? 'border-blue-700/40' : 'border-blue-200'} rounded-2xl p-4`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-900'} text-sm`}>{t('asset.liveCalculation')}</h4>
                          <p className="text-xs text-gray-500">{t('asset.marketRate')}</p>
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
                            <div className="text-center py-4">
                              <DollarSign className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                              <p className="text-sm text-gray-500">{t('asset.enterAmount')}</p>
                            </div>
                          );
                        }
                        if (priceLoading) {
                          return (
                            <div className="text-center py-4">
                              <Loader className="w-5 h-5 animate-spin text-blue-600 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">{t('asset.fetchingPrice')}</p>
                            </div>
                          );
                        }
                        if (priceError) {
                          return (
                            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg p-3 text-sm">
                              <div className="flex items-center mb-1">
                                <AlertCircle className="w-4 h-4 text-orange-600 mr-2" />
                                <span className="text-orange-700 dark:text-orange-300">{priceError}</span>
                              </div>
                              <p className="text-xs text-orange-600/80">You can still proceed—price will be calculated manually during processing.</p>
                            </div>
                          );
                        }

                        return (
                          <div className="space-y-3">
                            <div className="text-center">
                              <div className={`${themeClasses.cardBg} rounded-xl p-4 border-2 border-green-400 max-w-xs mx-auto`}>
                                <div className="text-xs text-gray-500 mb-1">{t('asset.youReceive')}</div>
                                <div className="font-extrabold text-2xl text-green-600">${total.toFixed(4)}</div>
                                <div className="text-[11px] text-green-600/80">{t('asset.usdEquivalent')}</div>
                              </div>
                            </div>
                            <div className={`${themeClasses.cardBg} rounded-xl p-3 border ${themeClasses.border}`}>
                              <h5 className={`font-semibold ${themeClasses.text} mb-2 text-sm flex items-center`}>
                                <BarChart3 className="w-4 h-4 mr-2 text-blue-500" />
                                {t('asset.priceBreakdown')}
                              </h5>
                              <div className="space-y-1.5 text-xs">
                                <div className="flex justify-between"><span className="text-gray-500">{t('asset.marketPrice')}:</span><span className="font-medium">${market.toFixed(6)}</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">Platform Fee (0%):</span><span className="text-gray-500">-$0.000000</span></div>
                                <div className="flex justify-between"><span className="text-gray-500">Promotional Bonus (+15%):</span><span className="text-green-600">+${bonus.toFixed(6)}</span></div>
                                <hr className="my-1.5" />
                                <div className="flex justify-between"><span className="font-semibold">{t('asset.totalReceive')}:</span><span className="font-semibold text-green-600">${total.toFixed(6)}</span></div>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Continue */}
                    <div className="text-center mt-5">
                      <button
                        onClick={() => {
                          setCurrentStep(3);
                          setTimeout(() => {
                            const payoutSection = document.querySelector('[data-section="payout-selection"]');
                            if (payoutSection) (payoutSection as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }, 100);
                        }}
                        disabled={!selectedToken || !tradeAmount || parseFloat(tradeAmount) <= 0 || Number(tradeAmount) > Number(selectedToken.balance)}
                        className={`bg-gradient-to-r ${themeClasses.gradient} text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 inline-flex items-center`}
                      >
                        <span>{t('asset.nextPayout')}</span>
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </button>
                      <div className="mt-2 text-[11px] text-gray-500 inline-flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" /> Funds never move without your signature.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Empty tokens fallback */}
            {!loading && tokens.length === 0 && (
              <div className={`${themeClasses.cardBg} rounded-2xl border ${themeClasses.border} p-6 shadow-xl text-center`}>
                <div className={`w-16 h-16 bg-gradient-to-r ${themeClasses.gradient} rounded-3xl flex items-center justify-center mx-auto mb-4`}>
                  <Database className="w-9 h-9 text-white" />
                </div>
                <h4 className={`text-xl font-bold ${themeClasses.text} mb-2`}>{t('asset.noAssets')}</h4>
                <p className={`${themeClasses.textSecondary} text-sm max-w-md mx-auto`}>{t('asset.noAssetsDesc')}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetManagement;
