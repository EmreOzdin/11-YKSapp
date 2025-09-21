import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationProp, ParamListBase, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getMockExamQuestions } from '../services/localCardsService';
import { QuestionService, QuestionType } from '../services/questionService';
import { responsiveFontSize, responsiveSize } from '../utils/responsive';
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
  const { subject, examType } = route.params as {
    subject: string;
    examType?: 'TYT' | 'AYT' | 'YDT';
  };

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
    const sampleQuestions = QuestionService.generateSampleQuestions(
      subject,
      examType
    );
    setQuestions(sampleQuestions.slice(0, 45));
    setIsExamStarted(true);
    setTimeLeft(45 * 60);
    setLoading(false);

    // Arka planda gerçek soruları dene (önce soru deposundan, sonra API'den)
    setTimeout(async () => {
      try {
        // Önce soru deposundan TYT sorularını dene
        if (examType === 'TYT') {
          const mockQuestions = await getMockExamQuestions();
          if (mockQuestions.length > 0) {
            // MemoryCard formatını QuestionType formatına dönüştür
            const convertedQuestions: QuestionType[] = mockQuestions.map(
              (card, index) => ({
                id: card.id,
                questionText: card.question,
                options: [
                  card.answer,
                  'Yanlış Seçenek 1',
                  'Yanlış Seçenek 2',
                  'Yanlış Seçenek 3',
                ].sort(() => 0.5 - Math.random()), // Seçenekleri karıştır
                correctAnswer: card.answer,
                explanation: card.explanation || '',
                subject: card.subject || subject,
                difficulty:
                  card.difficulty === 'easy'
                    ? 1
                    : card.difficulty === 'medium'
                      ? 2
                      : 3,
                category: card.category,
                topic: card.subject || subject,
                topicId: card.category,
                examType: examType || 'TYT',
                isPastQuestion: true,
              })
            );
            setQuestions(convertedQuestions);
            return;
          }
        }

        // Soru deposunda yoksa API'den dene
        const realQuestions = await QuestionService.getExamQuestionsBySubject(
          subject,
          examType
        );
        if (realQuestions.length > 0) {
          setQuestions(realQuestions);
        }
      } catch (error) {}
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
    const timeSpent = 45 - timeLeft / 60; // Dakika cinsinden

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

  // Sınavı bitirme
  const finishExam = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Sonuçları hesapla ve modal'ı aç
    const result = calculateExamResult();
    setExamResult(result);
    setShowResultModal(true);

    // Sınav durumunu güncelle
    setIsExamFinished(true);
  }, [calculateExamResult]);

  // Cevap seçme
  const selectAnswer = useCallback(
    (answer: string) => {
      setUserAnswers(prev => ({
        ...prev,
        [currentQuestionIndex]: answer,
      }));
    },
    [currentQuestionIndex]
  );

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
  const renderQuestion = useCallback(
    ({ item, index }: { item: QuestionType; index: number }) => {
      const isCurrentQuestion = index === currentQuestionIndex;
      const userAnswer = userAnswers[index];

      if (!isCurrentQuestion) return null;

      return (
        <View style={styles.questionCard}>
          <View style={styles.questionHeader}>
            <Text style={styles.questionTitle}>
              Soru {index + 1} / {questions.length}
            </Text>
            <View style={styles.questionMeta}>
              <Text style={styles.subjectText}>{subject}</Text>
            </View>
          </View>

          <Text style={styles.questionText}>{item.questionText}</Text>

          <View style={styles.optionsContainer}>
            {item.options.map((option, optionIndex) => {
              const optionLetter = String.fromCharCode(65 + optionIndex); // A, B, C, D
              return (
                <TouchableOpacity
                  key={optionIndex}
                  style={[
                    styles.optionButton,
                    userAnswer === option && styles.selectedOption,
                  ]}
                  onPress={() => selectAnswer(option)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.optionLetter}>{optionLetter})</Text>
                  <Text
                    style={[
                      styles.optionText,
                      userAnswer === option && styles.selectedOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      );
    },
    [currentQuestionIndex, questions.length, subject, userAnswers, selectAnswer]
  );

  // Sınav başlatma ekranı
  if (!isExamStarted && !loading) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>{'<'} Geri</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>{subject}</Text>
          <Text style={styles.subtitle}>
            {subject === 'Fen Bilimleri'
              ? 'Fizik, Kimya, Biyoloji'
              : subject === 'Sosyal Bilimler'
                ? 'Tarih, Coğrafya, Felsefe, Din Kültürü'
                : subject === 'Türkçe'
                  ? 'Dil Bilgisi, Anlam Bilgisi'
                  : subject === 'Matematik'
                    ? 'Temel Matematik, Problem Çözme'
                    : subject}
          </Text>

          <View style={styles.infoCard}>
            {subject === 'Fen Bilimleri' ? (
              <>
                <Text style={styles.infoTitle}>
                  📚 YKS Fen Bilimleri Hakkında
                </Text>
                <Text style={styles.infoText}>
                  YKS sınavında Fen Bilimleri bölümü 40 sorudan oluşur ve 45
                  dakika süre verilir.
                </Text>
                <Text style={styles.infoText}>
                  • Fizik: 14 soru (Mekanik, Elektrik, Manyetizma, Optik, Modern
                  Fizik)
                </Text>
                <Text style={styles.infoText}>
                  • Kimya: 13 soru (Genel Kimya, Organik Kimya, İnorganik Kimya)
                </Text>
                <Text style={styles.infoText}>
                  • Biyoloji: 13 soru (Hücre, Genetik, Ekoloji, İnsan
                  Fizyolojisi)
                </Text>
                <Text style={styles.infoText}>
                  Her doğru cevap 4 puan, her yanlış cevap -1 puan değerindedir.
                </Text>
              </>
            ) : subject === 'Sosyal Bilimler' ? (
              <>
                <Text style={styles.infoTitle}>
                  📚 YKS Sosyal Bilimler Hakkında
                </Text>
                <Text style={styles.infoText}>
                  YKS sınavında Sosyal Bilimler bölümü 40 sorudan oluşur ve 45
                  dakika süre verilir.
                </Text>
                <Text style={styles.infoText}>
                  • Tarih: 15 soru (Türk Tarihi, Dünya Tarihi, İnkılap Tarihi)
                </Text>
                <Text style={styles.infoText}>
                  • Coğrafya: 12 soru (Fiziki Coğrafya, Beşeri Coğrafya, Türkiye
                  Coğrafyası)
                </Text>
                <Text style={styles.infoText}>
                  • Felsefe: 8 soru (Felsefe, Psikoloji, Sosyoloji, Mantık)
                </Text>
                <Text style={styles.infoText}>
                  • Din Kültürü: 5 soru (İslam Dini, Ahlak, Kültür)
                </Text>
                <Text style={styles.infoText}>
                  Her doğru cevap 4 puan, her yanlış cevap -1 puan değerindedir.
                </Text>
              </>
            ) : subject === 'Türkçe' ? (
              <>
                <Text style={styles.infoTitle}>📚 YKS Türkçe Hakkında</Text>
                <Text style={styles.infoText}>
                  YKS sınavında Türkçe bölümü 40 sorudan oluşur ve 45 dakika
                  süre verilir.
                </Text>
                <Text style={styles.infoText}>
                  • Dil Bilgisi: 8 soru (Ses Bilgisi, Kelime Bilgisi, Cümle
                  Bilgisi)
                </Text>
                <Text style={styles.infoText}>
                  • Anlam Bilgisi: 32 soru (Sözcükte Anlam, Cümlede Anlam,
                  Paragraf)
                </Text>
                <Text style={styles.infoText}>
                  Her doğru cevap 4 puan, her yanlış cevap -1 puan değerindedir.
                </Text>
              </>
            ) : subject === 'Matematik' ? (
              <>
                <Text style={styles.infoTitle}>📚 YKS Matematik Hakkında</Text>
                <Text style={styles.infoText}>
                  YKS sınavında Matematik bölümü 40 sorudan oluşur ve 45 dakika
                  süre verilir.
                </Text>
                <Text style={styles.infoText}>
                  • Temel Matematik: Sayılar, Cebir, Geometri, Veri Analizi
                </Text>
                <Text style={styles.infoText}>
                  • Problem Çözme: Günlük hayat problemleri, mantık soruları
                </Text>
                <Text style={styles.infoText}>
                  Her doğru cevap 4 puan, her yanlış cevap -1 puan değerindedir.
                </Text>
              </>
            ) : null}
          </View>

          <TouchableOpacity
            style={styles.startButton}
            onPress={startExam}
            disabled={loading}
          >
            <Text style={styles.startButtonText}>
              {loading ? 'Yükleniyor...' : 'Sınavı Başlat'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Loading ekranı
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <MaterialCommunityIcons
            name='loading'
            size={40}
            color={colors.primary}
          />
          <Text style={styles.loadingText}>Sorular yükleniyor...</Text>
        </View>
      </View>
    );
  }

  // Sınav ekranı - QuestionScreen ile birebir aynı
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backText}>{'<'} Geri</Text>
          </TouchableOpacity>

          <Text style={styles.examTitle}>{subject} Sınavı</Text>

          <View
            style={[
              styles.timerContainer,
              timeLeft < 300 && styles.timerWarning,
            ]}
          >
            <MaterialCommunityIcons
              name='clock-outline'
              size={20}
              color={timeLeft < 300 ? colors.error : colors.primary}
            />
            <Text
              style={[
                styles.timerText,
                timeLeft < 300 && { color: colors.error },
              ]}
            >
              {formatTime(timeLeft)}
            </Text>
          </View>
        </View>

        {/* Question Card */}
        <View style={styles.questionCard}>
          <View style={styles.questionHeader}>
            <Text style={styles.questionTitle}>
              Soru #{currentQuestionIndex + 1}
            </Text>
            <View style={styles.questionMeta}></View>
          </View>

          <Text style={styles.questionText}>
            {questions[currentQuestionIndex]?.questionText}
          </Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {questions[currentQuestionIndex]?.options.map((option, index) => {
            const optionLetter = String.fromCharCode(65 + index);
            const userAnswer = userAnswers[currentQuestionIndex];

            // Eğer seçenekte A), B), C), D) harfleri yoksa ekle
            const formattedOption = option.startsWith(optionLetter + ')')
              ? option
              : `${optionLetter}) ${option}`;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  userAnswer === option && styles.selectedOption,
                ]}
                onPress={() => selectAnswer(option)}
              >
                <Text
                  style={[
                    styles.optionText,
                    userAnswer === option && styles.selectedOptionText,
                  ]}
                >
                  {formattedOption}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

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
          <MaterialCommunityIcons
            name='chevron-left'
            size={24}
            color={colors.textPrimary}
          />
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
            <MaterialCommunityIcons
              name='check'
              size={24}
              color={colors.textWhite}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.navButton} onPress={nextQuestion}>
            <Text style={styles.navButtonText}>Sonraki</Text>
            <MaterialCommunityIcons
              name='chevron-right'
              size={24}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Sonuç Modalı */}
      <Modal visible={showResultModal} animationType='slide' transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.resultModal}>
            <View style={styles.resultHeader}>
              <MaterialCommunityIcons
                name='chart-line'
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
                    <Text style={styles.statValue}>
                      {examResult.correctAnswers}
                    </Text>
                    <Text style={styles.statLabel}>Doğru</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>
                      {examResult.wrongAnswers}
                    </Text>
                    <Text style={styles.statLabel}>Yanlış</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>
                      {examResult.emptyAnswers}
                    </Text>
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
                    <MaterialCommunityIcons
                      name='check-circle'
                      size={20}
                      color={colors.success}
                    />
                    <Text style={styles.modalDetailText}>
                      {examResult.correctAnswers} doğru cevap (
                      {examResult.correctAnswers * 4} puan)
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <MaterialCommunityIcons
                      name='close-circle'
                      size={20}
                      color={colors.error}
                    />
                    <Text style={styles.modalDetailText}>
                      {examResult.wrongAnswers} yanlış cevap (-
                      {examResult.wrongAnswers} puan)
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <MaterialCommunityIcons
                      name='help-circle'
                      size={20}
                      color={colors.textSecondary}
                    />
                    <Text style={styles.modalDetailText}>
                      {examResult.emptyAnswers} boş bırakılan soru
                    </Text>
                  </View>
                </View>

                <View style={styles.timeInfo}>
                  <MaterialCommunityIcons
                    name='clock-outline'
                    size={20}
                    color={colors.textSecondary}
                  />
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
    backgroundColor: colors.backgroundTertiary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: responsiveSize(-8),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(20),
    paddingTop: responsiveSize(20),
    paddingBottom: responsiveSize(20),
  },
  examTitle: {
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
    color: colors.gradients.blue[0],
    textAlign: 'center',
    flex: 1,
  },
  questionCounter: {
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    color: colors.gradients.blue[0],
    marginBottom: responsiveSize(5),
  },
  difficultyText: {
    fontSize: responsiveFontSize(12),
    fontWeight: 'bold',
    color: colors.textSecondary,
  },
  topicText: {
    fontSize: responsiveFontSize(14),
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  progressContainer: {
    paddingHorizontal: responsiveSize(20),
    paddingVertical: responsiveSize(20),
  },
  progressBar: {
    height: responsiveSize(8),
    backgroundColor: colors.borderLight,
    borderRadius: responsiveSize(4),
    marginBottom: responsiveSize(10),
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: responsiveSize(4),
  },
  progressText: {
    fontSize: responsiveFontSize(14),
    color: colors.textSecondary,
    textAlign: 'center',
  },
  backButton: {
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
  infoCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: responsiveSize(12),
    padding: responsiveSize(20),
    marginBottom: responsiveSize(30),
    ...shadows.medium,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: responsiveSize(15),
    textAlign: 'center',
  },
  infoText: {
    fontSize: responsiveFontSize(14),
    color: colors.textSecondary,
    lineHeight: responsiveFontSize(20),
    marginBottom: responsiveSize(8),
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
  oldStartButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: responsiveSize(40),
    paddingVertical: responsiveSize(15),
    borderRadius: responsiveSize(25),
    width: '100%',
    alignItems: 'center',
  },
  oldStartButtonText: {
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
    backgroundColor: colors.primary + '20',
    paddingHorizontal: responsiveSize(10),
    paddingVertical: responsiveSize(6),
    borderRadius: responsiveSize(15),
    borderWidth: 1,
    borderColor: colors.primary,
    ...shadows.small,
  },
  timerText: {
    fontSize: responsiveFontSize(14),
    fontWeight: 'bold',
    color: colors.primary,
    marginLeft: responsiveSize(6),
  },
  timerWarning: {
    color: colors.error,
    backgroundColor: colors.error + '20',
    borderColor: colors.error,
  },
  questionsList: {
    flex: 1,
    marginHorizontal: responsiveSize(2),
    marginTop: responsiveSize(2),
    marginBottom: responsiveSize(2),
  },
  questionCard: {
    backgroundColor: colors.backgroundSecondary,
    marginHorizontal: responsiveSize(20),
    marginTop: responsiveSize(-8),
    marginBottom: responsiveSize(5),
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
  questionText: {
    fontSize: responsiveFontSize(16),
    color: colors.textPrimary,
    lineHeight: responsiveFontSize(22),
    marginBottom: responsiveSize(10),
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  optionsContainer: {
    width: '90%',
    alignSelf: 'stretch',
    marginTop: responsiveSize(20),
    marginHorizontal: responsiveSize(20),
    flex: 0,
    flexShrink: 0,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    padding: responsiveSize(8),
    marginVertical: responsiveSize(4),
    borderRadius: responsiveSize(10),
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    minHeight: responsiveSize(40),
    width: '100%',
    flex: 1,
    marginHorizontal: responsiveSize(0),
    ...shadows.small,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  optionLetter: {
    fontSize: responsiveFontSize(14),
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginRight: responsiveSize(10),
    minWidth: responsiveSize(22),
  },
  selectedOption: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '20',
  },
  optionText: {
    flex: 1,
    fontSize: responsiveFontSize(16),
    color: colors.textPrimary,
    lineHeight: responsiveFontSize(22),
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  selectedOptionText: {
    fontWeight: 'bold',
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
  modalDetailText: {
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
