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