export interface Token {
  symbol: string;
  name: string;
  balance: string;
  value: string;
  approved: boolean;
  contractAddress: string;
  logoUrl?: string;
  txHash?: string;
}

export interface PaymentMethod {
  name: string;
  instant: boolean;
  fee: string;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
  region: string;
  methods: PaymentMethod[];
}

export interface ExchangeRate {
  pair: string;
  rate: string;
  markup: string;
  volume: string;
}

export interface TrustBadge {
  name: string;
  icon: any;
  color: string;
}

export interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
}

export interface TrustMetric {
  icon: any;
  label: string;
  value: string;
  color: string;
}

export interface PaymentDetails {
  [key: string]: any;
  upiId?: string;
  fullName?: string;
  accountNumber?: string;
  ifscCode?: string;
  accountHolderName?: string;
  paypalEmail?: string;
  routingNumber?: string;
  accountType?: string;
  iban?: string;
  bicCode?: string;
  bankName?: string;
  sortCode?: string;
  general?: string;
  contactInfo?: {
    email: string;
    phone: string;
    telegram: string;
    preferredContact: string;
  };
}

export interface ThemeClasses {
  bg: string;
  cardBg: string;
  text: string;
  textSecondary: string;
  border: string;
  hover: string;
  input: string;
  gradient: string;
}