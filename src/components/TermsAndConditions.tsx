import React from 'react';
import { X, Shield, AlertTriangle, FileText, Scale, Globe, Lock, Users, CreditCard, Zap, Eye } from 'lucide-react';
import { ThemeClasses } from '../types';

interface TermsAndConditionsProps {
  darkMode: boolean;
  themeClasses: ThemeClasses;
  onClose: () => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ darkMode, themeClasses, onClose }) => {
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
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${themeClasses.text}`}>Terms & Conditions</h2>
              <p className={`text-sm ${themeClasses.textSecondary}`}>Securep2p.pro - Last updated: January 2025</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-8">
            {/* Introduction */}
            <section>
              <div className={`${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} border ${darkMode ? 'border-blue-800' : 'border-blue-200'} rounded-xl p-4 mb-4`}>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                    <strong>Important:</strong> By using Securep2p.pro, you agree to these terms. Please read carefully before proceeding with any transactions.
                  </div>
                </div>
              </div>
              
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                1. Agreement to Terms
              </h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                By accessing and using Securep2p.pro ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service. These terms constitute a legally binding agreement between you and Securep2p.pro.
              </p>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                Securep2p.pro reserves the right to modify these terms at any time without prior notice. Your continued use of the platform after any such changes constitutes your acceptance of the new terms. It is your responsibility to review these terms periodically.
              </p>
            </section>

            {/* Service Description */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                <Zap className="w-5 h-5 mr-2 text-blue-600" />
                2. Service Description
              </h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                Securep2p.pro is a decentralized cryptocurrency exchange platform that allows users to convert digital assets to fiat currency without traditional KYC requirements. 
                Our services include:
              </p>
              <ul className={`${themeClasses.textSecondary} mb-4 space-y-2 ml-6`}>
                <li>• Cryptocurrency to fiat currency conversion</li>
                <li>• Multi-currency support (USD, EUR, INR, GBP, etc.)</li>
                <li>• Various payout methods (Bank Transfer, UPI, PayPal, etc.)</li>
                <li>• Real-time exchange rates with transparent fees</li>
                <li>• Secure wallet integration via Web3</li>
                <li>• No account registration or KYC verification required</li>
                <li>• Direct wallet-to-wallet transactions</li>
                <li>• Instant settlement to your chosen payment method</li>
                <li>• 24/7 automated processing</li>
              </ul>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                <strong>Important:</strong> Securep2p.pro operates as a non-custodial platform. We do not hold, store, or have access to your cryptocurrency assets. All transactions are processed directly from your connected wallet.
              </p>
            </section>

            {/* User Responsibilities */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                3. User Responsibilities
              </h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                By using Securep2p.pro, users acknowledge and agree to the following responsibilities:
              </p>
              <ul className={`${themeClasses.textSecondary} mb-4 space-y-2 ml-6`}>
                <li>• Providing accurate payment details for successful fund transfers</li>
                <li>• Maintaining the security of their wallet and private keys</li>
                <li>• Complying with local laws and regulations</li>
                <li>• Verifying transaction details before confirmation</li>
                <li>• Understanding the risks associated with cryptocurrency trading</li>
                <li>• Ensuring they have legal ownership of all cryptocurrencies being exchanged</li>
                <li>• Confirming that their payment method accepts the intended transfer amount</li>
                <li>• Being responsible for any taxes or fees imposed by their jurisdiction</li>
                <li>• Not using the platform for any illegal activities or money laundering</li>
                <li>• Accepting that all transactions are final and irreversible</li>
              </ul>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                Users must be at least 18 years old or the legal age of majority in their jurisdiction to use this platform. By using Securep2p.pro, you represent and warrant that you meet this age requirement.
              </p>
            </section>

            {/* No KYC Policy */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                <Shield className="w-5 h-5 mr-2 text-blue-600" />
                4. No KYC Policy
              </h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                Securep2p.pro operates as a decentralized, non-custodial platform that does not require traditional Know Your Customer (KYC) verification. We believe in financial privacy and user autonomy.
              </p>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                <strong>What we collect:</strong> Only the payment information necessary to process your fiat currency transfer (bank details, UPI ID, PayPal email, etc.).
              </p>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                <strong>What we don't collect:</strong> Government-issued IDs, proof of address, income verification, or personal identification documents.
              </p>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                However, users are responsible for complying with their local laws and regulations. Some jurisdictions may require individuals to report cryptocurrency transactions for tax purposes.
              </p>
            </section>

            {/* Fees and Charges */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                5. Fees and Charges
              </h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                Securep2p.pro operates with transparent pricing. All fees are clearly displayed before transaction confirmation and include:
              </p>
              <ul className={`${themeClasses.textSecondary} mb-4 space-y-2 ml-6`}>
                <li>• Exchange rate markup (typically 15-25%)</li>
                <li>• Payment method processing fees</li>
                <li>• Network transaction fees (gas fees)</li>
                <li>• Currency conversion fees where applicable</li>
              </ul>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                <strong>No Hidden Fees:</strong> We do not charge any additional fees beyond what is displayed during the transaction process. The final amount you receive will match the quote provided before confirmation.
              </p>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                <strong>Fee Structure:</strong> Our fees are competitive and designed to cover operational costs, payment processing, and platform maintenance. Fees may vary based on market conditions, payment method, and transaction volume.
              </p>
            </section>

            {/* Risk Disclosure */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                6. Risk Disclosure
              </h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                <strong>IMPORTANT RISK WARNING:</strong> Cryptocurrency trading and exchange involves substantial risk of loss. By using Securep2p.pro, users acknowledge and accept the following risks:
              </p>
              <ul className={`${themeClasses.textSecondary} mb-4 space-y-2 ml-6`}>
                <li>• Cryptocurrency values are highly volatile</li>
                <li>• Past performance does not guarantee future results</li>
                <li>• Technical issues may cause delays or failures</li>
                <li>• Regulatory changes may affect service availability</li>
                <li>• Blockchain transactions are irreversible once confirmed</li>
                <li>• Smart contract risks and potential vulnerabilities</li>
                <li>• Market manipulation and liquidity risks</li>
                <li>• Potential loss of funds due to user error</li>
                <li>• Internet connectivity and technical infrastructure risks</li>
                <li>• Third-party payment processor risks and delays</li>
              </ul>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                <strong>No Investment Advice:</strong> Securep2p.pro does not provide investment, financial, or trading advice. All decisions to exchange cryptocurrency are made solely by the user.
              </p>
            </section>

            {/* Platform Availability */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>7. Platform Availability</h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                Securep2p.pro strives to maintain 99.9% uptime, but we cannot guarantee uninterrupted service. The platform may be temporarily unavailable due to:
              </p>
              <ul className={`${themeClasses.textSecondary} mb-4 space-y-2 ml-6`}>
                <li>• Scheduled maintenance and updates</li>
                <li>• Emergency security measures</li>
                <li>• Third-party service provider issues</li>
                <li>• Network congestion or blockchain issues</li>
                <li>• Regulatory compliance requirements</li>
              </ul>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                We will make reasonable efforts to provide advance notice of scheduled maintenance through our platform notifications.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>8. Limitation of Liability</h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                <strong>MAXIMUM LIABILITY LIMITATION:</strong> To the fullest extent permitted by law, Securep2p.pro's total liability for any claims arising from or related to the use of our platform shall not exceed the amount of fees paid by you in the transaction giving rise to the claim.
              </p>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                Securep2p.pro shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation:
              </p>
              <ul className={`${themeClasses.textSecondary} mb-4 space-y-2 ml-6`}>
                <li>• Loss of profits, revenue, or business opportunities</li>
                <li>• Loss of data or information</li>
                <li>• Loss of goodwill or reputation</li>
                <li>• Market losses due to price volatility</li>
                <li>• Losses due to third-party actions or failures</li>
                <li>• Losses due to regulatory changes</li>
              </ul>
            </section>

            {/* Prohibited Uses */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>9. Prohibited Uses</h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                Users are strictly prohibited from using Securep2p.pro for:
              </p>
              <ul className={`${themeClasses.textSecondary} mb-4 space-y-2 ml-6`}>
                <li>• Money laundering or terrorist financing</li>
                <li>• Fraud, theft, or any illegal activities</li>
                <li>• Circumventing economic sanctions or embargoes</li>
                <li>• Trading stolen or illegally obtained cryptocurrencies</li>
                <li>• Market manipulation or insider trading</li>
                <li>• Violating any applicable laws or regulations</li>
                <li>• Attempting to hack, disrupt, or compromise platform security</li>
                <li>• Creating multiple accounts to circumvent platform limits</li>
              </ul>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                Securep2p.pro reserves the right to refuse service, block transactions, or report suspicious activities to relevant authorities.
              </p>
            </section>

            {/* Privacy */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                <Lock className="w-5 h-5 mr-2 text-blue-600" />
                10. Privacy and Data Protection
              </h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                Your privacy is fundamental to our platform design. Securep2p.pro follows privacy-by-design principles:
              </p>
              <ul className={`${themeClasses.textSecondary} mb-4 space-y-2 ml-6`}>
                <li>• We collect only the minimum data necessary for payment processing</li>
                <li>• No personal identification documents are required</li>
                <li>• Payment data is encrypted and securely transmitted</li>
                <li>• We do not sell or share your data with third parties</li>
                <li>• Transaction data is automatically purged after completion</li>
              </ul>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                Please review our Privacy Policy for detailed information about our data practices.
              </p>
            </section>

            {/* Dispute Resolution */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>11. Dispute Resolution</h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                In the event of any dispute arising from the use of Securep2p.pro:
              </p>
              <ul className={`${themeClasses.textSecondary} mb-4 space-y-2 ml-6`}>
                <li>• First, contact our support team at support@Securep2p.pro</li>
                <li>• We will attempt to resolve disputes within 48 hours</li>
                <li>• If unresolved, disputes may be subject to binding arbitration</li>
                <li>• Arbitration will be conducted under international arbitration rules</li>
                <li>• Users waive the right to participate in class action lawsuits</li>
              </ul>
            </section>

            {/* Governing Law */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>12. Governing Law</h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                These Terms & Conditions shall be governed by and construed in accordance with international commercial law principles. 
                Any legal proceedings shall be conducted in English language.
              </p>
            </section>

            {/* Modifications */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>13. Modifications to Terms</h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                Securep2p.pro reserves the right to modify these terms at any time. Material changes will be communicated through:
              </p>
              <ul className={`${themeClasses.textSecondary} mb-4 space-y-2 ml-6`}>
                <li>• Platform notifications during your next visit</li>
                <li>• Updates to the "Last updated" date on this page</li>
                <li>• Email notifications if you have provided contact information</li>
              </ul>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                Continued use of the platform after modifications constitutes acceptance of the updated terms.
              </p>
            </section>

            {/* Severability */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>14. Severability</h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                If any provision of these Terms & Conditions is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the remaining terms remain in full force and effect.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                <Globe className="w-5 h-5 mr-2 text-blue-600" />
                15. Contact Information
              </h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                For questions, concerns, or support regarding these Terms & Conditions, please contact us:
              </p>
              <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-xl p-4`}>
                <p className={`${themeClasses.text} font-medium`}>Securep2p.pro Support</p>
                <p className={`${themeClasses.textSecondary} text-sm`}>General Support: support@Securep2p.pro</p>
                <p className={`${themeClasses.textSecondary} text-sm`}>Legal Inquiries: legal@Securep2p.pro</p>
                <p className={`${themeClasses.textSecondary} text-sm`}>Website: https://Securep2p.pro</p>
                <p className={`${themeClasses.textSecondary} text-sm`}>Response time: Within 24 hours</p>
              </div>
              
              <div className={`mt-4 ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} border ${darkMode ? 'border-blue-800' : 'border-blue-200'} rounded-xl p-4`}>
                <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                  <strong>Effective Date:</strong> These Terms & Conditions are effective as of January 1, 2025, and will remain in effect until modified or terminated.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;