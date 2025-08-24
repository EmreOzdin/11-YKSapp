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
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ApiService } from '../services/apiService';
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
  const [examYears, setExamYears] = useState<ExamYear[]>([
    { year: 2024, title: '2024 TYT', questionCount: 120, isAvailable: true },
    { year: 2023, title: '2023 TYT', questionCount: 120, isAvailable: true },
    { year: 2022, title: '2022 TYT', questionCount: 120, isAvailable: true },
    { year: 2021, title: '2021 TYT', questionCount: 120, isAvailable: true },
    { year: 2020, title: '2020 TYT', questionCount: 120, isAvailable: true },
    { year: 2019, title: '2019 TYT', questionCount: 120, isAvailable: true },
    { year: 2018, title: '2018 TYT', questionCount: 120, isAvailable: true },
    { year: 2017, title: '2017 TYT', questionCount: 120, isAvailable: true },
    { year: 2016, title: '2016 TYT', questionCount: 120, isAvailable: true },
    { year: 2015, title: '2015 TYT', questionCount: 120, isAvailable: true },
  ]);

  const handleYearPress = async (year: number) => {
    if (!examYears.find(ey => ey.year === year)?.isAvailable) {
      Alert.alert('Bilgi', 'Bu yıla ait sınav henüz yüklenmemiş.');
      return;
    }

    setLoading(true);
    try {
      // MongoDB'den o yıla ait TYT sorularını getir
      const apiService = new ApiService();
      const questions = await apiService.getQuestionsByYearAndExamType(
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
    paddingTop: responsiveSize(56),
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
    padding: responsiveSize(20),
  },
  description: {
    fontSize: responsiveFontSize(16),
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: responsiveSize(30),
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
    backgroundColor: colors.white,
    borderRadius: responsiveSize(16),
    padding: responsiveSize(16),
    marginBottom: responsiveSize(16),
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
});

export default TytPastScreen;
