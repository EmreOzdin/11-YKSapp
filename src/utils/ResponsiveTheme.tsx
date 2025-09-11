import React, { ReactNode, createContext, useContext } from 'react';
import { Platform } from 'react-native';
import {
    useAdaptiveFontSize,
    useAdaptiveSize,
    useAdaptiveSpacing,
    useBreakpoint,
    useDeviceType,
} from './useResponsive';

// Theme Context
interface ResponsiveThemeContextType {
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  typography: {
    h1: { fontSize: number; lineHeight: number; fontWeight: string };
    h2: { fontSize: number; lineHeight: number; fontWeight: string };
    h3: { fontSize: number; lineHeight: number; fontWeight: string };
    h4: { fontSize: number; lineHeight: number; fontWeight: string };
    body: { fontSize: number; lineHeight: number; fontWeight: string };
    caption: { fontSize: number; lineHeight: number; fontWeight: string };
    small: { fontSize: number; lineHeight: number; fontWeight: string };
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  shadows: {
    sm: any;
    md: any;
    lg: any;
  };
  components: {
    button: {
      sm: any;
      md: any;
      lg: any;
    };
    input: {
      sm: any;
      md: any;
      lg: any;
    };
    card: {
      sm: any;
      md: any;
      lg: any;
    };
  };
  layout: {
    headerHeight: number;
    tabBarHeight: number;
    safeAreaTop: number;
    safeAreaBottom: number;
  };
  grid: {
    columns: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
    };
    gap: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
    };
  };
  utils: {
    isTablet: boolean;
    isSmallDevice: boolean;
    isMediumDevice: boolean;
    isLargeDevice: boolean;
    currentBreakpoint: string;
  };
}

const ResponsiveThemeContext = createContext<ResponsiveThemeContextType | null>(null);

// Theme Provider Component
interface ResponsiveThemeProviderProps {
  children: ReactNode;
}

export const ResponsiveThemeProvider: React.FC<ResponsiveThemeProviderProps> = ({
  children,
}) => {
  const { isTablet, isSmallDevice, isMediumDevice, isLargeDevice } = useDeviceType();
  const { current } = useBreakpoint();

  // Responsive spacing
  const spacing = {
    xs: useAdaptiveSpacing(4),
    sm: useAdaptiveSpacing(8),
    md: useAdaptiveSpacing(16),
    lg: useAdaptiveSpacing(24),
    xl: useAdaptiveSpacing(32),
    xxl: useAdaptiveSpacing(48),
  };

  // Responsive typography
  const typography = {
    h1: {
      fontSize: useAdaptiveFontSize(isTablet ? 36 : 32),
      lineHeight: useAdaptiveSize(isTablet ? 44 : 40),
      fontWeight: 'bold',
    },
    h2: {
      fontSize: useAdaptiveFontSize(isTablet ? 28 : 24),
      lineHeight: useAdaptiveSize(isTablet ? 36 : 32),
      fontWeight: 'bold',
    },
    h3: {
      fontSize: useAdaptiveFontSize(isTablet ? 24 : 20),
      lineHeight: useAdaptiveSize(isTablet ? 32 : 28),
      fontWeight: '600',
    },
    h4: {
      fontSize: useAdaptiveFontSize(isTablet ? 20 : 18),
      lineHeight: useAdaptiveSize(isTablet ? 28 : 24),
      fontWeight: '600',
    },
    body: {
      fontSize: useAdaptiveFontSize(isTablet ? 18 : 16),
      lineHeight: useAdaptiveSize(isTablet ? 26 : 24),
      fontWeight: 'normal',
    },
    caption: {
      fontSize: useAdaptiveFontSize(isTablet ? 16 : 14),
      lineHeight: useAdaptiveSize(isTablet ? 22 : 20),
      fontWeight: 'normal',
    },
    small: {
      fontSize: useAdaptiveFontSize(isTablet ? 14 : 12),
      lineHeight: useAdaptiveSize(isTablet ? 18 : 16),
      fontWeight: 'normal',
    },
  };

  // Responsive border radius
  const borderRadius = {
    sm: useAdaptiveSize(4),
    md: useAdaptiveSize(8),
    lg: useAdaptiveSize(12),
    xl: useAdaptiveSize(16),
    xxl: useAdaptiveSize(24),
  };

  // Responsive shadows
  const shadows = {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  };

  // Responsive components
  const components = {
    button: {
      sm: {
        paddingVertical: useAdaptiveSpacing(8),
        paddingHorizontal: useAdaptiveSpacing(16),
        borderRadius: borderRadius.md,
        minHeight: useAdaptiveSize(36),
      },
      md: {
        paddingVertical: useAdaptiveSpacing(12),
        paddingHorizontal: useAdaptiveSpacing(24),
        borderRadius: borderRadius.md,
        minHeight: useAdaptiveSize(44),
      },
      lg: {
        paddingVertical: useAdaptiveSpacing(16),
        paddingHorizontal: useAdaptiveSpacing(32),
        borderRadius: borderRadius.lg,
        minHeight: useAdaptiveSize(52),
      },
    },
    input: {
      sm: {
        paddingVertical: useAdaptiveSpacing(8),
        paddingHorizontal: useAdaptiveSpacing(12),
        borderRadius: borderRadius.md,
        minHeight: useAdaptiveSize(36),
        fontSize: typography.caption.fontSize,
      },
      md: {
        paddingVertical: useAdaptiveSpacing(12),
        paddingHorizontal: useAdaptiveSpacing(16),
        borderRadius: borderRadius.md,
        minHeight: useAdaptiveSize(44),
        fontSize: typography.body.fontSize,
      },
      lg: {
        paddingVertical: useAdaptiveSpacing(16),
        paddingHorizontal: useAdaptiveSpacing(20),
        borderRadius: borderRadius.lg,
        minHeight: useAdaptiveSize(52),
        fontSize: typography.h4.fontSize,
      },
    },
    card: {
      sm: {
        padding: spacing.sm,
        borderRadius: borderRadius.md,
        margin: spacing.sm,
      },
      md: {
        padding: spacing.md,
        borderRadius: borderRadius.lg,
        margin: spacing.md,
      },
      lg: {
        padding: spacing.lg,
        borderRadius: borderRadius.xl,
        margin: spacing.lg,
      },
    },
  };

  // Responsive layout
  const layout = {
    headerHeight: useAdaptiveSize(isTablet ? 80 : 60),
    tabBarHeight: useAdaptiveSize(isTablet ? 80 : 60),
    safeAreaTop: Platform.select({
      ios: useAdaptiveSize(44),
      android: useAdaptiveSize(24),
      default: useAdaptiveSize(44),
    }),
    safeAreaBottom: Platform.select({
      ios: useAdaptiveSize(34),
      android: 0,
      default: useAdaptiveSize(34),
    }),
  };

  // Responsive grid
  const grid = {
    columns: {
      xs: 1,
      sm: isTablet ? 3 : 2,
      md: isTablet ? 4 : 2,
      lg: isTablet ? 6 : 3,
    },
    gap: {
      xs: spacing.xs,
      sm: spacing.sm,
      md: spacing.md,
      lg: spacing.lg,
    },
  };

  // Utils
  const utils = {
    isTablet,
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    currentBreakpoint: current,
  };

  const theme: ResponsiveThemeContextType = {
    spacing,
    typography,
    borderRadius,
    shadows,
    components,
    layout,
    grid,
    utils,
  };

  return (
    <ResponsiveThemeContext.Provider value={theme}>
      {children}
    </ResponsiveThemeContext.Provider>
  );
};

