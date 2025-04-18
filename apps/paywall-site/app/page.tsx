import Link from 'next/link';
import { Button, ThemeToggle } from 'ui';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Paywall Conversion Optimizer
          </h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/dashboard">
              <Button variant="primary">Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Increase Your Conversion Rate
            </h2>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500 dark:text-gray-400">
              Optimize your paywall with A/B testing and real-time analytics.
            </p>
            <div className="mt-10">
              <Link href="/demo">
                <Button size="lg" variant="primary">
                  View Demo
                </Button>
              </Link>
              <Link href="/docs" className="ml-4">
                <Button size="lg" variant="outline">
                  Documentation
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">A/B Testing</div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  Test different paywall variants to find the one that converts best.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">Analytics</div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  Track conversions, revenue, and user behavior in real-time.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">Easy Integration</div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  Add to your site with just a few lines of code.
                </p>
              </div>
            </div>
          </div>
        </section>
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