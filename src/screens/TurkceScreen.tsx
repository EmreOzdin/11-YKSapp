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

  useEffect(() => {
    const questions = getTurkishQuestions();
    setTurkishQuestions(questions);
  }, []);

  const handleStartQuestions = () => {
    navigation.navigate('QuestionScreen', {
      examType: 'TYT',
      subject: 'Türkçe',
      isPastQuestion: false,
      questions: turkishQuestions, // Türkçe sorularını geç
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
        <Text style={styles.subtitle}>Dilbilgisi, Anlatım, Okuma</Text>
        <Text style={styles.questionCount}>
          {turkishQuestions.length} soru mevcut
        </Text>

        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartQuestions}
        >
          <Text style={styles.startButtonText}>Çalışma Sorularını Başlat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundTertiary,
    paddingTop: responsiveSize(45),
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
});

export default TurkceScreen;