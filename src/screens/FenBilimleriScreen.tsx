import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getScienceQuestions } from '../data/questionRepository';
import { responsiveFontSize, responsiveSize } from '../utils/responsive';
import { colors, shadows } from '../utils/theme';

const FenBilimleriScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [scienceQuestions, setScienceQuestions] = useState<any[]>([]);
  const [questionCounts, setQuestionCounts] = useState({
    physics: 0,
    chemistry: 0,
    biology: 0,
    total: 0,
  });

  useEffect(() => {
    // questionRepository.ts'den Fen Bilimleri sorularını al
    const questions = getScienceQuestions();
    setScienceQuestions(questions);

    // Her ders için soru sayısını hesapla
    const physicsCount = questions.filter(q => q.subject === 'Fizik').length;
    const chemistryCount = questions.filter(q => q.subject === 'Kimya').length;
    const biologyCount = questions.filter(q => q.subject === 'Biyoloji').length;

    setQuestionCounts({
      physics: physicsCount,
      chemistry: chemistryCount,
      biology: biologyCount,
      total: questions.length,
    });
  }, []);

  const handleStartQuestions = () => {
    // questionRepository.ts formatını QuestionType formatına dönüştür
    const convertedQuestions = scienceQuestions.map((q, index) => {
      // Ders bazlı seçenekler oluştur
      let wrongOptions: string[] = [];

      if (q.subject === 'Fizik') {
        wrongOptions = ['50 m', '200 m', '25 m'];
      } else if (q.subject === 'Kimya') {
        wrongOptions = ['H₂O', 'CO₂', 'NaCl'];
      } else if (q.subject === 'Biyoloji') {
        wrongOptions = ['DNA', 'RNA', 'Protein'];
      } else {
        wrongOptions = ['A', 'B', 'C'];
      }

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
      subject: 'Fen Bilimleri',
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
        <Text style={styles.title}>Fen Bilimleri</Text>
        <Text style={styles.subtitle}>Fizik, Kimya, Biyoloji</Text>

        {/* Soru sayıları */}
        <View style={styles.questionStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{questionCounts.physics}</Text>
            <Text style={styles.statLabel}>Fizik</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{questionCounts.chemistry}</Text>
            <Text style={styles.statLabel}>Kimya</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{questionCounts.biology}</Text>
            <Text style={styles.statLabel}>Biyoloji</Text>
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

export default FenBilimleriScreen;