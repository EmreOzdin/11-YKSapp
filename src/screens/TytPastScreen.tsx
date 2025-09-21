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
import {
  getSafeAreaPadding,
  responsiveFontSize,
  responsiveSize,
  screenHeight,
  screenWidth,
} from '../utils/responsive';
import { colors, shadows } from '../utils/theme';

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

  // Responsive values
  const isTablet = screenWidth > 768;
  const isSmallDevice = screenWidth < 375;
  const isMediumDevice = screenWidth >= 375 && screenWidth < 768;
  const isLargeDevice = screenWidth >= 768;
  const safeAreaPadding = getSafeAreaPadding();

  // Grid configuration based on device type
  const gridColumns = isTablet ? 3 : 2;
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
    const cardPadding = isTablet ? responsiveSize(20) : responsiveSize(16);
    const iconSize = isTablet ? responsiveSize(28) : responsiveSize(24);
    const yearFontSize = isTablet
      ? responsiveFontSize(32)
      : responsiveFontSize(28);
    const titleFontSize = isTablet
      ? responsiveFontSize(16)
      : responsiveFontSize(14);
    const countFontSize = isTablet
      ? responsiveFontSize(14)
      : responsiveFontSize(12);

    return (
      <TouchableOpacity
        key={examYear.year}
        style={[
          styles.yearCard,
          {
            width: cardWidth,
            padding: cardPadding,
            marginBottom: 5,
            borderRadius: isTablet ? responsiveSize(20) : responsiveSize(16),
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
              size={responsiveSize(20)}
              color={colors.primary}
            />
          ) : (
            <Text
              style={[
                styles.comingSoonText,
                { fontSize: responsiveFontSize(10) },
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
            paddingBottom: responsiveSize(20),
            paddingHorizontal: responsiveSize(20),
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.backButton,
            {
              padding: responsiveSize(8),
              borderRadius: responsiveSize(8),
            },
          ]}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons
            name='arrow-back'
            size={responsiveSize(24)}
            color={colors.textPrimary}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.title,
            {
              fontSize: isTablet
                ? responsiveFontSize(28)
                : responsiveFontSize(24),
            },
          ]}
        >
          TYT Çıkmış Sorular
        </Text>
        <View style={{ width: responsiveSize(40) }} />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingTop: responsiveSize(8),
            paddingHorizontal: responsiveSize(20),
            paddingBottom: responsiveSize(20),
          },
        ]}
      >
        <Text
          style={[
            styles.description,
            {
              fontSize: isTablet
                ? responsiveFontSize(18)
                : responsiveFontSize(16),
              marginTop: responsiveSize(4),
              marginBottom: responsiveSize(4),
              lineHeight: isTablet ? responsiveSize(26) : responsiveSize(24),
            },
          ]}
        >
          Gerçek TYT sınavlarında çıkan soruları çözün ve kendinizi test edin.
        </Text>

        {loading && (
          <View
            style={[
              styles.loadingContainer,
              { paddingVertical: responsiveSize(40) },
            ]}
          >
            <ActivityIndicator size='large' color={colors.primary} />
            <Text
              style={[
                styles.loadingText,
                {
                  marginTop: responsiveSize(16),
                  fontSize: isTablet
                    ? responsiveFontSize(18)
                    : responsiveFontSize(16),
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
              gap: responsiveSize(12),
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
                width: screenWidth * 0.9,
                maxWidth: 500,
                maxHeight: screenHeight * 0.8,
                borderRadius: isTablet
                  ? responsiveSize(20)
                  : responsiveSize(16),
                padding: isTablet ? responsiveSize(28) : responsiveSize(24),
                margin: responsiveSize(20),
              },
            ]}
          >
            <Text
              style={[
                styles.modalTitle,
                {
                  fontSize: isTablet
                    ? responsiveFontSize(24)
                    : responsiveFontSize(20),
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
                    ? responsiveFontSize(18)
                    : responsiveFontSize(16),
                  marginBottom: responsiveSize(24),
                  lineHeight: isTablet
                    ? responsiveSize(26)
                    : responsiveSize(22),
                },
              ]}
            >
              {modalData?.message}
            </Text>

            <View style={[styles.modalButtons, { gap: responsiveSize(12) }]}>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  {
                    paddingVertical: responsiveSize(14),
                    paddingHorizontal: responsiveSize(24),
                    borderRadius: responsiveSize(8),
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
                        ? responsiveFontSize(18)
                        : responsiveFontSize(16),
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
                    paddingVertical: responsiveSize(14),
                    paddingHorizontal: responsiveSize(24),
                    borderRadius: responsiveSize(8),
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
                        ? responsiveFontSize(18)
                        : responsiveFontSize(16),
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
