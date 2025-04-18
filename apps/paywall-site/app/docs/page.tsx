import React from 'react';
import Link from 'next/link';
import { Button, ThemeToggle } from 'ui';

export default function DocsPage() {
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
          <div className="prose dark:prose-invert max-w-none">
            <h1>Documentation</h1>
            
            <h2 id="getting-started">Getting Started</h2>
            <p>
              Welcome to the Paywall Conversion Optimizer documentation. This guide will help you
              implement and customize the paywall system on your website.
            </p>

            <h3>Installation</h3>
            <p>
              To add the paywall to your website, you need to include the paywall script in your HTML:
            </p>
            
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              {`<!-- Add this to your site's <head> tag -->
<script src="https://your-deployment-url/paywall-split.js"></script>

<!-- Use this anywhere in your page to show the paywall -->
<div id="paywall-container" data-variant="a"></div>`}
            </pre>

            <h3>Configuration</h3>
            <p>
              You can configure the paywall script by setting global variables before loading the script:
            </p>

            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              {`<script>
  window.PAYWALL_API_URL = 'https://your-api-url.com';
  window.PAYWALL_COOKIE_NAME = 'custom_cookie_name';
  window.PAYWALL_DISTRIBUTION = '40,60'; // 40% variant A, 60% variant B
  window.PAYWALL_CONTAINER = '#custom-paywall-container';
</script>
<script src="https://your-deployment-url/paywall-split.js"></script>`}
            </pre>

            <h2 id="variants">Paywall Variants</h2>
            
            <h3>Variant A: Pricing Toggle</h3>
            <p>
              This variant shows a pricing table with a toggle between monthly and yearly billing.
              It's ideal for SaaS products with different subscription tiers.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <p className="font-mono text-sm">
                &lt;div id="paywall-container" data-variant="a"&gt;&lt;/div&gt;
              </p>
            </div>

            <h3>Variant B: Content Blur</h3>
            <p>
              This variant blurs the content and shows an overlay prompting the user to subscribe.
              It's ideal for content websites, blogs, or any site with gated premium content.
            </p>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <p className="font-mono text-sm">
                &lt;div id="paywall-container" data-variant="b"&gt;
                  &lt;!-- Your premium content here --&gt;
                  &lt;h2&gt;Premium Article&lt;/h2&gt;
                  &lt;p&gt;This content will be blurred until the user subscribes.&lt;/p&gt;
                &lt;/div&gt;
              </p>
            </div>

            <h2 id="api-reference">API Reference</h2>
            
            <h3>JavaScript API</h3>
            <p>
              The paywall script provides a JavaScript API that you can use to control the paywall programmatically:
            </p>

            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              {`// Get the current variant
const variant = window.PaywallSplit.variant;

// Track a conversion event
window.PaywallSplit.trackConversion('plan_id');

// Manually assign a variant (overrides automatic assignment)
window.PaywallSplit.setVariant('b');`}
            </pre>

            <h3>Server API Endpoints</h3>
            <p>
              The following API endpoints are available for server-side integration:
            </p>

            <table className="min-w-full border-separate">
              <thead>
                <tr>
                  <th className="px-4 py-2 border border-gray-300 dark:border-gray-700">Endpoint</th>
                  <th className="px-4 py-2 border border-gray-300 dark:border-gray-700">Method</th>
                  <th className="px-4 py-2 border border-gray-300 dark:border-gray-700">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">/events</td>
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">POST</td>
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Track impression and conversion events</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">/variant</td>
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">GET</td>
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Get variant content</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">/webhook</td>
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">POST</td>
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">Stripe webhook handler</td>
                </tr>
              </tbody>
            </table>

            <h2 id="customization">Customization</h2>
            
            <h3>Styling</h3>
            <p>
              You can customize the appearance of the paywall by overriding the CSS classes:
            </p>

            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              {`/* Custom styles for Variant A */
.paywall-variant-a {
  background-color: #f0f9ff;
  border-radius: 1rem;
}

.paywall-variant-a h2 {
  color: #0369a1;
}

/* Custom styles for Variant B */
.paywall-variant-b .blurred-content {
  backdrop-filter: blur(10px);
}

.paywall-variant-b button {
  background-color: #0369a1;
}`}
            </pre>

            <h3>Custom Variants</h3>
            <p>
              You can create custom variants by modifying the variant JSON data. See the API documentation
              for more details on how to create and load custom variants.
            </p>

            <h2 id="analytics">Analytics & Reporting</h2>
            
            <p>
              The dashboard provides detailed analytics on your paywall performance, including:
            </p>

            <ul>
              <li>Conversion rates by variant</li>
              <li>Revenue metrics (MRR, ARR, AOV)</li>
              <li>Revenue waterfall charts</li>
              <li>User behavior and engagement data</li>
            </ul>

            <p>
              You can also export this data as CSV for further analysis in your preferred tools.
            </p>

            <h2 id="webhooks">Webhooks</h2>
            
            <p>
              The system supports webhooks to Slack and Discord for real-time conversion notifications.
              Configure them in your environment variables:
            </p>

            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              {`# Webhooks
SLACK_WEBHOOK_URL="https://hooks.slack.com/services/..."
DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/..."`}
            </pre>

            <h2 id="support">Support</h2>
            
            <p>
              If you need help implementing or customizing the paywall, please:
            </p>

            <ul>
              <li>Check out the <Link href="/demo" className="text-blue-600 dark:text-blue-400">demo examples</Link></li>
              <li>Refer to our <Link href="#api-reference" className="text-blue-600 dark:text-blue-400">API reference</Link></li>
              <li>Open an issue on our GitHub repository</li>
            </ul>
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