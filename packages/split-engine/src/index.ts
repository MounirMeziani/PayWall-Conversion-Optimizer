import Cookies from 'js-cookie';
import { z } from 'zod';

export const VariantSchema = z.enum(['a', 'b', 'c', 'd']);
export type Variant = z.infer<typeof VariantSchema>;

export interface SplitEngineOptions {
  /**
   * The name of the cookie to store the variant in
   * @default 'paywall_variant'
   */
  cookieName?: string;
  
  /**
   * The distribution of variants as percentages, comma-separated
   * @default '50,50'
   * @example '33,33,34' for a three-way split
   */
  distribution?: string;
  
  /**
   * The expiration time of the cookie in days
   * @default 30
   */
  expiration?: number;
}

/**
 * SplitEngine - A tiny A/B testing engine
 * 
 * This class manages variant assignment for A/B testing with minimal overhead.
 * It uses cookies to persist the variant assignment across page views.
 */
export class SplitEngine {
  private cookieName: string;
  private distribution: number[];
  private expiration: number;
  
  constructor(options: SplitEngineOptions = {}) {
    this.cookieName = options.cookieName || 'paywall_variant';
    this.distribution = this.parseDistribution(options.distribution || '50,50');
    this.expiration = options.expiration || 30;
  }
  
  /**
   * Parse the distribution string into an array of percentages
   */
  private parseDistribution(distribution: string): number[] {
    return distribution.split(',').map(part => parseInt(part.trim(), 10));
  }
  
  /**
   * Get the variant for the current user
   * 
   * If the user already has a variant assigned (in a cookie), return that.
   * Otherwise, assign a new variant based on the distribution.
   */
  public getVariant(): Variant {
    // Check if user already has a variant assigned
    const existingVariant = Cookies.get(this.cookieName);
    if (existingVariant && this.isValidVariant(existingVariant)) {
      return existingVariant as Variant;
    }
    
    // Assign a new variant
    const newVariant = this.assignVariant();
    this.setVariantCookie(newVariant);
    return newVariant;
  }
  
  /**
   * Check if a variant is valid based on the schema
   */
  private isValidVariant(variant: string): boolean {
    try {
      VariantSchema.parse(variant);
      return true;
    } catch {
      return false;
    }
  }
  
  /**
   * Assign a variant based on the specified distribution
   */
  private assignVariant(): Variant {
    const random = Math.random() * 100;
    let cumulativePercentage = 0;
    
    for (let i = 0; i < this.distribution.length; i++) {
      cumulativePercentage += this.distribution[i];
      if (random <= cumulativePercentage) {
        // Return the letter corresponding to the index (a, b, c, etc.)
        return String.fromCharCode(97 + i) as Variant;
      }
    }
    
    // If somehow we get here, return 'a' as the default
    return 'a';
  }
  
  /**
   * Set the variant cookie
   */
  private setVariantCookie(variant: Variant): void {
    Cookies.set(this.cookieName, variant, {
      expires: this.expiration,
      sameSite: 'strict'
    });
  }
  
  /**
   * Manually set a specific variant
   */
  public setVariant(variant: Variant): void {
    if (!this.isValidVariant(variant)) {
      throw new Error(`Invalid variant: ${variant}`);
    }
    this.setVariantCookie(variant);
  }
  
  /**
   * Clear the variant cookie
   */
  public clearVariant(): void {
    Cookies.remove(this.cookieName);
  }
}

// Also export a default instance for convenience
const defaultSplitEngine = new SplitEngine();

export default defaultSplitEngine; 