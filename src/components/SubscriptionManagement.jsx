import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SubscriptionManagement.css';

const plans = {
  'gaia-monthly': {
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
  },
  'gaia-yearly': {
    id: 'gaia-yearly',
    name: 'Gaia Premium Annual',
    price: 59.90,
    period: 'year',
    billingCycle: 'yearly',
    features: [
      'Access to all Gaia content',
      'HD streaming quality',
      'Watch on 2 devices',
      'Unlimited downloads',
      'Cancel anytime',
      'Best value - 2 months free',
    ],
  },
  'outside-plus-yearly': {
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
  },
};

export default function SubscriptionManagement({ currentSubscription, onUpgrade }) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [prorationAmount, setProrationAmount] = useState(null);
  const navigate = useNavigate();

  const canUpgrade = currentSubscription.plan.id === 'gaia-monthly' || currentSubscription.plan.id === 'gaia-yearly';
  const upgradePlan = canUpgrade ? plans['outside-plus-yearly'] : null;

  const calculateProration = () => {
    if (!canUpgrade) return 0;

    // Calculate days remaining in current billing cycle
    const now = new Date();
    const nextBilling = new Date(currentSubscription.nextBillingDate);
    const daysRemaining = Math.ceil((nextBilling - now) / (1000 * 60 * 60 * 24));

    // Determine total days based on billing cycle
    const totalDays = currentSubscription.plan.billingCycle === 'monthly' ? 30 : 365;

    // Calculate unused portion of current plan
    const unusedAmount = (currentSubscription.plan.price / totalDays) * daysRemaining;

    // New plan prorated amount
    const newPlanProrated = upgradePlan.price - unusedAmount;

    return Math.max(0, newPlanProrated);
  };

  const handleUpgradeClick = () => {
    const prorated = calculateProration();
    setProrationAmount(prorated);
    setShowUpgradeModal(true);
  };

  const handleConfirmUpgrade = () => {
    onUpgrade({
      ...upgradePlan,
      isUpgrade: true,
      prorationAmount,
    });
    navigate('/payment', {
      state: {
        isUpgrade: true,
        prorationAmount,
      },
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="subscription-management">
      <div className="management-container">
        <div className="management-header">
          <div className="logo">
            <svg viewBox="0 0 100 100" width="60" height="60">
              <path d="M50 20 L70 50 L50 45 L30 50 Z" fill="rgb(255, 209, 0)" />
              <path d="M50 35 L65 55 L50 52 L35 55 Z" fill="rgba(255, 209, 0, 0.7)" />
              <circle cx="75" cy="30" r="8" fill="rgb(255, 209, 0)" opacity="0.5" />
            </svg>
          </div>
          <h1>Manage Your Subscription</h1>
          <p className="subtitle">View and manage your Outside subscription</p>
        </div>

        <div className="management-content">
          <div className="current-plan-card">
            <div className="card-header">
              <h2>Current Plan</h2>
              <span className={`status-badge ${currentSubscription.status}`}>
                {currentSubscription.status}
              </span>
            </div>

            <div className="plan-info">
              <div className="plan-name">{currentSubscription.plan.name}</div>
              <div className="plan-price">
                ${currentSubscription.plan.price.toFixed(2)}/{currentSubscription.plan.period || 'month'}
              </div>
            </div>

            <div className="billing-info">
              <div className="info-row">
                <span className="label">Started on:</span>
                <span className="value">{formatDate(currentSubscription.startDate)}</span>
              </div>
              <div className="info-row">
                <span className="label">Next billing date:</span>
                <span className="value">{formatDate(currentSubscription.nextBillingDate)}</span>
              </div>
              {currentSubscription.paymentMethod && (
                <div className="info-row">
                  <span className="label">Payment method:</span>
                  <span className="value">{currentSubscription.paymentMethod}</span>
                </div>
              )}
            </div>

            {canUpgrade && (
              <div className="upgrade-section">
                <div className="upgrade-banner">
                  <div className="upgrade-content">
                    <h3>Upgrade to Outside+ Annual</h3>
                    <p>Get access to all Outside brands, 4K streaming, and more!</p>
                    <p>For a limited time, earn 10,000 Max Rewards points with your upgrade!</p>

                    <div className="upgrade-price">
                      {currentSubscription.plan.billingCycle === 'monthly' ? (
                        <>Switch to annual - <strong>${upgradePlan.price}/year</strong></>
                      ) : (
                        <>Only <strong>${(upgradePlan.price - currentSubscription.plan.price).toFixed(2)}/year</strong> more</>
                      )}
                    </div>
                  </div>
                  <button className="btn-upgrade" onClick={handleUpgradeClick}>
                    Upgrade Now
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="features-card">
            <h2>Your Benefits</h2>
            <ul className="benefits-list">
              {currentSubscription.plan.features.map((feature, index) => (
                <li key={index}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="10" fill="rgb(255, 209, 0)" opacity="0.2" />
                    <path
                      d="M6 10L9 13L14 7"
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

          <div className="actions-card">
            <h2>Manage Subscription</h2>
            <div className="action-buttons">
              <button className="btn-action secondary">Update Payment Method</button>
              <button className="btn-action secondary">Update Billing Address</button>
              <button className="btn-action danger">Cancel Subscription</button>
            </div>
          </div>
        </div>
      </div>

      {showUpgradeModal && (
        <div className="modal-overlay" onClick={() => setShowUpgradeModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Upgrade to Outside+</h2>
              <button className="close-button" onClick={() => setShowUpgradeModal(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className="modal-body">
              <div className="upgrade-comparison">
                <div className="comparison-row">
                  <span className="label">Current Plan:</span>
                  <span className="value">{currentSubscription.plan.name} - ${currentSubscription.plan.price.toFixed(2)}/{currentSubscription.plan.period}</span>
                </div>
                <div className="comparison-row">
                  <span className="label">New Plan:</span>
                  <span className="value">{upgradePlan.name} - ${upgradePlan.price.toFixed(2)}/{upgradePlan.period}</span>
                </div>
              </div>

              <div className="proration-info">
                <h3>Prorated Charge</h3>
                <p>
                  You'll be charged <strong>${prorationAmount.toFixed(2)}</strong> today for the remainder of your current billing cycle.
                  This includes a credit of <strong>${(currentSubscription.plan.price - (upgradePlan.price - prorationAmount)).toFixed(2)}</strong> for the unused portion of your current plan.
                </p>
                <p className="next-billing">
                  Starting {formatDate(currentSubscription.nextBillingDate)}, you'll be charged ${upgradePlan.price.toFixed(2)} per {upgradePlan.period}.
                </p>
              </div>

              <div className="upgrade-benefits">
                <h3>What you'll get with Outside+:</h3>
                <ul>
                  <li>
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
                    Access to all Outside brands
                  </li>
                  <li>
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
                    4K streaming quality
                  </li>
                  <li>
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
                    Watch on 4 devices simultaneously
                  </li>
                  <li>
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
                    Exclusive member events
                  </li>
                  <li>
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
                    Priority customer support
                  </li>
                </ul>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-modal secondary" onClick={() => setShowUpgradeModal(false)}>
                Cancel
              </button>
              <button className="btn-modal primary" onClick={handleConfirmUpgrade}>
                Upgrade Now - ${prorationAmount.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
