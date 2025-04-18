#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

interface PricingTier {
  title: string;
  price: string;
  period: string;
  features: string[];
  ctaText: string;
  highlighted: boolean;
  stripePriceId: string;
}

interface Variant {
  name: string;
  distribution: number;
  title: string;
  subtitle: string;
  ctaText: string;
}

// Define variant data
const variants: Variant[] = [
  {
    name: 'a',
    distribution: 50,
    title: 'Choose Your Plan',
    subtitle: 'Start with a flexible monthly plan or save with annual billing.',
    ctaText: 'Subscribe Now',
  },
  {
    name: 'b',
    distribution: 50,
    title: 'Unlock Premium Content',
    subtitle: 'Get full access to all premium features with our subscription plans.',
    ctaText: 'Get Premium Access',
  },
];

// Define pricing tiers
const monthlyTiers: PricingTier[] = [
  {
    title: 'Basic',
    price: '$9',
    period: 'month',
    features: [
      'Full access to basic content',
      'Up to 3 projects',
      'Basic support',
      'Updates included'
    ],
    ctaText: 'Start Basic',
    highlighted: false,
    stripePriceId: 'price_basic_monthly'
  },
  {
    title: 'Pro',
    price: '$29',
    period: 'month',
    features: [
      'Full access to all content',
      'Unlimited projects',
      'Priority support',
      'Updates included',
      'Advanced analytics',
      'Custom exports'
    ],
    ctaText: 'Start Pro',
    highlighted: true,
    stripePriceId: 'price_pro_monthly'
  },
  {
    title: 'Team',
    price: '$79',
    period: 'month',
    features: [
      'Everything in Pro',
      'Up to 10 team members',
      'Dedicated support',
      'Team collaboration tools',
      'Admin console',
      'SSO integration'
    ],
    ctaText: 'Start Team',
    highlighted: false,
    stripePriceId: 'price_team_monthly'
  }
];

// Create yearly pricing with 20% discount
const yearlyTiers: PricingTier[] = monthlyTiers.map(tier => {
  const monthlyPrice = parseInt(tier.price.replace('$', ''));
  const yearlyPrice = Math.round(monthlyPrice * 12 * 0.8);
  
  return {
    ...tier,
    price: `$${yearlyPrice}`,
    period: 'year',
    stripePriceId: tier.stripePriceId.replace('monthly', 'yearly')
  };
});

// Combine everything into a payload
const payload = {
  variants,
  pricing: {
    monthly: monthlyTiers,
    yearly: yearlyTiers
  }
};

// Write to a JSON file
const outputFile = path.join(__dirname, '../apps/api/src/data/variants.json');

// Ensure directory exists
const dir = path.dirname(outputFile);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Write the data
fs.writeFileSync(outputFile, JSON.stringify(payload, null, 2));

console.log(`Variant data written to ${outputFile}`);

// Also create variant CSS files for the paywall-split.js script
const cssDir = path.join(__dirname, '../apps/api/public/styles');
if (!fs.existsSync(cssDir)) {
  fs.mkdirSync(cssDir, { recursive: true });
}

// Create CSS for variant A
const cssA = `
.paywall-variant-a {
  font-family: system-ui, -apple-system, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.paywall-variant-a h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1F2937;
}

.paywall-variant-a p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: #4B5563;
}

.paywall-variant-a button {
  background-color: #2563EB;
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.paywall-variant-a button:hover {
  background-color: #1D4ED8;
}

@media (prefers-color-scheme: dark) {
  .paywall-variant-a {
    background-color: #1F2937;
  }
  
  .paywall-variant-a h2 {
    color: #F9FAFB;
  }
  
  .paywall-variant-a p {
    color: #E5E7EB;
  }
}
`;

// Create CSS for variant B
const cssB = `
.paywall-variant-b {
  font-family: system-ui, -apple-system, sans-serif;
  position: relative;
  width: 100%;
}

.paywall-variant-b .blurred-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.paywall-variant-b h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1F2937;
}

.paywall-variant-b p {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: #4B5563;
}

.paywall-variant-b button {
  background-color: #10B981;
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.paywall-variant-b button:hover {
  background-color: #059669;
}

@media (prefers-color-scheme: dark) {
  .paywall-variant-b .blurred-content {
    background-color: rgba(31, 41, 55, 0.8);
  }
  
  .paywall-variant-b h2 {
    color: #F9FAFB;
  }
  
  .paywall-variant-b p {
    color: #E5E7EB;
  }
}
`;

// Write CSS files
fs.writeFileSync(path.join(cssDir, 'paywall-a.css'), cssA);
fs.writeFileSync(path.join(cssDir, 'paywall-b.css'), cssB);

console.log(`CSS files written to ${cssDir}`);

// Exit successfully
process.exit(0); 