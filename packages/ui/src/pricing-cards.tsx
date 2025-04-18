import React from 'react';
import { Button } from './index';

export interface PricingTier {
  title: string;
  price: string;
  period?: string;
  features: string[];
  ctaText: string;
  highlighted?: boolean;
  onSelect?: () => void;
}

export interface PricingCardsProps {
  tiers: PricingTier[];
  isAnnual?: boolean;
}

export const PricingCards: React.FC<PricingCardsProps> = ({
  tiers,
  isAnnual = false,
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tiers.map((tier, index) => (
        <div
          key={index}
          className={`rounded-lg shadow-lg overflow-hidden ${
            tier.highlighted
              ? 'border-2 border-blue-500 dark:border-blue-400 transform scale-105'
              : 'border border-gray-200 dark:border-gray-700'
          }`}
        >
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{tier.title}</h3>
            <div className="mt-4 flex items-baseline">
              <span className="text-5xl font-extrabold text-gray-900 dark:text-white">{tier.price}</span>
              {tier.period && (
                <span className="ml-1 text-xl font-medium text-gray-500 dark:text-gray-400">
                  /{tier.period}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {isAnnual ? 'Billed annually' : 'Billed monthly'}
            </p>
            <ul className="mt-6 space-y-3">
              {tier.features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <svg
                    className="flex-shrink-0 h-6 w-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="ml-3 text-base text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button
                variant={tier.highlighted ? 'primary' : 'outline'}
                size="lg"
                className="w-full"
                onClick={tier.onSelect}
              >
                {tier.ctaText}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export interface ComparisonTableProps {
  features: {
    name: string;
    tiers: {
      [key: string]: boolean | string;
    };
  }[];
  tierNames: string[];
  onSelect?: (tierName: string) => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({
  features,
  tierNames,
  onSelect,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
              Feature
            </th>
            {tierNames.map((name, idx) => (
              <th
                key={idx}
                className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400"
              >
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
          {features.map((feature, featureIdx) => (
            <tr key={featureIdx} className={featureIdx % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}>
              <td className="py-4 px-6 text-sm font-medium text-gray-900 dark:text-white">
                {feature.name}
              </td>
              {tierNames.map((tierName, tierIdx) => (
                <td key={tierIdx} className="py-4 px-6 text-sm text-gray-500 dark:text-gray-400">
                  {typeof feature.tiers[tierName] === 'boolean' ? (
                    feature.tiers[tierName] ? (
                      <svg
                        className="h-5 w-5 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )
                  ) : (
                    feature.tiers[tierName]
                  )}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td className="py-4 px-6"></td>
            {tierNames.map((name, idx) => (
              <td key={idx} className="py-4 px-6">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onSelect && onSelect(name)}
                >
                  Choose {name}
                </Button>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}; 