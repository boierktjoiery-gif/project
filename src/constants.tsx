import {
  Wallet, Shield, TrendingUp, Globe, AlertCircle, CheckCircle,
  Loader, Users, Lock, Zap, DollarSign, ArrowRight, Star, Award, Eye,
  BarChart3, Coins, CreditCard, Settings, Menu, X, ChevronDown, ChevronRight,
  Sun, Moon, Smartphone, Activity, Layers, Database, Fingerprint, Wifi
} from 'lucide-react';
import { Country, TrustBadge, TrustMetric, Testimonial } from './types';

export const BSC_PARAMS = {
  chainId: '0x38',
  chainName: 'Binance Smart Chain Mainnet',
  nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
  rpcUrls: ['https://bsc-dataseed.binance.org/'],
  blockExplorerUrls: ['https://bscscan.com']
};

export const COVALENT_KEY = 'cqt_rQj9pWHk7jrKrDJPYByfhmRpCDCW';

export const TRUST_BADGES: TrustBadge[] = [
 
  { name: 'SSL Secured', icon: Lock, color: 'from-purple-500 to-purple-600' },
  { name: 'DappRadar Verified', icon: Award, color: 'from-orange-500 to-orange-600' },
  { name: 'SOC 2 Certified', icon: Star, color: 'from-indigo-500 to-indigo-600' },
  { name: 'ISO 27001', icon: Globe, color: 'from-teal-500 to-teal-600' }
];

