import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { responsiveFontSize, responsiveSize } from '../utils/responsive';
import { colors, shadows } from '../utils/theme';

const { width: screenWidth } = Dimensions.get('window');

interface PerformanceData {
  subject: string;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  timeSpent: number;
  color: string;
  icon: string;
}

const PerformansScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [selectedPeriod, setSelectedPeriod] = useState<
    'week' | 'month' | 'year'
  >('month');

  // Kullanıcı performans verileri (gerçek uygulamada API'den gelecek)
  const userStats = {
    totalQuestions: 1247,
    correctAnswers: 892,
    accuracy: 71.7,
    studyStreak: 15,
    totalStudyTime: 89,
    averageTimePerQuestion: 2.3,
    weeklyGoal: 100,
    weeklyProgress: 67,
  };

  const subjectPerformance: PerformanceData[] = [
    {
      subject: 'Matematik',
      totalQuestions: 456,
      correctAnswers: 342,
      accuracy: 75.0,
      timeSpent: 32,
      color: colors.gradients.orange[0],
      icon: 'calculator',
    },
    {
      subject: 'Fen Bilimleri',
      totalQuestions: 398,
      correctAnswers: 287,
      accuracy: 72.1,
      timeSpent: 28,
      color: colors.gradients.blue[0],
      icon: 'atom',
    },
    {
      subject: 'Türkçe',
      totalQuestions: 234,
      correctAnswers: 189,
      accuracy: 80.8,
      timeSpent: 18,
      color: colors.gradients.purple[0],
      icon: 'book-open-variant',
    },
    {
      subject: 'Sosyal Bilimler',
      totalQuestions: 159,
      correctAnswers: 74,
      accuracy: 46.5,
      timeSpent: 11,
      color: colors.gradients.pink[0],
      icon: 'earth',
    },
  ];

  const renderStatCard = (
    title: string,
    value: string | number,
    subtitle: string,
    icon: string,
    color: string
  ) => (
    <View style={[styles.statCard, { backgroundColor: color }]}>
      <MaterialCommunityIcons
        name={icon as any}
        size={24}
        color={colors.textWhite}
      />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={styles.statSubtitle}>{subtitle}</Text>
    </View>
  );

  const renderSubjectCard = (data: PerformanceData) => (
    <View style={styles.subjectCard}>
      <View style={styles.subjectHeader}>
        <View style={[styles.subjectIcon, { backgroundColor: data.color }]}>
          <MaterialCommunityIcons
            name={data.icon as any}
            size={20}
            color={colors.textWhite}
          />
        </View>
        <View style={styles.subjectInfo}>
          <Text style={styles.subjectName}>{data.subject}</Text>
          <Text style={styles.subjectStats}>
            {data.correctAnswers}/{data.totalQuestions} soru doğru
          </Text>
        </View>
        <View style={styles.accuracyContainer}>
          <Text style={styles.accuracyText}>%{data.accuracy}</Text>
        </View>
      </View>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${data.accuracy}%`,
              backgroundColor: data.color,
            },
          ]}
        />
      </View>
      <View style={styles.subjectFooter}>
        <View style={styles.footerItem}>
          <MaterialCommunityIcons
            name='clock-outline'
            size={16}
            color={colors.textTertiary}
          />
          <Text style={styles.footerText}>{data.timeSpent} saat</Text>
        </View>
        <View style={styles.footerItem}>
          <MaterialCommunityIcons
            name='timer-outline'
            size={16}
            color={colors.textTertiary}
          />
          <Text style={styles.footerText}>
            {((data.timeSpent * 60) / data.totalQuestions).toFixed(1)} dk/soru
          </Text>
        </View>
      </View>
    </View>
  );

  const renderPeriodSelector = () => (
    <View style={styles.periodSelector}>
      <TouchableOpacity
        style={[
          styles.periodButton,
          selectedPeriod === 'week' && styles.periodButtonActive,
        ]}
        onPress={() => setSelectedPeriod('week')}
      >
        <Text
          style={[
            styles.periodButtonText,
            selectedPeriod === 'week' && styles.periodButtonTextActive,
          ]}
        >
          Haftalık
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.periodButton,
          selectedPeriod === 'month' && styles.periodButtonActive,
        ]}
        onPress={() => setSelectedPeriod('month')}
      >
        <Text
          style={[
            styles.periodButtonText,
            selectedPeriod === 'month' && styles.periodButtonTextActive,
          ]}
        >
          Aylık
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.periodButton,
          selectedPeriod === 'year' && styles.periodButtonActive,
        ]}
        onPress={() => setSelectedPeriod('year')}
      >
        <Text
          style={[
            styles.periodButtonText,
            selectedPeriod === 'year' && styles.periodButtonTextActive,
          ]}
        >
          Yıllık
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <LinearGradient
        colors={[colors.primary, colors.primaryLight]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('HomeTab')}
          >
            <Ionicons name='arrow-back' size={24} color={colors.textWhite} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Performans</Text>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name='share-outline' size={24} color={colors.textWhite} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {/* Period Selector */}
        {renderPeriodSelector()}

        {/* Overall Stats */}
        <View style={styles.overallStatsContainer}>
          <Text style={styles.sectionTitle}>Genel İstatistikler</Text>
          <View style={styles.statsGrid}>
            {renderStatCard(
              'Toplam Soru',
              userStats.totalQuestions,
              'Çözülen soru sayısı',
              'help-circle-outline',
              colors.gradients.blue[0]
            )}
            {renderStatCard(
              'Doğru Cevap',
              userStats.correctAnswers,
              'Doğru cevap sayısı',
              'check-circle-outline',
              colors.gradients.purple[0]
            )}
            {renderStatCard(
              'Başarı Oranı',
              `%${userStats.accuracy}`,
              'Genel başarı oranı',
              'trending-up',
              colors.gradients.orange[0]
            )}
            {renderStatCard(
              'Çalışma Serisi',
              userStats.studyStreak,
              'Günlük çalışma serisi',
              'fire',
              colors.gradients.pink[0]
            )}
          </View>
        </View>

        {/* Study Time Card */}
        <View style={styles.studyTimeCard}>
          <View style={styles.studyTimeHeader}>
            <MaterialCommunityIcons
              name='clock-outline'
              size={24}
              color={colors.primary}
            />
            <Text style={styles.studyTimeTitle}>Toplam Çalışma Süresi</Text>
          </View>
          <Text style={styles.studyTimeValue}>
            {userStats.totalStudyTime} saat
          </Text>
          <Text style={styles.studyTimeSubtitle}>
            Bu ay toplam çalışma süreniz
          </Text>
          <View style={styles.averageTimeContainer}>
            <MaterialCommunityIcons
              name='timer-outline'
              size={16}
              color={colors.textTertiary}
            />
            <Text style={styles.averageTimeText}>
              Ortalama: {userStats.averageTimePerQuestion} dakika/soru
            </Text>
          </View>
        </View>

        {/* Weekly Goal Progress */}
        <View style={styles.goalCard}>
          <View style={styles.goalHeader}>
            <MaterialCommunityIcons
              name='target'
              size={24}
              color={colors.success}
            />
            <Text style={styles.goalTitle}>Haftalık Hedef</Text>
          </View>
          <View style={styles.goalProgress}>
            <View style={styles.goalProgressBar}>
              <View
                style={[
                  styles.goalProgressFill,
                  {
                    width: `${(userStats.weeklyProgress / userStats.weeklyGoal) * 100}%`,
                  },
                ]}
              />
            </View>
            <Text style={styles.goalProgressText}>
              {userStats.weeklyProgress}/{userStats.weeklyGoal} soru
            </Text>
          </View>
        </View>

        {/* Subject Performance */}
        <View style={styles.subjectsContainer}>
          <Text style={styles.sectionTitle}>Ders Bazında Performans</Text>
          {subjectPerformance.map((subject, index) => (
            <View key={index} style={styles.subjectCardWrapper}>
              {renderSubjectCard(subject)}
            </View>
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  header: {
    paddingTop: responsiveSize(10),
    paddingBottom: responsiveSize(20),
    paddingHorizontal: responsiveSize(20),
    zIndex: 1000,
    elevation: 5,
  },
  scrollView: {
    flex: 1,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: responsiveSize(8),
  },
  headerTitle: {
    fontSize: responsiveFontSize(20),
    fontWeight: 'bold',
    color: colors.textWhite,
  },
  shareButton: {
    padding: responsiveSize(8),
  },
  periodSelector: {
    flexDirection: 'row',
    margin: responsiveSize(20),
    backgroundColor: colors.background,
    borderRadius: responsiveSize(12),
    padding: responsiveSize(4),
    ...shadows.small,
  },
  periodButton: {
    flex: 1,
    paddingVertical: responsiveSize(8),
    paddingHorizontal: responsiveSize(12),
    borderRadius: responsiveSize(8),
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: colors.primary,
  },
  periodButtonText: {
    fontSize: responsiveFontSize(14),
    fontWeight: '500',
    color: colors.textSecondary,
  },
  periodButtonTextActive: {
    color: colors.textWhite,
  },
  overallStatsContainer: {
    paddingHorizontal: responsiveSize(20),
    marginBottom: responsiveSize(20),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: responsiveSize(12),
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    padding: responsiveSize(16),
    borderRadius: responsiveSize(12),
    marginBottom: responsiveSize(12),
    alignItems: 'center',
    ...shadows.small,
  },
  statValue: {
    fontSize: responsiveFontSize(24),
    fontWeight: 'bold',
    color: colors.textWhite,
    marginTop: responsiveSize(8),
    marginBottom: responsiveSize(4),
  },
  statTitle: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: colors.textWhite,
    marginBottom: responsiveSize(2),
  },
  statSubtitle: {
    fontSize: responsiveFontSize(10),
    color: colors.textWhite,
    opacity: 0.8,
    textAlign: 'center',
  },
  studyTimeCard: {
    backgroundColor: colors.background,
    margin: responsiveSize(20),
    borderRadius: responsiveSize(16),
    padding: responsiveSize(20),
    ...shadows.medium,
  },
  studyTimeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveSize(12),
  },
  studyTimeTitle: {
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
    color: colors.textPrimary,
    marginLeft: responsiveSize(8),
  },
  studyTimeValue: {
    fontSize: responsiveFontSize(32),
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: responsiveSize(4),
  },
  studyTimeSubtitle: {
    fontSize: responsiveFontSize(12),
    color: colors.textTertiary,
    marginBottom: responsiveSize(8),
  },
  averageTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  averageTimeText: {
    fontSize: responsiveFontSize(12),
    color: colors.textTertiary,
    marginLeft: responsiveSize(4),
  },
  goalCard: {
    backgroundColor: colors.background,
    margin: responsiveSize(20),
    borderRadius: responsiveSize(16),
    padding: responsiveSize(20),
    ...shadows.medium,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveSize(16),
  },
  goalTitle: {
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
    color: colors.textPrimary,
    marginLeft: responsiveSize(8),
  },
  goalProgress: {
    alignItems: 'center',
  },
  goalProgressBar: {
    width: '100%',
    height: responsiveSize(8),
    backgroundColor: colors.borderLight,
    borderRadius: responsiveSize(4),
    marginBottom: responsiveSize(8),
  },
  goalProgressFill: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: responsiveSize(4),
  },
  goalProgressText: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: colors.textPrimary,
  },
  subjectsContainer: {
    paddingHorizontal: responsiveSize(20),
  },
  subjectCardWrapper: {
    marginBottom: responsiveSize(12),
  },
  subjectCard: {
    backgroundColor: colors.background,
    borderRadius: responsiveSize(12),
    padding: responsiveSize(16),
    ...shadows.small,
  },
  subjectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveSize(12),
  },
  subjectIcon: {
    width: responsiveSize(40),
    height: responsiveSize(40),
    borderRadius: responsiveSize(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsiveSize(12),
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: responsiveSize(2),
  },
  subjectStats: {
    fontSize: responsiveFontSize(12),
    color: colors.textTertiary,
  },
  accuracyContainer: {
    alignItems: 'center',
  },
  accuracyText: {
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    color: colors.primary,
  },
  progressBar: {
    width: '100%',
    height: responsiveSize(6),
    backgroundColor: colors.borderLight,
    borderRadius: responsiveSize(3),
    marginBottom: responsiveSize(12),
  },
  progressFill: {
    height: '100%',
    borderRadius: responsiveSize(3),
  },
  subjectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: responsiveFontSize(12),
    color: colors.textTertiary,
    marginLeft: responsiveSize(4),
  },
  bottomSpacing: {
    height: responsiveSize(20),
  },
});

export default PerformansScreen;
