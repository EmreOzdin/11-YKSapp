import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Design base dimensions (iPhone 11 Pro - 375x812)
const baseWidth = 375;
const baseHeight = 812;

// Scale factor based on screen width
const scale = SCREEN_WIDTH / baseWidth;
const verticalScale = SCREEN_HEIGHT / baseHeight;

// Responsive font size
export const responsiveFontSize = (size: number): number => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

// Responsive width
export const responsiveWidth = (width: number): number => {
  return Math.round(PixelRatio.roundToNearestPixel(width * scale));
};

// Responsive height
export const responsiveHeight = (height: number): number => {
  return Math.round(PixelRatio.roundToNearestPixel(height * verticalScale));
};

// Responsive padding/margin
export const responsiveSize = (size: number): number => {
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

// Screen dimensions
export const screenWidth = SCREEN_WIDTH;
export const screenHeight = SCREEN_HEIGHT;

// Device type detection
export const isSmallDevice = SCREEN_WIDTH < 375;
export const isMediumDevice = SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414;
export const isLargeDevice = SCREEN_WIDTH >= 414;

// Platform specific adjustments
export const platformSelect = <T>(ios: T, android: T): T => {
  return Platform.select({ ios, android }) || ios;
};

// Safe area adjustments
export const getSafeAreaPadding = () => {
  return Platform.select({
    ios: { top: 44, bottom: 34 },
    android: { top: 24, bottom: 0 },
  }) || { top: 44, bottom: 34 };
};

// Responsive spacing
export const spacing = {
  xs: responsiveSize(4),
  sm: responsiveSize(8),
  md: responsiveSize(16),
  lg: responsiveSize(24),
  xl: responsiveSize(32),
  xxl: responsiveSize(48),
};

// Responsive font sizes
export const fontSize = {
  xs: responsiveFontSize(12),
  sm: responsiveFontSize(14),
  md: responsiveFontSize(16),
  lg: responsiveFontSize(18),
  xl: responsiveFontSize(20),
  xxl: responsiveFontSize(24),
  xxxl: responsiveFontSize(28),
  title: responsiveFontSize(32),
};

// Responsive border radius
export const borderRadius = {
  sm: responsiveSize(4),
  md: responsiveSize(8),
  lg: responsiveSize(12),
  xl: responsiveSize(16),
  xxl: responsiveSize(24),
};

// Responsive icon sizes
export const iconSize = {
  sm: responsiveSize(16),
  md: responsiveSize(20),
  lg: responsiveSize(24),
  xl: responsiveSize(32),
  xxl: responsiveSize(48),
  xxxl: responsiveSize(64),
};

// Responsive button sizes
export const buttonSize = {
  sm: {
    paddingVertical: responsiveSize(8),
    paddingHorizontal: responsiveSize(16),
    borderRadius: responsiveSize(8),
  },
  md: {
    paddingVertical: responsiveSize(12),
    paddingHorizontal: responsiveSize(24),
    borderRadius: responsiveSize(12),
  },
  lg: {
    paddingVertical: responsiveSize(16),
    paddingHorizontal: responsiveSize(32),
    borderRadius: responsiveSize(16),
  },
};

// Responsive input sizes
export const inputSize = {
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
};

// Responsive card sizes
export const cardSize = {
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
};

// Responsive modal sizes
export const modalSize = {
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
};

// Responsive grid system
export const gridSystem = {
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
};

// Responsive aspect ratios
export const aspectRatio = {
  square: 1,
  portrait: 3/4,
  landscape: 4/3,
  wide: 16/9,
  ultraWide: 21/9,
};

// Responsive breakpoints
export const breakpoints = {
  xs: 320,
  sm: 375,
  md: 414,
  lg: 768,
  xl: 1024,
  xxl: 1366,
};

// Device orientation helpers
export const isPortrait = () => SCREEN_HEIGHT > SCREEN_WIDTH;
export const isLandscape = () => SCREEN_WIDTH > SCREEN_HEIGHT;

// Responsive layout helpers
export const getResponsiveLayout = () => {
  if (SCREEN_WIDTH < breakpoints.sm) return 'xs';
  if (SCREEN_WIDTH < breakpoints.md) return 'sm';
  if (SCREEN_WIDTH < breakpoints.lg) return 'md';
  if (SCREEN_WIDTH < breakpoints.xl) return 'lg';
  return 'xl';
};

// Responsive padding/margin helpers
export const getResponsivePadding = (multiplier: number = 1) => ({
  paddingHorizontal: responsiveSize(20 * multiplier),
  paddingVertical: responsiveSize(16 * multiplier),
});

export const getResponsiveMargin = (multiplier: number = 1) => ({
  marginHorizontal: responsiveSize(20 * multiplier),
  marginVertical: responsiveSize(16 * multiplier),
}); 