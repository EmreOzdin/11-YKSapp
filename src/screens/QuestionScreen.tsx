import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase, useRoute, RouteProp } from '@react-navigation/native';
import { responsiveSize, responsiveFontSize } from '../utils/responsive';
import { colors, typography, shadows } from '../utils/theme';
import { QuestionType, QuestionService } from '../services/questionService';

type QuestionScreenRouteProp = RouteProp<{
  QuestionScreen: { 
    examType?: "TYT" | "AYT" | "YDT"; 
    subject?: string; 
    isPastQuestion?: boolean;
  };
}, 'QuestionScreen'>;

const QuestionScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute<QuestionScreenRouteProp>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [userSelections, setUserSelections] = useState<any>(null);
  const [showExplanationModal, setShowExplanationModal] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      
      let userQuestions: QuestionType[] = [];

      // Eğer subject parametresi varsa, sadece o derse ait soruları getir
      if (route.params.subject) {
        userQuestions = await QuestionService.getQuestionsBySubjectOnly(route.params.subject);
      } else {
        // Kullanıcı seçimlerini kontrol et
        const selections = await QuestionService.getUserSelections();
        setUserSelections(selections);

        if (!selections || selections.selectedTopics.length === 0) {
          Alert.alert(
            "Konu Seçimi Gerekli",
            "Çalışmak istediğiniz konuları seçmeniz gerekiyor.",
            [
              {
                text: "Konu Seç",
                onPress: () => navigation.navigate('TopicSelectionScreen', { 
                  examType: route.params.examType || 'TYT' 
                })
              },
              {
                text: "İptal",
                style: "cancel"
              }
            ]
          );
          return;
        }

        // Seçilen konulara göre soruları getir
        userQuestions = await QuestionService.getQuestionsByUserSelections();
      }
      
      if (userQuestions.length === 0) {
        Alert.alert(
          "Soru Bulunamadı",
          route.params.subject 
            ? `${route.params.subject} dersinde henüz soru bulunmuyor.`
            : "Seçtiğiniz konularda henüz soru bulunmuyor. Lütfen farklı konular seçin veya daha sonra tekrar deneyin.",
          [
            {
              text: "Ana Sayfa",
              onPress: () => navigation.navigate('HomeScreen')
            }
          ]
        );
        return;
      }

      // Rastgele karıştır
      const shuffledQuestions = userQuestions.sort(() => 0.5 - Math.random());
      setQuestions(shuffledQuestions);
      
    } catch (error) {
      console.error('Sorular yüklenirken hata:', error);
      Alert.alert("Hata", "Sorular yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Sorular yükleniyor...</Text>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Henüz soru bulunmuyor</Text>
        <TouchableOpacity 
          style={styles.emptyButton}
          onPress={() => navigation.navigate('TopicSelectionScreen', { 
            examType: route.params.examType || 'TYT' 
          })}
        >
          <Text style={styles.emptyButtonText}>Konu Seç</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    const isAnswerCorrect = answer === currentQuestion.correctAnswer;
    setIsCorrect(isAnswerCorrect);
    
    if (isAnswerCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      // Tüm sorular tamamlandı
      const percentage = Math.round((score / questions.length) * 100);
      Alert.alert(
        "Tebrikler!",
        `Test tamamlandı!\nDoğru: ${score}/${questions.length} (%${percentage})`,
        [
          {
            text: "Tekrar Çöz",
            onPress: () => {
              setCurrentQuestionIndex(0);
              setSelectedAnswer(null);
              setIsAnswered(false);
              setIsCorrect(false);
              setScore(0);
              // Soruları tekrar karıştır
              const shuffledQuestions = questions.sort(() => 0.5 - Math.random());
              setQuestions(shuffledQuestions);
            }
          },
          {
            text: "Ana Sayfaya Dön",
            onPress: () => navigation.navigate('HomeScreen')
          }
        ]
      );
    }
  };

  const getOptionStyle = (option: string, index: number) => {
    if (!isAnswered) {
      return [styles.optionButton, selectedAnswer === option && styles.selectedOption];
    }

    const correctAnswer = currentQuestion.correctAnswer;
    const optionLetter = String.fromCharCode(65 + index);

    if (optionLetter === correctAnswer) {
      return [styles.optionButton, styles.correctOption];
    } else if (selectedAnswer === option && optionLetter !== correctAnswer) {
      return [styles.optionButton, styles.incorrectOption];
    } else {
      return [styles.optionButton, styles.disabledOption];
    }
  };

  const getOptionTextStyle = (option: string, index: number) => {
    if (!isAnswered) {
      return [styles.optionText, selectedAnswer === option && styles.selectedOptionText];
    }

    const correctAnswer = currentQuestion.correctAnswer;
    const optionLetter = String.fromCharCode(65 + index);

    if (optionLetter === correctAnswer) {
      return [styles.optionText, styles.correctOptionText];
    } else if (selectedAnswer === option && optionLetter !== correctAnswer) {
      return [styles.optionText, styles.incorrectOptionText];
    } else {
      return [styles.optionText, styles.disabledOptionText];
    }
  };

  const getDifficultyText = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'Kolay';
      case 2: return 'Orta';
      case 3: return 'Zor';
      default: return 'Bilinmiyor';
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return colors.success;
      case 2: return colors.warning;
      case 3: return colors.error;
      default: return colors.textSecondary;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>{'<'} Geri</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.questionCounter}>
            Soru {currentQuestionIndex + 1}/{questions.length}
          </Text>
          <Text style={styles.scoreText}>Puan: {score}</Text>
        </View>
      </View>

      {/* Question Card */}
      <View style={styles.questionCard}>
        <View style={styles.questionHeader}>
          <Text style={styles.questionTitle}>Soru #{currentQuestionIndex + 1}</Text>
          <View style={styles.questionMeta}>
            <Text style={styles.subjectText}>{currentQuestion.subject}</Text>
            <Text style={[
              styles.difficultyText, 
              { color: getDifficultyColor(currentQuestion.difficulty) }
            ]}>
              {getDifficultyText(currentQuestion.difficulty)}
            </Text>
          </View>
        </View>
        <Text style={styles.questionText}>{currentQuestion.questionText}</Text>
        <Text style={styles.topicText}>Konu: {currentQuestion.topic}</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => {
          const optionLetter = String.fromCharCode(65 + index);
          return (
            <TouchableOpacity
              key={index}
              style={getOptionStyle(option, index)}
              onPress={() => handleAnswerSelect(optionLetter)}
              disabled={isAnswered}
            >
              <Text style={styles.optionLetter}>{optionLetter})</Text>
              <Text style={getOptionTextStyle(option, index)}>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Answer Feedback */}
      {isAnswered && (
        <View style={styles.feedbackContainer}>
          <View style={[styles.feedbackCard, isCorrect ? styles.correctFeedback : styles.incorrectFeedback]}>
            <Text style={[styles.feedbackIcon, isCorrect && styles.correctIcon]}>
              {isCorrect ? '✓' : '❌'}
            </Text>
            <Text style={styles.feedbackText}>
              {isCorrect ? 'Doğru!' : 'Yanlış!'}
            </Text>
            <Text style={styles.correctAnswerText}>
              Doğru cevap: {currentQuestion.correctAnswer}
            </Text>
          </View>
          
          {/* Açıklama - Sadece doğru cevaplarda göster */}
          {isCorrect && (
            <Text style={styles.explanationText}>
              <Text style={styles.explanationTitle}>Açıklama:</Text> {currentQuestion.explanation}
            </Text>
          )}
          
          {/* Butonlar - Yan yana yerleştirilmiş */}
          <View style={styles.buttonContainer}>
            {/* Açıklama Butonu - Sadece yanlış cevaplarda göster */}
            {!isCorrect && (
              <TouchableOpacity 
                style={styles.explanationButton}
                onPress={() => setShowExplanationModal(true)}
              >
                <Text style={styles.explanationButtonText}>Açıklamayı Göster</Text>
              </TouchableOpacity>
            )}
            
            {/* Sonraki Soru Butonu */}
            <TouchableOpacity 
              style={styles.nextButton} 
              onPress={handleNextQuestion}
            >
              <Text style={styles.nextButtonText}>
                {currentQuestionIndex < questions.length - 1 ? 'Sonraki Soru' : 'Testi Tamamla'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Açıklama Modal */}
      <Modal
        visible={showExplanationModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowExplanationModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Soru Açıklaması</Text>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowExplanationModal(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalBody}>
              <View style={styles.explanationSection}>
                <Text style={styles.explanationText}>
                  {currentQuestion.explanation || 'Açıklama bulunmuyor.'}
                </Text>
              </View>
            </ScrollView>
            
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setShowExplanationModal(false)}
            >
              <Text style={styles.modalCloseButtonText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {currentQuestionIndex + 1} / {questions.length}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundTertiary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundTertiary,
  },
  loadingText: {
    fontSize: responsiveFontSize(18),
    color: colors.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundTertiary,
    paddingHorizontal: responsiveSize(20),
  },
  emptyText: {
    fontSize: responsiveFontSize(18),
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: responsiveSize(20),
  },
  emptyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: responsiveSize(30),
    paddingVertical: responsiveSize(15),
    borderRadius: responsiveSize(12),
  },
  emptyButtonText: {
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
    color: colors.textWhite,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(20),
    paddingTop: responsiveSize(40),
    paddingBottom: responsiveSize(20),
  },
  backButton: {
    padding: responsiveSize(8),
    borderRadius: responsiveSize(8),
    backgroundColor: colors.backgroundSecondary,
  },
  backText: {
    fontSize: responsiveFontSize(16),
    color: colors.gradients.blue[0],
    fontWeight: 'bold',
  },
  headerInfo: {
    alignItems: 'flex-end',
  },
  questionCounter: {
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    color: colors.gradients.blue[0],
  },
  scoreText: {
    fontSize: responsiveFontSize(14),
    color: colors.textSecondary,
  },
  questionCard: {
    backgroundColor: colors.backgroundSecondary,
    margin: responsiveSize(20),
    marginTop: responsiveSize(15),
    padding: responsiveSize(20),
    borderRadius: responsiveSize(12),
    ...shadows.medium,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveSize(10),
  },
  questionTitle: {
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
    color: colors.textSecondary,
  },
  questionMeta: {
    alignItems: 'flex-end',
  },
  subjectText: {
    fontSize: responsiveFontSize(12),
    color: colors.textSecondary,
    fontWeight: '500',
  },
  difficultyText: {
    fontSize: responsiveFontSize(12),
    fontWeight: 'bold',
  },
  questionText: {
    fontSize: responsiveFontSize(18),
    color: colors.textPrimary,
    lineHeight: responsiveFontSize(24),
    marginBottom: responsiveSize(10),
  },
  topicText: {
    fontSize: responsiveFontSize(14),
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  optionsContainer: {
    paddingHorizontal: responsiveSize(20),
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    padding: responsiveSize(16),
    marginVertical: responsiveSize(8),
    borderRadius: responsiveSize(12),
    borderWidth: 2,
    borderColor: colors.borderLight,
    ...shadows.small,
  },
  selectedOption: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '20',
  },
  correctOption: {
    borderColor: colors.success,
    backgroundColor: colors.success + '20',
  },
  incorrectOption: {
    borderColor: colors.error,
    backgroundColor: colors.error + '20',
  },
  disabledOption: {
    opacity: 0.6,
  },
  optionLetter: {
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
    color: colors.textSecondary,
    marginRight: responsiveSize(12),
    minWidth: responsiveSize(24),
  },
  optionText: {
    flex: 1,
    fontSize: responsiveFontSize(16),
    color: colors.textPrimary,
  },
  selectedOptionText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  correctOptionText: {
    color: colors.success,
    fontWeight: 'bold',
  },
  incorrectOptionText: {
    color: colors.error,
    fontWeight: 'bold',
  },
  disabledOptionText: {
    color: colors.textSecondary,
  },
  feedbackContainer: {
    paddingHorizontal: responsiveSize(20),
    marginTop: responsiveSize(15),
  },
  feedbackCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: responsiveSize(16),
    borderRadius: responsiveSize(12),
    marginBottom: responsiveSize(12),
  },
  correctFeedback: {
    backgroundColor: colors.success + '20',
    borderColor: colors.success,
    borderWidth: 1,
  },
  incorrectFeedback: {
    backgroundColor: colors.error + '20',
    borderColor: colors.error,
    borderWidth: 1,
  },
  feedbackIcon: {
    fontSize: responsiveFontSize(24),
    marginRight: responsiveSize(8),
  },
  correctIcon: {
    color: colors.success,
  },
  feedbackText: {
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
    flex: 1,
  },
  correctAnswerText: {
    fontSize: responsiveFontSize(14),
    fontWeight: 'bold',
  },
  explanationText: {
    fontSize: responsiveFontSize(16),
    color: colors.textPrimary,
    lineHeight: responsiveFontSize(24),
  },
  explanationTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: responsiveSize(15),
  },
  nextButton: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: responsiveSize(16),
    borderRadius: responsiveSize(12),
    alignItems: 'center',
    ...shadows.medium,
  },
  nextButtonText: {
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
    color: colors.textWhite,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(20),
    paddingVertical: responsiveSize(20),
  },
  progressBar: {
    flex: 1,
    height: responsiveSize(8),
    backgroundColor: colors.borderLight,
    borderRadius: responsiveSize(4),
    marginRight: responsiveSize(12),
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: responsiveSize(4),
  },
  progressText: {
    fontSize: responsiveFontSize(14),
    color: colors.textSecondary,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: responsiveSize(10),
    marginTop: responsiveSize(10),
  },
  explanationButton: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: responsiveSize(12),
    borderRadius: responsiveSize(8),
    alignItems: 'center',
  },
  explanationButtonText: {
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
    color: colors.textWhite,
    marginTop: responsiveSize(4),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: responsiveSize(16),
    margin: responsiveSize(20),
    maxHeight: '90%',
    minHeight: responsiveSize(400),
    width: '90%',
    ...shadows.large,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: responsiveSize(20),
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  modalTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  closeButton: {
    padding: responsiveSize(8),
  },
  closeButtonText: {
    fontSize: responsiveFontSize(20),
    color: colors.textSecondary,
    fontWeight: 'bold',
  },
  modalBody: {
    flex: 1,
    padding: responsiveSize(20),
  },
  questionSection: {
    marginBottom: responsiveSize(20),
  },
  modalQuestionText: {
    fontSize: responsiveFontSize(16),
    color: colors.textPrimary,
    lineHeight: responsiveFontSize(22),
    marginBottom: responsiveSize(15),
    fontWeight: '500',
  },
  optionsSection: {
    marginBottom: responsiveSize(20),
  },
  optionsTitle: {
    fontSize: responsiveFontSize(14),
    fontWeight: 'bold',
    color: colors.textSecondary,
    marginBottom: responsiveSize(10),
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: responsiveSize(12),
    marginBottom: responsiveSize(8),
    borderRadius: responsiveSize(8),
    backgroundColor: colors.backgroundTertiary,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  modalCorrectOption: {
    borderColor: colors.success,
    backgroundColor: colors.success + '10',
  },
  modalIncorrectOption: {
    borderColor: colors.error,
    backgroundColor: colors.error + '10',
  },
  modalOptionLetter: {
    fontSize: responsiveFontSize(14),
    fontWeight: 'bold',
    color: colors.textSecondary,
    marginRight: responsiveSize(8),
    minWidth: responsiveSize(20),
  },
  modalOptionText: {
    flex: 1,
    fontSize: responsiveFontSize(14),
    color: colors.textPrimary,
  },
  modalCorrectOptionText: {
    color: colors.success,
    fontWeight: 'bold',
  },
  modalIncorrectOptionText: {
    color: colors.error,
    fontWeight: 'bold',
  },
  correctBadge: {
    fontSize: responsiveFontSize(12),
    color: colors.success,
    fontWeight: 'bold',
    marginLeft: responsiveSize(8),
  },
  incorrectBadge: {
    fontSize: responsiveFontSize(12),
    color: colors.error,
    fontWeight: 'bold',
    marginLeft: responsiveSize(8),
  },
  explanationSection: {
    marginTop: responsiveSize(15),
    padding: responsiveSize(25),
    backgroundColor: colors.backgroundTertiary,
    borderRadius: responsiveSize(8),
    marginHorizontal: responsiveSize(10),
  },
  modalCloseButton: {
    backgroundColor: colors.primary,
    padding: responsiveSize(15),
    margin: responsiveSize(20),
    borderRadius: responsiveSize(8),
    alignItems: 'center',
  },
  modalCloseButtonText: {
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
    color: colors.textWhite,
  },
});

export default QuestionScreen;
