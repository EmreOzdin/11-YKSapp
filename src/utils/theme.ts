import { Platform } from 'react-native';
import {
  borderRadius,
  fontSize,
  iconSize,
  isMediumDevice,
  isSmallDevice,
  spacing,
} from './responsive';

export const colors = {
  primary: '#4F5DFF',
  primaryLight: '#6c47ff',
  secondary: '#1877f2',
  accent: '#ffd700',
  success: '#28a745',
  warning: '#ffc107',
  error: '#ff4757',
  info: '#17a2b8',

  // Background colors
  background: '#ffffff',
  backgroundSecondary: '#f8fafd',
  backgroundTertiary: '#e0f2fe',

  // Text colors
  textPrimary: '#22223b',
  textSecondary: '#4F5D75',
  textTertiary: '#888888',
  textLight: '#cccccc',
  textWhite: '#ffffff',

  // Border colors
  border: '#e0e0e0',
  borderLight: '#f2f2f2',

  // Card colors
  cardBackground: '#ffffff',
  cardShadow: 'rgba(0, 0, 0, 0.1)',

  // Gradient colors
  gradients: {
    blue: ['#228be6', '#6ee7b7'],
    purple: ['#6c47ff', '#b983ff'],
    orange: ['#f7b731', '#ffb347'],
    pink: ['#ff6b81', '#ffb6b9'],
    green: ['#28a745', '#6ee7b7'],
    red: ['#ff4757', '#ff6b6b'],
    teal: ['#17a2b8', '#6ee7b7'],
  },
};

export const shadows = {
  small: {
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const typography = {
  h1: {
    fontSize: fontSize.xxxl,
    fontWeight: 'bold' as const,
    color: colors.textPrimary,
    lineHeight: fontSize.xxxl * 1.3,
  },
  h2: {
    fontSize: fontSize.xxl,
    fontWeight: 'bold' as const,
    color: colors.textPrimary,
    lineHeight: fontSize.xxl * 1.3,
  },
  h3: {
    fontSize: fontSize.xl,
    fontWeight: '600' as const,
    color: colors.textPrimary,
    lineHeight: fontSize.xl * 1.3,
  },
  body: {
    fontSize: fontSize.md,
    fontWeight: 'normal' as const,
    color: colors.textSecondary,
    lineHeight: fontSize.md * 1.5,
  },
  bodySmall: {
    fontSize: fontSize.sm,
    fontWeight: 'normal' as const,
    color: colors.textTertiary,
    lineHeight: fontSize.sm * 1.4,
  },
  caption: {
    fontSize: fontSize.xs,
    fontWeight: 'normal' as const,
    color: colors.textTertiary,
    lineHeight: fontSize.xs * 1.3,
  },
  button: {
    fontSize: fontSize.md,
    fontWeight: 'bold' as const,
    color: colors.textWhite,
  },
};

export const layout = {
  // Container styles
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'ios' ? 44 : 24,
  },

  // Card styles
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.small,
  },

  // Button styles
  button: {
    primary: {
      backgroundColor: colors.primary,
      borderRadius: borderRadius.xl,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      ...shadows.small,
    },
    secondary: {
      backgroundColor: colors.background,
      borderWidth: 1.5,
      borderColor: colors.primary,
      borderRadius: borderRadius.xl,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.xl,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: borderRadius.md,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    },
  },

  // Input styles
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },

  // Grid styles
  grid: {
    container: {
      flexDirection: 'row' as const,
      flexWrap: 'wrap' as const,
      justifyContent: 'space-between',
    },
    item: {
      width: isSmallDevice ? '48%' : isMediumDevice ? '31%' : '23%',
      marginBottom: spacing.md,
    },
  },
};

// Responsive adjustments based on device size
export const responsiveLayout = {
  // Header adjustments
  header: {
    height: isSmallDevice ? 56 : isMediumDevice ? 64 : 72,
    paddingHorizontal: isSmallDevice ? spacing.md : spacing.lg,
  },

  // Card adjustments
  card: {
    padding: isSmallDevice ? spacing.sm : spacing.md,
    marginHorizontal: isSmallDevice ? spacing.sm : spacing.md,
  },

  // Button adjustments
  button: {
    paddingVertical: isSmallDevice ? spacing.sm : spacing.md,
    paddingHorizontal: isSmallDevice ? spacing.md : spacing.lg,
  },

  // Grid adjustments
  grid: {
    columns: isSmallDevice ? 2 : isMediumDevice ? 3 : 4,
    spacing: isSmallDevice ? spacing.sm : spacing.md,
  },
};

export default {
  colors,
  shadows,
  typography,
  layout,
  responsiveLayout,
  spacing,
  fontSize,
  borderRadius,
  iconSize,
};
