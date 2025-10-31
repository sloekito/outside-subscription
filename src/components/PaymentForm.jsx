import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentForm.css';

export default function PaymentForm({ selectedPlan, onPaymentSuccess, isUpgrade = false, prorationAmount = null }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
  });
  const [billingAddress, setBillingAddress] = useState({
    line1: '',
    city: '',
    state: '',
    zip: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  const handleCardInputChange = (field, value) => {
    let formattedValue = value;

    if (field === 'number') {
      formattedValue = formatCardNumber(value);
      if (formattedValue.replace(/\s/g, '').length > 16) return;
    } else if (field === 'expiry') {
      formattedValue = formatExpiry(value);
      if (formattedValue.replace('/', '').length > 4) return;
    } else if (field === 'cvc') {
      formattedValue = value.replace(/[^0-9]/gi, '');
      if (formattedValue.length > 4) return;
    }

    setCardDetails({ ...cardDetails, [field]: formattedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In a real app, you would process the payment here
    const subscription = {
      id: `sub_${Date.now()}`,
      plan: selectedPlan,
      status: 'active',
      startDate: new Date().toISOString(),
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };

    setIsProcessing(false);
    onPaymentSuccess(subscription);
    navigate('/manage');
  };

  const handleApplePay = async () => {
    setIsProcessing(true);
    setError('');

    // Simulate Apple Pay processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const subscription = {
      id: `sub_${Date.now()}`,
      plan: selectedPlan,
      status: 'active',
      startDate: new Date().toISOString(),
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod: 'Apple Pay',
    };

    setIsProcessing(false);
    onPaymentSuccess(subscription);
    navigate('/manage');
  };

  const handleGooglePay = async () => {
    setIsProcessing(true);
    setError('');

    // Simulate Google Pay processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    const subscription = {
      id: `sub_${Date.now()}`,
      plan: selectedPlan,
      status: 'active',
      startDate: new Date().toISOString(),
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      paymentMethod: 'Google Pay',
    };

    setIsProcessing(false);
    onPaymentSuccess(subscription);
    navigate('/manage');
  };

  const finalAmount = prorationAmount !== null ? prorationAmount : selectedPlan.price;

  return (
    <div className="payment-form-page">
      <div className="payment-container">
        <div className="payment-header">
          <button className="back-button" onClick={() => navigate(-1)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 16L6 10L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
          <h1>{isUpgrade ? 'Upgrade Your Plan' : 'Complete Your Purchase'}</h1>
        </div>

        <div className="payment-content">
          <div className="payment-left">
            <div className="payment-methods">
              <h2>Payment Method</h2>

              <div className="quick-pay-buttons">
                <button
                  type="button"
                  className="btn-quick-pay apple-pay"
                  onClick={handleApplePay}
                  disabled={isProcessing}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M19.651 12.307c-.033-3.049 2.483-4.52 2.597-4.589-1.414-2.068-3.618-2.352-4.403-2.383-1.875-.19-3.659 1.104-4.608 1.104-.95 0-2.418-1.077-3.976-1.048-2.045.029-3.931 1.19-4.985 3.019-2.125 3.686-.543 9.142 1.527 12.131 1.013 1.463 2.22 3.105 3.807 3.047 1.556-.061 2.144-1.008 4.024-1.008 1.88 0 2.408 1.008 3.976.976 1.645-.029 2.702-1.488 3.715-2.951 1.171-1.689 1.653-3.327 1.682-3.411-.037-.016-3.226-1.237-3.26-4.9M16.228 3.579c.84-1.006 1.408-2.403 1.253-3.795-1.213.052-2.682.855-3.549 1.933-.777.904-1.458 2.348-1.276 3.74 1.35.104 2.73-.728 3.572-2.305" fill="currentColor"/>
                  </svg>
                  Apple Pay
                </button>

                <button
                  type="button"
                  className="btn-quick-pay google-pay"
                  onClick={handleGooglePay}
                  disabled={isProcessing}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.571S8.145 4.43 12.24 4.43c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" fill="currentColor"/>
                  </svg>
                  Google Pay
                </button>
              </div>

              <div className="divider">
                <span>or pay with card</span>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="cardName">Cardholder Name</label>
                  <input
                    type="text"
                    id="cardName"
                    value={cardDetails.name}
                    onChange={(e) => handleCardInputChange('name', e.target.value)}
                    placeholder="John Doe"
                    required
                    disabled={isProcessing}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={cardDetails.number}
                    onChange={(e) => handleCardInputChange('number', e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    required
                    disabled={isProcessing}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiry">Expiry Date</label>
                    <input
                      type="text"
                      id="expiry"
                      value={cardDetails.expiry}
                      onChange={(e) => handleCardInputChange('expiry', e.target.value)}
                      placeholder="MM/YY"
                      required
                      disabled={isProcessing}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cvc">CVC</label>
                    <input
                      type="text"
                      id="cvc"
                      value={cardDetails.cvc}
                      onChange={(e) => handleCardInputChange('cvc', e.target.value)}
                      placeholder="123"
                      required
                      disabled={isProcessing}
                    />
                  </div>
                </div>

                <div className="billing-address">
                  <h3>Billing Address</h3>

                  <div className="form-group">
                    <label htmlFor="address">Street Address</label>
                    <input
                      type="text"
                      id="address"
                      value={billingAddress.line1}
                      onChange={(e) => setBillingAddress({ ...billingAddress, line1: e.target.value })}
                      placeholder="123 Main St"
                      required
                      disabled={isProcessing}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        id="city"
                        value={billingAddress.city}
                        onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                        placeholder="San Francisco"
                        required
                        disabled={isProcessing}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="state">State</label>
                      <input
                        type="text"
                        id="state"
                        value={billingAddress.state}
                        onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })}
                        placeholder="CA"
                        required
                        disabled={isProcessing}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="zip">ZIP Code</label>
                      <input
                        type="text"
                        id="zip"
                        value={billingAddress.zip}
                        onChange={(e) => setBillingAddress({ ...billingAddress, zip: e.target.value })}
                        placeholder="94102"
                        required
                        disabled={isProcessing}
                      />
                    </div>
                  </div>
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" className="btn-submit" disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <span className="spinner"></span>
                      Processing...
                    </>
                  ) : (
                    `Pay $${finalAmount.toFixed(2)}`
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="payment-right">
            <div className="order-summary">
              <h2>Order Summary</h2>

              <div className="summary-item">
                <span className="label">{selectedPlan.name}</span>
                <span className="value">${selectedPlan.price.toFixed(2)}</span>
              </div>

              {prorationAmount !== null && (
                <>
                  <div className="summary-item">
                    <span className="label">Prorated credit</span>
                    <span className="value credit">-${(selectedPlan.price - prorationAmount).toFixed(2)}</span>
                  </div>
                  <div className="proration-note">
                    You'll receive a credit for the unused portion of your current plan.
                  </div>
                </>
              )}

              <div className="summary-divider"></div>

              <div className="summary-item total">
                <span className="label">Total {isUpgrade ? 'due' : 'today'}</span>
                <span className="value">${finalAmount.toFixed(2)}</span>
              </div>

              <div className="plan-features">
                <h3>What's included:</h3>
                <ul>
                  {selectedPlan.features.map((feature, index) => (
                    <li key={index}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="8" fill="rgb(255, 209, 0)" opacity="0.2" />
                        <path
                          d="M5 8L7 10L11 6"
                          stroke="rgb(255, 209, 0)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="secure-payment">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 7V5a4 4 0 00-8 0v2M3 7h10a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1z" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Secure payment powered by Stripe
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
