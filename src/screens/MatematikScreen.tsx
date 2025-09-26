import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getMathematicsQuestions } from '../data/questionRepository';
import { responsiveFontSize, responsiveSize } from '../utils/responsive';
import { colors, shadows } from '../utils/theme';

const MatematikScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [mathematicsQuestions, setMathematicsQuestions] = useState<any[]>([]);
  const [questionCounts, setQuestionCounts] = useState({
    algebra: 0,
    geometry: 0,
    analysis: 0,
    total: 0,
  });

  useEffect(() => {
    const questions = getMathematicsQuestions();
    setMathematicsQuestions(questions);

    // Matematik alt kategorileri için soru sayısını hesapla
    const algebraCount = questions.filter(q =>
      q.tags?.some(
        tag =>
          tag.includes('cebir') ||
          tag.includes('denklem') ||
          tag.includes('fonksiyon')
      )
    ).length;
    const geometryCount = questions.filter(q =>
      q.tags?.some(
        tag =>
          tag.includes('geometri') ||
          tag.includes('açı') ||
          tag.includes('alan')
      )
    ).length;
    const analysisCount = questions.filter(q =>
      q.tags?.some(
        tag =>
          tag.includes('analiz') ||
          tag.includes('limit') ||
          tag.includes('türev')
      )
    ).length;

    setQuestionCounts({
      algebra: algebraCount,
      geometry: geometryCount,
      analysis: analysisCount,
      total: questions.length,
    });
  }, []);

  const handleStartQuestions = () => {
    // questionRepository.ts formatını QuestionType formatına dönüştür
    const convertedQuestions = mathematicsQuestions.map((q, index) => {
      // Matematik için uygun yanlış seçenekler oluştur
      const wrongOptions = ['A', 'B', 'C', 'D'];

      // Doğru cevabı seçenekler arasına karıştır
      const allOptions = [q.answer, ...wrongOptions].sort(
        () => Math.random() - 0.5
      );

      return {
        id: q.id,
        questionText: q.question,
        options: allOptions,
        correctAnswer: q.answer,
        explanation: q.explanation,
        subject: q.subject,
        topic: q.subject, // Ders adını topic olarak kullan
        topicId: q.subject.toLowerCase(), // Ders adını topicId olarak kullan
        difficulty:
          q.difficulty === 'easy' ? 1 : q.difficulty === 'medium' ? 2 : 3,
        examType: q.examType as 'TYT' | 'AYT' | 'YDT',
        isPastQuestion: true, // questionRepository'den gelen sorular çıkmış sorular
        year: q.examYear,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    });

    navigation.navigate('QuestionScreen', {
      examType: 'TYT',
      subject: 'Matematik',
      isPastQuestion: false,
      questions: convertedQuestions, // Dönüştürülmüş soruları geç
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('HomeScreen')}
      >
        <Text style={styles.backText}>{'<'} Geri</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Matematik</Text>
        <Text style={styles.subtitle}>Cebir, Geometri, Analiz</Text>

        <View style={styles.questionStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{questionCounts.algebra}</Text>
            <Text style={styles.statLabel}>Cebir</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{questionCounts.geometry}</Text>
            <Text style={styles.statLabel}>Geometri</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{questionCounts.analysis}</Text>
            <Text style={styles.statLabel}>Analiz</Text>
          </View>
        </View>

        <Text style={styles.totalQuestions}>
          Toplam {questionCounts.total} soru
        </Text>

        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartQuestions}
          disabled={questionCounts.total === 0}
        >
          <Text style={styles.startButtonText}>
            {questionCounts.total > 0
              ? 'Çalışma Sorularını Başlat'
              : 'Soru Bulunamadı'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundTertiary,
    paddingTop: responsiveSize(35),
  },
  backButton: {
    position: 'absolute',
    top: responsiveSize(70),
    left: responsiveSize(20),
    padding: responsiveSize(8),
    borderRadius: responsiveSize(8),
    ...shadows.small,
  },
  backText: {
    fontSize: responsiveFontSize(16),
    color: colors.gradients.blue[0],
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsiveSize(20),
  },
  title: {
    fontSize: responsiveFontSize(28),
    fontWeight: 'bold',
    color: colors.gradients.blue[0],
    marginBottom: responsiveSize(10),
  },
  subtitle: {
    fontSize: responsiveFontSize(18),
    color: colors.textSecondary,
    marginBottom: responsiveSize(40),
  },
  startButton: {
    backgroundColor: colors.gradients.blue[0],
    paddingHorizontal: responsiveSize(30),
    paddingVertical: responsiveSize(15),
    borderRadius: responsiveSize(12),
    ...shadows.medium,
  },
  startButtonText: {
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
    color: colors.textWhite,
  },
  questionStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: responsiveSize(20),
    paddingHorizontal: responsiveSize(20),
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingVertical: responsiveSize(15),
    paddingHorizontal: responsiveSize(20),
    borderRadius: responsiveSize(12),
    minWidth: responsiveSize(80),
    ...shadows.small,
  },
  statNumber: {
    fontSize: responsiveFontSize(24),
    fontWeight: 'bold',
    color: colors.gradients.blue[0],
    marginBottom: responsiveSize(4),
  },
  statLabel: {
    fontSize: responsiveFontSize(14),
    color: colors.textSecondary,
    fontWeight: '500',
  },
  totalQuestions: {
    fontSize: responsiveFontSize(16),
    color: colors.textSecondary,
    marginBottom: responsiveSize(30),
    textAlign: 'center',
  },
});

export default MatematikScreen;