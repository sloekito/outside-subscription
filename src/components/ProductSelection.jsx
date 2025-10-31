import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductSelection.css';

const plans = [
  {
    id: 'gaia-monthly',
    name: 'Gaia Premium Monthly',
    price: 11.99,
    period: 'month',
    billingCycle: 'monthly',
    features: [
      'Access to all Gaia content',
      'HD streaming quality',
      'Watch on 2 devices',
      'Unlimited downloads',
      'Cancel anytime',
    ],
    color: '#8B5CF6',
  },
  {
    id: 'gaia-yearly',
    name: 'Gaia Premium Annual',
    price: 59.90,
    period: 'year',
    billingCycle: 'yearly',
    savings: 'Save $84/year',
    features: [
      'Access to all Gaia content',
      'HD streaming quality',
      'Watch on 2 devices',
      'Unlimited downloads',
      'Cancel anytime',
      'Best value - 2 months free',
    ],
    color: '#8B5CF6',
  },
  {
    id: 'outside-plus-yearly',
    name: 'Outside+ Annual',
    price: 89.99,
    period: 'year',
    billingCycle: 'yearly',
    features: [
      'Everything in Gaia Premium',
      'Access to all Outside brands',
      '4K streaming quality',
      'Watch on 4 devices',
      'Exclusive member events',
      'Priority customer support',
    ],
    color: 'rgb(255, 209, 0)',
    popular: true,
  },
];

export default function ProductSelection({ onSelectPlan }) {
  const [selectedPlanId, setSelectedPlanId] = useState('gaia-yearly');
  const navigate = useNavigate();

  const handleContinue = () => {
    const plan = plans.find(p => p.id === selectedPlanId);
    onSelectPlan(plan);
    navigate('/payment');
  };

  return (
    <div className="product-selection">
      <div className="container">
        <div className="header">
          <div className="logo">
            <svg viewBox="0 0 100 100" width="60" height="60">
              <path d="M50 20 L70 50 L50 45 L30 50 Z" fill="rgb(255, 209, 0)" />
              <path d="M50 35 L65 55 L50 52 L35 55 Z" fill="rgba(255, 209, 0, 0.7)" />
              <circle cx="75" cy="30" r="8" fill="rgb(255, 209, 0)" opacity="0.5" />
            </svg>
          </div>
          <h1>Choose Your Adventure</h1>
          <p className="subtitle">Select the perfect plan for your outdoor journey</p>
        </div>

        <div className="plans-grid">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`plan-card ${selectedPlanId === plan.id ? 'selected' : ''}`}
              onClick={() => setSelectedPlanId(plan.id)}
            >
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              {plan.savings && <div className="savings-badge">{plan.savings}</div>}

              <div className="plan-header">
                <h3>{plan.name}</h3>
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">{plan.price.toFixed(2)}</span>
                  <span className="period">/{plan.period}</span>
                </div>
              </div>

              <ul className="features-list">
                {plan.features.map((feature, index) => (
                  <li key={index}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="10" fill={plan.color} opacity="0.2" />
                      <path
                        d="M6 10L9 13L14 7"
                        stroke={plan.color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="radio-indicator">
                <div className="radio-outer">
                  {selectedPlanId === plan.id && <div className="radio-inner" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="btn-continue" onClick={handleContinue}>
          Continue to Payment
        </button>

        <p className="terms">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
