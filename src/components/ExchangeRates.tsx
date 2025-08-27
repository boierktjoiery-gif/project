import React, { useState, useEffect, useRef } from 'react';
import {
  Activity,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  DollarSign,
  Zap,
  RefreshCw,
  Globe,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { ExchangeRate, ThemeClasses } from '../types';
import { getDefaultPrice } from '../utils';

interface ExchangeRatesProps {
  exchangeRates: ExchangeRate[]; // (kept for API parity; not used directly in this live version)
  showRates: boolean;
  setShowRates: (show: boolean) => void;
  selectedFiat: string;
  setSelectedFiat: (fiat: string) => void;
  darkMode: boolean;
  themeClasses: ThemeClasses;
}

interface LiveRate {
  symbol: string;
  name: string;
  marketPrice: number;
  exchangePrice: number;
  markup: number;
  change24h: number;
  volume: string;
  icon: string;
}

const ExchangeRates: React.FC<ExchangeRatesProps> = ({
  exchangeRates,
  showRates,
  setShowRates,
  selectedFiat,
  setSelectedFiat,
  darkMode,
  themeClasses,
}) => {
  const [liveRates, setLiveRates] = useState<LiveRate[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // caches for resilience
  const [cachedPrices, setCachedPrices] = useState<Record<string, number>>({});
  const [cachedHighs, setCachedHighs] = useState<Record<string, number>>({});

  // a11y live region
  const liveRegionRef = useRef<HTMLDivElement | null>(null);

  // central configs
  const rateConfigs = [
    { id: 'bitcoin',     symbol: 'BTC',  name: 'Bitcoin',   markup: 5,  icon: '₿', volume: '$5.2M' },
    { id: 'ethereum',    symbol: 'ETH',  name: 'Ethereum',  markup: 5,  icon: 'Ξ', volume: '$2.8M' },
    { id: 'tether',      symbol: 'USDT', name: 'Tether',    markup: 10, icon: '₮', volume: '$3.5M' },
    { id: 'usd-coin',    symbol: 'USDC', name: 'USD Coin',  markup: 10, icon: '$', volume: '$1.9M' },
    { id: 'binancecoin', symbol: 'BNB',  name: 'BNB',       markup: 5,  icon: '⬡', volume: '$1.2M' },
  ];

  // helpers
  const keyFor = (sym: string, fiat: string) => `${sym}_${fiat.toLowerCase()}`;
  const fiat = selectedFiat.toLowerCase();

  // Fetch live rates (with robust fallbacks)
  const fetchLiveRates = async () => {
    setIsRefreshing(true);
    setApiError(null);

    const ids = rateConfigs.map((r) => r.id).join(',');
    const baseUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${encodeURIComponent(
      fiat
    )}&ids=${encodeURIComponent(ids)}&price_change_percentage=24h`;

    const tryFetch = async (url: string) => {
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    };

    try {
      let marketData: any[] | null = null;

      try {
        marketData = await tryFetch(baseUrl);
      } catch {
        // basic proxy fallback for CORS/network
        const proxyUrl = 'https://api.allorigins.win/get?url=';
        const resp = await fetch(proxyUrl + encodeURIComponent(baseUrl));
        if (!resp.ok) throw new Error(`Proxy HTTP ${resp.status}`);
        const proxyPayload = await resp.json();
        marketData = JSON.parse(proxyPayload.contents);
      }

      if (!Array.isArray(marketData) || marketData.length === 0) {
        throw new Error('Empty market data');
      }

      const byId: Record<string, any> = {};
      for (const row of marketData) {
        if (row?.id) byId[row.id] = row;
      }

      const nextRates: LiveRate[] = rateConfigs.map((cfg) => {
        const row = byId[cfg.id] || {};
        const current = Number(row.current_price) || 0;
        const high24h = Number(row.high_24h) || 0;

        let marketPrice = current > 0 ? current : high24h > 0 ? high24h : 0;
        if (!(marketPrice > 0)) {
          const k = keyFor(cfg.symbol, fiat);
          marketPrice =
            (cachedHighs[k] ?? 0) ||
            (cachedPrices[k] ?? 0) ||
            getDefaultPrice(cfg.symbol, fiat);
        }

        const k = keyFor(cfg.symbol, fiat);
        if (current > 0) setCachedPrices((prev) => ({ ...prev, [k]: current }));
        if (high24h > 0) setCachedHighs((prev) => ({ ...prev, [k]: high24h }));

        let change24h = 0;
        if (typeof row.price_change_percentage_24h_in_currency === 'number') {
          change24h = row.price_change_percentage_24h_in_currency;
        } else if (typeof row.price_change_percentage_24h === 'number') {
          change24h = row.price_change_percentage_24h;
        }

        const exchangePrice = marketPrice * (1 + cfg.markup / 100);

        return {
          symbol: cfg.symbol,
          name: cfg.name,
          marketPrice,
          exchangePrice,
          markup: cfg.markup,
          change24h,
          volume: cfg.volume,
          icon: cfg.icon,
        };
      });

      setLiveRates(nextRates);
      const now = new Date();
      setLastUpdated(now);

      // announce to screen readers
      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = `Rates updated at ${now.toLocaleTimeString()}`;
      }

      setApiError(null);
    } catch (err: any) {
      console.error('Failed to fetch live rates:', err);
      setApiError(err?.message || 'Failed to fetch live rates');

      const fallbackRates: LiveRate[] = rateConfigs.map((cfg) => {
        const k = keyFor(cfg.symbol, fiat);
        const marketPrice =
          (cachedHighs[k] ?? 0) ||
          (cachedPrices[k] ?? 0) ||
          getDefaultPrice(cfg.symbol, fiat);

        const exchangePrice = marketPrice * (1 + cfg.markup / 100);

        return {
          symbol: cfg.symbol,
          name: cfg.name,
          marketPrice,
          exchangePrice,
          markup: cfg.markup,
          change24h: 0,
          volume: cfg.volume,
          icon: cfg.icon,
        };
      });

      setLiveRates(fallbackRates);
      const now = new Date();
      setLastUpdated(now);
      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = `Fallback rates shown at ${now.toLocaleTimeString()}`;
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  // Auto-refresh every 10s (was 30s)
  useEffect(() => {
    fetchLiveRates();
    const interval = setInterval(fetchLiveRates, 10000);
    return () => clearInterval(interval);
  }, [selectedFiat]); // keep dependency identical to original

  const formatPrice = (price: number) => {
    if (price < 1) return price.toFixed(4);
    if (price < 100) return price.toFixed(2);
    return price.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  const getCurrencySymbol = () => {
    const symbols: Record<string, string> = {
      usd: '$',
      eur: '€',
      inr: '₹',
      gbp: '£',
    };
    return symbols[fiat] || '$';
  };

  return (
    <div
      className={`${themeClasses.cardBg} rounded-xl sm:rounded-2xl ${themeClasses.border} border overflow-hidden shadow-2xl backdrop-blur-xl`}
      aria-labelledby="rates-title"
    >
      {/* a11y live region (invisible) */}
      <div
        ref={liveRegionRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      {/* Header */}
      <div
        className={`bg-gradient-to-r ${
          darkMode ? 'from-blue-900/20 to-cyan-900/20' : 'from-blue-50 to-cyan-50'
        } p-3 sm:p-6 border-b ${themeClasses.border}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className={`w-9 h-9 sm:w-12 sm:h-12 bg-gradient-to-r ${themeClasses.gradient} rounded-lg sm:rounded-xl flex items-center justify-center`}
            >
              <Activity className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  id="rates-title"
                  className={`font-bold ${themeClasses.text} text-base sm:text-xl`}
                >
                  Live Exchange Rates
                </span>
                <div className="inline-flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] sm:text-xs bg-green-500/20 text-green-600 px-1.5 sm:px-2 py-0.5 rounded-full font-medium">
                    LIVE
                  </span>
                </div>
              </div>
              <div
                className={`text-[11px] sm:text-xs ${themeClasses.textSecondary} flex flex-wrap items-center gap-1 sm:gap-2`}
              >
                <span>Updated: {lastUpdated.toLocaleTimeString()}</span>
                {apiError && (
                  <span className="text-orange-500 inline-flex items-center whitespace-nowrap">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    <span className="hidden sm:inline">Using fallback data</span>
                    <span className="sm:hidden">Fallback</span>
                  </span>
                )}
                <button
                  onClick={fetchLiveRates}
                  disabled={isRefreshing}
                  className="flex items-center gap-1 hover:text-blue-600 transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  aria-label="Refresh rates"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowRates(!showRates)}
            className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${themeClasses.hover} transition-all duration-200 border ${themeClasses.border} focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
            aria-expanded={showRates}
            aria-controls="rates-panel"
            aria-label={showRates ? 'Collapse exchange rates' : 'Expand exchange rates'}
          >
            {showRates ? (
              <ChevronDown className={`w-5 h-5 ${themeClasses.text}`} />
            ) : (
              <ChevronRight className={`w-5 h-5 ${themeClasses.text}`} />
            )}
          </button>
        </div>
      </div>

      {showRates && (
        <div id="rates-panel" className="p-3 sm:p-6 space-y-4 sm:space-y-6">
          {/* Currency Selector */}
          <div className="space-y-2 sm:space-y-4">
            <span className={`text-sm font-medium ${themeClasses.text} inline-flex items-center gap-2`}>
              <Globe className="w-4 h-4 text-blue-500" />
              Base Currency
            </span>
            {/* Mobile: big buttons; Desktop: same as before */}
            <div className="grid grid-cols-4 gap-1 sm:gap-3">
              {[
                { code: 'usd', symbol: '$', name: 'USD', flag: '🇺🇸' },
                { code: 'eur', symbol: '€', name: 'EUR', flag: '🇪🇺' },
                { code: 'inr', symbol: '₹', name: 'INR', flag: '🇮🇳' },
                { code: 'gbp', symbol: '£', name: 'GBP', flag: '🇬🇧' },
              ].map((currency) => {
                const selected = selectedFiat === currency.code;
                return (
                  <button
                    key={currency.code}
                    onClick={() => setSelectedFiat(currency.code)}
                    className={`relative overflow-hidden rounded-lg sm:rounded-xl px-2 py-2 sm:p-4 text-center transition-all duration-300 border-2 ${
                      selected
                        ? `border-blue-500 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} shadow-md sm:shadow-xl sm:scale-105`
                        : `${themeClasses.border} ${themeClasses.cardBg} hover:border-blue-300 hover:shadow-md`
                    } focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
                    aria-pressed={selected}
                    aria-label={`Set base currency to ${currency.name}`}
                  >
                    {selected && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 pointer-events-none" />
                    )}
                    <div className="relative">
                      <div className="text-base sm:text-xl mb-0.5 sm:mb-2">{currency.flag}</div>
                      <div className={`text-xs sm:text-sm font-bold ${selected ? 'text-blue-600' : themeClasses.text}`}>
                        {currency.name}
                      </div>
                      <div
                        className={`text-[10px] hidden sm:block ${
                          selected ? 'text-blue-500' : themeClasses.textSecondary
                        }`}
                      >
                        {currency.symbol}
                      </div>
                    </div>
                    {selected && (
                      <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1">
                        <CheckCircle className="w-3 h-3 text-blue-500" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ===== Mobile Compact Rates (accessible list) ===== */}
          <div className="sm:hidden" role="list" aria-label="Live rates list">
            {liveRates.map((rate) => {
              const up = rate.change24h >= 0;
              return (
                <div
                  key={rate.symbol}
                  role="listitem"
                  className={`relative rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} p-3 mb-2.5`}
                >
                  {/* Row 1: Symbol / Name / Change */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className={`w-9 h-9 bg-gradient-to-r ${themeClasses.gradient} rounded-md flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}
                        aria-hidden="true"
                      >
                        {rate.icon}
                      </div>
                      <div className="min-w-0">
                        <div className={`text-sm font-semibold ${themeClasses.text} truncate`}>
                          {rate.symbol}{' '}
                          <span className={`text-[11px] ${themeClasses.textSecondary}`}>· {rate.name}</span>
                        </div>
                        <div
                          className={`inline-flex items-center gap-1 text-[11px] ${
                            up ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          <TrendingUp className={`w-3 h-3 ${up ? '' : 'rotate-180'}`} />
                          <span className="font-medium">
                            {up ? '+' : ''}
                            {rate.change24h.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Badge: markup */}
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-600 font-medium whitespace-nowrap">
                      +{rate.markup}% markup
                    </span>
                  </div>

                  {/* Row 2: Prices (side-by-side) */}
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="rounded-md border border-transparent p-2">
                      <div className={`flex items-center gap-1 text-[11px] ${themeClasses.textSecondary}`}>
                        <DollarSign className="w-3 h-3" />
                        Market
                      </div>
                      <div className={`text-base font-bold ${themeClasses.text}`}>
                        {getCurrencySymbol()}
                        {formatPrice(rate.marketPrice)}
                      </div>
                    </div>
                    <div className="rounded-md p-2 text-right">
                      <div className="flex items-center gap-1 justify-end text-[11px] text-blue-600">
                        <Zap className="w-3 h-3" />
                        Exchange
                      </div>
                      <div className="text-base font-extrabold text-blue-600">
                        {getCurrencySymbol()}
                        {formatPrice(rate.exchangePrice)}
                      </div>
                      <div
                        className={`text-[11px] mt-0.5 inline-block px-1.5 py-0.5 rounded ${
                          darkMode ? 'bg-orange-900/20 text-orange-300' : 'bg-orange-100 text-orange-700'
                        }`}
                        aria-label="Markup difference"
                      >
                        +{getCurrencySymbol()}
                        {formatPrice(rate.exchangePrice - rate.marketPrice)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ===== Desktop / Tablet Grid (kept similar, light compacting) ===== */}
          <div className="hidden sm:block space-y-4">
            {liveRates.map((rate) => (
              <div
                key={rate.symbol}
                className={`relative overflow-hidden rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} hover:border-blue-400 transition-all duration-300 group hover:shadow-xl backdrop-blur-sm`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${
                    rate.change24h >= 0 ? 'from-green-500/5 to-emerald-500/5' : 'from-red-500/5 to-pink-500/5'
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <div className="relative p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-14 h-14 bg-gradient-to-r ${themeClasses.gradient} rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-xl flex-shrink-0`}
                      >
                        {rate.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${themeClasses.text} text-xl`}>{rate.symbol}</span>
                          <span className={`text-sm ${themeClasses.textSecondary} truncate`}>{rate.name}</span>
                        </div>
                        <div
                          className={`flex items-center gap-1 text-sm ${
                            rate.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          <TrendingUp
                            className={`w-4 h-4 ${rate.change24h >= 0 ? '' : 'rotate-180'}`}
                          />
                          <span className="font-medium">
                            {rate.change24h >= 0 ? '+' : ''}
                            {rate.change24h.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <div>
                        <div className={`text-xs ${themeClasses.textSecondary} flex items-center justify-end gap-1`}>
                          <DollarSign className="w-3 h-3" />
                          Market Price
                        </div>
                        <div className={`font-bold ${themeClasses.text} text-lg`}>
                          {getCurrencySymbol()}
                          {formatPrice(rate.marketPrice)}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-end gap-1 text-xs">
                          <Zap className="w-3 h-3 text-orange-500" />
                          <span className="text-orange-600 font-medium whitespace-nowrap">
                            Exchange Rate +{rate.markup}%
                          </span>
                        </div>
                        <div className="font-bold text-xl text-blue-600">
                          {getCurrencySymbol()}
                          {formatPrice(rate.exchangePrice)}
                        </div>
                      </div>

                      <div
                        className={`text-xs ${themeClasses.textSecondary} ${
                          darkMode ? 'bg-orange-900/20' : 'bg-orange-100'
                        } px-2 py-1 rounded inline-block`}
                      >
                        <span className="hidden md:inline">Your Profit: </span>
                        {getCurrencySymbol()}
                        {formatPrice(rate.exchangePrice - rate.marketPrice)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Info */}
          <div
            className={`mt-2 sm:mt-6 p-3 sm:p-4 rounded-xl ${
              darkMode ? 'bg-blue-900/10 border-blue-800/30' : 'bg-blue-50 border-blue-200'
            } border text-center backdrop-blur-sm`}
          >
            <div className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-800'} space-y-1`}>
              <div className="flex items-center justify-center gap-1">
                <Activity className="w-3 h-3" />
                <span className="font-medium">Real-time pricing with transparent markup</span>
              </div>
              <div className="text-xs">
                {apiError ? (
                  <span className="text-orange-600">Using 24h highs / last known rates</span>
                ) : (
                  <>
                    <span className="hidden sm:inline">
                      Market rates update every <strong>10 seconds</strong> • Exchange rates include processing fees
                    </span>
                    <span className="sm:hidden">
                      Updates every <strong>10s</strong> • Includes fees
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExchangeRates;
