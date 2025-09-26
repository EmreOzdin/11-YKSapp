import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getTurkishQuestions } from '../data/questionRepository';
import { responsiveFontSize, responsiveSize } from '../utils/responsive';
import { colors, shadows } from '../utils/theme';

const TurkceScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [turkishQuestions, setTurkishQuestions] = useState<any[]>([]);
  const [questionCounts, setQuestionCounts] = useState({
    total: 0,
  });

  useEffect(() => {
    const questions = getTurkishQuestions();
    setTurkishQuestions(questions);

    setQuestionCounts({
      total: questions.length,
    });
  }, []);

  const handleStartQuestions = () => {
    // questionRepository.ts formatını QuestionType formatına dönüştür
    const convertedQuestions = turkishQuestions.map((q, index) => {
      return {
        id: q.id,
        questionText: q.question,
        options: q.options,
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
        examYear: q.examYear,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    });

    navigation.navigate('QuestionScreen', {
      examType: 'TYT',
      subject: 'Türkçe',
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
        <Text style={styles.title}>Türkçe</Text>

        {/* Bilgilendirme kartı */}
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            • Dilbilgisi kuralları ve yazım{'\n'}• Anlatım teknikleri ve cümle
            yapısı{'\n'}• Paragraf okuma ve anlama{'\n'}• Sözcükte anlam ve
            cümlede anlam{'\n'}• Noktalama işaretleri ve yazım kuralları
          </Text>
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
  questionCount: {
    fontSize: responsiveFontSize(16),
    color: colors.gradients.blue[0],
    fontWeight: '600',
    marginBottom: responsiveSize(30),
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
  totalQuestions: {
    fontSize: responsiveFontSize(16),
    color: colors.textSecondary,
    marginBottom: responsiveSize(30),
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: colors.background,
    padding: responsiveSize(20),
    borderRadius: responsiveSize(12),
    marginBottom: responsiveSize(20),
    marginHorizontal: responsiveSize(20),
    ...shadows.small,
  },
  infoText: {
    fontSize: responsiveFontSize(14),
    color: colors.textSecondary,
    lineHeight: responsiveFontSize(20),
    textAlign: 'left',
  },
});

export default TurkceScreen;