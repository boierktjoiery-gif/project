import React from 'react';
import { X, Shield, Eye, Lock, Database, Globe, Users, AlertTriangle } from 'lucide-react';
import { ThemeClasses } from '../types';

interface PrivacyPolicyProps {
  darkMode: boolean;
  themeClasses: ThemeClasses;
  onClose: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ darkMode, themeClasses, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className={`${themeClasses.cardBg} rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border-2 ${darkMode ? 'border-blue-800' : 'border-blue-200'}`}>
        {/* Header */}
        <div className={`bg-gradient-to-r ${darkMode ? 'from-blue-900/30 to-purple-900/30' : 'from-blue-50 to-purple-50'} p-6 border-b ${themeClasses.border} relative`}>
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 p-2 rounded-full ${themeClasses.hover} transition-colors`}
          >
            <X className={`w-5 h-5 ${themeClasses.textSecondary}`} />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 bg-gradient-to-r ${themeClasses.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${themeClasses.text}`}>Privacy Policy</h2>
              <p className={`text-sm ${themeClasses.textSecondary}`}>Securep2p.pro - Last updated: January 2025</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-8">
            {/* Introduction */}
            <section>
              <div className={`${darkMode ? 'bg-green-900/20' : 'bg-green-50'} border ${darkMode ? 'border-green-800' : 'border-green-200'} rounded-xl p-4 mb-4`}>
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-800'}`}>
                    <strong>Privacy-First Approach:</strong> Securep2p.pro is built on privacy-by-design principles. We collect only the minimum data necessary for payment processing and never require personal identification documents.
                  </div>
                </div>
              </div>
              
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                <Eye className="w-5 h-5 mr-2 text-blue-600" />
                1. Information We Collect
              </h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                Unlike traditional exchanges, Securep2p.pro operates with minimal data collection. We only collect information necessary for payment processing and platform functionality:
              </p>
              
              <div className="space-y-4">
                <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-xl p-4`}>
                  <h4 className={`font-semibold ${themeClasses.text} mb-2`}>Payment Information Only:</h4>
                  <ul className={`${themeClasses.textSecondary} space-y-1 ml-4`}>
                    <li>• Wallet addresses and transaction data</li>
                    <li>• Contact information (email, phone, Telegram) - optional for notifications</li>
                    <li>• Payment method details (bank accounts, UPI IDs, PayPal emails)</li>
                    <li>• Transaction amounts and currency preferences</li>
                  </ul>
                </div>
                
                <div className={`${darkMode ? 'bg-red-900/20' : 'bg-red-50'} border ${darkMode ? 'border-red-800' : 'border-red-200'} rounded-xl p-4`}>
                  <h4 className={`font-semibold ${darkMode ? 'text-red-300' : 'text-red-800'} mb-2`}>What We DON'T Collect:</h4>
                  <ul className={`${darkMode ? 'text-red-400' : 'text-red-700'} space-y-1 ml-4`}>
                    <li>• Government-issued ID documents</li>
                    <li>• Proof of address or residence</li>
                    <li>• Social security numbers or tax IDs</li>
                    <li>• Income verification or employment details</li>
                    <li>• Biometric data or photographs</li>
                    <li>• Credit history or financial background</li>
                  </ul>
                </div>
                
                <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-xl p-4`}>
                  <h4 className={`font-semibold ${themeClasses.text} mb-2`}>Technical Information:</h4>
                  <ul className={`${themeClasses.textSecondary} space-y-1 ml-4`}>
                    <li>• IP addresses and device information</li>
                    <li>• Browser type and version</li>
                    <li>• Basic usage analytics (anonymized)</li>
                    <li>• Transaction timestamps and amounts</li>
                    <li>• Blockchain transaction hashes</li>
                    <li>• Error logs for troubleshooting</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                <Database className="w-5 h-5 mr-2 text-blue-600" />
                2. How We Use Your Information
              </h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                We use the minimal information we collect solely for the following purposes:
              </p>
              <ul className={`${themeClasses.textSecondary} mb-4 space-y-2 ml-6`}>
                <li>• Process cryptocurrency exchange transactions</li>
                <li>• Transfer funds to your specified payment method</li>
                <li>• Send transaction confirmations and status updates</li>
                <li>• Provide customer support and respond to inquiries</li>
                <li>• Detect and prevent fraud and security threats</li>
                <li>• Improve our services and user experience</li>
                <li>• Maintain platform security and stability</li>
                <li>• Generate anonymized analytics for platform improvement</li>
              </ul>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                <strong>We do NOT use your information for:</strong> Marketing, advertising, profiling, selling to third parties, or any purpose beyond transaction processing and platform operation.
              </p>
            </section>

            {/* Information Sharing */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                3. Information Sharing
              </h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                <strong>Zero Data Selling Policy:</strong> We never sell, trade, rent, or monetize your personal information. We may share limited information only in these specific circumstances:
              </p>
              <ul className={`${themeClasses.textSecondary} mb-4 space-y-2 ml-6`}>
                <li>• With payment processors to complete transactions</li>
                <li>• With blockchain networks for transaction processing</li>
                <li>• With law enforcement when legally compelled by valid court orders</li>
                <li>• With essential service providers under strict confidentiality agreements</li>
                <li>• To protect against fraud, security threats, or illegal activities</li>
                <li>• With your explicit consent</li>
              </ul>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                <strong>Third-Party Services:</strong> We work with payment processors and blockchain infrastructure providers who may process your data. These partners are contractually bound to protect your information and use it only for transaction processing.
              </p>
            </section>

            {/* Data Security */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                <Lock className="w-5 h-5 mr-2 text-blue-600" />
                4. Data Security
              </h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                Securep2p.pro implements military-grade security measures to protect your information:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className={`${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} rounded-xl p-4`}>
                  <h4 className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-800'} mb-2`}>Encryption</h4>
                  <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                    AES-256 encryption for all data, TLS 1.3 for transmission, end-to-end encryption for sensitive data
                  </p>
                </div>
                <div className={`${darkMode ? 'bg-green-900/20' : 'bg-green-50'} rounded-xl p-4`}>
                  <h4 className={`font-semibold ${darkMode ? 'text-green-300' : 'text-green-800'} mb-2`}>Access Control</h4>
                  <p className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-700'}`}>
                    Zero-trust architecture, multi-factor authentication, role-based access controls
                  </p>
                </div>
                <div className={`${darkMode ? 'bg-purple-900/20' : 'bg-purple-50'} rounded-xl p-4`}>
                  <h4 className={`font-semibold ${darkMode ? 'text-purple-300' : 'text-purple-800'} mb-2`}>Monitoring</h4>
                  <p className={`text-sm ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                    24/7 SOC monitoring, AI-powered threat detection, real-time anomaly detection
                  </p>
                </div>
                <div className={`${darkMode ? 'bg-orange-900/20' : 'bg-orange-50'} rounded-xl p-4`}>
                  <h4 className={`font-semibold ${darkMode ? 'text-orange-300' : 'text-orange-800'} mb-2`}>Audits</h4>
                  <p className={`text-sm ${darkMode ? 'text-orange-400' : 'text-orange-700'}`}>
                    Quarterly penetration testing, annual security audits, continuous vulnerability assessments
                  </p>
                </div>
              </div>
              
              <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-xl p-4 mb-4`}>
                <h4 className={`font-semibold ${themeClasses.text} mb-2`}>Additional Security Measures:</h4>
                <ul className={`${themeClasses.textSecondary} space-y-1 ml-4 text-sm`}>
                  <li>• Data minimization - we collect only what's absolutely necessary</li>
                  <li>• Automatic data purging after transaction completion</li>
                  <li>• Distributed infrastructure with no single point of failure</li>
                  <li>• Regular security training for all team members</li>
                  <li>• Incident response plan with 15-minute response time</li>
                  <li>• Bug bounty program for continuous security improvement</li>
                </ul>
              </div>
            </section>

            {/* Data Minimization */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>5. Data Minimization Principle</h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                Securep2p.pro follows strict data minimization principles:
              </p>
              <ul className={`${themeClasses.textSecondary} mb-4 space-y-2 ml-6`}>
                <li>• <strong>Purpose Limitation:</strong> Data is collected only for specific, legitimate purposes</li>
                <li>• <strong>Storage Limitation:</strong> Data is kept only as long as necessary</li>
                <li>• <strong>Data Quality:</strong> We ensure data accuracy and keep it up to date</li>
                <li>• <strong>Transparency:</strong> Clear communication about what data we collect and why</li>
                <li>• <strong>User Control:</strong> You can request deletion of your data at any time</li>
              </ul>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                This approach significantly reduces your privacy risk compared to traditional exchanges that collect extensive personal information.
              </p>
            </section>

            {/* Automatic Data Deletion */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>6. Automatic Data Deletion</h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                To protect your privacy, we automatically delete data according to the following schedule:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className={`${darkMode ? 'bg-green-900/20' : 'bg-green-50'} rounded-xl p-4`}>
                  <h4 className={`font-semibold ${darkMode ? 'text-green-300' : 'text-green-800'} mb-2`}>Immediate Deletion</h4>
                  <ul className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-700'} space-y-1`}>
                    <li>• Payment details after successful transfer</li>
                    <li>• Temporary session data</li>
                    <li>• Cached user preferences</li>
                  </ul>
                </div>
                <div className={`${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} rounded-xl p-4`}>
                  <h4 className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-800'} mb-2`}>30-Day Deletion</h4>
                  <ul className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-700'} space-y-1`}>
                    <li>• Transaction logs and history</li>
                    <li>• Support conversation records</li>
                    <li>• Error logs and debugging data</li>
                  </ul>
                </div>
              </div>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                <strong>Blockchain Records:</strong> Please note that blockchain transactions are permanent and cannot be deleted. However, these records do not contain your personal information, only wallet addresses and transaction amounts.
              </p>
            </section>

            {/* No Tracking Policy */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>7. No Tracking Policy</h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                Unlike most websites, Securep2p.pro does not engage in user tracking:
              </p>
              <ul className={`${themeClasses.textSecondary} mb-4 space-y-2 ml-6`}>
                <li>• <strong>No Google Analytics:</strong> We don't use Google Analytics or similar tracking services</li>
                <li>• <strong>No Social Media Pixels:</strong> No Facebook, Twitter, or other social media tracking</li>
                <li>• <strong>No Advertising Networks:</strong> No third-party advertising or retargeting</li>
                <li>• <strong>No Cross-Site Tracking:</strong> We don't track your activity across other websites</li>
                <li>• <strong>Minimal Cookies:</strong> Only essential cookies for platform functionality</li>
              </ul>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                We use privacy-focused analytics that collect only anonymized, aggregated data to improve platform performance.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>8. Data Retention</h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                We retain information only as long as necessary for legitimate business purposes:
              </p>
              <div className="space-y-3">
                <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-xl p-4`}>
                  <h4 className={`font-semibold ${themeClasses.text} mb-2`}>Transaction Data:</h4>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>
                    Basic transaction records: 30 days for support purposes, then automatically deleted
                  </p>
                </div>
                <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-xl p-4`}>
                  <h4 className={`font-semibold ${themeClasses.text} mb-2`}>Payment Information:</h4>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>
                    Deleted immediately after successful fund transfer completion
                  </p>
                </div>
                <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-xl p-4`}>
                  <h4 className={`font-semibold ${themeClasses.text} mb-2`}>Technical Logs:</h4>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>
                    Anonymized logs kept for 90 days for security and performance monitoring
                  </p>
                </div>
                <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-xl p-4`}>
                  <h4 className={`font-semibold ${themeClasses.text} mb-2`}>Support Communications:</h4>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>
                    Kept for 1 year to maintain support quality, then automatically deleted
                  </p>
                </div>
              </div>
            </section>

            {/* Data Retention */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>5. Data Retention</h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                We retain your information for as long as necessary to provide our services and comply with legal obligations:
              </p>
              <ul className={`${themeClasses.textSecondary} mb-4 space-y-2 ml-6`}>
                <li>• Transaction records: 7 years (regulatory requirement)</li>
                <li>• KYC documents: 5 years after account closure</li>
                <li>• Technical logs: 2 years</li>
                <li>• Marketing preferences: Until you opt out</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>9. Your Privacy Rights</h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                You have comprehensive rights regarding your personal information, regardless of your location:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-xl p-4`}>
                  <h4 className={`font-semibold ${themeClasses.text} mb-2`}>Access & Portability</h4>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>
                    Request a copy of all data we have about you in a machine-readable format
                  </p>
                </div>
                <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-xl p-4`}>
                  <h4 className={`font-semibold ${themeClasses.text} mb-2`}>Correction</h4>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>
                    Update or correct any inaccurate information we may have
                  </p>
                </div>
                <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-xl p-4`}>
                  <h4 className={`font-semibold ${themeClasses.text} mb-2`}>Deletion</h4>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>
                    Request immediate deletion of all your personal data
                  </p>
                </div>
                <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-xl p-4`}>
                  <h4 className={`font-semibold ${themeClasses.text} mb-2`}>Processing Restriction</h4>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>
                    Request restriction of processing for specific purposes
                  </p>
                </div>
                <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-xl p-4`}>
                  <h4 className={`font-semibold ${themeClasses.text} mb-2`}>Objection</h4>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>
                    Object to processing based on legitimate interests
                  </p>
                </div>
                <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-xl p-4`}>
                  <h4 className={`font-semibold ${themeClasses.text} mb-2`}>Withdraw Consent</h4>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>
                    Withdraw consent for any processing based on consent
                  </p>
                </div>
              </div>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                <strong>How to Exercise Your Rights:</strong> Contact us at privacy@Securep2p.pro with your request. We will respond within 48 hours and fulfill valid requests within 30 days at no cost to you.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>10. Cookies and Local Storage</h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                Securep2p.pro uses minimal cookies and local storage for essential functionality only:
              </p>
              <div className="space-y-3">
                <div className={`${darkMode ? 'bg-green-900/20' : 'bg-green-50'} rounded-xl p-4`}>
                  <h4 className={`font-semibold ${darkMode ? 'text-green-300' : 'text-green-800'} mb-2`}>Essential Cookies (Required)</h4>
                  <ul className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-700'} space-y-1 ml-4`}>
                    <li>• Session management and security</li>
                    <li>• Theme preferences (dark/light mode)</li>
                    <li>• Language selection</li>
                    <li>• Wallet connection state</li>
                  </ul>
                </div>
                <div className={`${darkMode ? 'bg-red-900/20' : 'bg-red-50'} rounded-xl p-4`}>
                  <h4 className={`font-semibold ${darkMode ? 'text-red-300' : 'text-red-800'} mb-2`}>What We DON'T Use</h4>
                  <ul className={`text-sm ${darkMode ? 'text-red-400' : 'text-red-700'} space-y-1 ml-4`}>
                    <li>• Advertising or marketing cookies</li>
                    <li>• Social media tracking pixels</li>
                    <li>• Cross-site tracking cookies</li>
                    <li>• Third-party analytics cookies</li>
                    <li>• Behavioral profiling cookies</li>
                  </ul>
                </div>
              </div>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                You can disable cookies in your browser settings, but this may affect platform functionality.
              </p>
            </section>

            {/* International Transfers */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                <Globe className="w-5 h-5 mr-2 text-blue-600" />
                11. International Data Transfers
              </h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                Securep2p.pro operates globally with distributed infrastructure. Your data may be processed in different countries, but we ensure:
              </p>
              <ul className={`${themeClasses.textSecondary} mb-4 space-y-2 ml-6`}>
                <li>• All data transfers use encryption and secure protocols</li>
                <li>• We only work with jurisdictions that provide adequate data protection</li>
                <li>• Standard contractual clauses are used for international transfers</li>
                <li>• Data localization preferences are respected where possible</li>
                <li>• No data is transferred to countries with poor privacy records</li>
              </ul>
            </section>

            {/* Children's Privacy */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>12. Children's Privacy</h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                Securep2p.pro is not intended for use by individuals under 18 years of age. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18, we will take immediate steps to delete such information.
              </p>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately at privacy@Securep2p.pro.
              </p>
            </section>

            {/* Data Breach Notification */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>13. Data Breach Notification</h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                In the unlikely event of a data breach that affects your personal information, we commit to:
              </p>
              <ul className={`${themeClasses.textSecondary} mb-4 space-y-2 ml-6`}>
                <li>• Detect and contain the breach within 1 hour</li>
                <li>• Assess the scope and impact within 6 hours</li>
                <li>• Notify affected users within 24 hours</li>
                <li>• Provide clear information about what happened and what we're doing</li>
                <li>• Offer free credit monitoring if financial data was involved</li>
                <li>• Implement additional security measures to prevent recurrence</li>
              </ul>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                Our minimal data collection approach significantly reduces the risk and impact of potential breaches.
              </p>
            </section>

            {/* Updates */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>14. Policy Updates</h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. Material changes will be communicated through:
              </p>
              <ul className={`${themeClasses.textSecondary} mb-4 space-y-2 ml-6`}>
                <li>• Prominent notice on our platform</li>
                <li>• Email notification if you've provided contact information</li>
                <li>• 30-day advance notice for significant changes</li>
                <li>• Updated "Last updated" date at the top of this policy</li>
              </ul>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                We encourage you to review this policy periodically to stay informed about how we protect your privacy.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>15. Contact Us</h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                For questions, concerns, or requests regarding this Privacy Policy or our data practices:
              </p>
              <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-xl p-4`}>
                <p className={`${themeClasses.text} font-medium`}>Securep2p.pro Privacy Team</p>
                <p className={`${themeClasses.textSecondary} text-sm`}>Email: privacy@Securep2p.pro</p>
                <p className={`${themeClasses.textSecondary} text-sm`}>General Support: support@Securep2p.pro</p>
                <p className={`${themeClasses.textSecondary} text-sm`}>Website: https://Securep2p.pro</p>
                <p className={`${themeClasses.textSecondary} text-sm`}>Privacy Requests: Responded to within 48 hours</p>
                <p className={`${themeClasses.textSecondary} text-sm`}>Data Deletion: Processed within 24 hours</p>
              </div>
              
              <div className={`mt-4 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} border ${darkMode ? 'border-blue-800' : 'border-blue-200'} rounded-xl p-4`}>
                <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                  <strong>Data Protection Officer:</strong> For complex privacy matters or regulatory inquiries, contact our Data Protection Officer at dpo@Securep2p.pro
                </p>
              </div>
              
              <div className={`mt-4 ${darkMode ? 'bg-green-900/20' : 'bg-green-50'} border ${darkMode ? 'border-green-800' : 'border-green-200'} rounded-xl p-4`}>
                <p className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-800'}`}>
                  <strong>Effective Date:</strong> This Privacy Policy is effective as of January 1, 2025, and supersedes all previous versions.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;