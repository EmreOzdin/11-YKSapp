import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';
import {
  responsiveSize,
  responsiveFontSize,
  cardSize,
  modalSize,
  spacing,
  fontSize,
  borderRadius,
  iconSize,
} from './responsive';
import { colors, shadows } from './theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Responsive Button Component
interface ResponsiveButtonProps {
  title: string;
  onPress: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  style?: any;
  textStyle?: any;
}

export const ResponsiveButton: React.FC<ResponsiveButtonProps> = ({
  title,
  onPress,
  size = 'md',
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    const baseStyle = {
      paddingHorizontal: responsiveSize(
        size === 'sm' ? 16 : size === 'md' ? 24 : 32
      ),
      paddingVertical: responsiveSize(
        size === 'sm' ? 8 : size === 'md' ? 12 : 16
      ),
      borderRadius: responsiveSize(8),
      alignItems: 'center',
      justifyContent: 'center',
      ...shadows.small,
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: colors.primary,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: colors.secondary,
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: colors.primary,
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = () => {
    const baseTextStyle = {
      fontSize: responsiveFontSize(
        size === 'sm' ? 14 : size === 'md' ? 16 : 18
      ),
      fontWeight: 'bold',
    };

    switch (variant) {
      case 'outline':
        return {
          ...baseTextStyle,
          color: colors.primary,
        };
      default:
        return {
          ...baseTextStyle,
          color: colors.textWhite,
        };
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), disabled && { opacity: 0.6 }, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[getTextStyle(), textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

// Responsive Input Component
interface ResponsiveInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  size?: 'sm' | 'md' | 'lg';
  secureTextEntry?: boolean;
  keyboardType?: any;
  style?: any;
  textStyle?: any;
}

export const ResponsiveInput: React.FC<ResponsiveInputProps> = ({
  placeholder,
  value,
  onChangeText,
  size = 'md',
  secureTextEntry = false,
  keyboardType = 'default',
  style,
  textStyle,
}) => {
  return (
    <TextInput
      style={[
        {
          paddingHorizontal: responsiveSize(
            size === 'sm' ? 12 : size === 'md' ? 16 : 20
          ),
          paddingVertical: responsiveSize(
            size === 'sm' ? 8 : size === 'md' ? 12 : 16
          ),
          borderRadius: responsiveSize(8),
          fontSize: responsiveFontSize(
            size === 'sm' ? 14 : size === 'md' ? 16 : 18
          ),
          backgroundColor: colors.background,
          borderWidth: 1,
          borderColor: colors.border,
          color: colors.textPrimary,
        },
        style,
      ]}
      placeholder={placeholder}
      placeholderTextColor={colors.textTertiary}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
    />
  );
};

// Responsive Card Component
interface ResponsiveCardProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  style?: any;
}

export const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  children,
  size = 'md',
  style,
}) => {
  return (
    <View
      style={[
        {
          ...cardSize[size],
          backgroundColor: colors.background,
          ...shadows.small,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

// Responsive Modal Component
interface ResponsiveModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  style?: any;
}

export const ResponsiveModal: React.FC<ResponsiveModalProps> = ({
  visible,
  onClose,
  title,
  children,
  size = 'md',
  style,
}) => {
  return (
    <Modal visible={visible} animationType='slide' transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={[
            {
              ...modalSize[size],
              backgroundColor: colors.background,
              ...shadows.large,
            },
            style,
          ]}
        >
          {title && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: spacing.md,
              }}
            >
              <Text
                style={{
                  fontSize: fontSize.lg,
                  fontWeight: 'bold',
                  color: colors.textPrimary,
                }}
              >
                {title}
              </Text>
              <TouchableOpacity onPress={onClose}>
                <MaterialCommunityIcons
                  name='close'
                  size={iconSize.md}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          )}
          <ScrollView showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

// Responsive Text Component
interface ResponsiveTextProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl' | 'title';
  weight?: 'normal' | 'medium' | 'bold';
  color?: string;
  align?: 'left' | 'center' | 'right';
  style?: any;
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  size = 'md',
  weight = 'normal',
  color = colors.textPrimary,
  align = 'left',
  style,
}) => {
  const getFontWeight = () => {
    switch (weight) {
      case 'medium':
        return '500';
      case 'bold':
        return 'bold';
      default:
        return 'normal';
    }
  };

  return (
    <Text
      style={[
        {
          fontSize: fontSize[size],
          fontWeight: getFontWeight(),
          color,
          textAlign: align,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

// Responsive Container Component
interface ResponsiveContainerProps {
  children: React.ReactNode;
  padding?: number;
  margin?: number;
  backgroundColor?: string;
  style?: any;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  padding = spacing.md,
  margin = 0,
  backgroundColor = colors.background,
  style,
}) => {
  return (
    <View
      style={[
        {
          flex: 1,
          padding: responsiveSize(padding),
          margin: responsiveSize(margin),
          backgroundColor,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

// Responsive Grid Component
interface ResponsiveGridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  style?: any;
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  columns = 2,
  gap = spacing.sm,
  style,
}) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginHorizontal: -responsiveSize(gap / 2),
        },
        style,
      ]}
    >
      {React.Children.map(children, child => (
        <View
          style={{
            width: `${100 / columns}%`,
            paddingHorizontal: responsiveSize(gap / 2),
            marginBottom: responsiveSize(gap),
          }}
        >
          {child}
        </View>
      ))}
    </View>
  );
};