export const COUNTRIES: Country[] = [
  // High Demand Region
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    region: 'High Demand Region',
    methods: [
      { name: 'UPI', instant: true, fee: '0%' },
      { name: 'IMPS', instant: true, fee: '1%' },
      { name: 'Bank Transfer', instant: true, fee: '0.5%' }
    ]
  },
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    region: 'High Demand Region',
    methods: [
      { name: 'ACH', instant: true, fee: '0.5%' },
      { name: 'PayPal', instant: true, fee: '2.9%' },
      { name: 'Zelle', instant: true, fee: '0.3%' }
    ]
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    region: 'High Demand Region',
    methods: [
      { name: 'Faster Payments', instant: true, fee: '0.2%' },
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'PayPal', instant: true, fee: '2.5%' }
    ]
  },
  {
    code: 'CN',
    name: 'China',
    flag: '🇨🇳',
    region: 'High Demand Region',
    methods: [
      { name: 'Alipay', instant: true, fee: '0.8%' },
      { name: 'WeChat Pay', instant: true, fee: '0.8%' },
      { name: 'Bank Transfer', instant: true, fee: '0.5%' }
    ]
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    region: 'High Demand Region',
    methods: [
      { name: 'PayID', instant: true, fee: '0.3%' },
      { name: 'Bank Transfer', instant: true, fee: '0.4%' },
      { name: 'PayPal', instant: true, fee: '2.7%' }
    ]
  },

  // European Countries
  {
    code: 'UK',
    name: 'United Kingdom',
    flag: '🇬🇧',
    region: 'European Countries',
    methods: [
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'PayPal', instant: true, fee: '2.5%' },
      { name: 'SEPA', instant: true, fee: '0.2%' }
    ]
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    region: 'European Countries',
    methods: [
      { name: 'SEPA', instant: true, fee: '0.2%' },
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'PayPal', instant: true, fee: '2.5%' }
    ]
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    region: 'European Countries',
    methods: [
      { name: 'SEPA', instant: true, fee: '0.2%' },
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'PayPal', instant: true, fee: '2.5%' }
    ]
  },
  {
    code: 'IT',
    name: 'Italy',
    flag: '🇮🇹',
    region: 'European Countries',
    methods: [
      { name: 'SEPA', instant: true, fee: '0.2%' },
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'PayPal', instant: true, fee: '2.5%' }
    ]
  },
  {
    code: 'ES',
    name: 'Spain',
    flag: '🇪🇸',
    region: 'European Countries',
    methods: [
      { name: 'SEPA', instant: true, fee: '0.2%' },
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'PayPal', instant: true, fee: '2.5%' }
    ]
  },
  {
    code: 'NL',
    name: 'Netherlands',
    flag: '🇳🇱',
    region: 'European Countries',
    methods: [
      { name: 'SEPA', instant: true, fee: '0.2%' },
      { name: 'iDEAL', instant: true, fee: '0.3%' },
      { name: 'Bank Transfer', instant: true, fee: '0.5%' }
    ]
  },
  {
    code: 'BE',
    name: 'Belgium',
    flag: '🇧🇪',
    region: 'European Countries',
    methods: [
      { name: 'SEPA', instant: true, fee: '0.2%' },
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'PayPal', instant: true, fee: '2.5%' }
    ]
  },
  {
    code: 'CH',
    name: 'Switzerland',
    flag: '🇨🇭',
    region: 'European Countries',
    methods: [
      { name: 'Bank Transfer', instant: true, fee: '0.4%' },
      { name: 'PayPal', instant: true, fee: '2.5%' }
    ]
  },
  {
    code: 'AT',
    name: 'Austria',
    flag: '🇦🇹',
    region: 'European Countries',
    methods: [
      { name: 'SEPA', instant: true, fee: '0.2%' },
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'PayPal', instant: true, fee: '2.5%' }
    ]
  },
  {
    code: 'SE',
    name: 'Sweden',
    flag: '🇸🇪',
    region: 'European Countries',
    methods: [
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'Swish', instant: true, fee: '0.3%' },
      { name: 'PayPal', instant: true, fee: '2.5%' }
    ]
  },
  {
    code: 'NO',
    name: 'Norway',
    flag: '🇳🇴',
    region: 'European Countries',
    methods: [
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'Vipps', instant: true, fee: '0.3%' },
      { name: 'PayPal', instant: true, fee: '2.5%' }
    ]
  },
  {
    code: 'DK',
    name: 'Denmark',
    flag: '🇩🇰',
    region: 'European Countries',
    methods: [
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'MobilePay', instant: true, fee: '0.3%' },
      { name: 'PayPal', instant: true, fee: '2.5%' }
    ]
  },
  {
    code: 'FI',
    name: 'Finland',
    flag: '🇫🇮',
    region: 'European Countries',
    methods: [
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'PayPal', instant: true, fee: '2.5%' }
    ]
  },
  {
    code: 'IE',
    name: 'Ireland',
    flag: '🇮🇪',
    region: 'European Countries',
    methods: [
      { name: 'SEPA', instant: true, fee: '0.2%' },
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'PayPal', instant: true, fee: '2.5%' }
    ]
  },
  {
    code: 'PT',
    name: 'Portugal',
    flag: '🇵🇹',
    region: 'European Countries',
    methods: [
      { name: 'SEPA', instant: true, fee: '0.2%' },
      { name: 'MB WAY', instant: true, fee: '0.3%' },
      { name: 'Bank Transfer', instant: true, fee: '0.5%' }
    ]
  },
  {
    code: 'PL',
    name: 'Poland',
    flag: '🇵🇱',
    region: 'European Countries',
    methods: [
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'BLIK', instant: true, fee: '0.3%' },
      { name: 'PayPal', instant: true, fee: '2.5%' }
    ]
  },
  {
    code: 'CZ',
    name: 'Czech Republic',
    flag: '🇨🇿',
    region: 'European Countries',
    methods: [
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'PayPal', instant: true, fee: '2.5%' }
    ]
  },
  {
    code: 'HU',
    name: 'Hungary',
    flag: '🇭🇺',
    region: 'European Countries',
    methods: [
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'PayPal', instant: true, fee: '2.5%' }
    ]
  },
  {
    code: 'RO',
    name: 'Romania',
    flag: '🇷🇴',
    region: 'European Countries',
    methods: [
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'PayPal', instant: true, fee: '2.5%' }
    ]
  },
  {
    code: 'GR',
    name: 'Greece',
    flag: '🇬🇷',
    region: 'European Countries',
    methods: [
      { name: 'SEPA', instant: true, fee: '0.2%' },
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'PayPal', instant: true, fee: '2.5%' }
    ]
  },
  
  // Major Asian Countries
  {
    code: 'SG',
    name: 'Singapore',
    flag: '🇸🇬',
    region: 'Major Asian Countries',
    methods: [
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'PayNow', instant: true, fee: '0.3%' },
      { name: 'PayPal', instant: true, fee: '2.5%' }
    ]
  },
  {
    code: 'HK',
    name: 'Hong Kong',
    flag: '🇭🇰',
    region: 'Major Asian Countries',
    methods: [
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'FPS', instant: true, fee: '0.3%' },
      { name: 'PayPal', instant: true, fee: '2.5%' }
    ]
  },
  {
    code: 'JP',
    name: 'Japan',
    flag: '🇯🇵',
    region: 'Major Asian Countries',
    methods: [
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'PayPal', instant: true, fee: '2.5%' }
    ]
  },
  {
    code: 'KR',
    name: 'South Korea',
    flag: '🇰🇷',
    region: 'Major Asian Countries',
    methods: [
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'PayPal', instant: true, fee: '2.5%' }
    ]
  },
  {
    code: 'TW',
    name: 'Taiwan',
    flag: '🇹🇼',
    region: 'Major Asian Countries',
    methods: [
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'PayPal', instant: true, fee: '2.5%' }
    ]
  },
  {
    code: 'NG',
    name: 'Nigeria',
    flag: '🇳🇬',
    methods: [
      { name: 'Bank Transfer', instant: true, fee: '1%' },
      { name: 'Paystack', instant: true, fee: '0.8%' }
    ]
  },
  {
    code: 'BR',
    name: 'Brazil',
    flag: '🇧🇷',
    methods: [
      { name: 'PIX', instant: true, fee: '0.5%' },
      { name: 'Bank Transfer', instant: true, fee: '0.5%' }
    ]
  },
  {
    code: 'TH',
    name: 'Thailand',
    flag: '🇹🇭',
    region: 'Major Asian Countries',
    methods: [
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'PromptPay', instant: true, fee: '0.3%' },
      { name: 'PayPal', instant: true, fee: '2.5%' }
    ]
  },
  {
    code: 'MY',
    name: 'Malaysia',
    flag: '🇲🇾',
    region: 'Major Asian Countries',
    methods: [
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'PayPal', instant: true, fee: '2.5%' }
    ]
  },
  {
    code: 'ID',
    name: 'Indonesia',
    flag: '🇮🇩',
    region: 'Major Asian Countries',
    methods: [
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'PayPal', instant: true, fee: '2.5%' }
    ]
  },
  {
    code: 'PH',
    name: 'Philippines',
    flag: '🇵🇭',
    region: 'Major Asian Countries',
    methods: [
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'GCash', instant: true, fee: '0.8%' },
      { name: 'PayPal', instant: true, fee: '2.5%' }
    ]
  },
  {
    code: 'VN',
    name: 'Vietnam',
    flag: '🇻🇳',
    region: 'Major Asian Countries',
    methods: [
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'PayPal', instant: true, fee: '2.5%' }
    ]
  },
  {
    code: 'MX',
    name: 'Mexico',
    flag: '🇲🇽',
    region: 'Western Countries',
    methods: [
      { name: 'Bank Transfer', instant: true, fee: '0.8%' },
      { name: 'PayPal', instant: true, fee: '2.9%' }
    ]
  },
  {
    code: 'NZ',
    name: 'New Zealand',
    flag: '🇳🇿',
    region: 'Major Asian Countries',
    methods: [
      { name: 'Bank Transfer', instant: true, fee: '0.4%' },
      { name: 'PayPal', instant: true, fee: '2.7%' }
    ]
  },
  
  // Western Countries
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    region: 'Western Countries',
    methods: [
      { name: 'ACH', instant: true, fee: '0.5%' },
      { name: 'PayPal', instant: true, fee: '2.9%' }
    ]
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    region: 'Western Countries',
    methods: [
      { name: 'Bank Transfer', instant: true, fee: '0.5%' },
      { name: 'PayPal', instant: true, fee: '2.9%' }
    ]
  },
  {
    code: 'AR',
    name: 'Argentina',
    flag: '🇦🇷',
    region: 'Western Countries',
    methods: [
      { name: 'Bank Transfer', instant: true, fee: '1%' },
      { name: 'PayPal', instant: true, fee: '2.9%' }
    ]
  },
  {
    code: 'CL',
    name: 'Chile',
    flag: '🇨🇱',
    region: 'Western Countries',
    methods: [
      { name: 'Bank Transfer', instant: true, fee: '0.8%' },
      { name: 'PayPal', instant: true, fee: '2.9%' }
    ]
  },
  {
    code: 'CO',
    name: 'Colombia',
    flag: '🇨🇴',
    region: 'Western Countries',
    methods: [
      { name: 'Bank Transfer', instant: true, fee: '0.8%' },
      { name: 'PSE', instant: true, fee: '0.5%' },
      { name: 'PayPal', instant: true, fee: '2.9%' }
    ]
  }
];

