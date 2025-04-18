import React, { useState } from 'react';
import { Button, PricingCards, PricingToggle, PaywallOverlay } from './index';
import type { PricingTier } from './pricing-cards';

// Template A: "Starter vs Pro" toggle template
export interface TogglePaywallProps {
  title: string;
  subtitle: string;
  monthlyTiers: PricingTier[];
  yearlyTiers: PricingTier[];
  onSelect?: (tierIndex: number, isAnnual: boolean) => void;
}

export const TogglePaywall: React.FC<TogglePaywallProps> = ({
  title,
  subtitle,
  monthlyTiers,
  yearlyTiers,
  onSelect,
}) => {
  const [isAnnual, setIsAnnual] = useState(false);
  
  const handleToggle = () => {
    setIsAnnual(!isAnnual);
  };
  
  const handleSelect = (index: number) => {
    onSelect && onSelect(index, isAnnual);
  };
  
  // Prepare tier data with the select handler
  const tiers = (isAnnual ? yearlyTiers : monthlyTiers).map((tier, index) => ({
    ...tier,
    onSelect: () => handleSelect(index),
  }));
  
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:flex-col sm:align-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white sm:text-center">
          {title}
        </h1>
        <p className="mt-5 text-xl text-gray-500 dark:text-gray-400 sm:text-center">
          {subtitle}
        </p>
        <div className="relative mt-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 flex self-center">
          <PricingToggle
            leftLabel="Monthly"
            rightLabel="Yearly"
            isRight={isAnnual}
            onToggle={handleToggle}
          />
        </div>
        {isAnnual && (
          <p className="mt-3 text-sm text-green-500 sm:text-center">
            Save 20% with annual billing
          </p>
        )}
      </div>
      
      <PricingCards tiers={tiers} isAnnual={isAnnual} />
    </div>
  );
};

// Template B: Content-gate overlay with blur
export interface BlurOverlayPaywallProps {
  title: string;
  subtitle: string;
  blurIntensity?: number;
  ctaText?: string;
  featuredTier?: PricingTier;
  onCTAClick?: () => void;
  children: React.ReactNode;
}

export const BlurOverlayPaywall: React.FC<BlurOverlayPaywallProps> = ({
  title,
  subtitle,
  blurIntensity = 5,
  ctaText = 'Get Premium Access',
  featuredTier,
  onCTAClick,
  children,
}) => {
  return (
    <div className="relative">
      <PaywallOverlay
        isBlurred={true}
        blurIntensity={blurIntensity}
        ctaText={ctaText}
        onCtaClick={onCTAClick}
      >
        {children}
      </PaywallOverlay>
      
      {featuredTier && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg z-50">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{featuredTier.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {featuredTier.price}/{featuredTier.period} - {featuredTier.features[0]}
              </p>
            </div>
            <Button
              variant="primary"
              onClick={featuredTier.onSelect}
            >
              {featuredTier.ctaText}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

// Paywall Factory - Creates the right paywall component based on variant
export interface PaywallFactoryProps {
  variant: 'a' | 'b';
  copy: {
    title: string;
    subtitle: string;
    ctaText?: string;
  };
  pricing: {
    monthly: PricingTier[];
    yearly: PricingTier[];
  };
  onSelect?: (tierIndex: number, isAnnual: boolean) => void;
  children?: React.ReactNode;
}

export const PaywallFactory: React.FC<PaywallFactoryProps> = ({
  variant,
  copy,
  pricing,
  onSelect,
  children,
}) => {
  switch (variant) {
    case 'a':
      return (
        <TogglePaywall
          title={copy.title}
          subtitle={copy.subtitle}
          monthlyTiers={pricing.monthly}
          yearlyTiers={pricing.yearly}
          onSelect={onSelect}
        />
      );
    case 'b':
      return (
        <BlurOverlayPaywall
          title={copy.title}
          subtitle={copy.subtitle}
          ctaText={copy.ctaText}
          featuredTier={pricing.monthly[0]}
          onCTAClick={() => onSelect && onSelect(0, false)}
        >
          {children}
        </BlurOverlayPaywall>
      );
    default:
      return null;
  }
}; 