import React from 'react';
import { X, Bug, Shield, DollarSign, Mail, FileText, Clock, Award, AlertTriangle, CheckCircle, Target, Zap } from 'lucide-react';
import { ThemeClasses } from '../types';

interface BugBountyPageProps {
  darkMode: boolean;
  themeClasses: ThemeClasses;
  onClose: () => void;
}

const BugBountyPage: React.FC<BugBountyPageProps> = ({ darkMode, themeClasses, onClose }) => {
  const bountyTiers = [
    {
      severity: 'Critical',
      reward: '$25,000 - $50,000',
      color: 'from-red-500 to-red-600',
      bgColor: darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200',
      textColor: darkMode ? 'text-red-300' : 'text-red-800',
      examples: [
        'Remote Code Execution (RCE)',
        'SQL Injection leading to data breach',
        'Authentication bypass',
        'Smart contract vulnerabilities affecting funds',
        'Complete system compromise'
      ]
    },
    {
      severity: 'High',
      reward: '$5,000 - $25,000',
      color: 'from-orange-500 to-orange-600',
      bgColor: darkMode ? 'bg-orange-900/20 border-orange-800' : 'bg-orange-50 border-orange-200',
      textColor: darkMode ? 'text-orange-300' : 'text-orange-800',
      examples: [
        'Privilege escalation',
        'Sensitive data exposure',
        'Cross-Site Scripting (XSS) with impact',
        'Business logic flaws',
        'Payment processing vulnerabilities'
      ]
    },
    {
      severity: 'Medium',
      reward: '$1,000 - $5,000',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: darkMode ? 'bg-yellow-900/20 border-yellow-800' : 'bg-yellow-50 border-yellow-200',
      textColor: darkMode ? 'text-yellow-300' : 'text-yellow-800',
      examples: [
        'Cross-Site Request Forgery (CSRF)',
        'Information disclosure',
        'Rate limiting bypass',
        'Session management issues',
        'Input validation flaws'
      ]
    },
    {
      severity: 'Low',
      reward: '$100 - $1,000',
      color: 'from-blue-500 to-blue-600',
      bgColor: darkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200',
      textColor: darkMode ? 'text-blue-300' : 'text-blue-800',
      examples: [
        'Minor information leakage',
        'UI/UX security issues',
        'Non-exploitable XSS',
        'Missing security headers',
        'Weak password policies'
      ]
    }
  ];

  const reportTemplate = `Subject: [SECURITY] [SEVERITY] Brief Description

1. VULNERABILITY SUMMARY
   - Type: [e.g., SQL Injection, XSS, RCE]
   - Severity: [Critical/High/Medium/Low]
   - Affected Component: [e.g., Login system, Payment processor]
   - Impact: [Brief description of potential impact]

2. TECHNICAL DETAILS
   - Vulnerability Description: [Detailed technical explanation]
   - Attack Vector: [How the vulnerability can be exploited]
   - Affected URLs/Endpoints: [Specific locations]
   - Parameters/Fields: [Vulnerable parameters]

3. PROOF OF CONCEPT
   - Step-by-step reproduction steps
   - Screenshots/Videos (if applicable)
   - Payload/Code samples
   - Browser/Environment details

4. IMPACT ASSESSMENT
   - Confidentiality: [High/Medium/Low/None]
   - Integrity: [High/Medium/Low/None]
   - Availability: [High/Medium/Low/None]
   - Business Impact: [Description]

5. REMEDIATION SUGGESTIONS
   - Recommended fixes
   - Best practices
   - Additional security measures

6. RESEARCHER INFORMATION
   - Name: [Your name/handle]
   - Contact: [Email/Twitter/LinkedIn]
   - Previous submissions: [If any]

Please attach any supporting files, screenshots, or proof-of-concept code.`;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className={`${themeClasses.cardBg} rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border-2 ${darkMode ? 'border-orange-800' : 'border-orange-200'}`}>
        {/* Header */}
        <div className={`bg-gradient-to-r ${darkMode ? 'from-orange-900/30 to-red-900/30' : 'from-orange-50 to-red-50'} p-6 border-b ${themeClasses.border} relative`}>
          <button
            onClick={onClose}
            className={`absolute top-4 right-4 p-2 rounded-full ${themeClasses.hover} transition-colors`}
          >
            <X className={`w-5 h-5 ${themeClasses.textSecondary}`} />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg`}>
              <Bug className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${themeClasses.text}`}>Bug Bounty Program</h2>
              <p className={`text-sm ${themeClasses.textSecondary}`}>Help us secure Securep2p.pro and earn rewards</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-8">
            {/* Program Overview */}
            <section>
              <div className={`${darkMode ? 'bg-green-900/20' : 'bg-green-50'} border ${darkMode ? 'border-green-800' : 'border-green-200'} rounded-xl p-6 mb-6`}>
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className={`text-lg font-bold ${darkMode ? 'text-green-300' : 'text-green-800'} mb-2`}>
                      🎯 Our Mission: Bulletproof Security
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-700'} leading-relaxed`}>
                      Securep2p.pro is committed to maintaining the highest security standards for our users' cryptocurrency transactions. 
                      Our bug bounty program rewards security researchers who help us identify and fix vulnerabilities before they can be exploited.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className={`${themeClasses.cardBg} rounded-xl p-4 border ${themeClasses.border} text-center`}>
                  <div className={`w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div className={`text-2xl font-bold ${themeClasses.text} mb-1`}>$847K+</div>
                  <div className={`text-sm ${themeClasses.textSecondary}`}>Total Rewards Paid</div>
                </div>
                
                <div className={`${themeClasses.cardBg} rounded-xl p-4 border ${themeClasses.border} text-center`}>
                  <div className={`w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div className={`text-2xl font-bold ${themeClasses.text} mb-1`}>1,247</div>
                  <div className={`text-sm ${themeClasses.textSecondary}`}>Vulnerabilities Fixed</div>
                </div>
                
                <div className={`${themeClasses.cardBg} rounded-xl p-4 border ${themeClasses.border} text-center`}>
                  <div className={`w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className={`text-2xl font-bold ${themeClasses.text} mb-1`}>2.4 hrs</div>
                  <div className={`text-sm ${themeClasses.textSecondary}`}>Avg Response Time</div>
                </div>
              </div>
            </section>

            {/* Reward Tiers */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-6 flex items-center`}>
                <Award className="w-5 h-5 mr-2 text-orange-600" />
                Reward Structure
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {bountyTiers.map((tier, index) => (
                  <div key={index} className={`${tier.bgColor} rounded-xl p-6 border`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 bg-gradient-to-r ${tier.color} rounded-xl flex items-center justify-center shadow-lg`}>
                          <AlertTriangle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className={`font-bold text-lg ${tier.textColor}`}>{tier.severity}</h4>
                          <p className={`text-sm ${tier.textColor} opacity-80`}>Severity Level</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xl font-bold ${tier.textColor}`}>{tier.reward}</div>
                        <div className={`text-xs ${tier.textColor} opacity-80`}>Reward Range</div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className={`font-semibold ${tier.textColor} mb-2`}>Examples:</h5>
                      <ul className={`text-sm ${tier.textColor} opacity-90 space-y-1`}>
                        {tier.examples.map((example, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Scope */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                <Target className="w-5 h-5 mr-2 text-blue-600" />
                Program Scope
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`${darkMode ? 'bg-green-900/20' : 'bg-green-50'} rounded-xl p-4 border ${darkMode ? 'border-green-800' : 'border-green-200'}`}>
                  <h4 className={`font-semibold ${darkMode ? 'text-green-300' : 'text-green-800'} mb-3 flex items-center`}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    In Scope
                  </h4>
                  <ul className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-700'} space-y-2`}>
                    <li>• Main platform: securep2p.pro</li>
                    <li>• Web application vulnerabilities</li>
                    <li>• Smart contract security issues</li>
                    <li>• API endpoints and integrations</li>
                    <li>• Payment processing systems</li>
                    <li>• Authentication and authorization</li>
                    <li>• Data handling and privacy</li>
                    <li>• Infrastructure security</li>
                  </ul>
                </div>
                
                <div className={`${darkMode ? 'bg-red-900/20' : 'bg-red-50'} rounded-xl p-4 border ${darkMode ? 'border-red-800' : 'border-red-200'}`}>
                  <h4 className={`font-semibold ${darkMode ? 'text-red-300' : 'text-red-800'} mb-3 flex items-center`}>
                    <X className="w-4 h-4 mr-2" />
                    Out of Scope
                  </h4>
                  <ul className={`text-sm ${darkMode ? 'text-red-400' : 'text-red-700'} space-y-2`}>
                    <li>• Social engineering attacks</li>
                    <li>• Physical security issues</li>
                    <li>• DDoS attacks</li>
                    <li>• Spam or content injection</li>
                    <li>• Issues requiring user interaction</li>
                    <li>• Third-party services we don't control</li>
                    <li>• Self-XSS vulnerabilities</li>
                    <li>• Rate limiting on non-critical endpoints</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Submission Guidelines */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                <FileText className="w-5 h-5 mr-2 text-purple-600" />
                Submission Guidelines
              </h3>
              
              <div className={`${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} rounded-xl p-6 border ${darkMode ? 'border-blue-800' : 'border-blue-200'} mb-4`}>
                <h4 className={`font-semibold ${darkMode ? 'text-blue-300' : 'text-blue-800'} mb-3`}>📧 How to Submit</h4>
                <p className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-700'} mb-3`}>
                  Send your detailed vulnerability report to: <strong>bounty@securep2p.pro</strong>
                </p>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <a 
                    href="mailto:bounty@securep2p.pro?subject=Security Vulnerability Report"
                    className="text-blue-600 hover:text-blue-800 font-medium underline"
                  >
                    bounty@securep2p.pro
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className={`${themeClasses.cardBg} rounded-xl p-4 border ${themeClasses.border}`}>
                  <h4 className={`font-semibold ${themeClasses.text} mb-3`}>✅ Requirements</h4>
                  <ul className={`text-sm ${themeClasses.textSecondary} space-y-2`}>
                    <li>• Clear proof of concept</li>
                    <li>• Step-by-step reproduction</li>
                    <li>• Impact assessment</li>
                    <li>• Screenshots/videos if applicable</li>
                    <li>• Suggested remediation</li>
                    <li>• No public disclosure before fix</li>
                  </ul>
                </div>
                
                <div className={`${themeClasses.cardBg} rounded-xl p-4 border ${themeClasses.border}`}>
                  <h4 className={`font-semibold ${themeClasses.text} mb-3`}>⚡ Response Times</h4>
                  <ul className={`text-sm ${themeClasses.textSecondary} space-y-2`}>
                    <li>• Initial response: <strong>24 hours</strong></li>
                    <li>• Triage completion: <strong>72 hours</strong></li>
                    <li>• Critical fixes: <strong>7 days</strong></li>
                    <li>• Reward payment: <strong>14 days</strong></li>
                    <li>• Status updates: <strong>Weekly</strong></li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Report Template */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                <FileText className="w-5 h-5 mr-2 text-green-600" />
                Report Template
              </h3>
              
              <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-xl p-4 border ${themeClasses.border}`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className={`font-semibold ${themeClasses.text}`}>Email Template</h4>
                  <button
                    onClick={() => navigator.clipboard.writeText(reportTemplate)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Copy Template
                  </button>
                </div>
                <pre className={`text-xs ${themeClasses.textSecondary} whitespace-pre-wrap overflow-x-auto max-h-64 overflow-y-auto`}>
                  {reportTemplate}
                </pre>
              </div>
            </section>

            {/* Hall of Fame */}
            <section>
              <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                <Award className="w-5 h-5 mr-2 text-yellow-600" />
                Hall of Fame
              </h3>
              
              <div className={`${darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'} rounded-xl p-6 border ${darkMode ? 'border-yellow-800' : 'border-yellow-200'}`}>
                <p className={`text-sm ${darkMode ? 'text-yellow-400' : 'text-yellow-700'} mb-4`}>
                  We recognize and thank the security researchers who have helped make Securep2p.pro more secure:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`${themeClasses.cardBg} rounded-lg p-3 border ${themeClasses.border}`}>
                    <div className={`font-semibold ${themeClasses.text}`}>@SecurityExpert</div>
                    <div className={`text-sm ${themeClasses.textSecondary}`}>Critical RCE - $45,000</div>
                  </div>
                  <div className={`${themeClasses.cardBg} rounded-lg p-3 border ${themeClasses.border}`}>
                    <div className={`font-semibold ${themeClasses.text}`}>@CryptoHunter</div>
                    <div className={`text-sm ${themeClasses.textSecondary}`}>Smart Contract Bug - $25,000</div>
                  </div>
                  <div className={`${themeClasses.cardBg} rounded-lg p-3 border ${themeClasses.border}`}>
                    <div className={`font-semibold ${themeClasses.text}`}>@WebSecPro</div>
                    <div className={`text-sm ${themeClasses.textSecondary}`}>Auth Bypass - $15,000</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section>
              <div className={`bg-gradient-to-r ${darkMode ? 'from-orange-900/20 to-red-900/20' : 'from-orange-50 to-red-50'} rounded-xl p-6 border ${darkMode ? 'border-orange-800' : 'border-orange-200'} text-center`}>
                <h4 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>Ready to Start Hunting?</h4>
                <p className={`text-sm ${themeClasses.textSecondary} mb-4`}>
                  Join our bug bounty program and help us build the most secure crypto exchange platform
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a 
                    href="mailto:bounty@securep2p.pro?subject=Security Vulnerability Report"
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Submit Vulnerability
                  </a>
                  <a 
                    href="mailto:bounty@securep2p.pro?subject=Bug Bounty Program Inquiry"
                    className={`border-2 ${themeClasses.border} ${themeClasses.text} px-6 py-3 rounded-xl font-semibold ${themeClasses.hover} transition-all duration-300 flex items-center justify-center`}
                  >
                    <Bug className="w-4 h-4 mr-2" />
                    Ask Questions
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BugBountyPage;