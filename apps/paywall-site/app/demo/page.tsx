import React from 'react';
import Link from 'next/link';
import { Button, ThemeToggle, PaywallFactory } from 'ui';

// Demo data
const demoData = {
  copy: {
    title: 'Choose Your Plan',
    subtitle: 'Start with a flexible monthly plan or save with annual billing.',
    ctaText: 'Get Premium Access',
  },
  pricing: {
    monthly: [
      {
        title: 'Basic',
        price: '$9',
        period: 'month',
        features: [
          'Full access to basic content',
          'Up to 3 projects',
          'Basic support',
          'Updates included',
        ],
        ctaText: 'Start Basic',
        highlighted: false,
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
          'Custom exports',
        ],
        ctaText: 'Start Pro',
        highlighted: true,
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
          'SSO integration',
        ],
        ctaText: 'Start Team',
        highlighted: false,
      },
    ],
    yearly: [
      {
        title: 'Basic',
        price: '$86',
        period: 'year',
        features: [
          'Full access to basic content',
          'Up to 3 projects',
          'Basic support',
          'Updates included',
        ],
        ctaText: 'Start Basic',
        highlighted: false,
      },
      {
        title: 'Pro',
        price: '$278',
        period: 'year',
        features: [
          'Full access to all content',
          'Unlimited projects',
          'Priority support',
          'Updates included',
          'Advanced analytics',
          'Custom exports',
        ],
        ctaText: 'Start Pro',
        highlighted: true,
      },
      {
        title: 'Team',
        price: '$758',
        period: 'year',
        features: [
          'Everything in Pro',
          'Up to 10 team members',
          'Dedicated support',
          'Team collaboration tools',
          'Admin console',
          'SSO integration',
        ],
        ctaText: 'Start Team',
        highlighted: false,
      },
    ],
  },
};

// Demo content for blur variant
const demoContent = `
  <h2>Exclusive Premium Content</h2>
  <p>This is a sample of the premium content that would be blurred out in the blur variant paywall.</p>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, 
  nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies.</p>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies,
  nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies.</p>
`;

export default function DemoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            <Link href="/">
              Paywall Conversion Optimizer
            </Link>
          </h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/dashboard">
              <Button variant="primary">Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Paywall Demo
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Below are examples of the two paywall templates included in this system.
              You can use these as a starting point and customize them to fit your needs.
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-12">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Variant A: Pricing Toggle
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This variant shows a pricing table with a toggle between monthly and yearly billing.
              </p>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <PaywallFactory
                  variant="a"
                  copy={demoData.copy}
                  pricing={demoData.pricing}
                  onSelect={(tierIndex, isAnnual) => {
                    console.log(`Selected tier ${tierIndex}, isAnnual: ${isAnnual}`);
                  }}
                />
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Variant B: Content Blur Overlay
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This variant blurs the content and shows an overlay prompting the user to subscribe.
              </p>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <PaywallFactory
                  variant="b"
                  copy={{
                    ...demoData.copy,
                    title: 'Unlock Premium Content',
                    subtitle: 'Get full access to all premium features with our subscription plans.',
                  }}
                  pricing={demoData.pricing}
                  onSelect={(tierIndex, isAnnual) => {
                    console.log(`Selected tier ${tierIndex}, isAnnual: ${isAnnual}`);
                  }}
                >
                  <div 
                    className="prose dark:prose-invert max-w-none p-8" 
                    dangerouslySetInnerHTML={{ __html: demoContent }}
                  />
                </PaywallFactory>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Integration Code
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              To add this paywall to your site, include the following code:
            </p>
            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-gray-800 dark:text-gray-300 whitespace-pre-wrap">
{`<!-- Add this to your site's <head> tag -->
<script src="https://your-deployment-url/paywall-split.js"></script>

<!-- Use this anywhere in your page to show the paywall -->
<div id="paywall-container" data-variant="a"></div>`}
              </pre>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              The script will automatically handle variant assignment, tracking, and rendering.
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <p>&copy; {new Date().getFullYear()} Paywall Conversion Optimizer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 