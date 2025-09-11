import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ResponsiveButton, ResponsiveCard, ResponsiveInput, ResponsiveText } from './ResponsiveComponents';
import { colors } from './theme';
import {
    useAdaptiveFontSize,
    useAdaptiveSize,
    useAdaptiveSpacing,
    useBreakpoint,
    useDeviceType,
    useGridColumns,
    useModalDimensions,
    useOrientation,
    useScreenDimensions,
} from './useResponsive';

const ResponsiveTestScreen: React.FC = () => {
  const { width, height } = useScreenDimensions();
  const { isTablet, isSmallDevice, isMediumDevice, isLargeDevice } = useDeviceType();
  const { current, isXs, isSm, isMd, isLg } = useBreakpoint();
  const { isPortrait, isLandscape } = useOrientation();
  const modalDimensions = useModalDimensions();
  const gridConfig = useGridColumns(2);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ResponsiveText variant="h1" style={styles.title}>
        Responsive Test Screen
      </ResponsiveText>

      <ResponsiveCard style={styles.infoCard}>
        <ResponsiveText variant="h3" style={styles.sectionTitle}>
          Device Information
        </ResponsiveText>
        
        <View style={styles.infoRow}>
          <ResponsiveText variant="body">Screen Size:</ResponsiveText>
          <ResponsiveText variant="body">{width} x {height}</ResponsiveText>
        </View>
        
        <View style={styles.infoRow}>
          <ResponsiveText variant="body">Device Type:</ResponsiveText>
          <ResponsiveText variant="body">
            {isTablet ? 'Tablet' : isSmallDevice ? 'Small' : isMediumDevice ? 'Medium' : 'Large'}
          </ResponsiveText>
        </View>
        
        <View style={styles.infoRow}>
          <ResponsiveText variant="body">Breakpoint:</ResponsiveText>
          <ResponsiveText variant="body">{current}</ResponsiveText>
        </View>
        
        <View style={styles.infoRow}>
          <ResponsiveText variant="body">Orientation:</ResponsiveText>
          <ResponsiveText variant="body">{isPortrait ? 'Portrait' : 'Landscape'}</ResponsiveText>
        </View>
      </ResponsiveCard>

      <ResponsiveCard style={styles.testCard}>
        <ResponsiveText variant="h3" style={styles.sectionTitle}>
          Responsive Components Test
        </ResponsiveText>
        
        <View style={styles.componentRow}>
          <ResponsiveButton
            title="Small Button"
            size="sm"
            variant="primary"
            style={styles.button}
          />
          <ResponsiveButton
            title="Medium Button"
            size="md"
            variant="secondary"
            style={styles.button}
          />
        </View>
        
        <View style={styles.componentRow}>
          <ResponsiveButton
            title="Large Button"
            size="lg"
            variant="outline"
            style={styles.button}
          />
          <ResponsiveButton
            title="Ghost Button"
            size="md"
            variant="ghost"
            style={styles.button}
          />
        </View>
        
        <ResponsiveInput
          label="Test Input"
          placeholder="Enter some text..."
          size="md"
          style={styles.input}
        />
        
        <ResponsiveInput
          label="Large Input"
          placeholder="Large input field..."
          size="lg"
          style={styles.input}
        />
      </ResponsiveCard>

      <ResponsiveCard style={styles.gridCard}>
        <ResponsiveText variant="h3" style={styles.sectionTitle}>
          Grid System Test
        </ResponsiveText>
        
        <View style={[styles.gridContainer, { gap: gridConfig.gap }]}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <View
              key={item}
              style={[
                styles.gridItem,
                {
                  width: gridConfig.itemWidth,
                  height: useAdaptiveSize(80),
                  backgroundColor: colors.primary + '20',
                  borderRadius: useAdaptiveSize(8),
                  justifyContent: 'center',
                  alignItems: 'center',
                }
              ]}
            >
              <ResponsiveText variant="body" style={{ color: colors.primary }}>
                Item {item}
              </ResponsiveText>
            </View>
          ))}
        </View>
      </ResponsiveCard>

      <ResponsiveCard style={styles.sizeCard}>
        <ResponsiveText variant="h3" style={styles.sectionTitle}>
          Adaptive Sizing Test
        </ResponsiveText>
        
        <View style={styles.sizeRow}>
          <ResponsiveText variant="body">Adaptive Size (20):</ResponsiveText>
          <ResponsiveText variant="body">{useAdaptiveSize(20)}px</ResponsiveText>
        </View>
        
        <View style={styles.sizeRow}>
          <ResponsiveText variant="body">Adaptive Font Size (16):</ResponsiveText>
          <ResponsiveText variant="body">{useAdaptiveFontSize(16)}px</ResponsiveText>
        </View>
        
        <View style={styles.sizeRow}>
          <ResponsiveText variant="body">Adaptive Spacing (16):</ResponsiveText>
          <ResponsiveText variant="body">{useAdaptiveSpacing(16)}px</ResponsiveText>
        </View>
        
        <View style={styles.sizeRow}>
          <ResponsiveText variant="body">Modal Width:</ResponsiveText>
          <ResponsiveText variant="body">{modalDimensions.width}px</ResponsiveText>
        </View>
      </ResponsiveCard>

      <View style={styles.spacing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
    color: colors.primary,
  },
  infoCard: {
    marginBottom: 16,
  },
  testCard: {
    marginBottom: 16,
  },
  gridCard: {
    marginBottom: 16,
  },
  sizeCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    color: colors.primary,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  componentRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  input: {
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    marginBottom: 16,
  },
  sizeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  spacing: {
    height: 50,
  },
});

export default ResponsiveTestScreen;
