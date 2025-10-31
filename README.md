# Outside Subscription Flow

A modern subscription management system built with React, featuring two subscription tiers with upgrade capabilities and prorated billing.

## Features

### 🎯 Subscription Plans
- **Gaia Premium** - $59.90/month
  - Access to all Gaia content
  - HD streaming quality
  - Watch on 2 devices
  - Unlimited downloads
  - Cancel anytime

- **Outside+** - $89.99/month
  - Everything in Gaia Premium
  - Access to all Outside brands
  - 4K streaming quality
  - Watch on 4 devices
  - Exclusive member events
  - Priority customer support

### 💳 Payment Options
- Credit/Debit Card
- Apple Pay
- Google Pay

### 🔄 Upgrade Flow
- Seamless upgrade from Gaia Premium to Outside+
- Automatic proration calculation
- Credit for unused portion of current plan
- Real-time billing preview

### 📱 Subscription Management
- View current subscription details
- Manage payment methods
- Update billing address
- Upgrade to higher tier
- Cancel subscription

## Tech Stack

- **React 18** - UI framework
- **React Router 6** - Client-side routing
- **Vite** - Build tool and dev server
- **Stripe** - Payment processing (integrated)
- **CSS3** - Styling with animations

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open your browser to `http://localhost:5173`

### Build for Production

\`\`\`bash
npm run build
\`\`\`

### Preview Production Build

\`\`\`bash
npm run preview
\`\`\`

## Project Structure

\`\`\`
outside-subscription/
├── src/
│   ├── components/
│   │   ├── ProductSelection.jsx       # Plan selection page
│   │   ├── ProductSelection.css
│   │   ├── PaymentForm.jsx            # Payment processing
│   │   ├── PaymentForm.css
│   │   ├── SubscriptionManagement.jsx # Subscription management
│   │   └── SubscriptionManagement.css
│   ├── App.jsx                        # Main app component with routing
│   ├── App.css                        # Global styles
│   └── main.jsx                       # Entry point
├── index.html
├── package.json
└── vite.config.js
\`\`\`

## User Flow

1. **Product Selection** (`/`)
   - User selects between Gaia Premium or Outside+
   - View plan features and pricing
   - Click "Continue to Payment"

2. **Payment** (`/payment`)
   - Enter credit card details or use Apple/Google Pay
   - Fill in billing address
   - Review order summary
   - Complete purchase

3. **Subscription Management** (`/manage`)
   - View current subscription details
   - See next billing date
   - Upgrade to Outside+ (if on Gaia Premium)
   - View prorated upgrade pricing
   - Manage payment methods and billing

## Key Features Implementation

### Proration Logic
When upgrading from Gaia Premium to Outside+:
1. Calculate days remaining in current billing cycle
2. Compute unused amount: `(currentPlanPrice / 30) × daysRemaining`
3. Calculate prorated charge: `newPlanPrice - unusedAmount`
4. Display credit and new charge to user

### Payment Processing
- Simulated payment flow (ready for Stripe integration)
- Support for credit cards, Apple Pay, and Google Pay
- Card number formatting and validation
- Billing address collection

### Responsive Design
- Mobile-first approach
- Smooth animations and transitions
- Accessible form controls
- Touch-friendly UI elements

## Design System

### Colors
- **Primary**: `rgb(255, 209, 0)` - Brand yellow
- **Text Dark**: `#222222`
- **Text Light**: `#666666`
- **Background**: `#ffffff`
- **Accent Purple**: `#8B5CF6` (Gaia Premium)

### Typography
- **Font**: Plus Jakarta Sans
- **Weights**: 400 (regular), 600 (semibold), 700 (bold)

### Components
- Rounded corners (8px-16px)
- Soft shadows for elevation
- Smooth hover transitions
- Animated page transitions

## Next Steps

### Production Readiness
- [ ] Integrate real Stripe payment processing
- [ ] Add backend API for subscription management
- [ ] Implement user authentication
- [ ] Add error handling and retry logic
- [ ] Set up analytics tracking
- [ ] Add email confirmation
- [ ] Implement webhook handlers for payment events

### Enhancements
- [ ] Add annual billing option
- [ ] Implement referral program
- [ ] Add gift subscriptions
- [ ] Create admin dashboard
- [ ] Add usage analytics for users
- [ ] Implement A/B testing for pricing

## License

Private - Outside Inc

## Support

For questions or issues, contact the development team.
# outside-subscription
