import React from 'react';
import Link from 'next/link';
import { Button, ThemeToggle } from 'ui';

// This would come from an API call in a real implementation
const demoData = {
  conversionRate: {
    a: 5.2,
    b: 7.8,
    diff: '+50%'
  },
  revenue: {
    monthly: '$6,300',
    annual: '$75,600',
    growth: '+23%'
  },
  impressions: {
    a: 12500,
    b: 12700,
    total: 25200
  },
  conversions: {
    a: 650,
    b: 990,
    total: 1640
  }
};

export default function Dashboard() {
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
          </div>
        </div>
      </header>

      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
                Dashboard
              </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <Button variant="outline" className="mr-4">
                Export CSV
              </Button>
              <Button variant="primary">
                Create New Test
              </Button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1 */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Conversion Rate Improvement
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-green-500">
                          {demoData.conversionRate.diff}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                <div className="text-sm">
                  <span className="font-medium text-gray-500 dark:text-gray-300">
                    Variant A: {demoData.conversionRate.a}% • Variant B: {demoData.conversionRate.b}%
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Monthly Recurring Revenue
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900 dark:text-white">
                          {demoData.revenue.monthly}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                <div className="text-sm">
                  <span className="font-medium text-green-500">
                    {demoData.revenue.growth} growth
                  </span>
                  <span className="text-gray-500 dark:text-gray-300"> from last month</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Total Impressions
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900 dark:text-white">
                          {demoData.impressions.total.toLocaleString()}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                <div className="text-sm">
                  <span className="font-medium text-gray-500 dark:text-gray-300">
                    A: {demoData.impressions.a.toLocaleString()} • B: {demoData.impressions.b.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Total Conversions
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900 dark:text-white">
                          {demoData.conversions.total.toLocaleString()}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                <div className="text-sm">
                  <span className="font-medium text-gray-500 dark:text-gray-300">
                    A: {demoData.conversions.a.toLocaleString()} • B: {demoData.conversions.b.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Waterfall Chart (Placeholder) */}
          <div className="mt-8">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                Revenue Waterfall
              </h3>
              <div className="mt-4 h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-end justify-around p-4">
                <div className="flex flex-col items-center">
                  <div className="waterfall-bar waterfall-total h-40 w-16 rounded-t-lg"></div>
                  <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">Previous</span>
                  <span className="font-bold text-gray-700 dark:text-gray-300">$5.1k</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="waterfall-bar waterfall-positive h-20 w-16 rounded-t-lg"></div>
                  <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">New</span>
                  <span className="font-bold text-gray-700 dark:text-gray-300">+$2.4k</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="waterfall-bar waterfall-positive h-12 w-16 rounded-t-lg"></div>
                  <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">Expansion</span>
                  <span className="font-bold text-gray-700 dark:text-gray-300">+$0.8k</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="waterfall-bar waterfall-negative h-8 w-16 rounded-t-lg"></div>
                  <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">Churn</span>
                  <span className="font-bold text-gray-700 dark:text-gray-300">-$0.6k</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="waterfall-bar waterfall-negative h-6 w-16 rounded-t-lg"></div>
                  <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">Contraction</span>
                  <span className="font-bold text-gray-700 dark:text-gray-300">-$0.4k</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="waterfall-bar waterfall-total h-48 w-16 rounded-t-lg"></div>
                  <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">Current</span>
                  <span className="font-bold text-gray-700 dark:text-gray-300">$7.3k</span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <span className="text-sm text-green-500 font-medium">+$2.2k MRR (+43%)</span>
                <span className="text-sm text-gray-500 dark:text-gray-400"> compared to previous month</span>
              </div>
            </div>
          </div>

          {/* A/B Test Comparison */}
          <div className="mt-8">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                  A/B Test Results
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                  Comparison between variant A (Starter vs Pro) and variant B (Content Blur)
                </p>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Metric
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Variant A
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Variant B
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Difference
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        Conversion Rate
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {demoData.conversionRate.a}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {demoData.conversionRate.b}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                        {demoData.conversionRate.diff}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        Impressions
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {demoData.impressions.a.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {demoData.impressions.b.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        +{(demoData.impressions.b - demoData.impressions.a).toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        Conversions
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {demoData.conversions.a.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {demoData.conversions.b.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                        +{(demoData.conversions.b - demoData.conversions.a).toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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