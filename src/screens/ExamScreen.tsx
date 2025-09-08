import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { QuestionService, QuestionType } from '../services/questionService';
import {
    responsiveFontSize,
    responsiveSize
} from '../utils/responsive';
import { colors, shadows } from '../utils/theme';

interface ExamResult {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  emptyAnswers: number;
  score: number;
  percentage: number;
  timeSpent: number; // dakika cinsinden
}

interface ExamScreenProps {
  route: {
    params: {
      subject: string;
      examType?: 'TYT' | 'AYT' | 'YDT';
    };
  };
}

const ExamScreen: React.FC<ExamScreenProps> = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute();
  const { subject, examType } = route.params as { subject: string; examType?: 'TYT' | 'AYT' | 'YDT' };

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 dakika = 2700 saniye
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [loading, setLoading] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sınav başlatma - Garantili çalışan versiyon
  const startExam = useCallback(async () => {
    setLoading(true);
    
    // Direkt örnek sorularla başla - API'yi arka planda dene
    const sampleQuestions = QuestionService.generateSampleQuestions(subject, examType);
    setQuestions(sampleQuestions.slice(0, 45));
    setIsExamStarted(true);
    setTimeLeft(45 * 60);
    setLoading(false);
    
    // Arka planda API'den gerçek soruları dene
    setTimeout(async () => {
      try {
        const realQuestions = await QuestionService.getExamQuestionsBySubject(subject, examType);
        if (realQuestions.length > 0) {
          setQuestions(realQuestions);
        }
      } catch (error) {
        console.log('API soruları yüklenemedi, örnek sorularla devam ediliyor');
      }
    }, 100);
    
  }, [subject, examType, navigation]);

  // Timer efekti
  useEffect(() => {
    if (isExamStarted && timeLeft > 0 && !isExamFinished) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isExamStarted) {
      // Süre doldu, sınavı bitir
      finishExam();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isExamStarted, timeLeft, isExamFinished]);

  // Sınavı bitirme
  const finishExam = useCallback(() => {
    console.log('Sınav bitiriliyor...');
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Sonuçları hesapla ve modal'ı aç
    const result = calculateExamResult();
    console.log('Sınav sonuçları:', result);
    setExamResult(result);
    setShowResultModal(true);
    console.log('Modal açılıyor...');
    
    // Sınav durumunu güncelle
    setIsExamFinished(true);
  }, [questions, userAnswers, timeLeft, calculateExamResult]);

  // Sınav sonuçlarını hesaplama
  const calculateExamResult = useCallback((): ExamResult => {
    const totalQuestions = questions.length;
    let correctAnswers = 0;
    let wrongAnswers = 0;
    let emptyAnswers = 0;

    questions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      if (!userAnswer) {
        emptyAnswers++;
      } else if (userAnswer === question.correctAnswer) {
        correctAnswers++;
      } else {
        wrongAnswers++;
      }
    });

    const score = correctAnswers * 4 - wrongAnswers; // YKS puanlama sistemi
    const percentage = (correctAnswers / totalQuestions) * 100;
    const timeSpent = 45 - (timeLeft / 60); // Dakika cinsinden

    return {
      totalQuestions,
      correctAnswers,
      wrongAnswers,
      emptyAnswers,
      score,
      percentage,
      timeSpent,
    };
  }, [questions, userAnswers, timeLeft]);

  // Cevap seçme
  const selectAnswer = useCallback((answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));
  }, [currentQuestionIndex]);

  // Sonraki soru
  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex, questions.length]);

  // Önceki soru
  const prevQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  // Zamanı formatla
  const formatTime = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  // Modal kapatma ve ana sayfaya dönme
  const closeResultModal = useCallback(() => {
    setShowResultModal(false);
    navigation.goBack();
  }, [navigation]);


  // Soru kartı render
  const renderQuestion = useCallback(({ item, index }: { item: QuestionType; index: number }) => {
    const isCurrentQuestion = index === currentQuestionIndex;
    const userAnswer = userAnswers[index];

    if (!isCurrentQuestion) return null;

    return (
      <View style={styles.questionContainer}>
        <View style={styles.questionHeader}>
          <Text style={styles.questionNumber}>
            Soru {index + 1} / {questions.length}
          </Text>
          <Text style={styles.subjectLabel}>{subject}</Text>
        </View>

        <Text style={styles.questionText}>{item.questionText}</Text>

        <View style={styles.optionsContainer}>
          {item.options.map((option, optionIndex) => (
            <TouchableOpacity
              key={optionIndex}
              style={[
                styles.optionButton,
                userAnswer === option && styles.selectedOption,
              ]}
              onPress={() => selectAnswer(option)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.optionText,
                userAnswer === option && styles.selectedOptionText,
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }, [currentQuestionIndex, questions.length, subject, userAnswers, selectAnswer]);

  // Sınav başlatma ekranı
  if (!isExamStarted && !loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{subject} Sınavı</Text>
        </View>

        <View style={styles.startExamContainer}>
          <View style={styles.examInfoCard}>
            <MaterialCommunityIcons
              name="school"
              size={responsiveSize(60)}
              color={colors.primary}
              style={styles.examIcon}
            />
            <Text style={styles.examTitle}>{subject} Sınavı</Text>
            <Text style={styles.examDescription}>
              Bu sınavda {questions.length} soru bulunmaktadır.
            </Text>
            
            <View style={styles.examDetails}>
              <View style={styles.detailItem}>
                <MaterialCommunityIcons name="clock-outline" size={20} color={colors.textSecondary} />
                <Text style={styles.detailText}>45 dakika</Text>
              </View>
              <View style={styles.detailItem}>
                <MaterialCommunityIcons name="help-circle-outline" size={20} color={colors.textSecondary} />
                <Text style={styles.detailText}>{questions.length} soru</Text>
              </View>
              <View style={styles.detailItem}>
                <MaterialCommunityIcons name="calculator" size={20} color={colors.textSecondary} />
                <Text style={styles.detailText}>4 puan / doğru</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.startButton}
              onPress={startExam}
              activeOpacity={0.8}
            >
              <Text style={styles.startButtonText}>Sınavı Başlat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // Loading ekranı
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <MaterialCommunityIcons name="loading" size={40} color={colors.primary} />
          <Text style={styles.loadingText}>Sorular yükleniyor...</Text>
        </View>
      </View>
    );
  }

  // Sınav ekranı
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.examHeader}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.examHeaderTitle}>{subject}</Text>
        </View>
        
        <View style={styles.timerContainer}>
          <MaterialCommunityIcons name="clock-outline" size={20} color={colors.error} />
          <Text style={[
            styles.timerText,
            timeLeft < 300 && styles.timerWarning // 5 dakikadan az kaldığında kırmızı
          ]}>
            {formatTime(timeLeft)}
          </Text>
        </View>
      </View>

      {/* Soru Listesi */}
      <FlatList
        data={questions}
        renderItem={renderQuestion}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={styles.questionsList}
      />

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[
            styles.navButton,
            currentQuestionIndex === 0 && styles.navButtonDisabled,
          ]}
          onPress={prevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <MaterialCommunityIcons name="chevron-left" size={24} color={colors.textPrimary} />
          <Text style={styles.navButtonText}>Önceki</Text>
        </TouchableOpacity>

        <View style={styles.questionIndicator}>
          <Text style={styles.questionIndicatorText}>
            {currentQuestionIndex + 1} / {questions.length}
          </Text>
        </View>

        {currentQuestionIndex === questions.length - 1 ? (
          <TouchableOpacity
            style={[styles.navButton, styles.finishButton]}
            onPress={finishExam}
          >
            <Text style={styles.finishButtonText}>Bitir</Text>
            <MaterialCommunityIcons name="check" size={24} color={colors.textWhite} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.navButton}
            onPress={nextQuestion}
          >
            <Text style={styles.navButtonText}>Sonraki</Text>
            <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Sonuç Modalı */}
      <Modal
        visible={showResultModal}
        animationType="slide"
        transparent
      >
        <View style={styles.modalOverlay}>
          <View style={styles.resultModal}>
            <View style={styles.resultHeader}>
              <MaterialCommunityIcons
                name="chart-line"
                size={responsiveSize(50)}
                color={colors.primary}
              />
              <Text style={styles.resultTitle}>Sınav Sonuçları</Text>
              <Text style={styles.resultSubtitle}>{subject} Sınavı</Text>
            </View>

            {examResult && (
              <View style={styles.resultContent}>
                <View style={styles.resultStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{examResult.correctAnswers}</Text>
                    <Text style={styles.statLabel}>Doğru</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{examResult.wrongAnswers}</Text>
                    <Text style={styles.statLabel}>Yanlış</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{examResult.emptyAnswers}</Text>
                    <Text style={styles.statLabel}>Boş</Text>
                  </View>
                </View>

                <View style={styles.scoreContainer}>
                  <Text style={styles.scoreLabel}>YKS Puanınız</Text>
                  <Text style={styles.scoreValue}>{examResult.score}</Text>
                  <Text style={styles.percentageText}>
                    %{examResult.percentage.toFixed(1)} Başarı Oranı
                  </Text>
                </View>

                <View style={styles.detailedStats}>
                  <View style={styles.detailRow}>
                    <MaterialCommunityIcons name="check-circle" size={20} color={colors.success} />
                    <Text style={styles.detailText}>
                      {examResult.correctAnswers} doğru cevap ({examResult.correctAnswers * 4} puan)
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <MaterialCommunityIcons name="close-circle" size={20} color={colors.error} />
                    <Text style={styles.detailText}>
                      {examResult.wrongAnswers} yanlış cevap (-{examResult.wrongAnswers} puan)
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <MaterialCommunityIcons name="help-circle" size={20} color={colors.textSecondary} />
                    <Text style={styles.detailText}>
                      {examResult.emptyAnswers} boş bırakılan soru
                    </Text>
                  </View>
                </View>

                <View style={styles.timeInfo}>
                  <MaterialCommunityIcons name="clock-outline" size={20} color={colors.textSecondary} />
                  <Text style={styles.timeText}>
                    Kullanılan süre: {examResult.timeSpent.toFixed(1)} dakika
                  </Text>
                </View>
              </View>
            )}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeResultModal}
              activeOpacity={0.8}
            >
              <Text style={styles.closeButtonText}>Tamam</Text>
            </TouchableOpacity>
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
    paddingHorizontal: responsiveSize(20),
    paddingTop: responsiveSize(20),
    paddingBottom: responsiveSize(10),
  },
  backButton: {
    padding: responsiveSize(8),
    marginRight: responsiveSize(12),
  },
  headerTitle: {
    fontSize: responsiveFontSize(20),
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  startExamContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(20),
  },
  examInfoCard: {
    backgroundColor: colors.textWhite,
    borderRadius: responsiveSize(20),
    padding: responsiveSize(30),
    alignItems: 'center',
    ...shadows.medium,
    width: '100%',
    maxWidth: responsiveSize(400),
  },
  examIcon: {
    marginBottom: responsiveSize(20),
  },
  examTitle: {
    fontSize: responsiveFontSize(24),
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: responsiveSize(10),
    textAlign: 'center',
  },
  examDescription: {
    fontSize: responsiveFontSize(16),
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: responsiveSize(30),
  },
  examDetails: {
    width: '100%',
    marginBottom: responsiveSize(30),
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveSize(15),
  },
  detailText: {
    fontSize: responsiveFontSize(16),
    color: colors.textSecondary,
    marginLeft: responsiveSize(10),
  },
  startButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: responsiveSize(40),
    paddingVertical: responsiveSize(15),
    borderRadius: responsiveSize(25),
    width: '100%',
    alignItems: 'center',
  },
  startButtonText: {
    color: colors.textWhite,
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: responsiveFontSize(16),
    color: colors.textSecondary,
    marginTop: responsiveSize(10),
  },
  examHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(20),
    paddingTop: responsiveSize(20),
    paddingBottom: responsiveSize(10),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  examHeaderTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.error + '20',
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(6),
    borderRadius: responsiveSize(15),
  },
  timerText: {
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
    color: colors.error,
    marginLeft: responsiveSize(5),
  },
  timerWarning: {
    color: colors.error,
  },
  questionsList: {
    flex: 1,
  },
  questionContainer: {
    flex: 1,
    paddingHorizontal: responsiveSize(20),
    paddingVertical: responsiveSize(15),
    justifyContent: 'space-between',
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveSize(20),
  },
  questionNumber: {
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
    color: colors.primary,
  },
  subjectLabel: {
    fontSize: responsiveFontSize(14),
    color: colors.textSecondary,
    backgroundColor: colors.primary + '20',
    paddingHorizontal: responsiveSize(10),
    paddingVertical: responsiveSize(4),
    borderRadius: responsiveSize(10),
  },
  questionText: {
    fontSize: responsiveFontSize(17),
    color: colors.textPrimary,
    lineHeight: responsiveSize(24),
    marginBottom: responsiveSize(25),
    flexWrap: 'wrap',
    flexShrink: 1,
    fontWeight: '500',
  },
  optionsContainer: {
    flex: 1,
  },
  optionButton: {
    backgroundColor: colors.textWhite,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: responsiveSize(12),
    padding: responsiveSize(15),
    marginBottom: responsiveSize(12),
    minHeight: responsiveSize(60),
    width: '100%',
    justifyContent: 'center',
    ...shadows.small,
  },
  selectedOption: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  optionText: {
    fontSize: responsiveFontSize(15),
    color: colors.textPrimary,
    lineHeight: responsiveSize(22),
    flexWrap: 'wrap',
    flexShrink: 1,
    textAlign: 'center',
  },
  selectedOptionText: {
    color: colors.primary,
    fontWeight: '600',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(20),
    paddingVertical: responsiveSize(15),
    backgroundColor: colors.textWhite,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(15),
    paddingVertical: responsiveSize(10),
    borderRadius: responsiveSize(8),
    backgroundColor: colors.background,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: responsiveFontSize(14),
    color: colors.textPrimary,
    marginHorizontal: responsiveSize(5),
  },
  questionIndicator: {
    backgroundColor: colors.primary,
    paddingHorizontal: responsiveSize(15),
    paddingVertical: responsiveSize(8),
    borderRadius: responsiveSize(15),
  },
  questionIndicatorText: {
    color: colors.textWhite,
    fontSize: responsiveFontSize(14),
    fontWeight: 'bold',
  },
  finishButton: {
    backgroundColor: colors.error,
  },
  finishButtonText: {
    color: colors.textWhite,
    fontSize: responsiveFontSize(14),
    fontWeight: 'bold',
    marginRight: responsiveSize(5),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultModal: {
    backgroundColor: colors.textWhite,
    borderRadius: responsiveSize(20),
    padding: responsiveSize(30),
    width: '90%',
    maxWidth: responsiveSize(400),
    alignItems: 'center',
  },
  resultHeader: {
    alignItems: 'center',
    marginBottom: responsiveSize(30),
  },
  resultTitle: {
    fontSize: responsiveFontSize(22),
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: responsiveSize(10),
    textAlign: 'center',
  },
  resultSubtitle: {
    fontSize: responsiveFontSize(16),
    color: colors.textSecondary,
    marginTop: responsiveSize(5),
    textAlign: 'center',
  },
  resultContent: {
    width: '100%',
    marginBottom: responsiveSize(30),
  },
  resultStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: responsiveSize(25),
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: responsiveFontSize(24),
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: responsiveFontSize(14),
    color: colors.textSecondary,
    marginTop: responsiveSize(5),
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: responsiveSize(20),
  },
  scoreLabel: {
    fontSize: responsiveFontSize(16),
    color: colors.textSecondary,
  },
  scoreValue: {
    fontSize: responsiveFontSize(36),
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: responsiveSize(5),
  },
  percentageText: {
    fontSize: responsiveFontSize(16),
    color: colors.textSecondary,
    marginTop: responsiveSize(5),
  },
  detailedStats: {
    marginBottom: responsiveSize(20),
    paddingHorizontal: responsiveSize(10),
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveSize(8),
  },
  detailText: {
    fontSize: responsiveFontSize(14),
    color: colors.textPrimary,
    marginLeft: responsiveSize(8),
    flex: 1,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: responsiveFontSize(14),
    color: colors.textSecondary,
    marginLeft: responsiveSize(5),
  },
  closeButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: responsiveSize(40),
    paddingVertical: responsiveSize(12),
    borderRadius: responsiveSize(20),
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: colors.textWhite,
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
  },
});

export default ExamScreen;
