import React from 'react';
import { X, MapPin, Mail, Phone, Clock, Users, Award, Globe, Shield, Zap, Building } from 'lucide-react';
import { ThemeClasses } from '../types';

interface ContactPageProps {
  darkMode: boolean;
  themeClasses: ThemeClasses;
  onClose: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ darkMode, themeClasses, onClose }) => {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Chief Executive Officer",
      experience: "Former Goldman Sachs VP, 12+ years in fintech",
      expertise: "Strategic Leadership, Financial Markets"
    },
    {
      name: "Marcus Rodriguez",
      role: "Chief Technology Officer", 
      experience: "Ex-Coinbase Senior Engineer, Blockchain expert",
      expertise: "Blockchain Architecture, Smart Contracts"
    },
    {
      name: "Priya Sharma",
      role: "Head of Operations",
      experience: "Former Binance Operations Manager, 8+ years",
      expertise: "Global Operations, Compliance"
    },
    {
      name: "David Kim",
      role: "Head of Security",
      experience: "Ex-Kraken Security Lead, Cybersecurity expert",
      expertise: "Platform Security, Risk Management"
    },
    {
      name: "Elena Volkov",
      role: "Head of Customer Success",
      experience: "Former Revolut Customer Experience Lead",
      expertise: "Customer Relations, Support Operations"
    },
    {
      name: "Ahmed Al-Rashid",
      role: "Regional Director - MENA",
      experience: "Local market expert, 10+ years in UAE fintech",
      expertise: "Regional Partnerships, Regulatory Compliance"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className={`${themeClasses.cardBg} rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border-2 ${darkMode ? 'border-blue-800' : 'border-blue-200'}`}>
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
              <Building className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${themeClasses.text}`}>securep2p.pro</h2>
              <p className={`text-sm ${themeClasses.textSecondary}`}>Secure • Fast • Trusted</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <section>
                <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                  <Mail className="w-5 h-5 mr-2 text-blue-600" />
                  Contact Information
                </h3>
                
                {/* Address */}
                <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-xl p-4 mb-4`}>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className={`font-semibold ${themeClasses.text} mb-2`}>Dubai Headquarters</h4>
                      <p className={`text-sm ${themeClasses.textSecondary} leading-relaxed`}>
                        W505, Al Sahaa Offices, Lobby C, Level 5<br/>
                        Downtown Burj Khalifa<br/>
                        Dubai - United Arab Emirates
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Methods */}
                <div className="space-y-3">
                  <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-xl p-4`}>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-green-600" />
                      <div>
                        <h4 className={`font-semibold ${themeClasses.text}`}>Email Support</h4>
                        <p className={`text-sm ${themeClasses.textSecondary}`}>support@securep2p.pro</p>
                        <p className={`text-xs ${themeClasses.textSecondary}`}>Response time: Within 2 hours</p>
                      </div>
                    </div>
                  </div>

                  <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-xl p-4`}>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <div>
                       <h4 className={`font-semibold ${themeClasses.text}`}>Live Chat Support</h4>
<p className={`text-sm ${themeClasses.textSecondary}`}>
  Our support team is available <span className="font-medium">24/7</span>.
</p>
<p className={`text-xs ${themeClasses.textSecondary}`}>
  Please reach us through the Live Chat option on this page.
