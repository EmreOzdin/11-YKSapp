import { responsiveSize, responsiveFontSize, breakpoints } from './responsive';

// Responsive theme configuration
export const responsiveTheme = {
  // Responsive spacing system
  spacing: {
    xs: responsiveSize(4),
    sm: responsiveSize(8),
    md: responsiveSize(16),
    lg: responsiveSize(24),
    xl: responsiveSize(32),
    xxl: responsiveSize(48),
    xxxl: responsiveSize(64),
  },

  // Responsive font sizes
  typography: {
    xs: responsiveFontSize(12),
    sm: responsiveFontSize(14),
    md: responsiveFontSize(16),
    lg: responsiveFontSize(18),
    xl: responsiveFontSize(20),
    xxl: responsiveFontSize(24),
    xxxl: responsiveFontSize(28),
    title: responsiveFontSize(32),
    display: responsiveFontSize(40),
  },

  // Responsive border radius
  borderRadius: {
    xs: responsiveSize(4),
    sm: responsiveSize(8),
    md: responsiveSize(12),
    lg: responsiveSize(16),
    xl: responsiveSize(20),
    xxl: responsiveSize(24),
    round: responsiveSize(50),
  },

  // Responsive shadows
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: responsiveSize(2) },
      shadowOpacity: 0.1,
      shadowRadius: responsiveSize(4),
      elevation: responsiveSize(2),
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: responsiveSize(4) },
      shadowOpacity: 0.15,
      shadowRadius: responsiveSize(8),
      elevation: responsiveSize(4),
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: responsiveSize(8) },
      shadowOpacity: 0.2,
      shadowRadius: responsiveSize(16),
      elevation: responsiveSize(8),
    },
  },

  // Responsive component sizes
  components: {
    button: {
      sm: {
        paddingVertical: responsiveSize(8),
        paddingHorizontal: responsiveSize(16),
        borderRadius: responsiveSize(8),
        fontSize: responsiveFontSize(14),
      },
      md: {
        paddingVertical: responsiveSize(12),
        paddingHorizontal: responsiveSize(24),
        borderRadius: responsiveSize(12),
        fontSize: responsiveFontSize(16),
      },
      lg: {
        paddingVertical: responsiveSize(16),
        paddingHorizontal: responsiveSize(32),
        borderRadius: responsiveSize(16),
        fontSize: responsiveFontSize(18),
      },
    },
    input: {
      sm: {
        paddingVertical: responsiveSize(8),
        paddingHorizontal: responsiveSize(12),
        borderRadius: responsiveSize(8),
        fontSize: responsiveFontSize(14),
      },
      md: {
        paddingVertical: responsiveSize(12),
        paddingHorizontal: responsiveSize(16),
        borderRadius: responsiveSize(12),
        fontSize: responsiveFontSize(16),
      },
      lg: {
        paddingVertical: responsiveSize(16),
        paddingHorizontal: responsiveSize(20),
        borderRadius: responsiveSize(16),
        fontSize: responsiveFontSize(18),
      },
    },
    card: {
      sm: {
        padding: responsiveSize(12),
        borderRadius: responsiveSize(8),
        margin: responsiveSize(8),
      },
      md: {
        padding: responsiveSize(16),
        borderRadius: responsiveSize(12),
        margin: responsiveSize(12),
      },
      lg: {
        padding: responsiveSize(20),
        borderRadius: responsiveSize(16),
        margin: responsiveSize(16),
      },
    },
    modal: {
      sm: {
        width: '80%',
        maxHeight: '60%',
        borderRadius: responsiveSize(16),
        padding: responsiveSize(20),
      },
      md: {
        width: '85%',
        maxHeight: '70%',
        borderRadius: responsiveSize(20),
        padding: responsiveSize(24),
      },
      lg: {
        width: '90%',
        maxHeight: '80%',
        borderRadius: responsiveSize(24),
        padding: responsiveSize(28),
      },
    },
  },

  // Responsive layout configurations
  layout: {
    container: {
      paddingHorizontal: responsiveSize(20),
      paddingVertical: responsiveSize(16),
    },
    screen: {
      paddingTop: responsiveSize(40),
      paddingBottom: responsiveSize(20),
    },
    header: {
      height: responsiveSize(60),
      paddingHorizontal: responsiveSize(20),
    },
    tabBar: {
      height: responsiveSize(70),
      paddingBottom: responsiveSize(10),
    },
  },

  // Responsive grid system
  grid: {
    columns: {
      1: { flex: 1 },
      2: { flex: 0.5, marginHorizontal: responsiveSize(4) },
      3: { flex: 0.33, marginHorizontal: responsiveSize(3) },
      4: { flex: 0.25, marginHorizontal: responsiveSize(2) },
    },
    gap: {
      xs: responsiveSize(4),
      sm: responsiveSize(8),
      md: responsiveSize(12),
      lg: responsiveSize(16),
      xl: responsiveSize(20),
    },
  },

  // Responsive breakpoints
  breakpoints,

  // Responsive utilities
  utils: {
    // Get responsive size based on breakpoint
    getResponsiveSize: (sizes: { [key: string]: number }) => {
      const screenWidth = breakpoints.md; // Default to medium
      if (screenWidth < breakpoints.sm) return sizes.xs || sizes.sm;
      if (screenWidth < breakpoints.md) return sizes.sm || sizes.md;
      if (screenWidth < breakpoints.lg) return sizes.md || sizes.lg;
      if (screenWidth < breakpoints.xl) return sizes.lg || sizes.xl;
      return sizes.xl || sizes.lg;
    },

    // Get responsive padding
    getPadding: (multiplier: number = 1) => ({
      paddingHorizontal: responsiveSize(20 * multiplier),
      paddingVertical: responsiveSize(16 * multiplier),
    }),

    // Get responsive margin
    getMargin: (multiplier: number = 1) => ({
      marginHorizontal: responsiveSize(20 * multiplier),
      marginVertical: responsiveSize(16 * multiplier),
    }),

    // Get responsive font size
    getFontSize: (baseSize: number, multiplier: number = 1) => 
      responsiveFontSize(baseSize * multiplier),

    // Get responsive spacing
    getSpacing: (baseSpacing: number, multiplier: number = 1) => 
      responsiveSize(baseSpacing * multiplier),
  },
};

// Responsive theme hook
export const useResponsiveTheme = () => {
  return responsiveTheme;
};

// Responsive theme provider
export const ResponsiveThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return children;
};

// Export individual theme parts
export const { spacing, typography, borderRadius, shadows, components, layout, grid, utils } = responsiveTheme;
