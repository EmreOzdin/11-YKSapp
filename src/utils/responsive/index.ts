// Main responsive utilities
export * from '../responsive';

// Responsive hooks
export * from '../useResponsive';

// Responsive components
export * from '../ResponsiveComponents';

// Responsive theme
export * from '../ResponsiveTheme';

// Responsive constants
export * from '../ResponsiveConstants';

// Re-export commonly used utilities for easier access
export {
  responsiveSize,
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
  screenWidth,
  screenHeight,
  isSmallDevice,
  isMediumDevice,
  isLargeDevice,
  spacing,
  fontSize,
  borderRadius,
  iconSize,
  buttonSize,
  inputSize,
  cardSize,
  modalSize,
  gridSystem,
  aspectRatio,
  breakpoints,
  platformSelect,
  getSafeAreaPadding,
  isPortrait,
  isLandscape,
  getResponsiveLayout,
  getResponsivePadding,
  getResponsiveMargin,
} from '../responsive';

// Re-export commonly used hooks
export {
  useScreenDimensions,
  useDeviceType,
  useBreakpoint,
  useOrientation,
  useAdaptiveSize,
  useAdaptiveFontSize,
  useAdaptiveSpacing,
  useAdaptiveWidth,
  useAdaptiveHeight,
  useResponsiveStyle,
  useGridColumns,
  useImageDimensions,
  useModalDimensions,
} from '../useResponsive';

// Re-export commonly used components
export {
  ResponsiveButton,
  ResponsiveInput,
  ResponsiveCard,
  ResponsiveModal,
  ResponsiveText,
  ResponsiveContainer,
  ResponsiveGrid,
} from '../ResponsiveComponents';

// Re-export commonly used theme
export {
  responsiveTheme,
  useResponsiveTheme,
  ResponsiveThemeProvider,
  spacing as themeSpacing,
  typography as themeTypography,
  borderRadius as themeBorderRadius,
  shadows as themeShadows,
  components as themeComponents,
  layout as themeLayout,
  grid as themeGrid,
  utils as themeUtils,
} from '../ResponsiveTheme';

// Re-export commonly used constants
export {
  RESPONSIVE_CONSTANTS,
  HEADER_HEIGHT,
  TAB_BAR_HEIGHT,
  BUTTON_HEIGHT_MD,
  INPUT_HEIGHT_MD,
  CARD_RADIUS_MD,
  ICON_SIZE_MD,
  SPACING_MD,
  FONT_SIZE_MD,
  BORDER_RADIUS_MD,
  SHADOW_RADIUS_MD,
  ELEVATION_MD,
  ANIMATION_DURATION_NORMAL,
  OPACITY_DISABLED,
  BORDER_WIDTH_NORMAL,
  GRID_COLUMNS_2,
  GRID_GAP_MD,
  ASPECT_RATIO_SQUARE,
  TOUCH_TARGET_MIN,
  LOADING_INDICATOR_SIZE_MD,
  PROGRESS_BAR_HEIGHT_MD,
  BADGE_SIZE_MD,
  CHIP_HEIGHT_MD,
  FAB_SIZE_MD,
  TAB_HEIGHT,
  SWITCH_WIDTH,
  CHECKBOX_SIZE_MD,
  RADIO_SIZE_MD,
} from '../ResponsiveConstants';
