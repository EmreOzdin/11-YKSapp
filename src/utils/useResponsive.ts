import { useEffect, useState } from 'react';
import { Dimensions, PixelRatio, Platform } from 'react-native';

// Screen dimensions hook
export const useScreenDimensions = () => {
  const [screenData, setScreenData] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onChange = (result: any) => {
      setScreenData(result.window);
    };

    const subscription = Dimensions.addEventListener('change', onChange);
    return () => subscription?.remove();
  }, []);

  return screenData;
};

// Device type hook
export const useDeviceType = () => {
  const { width, height } = useScreenDimensions();
  
  const isSmallDevice = width < 375;
  const isMediumDevice = width >= 375 && width < 414;
  const isLargeDevice = width >= 414;
  const isTablet = width >= 768;
  const isLandscape = width > height;
  const isPortrait = height > width;

  return {
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
    isTablet,
    isLandscape,
    isPortrait,
    width,
    height,
  };
};

// Breakpoint hook
export const useBreakpoint = () => {
  const { width } = useScreenDimensions();
  
  const breakpoints = {
    xs: 320,
    sm: 375,
    md: 414,
    lg: 768,
    xl: 1024,
    xxl: 1366,
  };

  const getCurrentBreakpoint = () => {
    if (width < breakpoints.sm) return 'xs';
    if (width < breakpoints.md) return 'sm';
    if (width < breakpoints.lg) return 'md';
    if (width < breakpoints.xl) return 'lg';
    if (width < breakpoints.xxl) return 'xl';
    return 'xxl';
  };

  return {
    current: getCurrentBreakpoint(),
    breakpoints,
    isXs: width < breakpoints.sm,
    isSm: width >= breakpoints.sm && width < breakpoints.md,
    isMd: width >= breakpoints.md && width < breakpoints.lg,
    isLg: width >= breakpoints.lg && width < breakpoints.xl,
    isXl: width >= breakpoints.xl && width < breakpoints.xxl,
    isXxl: width >= breakpoints.xxl,
  };
};

// Orientation hook
export const useOrientation = () => {
  const { width, height } = useScreenDimensions();
  
  const isPortrait = height > width;
  const isLandscape = width > height;
  
  return {
    isPortrait,
    isLandscape,
    orientation: isPortrait ? 'portrait' : 'landscape',
  };
};

// Adaptive size hook
export const useAdaptiveSize = (baseSize: number) => {
  const { width } = useScreenDimensions();
  const baseWidth = 375; // iPhone 11 Pro base width
  const scale = width / baseWidth;
  
  return Math.round(PixelRatio.roundToNearestPixel(baseSize * scale));
};

// Adaptive font size hook
export const useAdaptiveFontSize = (baseSize: number) => {
  const { width } = useScreenDimensions();
  const baseWidth = 375;
  const scale = width / baseWidth;
  const newSize = baseSize * scale;
  
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

// Adaptive spacing hook
export const useAdaptiveSpacing = (baseSpacing: number) => {
  const { width } = useScreenDimensions();
  const baseWidth = 375;
  const scale = width / baseWidth;
  
  return Math.round(PixelRatio.roundToNearestPixel(baseSpacing * scale));
};

// Adaptive width hook
export const useAdaptiveWidth = (baseWidth: number) => {
  const { width } = useScreenDimensions();
  const baseScreenWidth = 375;
  const scale = width / baseScreenWidth;
  
  return Math.round(PixelRatio.roundToNearestPixel(baseWidth * scale));
};

// Adaptive height hook
export const useAdaptiveHeight = (baseHeight: number) => {
  const { height } = useScreenDimensions();
  const baseScreenHeight = 812;
  const scale = height / baseScreenHeight;
  
  return Math.round(PixelRatio.roundToNearestPixel(baseHeight * scale));
};

// Responsive style hook
export const useResponsiveStyle = (styles: any) => {
  const { width, height } = useScreenDimensions();
  const baseWidth = 375;
  const baseHeight = 812;
  const scale = width / baseWidth;
  const verticalScale = height / baseHeight;

  const responsiveStyles: any = {};

  const processStyle = (style: any) => {
    if (typeof style === 'number') {
      return Math.round(PixelRatio.roundToNearestPixel(style * scale));
    }
    if (typeof style === 'object' && style !== null) {
      const processedStyle: any = {};
      for (const [key, value] of Object.entries(style)) {
        if (typeof value === 'number') {
          if (key.includes('height') || key.includes('top') || key.includes('bottom')) {
            processedStyle[key] = Math.round(PixelRatio.roundToNearestPixel(value * verticalScale));
          } else {
            processedStyle[key] = Math.round(PixelRatio.roundToNearestPixel(value * scale));
          }
        } else {
          processedStyle[key] = value;
        }
      }
      return processedStyle;
    }
    return style;
  };

  for (const [key, value] of Object.entries(styles)) {
    responsiveStyles[key] = processStyle(value);
  }

  return responsiveStyles;
};

// Grid columns hook
export const useGridColumns = (columns: number) => {
  const { width } = useScreenDimensions();
  const { isTablet } = useDeviceType();
  
  // Tablet'te daha fazla kolon göster
  const adjustedColumns = isTablet ? Math.min(columns * 2, 4) : columns;
  
  return {
    columns: adjustedColumns,
    itemWidth: (width - (adjustedColumns - 1) * 16) / adjustedColumns,
    gap: 16,
  };
};

// Image dimensions hook
export const useImageDimensions = (aspectRatio: number = 1) => {
  const { width } = useScreenDimensions();
  const { isTablet } = useDeviceType();
  
  const maxWidth = isTablet ? width * 0.6 : width * 0.8;
  const imageWidth = Math.min(maxWidth, 400);
  const imageHeight = imageWidth / aspectRatio;
  
  return {
    width: imageWidth,
    height: imageHeight,
    aspectRatio,
  };
};

// Modal dimensions hook
export const useModalDimensions = () => {
  const { width, height } = useScreenDimensions();
  const { isTablet } = useDeviceType();
  
  const modalWidth = isTablet ? width * 0.6 : width * 0.9;
  const modalHeight = isTablet ? height * 0.7 : height * 0.8;
  
  return {
    width: modalWidth,
    height: modalHeight,
    maxWidth: 500,
    maxHeight: 600,
  };
};
