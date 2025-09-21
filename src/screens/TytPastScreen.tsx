import { Ionicons } from '@expo/vector-icons';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ApiService from '../services/apiService';
import { getSafeAreaPadding } from '../utils/responsive';
import { colors, shadows } from '../utils/theme';
import {
  useAdaptiveFontSize,
  useAdaptiveSize,
  useAdaptiveSpacing,
  useBreakpoint,
  useDeviceType,
  useGridColumns,
  useModalDimensions,
} from '../utils/useResponsive';

interface ExamYear {
  year: number;
  title: string;
  questionCount: number;
  isAvailable: boolean;
}

const TytPastScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<{
    title: string;
    message: string;
    pdfUrl: string;
  } | null>(null);

  // Responsive hooks
  const { isTablet, isSmallDevice, isMediumDevice, isLargeDevice } =
    useDeviceType();
  const {
    current: currentBreakpoint,
    isXs,
    isSm,
    isMd,
    isLg,
  } = useBreakpoint();
  const modalDimensions = useModalDimensions();
  const safeAreaPadding = getSafeAreaPadding();

  // Grid configuration based on device type
  const gridConfig = useGridColumns(isTablet ? 3 : 2);
  const [examYears, setExamYears] = useState<ExamYear[]>([
    { year: 2025, title: '2025 TYT', questionCount: 120, isAvailable: true },
    { year: 2024, title: '2024 TYT', questionCount: 120, isAvailable: true },
    { year: 2023, title: '2023 TYT', questionCount: 120, isAvailable: true },
    { year: 2022, title: '2022 TYT', questionCount: 120, isAvailable: true },
    { year: 2021, title: '2021 TYT', questionCount: 120, isAvailable: true },
    { year: 2020, title: '2020 TYT', questionCount: 120, isAvailable: true },
    { year: 2019, title: '2019 TYT', questionCount: 120, isAvailable: true },
    { year: 2018, title: '2018 TYT', questionCount: 120, isAvailable: true },
  ]);

  const handleOpenPdf = async () => {
    if (!modalData) return;

    try {
      const supported = await Linking.canOpenURL(modalData.pdfUrl);
      if (supported) {
        await Linking.openURL(modalData.pdfUrl);
        setShowModal(false);
      } else {
        Alert.alert('Hata', 'PDF açılamadı. Lütfen tarayıcınızı kontrol edin.');
      }
    } catch (error) {
      console.error('PDF açma hatası:', error);
      Alert.alert('Hata', 'PDF açılırken bir hata oluştu.');
    }
  };

  const handleYearPress = async (year: number) => {
    if (!examYears.find(ey => ey.year === year)?.isAvailable) {
      Alert.alert('Bilgi', 'Bu yıla ait sınav henüz yüklenmemiş.');
      return;
    }

    // 2025 yılı için OSYM PDF linkini aç
    if (year === 2025) {
      const pdfUrl =
        'https://dokuman.osym.gov.tr/pdfdokuman/2025/YKS/TSK/yks_tyt_2025_kitapcik_d250.pdf';

      setModalData({
        title: '2025 TYT Çıkmış Sorular',
        message: '2025 TYT çıkmış sorular PDF dosyası tarayıcıda açılacak.',
        pdfUrl: pdfUrl,
      });
      setShowModal(true);
      return;
    }

    // 2024 yılı için OSYM PDF linkini aç
    if (year === 2024) {
      const pdfUrl =
        'https://dokuman.osym.gov.tr/pdfdokuman/2024/YKS/TSK/yks_tyt_2024_kitapcik_T24kt.pdf';

      setModalData({
        title: '2024 TYT Çıkmış Sorular',
        message: '2024 TYT çıkmış sorular PDF dosyası tarayıcıda açılacak.',
        pdfUrl: pdfUrl,
      });
      setShowModal(true);
      return;
    }

    // 2023 yılı için OSYM PDF linkini aç
    if (year === 2023) {
      const pdfUrl =
        'https://dokuman.osym.gov.tr/pdfdokuman/2023/YKS/TSK/yks_tyt_2023_kitapcik_T23ky.pdf';

      setModalData({
        title: '2023 TYT Çıkmış Sorular',
        message: '2023 TYT çıkmış sorular PDF dosyası tarayıcıda açılacak.',
        pdfUrl: pdfUrl,
      });
      setShowModal(true);
      return;
    }

    // 2022 yılı için OSYM PDF linkini aç
    if (year === 2022) {
      const pdfUrl =
        'https://dokuman.osym.gov.tr/pdfdokuman/2022/YKS/TSK/yks_2022_tyt.pdf';

      setModalData({
        title: '2022 TYT Çıkmış Sorular',
        message: '2022 TYT çıkmış sorular PDF dosyası tarayıcıda açılacak.',
        pdfUrl: pdfUrl,
      });
      setShowModal(true);
      return;
    }

    // 2021 yılı için OSYM PDF linkini aç
    if (year === 2021) {
      const pdfUrl =
        'https://dokuman.osym.gov.tr/pdfdokuman/2021/YKS/TSK/tyt_yks_2021.pdf';

      setModalData({
        title: '2021 TYT Çıkmış Sorular',
        message: '2021 TYT çıkmış sorular PDF dosyası tarayıcıda açılacak.',
        pdfUrl: pdfUrl,
      });
      setShowModal(true);
      return;
    }

    // 2020 yılı için OSYM PDF linkini aç
    if (year === 2020) {
      const pdfUrl =
        'https://dokuman.osym.gov.tr/pdfdokuman/2020/YKS/TSK/tyt_yks_2020.pdf';

      setModalData({
        title: '2020 TYT Çıkmış Sorular',
        message: '2020 TYT çıkmış sorular PDF dosyası tarayıcıda açılacak.',
        pdfUrl: pdfUrl,
      });
      setShowModal(true);
      return;
    }

    // 2019 yılı için OSYM PDF linkini aç
    if (year === 2019) {
      const pdfUrl =
        'https://dokuman.osym.gov.tr/pdfdokuman/2019/YKS/TSK/tyt_yks_2019_web.pdf';

      setModalData({
        title: '2019 TYT Çıkmış Sorular',
        message: '2019 TYT çıkmış sorular PDF dosyası tarayıcıda açılacak.',
        pdfUrl: pdfUrl,
      });
      setShowModal(true);
      return;
    }

    // 2018 yılı için OSYM PDF linkini aç
    if (year === 2018) {
      const pdfUrl =
        'https://dokuman.osym.gov.tr/pdfdokuman/2018/YKS/TYT_01072018.pdf';

      setModalData({
        title: '2018 TYT Çıkmış Sorular',
        message: '2018 TYT çıkmış sorular PDF dosyası tarayıcıda açılacak.',
        pdfUrl: pdfUrl,
      });
      setShowModal(true);
      return;
    }

    setLoading(true);
    try {
      // MongoDB'den o yıla ait TYT sorularını getir
      const questions = await ApiService.getQuestionsByYearAndExamType(
        year,
        'TYT'
      );

      if (questions && questions.length > 0) {
        // Soruları QuestionScreen'e gönder
        navigation.navigate('QuestionScreen', {
          questions: questions,
          examTitle: `${year} TYT Sınavı`,
          isPastExam: true,
          examYear: year,
        });
      } else {
        Alert.alert(
          'Bilgi',
          `${year} yılına ait TYT soruları henüz yüklenmemiş.`
        );
      }
    } catch (error) {
      Alert.alert('Hata', 'Sorular yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const renderYearCard = (examYear: ExamYear) => {
    const cardWidth = isTablet ? '30%' : isSmallDevice ? '100%' : '48%';
    const cardPadding = isTablet
      ? useAdaptiveSpacing(20)
      : useAdaptiveSpacing(16);
    const iconSize = isTablet ? useAdaptiveSize(28) : useAdaptiveSize(24);
    const yearFontSize = isTablet
      ? useAdaptiveFontSize(32)
      : useAdaptiveFontSize(28);
    const titleFontSize = isTablet
      ? useAdaptiveFontSize(16)
      : useAdaptiveFontSize(14);
    const countFontSize = isTablet
      ? useAdaptiveFontSize(14)
      : useAdaptiveFontSize(12);

    return (
      <TouchableOpacity
        key={examYear.year}
        style={[
          styles.yearCard,
          {
            width: cardWidth,
            padding: cardPadding,
            marginBottom: 5,
            borderRadius: isTablet ? useAdaptiveSize(20) : useAdaptiveSize(16),
          },
          !examYear.isAvailable && styles.disabledCard,
        ]}
        onPress={() => handleYearPress(examYear.year)}
        disabled={!examYear.isAvailable || loading}
        activeOpacity={0.7}
      >
        <View style={styles.yearCardHeader}>
          <Text style={[styles.yearText, { fontSize: yearFontSize }]}>
            {examYear.year}
          </Text>
          <Ionicons
            name='calendar-outline'
            size={iconSize}
            color={examYear.isAvailable ? colors.primary : colors.textSecondary}
          />
        </View>

        <Text
          style={[
            styles.yearTitle,
            { fontSize: titleFontSize },
            !examYear.isAvailable && styles.disabledText,
          ]}
        >
          {examYear.title}
        </Text>

        <View style={styles.yearCardFooter}>
          <Text
            style={[
              styles.questionCount,
              { fontSize: countFontSize },
              !examYear.isAvailable && styles.disabledText,
            ]}
          >
            {examYear.questionCount} Soru
          </Text>

          {examYear.isAvailable ? (
            <Ionicons
              name='chevron-forward'
              size={useAdaptiveSize(20)}
              color={colors.primary}
            />
          ) : (
            <Text
              style={[
                styles.comingSoonText,
                { fontSize: useAdaptiveFontSize(10) },
              ]}
            >
              Yakında
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop: 8,
            paddingBottom: useAdaptiveSpacing(20),
            paddingHorizontal: useAdaptiveSpacing(20),
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.backButton,
            {
              padding: useAdaptiveSpacing(8),
              borderRadius: useAdaptiveSize(8),
            },
          ]}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons
            name='arrow-back'
            size={useAdaptiveSize(24)}
            color={colors.textPrimary}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.title,
            {
              fontSize: isTablet
                ? useAdaptiveFontSize(28)
                : useAdaptiveFontSize(24),
            },
          ]}
        >
          TYT Çıkmış Sorular
        </Text>
        <View style={{ width: useAdaptiveSize(40) }} />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingTop: useAdaptiveSpacing(8),
            paddingHorizontal: useAdaptiveSpacing(20),
            paddingBottom: useAdaptiveSpacing(20),
          },
        ]}
      >
        <Text
          style={[
            styles.description,
            {
              fontSize: isTablet
                ? useAdaptiveFontSize(18)
                : useAdaptiveFontSize(16),
              marginTop: useAdaptiveSpacing(4),
              marginBottom: useAdaptiveSpacing(4),
              lineHeight: isTablet ? useAdaptiveSize(26) : useAdaptiveSize(24),
            },
          ]}
        >
          Gerçek TYT sınavlarında çıkan soruları çözün ve kendinizi test edin.
        </Text>

        {loading && (
          <View
            style={[
              styles.loadingContainer,
              { paddingVertical: useAdaptiveSpacing(40) },
            ]}
          >
            <ActivityIndicator size='large' color={colors.primary} />
            <Text
              style={[
                styles.loadingText,
                {
                  marginTop: useAdaptiveSpacing(16),
                  fontSize: isTablet
                    ? useAdaptiveFontSize(18)
                    : useAdaptiveFontSize(16),
                },
              ]}
            >
              Sorular yükleniyor...
            </Text>
          </View>
        )}

        <View
          style={[
            styles.yearsGrid,
            {
              justifyContent: isSmallDevice ? 'center' : 'space-between',
              gap: useAdaptiveSpacing(12),
            },
          ]}
        >
          {examYears.map(renderYearCard)}
        </View>
      </ScrollView>

      {/* Custom Modal */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType='fade'
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContainer,
              {
                width: modalDimensions.width,
                maxWidth: modalDimensions.maxWidth,
                maxHeight: modalDimensions.maxHeight,
                borderRadius: isTablet
                  ? useAdaptiveSize(20)
                  : useAdaptiveSize(16),
                padding: isTablet
                  ? useAdaptiveSpacing(28)
                  : useAdaptiveSpacing(24),
                margin: useAdaptiveSpacing(20),
              },
            ]}
          >
            <Text
              style={[
                styles.modalTitle,
                {
                  fontSize: isTablet
                    ? useAdaptiveFontSize(24)
                    : useAdaptiveFontSize(20),
                },
              ]}
            >
              {modalData?.title}
            </Text>
            <Text
              style={[
                styles.modalMessage,
                {
                  fontSize: isTablet
                    ? useAdaptiveFontSize(18)
                    : useAdaptiveFontSize(16),
                  marginBottom: useAdaptiveSpacing(24),
                  lineHeight: isTablet
                    ? useAdaptiveSize(26)
                    : useAdaptiveSize(22),
                },
              ]}
            >
              {modalData?.message}
            </Text>

            <View
              style={[styles.modalButtons, { gap: useAdaptiveSpacing(12) }]}
            >
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  {
                    paddingVertical: useAdaptiveSpacing(14),
                    paddingHorizontal: useAdaptiveSpacing(24),
                    borderRadius: useAdaptiveSize(8),
                  },
                ]}
                onPress={handleOpenPdf}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.modalButtonText,
                    {
                      fontSize: isTablet
                        ? useAdaptiveFontSize(18)
                        : useAdaptiveFontSize(16),
                    },
                  ]}
                >
                  Aç
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.modalCancelButton,
                  {
                    paddingVertical: useAdaptiveSpacing(14),
                    paddingHorizontal: useAdaptiveSpacing(24),
                    borderRadius: useAdaptiveSize(8),
                  },
                ]}
                onPress={() => setShowModal(false)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.modalButtonText,
                    styles.modalCancelButtonText,
                    {
                      fontSize: isTablet
                        ? useAdaptiveFontSize(18)
                        : useAdaptiveFontSize(16),
                    },
                  ]}
                >
                  İptal
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    // Dynamic styles applied inline
  },
  title: {
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    // Dynamic styles applied inline
  },
  description: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    color: colors.textSecondary,
  },
  yearsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  yearCard: {
    backgroundColor: colors.cardBackground,
    ...shadows.medium,
    borderWidth: 1,
    borderColor: colors.border,
  },
  disabledCard: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    opacity: 0.6,
  },
  yearCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  yearText: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  yearTitle: {
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  yearCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionCount: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
  disabledText: {
    color: colors.textSecondary,
  },
  comingSoonText: {
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: colors.background,
    ...shadows.medium,
  },
  modalTitle: {
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },
  modalMessage: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
  modalButtons: {
    // Dynamic styles applied inline
  },
  modalButton: {
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  modalCancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalButtonText: {
    fontWeight: '600',
    color: colors.background,
  },
  modalCancelButtonText: {
    color: colors.textSecondary,
  },
});

export default TytPastScreen;
