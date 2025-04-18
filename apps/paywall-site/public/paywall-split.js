/**
 * Paywall-Conversion-In-A-Box - Split Testing Script
 * v0.1.0
 * 
 * This lightweight script (<2KB) handles variant assignment and 
 * paywall rendering for A/B testing.
 */

(function() {
  'use strict';

  // Configuration (replace with actual deployment URL)
  const CONFIG = {
    apiEndpoint: window.PAYWALL_API_URL || 'https://your-deployment-url/api',
    cookieName: window.PAYWALL_COOKIE_NAME || 'paywall_variant',
    distribution: window.PAYWALL_DISTRIBUTION || '50,50',
    targetSelector: window.PAYWALL_CONTAINER || '#paywall-container',
    cookieExpiration: 30 // days
  };

  // Utility functions
  const utils = {
    setCookie: function(name, value, days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      document.cookie = name + '=' + value + '; expires=' + date.toUTCString() + '; path=/; SameSite=Strict';
    },
    
    getCookie: function(name) {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? match[2] : null;
    },
    
    removeCookie: function(name) {
      document.cookie = name + '=; Max-Age=-99999999; path=/';
    },
    
    loadScript: function(url, callback) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = url;
      
      script.onload = callback || function() {};
      
      document.head.appendChild(script);
    },
    
    request: function(url, method, data, callback) {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            callback(null, JSON.parse(xhr.responseText));
          } else {
            callback(new Error('Request failed'), null);
          }
        }
      };
      xhr.send(data ? JSON.stringify(data) : null);
    }
  };

  // Core functionality
  const PaywallSplit = {
    variant: null,
    
    init: function() {
      // Try to get variant from cookie or data attribute
      const containerEl = document.querySelector(CONFIG.targetSelector);
      
      if (!containerEl) {
        // No container found, nothing to do
        return;
      }
      
      // Check if variant is specified directly on container
      const dataVariant = containerEl.getAttribute('data-variant');
      
      if (dataVariant && ['a', 'b', 'c', 'd'].indexOf(dataVariant) !== -1) {
        this.variant = dataVariant;
      } else {
        // Check for cookie
        const cookieVariant = utils.getCookie(CONFIG.cookieName);
        
        if (cookieVariant && ['a', 'b', 'c', 'd'].indexOf(cookieVariant) !== -1) {
          this.variant = cookieVariant;
        } else {
          // Assign a variant based on distribution
          this.variant = this.assignVariant();
          utils.setCookie(CONFIG.cookieName, this.variant, CONFIG.cookieExpiration);
        }
      }
      
      // Mark the container with the variant
      containerEl.setAttribute('data-assigned-variant', this.variant);
      
      // Track impression
      this.trackImpression();
      
      // Load the appropriate paywall resources based on variant
      this.loadPaywallResources();
    },
    
    assignVariant: function() {
      const distribution = CONFIG.distribution.split(',').map(Number);
      const random = Math.random() * 100;
      let cumulativePercentage = 0;
      
      for (let i = 0; i < distribution.length; i++) {
        cumulativePercentage += distribution[i];
        if (random <= cumulativePercentage) {
          return String.fromCharCode(97 + i); // a, b, c, ...
        }
      }
      
      return 'a'; // Default fallback
    },
    
    trackImpression: function() {
      utils.request(CONFIG.apiEndpoint + '/events', 'POST', {
        type: 'impression',
        variant: this.variant,
        url: window.location.href,
        timestamp: new Date().toISOString()
      }, function(err) {
        if (err) {
          console.warn('Failed to track impression:', err);
        }
      });
    },
    
    trackConversion: function(planId) {
      utils.request(CONFIG.apiEndpoint + '/events', 'POST', {
        type: 'conversion',
        variant: this.variant,
        planId: planId,
        url: window.location.href,
        timestamp: new Date().toISOString()
      }, function(err) {
        if (err) {
          console.warn('Failed to track conversion:', err);
        }
      });
    },
    
    loadPaywallResources: function() {
      // Load the CSS for the paywall
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = CONFIG.apiEndpoint + '/styles/paywall-' + this.variant + '.css';
      document.head.appendChild(link);
      
      // Get the paywall content
      utils.request(CONFIG.apiEndpoint + '/variant', 'GET', null, function(err, data) {
        if (err) {
          console.error('Failed to load paywall content:', err);
          return;
        }
        
        const containerEl = document.querySelector(CONFIG.targetSelector);
        
        if (containerEl && data && data.html) {
          containerEl.innerHTML = data.html;
          
          // Set up conversion tracking on buttons
          const buttons = containerEl.querySelectorAll('button[data-plan-id]');
          buttons.forEach(function(button) {
            button.addEventListener('click', function() {
              const planId = this.getAttribute('data-plan-id');
              PaywallSplit.trackConversion(planId);
            });
          });
        }
      });
    }
  };
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      PaywallSplit.init();
    });
  } else {
    PaywallSplit.init();
  }
  
  // Export to global scope
  window.PaywallSplit = PaywallSplit;
})(); 