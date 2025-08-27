import React, { useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Wallet, Smartphone, Layers, Globe, DollarSign, Zap, CheckCircle, Loader, Database,
  ChevronDown, AlertCircle, TrendingUp, BarChart3, ArrowRight, Shield, Lock, Info, BadgeCheck
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

  // subtle attention pulse
  const [pulseOn, setPulseOn] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setPulseOn((p) => !p), 2200);
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
    const c = currencies.find((x) => x.code === code);
    return q * (c?.rate || 1);
  };

  const totalTokenUnits = useMemo(
    () => tokens.reduce((sum, tk) => sum + Number(tk?.balance || 0), 0),
    [tokens]
  );
  const walletHasZeroFunds = !loading && (tokens.length === 0 || totalTokenUnits <= 0);

  // ===== Professional Trust Bar (text-only, no cute icons) =====
  const TrustBar = () => (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      <span
        className={`px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap ${
          darkMode ? 'bg-emerald-600 text-white' : 'bg-emerald-600 text-white'
        }`}
      >
        Escrow Protected
      </span>
      <span
        className={`px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap ${
          darkMode ? 'bg-blue-700 text-white' : 'bg-blue-700 text-white'
        }`}
      >
        SOC-2 • ISO 27001
      </span>
      <span
        className={`px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap ${
          darkMode ? 'bg-neutral-800 text-white' : 'bg-neutral-900 text-white'
        }`}
      >
        Read-only balance checks
      </span>
    </div>
  );

  const SecurityRibbon = () => (
    <div
      className={`mt-3 rounded-lg px-3 py-2 text-[11px] sm:text-xs text-center ${
        darkMode
          ? 'bg-neutral-900/60 border border-neutral-700 text-neutral-300'
          : 'bg-white border border-neutral-200 text-neutral-700'
      }`}
    >
      Your order is protected by escrow — we verify all assets first to ensure a safe, smooth settlement.
    </div>
  );

  return (
    <div className={`${themeClasses.cardBg} rounded-3xl ${themeClasses.border} border overflow-hidden shadow-xl relative`}>
      {/* subtle aura only */}
      <div
        className={`pointer-events-none absolute -inset-0.5 rounded-[28px] bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-purple-500/10 ${
          pulseOn ? 'opacity-100' : 'opacity-40'
        } transition-opacity`}
      />

      {/* Header */}
      <div className={`relative ${darkMode ? 'bg-neutral-900' : 'bg-white'} p-5 sm:p-6`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-neutral-900'} mb-1`}>{t('asset.title')}</h2>
            <p className={`${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>{t('asset.subtitle')}</p>
            <TrustBar />
          </div>
          <div className="hidden sm:block">
            <div className={`${darkMode ? 'bg-neutral-800' : 'bg-neutral-100'} w-12 h-12 rounded-xl flex items-center justify-center`}>
              <Smartphone className={`${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`} />
            </div>
          </div>
        </div>
        <SecurityRibbon />
      </div>

      {/* ===== Mobile compact: one card, collapsible "How it works" ===== */}
      <div className="sm:hidden p-4">
        <div className={`rounded-2xl border ${themeClasses.border} ${themeClasses.cardBg} p-4`}>
          {!introAccepted ? (
            <>
              <h3 className={`text-lg font-bold ${themeClasses.text} mb-2`}>Let’s start — exchange crypto to cash</h3>
              <p className={`${themeClasses.textSecondary} text-sm mb-4`}>
                Connect your wallet securely on BSC. We’ll only read balances to show available assets and payout quotes.
              </p>
              <button
                onClick={() => setIntroAccepted(true)}
                className={`w-full bg-gradient-to-r ${themeClasses.gradient} text-white py-3 rounded-xl font-semibold flex items-center justify-center`}
              >
                Continue <ArrowRight className="w-5 h-5 ml-2" />
              </button>

              <details className="mt-4">
                <summary className="text-sm font-medium cursor-pointer flex items-center">
                  <Layers className="w-4 h-4 mr-1" /> {t('howWorks.title')}
                </summary>
                <ol className="mt-2 space-y-1 text-[13px] leading-5">
                  <li>1. {t('howWorks.choosePayment')}</li>
                  <li>2. {t('howWorks.placeOrder')}</li>
                  <li>3. {t('howWorks.processPayment')}</li>
                  <li>4. {t('howWorks.settlement')}</li>
                  <li>5. {t('howWorks.complete')}</li>
                  <li>6. {t('howWorks.source')}</li>
                </ol>
              </details>
            </>
          ) : (
            <>
              <h3 className={`text-base font-semibold ${themeClasses.text} mb-2`}>Connect Wallet (BSC)</h3>
              <div
                className={`mb-3 rounded-lg px-3 py-2 text-[12px] ${
                  darkMode ? 'bg-green-900/20 text-green-300 border border-green-700' : 'bg-green-50 text-green-800 border border-green-200'
                }`}
              >
                <span className="inline-flex items-center">
                  <Lock className="w-4 h-4 mr-2" /> Secure, read-only connection
                </span>
              </div>
              <button
                onClick={connectWallet}
                disabled={loading}
                className={`w-full bg-gradient-to-r ${themeClasses.gradient} text-white py-3 rounded-xl font-semibold flex items-center justify-center disabled:opacity-60`}
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Scanning…
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5 mr-2" />
                    Connect Wallet
                  </>
                )}
              </button>
            </>
          )}
        </div>

        {/* Zero-funds compact notice */}
        {currentStep === 2 && !loading && walletHasZeroFunds && (
          <div className={`mt-3 rounded-2xl border ${themeClasses.border} ${themeClasses.cardBg} p-4`}>
            <h4 className={`text-base font-semibold ${themeClasses.text} mb-1`}>No funds detected</h4>
            <p className="text-[13px] leading-5 text-amber-700 dark:text-amber-300">
              You have 0 funds to initiate conversions. Please make sure you have assets in your wallet.
            </p>
          </div>
        )}
      </div>

      {/* ===== Desktop / tablet flow ===== */}
      <div className="hidden sm:block p-6">
        {/* Pre-step CTA */}
        {currentStep === 1 && !introAccepted && (
          <div className={`relative ${themeClasses.cardBg} rounded-2xl border ${themeClasses.border} p-6 shadow-xl`}>
            <h3 className={`text-2xl font-bold ${themeClasses.text} mb-2`}>Let’s start — exchange crypto to cash</h3>
            <p className={`${themeClasses.textSecondary} max-w-xl mb-6`}>
              Connect your wallet securely on BSC. We’ll only read balances to show available assets and payout quotes. You remain in control.
            </p>
            <button
              onClick={() => setIntroAccepted(true)}
              className={`bg-gradient-to-r ${themeClasses.gradient} text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl inline-flex items-center`}
            >
              Continue <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <div className="mt-4 text-xs text-gray-500 flex items-center gap-2">
              <Info className="w-4 h-4" />
              By continuing, you agree to a read-only balance check for payout estimation.
            </div>
          </div>
        )}

        {/* Step 1: Wallet connection */}
        {currentStep === 1 && introAccepted && (
          <div className="text-center py-8">
            <div className={`${darkMode ? 'bg-neutral-800' : 'bg-neutral-100'} w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6`}>
              <Wallet className={`${darkMode ? 'text-white' : 'text-neutral-700'}`} />
            </div>
            <h3 className={`text-xl font-semibold ${themeClasses.text} mb-3`}>Connect Wallet (BSC)</h3>
            <p className={`${themeClasses.textSecondary} mb-8 max-w-md mx-auto`}>
              Secure connection to Binance Smart Chain. We never move funds without your signature.
            </p>
            <div
              className={`bg-gradient-to-r ${darkMode ? 'from-green-900/20 to-emerald-900/20' : 'from-green-50 to-emerald-50'} border ${
                darkMode ? 'border-green-700' : 'border-green-200'
              } rounded-2xl p-4 mb-8`}
            >
              <span className={`${darkMode ? 'text-green-300' : 'text-green-800'} font-medium`}>🔒 Secure connection to BSC network • Read-only</span>
            </div>
            <button
              onClick={connectWallet}
              disabled={loading}
              className={`relative bg-gradient-to-r ${themeClasses.gradient} text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl disabled:opacity-50 flex items-center mx-auto`}
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
              <span className="absolute inset-0 rounded-2xl ring-2 ring-white/10" />
            </button>
          </div>
        )}

        {/* How it Works (desktop) */}
        <div
          className={`mt-8 bg-gradient-to-r ${darkMode ? 'from-blue-900/20 to-purple-900/20' : 'from-blue-50 to-purple-50'} rounded-3xl border ${
            darkMode ? 'border-blue-800' : 'border-blue-100'
          } p-8 shadow-lg`}
        >
          <h3 className={`text-2xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-900'} mb-6 flex items-center gap-2`}>
            <Layers className="w-7 h-7 text-blue-600" /> {t('howWorks.title')}
          </h3>
          <div className="flex flex-col gap-6">
            {[
              { icon: Globe, title: t('howWorks.choosePayment'), desc: t('howWorks.choosePaymentDesc') },
              { icon: Wallet, title: t('howWorks.placeOrder'), desc: t('howWorks.placeOrderDesc') },
              { icon: DollarSign, title: t('howWorks.processPayment'), desc: t('howWorks.processPaymentDesc') },
              { icon: Zap, title: t('howWorks.settlement'), desc: t('howWorks.settlementDesc') },
              { icon: CheckCircle, title: t('howWorks.complete'), desc: t('howWorks.completeDesc') },
              { icon: DollarSign, title: t('howWorks.source'), desc: t('howWorks.sourceDesc') }
            ].map((step, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">{idx + 1}</div>
                <div>
                  <div className={`flex items-center gap-2 font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'} text-lg`}>
                    <step.icon className="w-5 h-5 text-blue-600" />
                    {step.title}
                  </div>
                  <div className={`${themeClasses.textSecondary} text-sm mt-1`}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className={`mt-6 text-sm ${themeClasses.textSecondary}`}>
            <strong>{t('howWorks.note')}</strong>
            <br />
            <span className="text-blue-800 font-medium">{t('howWorks.support')}</span>
          </div>
        </div>

        {/* Step 2 */}
        {currentStep === 2 && (
          <div className="mt-6">
            {/* Loading */}
            {loading && (
              <div className={`${themeClasses.cardBg} rounded-2xl border ${themeClasses.border} p-8 shadow-xl text-center`}>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader className="w-8 h-8 text-white animate-spin" />
                </div>
                <h4 className={`text-xl font-semibold ${themeClasses.text} mb-2`}>{t('asset.scanningAssets')}</h4>
                <p className={`${themeClasses.textSecondary}`}>{t('asset.analyzing')}</p>
              </div>
            )}

            {/* Zero funds */}
            {!loading && walletHasZeroFunds && (
              <div className={`${themeClasses.cardBg} rounded-2xl border ${themeClasses.border} p-6 shadow-xl`}>
                <h4 className={`text-xl font-semibold ${themeClasses.text} mb-2`}>No funds detected</h4>
                <p className={`${themeClasses.textSecondary}`}>
                  You have 0 funds to initiate conversions. Please make sure you have assets in your wallet before proceeding.
                </p>
              </div>
            )}

            {/* Token selection & trading */}
            {!loading && tokens.length > 0 && (
              <div className="space-y-6">
                {/* Asset Selection */}
                <div className={`${themeClasses.cardBg} rounded-2xl border ${themeClasses.border} p-6 shadow-xl`}>
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center mr-3">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-lg font-semibold ${themeClasses.text}`}>{t('asset.selectAsset')}</h4>
                      <p className={`text-sm ${themeClasses.textSecondary}`}>{t('asset.chooseAsset')}</p>
                    </div>
                  </div>

                  <div className="px-1">
                    {!selectedToken ? (
                      <div className="space-y-3">
                        <div className={`w-full border-2 rounded-2xl px-4 py-4 ${themeClasses.input} font-medium`}>
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
                              className={`w-full border-2 rounded-2xl p-4 hover:border-blue-500 transition-all text-left ${themeClasses.border} ${themeClasses.cardBg}`}
                              aria-label={`Select ${token.name}`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center text-base font-bold">
                                    {token.symbol?.charAt(0)}
                                  </div>
                                  <div className="min-w-0">
                                    <div className={`font-semibold ${themeClasses.text} truncate`}>{token.name}</div>
                                    <div className={`text-xs ${themeClasses.textSecondary} truncate`}>{token.symbol}</div>
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
                      </div>
                    ) : (
                      <div className="text-sm text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-2xl p-4 mb-6">
                        Click any asset below to toggle selection. We’ll show market price and your payout.
                      </div>
                    )}
                  </div>
                </div>

                {/* Selected token + amount + quote */}
                {selectedToken && (
                  <div className={`${themeClasses.cardBg} rounded-2xl border ${themeClasses.border} p-6 shadow-xl`}>
                    {/* Selected Token */}
                    <div className={`rounded-2xl p-4 mb-6 border ${darkMode ? 'border-green-700 bg-green-900/20' : 'border-green-200 bg-green-50'}`}>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center text-lg font-bold">
                          {selectedToken.symbol?.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`font-bold ${themeClasses.text} truncate`}>{selectedToken.name}</div>
                          <div className={`text-xs ${themeClasses.textSecondary} truncate`}>
                            Available: {selectedToken.balance} {selectedToken.symbol} • {selectedToken.value}
                          </div>
                        </div>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1">
                          <BadgeCheck className="w-4 h-4" /> SELECTED
                        </span>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <label className={`text-lg font-semibold ${themeClasses.text} flex items-center`}>{t('asset.amountToTrade')}</label>
                        <div className={`text-xs ${themeClasses.textSecondary} px-3 py-1 rounded-full ${darkMode ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
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
                          onChange={(e) => {
                            const val = e.target.value;
                            setTradeAmount(val);
                            setSellAmount(val);
                            setQuote(null);
                          }}
                          className={`w-full border-2 rounded-2xl px-6 py-4 text-xl font-semibold focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 ${themeClasses.input}`}
                          placeholder="0.00"
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-lg font-bold text-neutral-500">{selectedToken.symbol}</div>
                      </div>

                      {tradeAmount && Number(tradeAmount) > Number(selectedToken.balance) && (
                        <div
                          className={`mt-3 rounded-xl p-3 border ${
                            darkMode ? 'bg-red-900/20 border-red-700 text-red-300' : 'bg-red-50 border-red-200 text-red-700'
                          }`}
                        >
                          <AlertCircle className="w-5 h-5 inline mr-2" />
                          {t('asset.amountExceeds')}
                        </div>
                      )}

                      {/* Quick buttons */}
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
                            className={`py-2 px-3 rounded-xl border-2 ${themeClasses.border} ${themeClasses.hover} text-sm font-medium`}
                          >
                            {pct}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price & Quote */}
                    <div className={`rounded-2xl p-6 border ${darkMode ? 'border-blue-700 bg-blue-900/20' : 'border-blue-200 bg-blue-50'}`}>
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center mr-3">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className={`font-bold ${darkMode ? 'text-blue-300' : 'text-blue-900'}`}>{t('asset.liveCalculation')}</h4>
                          <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>{t('asset.marketRate')}</p>
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
                          return <div className="text-center py-8 text-sm text-neutral-500">{t('asset.enterAmount')}</div>;
                        }
                        if (priceLoading) {
                          return (
                            <div className="text-center py-8">
                              <Loader className="w-6 h-6 animate-spin inline mr-2" />
                              <span className="text-sm text-neutral-500">{t('asset.fetchingPrice')}</span>
                            </div>
                          );
                        }
                        if (priceError) {
                          return (
                            <div
                              className={`rounded-xl p-3 border ${
                                darkMode ? 'bg-orange-900/20 border-orange-700 text-orange-300' : 'bg-orange-50 border-orange-200 text-orange-700'
                              }`}
                            >
                              <AlertCircle className="w-5 h-5 inline mr-2" />
                              {priceError} — you can still proceed; price will be calculated manually during processing.
                            </div>
                          );
                        }

                        return (
                          <div className="space-y-4">
                            <div className={`rounded-2xl p-5 text-center border-2 border-green-500 ${themeClasses.cardBg}`}>
                              <div className="text-sm font-medium text-neutral-500">{t('asset.youReceive')}</div>
                              <div className="font-bold text-3xl text-green-600 mt-1">${total.toFixed(4)}</div>
                              <div className="text-xs text-green-600">{t('asset.usdEquivalent')}</div>
                            </div>

                            <div className={`${themeClasses.cardBg} rounded-2xl p-4 border ${themeClasses.border}`}>
                              <h5 className={`font-semibold ${themeClasses.text} mb-3 flex items-center text-base`}>
                                <BarChart3 className="w-4 h-4 mr-2 text-blue-500" />
                                {t('asset.priceBreakdown')}
                              </h5>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-neutral-500">{t('asset.marketPrice')}:</span>
                                  <span className="font-medium">${market.toFixed(6)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-neutral-500">Platform Fee (0%):</span>
                                  <span className="font-medium text-neutral-500">-$0.000000</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-neutral-500">Promotional Bonus (+15%):</span>
                                  <span className="font-medium text-green-600">+${bonus.toFixed(6)}</span>
                                </div>
                                <hr className="my-2 border-neutral-200 dark:border-neutral-700" />
                                <div className="flex justify-between">
                                  <span className="font-bold">{t('asset.totalReceive')}:</span>
                                  <span className="font-bold text-green-600">${total.toFixed(6)}</span>
                                </div>

                                {selectedToken?.value &&
                                  balanceNum > 0 &&
                                  Math.abs(walletUnitFallback - unitPriceUSD) / (walletUnitFallback || 1) > 0.1 && (
                                    <div className="text-[11px] mt-2 text-amber-600">
                                      Heads up: wallet valuation (${walletValueUSD.toFixed(2)}) uses a different price than live market. Showing live
                                      market.
                                    </div>
                                  )}
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Continue */}
                    <div className="text-center mt-6">
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
                        disabled={
                          !selectedToken || !tradeAmount || parseFloat(tradeAmount) <= 0 || Number(tradeAmount) > Number(selectedToken.balance)
                        }
                        className={`bg-gradient-to-r ${themeClasses.gradient} text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl disabled:opacity-50 inline-flex items-center`}
                      >
                        {t('asset.nextPayout')} <ArrowRight className="w-5 h-5 ml-2" />
                      </button>
                      <div className="mt-3 text-[11px] text-neutral-500 flex items-center justify-center gap-2">
                        <Shield className="w-4 h-4" />
                        Funds never move without your explicit approval/signature.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Truly empty token list */}
            {!loading && tokens.length === 0 && (
              <div className={`${themeClasses.cardBg} rounded-2xl border ${themeClasses.border} p-8 text-center shadow-xl mt-6`}>
                <div className={`${darkMode ? 'bg-neutral-800' : 'bg-neutral-100'} w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center`}>
                  <Database className={`${darkMode ? 'text-white' : 'text-neutral-700'}`} />
                </div>
                <h4 className={`text-2xl font-bold ${themeClasses.text} mb-3`}>{t('asset.noAssets')}</h4>
                <p className={`${themeClasses.textSecondary}`}>{t('asset.noAssetsDesc')}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetManagement;
