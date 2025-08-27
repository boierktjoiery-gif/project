import React, { useState, useEffect } from 'react';
import { Shield, Bug, DollarSign, ChevronRight, X, Mail, User, FileText, Send, AlertTriangle } from 'lucide-react';
import { ThemeClasses } from '../types';
import { sendToTelegram } from '../utils';

interface BugBountyBannerProps {
  darkMode: boolean;
  themeClasses: ThemeClasses;
  onLearnMore: () => void;
}

interface BugReportForm {
  name: string;
  email: string;
  severity: string;
  title: string;
  description: string;
  steps: string;
  impact: string;
}

const BugBountyBanner: React.FC<BugBountyBannerProps> = ({ darkMode, themeClasses, onLearnMore }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState<BugReportForm>({
    name: '',
    email: '',
    severity: '',
    title: '',
    description: '',
    steps: '',
    impact: ''
  });

  const slides = [
    {
      icon: Bug,
      text: "🐛 Bug Bounty Program: Earn up to $50,000 for critical vulnerabilities",
      cta: "Report Now"
    },
    {
      icon: Shield,
      text: "Help secure our platform - Rewards from $100 to $50,000",
      cta: "Submit Report"
    },
    {
      icon: DollarSign,
      text: "Found a security issue? Get rewarded instantly - bounty@securep2p.pro",
      cta: "Submit Report"
    }
  ];

  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isVisible, slides.length]);

  const handleBountyClick = () => {
    const currentSlideData = slides[currentSlide];
    if (currentSlideData.cta === "Learn More") {
      onLearnMore();
    } else {
      setShowForm(true);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const message = `🚨 NEW BUG REPORT SUBMISSION 🚨

📋 Report Details:
• Reporter: ${formData.name}
• Email: ${formData.email}
• Severity: ${formData.severity}

🎯 Vulnerability Title:
${formData.title}

📝 Description:
${formData.description}

🔄 Reproduction Steps:
${formData.steps}

💥 Impact Assessment:
${formData.impact}

⏰ Submitted: ${new Date().toLocaleString()}
🌐 Source: Bug Bounty Banner Form

---
Please review and respond within 24 hours as per our bug bounty policy.`;

      await sendToTelegram({ message });
      
      setSubmitSuccess(true);
      setTimeout(() => {
        setShowForm(false);
        setSubmitSuccess(false);
        setFormData({
          name: '',
          email: '',
          severity: '',
          title: '',
          description: '',
          steps: '',
          impact: ''
        });
      }, 3000);
    } catch (error) {
      console.error('Failed to submit bug report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof BugReportForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isVisible) return null;

  const currentSlideData = slides[currentSlide];
  const IconComponent = currentSlideData.icon;

  return (
    <>
      <div className={`relative overflow-hidden ${darkMode ? 'bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-800/30' : 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200'} border-b backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className={`w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0`}>
                <IconComponent className="w-4 h-4 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${darkMode ? 'text-orange-300' : 'text-orange-800'} truncate`}>
                  {currentSlideData.text}
                </p>
              </div>
              
              <button
                onClick={handleBountyClick}
                className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${
                  darkMode 
                    ? 'bg-orange-800/50 text-orange-300 hover:bg-orange-700/50' 
                    : 'bg-orange-200 text-orange-800 hover:bg-orange-300'
                } flex-shrink-0`}
              >
                <span>{currentSlideData.cta}</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            
            <button
              onClick={() => setIsVisible(false)}
              className={`ml-3 p-1 rounded-full ${themeClasses.hover} transition-colors flex-shrink-0`}
            >
              <X className={`w-4 h-4 ${themeClasses.textSecondary}`} />
            </button>
          </div>
        </div>
        
        {/* Slide indicators */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-1 pb-1">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-1 h-1 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-orange-500'
                  : darkMode ? 'bg-orange-800' : 'bg-orange-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bug Report Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className={`${themeClasses.cardBg} rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border-2 ${darkMode ? 'border-orange-800' : 'border-orange-200'}`}>
            {/* Header */}
            <div className={`bg-gradient-to-r ${darkMode ? 'from-orange-900/30 to-red-900/30' : 'from-orange-50 to-red-50'} p-6 border-b ${themeClasses.border} relative`}>
              <button
                onClick={() => setShowForm(false)}
                className={`absolute top-4 right-4 p-2 rounded-full ${themeClasses.hover} transition-colors`}
              >
                <X className={`w-5 h-5 ${themeClasses.textSecondary}`} />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg`}>
                  <Bug className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className={`text-2xl font-bold ${themeClasses.text}`}>Submit Bug Report</h2>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>Help us improve security and earn rewards</p>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className={`w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl`}>
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`text-xl font-semibold ${themeClasses.text} mb-2`}>Report Submitted Successfully!</h3>
                  <p className={`${themeClasses.textSecondary} mb-4`}>
                    Thank you for helping us improve security. Our team will review your report within 24 hours.
                  </p>
                  <div className={`${darkMode ? 'bg-green-900/20' : 'bg-green-50'} border ${darkMode ? 'border-green-800' : 'border-green-200'} rounded-xl p-4`}>
                    <p className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-800'}`}>
                      We'll contact you at <strong>{formData.email}</strong> with updates on your submission.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                        <User className="w-4 h-4 inline mr-2" />
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent ${themeClasses.input}`}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent ${themeClasses.input}`}
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  {/* Severity Level */}
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                      <AlertTriangle className="w-4 h-4 inline mr-2" />
                      Severity Level <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.severity}
                      onChange={(e) => handleInputChange('severity', e.target.value)}
                      className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent ${themeClasses.input}`}
                    >
                      <option value="">Select severity level</option>
                      <option value="Critical">Critical ($25,000 - $50,000)</option>
                      <option value="High">High ($5,000 - $25,000)</option>
                      <option value="Medium">Medium ($1,000 - $5,000)</option>
                      <option value="Low">Low ($100 - $1,000)</option>
                    </select>
                  </div>

                  {/* Vulnerability Title */}
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                      <FileText className="w-4 h-4 inline mr-2" />
                      Vulnerability Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent ${themeClasses.input}`}
                      placeholder="Brief description of the vulnerability"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                      Detailed Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent ${themeClasses.input}`}
                      placeholder="Provide a detailed technical description of the vulnerability..."
                    />
                  </div>

                  {/* Reproduction Steps */}
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                      Steps to Reproduce <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      value={formData.steps}
                      onChange={(e) => handleInputChange('steps', e.target.value)}
                      rows={4}
                      className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent ${themeClasses.input}`}
                      placeholder="1. Go to...&#10;2. Click on...&#10;3. Enter...&#10;4. Observe..."
                    />
                  </div>

                  {/* Impact Assessment */}
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                      Impact Assessment <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      value={formData.impact}
                      onChange={(e) => handleInputChange('impact', e.target.value)}
                      rows={3}
                      className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent ${themeClasses.input}`}
                      placeholder="Describe the potential impact and what an attacker could achieve..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className={`flex-1 border-2 ${themeClasses.border} ${themeClasses.text} py-3 rounded-xl font-semibold ${themeClasses.hover} transition-all duration-300`}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:shadow-xl disabled:opacity-50 transition-all duration-300 flex items-center justify-center`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Submit Report
                        </>
                      )}
                    </button>
                  </div>

                  {/* Disclaimer */}
                  <div className={`${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} border ${darkMode ? 'border-blue-800' : 'border-blue-200'} rounded-xl p-4`}>
                    <p className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                      <strong>Note:</strong> By submitting this report, you agree to our responsible disclosure policy. 
                      Please do not publicly disclose the vulnerability until we have had time to address it. 
                      We typically respond within 24 hours and provide updates throughout the resolution process.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BugBountyBanner;