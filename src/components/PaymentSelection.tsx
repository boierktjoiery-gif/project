import React from 'react';
import { Globe, CreditCard, ArrowRight, Zap, Mail, Phone, MessageCircle, User, Banknote } from 'lucide-react';
import { COUNTRIES } from '../constants';
import { PaymentDetails, ThemeClasses } from '../types';
import PaymentFormFields from './PaymentFormFields';

interface PaymentSelectionProps {
  selectedCountry: string;
  selectedPaymentMethod: string;
  paymentDetails: PaymentDetails;
  themeClasses: ThemeClasses;
  darkMode: boolean;
  setSelectedCountry: (country: string) => void;
  setSelectedPaymentMethod: (method: string) => void;
  setPaymentDetails: (details: PaymentDetails) => void;
  setCurrentStep: (step: number) => void;
  validatePaymentDetails: (method: string, details: PaymentDetails) => boolean;
}

const PaymentSelection: React.FC<PaymentSelectionProps> = ({
  selectedCountry,
  selectedPaymentMethod,
  paymentDetails,
  themeClasses,
  darkMode,
  setSelectedCountry,
  setSelectedPaymentMethod,
  setPaymentDetails,
  setCurrentStep,
  validatePaymentDetails
}) => {
  const selectedCountryData = COUNTRIES.find(c => c.code === selectedCountry);
  const [showContactForm, setShowContactForm] = React.useState(false);
  const [contactInfo, setContactInfo] = React.useState({
    email: '',
    phone: '',
    telegram: '',
    preferredContact: ''
  });

  // ⬇️ NEW: ensure Cash appears as a selectable method (without editing COUNTRIES)
  const methodsWithCash = React.useMemo(() => {
    const base = selectedCountryData?.methods ?? [];
    const hasCash = base.some(m => m.name.toLowerCase() === 'cash');
    const cashMethod = { name: 'Cash', fee: '0–1%' };
    return hasCash ? base : [...base, cashMethod];
  }, [selectedCountryData]);

  const validateContactInfo = () => {
    if (!contactInfo.preferredContact) return false;
    switch (contactInfo.preferredContact) {
      case 'email':
        return contactInfo.email && /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(contactInfo.email);
      case 'phone':
        return contactInfo.phone && /^\+?[\d\s-()]{10,}$/.test(contactInfo.phone);
      case 'telegram':
        return contactInfo.telegram && contactInfo.telegram.trim().length > 0;
      default:
        return false;
    }
  };

  return (
    <div data-section="payout-selection">
      {!selectedCountry ? (
        <>
          <h3 className={`text-xl font-semibold ${themeClasses.text} mb-6 flex items-center`}>
            <Globe className="w-6 h-6 mr-2 text-blue-600" />
            Select Your Payout Region
          </h3>

          <div className={`${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} border ${darkMode ? 'border-blue-800' : 'border-blue-200'} rounded-2xl p-4 mb-6`}>
            <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'} mb-2`}>
              Please choose your payout region from the following options:
            </p>
          </div>

          {[
            { name: 'High Demand Region', countries: COUNTRIES.filter(c => c.region === 'High Demand Region') },
            { name: 'European ', countries: COUNTRIES.filter(c => c.region === 'European Countries') },
            { name: ' Asian ', countries: COUNTRIES.filter(c => c.region === 'Major Asian Countries') },
            { name: 'Western ', countries: COUNTRIES.filter(c => c.region === 'Western Countries') }
          ].map((region) => {
            const regionName = region.name;
            const regionCountries = region.countries;
            const isHighDemand = regionName === 'High Demand Region';

            return (
              <div key={regionName} className="mb-8">
                {isHighDemand && (
                  <div className={`${darkMode ? 'bg-blue-900/10' : 'bg-blue-50'} border ${darkMode ? 'border-blue-800/30' : 'border-blue-200'} rounded-2xl p-6 mb-6`}>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${themeClasses.gradient} rounded-xl flex items-center justify-center shadow-lg mr-3`}>
                          <Globe className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className={`text-xl font-bold ${themeClasses.text}`}>Most Popular Regions</h4>
                          <p className={`text-sm ${themeClasses.textSecondary}`}>Fastest processing & lowest fees</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                        <div className={`${themeClasses.cardBg} rounded-xl p-3 border ${themeClasses.border}`}>
                          <div className="text-lg font-bold text-green-600">0-1%</div>
                          <div className={`text-xs ${themeClasses.textSecondary}`}>Low Fees</div>
                        </div>
                        <div className={`${themeClasses.cardBg} rounded-xl p-3 border ${themeClasses.border}`}>
                          <div className="text-lg font-bold text-blue-600">24/7</div>
                          <div className={`text-xs ${themeClasses.textSecondary}`}>Processing</div>
                        </div>
                        <div className={`${themeClasses.cardBg} rounded-xl p-3 border ${themeClasses.border}`}>
                          <div className="text-lg font-bold text-orange-600">3min</div>
                          <div className={`text-xs ${themeClasses.textSecondary}`}>Settlement</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {!isHighDemand && (
                  <h4 className={`text-lg font-bold ${themeClasses.text} mb-4 flex items-center`}>
                    <div className={`w-3 h-3 bg-gradient-to-r ${themeClasses.gradient} rounded-full mr-3`}></div>
                    {regionName}
                  </h4>
                )}

                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4`}>
                  {regionCountries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => {
                        setSelectedCountry(country.code);
                        setShowContactForm(true);
                        setSelectedPaymentMethod('');
                        setPaymentDetails({});
                      }}
                      className={`border-2 rounded-xl p-4 transition-all duration-200 text-left group ${
                        isHighDemand
                          ? `${darkMode ? 'bg-blue-900/20 border-blue-700/50 hover:border-blue-500' : 'bg-blue-50 border-blue-200 hover:border-blue-400'} hover:shadow-lg`
                          : `${themeClasses.border} ${themeClasses.cardBg} hover:border-blue-400 ${themeClasses.hover} hover:shadow-md`
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl group-hover:scale-110 transition-transform duration-200">
                          {country.flag}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`font-semibold text-base mb-1 ${themeClasses.text} truncate`}>
                            {country.name}
                          </div>
                          <div className={`text-sm ${themeClasses.textSecondary} mb-2`}>
                            {country.methods.length} method{country.methods.length > 1 ? 's' : ''}
                          </div>
                          <div className="flex items-center">
                            <Zap className="w-3 h-3 mr-1 text-green-600" />
                            <span className="text-xs font-medium text-green-600">
                              {isHighDemand ? 'PRIORITY' : 'INSTANT'}
                            </span>
                          </div>
                        </div>
                      </div>
                      {isHighDemand && (
                        <div className="mt-3 text-center">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                            Popular
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          <div className={`mt-8 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} border ${themeClasses.border} rounded-2xl p-6`}>
            <div className="text-center">
              <div className={`w-12 h-12 bg-gradient-to-r ${themeClasses.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h5 className={`font-bold text-lg mb-3 ${themeClasses.text}`}>
                Country Not Listed?
              </h5>
              <p className={`${themeClasses.textSecondary} mb-4 max-w-md mx-auto`}>
                Contact our support team for assistance with payout options in your region.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className={themeClasses.textSecondary}>10+ Countries</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  <span className={themeClasses.textSecondary}>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : showContactForm ? (
        <>
          {/* ... contact form section unchanged ... */}

          <div className="mb-6">
            <h4 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>Choose Notification Method</h4>
            <div className="space-y-3">
              {[
                { id: 'email', icon: Mail, label: 'Email Address', desc: 'Instant email notifications', color: 'text-blue-600' },
                { id: 'phone', icon: Phone, label: 'Phone Number', desc: 'SMS alerts and updates', color: 'text-green-600' },
                { id: 'telegram', icon: MessageCircle, label: 'Telegram ID', desc: 'Real-time bot messages', color: 'text-purple-600' }
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setContactInfo({ ...contactInfo, preferredContact: method.id })}
                  className={`w-full border-2 rounded-2xl p-4 hover:border-blue-500 ${themeClasses.hover} flex items-center justify-between transition-all duration-300 ${
                    contactInfo.preferredContact === method.id ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : `${themeClasses.border} ${themeClasses.cardBg}`
                  }`}
                >
                  <div className="flex items-center">
                    <method.icon className={`w-6 h-6 ${method.color} mr-3`} />
                    <div className="text-left">
                      <div className={`font-semibold ${themeClasses.text}`}>{method.label}</div>
                      <div className={`text-sm ${themeClasses.textSecondary}`}>{method.desc}</div>
                    </div>
                  </div>
                  {contactInfo.preferredContact === method.id && (
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                      SELECTED
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

      
          {/* Contact Information Form */}
          {contactInfo.preferredContact && (
            <div className="mb-6">
              <h4 className={`text-lg font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                {contactInfo.preferredContact === 'email' && <Mail className="w-5 h-5 text-blue-600 mr-2" />}
                {contactInfo.preferredContact === 'phone' && <Phone className="w-5 h-5 text-green-600 mr-2" />}
                {contactInfo.preferredContact === 'telegram' && <MessageCircle className="w-5 h-5 text-purple-600 mr-2" />}
                Enter Your {contactInfo.preferredContact === 'email' ? 'Email' : contactInfo.preferredContact === 'phone' ? 'Phone Number' : 'Telegram ID'}
              </h4>
              
              {contactInfo.preferredContact === 'email' && (
                <div>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={e => setContactInfo({ ...contactInfo, email: e.target.value })}
                    className={`w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.input}`}
                    placeholder="your.email@example.com"
                  />
                  {contactInfo.email && !/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(contactInfo.email) && (
                    <p className="text-red-600 text-sm mt-1">Please enter a valid email address</p>
                  )}
                </div>
              )}
              
              {contactInfo.preferredContact === 'phone' && (
                <div>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={e => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    className={`w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.input}`}
                    placeholder="+1 (555) 123-4567"
                  />
                  {contactInfo.phone && !/^\+?[\d\s-()]{10,}$/.test(contactInfo.phone) && (
                    <p className="text-red-600 text-sm mt-1">Please enter a valid phone number</p>
                  )}
                </div>
              )}
              
              {contactInfo.preferredContact === 'telegram' && (
                <div>
                  <input
                    type="text"
                    value={contactInfo.telegram}
                    onChange={e => setContactInfo({ ...contactInfo, telegram: e.target.value })}
                    className={`w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.input}`}
                    placeholder="@yourusername or your Telegram ID"
                  />
                  {contactInfo.telegram && contactInfo.telegram.trim().length === 0 && (
                    <p className="text-red-600 text-sm mt-1">Please enter your Telegram ID or username</p>
                  )}
                </div>
              )}
            </div>
          )}
          <button
            onClick={() => {
              setShowContactForm(false);
              setPaymentDetails({ ...paymentDetails, contactInfo });
            }}
            disabled={!validateContactInfo()}
            className={`w-full bg-gradient-to-r ${themeClasses.gradient} text-white py-3 rounded-2xl font-semibold hover:shadow-xl disabled:opacity-50 transition-all duration-300`}
          >
            Continue to Payment Methods
          </button>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-semibold ${themeClasses.text} flex items-center`}>
              <div className="text-2xl mr-3">{selectedCountryData?.flag}</div>
              {selectedCountryData?.name}
            </h3>
            <button
              onClick={() => {
                setShowContactForm(true);
                setSelectedPaymentMethod('');
                setPaymentDetails({});
              }}
              className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              <ArrowRight className="w-4 h-4 mr-1 rotate-180" />
              Back to Contact Info
            </button>
          </div>

          {/* ⬇️ Use methodsWithCash here */}
          <div className={`bg-gradient-to-r ${darkMode ? 'from-blue-900/20 to-purple-900/20' : 'from-blue-50 to-purple-50'} rounded-2xl p-6 mb-6 border ${darkMode ? 'border-blue-800' : 'border-blue-100'}`}>
            <h4 className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-900'} mb-3 flex items-center`}>
              <Globe className="w-5 h-5 mr-2" />
              Available Payment Methods
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {methodsWithCash.map((method, index) => (
                <div key={index} className={`flex items-center justify-between ${themeClasses.cardBg} rounded-xl p-3 border ${darkMode ? 'border-blue-700' : 'border-blue-100'}`}>
                  <div className="flex items-center">
                    {method.name.toLowerCase() === 'cash'
                      ? <Banknote className="w-4 h-4 text-green-600 mr-2" />
                      : <CreditCard className="w-4 h-4 text-blue-600 mr-2" />
                    }
                    <span className={`font-medium ${themeClasses.text}`}>{method.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={themeClasses.textSecondary}>Fee: {method.fee}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${method.name.toLowerCase() === 'cash' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                      {method.name.toLowerCase() === 'cash' ? 'IN-PERSON' : 'INSTANT'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h4 className={`text-lg font-semibold ${themeClasses.text} mb-4`}>Choose Payment Method</h4>
          <div className="space-y-3 mb-6">
            {methodsWithCash.map((method, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedPaymentMethod(method.name);
                  setPaymentDetails({});
                }}
                className={`w-full border-2 rounded-2xl p-4 hover:border-blue-500 ${themeClasses.hover} flex items-center justify-between transition-all duration-300 ${
                  selectedPaymentMethod === method.name ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : `${themeClasses.border} ${themeClasses.cardBg}`
                }`}
              >
                <div className="flex items-center">
                  {method.name.toLowerCase() === 'cash'
                    ? <Banknote className="w-6 h-6 text-green-600 mr-3" />
                    : <CreditCard className="w-6 h-6 text-blue-600 mr-3" />
                  }
                  <div className="text-left">
                    <div className={`font-semibold ${themeClasses.text}`}>{method.name}</div>
                    <div className={`text-sm ${themeClasses.textSecondary}`}>Fee: {method.fee}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${method.name.toLowerCase() === 'cash' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                    {method.name.toLowerCase() === 'cash' ? 'IN-PERSON' : 'INSTANT'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {selectedPaymentMethod && (
        <PaymentFormFields
          selectedPaymentMethod={selectedPaymentMethod}
          paymentDetails={paymentDetails}
          setPaymentDetails={setPaymentDetails}
          themeClasses={themeClasses}
        />
      )}

      {selectedPaymentMethod && (
        <button
          onClick={() => setCurrentStep(4)}
          disabled={
            !selectedCountry ||
            !selectedPaymentMethod ||
            !validatePaymentDetails(selectedPaymentMethod, paymentDetails)
          }
          className={`w-full bg-gradient-to-r ${themeClasses.gradient} text-white py-3 rounded-2xl font-semibold hover:shadow-xl disabled:opacity-50 transition-all duration-300`}
        >
          Next: Asset Verification
        </button>
      )}
    </div>
  );
};

export default PaymentSelection;
