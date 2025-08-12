import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { 
  responsiveSize, 
  responsiveFontSize, 
  responsiveWidth, 
  responsiveHeight,
  breakpoints,
  isSmallDevice,
  isMediumDevice,
  isLargeDevice,
  screenWidth,
  screenHeight
} from './responsive';

// Responsive hook for screen dimensions
export const useScreenDimensions = () => {
  const [dimensions, setDimensions] = useState({
    width: screenWidth,
    height: screenHeight,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({
        width: window.width,
        height: window.height,
      });
    });

    return () => subscription?.remove();
  }, []);

  return dimensions;
};

// Responsive hook for device type
export const useDeviceType = () => {
  return {
    isSmall: isSmallDevice,
    isMedium: isMediumDevice,
    isLarge: isLargeDevice,
  };
};

// Responsive hook for breakpoints
export const useBreakpoint = () => {
  const { width } = useScreenDimensions();
  
  if (width < breakpoints.sm) return 'xs';
  if (width < breakpoints.md) return 'sm';
  if (width < breakpoints.lg) return 'md';
  if (width < breakpoints.xl) return 'lg';
  return 'xl';
};

// Responsive hook for orientation
export const useOrientation = () => {
  const { width, height } = useScreenDimensions();
  return width > height ? 'landscape' : 'portrait';
};

// Responsive hook for adaptive sizing
export const useAdaptiveSize = (baseSize: number, multiplier: number = 1) => {
  const deviceType = useDeviceType();
  
  if (deviceType.isSmall) return baseSize * multiplier * 0.8;
  if (deviceType.isMedium) return baseSize * multiplier;
  if (deviceType.isLarge) return baseSize * multiplier * 1.2;
  
  return baseSize * multiplier;
};

// Responsive hook for adaptive font size
export const useAdaptiveFontSize = (baseSize: number, multiplier: number = 1) => {
  const deviceType = useDeviceType();
  
  if (deviceType.isSmall) return responsiveFontSize(baseSize * multiplier * 0.9);
  if (deviceType.isMedium) return responsiveFontSize(baseSize * multiplier);
  if (deviceType.isLarge) return responsiveFontSize(baseSize * multiplier * 1.1);
  
  return responsiveFontSize(baseSize * multiplier);
};

// Responsive hook for adaptive spacing
export const useAdaptiveSpacing = (baseSpacing: number, multiplier: number = 1) => {
  const deviceType = useDeviceType();
  
  if (deviceType.isSmall) return responsiveSize(baseSpacing * multiplier * 0.8);
  if (deviceType.isMedium) return responsiveSize(baseSpacing * multiplier);
  if (deviceType.isLarge) return responsiveSize(baseSpacing * multiplier * 1.2);
  
  return responsiveSize(baseSpacing * multiplier);
};

// Responsive hook for adaptive width
export const useAdaptiveWidth = (baseWidth: number, multiplier: number = 1) => {
  const deviceType = useDeviceType();
  
  if (deviceType.isSmall) return responsiveWidth(baseWidth * multiplier * 0.8);
  if (deviceType.isMedium) return responsiveWidth(baseWidth * multiplier);
  if (deviceType.isLarge) return responsiveWidth(baseWidth * multiplier * 1.2);
  
  return responsiveWidth(baseWidth * multiplier);
};

// Responsive hook for adaptive height
export const useAdaptiveHeight = (baseHeight: number, multiplier: number = 1) => {
  const deviceType = useDeviceType();
  
  if (deviceType.isSmall) return responsiveHeight(baseHeight * multiplier * 0.8);
  if (deviceType.isMedium) return responsiveHeight(baseHeight * multiplier);
  if (deviceType.isLarge) return responsiveHeight(baseHeight * multiplier * 1.2);
  
  return responsiveHeight(baseHeight * multiplier);
};

// Responsive hook for conditional styling
export const useResponsiveStyle = (styles: {
  xs?: any;
  sm?: any;
  md?: any;
  lg?: any;
  xl?: any;
}) => {
  const breakpoint = useBreakpoint();
  return styles[breakpoint as keyof typeof styles] || styles.md || {};
};

// Responsive hook for grid columns
export const useGridColumns = (columns: number) => {
  const breakpoint = useBreakpoint();
  
  const columnMap: { [key: string]: number } = {
    xs: Math.max(1, Math.floor(columns * 0.5)),
    sm: Math.max(1, Math.floor(columns * 0.75)),
    md: columns,
    lg: Math.min(columns + 1, 6),
    xl: Math.min(columns + 2, 8),
  };
  
  return columnMap[breakpoint] || columns;
};

// Responsive hook for image dimensions
export const useImageDimensions = (aspectRatio: number = 1) => {
  const { width } = useScreenDimensions();
  const deviceType = useDeviceType();
  
  let imageWidth = width * 0.8;
  
  if (deviceType.isSmall) imageWidth = width * 0.9;
  if (deviceType.isLarge) imageWidth = width * 0.7;
  
  return {
    width: imageWidth,
    height: imageWidth / aspectRatio,
  };
};

// Responsive hook for modal dimensions
export const useModalDimensions = () => {
  const { width, height } = useScreenDimensions();
  const deviceType = useDeviceType();
  
  let modalWidth = width * 0.85;
  let modalHeight = height * 0.7;
  
  if (deviceType.isSmall) {
    modalWidth = width * 0.95;
    modalHeight = height * 0.8;
  }
  
  if (deviceType.isLarge) {
    modalWidth = width * 0.7;
    modalHeight = height * 0.6;
  }
  
  return {
    width: modalWidth,
    height: modalHeight,
  };
};
