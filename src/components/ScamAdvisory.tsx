import React from 'react';
import { X, Shield, AlertTriangle, Eye, Lock, Zap, Bot, Wifi, ExternalLink, CheckCircle } from 'lucide-react';
import { ThemeClasses } from '../types';

interface ScamAdvisoryProps {
  darkMode: boolean;
  themeClasses: ThemeClasses;
  onClose: () => void;
}

const ScamAdvisory: React.FC<ScamAdvisoryProps> = ({ darkMode, themeClasses, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className={`${themeClasses.cardBg} rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden border-2 ${darkMode ? 'border-red-800' : 'border-red-200'}`}>
        {/* Header */}
        <div className={`bg-gradient-to-r ${darkMode ? 'from-red-900/30 to-orange-900/30' : 'from-red-50 to-orange-50'} p-6 border-b ${themeClasses.border} relative`}>
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 p-2 rounded-full ${themeClasses.hover} transition-colors`}
          >
            <X className={`w-5 h-5 ${themeClasses.textSecondary}`} />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg`}>
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${themeClasses.text}`}>Scam Advisory & Security Guide</h2>
              <p className={`text-sm ${themeClasses.textSecondary}`}>Protect yourself from crypto scams and malicious actors</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-8">
            {/* Critical Warning */}
            <section>
              <div className={`${darkMode ? 'bg-red-900/20' : 'bg-red-50'} border ${darkMode ? 'border-red-800' : 'border-red-200'} rounded-xl p-4 mb-6`}>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" />
                  <div className={`${darkMode ? 'text-red-300' : 'text-red-800'}`}>
                    <h3 className="font-bold text-lg mb-2">⚠️ CRITICAL SECURITY WARNING</h3>
                    <p className="text-sm leading-relaxed">
                      <strong>Securep2p.pro will NEVER ask you to:</strong> Send crypto to external wallets, provide seed phrases, 
                      download suspicious software, or connect to fake websites. Always verify you're on the official domain before connecting your wallet.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Drainer Scams */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                <Zap className="w-5 h-5 mr-2 text-red-600" />
                1. Crypto Drainer Scams
              </h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                Drainer scams are malicious smart contracts designed to steal all cryptocurrency from your wallet when you interact with them. 
                These are among the most dangerous threats in the crypto space.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className={`${darkMode ? 'bg-red-900/20' : 'bg-red-50'} rounded-xl p-4 border ${darkMode ? 'border-red-800' : 'border-red-200'}`}>
                  <h4 className={`font-semibold ${darkMode ? 'text-red-300' : 'text-red-800'} mb-3`}>How Drainers Work:</h4>
                  <ul className={`${darkMode ? 'text-red-400' : 'text-red-700'} space-y-2 text-sm`}>
                    <li>• Fake websites that look identical to legitimate platforms</li>
                    <li>• Phishing emails and messages with fake links</li>
                    <li>• Fake airdrops and "free" token claims</li>
                    <li>• Compromised browser extensions and wallets</li>
                  </ul>
                </div>
                
                <div className={`${darkMode ? 'bg-green-900/20' : 'bg-green-50'} rounded-xl p-4 border ${darkMode ? 'border-green-800' : 'border-green-200'}`}>
                  <h4 className={`font-semibold ${darkMode ? 'text-green-300' : 'text-green-800'} mb-3`}>Protection Strategies:</h4>
                  <ul className={`${darkMode ? 'text-green-400' : 'text-green-700'} space-y-2 text-sm`}>
                    <li>• Always verify website URLs before connecting</li>
                    <li>• Keep separate wallets for different activities</li>
                    <li>• Use wallet security features and alerts</li>
                  </ul>
                </div>
              </div>

              <div className={`${darkMode ? 'bg-orange-900/20' : 'bg-orange-50'} rounded-xl p-4 border ${darkMode ? 'border-orange-800' : 'border-orange-200'} mb-4`}>
                <h4 className={`font-semibold ${darkMode ? 'text-orange-300' : 'text-orange-800'} mb-2`}>Common Drainer Tactics:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className={`${darkMode ? 'text-orange-400' : 'text-orange-700'} font-medium mb-1`}>Fake Airdrops:</p>
                    <p className={`${darkMode ? 'text-orange-400' : 'text-orange-700'}`}>
                      "Claim your free tokens" messages that lead to malicious contracts
                    </p>
                  </div>
                  <div>
                    <p className={`${darkMode ? 'text-orange-400' : 'text-orange-700'} font-medium mb-1`}>Urgent Messages:</p>
                    <p className={`${darkMode ? 'text-orange-400' : 'text-orange-700'}`}>
                      "Your wallet will be frozen" or "Verify your account now"
                    </p>
                  </div>
                 
                  <div>
                    <p className={`${darkMode ? 'text-orange-400' : 'text-orange-700'} font-medium mb-1`}>Mirror Sites:</p>
                    <p className={`${darkMode ? 'text-orange-400' : 'text-orange-700'}`}>
                      Exact copies of legitimate sites with malicious contracts
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Bot Scams */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                <Bot className="w-5 h-5 mr-2 text-blue-600" />
                2. Bot Scams & Automated Threats
              </h3>
              <p className={`${themeClasses.textSecondary} mb-4 leading-relaxed`}>
                Malicious bots are automated programs designed to steal cryptocurrency through various sophisticated methods. 
                They operate 24/7 and can execute attacks within seconds.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className={`${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} rounded-xl p-4 border ${darkMode ? 'border-blue-800' : 'border-blue-200'}`}>
                  <h4 className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-800'} mb-3`}>Types of Malicious Bots:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className={`font-medium ${darkMode ? 'text-blue-400' : 'text-blue-700'} mb-2`}>MEV Bots (Malicious):</h5>
                      <ul className={`${darkMode ? 'text-blue-400' : 'text-blue-700'} space-y-1 text-sm ml-4`}>
                        <li>• Front-run your transactions</li>
                        <li>• Sandwich attacks on trades</li>
                        <li>• Exploit slippage settings</li>
                        <li>• Manipulate gas prices</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className={`font-medium ${darkMode ? 'text-blue-400' : 'text-blue-700'} mb-2`}>Sniper Bots:</h5>
                      <ul className={`${darkMode ? 'text-blue-400' : 'text-blue-700'} space-y-1 text-sm ml-4`}>
                        <li>• Target new token launches</li>
                        <li>• Exploit liquidity pools</li>
                        <li>• Perform rug pulls</li>
                        <li>• Manipulate token prices</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className={`font-medium ${darkMode ? 'text-blue-400' : 'text-blue-700'} mb-2`}>Phishing Bots:</h5>
                      <ul className={`${darkMode ? 'text-blue-400' : 'text-blue-700'} space-y-1 text-sm ml-4`}>
                        <li>• Send fake DMs on social media</li>
                        <li>• Create fake support accounts</li>
                        <li>• Distribute malicious links</li>
                        <li>• Impersonate legitimate projects</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className={`font-medium ${darkMode ? 'text-blue-400' : 'text-blue-700'} mb-2`}>Approval Bots:</h5>
                      <ul className={`${darkMode ? 'text-blue-400' : 'text-blue-700'} space-y-1 text-sm ml-4`}>
                        <li>• Monitor for token approvals</li>
                        <li>• Exploit unlimited allowances</li>
                        <li>• Target high-value wallets</li>
                        <li>• Execute instant transfers</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          

            {/* Red Flags */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                3. Major Red Flags to Watch For
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className={`${darkMode ? 'bg-red-900/20' : 'bg-red-50'} rounded-xl p-4 border ${darkMode ? 'border-red-800' : 'border-red-200'}`}>
                  <h4 className={`font-semibold ${darkMode ? 'text-red-300' : 'text-red-800'} mb-3`}>🚨 Immediate Danger Signs:</h4>
                  <ul className={`${darkMode ? 'text-red-400' : 'text-red-700'} space-y-2 text-sm`}>
                    <li>• Requests for seed phrases or private keys</li>
                    <li>• Unsolicited DMs offering "help" or "opportunities"</li>
                    <li>• Pressure to act immediately without time to think</li>
                    <li>• Requests to download unknown software or apps</li>
                    <li>• Claims that your wallet is "compromised" or "frozen"</li>
                    <li>• Requests to send crypto to "verify" your wallet</li>
                    <li>• Fake security alerts or urgent notifications</li>
                  </ul>
                </div>
                
                <div className={`${darkMode ? 'bg-orange-900/20' : 'bg-orange-50'} rounded-xl p-4 border ${darkMode ? 'border-orange-800' : 'border-orange-200'}`}>
                  <h4 className={`font-semibold ${darkMode ? 'text-orange-300' : 'text-orange-800'} mb-3`}>⚠️ Warning Signs:</h4>
                  <ul className={`${darkMode ? 'text-orange-400' : 'text-orange-700'} space-y-2 text-sm`}>
                    <li>• Websites with slightly different URLs (typosquatting)</li>
                    <li>• Poor grammar or spelling in official communications</li>
                    <li>• Requests for personal information beyond what's necessary</li>
                    <li>• No clear contact information or support channels</li>
                    <li>• Promises of guaranteed returns or "risk-free" investments</li>
                    <li>• Pressure to recruit others or "refer friends"</li>
              
             
                  </ul>
                </div>
              </div>
            </section>

            {/* Best Practices */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                <Shield className="w-5 h-5 mr-2 text-green-600" />
                4. Security Best Practices
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className={`${darkMode ? 'bg-green-900/20' : 'bg-green-50'} rounded-xl p-4 border ${darkMode ? 'border-green-800' : 'border-green-200'}`}>
                  <h4 className={`font-semibold ${darkMode ? 'text-green-300' : 'text-green-800'} mb-3 flex items-center`}>
                    <Lock className="w-4 h-4 mr-2" />
                    Wallet Security
                  </h4>
                  <ul className={`${darkMode ? 'text-green-400' : 'text-green-700'} space-y-1 text-sm`}>
        
                    <li>• Enable all available security features</li>
                    <li>• Keep software updated</li>
                    <li>• Use strong, unique passwords</li>
                    <li>• Enable 2FA where possible</li>
                    <li>• Regular security audits</li>
                  </ul>
                </div>
                
                <div className={`${darkMode ? 'bg-green-900/20' : 'bg-green-50'} rounded-xl p-4 border ${darkMode ? 'border-green-800' : 'border-green-200'}`}>
                  <h4 className={`font-semibold ${darkMode ? 'text-green-300' : 'text-green-800'} mb-3 flex items-center`}>
                    <Wifi className="w-4 h-4 mr-2" />
                    Safe Browsing
                  </h4>
                  <ul className={`${darkMode ? 'text-green-400' : 'text-green-700'} space-y-1 text-sm`}>
                    <li>• Always check URLs carefully</li>
                    <li>• Bookmark legitimate sites</li>
                    <li>• Use official app stores only</li>
                    <li>• Verify SSL certificates</li>
                    <li>• Avoid public WiFi for crypto</li>
                    <li>• Use VPN when necessary</li>
                  </ul>
                </div>
                
                <div className={`${darkMode ? 'bg-green-900/20' : 'bg-green-50'} rounded-xl p-4 border ${darkMode ? 'border-green-800' : 'border-green-200'}`}>
                  <h4 className={`font-semibold ${darkMode ? 'text-green-300' : 'text-green-800'} mb-3 flex items-center`}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Transaction Safety
                  </h4>
                  <ul className={`${darkMode ? 'text-green-400' : 'text-green-700'} space-y-1 text-sm`}>
                    <li>• Double-check all addresses</li>
                 
                    <li>• Review transaction details</li>
                    <li>• Understand gas fees</li>
                    <li>• Use reputable exchanges</li>
                    <li>• Keep transaction records</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* What to Do If Scammed */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                5. If You've Been Scammed
              </h3>
              
              <div className={`${darkMode ? 'bg-orange-900/20' : 'bg-orange-50'} rounded-xl p-4 border ${darkMode ? 'border-orange-800' : 'border-orange-200'} mb-4`}>
                <h4 className={`font-semibold ${darkMode ? 'text-orange-300' : 'text-orange-800'} mb-3`}>Immediate Actions:</h4>
                <ol className={`${darkMode ? 'text-orange-400' : 'text-orange-700'} space-y-2 text-sm ml-4`}>
                
                  <li>1. <strong>Document everything:</strong> Screenshot transactions, messages, and websites</li>
                  <li>2. <strong>Report the scam:</strong> Contact relevant authorities and platforms</li>
                  <li>3. <strong>Warn others:</strong> Share your experience to prevent others from falling victim</li>
                  <li>4. <strong>Monitor accounts:</strong> Watch for any additional unauthorized activity</li>
                </ol>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-xl p-4`}>
                  <h4 className={`font-semibold ${themeClasses.text} mb-3`}>Reporting Resources:</h4>
                  <ul className={`${themeClasses.textSecondary} space-y-2 text-sm`}>
                    <li>• FBI's IC3 (Internet Crime Complaint Center)</li>
                    <li>• FTC Consumer Sentinel Network</li>
          
                    <li>• Exchange support teams</li>
                    <li>• Blockchain explorers for transaction tracking</li>
                  </ul>
                </div>
                
                <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-xl p-4`}>
                  <h4 className={`font-semibold ${themeClasses.text} mb-3`}>Recovery Tools:</h4>
                  <ul className={`${themeClasses.textSecondary} space-y-2 text-sm`}>
                    <li>• Token approval checkers </li>
                    <li>• Wallet security scanners</li>
                    <li>• Blockchain analysis tools</li>
                    <li>• Professional recovery services</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Securep2p.pro Safety */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                <Shield className="w-5 h-5 mr-2 text-blue-600" />
                6. How Securep2p.pro Protects You
              </h3>
              
              <div className={`bg-gradient-to-r ${darkMode ? 'from-blue-900/20 to-green-900/20' : 'from-blue-50 to-green-50'} rounded-xl p-6 border ${darkMode ? 'border-blue-800' : 'border-blue-200'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-800'} mb-3`}>Our Security Measures:</h4>
                    <ul className={`${darkMode ? 'text-blue-400' : 'text-blue-700'} space-y-2 text-sm`}>
                      <li>• Non-custodial platform - we never hold your funds</li>
                      <li>• Direct wallet-to-wallet transactions only</li>
                      <li>• No seed phrase or private key requests</li>
                      <li>• Transparent smart contracts</li>
                      <li>• Real-time transaction monitoring</li>
                      <li>• SSL encryption and security certificates</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className={`font-semibold ${darkMode ? 'text-green-300' : 'text-green-800'} mb-3`}>What We'll Never Ask:</h4>
                    <ul className={`${darkMode ? 'text-green-400' : 'text-green-700'} space-y-2 text-sm`}>
                      <li>• Your seed phrase or recovery words</li>
                      <li>• Private keys or wallet passwords</li>
                      <li>• To send crypto to external addresses</li>
                      <li>• To download suspicious software</li>
                      <li>• For personal documents or ID verification</li>
                      <li>• To connect to fake or mirror sites</li>
                    </ul>
                  </div>
                </div>
                
                <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-blue-700' : 'border-blue-200'}`}>
                  <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'} font-medium`}>
                    <strong>Remember:</strong> Always verify you're on the official Securep2p.pro domain before connecting your wallet. 
                    If something feels suspicious, disconnect immediately and contact our support team.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact & Resources */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4`}>7. Additional Resources & Support</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-xl p-4`}>
                  <h4 className={`font-semibold ${themeClasses.text} mb-3`}>Educational Resources:</h4>
                  <ul className={`${themeClasses.textSecondary} space-y-2 text-sm`}>
                    <li>• <a href="https://www.cisa.gov/cybersecurity" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                      CISA Cybersecurity Resources <ExternalLink className="w-3 h-3 ml-1" />
                    </a></li>
                    <li>• <a href="https://www.consumer.ftc.gov/articles/how-avoid-cryptocurrency-scams" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                      FTC Cryptocurrency Scam Guide <ExternalLink className="w-3 h-3 ml-1" />
                    </a></li>
                   
              
                  </ul>
                </div>
                
                <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-xl p-4`}>
                  <h4 className={`font-semibold ${themeClasses.text} mb-3`}>Get Help:</h4>
                  <ul className={`${themeClasses.textSecondary} space-y-2 text-sm`}>
                    <li> <strong>Securep2p.pro Support:</strong> support@securep2p.pro</li>
                    <li> <strong>Security Issues:</strong> security@securep2p.pro</li>
                    <li> <strong>Emergency Response:</strong> Available 24/7</li>
                    <li> <strong>Bug Bounty:</strong> Report vulnerabilities at bounty@securep2p.pro </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScamAdvisory;