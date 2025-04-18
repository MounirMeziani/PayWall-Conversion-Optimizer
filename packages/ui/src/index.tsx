import React from 'react';

// Theme context for light/dark mode
export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

export function useTheme(): ThemeContextType {
  return React.useContext(ThemeContext);
}

export const ThemeProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  
  React.useEffect(() => {
    // Check user preference from local storage or system
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  const toggleTheme = React.useCallback(() => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      if (newValue) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return newValue;
    });
  }, []);
  
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Button component
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
}) => {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-100',
    outline: 'bg-transparent border border-gray-300 hover:bg-gray-100 focus:ring-gray-500 dark:border-gray-600 dark:hover:bg-gray-800',
  };
  
  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Pricing toggle component
export interface PricingToggleProps {
  leftLabel: string;
  rightLabel: string;
  isRight: boolean;
  onToggle: () => void;
}

export const PricingToggle: React.FC<PricingToggleProps> = ({
  leftLabel,
  rightLabel,
  isRight,
  onToggle,
}) => {
  return (
    <div className="flex items-center justify-center space-x-3">
      <span className={`text-sm font-medium ${isRight ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
        {leftLabel}
      </span>
      <button
        type="button"
        className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-700"
        role="switch"
        aria-checked={isRight}
        onClick={onToggle}
      >
        <span
          className={`${
            isRight ? 'translate-x-5' : 'translate-x-0'
          } inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
      </button>
      <span className={`text-sm font-medium ${isRight ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
        {rightLabel}
      </span>
    </div>
  );
};

// PaywallOverlay component
export interface PaywallOverlayProps {
  children: React.ReactNode;
  isBlurred?: boolean;
  blurIntensity?: number;
  ctaText?: string;
  onCtaClick?: () => void;
}

export const PaywallOverlay: React.FC<PaywallOverlayProps> = ({
  children,
  isBlurred = true,
  blurIntensity = 5,
  ctaText = 'Unlock Content',
  onCtaClick,
}) => {
  return (
    <div className="relative">
      <div
        className={`${
          isBlurred ? `blur-[${blurIntensity}px] pointer-events-none` : ''
        } transition-all duration-300`}
      >
        {children}
      </div>
      {isBlurred && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 dark:bg-gray-900 dark:bg-opacity-70">
          <div className="text-center p-6 rounded-lg shadow-xl bg-white dark:bg-gray-800 max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Premium Content</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Subscribe to access this premium content and unlock all features.
            </p>
            <Button variant="primary" onClick={onCtaClick}>
              {ctaText}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

// ThemeToggle component
export const ThemeToggle: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
}; 