</p>

                      </div>
                    </div>
                  </div>

                  <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-xl p-4`}>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-purple-600" />
                      <div>
                        <h4 className={`font-semibold ${themeClasses.text}`}>Business Hours</h4>
                        <p className={`text-sm ${themeClasses.textSecondary}`}>24/7 Online Support</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Company Stats */}
              <section>
                <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                  <Award className="w-5 h-5 mr-2 text-blue-600" />
                  Company Overview
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className={`${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} rounded-xl p-4 text-center`}>
                    <div className={`text-2xl font-bold ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>2021</div>
                    <div className={`text-sm ${themeClasses.textSecondary}`}>Founded</div>
                  </div>
                  <div className={`${darkMode ? 'bg-green-900/20' : 'bg-green-50'} rounded-xl p-4 text-center`}>
                    <div className={`text-2xl font-bold ${darkMode ? 'text-green-300' : 'text-green-800'}`}>50+</div>
                    <div className={`text-sm ${themeClasses.textSecondary}`}>Team Members</div>
                  </div>
                  <div className={`${darkMode ? 'bg-purple-900/20' : 'bg-purple-50'} rounded-xl p-4 text-center`}>
                    <div className={`text-2xl font-bold ${darkMode ? 'text-purple-300' : 'text-purple-800'}`}>120K+</div>
                    <div className={`text-sm ${themeClasses.textSecondary}`}>Active Users</div>
                  </div>
                  <div className={`${darkMode ? 'bg-orange-900/20' : 'bg-orange-50'} rounded-xl p-4 text-center`}>
                    <div className={`text-2xl font-bold ${darkMode ? 'text-orange-300' : 'text-orange-800'}`}>$847M+</div>
                    <div className={`text-sm ${themeClasses.textSecondary}`}>Volume Processed</div>
                  </div>
                </div>

                <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-xl p-4`}>
                  <h4 className={`font-semibold ${themeClasses.text} mb-2`}>Mission Statement</h4>
                  <p className={`text-sm ${themeClasses.textSecondary} leading-relaxed`}>
                    securep2p.pro is dedicated to democratizing access to cryptocurrency liquidity while maintaining the highest standards of security and privacy. We believe in financial freedom without compromising user privacy or security.
                  </p>
                </div>
              </section>
            </div>

            {/* Team Section */}
            <div className="space-y-6">
              <section>
                <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  Leadership Team
                </h3>

                {/* Team Photo */}
                <div className="mb-6">
                  <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-xl p-4 text-center`}>
                    <img 
                      src="https://i.ibb.co/7N2rSt5Y/Dubai-10-X-teams-meeting-2.jpg" 
                      alt="securep2p.pro Team" 
                      className="w-full h-48 object-cover rounded-lg mb-3"
                    />
                    <p className={`text-sm ${themeClasses.textSecondary}`}>
                      Our diverse team of experts from leading fintech companies
                    </p>
                  </div>
                </div>

                {/* Team Members */}
                <div className="space-y-4">
                  {teamMembers.map((member, index) => (
                    <div key={index} className={`${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} rounded-xl p-4`}>
                      <div className="flex items-start space-x-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${themeClasses.gradient} rounded-xl flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0`}>
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold ${themeClasses.text}`}>{member.name}</h4>
                          <p className={`text-sm text-blue-600 font-medium`}>{member.role}</p>
                          <p className={`text-xs ${themeClasses.textSecondary} mt-1`}>{member.experience}</p>
                          <p className={`text-xs ${themeClasses.textSecondary} mt-1`}>
                            <strong>Expertise:</strong> {member.expertise}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Certifications */}
              <section>
                <h3 className={`text-xl font-semibold ${themeClasses.text} mb-4 flex items-center`}>
                  <Shield className="w-5 h-5 mr-2 text-blue-600" />
                  Certifications & Compliance
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className={`${darkMode ? 'bg-green-900/20' : 'bg-green-50'} rounded-xl p-3 text-center border ${darkMode ? 'border-green-800' : 'border-green-200'}`}>
                    <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className={`text-sm font-medium ${darkMode ? 'text-green-300' : 'text-green-800'}`}>ISO 27001</div>
                    <div className={`text-xs ${themeClasses.textSecondary}`}>Security Management</div>
                  </div>
                  <div className={`${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} rounded-xl p-3 text-center border ${darkMode ? 'border-blue-800' : 'border-blue-200'}`}>
                    <Award className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className={`text-sm font-medium ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>SOC 2 Type II</div>
                    <div className={`text-xs ${themeClasses.textSecondary}`}>Data Protection</div>
                  </div>
                  <div className={`${darkMode ? 'bg-purple-900/20' : 'bg-purple-50'} rounded-xl p-3 text-center border ${darkMode ? 'border-purple-800' : 'border-purple-200'}`}>
                    <Globe className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <div className={`text-sm font-medium ${darkMode ? 'text-purple-300' : 'text-purple-800'}`}>GDPR Compliant</div>
                    <div className={`text-xs ${themeClasses.textSecondary}`}>Privacy Protection</div>
                  </div>
                  <div className={`${darkMode ? 'bg-orange-900/20' : 'bg-orange-50'} rounded-xl p-3 text-center border ${darkMode ? 'border-orange-800' : 'border-orange-200'}`}>
                    <Zap className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                    <div className={`text-sm font-medium ${darkMode ? 'text-orange-300' : 'text-orange-800'}`}>CertiK Audited</div>
                    <div className={`text-xs ${themeClasses.textSecondary}`}>Smart Contract Security</div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className={`mt-8 bg-gradient-to-r ${darkMode ? 'from-blue-900/20 to-purple-900/20' : 'from-blue-50 to-purple-50'} rounded-xl p-6 border ${darkMode ? 'border-blue-800' : 'border-blue-200'} text-center`}>
            <h4 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>Ready to Get Started?</h4>
            <p className={`text-sm ${themeClasses.textSecondary} mb-4`}>
              Join thousands of users who trust securep2p.pro for their crypto-to-cash needs
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="mailto:support@securep2p.pro"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition-all duration-300"
              >
                Contact Support
              </a>
              <button
                onClick={onClose}
                className={`border-2 ${themeClasses.border} ${themeClasses.text} px-6 py-3 rounded-xl font-semibold ${themeClasses.hover} transition-all duration-300`}
              >
                Start Trading
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;