// Hook to use responsive theme
export const useResponsiveTheme = (): ResponsiveThemeContextType => {
  const context = useContext(ResponsiveThemeContext);
  if (!context) {
    throw new Error('useResponsiveTheme must be used within a ResponsiveThemeProvider');
  }
  return context;
};

// Responsive theme object for direct usage
export const responsiveTheme = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    h1: { fontSize: 32, lineHeight: 40, fontWeight: 'bold' },
    h2: { fontSize: 24, lineHeight: 32, fontWeight: 'bold' },
    h3: { fontSize: 20, lineHeight: 28, fontWeight: '600' },
    h4: { fontSize: 18, lineHeight: 24, fontWeight: '600' },
    body: { fontSize: 16, lineHeight: 24, fontWeight: 'normal' },
    caption: { fontSize: 14, lineHeight: 20, fontWeight: 'normal' },
    small: { fontSize: 12, lineHeight: 16, fontWeight: 'normal' },
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
  components: {
    button: {
      sm: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, minHeight: 36 },
      md: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, minHeight: 44 },
      lg: { paddingVertical: 16, paddingHorizontal: 32, borderRadius: 12, minHeight: 52 },
    },
    input: {
      sm: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, minHeight: 36, fontSize: 14 },
      md: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, minHeight: 44, fontSize: 16 },
      lg: { paddingVertical: 16, paddingHorizontal: 20, borderRadius: 12, minHeight: 52, fontSize: 18 },
    },
    card: {
      sm: { padding: 8, borderRadius: 8, margin: 8 },
      md: { padding: 16, borderRadius: 12, margin: 16 },
      lg: { padding: 20, borderRadius: 16, margin: 20 },
    },
  },
  layout: {
    headerHeight: 60,
    tabBarHeight: 60,
    safeAreaTop: Platform.select({ ios: 44, android: 24, default: 44 }),
    safeAreaBottom: Platform.select({ ios: 34, android: 0, default: 34 }),
  },
  grid: {
    columns: { xs: 1, sm: 2, md: 2, lg: 3 },
    gap: { xs: 4, sm: 8, md: 16, lg: 24 },
  },
  utils: {
    isTablet: false,
    isSmallDevice: false,
    isMediumDevice: false,
    isLargeDevice: false,
    currentBreakpoint: 'md',
  },
};