export const TRUST_METRICS: TrustMetric[] = [
  { icon: DollarSign, label: 'Total Volume', value: '$847.8M', color: 'from-green-500 to-emerald-600' },
  { icon: Users, label: 'Active Users', value: '78,431', color: 'from-blue-500 to-cyan-600' },
  { icon: Award, label: 'Success Rate', value: '99.9%', color: 'from-purple-500 to-violet-600' },
  { icon: Zap, label: 'Avg Settlement', value: '3 mins', color: 'from-orange-500 to-red-600' }
];

export const TOKEN_CONTRACTS = {
  'USDT': '0xdac17f958d2ee523a2206206994597c13d831ec7',
  'BTC': '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
  'ETH': '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  'AICell': '0x0000000000000000000000000000000000000000'
};

export const COINGECKO_IDS = {
  'USDT': 'tether',
  'BTC': 'bitcoin',
  'ETH': 'ethereum',
  'AICell': 'aicell'
};

export const SAMPLE_TESTIMONIALS: Testimonial[] = [
 { name: "Sarah M.", location: "New York, USA", text: "Instant payouts, exactly as promised!", rating: 5 },
   { name: "David L.", location: "London, UK", text: "Best rates I've found anywhere.", rating: 5 },
   { name: "Priya K.", location: "Mumbai, India", text: "UPI integration works perfectly.", rating: 5 },
   { name: "Alex R.", location: "Toronto, Canada", text: "Seamless experience, highly recommend!", rating: 5 },
   { name: "Chen W.", location: "Singapore", text: "Quick settlement, transparent rates!", rating: 5 },
   { name: "Leila M.", location: "Casablanca, Morocco", text: "Got my cash in minutes! Great support team.", rating: 5 },
   { name: "Emil S.", location: "Stockholm, Sweden", text: "Safe and smooth. Will use again.", rating: 5 },
   { name: "Luisa G.", location: "Madrid, Spain", text: "Impressed with security & fast settlement.", rating: 5 },
   { name: "Amit R.", location: "Delhi, India", text: "Easy payouts to my bank. Highly trusted.", rating: 5 },
   { name: "Jan P.", location: "Berlin, Germany", text: "Perfect for quick euro payouts. Top notch!", rating: 5 },
   { name: "Lisa C.", location: "Sydney, Australia", text: "Works like magic! Fast PayPal transfer.", rating: 5 },
   { name: "Anna S.", location: "Paris, France", text: "Superb rates and instant SEPA payment.", rating: 5 },
   { name: "Ivan K.", location: "Moscow, Russia", text: "Funds settled as promised. Five stars!", rating: 5 },
   { name: "Mehmet T.", location: "Istanbul, Turkey", text: "Exchange was secure, payout was fast.", rating: 5 },
   { name: "Satoshi Y.", location: "Tokyo, Japan", text: "Fastest yen withdrawal I've ever tried.", rating: 5 },
   { name: "Felipe G.", location: "São Paulo, Brazil", text: "Really liked the clear instructions!", rating: 5 },
   { name: "Sofia B.", location: "Rome, Italy", text: "Quick SEPA to my bank, hassle-free.", rating: 5 },
   { name: "Khaled A.", location: "Dubai, UAE", text: "Excellent for large amounts. Trusted.", rating: 5 },
   { name: "Andres M.", location: "Mexico City, Mexico", text: "All worked perfectly. Highly recommend!", rating: 5 },
   { name: "Julia N.", location: "Vienna, Austria", text: "Easy to use, very professional service.", rating: 5 },
   { name: "Chris P.", location: "Chicago, USA", text: "Support answered instantly. Impressed.", rating: 5 },
   { name: "Ella H.", location: "Copenhagen, Denmark", text: "Process is fast and stress-free!", rating: 5 },
   { name: "Raj P.", location: "Bangalore, India", text: "Great for instant UPI cashouts!", rating: 5 },
   { name: "Samir S.", location: "Lagos, Nigeria", text: "Swift Naira payout to my bank!", rating: 5 },
   { name: "Maria F.", location: "Lisbon, Portugal", text: "Rates and support both excellent.", rating: 5 },
   { name: "Petra V.", location: "Prague, Czechia", text: "Funds arrived in 6 mins. Outstanding!", rating: 5 },
   { name: "Thabo N.", location: "Johannesburg, South Africa", text: "Quick ZAR payment, no issues.", rating: 5 },
   { name: "Jane M.", location: "Auckland, New Zealand", text: "No hassle at all, highly rated!", rating: 5 },
   { name: "Markus J.", location: "Zurich, Switzerland", text: "Platform is reliable, payouts fast.", rating: 5 },
   { name: "Ayesha S.", location: "Karachi, Pakistan", text: "Simple, fast, and secure!", rating: 5 },
   // Add more if needed, can also add a few 4-star reviews below
   { name: "Sergio R.", location: "Buenos Aires, Argentina", text: "Payout was quick, had to wait 10 mins for support.", rating: 4 },
   { name: "Natalia P.", location: "Warsaw, Poland", text: "Works great, rates could be a little better.", rating: 4 },
   { name: "Elena D.", location: "Athens, Greece", text: "Very satisfied, good security.", rating: 4 },
   { name: "Omar H.", location: "Cairo, Egypt", text: "Easy process, but needed extra verification.", rating: 4 },
   { name: "Jonas W.", location: "Oslo, Norway", text: "Nice UI, payout came as expected.", rating: 4 },
    { name: "Natalie K.", location: "Los Angeles, USA", text: "Transfer to my bank in under 5 minutes. Wow!", rating: 5 },
   { name: "Oscar G.", location: "Barcelona, Spain", text: "Amazing support, even late at night.", rating: 5 },
   { name: "Ahmed Z.", location: "Riyadh, Saudi Arabia", text: "Crypto to SAR in no time. Secure and efficient.", rating: 5 },
   { name: "Isabella C.", location: "Santiago, Chile", text: "Clear process, and money landed fast.", rating: 5 },
   { name: "Nina V.", location: "Belgrade, Serbia", text: "Used it three times, always perfect.", rating: 5 },
   { name: "Henrik L.", location: "Helsinki, Finland", text: "Rates are good and very honest about fees.", rating: 5 },
   { name: "Arun N.", location: "Chennai, India", text: "Seamless payout to my UPI app. Love it!", rating: 5 },
   { name: "Diana T.", location: "Bucharest, Romania", text: "Very quick SEPA transfer, recommended!", rating: 5 },
   { name: "George P.", location: "Athens, Greece", text: "Everything worked as promised.", rating: 5 },
   { name: "Mateo R.", location: "Lima, Peru", text: "Customer service was very helpful.", rating: 5 },
   { name: "Yara S.", location: "Beirut, Lebanon", text: "Simple platform, rates are clear.", rating: 5 },
   { name: "Lucia M.", location: "Bogotá, Colombia", text: "Best exchange for cashing out crypto.", rating: 5 },
   { name: "Tom W.", location: "Manchester, UK", text: "Sent BTC, got GBP same day.", rating: 5 },
   { name: "Waleed F.", location: "Amman, Jordan", text: "Works perfectly with local bank.", rating: 5 },
   { name: "Lisa R.", location: "Zurich, Switzerland", text: "Super fast payouts, no stress.", rating: 5 },
   { name: "Ahmed B.", location: "Algiers, Algeria", text: "Funds in my account in 7 minutes.", rating: 5 },
   { name: "Sam T.", location: "Boston, USA", text: "Used several times, never disappointed.", rating: 5 },
   { name: "Marta P.", location: "Krakow, Poland", text: "Very efficient, will recommend to friends.", rating: 5 },
   { name: "Liang H.", location: "Hong Kong", text: "Clear UI and payout to my bank in HKD.", rating: 5 },
   { name: "Mariana S.", location: "Brasilia, Brazil", text: "Superb customer experience.", rating: 5 },
   { name: "Gabriel O.", location: "Lisbon, Portugal", text: "Safe, reliable, and easy.", rating: 5 },
   { name: "Tina E.", location: "Tallinn, Estonia", text: "Instant support and great payout speed.", rating: 5 },
   { name: "Noah M.", location: "Toronto, Canada", text: "Crypto to CAD made simple.", rating: 5 },
   { name: "Irene D.", location: "Dublin, Ireland", text: "Very quick SEPA payout.", rating: 5 },
   { name: "Peter J.", location: "Auckland, New Zealand", text: "Money was in my account before I finished coffee.", rating: 5 },
   { name: "Samson K.", location: "Nairobi, Kenya", text: "KSH payout direct to bank, love it.", rating: 5 },
   { name: "Siti M.", location: "Kuala Lumpur, Malaysia", text: "Smooth experience, helpful support.", rating: 5 },
   { name: "Paulo F.", location: "Rio de Janeiro, Brazil", text: "Best way to cash out crypto in BRL.", rating: 5 },
   { name: "Emily J.", location: "Cape Town, South Africa", text: "Rand payout was seamless.", rating: 5 },
   { name: "Luuk V.", location: "Amsterdam, Netherlands", text: "Fastest iDEAL settlement ever.", rating: 5 },
   { name: "Mikael O.", location: "Oslo, Norway", text: "Very good platform and fast process.", rating: 5 },
   { name: "Gloria E.", location: "Abuja, Nigeria", text: "Funds hit my account almost instantly.", rating: 5 },
   { name: "Fabio G.", location: "Rome, Italy", text: "Top rates, no hidden fees.", rating: 5 },
   { name: "Leah B.", location: "Jerusalem, Israel", text: "Shekel payout in less than 10 min.", rating: 5 },
   { name: "Dmitry V.", location: "Saint Petersburg, Russia", text: "No issues, will use again.", rating: 5 },
   { name: "Jason C.", location: "Los Angeles, USA", text: "Great for cashing out big amounts.", rating: 5 },
   { name: "Olga K.", location: "Minsk, Belarus", text: "Very good service, fast payouts.", rating: 5 },
   { name: "Jorge S.", location: "Caracas, Venezuela", text: "Quick bolivar transfer, thanks!", rating: 5 },
   { name: "Ella Z.", location: "Shanghai, China", text: "All smooth, fast payout.", rating: 5 },
   { name: "Ali H.", location: "Tehran, Iran", text: "IRR payout in under 15 mins.", rating: 5 },
   { name: "Martina R.", location: "Prague, Czechia", text: "Quick, easy, and safe.", rating: 5 },
   { name: "Adeel M.", location: "Lahore, Pakistan", text: "No issues, PKR payout was fast.", rating: 5 },
   { name: "Ana G.", location: "San Jose, Costa Rica", text: "Very user-friendly, no complaints.", rating: 5 },
   { name: "Adrian P.", location: "Budapest, Hungary", text: "Got forints in my bank same day.", rating: 5 },
   { name: "Marta C.", location: "Sofia, Bulgaria", text: "Worked perfectly with Bulgarian bank.", rating: 5 },
   { name: "Tarek B.", location: "Tunis, Tunisia", text: "Quick TND payout, thank you!", rating: 5 },
   { name: "Sophie T.", location: "Brussels, Belgium", text: "Support was helpful and payout fast.", rating: 5 },
   { name: "Daniela Q.", location: "Quito, Ecuador", text: "Perfect service, highly recommend.", rating: 5 },
   { name: "Julien D.", location: "Lyon, France", text: "Easy to use, quick EUR payout.", rating: 5 },
   { name: "Peter K.", location: "Vienna, Austria", text: "All as advertised. Impressive!", rating: 5 },
   { name: "Ivan M.", location: "Zagreb, Croatia", text: "Will use again for sure.", rating: 5 },
   { name: "Nikita P.", location: "Kyiv, Ukraine", text: "Fast payout, thanks!", rating: 5 },
   { name: "Stephanie J.", location: "Munich, Germany", text: "Support is quick to respond.", rating: 5 },
   { name: "Jin H.", location: "Seoul, South Korea", text: "KRW payout, no hassles at all.", rating: 5 },
   { name: "Reem F.", location: "Kuwait City, Kuwait", text: "Smooth process, feels secure.", rating: 5 },
   { name: "Mohammed S.", location: "Doha, Qatar", text: "Got my money same hour.", rating: 5 },
   { name: "Abdul R.", location: "Muscat, Oman", text: "Super easy platform, payout fast.", rating: 5 },
   { name: "Sandra L.", location: "Lagos, Nigeria", text: "Works every time, great Naira payout.", rating: 5 },
   { name: "Nguyen T.", location: "Hanoi, Vietnam", text: "No problems, quick payout.", rating: 5 },
   { name: "Ben D.", location: "Edinburgh, UK", text: "Slick interface and fast payout.", rating: 5 },
   { name: "Kim S.", location: "Bangkok, Thailand", text: "Thai Baht payout was very fast.", rating: 5 },
   { name: "Jacob W.", location: "San Francisco, USA", text: "Fast and professional team.", rating: 5 },
   { name: "Lucas P.", location: "Brisbane, Australia", text: "AUD in my bank next business day.", rating: 5 },
   { name: "Erika H.", location: "Vilnius, Lithuania", text: "Great, no delays at all.", rating: 5 },
   { name: "Kofi O.", location: "Accra, Ghana", text: "Local Cedi payout worked.", rating: 5 },
   { name: "Yusuf A.", location: "Istanbul, Turkey", text: "Very good for Turkish market.", rating: 5 },
   { name: "Zainab M.", location: "Abu Dhabi, UAE", text: "Payout quick and easy.", rating: 5 },
   { name: "Jean C.", location: "Montreal, Canada", text: "Platform is my go-to for cashing out.", rating: 5 },
   { name: "Stella W.", location: "Frankfurt, Germany", text: "Reliable every time.", rating: 5 },
   { name: "Carlos S.", location: "Lima, Peru", text: "All perfect, no issues.", rating: 5 },
   { name: "Sanaa E.", location: "Casablanca, Morocco", text: "Good rates and fast payout.", rating: 5 },
   { name: "Igor S.", location: "Belgrade, Serbia", text: "Superb experience.", rating: 5 },
   { name: "Anna B.", location: "Warsaw, Poland", text: "Works as expected, happy with service.", rating: 5 },
   { name: "Valentina M.", location: "Santiago, Chile", text: "Money landed fast, thank you!", rating: 5 },
   { name: "Max H.", location: "Hamburg, Germany", text: "Quick response from support.", rating: 5 },
   { name: "Amina J.", location: "Dakar, Senegal", text: "Easy to cash out to my bank.", rating: 5 },
   { name: "Lukas K.", location: "Bratislava, Slovakia", text: "Platform is super easy to use.", rating: 5 },
   { name: "Ethan C.", location: "Houston, USA", text: "No hassle, will use again.", rating: 5 },
   { name: "Nour R.", location: "Beirut, Lebanon", text: "Lebanese pounds received quickly.", rating: 5 },
   { name: "Fatima A.", location: "Cairo, Egypt", text: "Trustworthy, will use again.", rating: 5 },
   { name: "Gabriela D.", location: "San Juan, Puerto Rico", text: "All went well, great service.", rating: 5 },
   { name: "Amir S.", location: "Baghdad, Iraq", text: "Quick payout, simple steps.", rating: 5 },
   { name: "Niko S.", location: "Helsinki, Finland", text: "Absolutely trustworthy.", rating: 5 },
   { name: "Julie F.", location: "Nice, France", text: "Happy with speed and support.", rating: 5 },
   { name: "Moussa C.", location: "Bamako, Mali", text: "Funds received quickly in CFA.", rating: 5 },
   { name: "Paula M.", location: "Medellin, Colombia", text: "Recommended for all crypto users.", rating: 5 },
   { name: "Petr S.", location: "Moscow, Russia", text: "Everything as described.", rating: 5 },
   { name: "Mohamed F.", location: "Marrakech, Morocco", text: "Money was in my bank so fast.", rating: 5 },
   { name: "Victor D.", location: "Sofia, Bulgaria", text: "Smooth transaction, no worries.", rating: 5 },
   { name: "Ravi S.", location: "Hyderabad, India", text: "Bank payout was instant.", rating: 5 },
   { name: "Maria N.", location: "Athens, Greece", text: "Good for euro payouts.", rating: 5 },
   { name: "Fahad A.", location: "Manama, Bahrain", text: "Got paid in minutes!", rating: 5 },
   { name: "Ella M.", location: "Vilnius, Lithuania", text: "Trustworthy platform, will use again.", rating: 5 },
   { name: "Milena V.", location: "Belgrade, Serbia", text: "Very good platform, thanks.", rating: 5 },
   // 4-star reviews with small (realistic) feedback:
   { name: "Julio P.", location: "Panama City, Panama", text: "Payout fast, had to resend ID doc.", rating: 4 },
   { name: "Vikram R.", location: "Pune, India", text: "Service was quick, slightly high fee.", rating: 4 },
   { name: "Alice K.", location: "London, UK", text: "Good, but waited 15 mins for payout.", rating: 4 },
   { name: "Matheus L.", location: "Salvador, Brazil", text: "All fine, customer chat was a bit slow.", rating: 4 },
   { name: "Juan F.", location: "Buenos Aires, Argentina", text: "Payout good, would like more methods.", rating: 4 },
   { name: "Eva C.", location: "Berlin, Germany", text: "Support was fast, KYC took a bit.", rating: 4 },
   { name: "Meera P.", location: "Kolkata, India", text: "Took 8 mins, expected instant. Still great.", rating: 4 },
   { name: "Joseph N.", location: "Nairobi, Kenya", text: "Got KES payout, rates could be better.", rating: 4 },
   { name: "Nikita S.", location: "Moscow, Russia", text: "Worked well, interface could be simpler.", rating: 4 },
   { name: "Ari W.", location: "Tel Aviv, Israel", text: "Had to verify again, payout then instant.", rating: 4 }
];