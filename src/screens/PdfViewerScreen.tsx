import { Ionicons } from '@expo/vector-icons';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React, { memo } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { responsiveFontSize, responsiveSize } from '../utils/responsive';
import { colors } from '../utils/theme';

interface PdfViewerScreenProps {}

const PdfViewerScreen: React.FC<PdfViewerScreenProps> = memo(() => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons
            name="arrow-back"
            size={responsiveSize(24)}
            color={colors.textPrimary}
          />
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>
          PDF Görüntüleyici
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.infoContainer}>
          <Ionicons
            name="document-outline"
            size={responsiveSize(80)}
            color={colors.primary}
          />
          <Text style={styles.infoTitle}>PDF Görüntüleyici</Text>
          <Text style={styles.infoText}>
            PDF görüntüleyici özelliği yakında eklenecektir.
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.retryButtonText}>Geri Dön</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveSize(20),
    paddingTop: responsiveSize(20),
    paddingBottom: responsiveSize(20),
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: responsiveSize(8),
    borderRadius: responsiveSize(8),
  },
  title: {
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    flex: 1,
    marginHorizontal: responsiveSize(16),
  },
  placeholder: {
    width: responsiveSize(40),
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(40),
  },
  infoTitle: {
    fontSize: responsiveFontSize(24),
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: responsiveSize(20),
    marginBottom: responsiveSize(12),
  },
  infoText: {
    fontSize: responsiveFontSize(16),
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: responsiveSize(32),
    lineHeight: responsiveSize(24),
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: responsiveSize(24),
    paddingVertical: responsiveSize(12),
    borderRadius: responsiveSize(8),
  },
  retryButtonText: {
    color: colors.background,
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
  },
});

export default PdfViewerScreen;