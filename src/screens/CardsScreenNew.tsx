import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
    NavigationProp,
    ParamListBase,
    useNavigation,
} from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Animated,
    Dimensions,
    Easing,
    FlatList,
    PanResponder,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { CardCategory, MemoryCard } from '../services/asyncStorageService';
import {
    getAllCardsFromStorage,
    getCardsByCategory,
    getCategoryStats,
    loadAllCardsToStorage,
} from '../services/localCardsService';
import {
    createSessionId,
    syncLocalInteractionsToAPI,
    trackCardFlip,
    trackCardSwipe,
    trackCardView,
    trackCategorySelection,
    trackExplanationView,
    trackSessionEnd,
    trackSessionStart,
} from '../services/userInteractionService';
import { responsiveFontSize } from '../utils/responsive';
import { colors, shadows } from '../utils/theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Kategori renkleri ve ikonları
const categoryColors = {
  Matematik: '#3b82f6',
  Biyoloji: '#10b981',
  Kimya: '#f59e0b',
  Tarih: '#ef4444',
  Fizik: '#8b5cf6',
  Türkçe: '#06b6d4',
};

const categoryIcons = {
  Matematik: 'calculator',
  Biyoloji: 'leaf',
  Kimya: 'flask',
  Tarih: 'book-open',
  Fizik: 'atom',
  Türkçe: 'book',
};

const CardsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [categories, setCategories] = useState<CardCategory[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [totalCardsCount, setTotalCardsCount] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [cardViewStartTime, setCardViewStartTime] = useState(0);

  // Animasyon değerleri
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  // Kartları karıştır
  const shuffleCards = (cards: MemoryCard[]): MemoryCard[] => {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Tüm kartların sayısını al
  useEffect(() => {
    const getTotalCardsCount = async () => {
      try {
        const allCards = await getAllCardsFromStorage();
        setTotalCardsCount(allCards.length);
      } catch (error) {
        console.error('❌ Toplam kart sayısı alınırken hata:', error);
      }
    };
    getTotalCardsCount();
  }, []);

  // Kart değiştiğinde animasyon değerlerini sıfırla ve kart görüntüleme etkileşimini takip et
  useEffect(() => {
    slideAnim.setValue(0);
    scaleAnim.setValue(1);
    opacityAnim.setValue(1);

    // Kart görüntüleme etkileşimini takip et
    if (cards.length > 0 && sessionId && currentCardIndex < cards.length) {
      const currentCard = cards[currentCardIndex];
      const timeSpent =
        cardViewStartTime > 0 ? Date.now() - cardViewStartTime : undefined;

      try {
        trackCardView(sessionId, currentCard.id, timeSpent);
      } catch (error) {
        console.warn('⚠️ Kart görüntüleme etkileşimi kaydedilemedi:', error);
      }

      // Yeni kart için görüntüleme zamanını başlat
      setCardViewStartTime(Date.now());
    }
  }, [currentCardIndex, cards, sessionId]);

  const loadCategoriesAndCards = async () => {
    try {
      setLoading(true);


      // Tüm kartları local dosyalardan yükle
      const loadResult = await loadAllCardsToStorage();

      // Kategori istatistiklerini al
      const categoryStats = await getCategoryStats();

      setCategories(categoryStats);

      // Tüm kartları al
      const allCards = await getAllCardsFromStorage();

      // İlk kartları göster
      if (allCards.length > 0) {
        const shuffledCards = shuffleCards(allCards);
        setCards(shuffledCards);
      } else {
      }
    } catch (error) {
      console.error('❌ Kartlar yüklenirken hata:', error);
      Alert.alert('Hata', 'Kartlar yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  // Kategori seçildiğinde kartları filtrele
  const handleCategorySelect = async (categoryName: string) => {
    try {
      // Kategori seçimi etkileşimini takip et
      if (sessionId) {
        try {
          await trackCategorySelection(sessionId, categoryName || 'Tümü');
        } catch (error) {
          console.warn('⚠️ Kategori seçimi etkileşimi kaydedilemedi:', error);
        }
      }

      if (categoryName === '') {
        // Tüm kartları göster
        setSelectedCategory(null);
        const allCards = await getAllCardsFromStorage();
        const shuffledCards = shuffleCards(allCards);
        setCards(shuffledCards);
      } else {
        // Seçilen kategoriye ait kartları al
        setSelectedCategory(categoryName);
        
        // Kategori adını mapping ile dönüştür
        const categoryMapping: {[key: string]: string} = {
          'Matematik': 'math',
          'Biyoloji': 'biology',
          'Kimya': 'chemistry',
          'Tarih': 'history',
          'Fizik': 'physics',
          'Türkçe': 'turkish',
        };
        
        const categoryKey = categoryMapping[categoryName] || categoryName.toLowerCase();
        const categoryQuestions = await getCardsByCategory(categoryKey);
        const shuffledCards = shuffleCards(categoryQuestions);
        setCards(shuffledCards);
      }
    } catch (error) {
      console.error('❌ Kategori seçimi sırasında hata:', error);
      Alert.alert('Hata', 'Kategori seçimi sırasında bir hata oluştu');
    }
  };

  // Kart çevirme animasyonu
  const flipCard = () => {
    if (sessionId && cards.length > 0) {
      try {
        trackCardFlip(sessionId, cards[currentCardIndex].id);
      } catch (error) {
        console.warn('⚠️ Kart çevirme etkileşimi kaydedilemedi:', error);
      }
    }

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    setIsFlipped(!isFlipped);
  };

  // Sonraki kart
  const nextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      if (sessionId && cards.length > 0) {
        try {
          trackCardSwipe(sessionId, cards[currentCardIndex].id, 'next');
        } catch (error) {
          console.warn('⚠️ Kart kaydırma etkileşimi kaydedilemedi:', error);
        }
      }

      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: -screenWidth,
          duration: 300,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCurrentCardIndex(currentCardIndex + 1);
        setIsFlipped(false);
        slideAnim.setValue(0);
        opacityAnim.setValue(1);
      });
    }
  };

  // Önceki kart
  const prevCard = () => {
    if (currentCardIndex > 0) {
      if (sessionId && cards.length > 0) {
        try {
          trackCardSwipe(sessionId, cards[currentCardIndex].id, 'prev');
        } catch (error) {
          console.warn('⚠️ Kart kaydırma etkileşimi kaydedilemedi:', error);
        }
      }

      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: screenWidth,
          duration: 300,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setCurrentCardIndex(currentCardIndex - 1);
        setIsFlipped(false);
        slideAnim.setValue(0);
        opacityAnim.setValue(1);
      });
    }
  };

  // Açıklama görüntüleme
  const showExplanation = () => {
    if (sessionId && cards.length > 0) {
      try {
        trackExplanationView(sessionId, cards[currentCardIndex].id);
      } catch (error) {
        console.warn('⚠️ Açıklama görüntüleme etkileşimi kaydedilemedi:', error);
      }
    }

    Alert.alert(
      'Açıklama',
      cards[currentCardIndex]?.explanation || 'Bu kart için açıklama bulunmuyor.',
      [{ text: 'Tamam' }]
    );
  };

  // Pan responder for swipe gestures
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return Math.abs(gestureState.dx) > 20;
    },
    onPanResponderMove: (_, gestureState) => {
      slideAnim.setValue(gestureState.dx);
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx > 100) {
        prevCard();
      } else if (gestureState.dx < -100) {
        nextCard();
      } else {
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  // Component mount
  useEffect(() => {
    const initializeScreen = async () => {
      try {
        // Session başlat
        const newSessionId = await createSessionId();
        setSessionId(newSessionId);
        await trackSessionStart(newSessionId);

        // Soruları ve kategorileri yükle
        await loadCategoriesAndCards();

        // Local etkileşimleri senkronize et (hata olursa devam et)
        try {
          await syncLocalInteractionsToAPI();
        } catch (error) {
          console.warn('⚠️ Local etkileşimler senkronize edilemedi:', error);
        }
      } catch (error) {
        console.error('❌ Sorular yüklenirken hata:', error);
        // Hata durumunda varsayılan kategorileri kullan
        setCategories([
          {
            _id: 'Matematik',
            name: 'Matematik',
            questionCount: 0,
            lastAccessed: new Date(),
          },
          {
            _id: 'Fizik',
            name: 'Fizik',
            questionCount: 0,
            lastAccessed: new Date(),
          },
          {
            _id: 'Kimya',
            name: 'Kimya',
            questionCount: 0,
            lastAccessed: new Date(),
          },
          {
            _id: 'Biyoloji',
            name: 'Biyoloji',
            questionCount: 0,
            lastAccessed: new Date(),
          },
          {
            _id: 'Tarih',
            name: 'Tarih',
            questionCount: 0,
            lastAccessed: new Date(),
          },
          {
            _id: 'Türkçe',
            name: 'Türkçe',
            questionCount: 0,
            lastAccessed: new Date(),
          },
        ]);
      }
    };

    initializeScreen();

    // Cleanup function
    return () => {
      if (sessionId) {
        try {
          trackSessionEnd(sessionId);
        } catch (error) {
          console.warn('⚠️ Session sonlandırma etkileşimi kaydedilemedi:', error);
        }
      }
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Kartlar yükleniyor...</Text>
      </View>
    );
  }

  const currentCard = cards[currentCardIndex];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kartlar</Text>
        <View style={styles.headerRight}>
          <Text style={styles.cardCounter}>
            {currentCardIndex + 1} / {cards.length}
          </Text>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={[{ name: 'Tümü', _id: '', questionCount: totalCardsCount }, ...categories]}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            const isSelected = selectedCategory === null && item.name === 'Tümü' 
              ? true 
              : selectedCategory === item.name;
            
            return (
              <TouchableOpacity
                style={[
                  styles.categoryCard,
                  isSelected && styles.selectedCategoryCard,
                ]}
                onPress={() => handleCategorySelect(item.name === 'Tümü' ? '' : item.name)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.categoryGradient,
                    {
                      backgroundColor: item.name === 'Tümü' ? '#6366f1' : categoryColors[item.name as keyof typeof categoryColors] || '#6b7280',
                      shadowColor: item.name === 'Tümü' ? '#6366f1' : categoryColors[item.name as keyof typeof categoryColors] || '#6b7280',
                      shadowOffset: {
                        width: 0,
                        height: 4,
                      },
                      shadowOpacity: 0.3,
                      shadowRadius: 8,
                      elevation: 8,
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={item.name === 'Tümü' ? 'view-grid' : categoryIcons[item.name as keyof typeof categoryIcons] as any || 'book'}
                    size={24}
                    color="white"
                  />
                  <Text style={styles.categoryName}>{item.name}</Text>
                  <Text style={styles.categoryCount}>{item.questionCount}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* Card Container */}
      <View style={styles.cardContainer}>
        {currentCard ? (
          <Animated.View
            style={[
              styles.card,
              {
                transform: [
                  { translateX: slideAnim },
                  { scale: scaleAnim },
                ],
                opacity: opacityAnim,
              },
            ]}
            {...panResponder.panHandlers}
          >
            <TouchableOpacity
              style={styles.cardContent}
              onPress={flipCard}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.cardGradient}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.categoryTag}>
                    {currentCard.category}
                  </Text>
                  <Text style={styles.difficultyTag}>
                    {currentCard.difficulty}
                  </Text>
                </View>

                <View style={styles.cardBody}>
                  {!isFlipped ? (
                    <View style={styles.questionContainer}>
                      <Text style={styles.questionText}>
                        {currentCard.question}
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.answerContainer}>
                      <Text style={styles.answerText}>
                        {currentCard.answer}
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.cardFooter}>
                  <Text style={styles.flipHint}>
                    {!isFlipped ? 'Cevabı görmek için dokun' : 'Soruyu görmek için dokun'}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <View style={styles.noCardsContainer}>
            <Text style={styles.noCardsText}>Kart bulunamadı</Text>
          </View>
        )}
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlButton, currentCardIndex === 0 && styles.disabledButton]}
          onPress={prevCard}
          disabled={currentCardIndex === 0}
        >
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.explanationButton}
          onPress={showExplanation}
        >
          <Ionicons name="information-circle" size={24} color={colors.primary} />
          <Text style={styles.explanationButtonText}>Açıklama</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, currentCardIndex === cards.length - 1 && styles.disabledButton]}
          onPress={nextCard}
          disabled={currentCardIndex === cards.length - 1}
        >
          <Ionicons name="chevron-forward" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 16,
    fontSize: responsiveFontSize(16),
    color: colors.text,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: colors.background,
    ...shadows.small,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: responsiveFontSize(20),
    fontWeight: 'bold',
    color: colors.text,
  },
  headerRight: {
    minWidth: 60,
    alignItems: 'flex-end',
  },
  cardCounter: {
    fontSize: responsiveFontSize(14),
    color: colors.textSecondary,
  },
  categoriesContainer: {
    paddingVertical: 16,
    paddingLeft: 20,
  },
  categoryCard: {
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  selectedCategoryCard: {
    transform: [{ scale: 1.05 }],
  },
  categoryGradient: {
    padding: 16,
    alignItems: 'center',
    minWidth: 80,
  },
  categoryName: {
    color: 'white',
    fontSize: responsiveFontSize(12),
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
  categoryCount: {
    color: 'white',
    fontSize: responsiveFontSize(10),
    marginTop: 2,
    opacity: 0.8,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: screenWidth - 40,
    height: screenHeight * 0.5,
    borderRadius: 20,
    overflow: 'hidden',
    ...shadows.large,
  },
  cardContent: {
    flex: 1,
  },
  cardGradient: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    color: 'white',
    fontSize: responsiveFontSize(12),
    fontWeight: '600',
  },
  difficultyTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    color: 'white',
    fontSize: responsiveFontSize(12),
    fontWeight: '600',
  },
  cardBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: responsiveFontSize(18),
    color: 'white',
    textAlign: 'center',
    lineHeight: responsiveFontSize(26),
    fontWeight: '500',
  },
  answerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerText: {
    fontSize: responsiveFontSize(16),
    color: 'white',
    textAlign: 'center',
    lineHeight: responsiveFontSize(24),
    fontWeight: '400',
  },
  cardFooter: {
    alignItems: 'center',
  },
  flipHint: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: responsiveFontSize(12),
    fontStyle: 'italic',
  },
  noCardsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCardsText: {
    fontSize: responsiveFontSize(18),
    color: colors.textSecondary,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: colors.background,
  },
  controlButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.surface,
    ...shadows.small,
  },
  disabledButton: {
    opacity: 0.3,
  },
  explanationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: colors.surface,
    ...shadows.small,
  },
  explanationButtonText: {
    marginLeft: 8,
    fontSize: responsiveFontSize(14),
    color: colors.primary,
    fontWeight: '600',
  },
});

export default CardsScreen;
