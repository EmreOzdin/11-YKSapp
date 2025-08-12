import { responsiveSize, responsiveFontSize, responsiveWidth, responsiveHeight } from './responsive';

// Responsive constants for common UI elements
export const RESPONSIVE_CONSTANTS = {
  // Header and navigation
  HEADER_HEIGHT: responsiveSize(60),
  TAB_BAR_HEIGHT: responsiveSize(70),
  STATUS_BAR_HEIGHT: responsiveSize(44),
  SAFE_AREA_TOP: responsiveSize(44),
  SAFE_AREA_BOTTOM: responsiveSize(34),

  // Button sizes
  BUTTON_HEIGHT_SM: responsiveSize(36),
  BUTTON_HEIGHT_MD: responsiveSize(44),
  BUTTON_HEIGHT_LG: responsiveSize(52),
  BUTTON_RADIUS_SM: responsiveSize(8),
  BUTTON_RADIUS_MD: responsiveSize(12),
  BUTTON_RADIUS_LG: responsiveSize(16),

  // Input sizes
  INPUT_HEIGHT_SM: responsiveSize(36),
  INPUT_HEIGHT_MD: responsiveSize(44),
  INPUT_HEIGHT_LG: responsiveSize(52),
  INPUT_RADIUS_SM: responsiveSize(8),
  INPUT_RADIUS_MD: responsiveSize(12),
  INPUT_RADIUS_LG: responsiveSize(16),

  // Card sizes
  CARD_RADIUS_SM: responsiveSize(8),
  CARD_RADIUS_MD: responsiveSize(12),
  CARD_RADIUS_LG: responsiveSize(16),
  CARD_PADDING_SM: responsiveSize(12),
  CARD_PADDING_MD: responsiveSize(16),
  CARD_PADDING_LG: responsiveSize(20),

  // Modal sizes
  MODAL_RADIUS_SM: responsiveSize(16),
  MODAL_RADIUS_MD: responsiveSize(20),
  MODAL_RADIUS_LG: responsiveSize(24),
  MODAL_PADDING_SM: responsiveSize(20),
  MODAL_PADDING_MD: responsiveSize(24),
  MODAL_PADDING_LG: responsiveSize(28),

  // Icon sizes
  ICON_SIZE_XS: responsiveSize(12),
  ICON_SIZE_SM: responsiveSize(16),
  ICON_SIZE_MD: responsiveSize(20),
  ICON_SIZE_LG: responsiveSize(24),
  ICON_SIZE_XL: responsiveSize(32),
  ICON_SIZE_XXL: responsiveSize(48),

  // Avatar sizes
  AVATAR_SIZE_XS: responsiveSize(24),
  AVATAR_SIZE_SM: responsiveSize(32),
  AVATAR_SIZE_MD: responsiveSize(40),
  AVATAR_SIZE_LG: responsiveSize(48),
  AVATAR_SIZE_XL: responsiveSize(64),
  AVATAR_SIZE_XXL: responsiveSize(80),

  // Image sizes
  IMAGE_SIZE_XS: responsiveSize(32),
  IMAGE_SIZE_SM: responsiveSize(48),
  IMAGE_SIZE_MD: responsiveSize(64),
  IMAGE_SIZE_LG: responsiveSize(80),
  IMAGE_SIZE_XL: responsiveSize(96),
  IMAGE_SIZE_XXL: responsiveSize(120),

  // Spacing
  SPACING_XS: responsiveSize(4),
  SPACING_SM: responsiveSize(8),
  SPACING_MD: responsiveSize(16),
  SPACING_LG: responsiveSize(24),
  SPACING_XL: responsiveSize(32),
  SPACING_XXL: responsiveSize(48),

  // Margins
  MARGIN_XS: responsiveSize(4),
  MARGIN_SM: responsiveSize(8),
  MARGIN_MD: responsiveSize(16),
  MARGIN_LG: responsiveSize(24),
  MARGIN_XL: responsiveSize(32),
  MARGIN_XXL: responsiveSize(48),

  // Padding
  PADDING_XS: responsiveSize(4),
  PADDING_SM: responsiveSize(8),
  PADDING_MD: responsiveSize(16),
  PADDING_LG: responsiveSize(24),
  PADDING_XL: responsiveSize(32),
  PADDING_XXL: responsiveSize(48),

  // Border radius
  BORDER_RADIUS_XS: responsiveSize(4),
  BORDER_RADIUS_SM: responsiveSize(8),
  BORDER_RADIUS_MD: responsiveSize(12),
  BORDER_RADIUS_LG: responsiveSize(16),
  BORDER_RADIUS_XL: responsiveSize(20),
  BORDER_RADIUS_XXL: responsiveSize(24),
  BORDER_RADIUS_ROUND: responsiveSize(50),

  // Font sizes
  FONT_SIZE_XS: responsiveFontSize(12),
  FONT_SIZE_SM: responsiveFontSize(14),
  FONT_SIZE_MD: responsiveFontSize(16),
  FONT_SIZE_LG: responsiveFontSize(18),
  FONT_SIZE_XL: responsiveFontSize(20),
  FONT_SIZE_XXL: responsiveFontSize(24),
  FONT_SIZE_XXXL: responsiveFontSize(28),
  FONT_SIZE_TITLE: responsiveFontSize(32),
  FONT_SIZE_DISPLAY: responsiveFontSize(40),

  // Line heights
  LINE_HEIGHT_XS: responsiveFontSize(16),
  LINE_HEIGHT_SM: responsiveFontSize(18),
  LINE_HEIGHT_MD: responsiveFontSize(20),
  LINE_HEIGHT_LG: responsiveFontSize(22),
  LINE_HEIGHT_XL: responsiveFontSize(24),
  LINE_HEIGHT_XXL: responsiveFontSize(28),
  LINE_HEIGHT_XXXL: responsiveFontSize(32),
  LINE_HEIGHT_TITLE: responsiveFontSize(36),
  LINE_HEIGHT_DISPLAY: responsiveFontSize(44),

  // Shadow offsets
  SHADOW_OFFSET_SM: { width: 0, height: responsiveSize(2) },
  SHADOW_OFFSET_MD: { width: 0, height: responsiveSize(4) },
  SHADOW_OFFSET_LG: { width: 0, height: responsiveSize(8) },

  // Shadow radius
  SHADOW_RADIUS_SM: responsiveSize(4),
  SHADOW_RADIUS_MD: responsiveSize(8),
  SHADOW_RADIUS_LG: responsiveSize(16),

  // Elevation
  ELEVATION_SM: responsiveSize(2),
  ELEVATION_MD: responsiveSize(4),
  ELEVATION_LG: responsiveSize(8),

  // Z-index
  Z_INDEX_BASE: 1,
  Z_INDEX_OVERLAY: 100,
  Z_INDEX_MODAL: 200,
  Z_INDEX_TOOLTIP: 300,
  Z_INDEX_LOADING: 400,

  // Animation durations
  ANIMATION_DURATION_FAST: 200,
  ANIMATION_DURATION_NORMAL: 300,
  ANIMATION_DURATION_SLOW: 500,

  // Animation delays
  ANIMATION_DELAY_FAST: 50,
  ANIMATION_DELAY_NORMAL: 100,
  ANIMATION_DELAY_SLOW: 200,

  // Opacity values
  OPACITY_DISABLED: 0.6,
  OPACITY_PRESSED: 0.8,
  OPACITY_OVERLAY: 0.5,

  // Border widths
  BORDER_WIDTH_THIN: 1,
  BORDER_WIDTH_NORMAL: 2,
  BORDER_WIDTH_THICK: 3,

  // Grid columns
  GRID_COLUMNS_1: 1,
  GRID_COLUMNS_2: 2,
  GRID_COLUMNS_3: 3,
  GRID_COLUMNS_4: 4,

  // Grid gaps
  GRID_GAP_XS: responsiveSize(4),
  GRID_GAP_SM: responsiveSize(8),
  GRID_GAP_MD: responsiveSize(12),
  GRID_GAP_LG: responsiveSize(16),
  GRID_GAP_XL: responsiveSize(20),

  // Aspect ratios
  ASPECT_RATIO_SQUARE: 1,
  ASPECT_RATIO_PORTRAIT: 3/4,
  ASPECT_RATIO_LANDSCAPE: 4/3,
  ASPECT_RATIO_WIDE: 16/9,
  ASPECT_RATIO_ULTRA_WIDE: 21/9,

  // Screen dimensions
  SCREEN_WIDTH: responsiveWidth(375), // Base width
  SCREEN_HEIGHT: responsiveHeight(812), // Base height

  // Container widths
  CONTAINER_WIDTH_SM: responsiveWidth(320),
  CONTAINER_WIDTH_MD: responsiveWidth(375),
  CONTAINER_WIDTH_LG: responsiveWidth(414),
  CONTAINER_WIDTH_XL: responsiveWidth(768),

  // Container heights
  CONTAINER_HEIGHT_SM: responsiveHeight(568),
  CONTAINER_HEIGHT_MD: responsiveHeight(812),
  CONTAINER_HEIGHT_LG: responsiveHeight(896),
  CONTAINER_HEIGHT_XL: responsiveHeight(1024),

  // Touch target sizes
  TOUCH_TARGET_MIN: responsiveSize(44),
  TOUCH_TARGET_SM: responsiveSize(48),
  TOUCH_TARGET_MD: responsiveSize(56),
  TOUCH_TARGET_LG: responsiveSize(64),

  // Scroll indicators
  SCROLL_INDICATOR_SIZE: responsiveSize(4),
  SCROLL_INDICATOR_MARGIN: responsiveSize(8),

  // Loading indicators
  LOADING_INDICATOR_SIZE_SM: responsiveSize(20),
  LOADING_INDICATOR_SIZE_MD: responsiveSize(32),
  LOADING_INDICATOR_SIZE_LG: responsiveSize(48),

  // Progress bars
  PROGRESS_BAR_HEIGHT_SM: responsiveSize(4),
  PROGRESS_BAR_HEIGHT_MD: responsiveSize(6),
  PROGRESS_BAR_HEIGHT_LG: responsiveSize(8),

  // Dividers
  DIVIDER_HEIGHT: 1,
  DIVIDER_MARGIN: responsiveSize(16),

  // Badges
  BADGE_SIZE_SM: responsiveSize(16),
  BADGE_SIZE_MD: responsiveSize(20),
  BADGE_SIZE_LG: responsiveSize(24),
  BADGE_RADIUS_SM: responsiveSize(8),
  BADGE_RADIUS_MD: responsiveSize(10),
  BADGE_RADIUS_LG: responsiveSize(12),

  // Chips
  CHIP_HEIGHT_SM: responsiveSize(24),
  CHIP_HEIGHT_MD: responsiveSize(32),
  CHIP_HEIGHT_LG: responsiveSize(40),
  CHIP_RADIUS_SM: responsiveSize(12),
  CHIP_RADIUS_MD: responsiveSize(16),
  CHIP_RADIUS_LG: responsiveSize(20),

  // Tooltips
  TOOLTIP_PADDING: responsiveSize(8),
  TOOLTIP_RADIUS: responsiveSize(4),
  TOOLTIP_ARROW_SIZE: responsiveSize(8),

  // Dropdowns
  DROPDOWN_ITEM_HEIGHT: responsiveSize(44),
  DROPDOWN_MAX_HEIGHT: responsiveHeight(300),

  // Bottom sheets
  BOTTOM_SHEET_HANDLE_HEIGHT: responsiveSize(4),
  BOTTOM_SHEET_HANDLE_WIDTH: responsiveSize(40),
  BOTTOM_SHEET_MIN_HEIGHT: responsiveHeight(200),
  BOTTOM_SHEET_MAX_HEIGHT: responsiveHeight(600),

  // FAB (Floating Action Button)
  FAB_SIZE_SM: responsiveSize(40),
  FAB_SIZE_MD: responsiveSize(56),
  FAB_SIZE_LG: responsiveSize(64),
  FAB_MARGIN: responsiveSize(16),

  // Snackbars
  SNACKBAR_HEIGHT: responsiveSize(48),
  SNACKBAR_MARGIN: responsiveSize(16),
  SNACKBAR_RADIUS: responsiveSize(8),

  // Alerts
  ALERT_PADDING: responsiveSize(16),
  ALERT_RADIUS: responsiveSize(12),
  ALERT_BUTTON_HEIGHT: responsiveSize(44),

  // Tabs
  TAB_HEIGHT: responsiveSize(48),
  TAB_INDICATOR_HEIGHT: responsiveSize(2),
  TAB_PADDING: responsiveSize(16),

  // Segmented controls
  SEGMENTED_CONTROL_HEIGHT: responsiveSize(32),
  SEGMENTED_CONTROL_RADIUS: responsiveSize(16),

  // Switches
  SWITCH_WIDTH: responsiveSize(44),
  SWITCH_HEIGHT: responsiveSize(24),
  SWITCH_THUMB_SIZE: responsiveSize(20),

  // Sliders
  SLIDER_HEIGHT: responsiveSize(4),
  SLIDER_THUMB_SIZE: responsiveSize(20),
  SLIDER_TRACK_HEIGHT: responsiveSize(4),

  // Checkboxes
  CHECKBOX_SIZE_SM: responsiveSize(16),
  CHECKBOX_SIZE_MD: responsiveSize(20),
  CHECKBOX_SIZE_LG: responsiveSize(24),

  // Radio buttons
  RADIO_SIZE_SM: responsiveSize(16),
  RADIO_SIZE_MD: responsiveSize(20),
  RADIO_SIZE_LG: responsiveSize(24),

  // Steppers
  STEPPER_SIZE: responsiveSize(24),
  STEPPER_LINE_HEIGHT: responsiveSize(2),
  STEPPER_SPACING: responsiveSize(16),
};

// Export individual constants for easier access
export const {
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
} = RESPONSIVE_CONSTANTS;
