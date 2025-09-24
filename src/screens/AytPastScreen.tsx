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

const AytPastScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<{
    url: string;
    year: number;
  } | null>(null);
  const [examYears, setExamYears] = useState<ExamYear[]>([
    { year: 2025, title: '2025 AYT', questionCount: 160, isAvailable: true },
    { year: 2024, title: '2024 AYT', questionCount: 160, isAvailable: true },
    { year: 2023, title: '2023 AYT', questionCount: 160, isAvailable: true },
    { year: 2022, title: '2022 AYT', questionCount: 160, isAvailable: true },
    { year: 2021, title: '2021 AYT', questionCount: 160, isAvailable: true },
    { year: 2020, title: '2020 AYT', questionCount: 160, isAvailable: true },
    { year: 2019, title: '2019 AYT', questionCount: 160, isAvailable: true },
    { year: 2018, title: '2018 AYT', questionCount: 160, isAvailable: true },
  ]);

  const handleYearPress = async (year: number) => {
    if (!examYears.find(ey => ey.year === year)?.isAvailable) {
      Alert.alert('Bilgi', 'Bu yıla ait sınav henüz yüklenmemiş.');
      return;
    }

    // 2025 yılı için OSYM PDF linki
    if (year === 2025) {
      setModalData({
        url: 'https://dokuman.osym.gov.tr/pdfdokuman/2025/YKS/TSK/yks_ayt_2025_kitapcik_st12.pdf',
        year: 2025,
      });
      setShowModal(true);
      return;
    }

    // 2024 yılı için OSYM PDF linki
    if (year === 2024) {
      setModalData({
        url: 'https://dokuman.osym.gov.tr/pdfdokuman/2024/YKS/TSK/yks_ayt_2024_kitapcik_ts85k.pdf',
        year: 2024,
      });
      setShowModal(true);
      return;
    }

    // 2023 yılı için OSYM PDF linki
    if (year === 2023) {
      setModalData({
        url: 'https://dokuman.osym.gov.tr/pdfdokuman/2023/YKS/TSK/yks_ayt_2023_kitapcik_g5A2H.pdf',
        year: 2023,
      });
      setShowModal(true);
      return;
    }

    // 2022 yılı için OSYM PDF linki
    if (year === 2022) {
      setModalData({
        url: 'https://dokuman.osym.gov.tr/pdfdokuman/2022/YKS/TSK/yks_2022_ayt.pdf',
        year: 2022,
      });
      setShowModal(true);
      return;
    }

    // 2021 yılı için OSYM PDF linki
    if (year === 2021) {
      setModalData({
        url: 'https://dokuman.osym.gov.tr/pdfdokuman/2021/YKS/TSK/ayt_yks_2021.pdf',
        year: 2021,
      });
      setShowModal(true);
      return;
    }

    // 2020 yılı için OSYM PDF linki
    if (year === 2020) {
      setModalData({
        url: 'https://dokuman.osym.gov.tr/pdfdokuman/2020/YKS/TSK/ayt_yks_2020.pdf',
        year: 2020,
      });
      setShowModal(true);
      return;
    }

    // 2019 yılı için OSYM PDF linki
    if (year === 2019) {
      setModalData({
        url: 'https://dokuman.osym.gov.tr/pdfdokuman/2019/YKS/TSK/ayt_yks_2019_web.pdf',
        year: 2019,
      });
      setShowModal(true);
      return;
    }

    // 2018 yılı için OSYM PDF linki
    if (year === 2018) {
      setModalData({
        url: 'https://dokuman.osym.gov.tr/pdfdokuman/2018/YKS/AYT_01072018.pdf',
        year: 2018,
      });
      setShowModal(true);
      return;
    }

    setLoading(true);
    try {
      const apiService = ApiService;
      const questions = await apiService.getQuestionsByYearAndExamType(
        year,
        'AYT'
      );

      if (questions && questions.length > 0) {
        navigation.navigate('QuestionScreen', {
          questions: questions,
          examTitle: `${year} AYT Sınavı`,
          isPastExam: true,
          examYear: year,
        });
      } else {
        Alert.alert(
          'Bilgi',
          `${year} yılına ait AYT soruları henüz yüklenmemiş.`
        );
      }
    } catch (error) {
      Alert.alert('Hata', 'Sorular yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenPDF = async () => {
    if (modalData) {
      try {
        await Linking.openURL(modalData.url);
      } catch (error) {
        Alert.alert('Hata', 'PDF açılırken bir hata oluştu.');
      }
    }
    setShowModal(false);
    setModalData(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalData(null);
  };

  const renderYearCard = (examYear: ExamYear) => (
    <TouchableOpacity
      key={examYear.year}
      style={[styles.yearCard, !examYear.isAvailable && styles.disabledCard]}
      onPress={() => handleYearPress(examYear.year)}
      disabled={!examYear.isAvailable || loading}
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
        >
          <Ionicons
            name='arrow-back'
            size={responsiveSize(24)}
            color={colors.textPrimary}
          />
        </TouchableOpacity>
        <Text style={styles.title}>AYT Çıkmış Sorular</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.description}>
          Gerçek AYT sınavlarında çıkan soruları çözün ve kendinizi test edin.
        </Text>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size='large' color={colors.primary} />
            <Text style={styles.loadingText}>Sorular yükleniyor...</Text>
          </View>
        )}

        <View style={styles.yearsGrid}>{examYears.map(renderYearCard)}</View>
      </ScrollView>

      {/* Modal */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType='fade'
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>PDF Aç</Text>
            <Text style={styles.modalMessage}>
              {modalData?.year} AYT çıkmış sorular PDF'ini açmak istediğinizden
              emin misiniz?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleOpenPDF}
              >
                <Text style={styles.modalButtonText}>Aç</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={handleCloseModal}
              >
                <Text style={styles.modalCancelButtonText}>İptal</Text>
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
    paddingTop: responsiveSize(45),
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
    marginTop: responsiveSize(2),
    marginBottom: responsiveSize(5),
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
    backgroundColor: '#ffffff',
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
    ...shadows.large,
  },
  modalTitle: {
    fontSize: responsiveFontSize(20),
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: responsiveSize(16),
  },
  modalMessage: {
    fontSize: responsiveFontSize(16),
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: responsiveSize(24),
    lineHeight: responsiveSize(24),
  },
  modalButtons: {
    flexDirection: 'column',
    gap: responsiveSize(12),
  },
  modalButton: {
    backgroundColor: colors.primary,
    paddingVertical: responsiveSize(12),
    paddingHorizontal: responsiveSize(24),
    borderRadius: responsiveSize(8),
    alignItems: 'center',
  },
  modalCancelButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: responsiveSize(12),
    paddingHorizontal: responsiveSize(24),
    borderRadius: responsiveSize(8),
    alignItems: 'center',
  },
  modalButtonText: {
    color: colors.background,
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
  },
  modalCancelButtonText: {
    color: colors.textPrimary,
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
  },
});

export default AytPastScreen;
