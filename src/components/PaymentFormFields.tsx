import React from 'react';
import { CreditCard } from 'lucide-react';
import { PaymentDetails, ThemeClasses } from '../types';

interface PaymentFormFieldsProps {
  selectedPaymentMethod: string;
  paymentDetails: PaymentDetails;
  setPaymentDetails: (details: PaymentDetails) => void;
  themeClasses: ThemeClasses;
}

const PaymentFormFields: React.FC<PaymentFormFieldsProps> = ({
  selectedPaymentMethod,
  paymentDetails,
  setPaymentDetails,
  themeClasses
}) => {
  const upiRegex = /^[\w.-]+@[\w.-]+$/;

  const renderFields = () => {
    switch (selectedPaymentMethod) {
      case 'UPI':
        return (
          <div className="space-y-6">
            {/* UPI #1 (Primary) */}
            <div className={`rounded-2xl border p-4 ${themeClasses.input}`}>
              <h5 className={`text-sm font-semibold ${themeClasses.text} mb-3`}>
                UPI #1 (Primary)
              </h5>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                    UPI ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={paymentDetails.upiId || ''}
                    onChange={e => setPaymentDetails({ ...paymentDetails, upiId: e.target.value })}
                    className={`w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.input}`}
                    placeholder="yourname@paytm"
                  />
                  {paymentDetails.upiId && !upiRegex.test(paymentDetails.upiId) && (
                    <p className="text-red-600 text-sm mt-1">
                      Enter a valid UPI ID (e.g. yourname@paytm)
                    </p>
                  )}
                </div>
                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={paymentDetails.fullName || ''}
                    onChange={e => setPaymentDetails({ ...paymentDetails, fullName: e.target.value })}
                    className={`w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.input}`}
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
            </div>

            {/* UPI #2 (Alternate / Split) */}
            <div className={`rounded-2xl border p-4 ${themeClasses.input}`}>
              <h5 className={`text-sm font-semibold ${themeClasses.text} mb-3`}>
                UPI #2 (Alternate / Optional)
              </h5>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                    UPI ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={paymentDetails.upiId2 || ''}
                    onChange={e => setPaymentDetails({ ...paymentDetails, upiId2: e.target.value })}
                    className={`w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.input}`}
                    placeholder="altname@upi"
                  />
                  {paymentDetails.upiId2 &&
                    !upiRegex.test(paymentDetails.upiId2) && (
                      <p className="text-red-600 text-sm mt-1">
                        Enter a valid UPI ID (e.g. altname@upi)
                      </p>
                  )}
                </div>
                <div>
                  <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                    Full Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={paymentDetails.fullName2 || ''}
                    onChange={e => setPaymentDetails({ ...paymentDetails, fullName2: e.target.value })}
                    className={`w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.input}`}
                    placeholder="Enter full name"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'IMPS':
        return (
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                Bank Account Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={paymentDetails.accountNumber || ''}
                onChange={e => setPaymentDetails({ ...paymentDetails, accountNumber: e.target.value })}
                className={`w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.input}`}
                placeholder="Enter account number"
              />
              {paymentDetails.accountNumber && !/^\d{9,18}$/.test(paymentDetails.accountNumber) && (
                <p className="text-red-600 text-sm mt-1">Enter a valid account number (9-18 digits)</p>
              )}
            </div>
            <div>
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                IFSC Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={paymentDetails.ifscCode || ''}
                onChange={e => setPaymentDetails({ ...paymentDetails, ifscCode: e.target.value.toUpperCase() })}
                className={`w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.input}`}
                placeholder="SBIN0001234"
              />
              {paymentDetails.ifscCode && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(paymentDetails.ifscCode) && (
                <p className="text-red-600 text-sm mt-1">Enter a valid IFSC code (e.g. SBIN0001234)</p>
              )}
            </div>
            <div>
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                Account Holder Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={paymentDetails.accountHolderName || ''}
                onChange={e => setPaymentDetails({ ...paymentDetails, accountHolderName: e.target.value })}
                className={`w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.input}`}
                placeholder="Enter account holder name"
              />
            </div>
          </div>
        );

      case 'PayPal':
        return (
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                PayPal Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={paymentDetails.paypalEmail || ''}
                onChange={e => setPaymentDetails({ ...paymentDetails, paypalEmail: e.target.value })}
                className={`w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.input}`}
                placeholder="your.email@example.com"
              />
              {paymentDetails.paypalEmail && !/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(paymentDetails.paypalEmail) && (
                <p className="text-red-600 text-sm mt-1">Enter a valid email address</p>
              )}
            </div>
            <div>
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={paymentDetails.fullName || ''}
                onChange={e => setPaymentDetails({ ...paymentDetails, fullName: e.target.value })}
                className={`w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.input}`}
                placeholder="Enter your full name"
              />
            </div>
          </div>
        );

      case 'ACH':
        return (
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                Routing Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={paymentDetails.routingNumber || ''}
                onChange={e => setPaymentDetails({ ...paymentDetails, routingNumber: e.target.value })}
                className={`w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.input}`}
                placeholder="9-digit routing number"
              />
              {paymentDetails.routingNumber && !/^\d{9}$/.test(paymentDetails.routingNumber) && (
                <p className="text-red-600 text-sm mt-1">Enter a valid 9-digit routing number</p>
              )}
            </div>
            <div>
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                Account Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={paymentDetails.accountNumber || ''}
                onChange={e => setPaymentDetails({ ...paymentDetails, accountNumber: e.target.value })}
                className={`w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.input}`}
                placeholder="Enter account number"
              />
              {paymentDetails.accountNumber && !/^\d{8,17}$/.test(paymentDetails.accountNumber) && (
                <p className="text-red-600 text-sm mt-1">Enter a valid account number (8-17 digits)</p>
              )}
            </div>
            <div>
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                Account Holder Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={paymentDetails.accountHolderName || ''}
                onChange={e => setPaymentDetails({ ...paymentDetails, accountHolderName: e.target.value })}
                className={`w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.input}`}
                placeholder="Enter account holder name"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                Account Type <span className="text-red-500">*</span>
              </label>
              <select
                value={paymentDetails.accountType || ''}
                onChange={e => setPaymentDetails({ ...paymentDetails, accountType: e.target.value })}
                className={`w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.input}`}
              >
                <option value="">Select account type</option>
                <option value="checking">Checking</option>
                <option value="savings">Savings</option>
              </select>
            </div>
          </div>
        );

      case 'SEPA':
        return (
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                IBAN <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={paymentDetails.iban || ''}
                onChange={e => setPaymentDetails({ ...paymentDetails, iban: e.target.value.toUpperCase() })}
                className={`w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.input}`}
                placeholder="DE89370400440532013000"
              />
              {paymentDetails.iban && !/^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/.test(paymentDetails.iban) && (
                <p className="text-red-600 text-sm mt-1">Enter a valid IBAN (e.g. DE89370400440532013000)</p>
              )}
            </div>
            <div>
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                Account Holder Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={paymentDetails.accountHolderName || ''}
                onChange={e => setPaymentDetails({ ...paymentDetails, accountHolderName: e.target.value })}
                className={`w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.input}`}
                placeholder="Enter account holder name"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                BIC/SWIFT Code (Optional)
              </label>
              <input
                type="text"
                value={paymentDetails.bicCode || ''}
                onChange={e => setPaymentDetails({ ...paymentDetails, bicCode: e.target.value.toUpperCase() })}
                className={`w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.input}`}
                placeholder="DEUTDEFF (Optional)"
              />
            </div>
          </div>
        );

      case 'Bank Transfer':
        return (
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                Bank Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={paymentDetails.bankName || ''}
                onChange={e => setPaymentDetails({ ...paymentDetails, bankName: e.target.value })}
                className={`w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.input}`}
                placeholder="Enter bank name"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                Account Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={paymentDetails.accountNumber || ''}
                onChange={e => setPaymentDetails({ ...paymentDetails, accountNumber: e.target.value })}
                className={`w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.input}`}
                placeholder="Enter account number"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                Account Holder Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={paymentDetails.accountHolderName || ''}
                onChange={e => setPaymentDetails({ ...paymentDetails, accountHolderName: e.target.value })}
                className={`w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.input}`}
                placeholder="Enter account holder name"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                Sort Code / Routing Number
              </label>
              <input
                type="text"
                value={paymentDetails.sortCode || ''}
                onChange={e => setPaymentDetails({ ...paymentDetails, sortCode: e.target.value })}
                className={`w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.input}`}
                placeholder="Enter sort code or routing number"
              />
            </div>
          </div>
        );

      case 'Cash':
        return (
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                Pickup Address <span className="text-red-500">*</span>
              </label>
              <textarea
                value={paymentDetails.cashAddress || ''}
                onChange={e => setPaymentDetails({ ...paymentDetails, cashAddress: e.target.value })}
                className={`w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.input}`}
                placeholder="Rahul Sharma, Flat 12B, Skyview Apartments, MG Road, Near Central Mall, Bengaluru, Karnataka 560001, India, Phone: +91 98765 43210, Pickup Window: Today 3–5 PM, Notes: Security gate pass required"

                rows={3}
              />
              {paymentDetails.cashAddress &&
                paymentDetails.cashAddress.trim().length > 0 &&
                paymentDetails.cashAddress.trim().length < 10 && (
                  <p className="text-red-600 text-sm mt-1">Please enter a complete address.</p>
                )}
            </div>

            <div>
              <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
                Contact Number 
              </label>
              <input
                type="tel"
                value={paymentDetails.cashContactPhone || ''}
                onChange={e => setPaymentDetails({ ...paymentDetails, cashContactPhone: e.target.value })}
                className={`w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.input}`}
                placeholder="+91 98765 43210"
              />
              {paymentDetails.cashContactPhone &&
                !/^\+?\d[\d\s-]{6,14}\d$/.test(paymentDetails.cashContactPhone) && (
                  <p className="text-red-600 text-sm mt-1">Enter a valid phone number</p>
                )}
            </div>
          </div>
        );

      default:
        return (
          <div>
            <label className={`block text-sm font-medium ${themeClasses.text} mb-2`}>
              {selectedPaymentMethod} Details <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={paymentDetails.general || ''}
              onChange={e => setPaymentDetails({ ...paymentDetails, general: e.target.value })}
              className={`w-full border rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${themeClasses.input}`}
              placeholder={`Enter ${selectedPaymentMethod} details`}
            />
          </div>
        );
    }
  };

  return (
    <div className="mb-6">
      <h4 className={`text-lg font-semibold ${themeClasses.text} mb-4 flex items-center`}>
        <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
        {selectedPaymentMethod} Details
      </h4>
      {renderFields()}
    </div>
  );
};

export default PaymentFormFields;
