import React from 'react';
import {
    Modal,
    ModalProps,
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TextStyle,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
    ViewStyle,
} from 'react-native';
import { colors } from './theme';
import {
    useAdaptiveFontSize,
    useAdaptiveSize,
    useAdaptiveSpacing,
    useBreakpoint,
    useDeviceType,
    useModalDimensions,
} from './useResponsive';

// Responsive Button Component
interface ResponsiveButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
}

export const ResponsiveButton: React.FC<ResponsiveButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  style,
  ...props
}) => {
  const { isTablet } = useDeviceType();
  const { isXs } = useBreakpoint();
  
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: useAdaptiveSize(8),
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    // Size variations
    const sizeStyles = {
      sm: {
        paddingVertical: useAdaptiveSpacing(8),
        paddingHorizontal: useAdaptiveSpacing(16),
        minHeight: useAdaptiveSize(36),
      },
      md: {
        paddingVertical: useAdaptiveSpacing(12),
        paddingHorizontal: useAdaptiveSpacing(24),
        minHeight: useAdaptiveSize(44),
      },
      lg: {
        paddingVertical: useAdaptiveSpacing(16),
        paddingHorizontal: useAdaptiveSpacing(32),
        minHeight: useAdaptiveSize(52),
      },
    };

    // Variant styles
    const variantStyles = {
      primary: {
        backgroundColor: colors.primary,
      },
      secondary: {
        backgroundColor: colors.secondary,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.primary,
      },
      ghost: {
        backgroundColor: 'transparent',
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...(fullWidth && { width: '100%' }),
      ...(isTablet && { minHeight: sizeStyles[size].minHeight + 8 }),
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: '600',
      textAlign: 'center',
    };

    const sizeStyles = {
      sm: { fontSize: useAdaptiveFontSize(14) },
      md: { fontSize: useAdaptiveFontSize(16) },
      lg: { fontSize: useAdaptiveFontSize(18) },
    };

    const variantStyles = {
      primary: { color: colors.background },
      secondary: { color: colors.background },
      outline: { color: colors.primary },
      ghost: { color: colors.primary },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      activeOpacity={0.7}
      disabled={loading}
      {...props}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};

// Responsive Input Component
interface ResponsiveInputProps extends TextInputProps {
  label?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const ResponsiveInput: React.FC<ResponsiveInputProps> = ({
  label,
  error,
  size = 'md',
  fullWidth = false,
  style,
  ...props
}) => {
  const { isTablet } = useDeviceType();
  
  const getInputStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderWidth: 1,
      borderColor: error ? colors.error : colors.border,
      borderRadius: useAdaptiveSize(8),
      backgroundColor: colors.background,
    };

    const sizeStyles = {
      sm: {
        paddingVertical: useAdaptiveSpacing(8),
        paddingHorizontal: useAdaptiveSpacing(12),
        minHeight: useAdaptiveSize(36),
      },
      md: {
        paddingVertical: useAdaptiveSpacing(12),
        paddingHorizontal: useAdaptiveSpacing(16),
        minHeight: useAdaptiveSize(44),
      },
      lg: {
        paddingVertical: useAdaptiveSpacing(16),
        paddingHorizontal: useAdaptiveSpacing(20),
        minHeight: useAdaptiveSize(52),
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...(fullWidth && { width: '100%' }),
      ...(isTablet && { minHeight: sizeStyles[size].minHeight + 8 }),
    };
  };

  const getTextStyle = (): TextStyle => {
    const sizeStyles = {
      sm: { fontSize: useAdaptiveFontSize(14) },
      md: { fontSize: useAdaptiveFontSize(16) },
      lg: { fontSize: useAdaptiveFontSize(18) },
    };

    return {
      ...sizeStyles[size],
      color: colors.textPrimary,
    };
  };

  return (
    <View style={fullWidth ? { width: '100%' } : undefined}>
      {label && (
        <Text style={[styles.label, { fontSize: useAdaptiveFontSize(14) }]}>
          {label}
        </Text>
      )}
      <TextInput
        style={[getInputStyle(), getTextStyle(), style]}
        placeholderTextColor={colors.textSecondary}
        {...props}
      />
      {error && (
        <Text style={[styles.errorText, { fontSize: useAdaptiveFontSize(12) }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

// Responsive Card Component
interface ResponsiveCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: boolean;
  fullWidth?: boolean;
}

export const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  children,
  style,
  padding = 'md',
  shadow = true,
  fullWidth = false,
}) => {
  const { isTablet } = useDeviceType();
  
  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: colors.cardBackground,
      borderRadius: useAdaptiveSize(12),
      borderWidth: 1,
      borderColor: colors.border,
    };

    const paddingStyles = {
      sm: { padding: useAdaptiveSpacing(12) },
      md: { padding: useAdaptiveSpacing(16) },
      lg: { padding: useAdaptiveSpacing(20) },
    };

    const shadowStyle = shadow ? {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    } : {};

    return {
      ...baseStyle,
      ...paddingStyles[padding],
      ...shadowStyle,
      ...(fullWidth && { width: '100%' }),
      ...(isTablet && { borderRadius: useAdaptiveSize(16) }),
    };
  };

  return <View style={[getCardStyle(), style]}>{children}</View>;
};

// Responsive Modal Component
interface ResponsiveModalProps extends ModalProps {
  children: React.ReactNode;
  title?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
}

export const ResponsiveModal: React.FC<ResponsiveModalProps> = ({
  children,
  title,
  showCloseButton = true,
  onClose,
  ...props
}) => {
  const { isTablet } = useDeviceType();
  const modalDimensions = useModalDimensions();
  
  const getModalStyle = (): ViewStyle => {
    return {
      backgroundColor: colors.background,
      borderRadius: useAdaptiveSize(16),
      padding: useAdaptiveSpacing(24),
      margin: useAdaptiveSpacing(20),
      minWidth: modalDimensions.width,
      maxWidth: modalDimensions.maxWidth,
      maxHeight: modalDimensions.maxHeight,
      ...(isTablet && { borderRadius: useAdaptiveSize(20) }),
    };
  };

  return (
    <Modal transparent animationType="fade" {...props}>
      <View style={styles.modalOverlay}>
        <View style={getModalStyle()}>
          {title && (
            <Text style={[styles.modalTitle, { fontSize: useAdaptiveFontSize(20) }]}>
              {title}
            </Text>
          )}
          {children}
        </View>
      </View>
    </Modal>
  );
};

// Responsive Text Component
interface ResponsiveTextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'small';
  color?: string;
  style?: TextStyle;
  numberOfLines?: number;
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  variant = 'body',
  color = colors.textPrimary,
  style,
  ...props
}) => {
  const { isTablet } = useDeviceType();
  
  const getTextStyle = (): TextStyle => {
    const variantStyles = {
      h1: {
        fontSize: useAdaptiveFontSize(32),
        fontWeight: 'bold' as const,
        lineHeight: useAdaptiveSize(40),
      },
      h2: {
        fontSize: useAdaptiveFontSize(24),
        fontWeight: 'bold' as const,
        lineHeight: useAdaptiveSize(32),
      },
      h3: {
        fontSize: useAdaptiveFontSize(20),
        fontWeight: '600' as const,
        lineHeight: useAdaptiveSize(28),
      },
      body: {
        fontSize: useAdaptiveFontSize(16),
        lineHeight: useAdaptiveSize(24),
      },
      caption: {
        fontSize: useAdaptiveFontSize(14),
        lineHeight: useAdaptiveSize(20),
      },
      small: {
        fontSize: useAdaptiveFontSize(12),
        lineHeight: useAdaptiveSize(16),
      },
    };

    return {
      ...variantStyles[variant],
      color,
      ...(isTablet && variantStyles[variant].fontSize && {
        fontSize: variantStyles[variant].fontSize! + 2,
      }),
    };
  };

  return (
    <Text style={[getTextStyle(), style]} {...props}>
      {children}
    </Text>
  );
};

// Responsive Container Component
interface ResponsiveContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  centerContent?: boolean;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  style,
  padding = 'md',
  fullWidth = false,
  centerContent = false,
}) => {
  const { isTablet } = useDeviceType();
  
  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {};

    const paddingStyles = {
      sm: { padding: useAdaptiveSpacing(12) },
      md: { padding: useAdaptiveSpacing(16) },
      lg: { padding: useAdaptiveSpacing(24) },
      xl: { padding: useAdaptiveSpacing(32) },
    };

    return {
      ...baseStyle,
      ...paddingStyles[padding],
      ...(fullWidth && { width: '100%' }),
      ...(centerContent && { alignItems: 'center', justifyContent: 'center' }),
      ...(isTablet && paddingStyles[padding].padding && {
        padding: paddingStyles[padding].padding! + 8,
      }),
    };
  };

  return <View style={[getContainerStyle(), style]}>{children}</View>;
};

// Responsive Grid Component
interface ResponsiveGridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  style?: ViewStyle;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  columns = 2,
  gap = 16,
  style,
}) => {
  const { isTablet } = useDeviceType();
  const adaptiveGap = useAdaptiveSpacing(gap);
  const adjustedColumns = isTablet ? Math.min(columns * 2, 4) : columns;
  
  const gridStyle: ViewStyle = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: adaptiveGap,
  };

  return <View style={[gridStyle, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  label: {
    color: colors.textPrimary,
    fontWeight: '500',
    marginBottom: 8,
  },
  errorText: {
    color: colors.error,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    color: colors.textPrimary,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
});
