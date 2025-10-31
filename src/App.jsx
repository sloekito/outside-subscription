import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductSelection from './components/ProductSelection';
import PaymentForm from './components/PaymentForm';
import SubscriptionManagement from './components/SubscriptionManagement';
import './App.css';

function App() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [upgradeInfo, setUpgradeInfo] = useState(null);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setUpgradeInfo(null); // Reset upgrade info for new selections
  };

  const handlePaymentSuccess = (subscription) => {
    setCurrentSubscription(subscription);
    setUpgradeInfo(null);
  };

  const handleUpgrade = (upgradeData) => {
    setSelectedPlan(upgradeData);
    setUpgradeInfo({
      isUpgrade: true,
      prorationAmount: upgradeData.prorationAmount,
      previousSubscription: currentSubscription,
    });
  };

  return (
    <Router basename="/outside-subscription">
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={<ProductSelection onSelectPlan={handlePlanSelect} />}
          />
          <Route
            path="/payment"
            element={
              selectedPlan ? (
                <PaymentForm
                  selectedPlan={selectedPlan}
                  onPaymentSuccess={handlePaymentSuccess}
                  isUpgrade={upgradeInfo?.isUpgrade || false}
                  prorationAmount={upgradeInfo?.prorationAmount || null}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/manage"
            element={
              currentSubscription ? (
                <SubscriptionManagement
                  currentSubscription={currentSubscription}
                  onUpgrade={handleUpgrade}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
