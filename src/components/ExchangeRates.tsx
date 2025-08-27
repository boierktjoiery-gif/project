import React, { useState, useEffect } from 'react';
import { Activity, ChevronDown, ChevronRight, TrendingUp, DollarSign, Zap, RefreshCw, Globe, CheckCircle, AlertCircle } from 'lucide-react';
import { ExchangeRate, ThemeClasses } from '../types';
import { getDefaultPrice } from '../utils';

interface ExchangeRatesProps {
  exchangeRates: ExchangeRate[];
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
  themeClasses
}) => {
  const [liveRates, setLiveRates] = useState<LiveRate[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // cache last good prices and last known day-highs per symbol/fiat
  const [cachedPrices, setCachedPrices] = useState<Record<string, number>>({});
  const [cachedHighs, setCachedHighs] = useState<Record<string, number>>({});

  // central config (unchanged visually)
  const rateConfigs = [
    { id: 'bitcoin',      symbol: 'BTC',  name: 'Bitcoin',   markup: 5, icon: '₿', volume: '$5.2M' },
    { id: 'ethereum',     symbol: 'ETH',  name: 'Ethereum',  markup: 5, icon: 'Ξ', volume: '$2.8M' },
    { id: 'tether',       symbol: 'USDT', name: 'Tether',    markup: 10, icon: '₮', volume: '$3.5M' },
    { id: 'usd-coin',     symbol: 'USDC', name: 'USD Coin',  markup: 10, icon: '$', volume: '$1.9M' },
    { id: 'binancecoin',  symbol: 'BNB',  name: 'BNB',       markup: 5, icon: '⬡', volume: '$1.2M' }
  ];

  // small helpers
  const keyFor = (sym: string, fiat: string) => `${sym}_${fiat.toLowerCase()}`;
  const fiat = selectedFiat.toLowerCase();

  // Fetch live rates with robust fallbacks and day-high backup
  const fetchLiveRates = async () => {
    setIsRefreshing(true);
    setApiError(null);

    const ids = rateConfigs.map(r => r.id).join(',');
    const baseUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${encodeURIComponent(fiat)}&ids=${encodeURIComponent(ids)}&price_change_percentage=24h`;

    const tryFetch = async (url: string) => {
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    };

    try {
      let marketData: any[] | null = null;

      // primary request
      try {
        marketData = await tryFetch(baseUrl);
      } catch (primaryErr) {
        // proxy fallback (when CORS / network issues)
        const proxyUrl = 'https://api.allorigins.win/get?url=';
        const resp = await fetch(proxyUrl + encodeURIComponent(baseUrl));
        if (!resp.ok) throw new Error(`Proxy HTTP ${resp.status}`);
        const proxyPayload = await resp.json();
        marketData = JSON.parse(proxyPayload.contents);
      }

      // Validate payload
      if (!Array.isArray(marketData) || marketData.length === 0) {
        throw new Error('Empty market data');
      }

      // index by id for quick lookup
      const byId: Record<string, any> = {};
      for (const row of marketData) {
        if (row?.id) byId[row.id] = row;
      }

      const nextRates: LiveRate[] = rateConfigs.map((cfg) => {
        const row = byId[cfg.id] || {};
        const current = Number(row.current_price) || 0;
        const high24h = Number(row.high_24h) || 0;

        // Preferred: current price. If missing/invalid, fall back to the API's 24h high.
        let marketPrice = current > 0 ? current : (high24h > 0 ? high24h : 0);

        // If both missing, fall back to our caches (day-high preferred), then default.
        if (!(marketPrice > 0)) {
          const k = keyFor(cfg.symbol, fiat);
          marketPrice = (cachedHighs[k] ?? 0) || (cachedPrices[k] ?? 0) || getDefaultPrice(cfg.symbol, fiat);
        }

        // Persist caches when we have fresh values
        const k = keyFor(cfg.symbol, fiat);
        if (current > 0) {
          setCachedPrices(prev => ({ ...prev, [k]: current }));
        }
        if (high24h > 0) {
          setCachedHighs(prev => ({ ...prev, [k]: high24h }));
        }

        // 24h change %
        let change24h = 0;
        // CoinGecko returns price_change_percentage_24h_in_currency or price_change_percentage_24h
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
          icon: cfg.icon
        };
      });

      setLiveRates(nextRates);
      setLastUpdated(new Date());
      setApiError(null);
    } catch (err: any) {
      // Full API outage: fall back entirely using cached day-highs, then cached prices, then defaults
      console.error('Failed to fetch live rates:', err);
      setApiError(err?.message || 'Failed to fetch live rates');

      const fallbackRates: LiveRate[] = rateConfigs.map((cfg) => {
        const k = keyFor(cfg.symbol, fiat);
        // strict order: cached day-high → cached last price → project default
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
          change24h: 0, // unknown under outage
          volume: cfg.volume,
          icon: cfg.icon
        };
      });

      setLiveRates(fallbackRates);
      setLastUpdated(new Date());
    } finally {
      setIsRefreshing(false);
    }
  };

  // Auto-refresh rates every 30 seconds
  useEffect(() => {
    fetchLiveRates();
    const interval = setInterval(fetchLiveRates, 30000);
    return () => clearInterval(interval);
  }, [selectedFiat]); // keep as-is

  const formatPrice = (price: number) => {
    if (price < 1) return price.toFixed(4);
    if (price < 100) return price.toFixed(2);
    return price.toLocaleString(undefined, { maximumFractionDigits: 0 });
  };

  const getCurrencySymbol = () => {
    const symbols: Record<string, string> = {
      'usd': '$',
      'eur': '€',
      'inr': '₹',
      'gbp': '£'
    };
    return symbols[fiat] || '$';
  };

  return (
    <div className={`${themeClasses.cardBg} rounded-xl sm:rounded-2xl ${themeClasses.border} border overflow-hidden shadow-2xl backdrop-blur-xl`}>
      {/* Header */}
      <div className={`bg-gradient-to-r ${darkMode ? 'from-blue-900/20 to-cyan-900/20' : 'from-blue-50 to-cyan-50'} p-4 sm:p-6 border-b ${themeClasses.border}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${themeClasses.gradient} rounded-xl flex items-center justify-center shadow-xl`}>
              <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className={`font-bold ${themeClasses.text} text-lg sm:text-xl`}>Live Exchange Rates</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs bg-green-500/20 text-green-400 px-1.5 sm:px-2 py-1 rounded-full font-medium">LIVE</span>
                </div>
              </div>
              <div className={`text-xs ${themeClasses.textSecondary} flex flex-wrap items-center gap-1 sm:gap-2`}>
                <span>Updated: {lastUpdated.toLocaleTimeString()}</span>
                {apiError && (
                  <span className="text-orange-500 flex items-center whitespace-nowrap">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    <span className="hidden sm:inline">Using fallback data</span>
                    <span className="sm:hidden">Fallback</span>
                  </span>
                )}
                <button
                  onClick={fetchLiveRates}
                  disabled={isRefreshing}
                  className="flex items-center space-x-1 hover:text-blue-600 transition-colors whitespace-nowrap"
                >
                  <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowRates(!showRates)}
            className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${themeClasses.hover} transition-all duration-200 border ${themeClasses.border}`}
          >
            {showRates ?
              <ChevronDown className={`w-5 h-5 ${themeClasses.text}`} /> :
              <ChevronRight className={`w-5 h-5 ${themeClasses.text}`} />
            }
          </button>
        </div>
      </div>

      {showRates && (
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          {/* Currency Selector */}
          <div className="space-y-4">
            <span className={`text-sm font-medium ${themeClasses.text} flex items-center gap-2`}>
              <Globe className="w-4 h-4 text-blue-500" />
              Base Currency
            </span>
            <div className="grid grid-cols-4 gap-1 sm:gap-3">
              {[
                { code: 'usd', symbol: '$', name: 'USD', flag: '🇺🇸' },
                { code: 'eur', symbol: '€', name: 'EUR', flag: '🇪🇺' },
                { code: 'inr', symbol: '₹', name: 'INR', flag: '🇮🇳' },
                { code: 'gbp', symbol: '£', name: 'GBP', flag: '🇬🇧' }
              ].map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => setSelectedFiat(currency.code)}
                  className={`relative overflow-hidden rounded-lg sm:rounded-xl p-3 sm:p-4 text-center transition-all duration-300 border-2 ${
                    selectedFiat === currency.code
                      ? `border-blue-500 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} shadow-xl scale-105`
                      : `${themeClasses.border} ${themeClasses.cardBg} hover:border-blue-300 hover:shadow-md`
                  }`}
                >
                  {selectedFiat === currency.code && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
                  )}
                  <div className="relative">
                    <div className="text-base sm:text-xl mb-1 sm:mb-2">{currency.flag}</div>
                    <div className={`text-xs sm:text-sm font-bold ${
                      selectedFiat === currency.code
                        ? 'text-blue-600'
                        : themeClasses.text
                    }`}>
                      {currency.name}
                    </div>
                    <div className={`text-xs hidden sm:block ${
                      selectedFiat === currency.code
                        ? 'text-blue-500'
                        : themeClasses.textSecondary
                    }`}>
                      {currency.symbol}
                    </div>
                  </div>
                  {selectedFiat === currency.code && (
                    <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1">
                      <CheckCircle className="w-3 h-3 text-blue-500" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Live Rates Grid */}
          <div className="space-y-2 sm:space-y-4">
            {liveRates.map((rate) => (
              <div key={rate.symbol} className={`relative overflow-hidden rounded-lg border ${themeClasses.border} ${themeClasses.cardBg} hover:border-blue-400 transition-all duration-300 group hover:shadow-xl backdrop-blur-sm`}>
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${rate.change24h >= 0 ? 'from-green-500/5 to-emerald-500/5' : 'from-red-500/5 to-pink-500/5'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                <div className="relative p-3 sm:p-6">
                  <div className="flex items-center justify-between gap-2 sm:gap-3">
                    {/* Left: Token Info */}
                    <div className="flex items-center space-x-2 min-w-0">
                      <div className={`w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-r ${themeClasses.gradient} rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-xl shadow-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                        {rate.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className={`font-bold ${themeClasses.text} text-base sm:text-xl`}>{rate.symbol}</span>
                          <span className={`text-sm ${themeClasses.textSecondary} hidden sm:inline truncate`}>{rate.name}</span>
                        </div>
                        <div className="flex items-center text-xs">
                          <div className={`flex items-center space-x-1 ${rate.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            <TrendingUp className={`w-3 h-3 ${rate.change24h < 0 ? 'rotate-180' : ''}`} />
                            <span className="font-medium">{rate.change24h >= 0 ? '+' : ''}{rate.change24h.toFixed(2)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Pricing */}
                    <div className="text-right space-y-1 flex-shrink-0">
                      {/* Market Price */}
                      <div className="space-y-1">
                        <div className={`text-xs ${themeClasses.textSecondary} flex items-center justify-end space-x-1`}>
                          <DollarSign className="w-3 h-3" />
                          <span>Market Price</span>
                        </div>
                        <div className={`font-bold ${themeClasses.text} text-sm sm:text-lg`}>
                          {getCurrencySymbol()}{formatPrice(rate.marketPrice)}
                        </div>
                      </div>

                      {/* Exchange Price with Markup */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-end space-x-1 text-xs">
                          <Zap className="w-3 h-3 text-orange-500" />
                          <span className="text-orange-600 font-medium whitespace-nowrap">
                            Exchange Rate +{rate.markup}%
                          </span>
                        </div>
                        <div className="font-bold text-base sm:text-xl text-blue-600">
                          {getCurrencySymbol()}{formatPrice(rate.exchangePrice)}
                        </div>
                      </div>

                      {/* Markup Amount */}
                      <div className={`text-xs ${themeClasses.textSecondary} ${darkMode ? 'bg-orange-900/20' : 'bg-orange-100'} px-1 sm:px-2 py-0.5 sm:py-1 rounded text-center`}>
                        <span className="hidden sm:inline">Your Profit: </span>{getCurrencySymbol()}{formatPrice(rate.exchangePrice - rate.marketPrice)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Info */}
          <div className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl ${darkMode ? 'bg-blue-900/10 border-blue-800/30' : 'bg-blue-50 border-blue-200'} border text-center backdrop-blur-sm`}>
            <div className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-800'} space-y-1`}>
              <div className="flex items-center justify-center space-x-1">
                <Activity className="w-3 h-3" />
                <span className="font-medium">Real-time pricing with transparent markup</span>
              </div>
              <div className="text-xs">
                {apiError ? (
                  <span className="text-orange-600">Using 24h highs / last known rates</span>
                ) : (
                  <>
                    <span className="hidden sm:inline">Market rates update every 30 seconds • Exchange rates include processing fees</span>
                    <span className="sm:hidden">Updates every 30s • Includes fees</span>
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
