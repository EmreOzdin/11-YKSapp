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
import { responsiveFontSize, responsiveSize } from '../utils/responsive';
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

  const renderYearCard = (examYear: ExamYear) => (
    <TouchableOpacity
      key={examYear.year}
      style={[styles.yearCard, !examYear.isAvailable && styles.disabledCard]}
      onPress={() => handleYearPress(examYear.year)}
      disabled={!examYear.isAvailable || loading}
      activeOpacity={0.7}
    >
      <View style={styles.yearCardHeader}>
        <Text style={styles.yearText}>{examYear.year}</Text>
        <Ionicons
          name='calendar-outline'
          size={responsiveSize(24)}
          color={examYear.isAvailable ? colors.primary : colors.textSecondary}
        />
      </View>

      <Text
        style={[styles.yearTitle, !examYear.isAvailable && styles.disabledText]}
      >
        {examYear.title}
      </Text>

      <View style={styles.yearCardFooter}>
        <Text
          style={[
            styles.questionCount,
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
          <Text style={styles.comingSoonText}>Yakında</Text>
        )}
      </View>
    </TouchableOpacity>
  );

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
            name='arrow-back'
            size={responsiveSize(24)}
            color={colors.textPrimary}
          />
        </TouchableOpacity>
        <Text style={styles.title}>TYT Çıkmış Sorular</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.description}>
          Gerçek TYT sınavlarında çıkan soruları çözün ve kendinizi test edin.
        </Text>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color={colors.primary} />
            <Text style={styles.loadingText}>Sorular yükleniyor...</Text>
          </View>
        )}

        <View style={styles.yearsGrid}>{examYears.map(renderYearCard)}</View>
      </ScrollView>

      {/* Custom Modal */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType='fade'
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{modalData?.title}</Text>
            <Text style={styles.modalMessage}>{modalData?.message}</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleOpenPdf}
                activeOpacity={0.7}
              >
                <Text style={styles.modalButtonText}>Aç</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelButton]}
                onPress={() => setShowModal(false)}
                activeOpacity={0.7}
              >
                <Text
                  style={[styles.modalButtonText, styles.modalCancelButtonText]}
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
    fontSize: responsiveFontSize(24),
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  placeholder: {
    width: responsiveSize(40),
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: responsiveSize(8),
    paddingHorizontal: responsiveSize(20),
    paddingBottom: responsiveSize(20),
  },
  description: {
    fontSize: responsiveFontSize(16),
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: responsiveSize(4),
    marginBottom: responsiveSize(4),
    lineHeight: responsiveSize(24),
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: responsiveSize(40),
  },
  loadingText: {
    marginTop: responsiveSize(16),
    fontSize: responsiveFontSize(16),
    color: colors.textSecondary,
  },
  yearsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  yearCard: {
    width: '48%',
    backgroundColor: colors.cardBackground,
    borderRadius: responsiveSize(16),
    padding: responsiveSize(16),
    marginBottom: responsiveSize(12),
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
    marginBottom: responsiveSize(8),
  },
  yearText: {
    fontSize: responsiveFontSize(28),
    fontWeight: 'bold',
    color: colors.primary,
  },
  yearTitle: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: responsiveSize(12),
  },
  yearCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionCount: {
    fontSize: responsiveFontSize(12),
    color: colors.textSecondary,
    fontWeight: '500',
  },
  disabledText: {
    color: colors.textSecondary,
  },
  comingSoonText: {
    fontSize: responsiveFontSize(10),
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
    borderRadius: responsiveSize(16),
    padding: responsiveSize(24),
    margin: responsiveSize(20),
    minWidth: responsiveSize(280),
    ...shadows.medium,
  },
  modalTitle: {
    fontSize: responsiveFontSize(20),
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: responsiveSize(12),
  },
  modalMessage: {
    fontSize: responsiveFontSize(16),
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: responsiveSize(24),
    lineHeight: responsiveSize(22),
  },
  modalButtons: {
    gap: responsiveSize(12),
  },
  modalButton: {
    backgroundColor: colors.primary,
    paddingVertical: responsiveSize(14),
    paddingHorizontal: responsiveSize(24),
    borderRadius: responsiveSize(8),
    alignItems: 'center',
  },
  modalCancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalButtonText: {
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
    color: colors.background,
  },
  modalCancelButtonText: {
    color: colors.textSecondary,
  },
});

export default TytPastScreen;
