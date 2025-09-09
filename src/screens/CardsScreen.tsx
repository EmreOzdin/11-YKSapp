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
  Image,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CardCategory, MemoryCard } from '../services/asyncStorageService';
import {
  checkAPIHealth,
  getAllCardsHybrid,
  getCardsByCategoryHybrid,
  getCategoryStatsHybrid,
} from '../services/mongoCardsService';
import {
  getAllQuestionsFromStorage,
  loadQuestionsToStorage,
} from '../services/simpleCardsService';
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
import { responsiveFontSize, responsiveSize } from '../utils/responsive';
import { colors, shadows } from '../utils/theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CardsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [showExplanation, setShowExplanation] = useState<Set<string>>(
    new Set()
  );
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [categories, setCategories] = useState<CardCategory[]>([]);
  const [sessionId, setSessionId] = useState<string>('');
  const [cardViewStartTime, setCardViewStartTime] = useState<number>(0);

  // Animasyon değerleri
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  // FlatList ref'i
  const categoriesFlatListRef = useRef<FlatList>(null);

  // Animasyon değerlerini sıfırla
  useEffect(() => {
    // Animasyonları durdur
    slideAnim.stopAnimation();
    scaleAnim.stopAnimation();
    opacityAnim.stopAnimation();

    // Değerleri sıfırla
    slideAnim.setValue(0);
    scaleAnim.setValue(1);
    opacityAnim.setValue(1);
  }, [currentCardIndex]);

  // Kart kategorileri
  const cardCategories: CardCategory[] = [
    {
      name: 'Matematik',
      count: 0,
      easyCount: 0,
      mediumCount: 0,
      hardCount: 0,
    },
    {
      name: 'Fizik',
      count: 0,
      easyCount: 0,
      mediumCount: 0,
      hardCount: 0,
    },
    {
      name: 'Kimya',
      count: 0,
      easyCount: 0,
      mediumCount: 0,
      hardCount: 0,
    },
    {
      name: 'Biyoloji',
      count: 0,
      easyCount: 0,
      mediumCount: 0,
      hardCount: 0,
    },
    {
      name: 'Türkçe',
      count: 0,
      easyCount: 0,
      mediumCount: 0,
      hardCount: 0,
    },
    {
      name: 'Tarih',
      count: 0,
      easyCount: 0,
      mediumCount: 0,
      hardCount: 0,
    },
  ];

  // Kategorileri ve kartları yükle
  useEffect(() => {
    const initializeCards = async () => {
      try {
        // Session başlat
        const newSessionId = createSessionId();
        setSessionId(newSessionId);

        // Session başlatma etkileşimini takip et (hata olursa devam et)
        try {
          await trackSessionStart(newSessionId);
        } catch (error) {
          console.warn('⚠️ Session başlatma etkileşimi kaydedilemedi:', error);
        }

        // AsyncStorage'dan soruları kontrol et
        const existingQuestions = await getAllQuestionsFromStorage();

        // Eğer soru yoksa veya yeterli soru yoksa otomatik olarak yükle
        if (existingQuestions.length === 0 || existingQuestions.length < 600) {
          console.log("📚 Sorular AsyncStorage'a yükleniyor...");
          await loadQuestionsToStorage();
          console.log('✅ Sorular başarıyla yüklendi!');
        }

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
        setCategories(cardCategories);
        setLoading(false);
      }
    };

    initializeCards();

    // Component unmount olduğunda session'ı bitir
    return () => {
      if (sessionId) {
        try {
          trackSessionEnd(sessionId);
        } catch (error) {
          console.warn('⚠️ Session bitirme etkileşimi kaydedilemedi:', error);
        }
      }
    };
  }, []);

  // Tüm kartların sayısını al
  const [totalCardsCount, setTotalCardsCount] = useState(0);

  useEffect(() => {
    const getTotalCardsCount = async () => {
      try {
        // Hibrit servis kullanarak toplam kart sayısını al
        const allQuestions = await getAllCardsHybrid();
        setTotalCardsCount(allQuestions.length);
      } catch (error) {
        console.error('❌ Toplam kart sayısı alınırken hata:', error);
        // Hata durumunda sessizce devam et
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
        trackCardView(
          sessionId,
          currentCard.id,
          currentCardIndex,
          cards.length,
          currentCard.difficulty,
          timeSpent
        );
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

      // API health check
      const isAPIHealthy = await checkAPIHealth();
      console.log(
        '🔍 API Health Check:',
        isAPIHealthy ? '✅ Healthy' : '❌ Unhealthy'
      );

      // Hibrit servis kullanarak tüm kartları al (API öncelikli, fallback AsyncStorage)
      const allQuestions = await getAllCardsHybrid();

      // Hibrit servis kullanarak kategori istatistiklerini al
      const categoryStats = await getCategoryStatsHybrid();
      setCategories(categoryStats);

      // Soruları karıştır ve ayarla
      const shuffledCards = shuffleCards(allQuestions);
      setCards(shuffledCards);

      console.log(`📊 Toplam ${allQuestions.length} kart yüklendi`);
      console.log(`📂 ${categoryStats.length} kategori istatistiği alındı`);
    } catch (error) {
      console.error('❌ Kartlar yüklenirken hata:', error);
      Alert.alert(
        'Hata',
        'Kartlar yüklenirken bir hata oluştu. Lütfen tekrar deneyin.'
      );

      // Hata durumunda varsayılan kategorileri kullan
      setCategories(cardCategories);
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
        // Tüm kartları göster - hibrit servis kullan ve karıştır
        setSelectedCategory(null);
        const allQuestions = await getAllCardsHybrid();
        const shuffledCards = shuffleCards(allQuestions);
        setCards(shuffledCards);

        // "Tümü" butonunu orta konuma kaydır
        setTimeout(() => {
          categoriesFlatListRef.current?.scrollToIndex({
            index: 0,
            animated: true,
            viewPosition: 0.5, // 0.5 = orta konum
          });
        }, 100);
      } else {
        // Seçilen kategoriye ait kartları al - hibrit servis kullan ve karıştır
        setSelectedCategory(categoryName);
        const categoryQuestions = await getCardsByCategoryHybrid(categoryName);
        const shuffledCards = shuffleCards(categoryQuestions);
        setCards(shuffledCards);

        // Seçilen kategoriyi orta konuma kaydır
        const categoryIndex = getCategoryIndex(categoryName);
        if (categoryIndex !== -1) {
          setTimeout(() => {
            categoriesFlatListRef.current?.scrollToIndex({
              index: categoryIndex + 1, // +1 çünkü "Tümü" butonu 0. index
              animated: true,
              viewPosition: 0.5, // 0.5 = orta konum
            });
          }, 100);
        }
      }

      setCurrentCardIndex(0);
      setFlippedCards(new Set());
      setShowExplanation(new Set());
    } catch (error) {
      console.error('❌ Kategori seçimi sırasında hata:', error);
      Alert.alert('Hata', 'Kartlar yüklenirken bir hata oluştu.');
    }
  };

  // Kategori index'ini bul
  const getCategoryIndex = (categoryName: string): number => {
    const categoryOrder = [
      'Matematik',
      'Fizik',
      'Kimya',
      'Biyoloji',
      'Türkçe',
      'Tarih',
    ];
    return categoryOrder.indexOf(categoryName);
  };

  // Kartları karıştırma fonksiyonu (Fisher-Yates shuffle algoritması)
  const shuffleCards = (cards: MemoryCard[]): MemoryCard[] => {
    const shuffledCards = [...cards];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [
        shuffledCards[j],
        shuffledCards[i],
      ];
    }
    return shuffledCards;
  };

  // Kartı çevir - Optimize edilmiş
  const flipCard = async (cardId: string) => {
    const newFlippedCards = new Set(flippedCards);
    const isCurrentlyFlipped = newFlippedCards.has(cardId);

    if (isCurrentlyFlipped) {
      newFlippedCards.delete(cardId);
    } else {
      newFlippedCards.add(cardId);

      // Kart çevirme etkileşimini takip et - async olmadan
      if (sessionId && cards.length > 0 && currentCardIndex < cards.length) {
        const currentCard = cards[currentCardIndex];
        // Async işlemi arka planda çalıştır
        trackCardFlip(
          sessionId,
          currentCard.id,
          currentCardIndex,
          cards.length,
          currentCard.difficulty
        ).catch(error => {
          console.warn('⚠️ Kart çevirme etkileşimi kaydedilemedi:', error);
        });
      }
    }
    setFlippedCards(newFlippedCards);
  };

  // Açıklamayı göster/gizle - Optimize edilmiş
  const toggleExplanation = async (cardId: string) => {
    const newShowExplanation = new Set(showExplanation);
    const isCurrentlyShowing = newShowExplanation.has(cardId);

    if (isCurrentlyShowing) {
      newShowExplanation.delete(cardId);
    } else {
      newShowExplanation.add(cardId);

      // Açıklama görüntüleme etkileşimini takip et - async olmadan
      if (sessionId && cards.length > 0 && currentCardIndex < cards.length) {
        const currentCard = cards[currentCardIndex];
        // Async işlemi arka planda çalıştır
        trackExplanationView(
          sessionId,
          currentCard.id,
          currentCardIndex,
          cards.length,
          currentCard.difficulty
        ).catch(error => {
          console.warn(
            '⚠️ Açıklama görüntüleme etkileşimi kaydedilemedi:',
            error
          );
        });
      }
    }
    setShowExplanation(newShowExplanation);
  };

  // Sonraki kart - Optimize edilmiş
  const nextCard = async () => {
    if (currentCardIndex < cards.length - 1) {
      // Kart kaydırma etkileşimini takip et - async olmadan
      if (sessionId && cards.length > 0 && currentCardIndex < cards.length) {
        const currentCard = cards[currentCardIndex];
        // Async işlemi arka planda çalıştır
        trackCardSwipe(
          sessionId,
          currentCard.id,
          currentCardIndex,
          cards.length,
          currentCard.difficulty,
          'right'
        ).catch(error => {
          console.warn('⚠️ Kart kaydırma etkileşimi kaydedilemedi:', error);
        });
      }

      // Animasyonları durdur ve sıfırla
      slideAnim.stopAnimation();
      scaleAnim.stopAnimation();
      opacityAnim.stopAnimation();

      // Sola kaydırma animasyonu - optimize edilmiş hızlı geçiş
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -screenWidth * 0.8,
          duration: 80,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 80,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.2,
          duration: 80,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start(() => {
        const newIndex = currentCardIndex + 1;
        setCurrentCardIndex(newIndex);
        setFlippedCards(new Set());
        setShowExplanation(new Set());

        // Animasyonları sıfırla
        slideAnim.setValue(0);
        scaleAnim.setValue(1);
        opacityAnim.setValue(1);
      });
    }
  };

  // Önceki kart - Optimize edilmiş
  const previousCard = async () => {
    if (currentCardIndex > 0) {
      // Kart kaydırma etkileşimini takip et - async olmadan
      if (sessionId && cards.length > 0 && currentCardIndex < cards.length) {
        const currentCard = cards[currentCardIndex];
        // Async işlemi arka planda çalıştır
        trackCardSwipe(
          sessionId,
          currentCard.id,
          currentCardIndex,
          cards.length,
          currentCard.difficulty,
          'left'
        ).catch(error => {
          console.warn('⚠️ Kart kaydırma etkileşimi kaydedilemedi:', error);
        });
      }

      // Animasyonları durdur ve sıfırla
      slideAnim.stopAnimation();
      scaleAnim.stopAnimation();
      opacityAnim.stopAnimation();

      // Sağa kaydırma animasyonu - optimize edilmiş hızlı geçiş
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: screenWidth * 0.8,
          duration: 80,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 80,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.2,
          duration: 80,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start(() => {
        const newIndex = currentCardIndex - 1;
        setCurrentCardIndex(newIndex);
        setFlippedCards(new Set());
        setShowExplanation(new Set());

        // Animasyonları sıfırla
        slideAnim.setValue(0);
        scaleAnim.setValue(1);
        opacityAnim.setValue(1);
      });
    }
  };

  // PanResponder for swipe gestures - Optimized for better performance
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      const { dx, dy } = gestureState;
      // Daha hassas swipe detection
      return Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10;
    },
    onPanResponderGrant: () => {
      // Animasyonları durdur
      slideAnim.stopAnimation();
      scaleAnim.stopAnimation();
      opacityAnim.stopAnimation();
    },
    onPanResponderMove: (evt, gestureState) => {
      const { dx } = gestureState;
      // Kartı hareket ettir - daha smooth
      slideAnim.setValue(dx);
      // Kartı küçült - daha az küçülme
      const scale = Math.max(0.95, 1 - (Math.abs(dx) / screenWidth) * 0.05);
      scaleAnim.setValue(scale);
      // Opaklığı azalt - daha az soluklaşma
      const opacity = Math.max(0.8, 1 - (Math.abs(dx) / screenWidth) * 0.2);
      opacityAnim.setValue(opacity);
    },
    onPanResponderRelease: (evt, gestureState) => {
      const { dx, vx } = gestureState;

      // Swipe detection - daha hassas ve güvenilir
      const swipeThreshold = 30;
      const velocityThreshold = 0.3;

      if (dx > swipeThreshold || vx > velocityThreshold) {
        previousCard();
      } else if (dx < -swipeThreshold || vx < -velocityThreshold) {
        nextCard();
      } else {
        // Geri dön animasyonu - daha hızlı
        Animated.parallel([
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 80,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 80,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 80,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]).start();
      }
    },
  });

  // Kategori kartını render et
  const renderCategoryCard = ({ item }: { item: CardCategory }) => {
    // Eğer bu "Tümü" butonu ise
    if (item.name === 'all' || item.name === 'Tümü') {
      return (
        <TouchableOpacity
          style={[
            styles.categoryCard,
            selectedCategory === null && styles.selectedCategoryCard,
          ]}
          onPress={() => handleCategorySelect('')}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.categoryGradient,
              {
                backgroundColor: '#6366f1', // Modern indigo
                shadowColor: '#6366f1',
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
              name='view-grid'
              size={responsiveSize(24)}
              color={colors.textWhite}
            />
            <Text style={styles.categoryTitle}>Tümü</Text>
            <Text style={styles.categoryCount}>
              {totalCardsCount || 600} kart
            </Text>

            {/* Seçili kategori göstergesi */}
            {selectedCategory === null && (
              <View style={styles.selectedIndicator}>
                <Ionicons name='checkmark-circle' size={16} color='#ffffff' />
              </View>
            )}
          </View>
        </TouchableOpacity>
      );
    }
    const categoryColors = {
      Matematik: '#FF0000', // Kırmızı
      Fizik: '#0000FF', // Mavi
      Kimya: '#800080', // Mor
      Biyoloji: '#00FF00', // Yeşil
      Türkçe: '#FFA500', // Turuncu
      Tarih: '#FF4500', // Turuncu-Kırmızı
    };

    const categoryIcons = {
      Matematik: 'math-integral',
      Fizik: 'atom-variant',
      Kimya: 'flask-outline',
      Biyoloji: 'leaf-maple',
      Türkçe: 'book-open-page-variant',
      Tarih: 'castle-turret',
    };

    // Kategori ismini kontrol et ve doğru renk/ikon ata
    let color = '#6366f1'; // Varsayılan modern indigo
    let icon = 'calculator-variant'; // Varsayılan modern ikon

    if (item.name === 'math' || item.name === 'Matematik') {
      color = '#ef4444'; // Modern kırmızı
      icon = 'function-variant';
    } else if (item.name === 'physics' || item.name === 'Fizik') {
      color = '#3b82f6'; // Modern mavi
      icon = 'atom';
    } else if (item.name === 'chemistry' || item.name === 'Kimya') {
      color = '#8b5cf6'; // Modern mor
      icon = 'test-tube';
    } else if (item.name === 'biology' || item.name === 'Biyoloji') {
      color = '#10b981'; // Modern yeşil
      icon = 'dna';
    } else if (item.name === 'turkish' || item.name === 'Türkçe') {
      color = '#f59e0b'; // Modern turuncu
      icon = 'book-open-variant';
    } else if (item.name === 'history' || item.name === 'Tarih') {
      color = '#dc2626'; // Modern koyu kırmızı
      icon = 'castle';
    }

    // Kategori ismini Türkçe'ye çevir
    const categoryNameMapping = {
      math: 'Matematik',
      physics: 'Fizik',
      chemistry: 'Kimya',
      biology: 'Biyoloji',
      turkish: 'Türkçe',
      history: 'Tarih',
    };

    const displayName =
      categoryNameMapping[item.name as keyof typeof categoryNameMapping] ||
      item.name;

    return (
      <TouchableOpacity
        style={[
          styles.categoryCard,
          selectedCategory === item.name && styles.selectedCategoryCard,
        ]}
        onPress={() => handleCategorySelect(item.name)}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.categoryGradient,
            {
              backgroundColor: color,
              shadowColor: color,
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
            name={icon as any}
            size={responsiveSize(24)}
            color={colors.textWhite}
          />
          <Text style={styles.categoryTitle}>{displayName}</Text>
          <Text style={styles.categoryCount}>{item.count} kart</Text>

          {/* Seçili kategori göstergesi */}
          {selectedCategory === item.name && (
            <View style={styles.selectedIndicator}>
              <Ionicons name='checkmark-circle' size={16} color='#ffffff' />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  // Ana kart görünümü
  const renderMainCard = () => {
    if (cards.length === 0) return null;

    const currentCard = cards[currentCardIndex];
    const isFlipped = flippedCards.has(currentCard.id);

    return (
      <View style={styles.mainCardContainer}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.animatedCard,
            {
              transform: [{ translateX: slideAnim }, { scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.mainCard}
            onPress={() => flipCard(currentCard.id)}
            activeOpacity={0.9}
            delayPressIn={50}
          >
            {/* Kartın Ön Yüzü - Soru */}
            {!isFlipped && (
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <View style={styles.difficultyBadge}>
                    <Text style={styles.difficultyText}>
                      {currentCard.difficulty === 'easy'
                        ? 'Kolay'
                        : currentCard.difficulty === 'medium'
                          ? 'Orta'
                          : 'Zor'}
                    </Text>
                  </View>
                  <Text style={styles.cardNumber}>
                    {currentCardIndex + 1} / {cards.length}
                  </Text>
                </View>

                <View
                  style={[
                    styles.questionContainer,
                    !currentCard.image && styles.questionContainerCentered,
                  ]}
                >
                  <Text style={styles.questionText}>
                    {currentCard.question}
                  </Text>
                  {currentCard.image && (
                    <Image
                      source={{ uri: currentCard.image }}
                      style={styles.cardImage}
                      resizeMode='cover'
                    />
                  )}
                </View>

                <View style={styles.cardFooter}>
                  <View style={styles.flipHintContainer}>
                    <Ionicons
                      name='hand-left'
                      size={16}
                      color={colors.textTertiary}
                    />
                    <Text style={styles.flipHint}>
                      Cevabı görmek için dokun
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/* Kartın Arka Yüzü - Cevap */}
            {isFlipped && (
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <View style={styles.difficultyBadge}>
                    <Text style={styles.difficultyText}>
                      {currentCard.difficulty === 'easy'
                        ? 'Kolay'
                        : currentCard.difficulty === 'medium'
                          ? 'Orta'
                          : 'Zor'}
                    </Text>
                  </View>
                  <Text style={styles.cardNumber}>
                    {currentCardIndex + 1} / {cards.length}
                  </Text>
                </View>

                <View style={styles.answerContainer}>
                  <Text style={styles.answerText}>{currentCard.answer}</Text>

                  {currentCard.explanation && (
                    <View style={styles.explanationSection}>
                      {!showExplanation.has(currentCard.id) ? (
                        <TouchableOpacity
                          style={styles.showExplanationButton}
                          onPress={() => toggleExplanation(currentCard.id)}
                          activeOpacity={0.7}
                        >
                          <Ionicons
                            name='information-circle-outline'
                            size={20}
                            color={colors.primary}
                          />
                          <Text style={styles.showExplanationText}>
                            Açıklamayı Göster
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <View style={styles.explanationContainer}>
                          <View style={styles.explanationHeader}>
                            <Text style={styles.explanationTitle}>
                              Açıklama:
                            </Text>
                            <TouchableOpacity
                              onPress={() => toggleExplanation(currentCard.id)}
                              style={styles.hideExplanationButton}
                            >
                              <Ionicons
                                name='close-circle-outline'
                                size={20}
                                color={colors.textSecondary}
                              />
                            </TouchableOpacity>
                          </View>
                          <Text style={styles.explanationText}>
                            {currentCard.explanation}
                          </Text>
                        </View>
                      )}
                    </View>
                  )}

                  {currentCard.tags && currentCard.tags.length > 0 && (
                    <View style={styles.tagsContainer}>
                      {currentCard.tags.map((tag, tagIndex) => (
                        <View key={tagIndex} style={styles.tag}>
                          <Text style={styles.tagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>

                <View style={styles.cardFooter}>
                  <View style={styles.flipHintContainer}>
                    <Ionicons
                      name='hand-left'
                      size={16}
                      color={colors.textTertiary}
                    />
                    <Text style={styles.flipHint}>
                      Soruyu görmek için dokun
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </TouchableOpacity>
        </Animated.View>

        {/* Swipe İpuçları */}
        <View style={styles.swipeHints}>
          <View style={styles.swipeHint}>
            <Ionicons
              name='arrow-back'
              size={16}
              color={colors.textSecondary}
            />
            <Text style={styles.swipeHintText}>Önceki kart</Text>
          </View>
          <View style={styles.swipeHint}>
            <Text style={styles.swipeHintText}>Sonraki kart</Text>
            <Ionicons
              name='arrow-forward'
              size={16}
              color={colors.textSecondary}
            />
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color={colors.primary} />
        <Text style={styles.loadingText}>Kartlar yükleniyor...</Text>
      </View>
    );
  }

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
          <Text style={styles.headerTitle}>📚 Bilgi Kartları</Text>
          <View style={styles.headerRight} />
        </View>
      </LinearGradient>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>📂 Kategoriler</Text>
          </View>
          <FlatList
            ref={categoriesFlatListRef}
            data={[
              {
                name: 'Tümü',
                count: 600,
                easyCount: 200,
                mediumCount: 200,
                hardCount: 200,
              },
              {
                name: 'Matematik',
                count: 100,
                easyCount: 33,
                mediumCount: 34,
                hardCount: 33,
              },
              {
                name: 'Fizik',
                count: 100,
                easyCount: 33,
                mediumCount: 34,
                hardCount: 33,
              },
              {
                name: 'Kimya',
                count: 100,
                easyCount: 33,
                mediumCount: 34,
                hardCount: 33,
              },
              {
                name: 'Biyoloji',
                count: 100,
                easyCount: 33,
                mediumCount: 34,
                hardCount: 33,
              },
              {
                name: 'Türkçe',
                count: 100,
                easyCount: 33,
                mediumCount: 34,
                hardCount: 33,
              },
              {
                name: 'Tarih',
                count: 100,
                easyCount: 33,
                mediumCount: 34,
                hardCount: 33,
              },
            ]}
            renderItem={renderCategoryCard}
            keyExtractor={item => item.name}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
            style={styles.categoriesFlatList}
            snapToInterval={responsiveSize(132)} // Kart genişliği + margin
            decelerationRate='fast'
            snapToAlignment='center'
            onScrollToIndexFailed={() => {
              // Hata durumunda scroll işlemini iptal et
            }}
          />
        </View>

        {/* Cards Section */}
        <View style={styles.cardsSection}>
          <View style={styles.cardsHeader}>
            <View style={styles.cardsTitleContainer}>
              <Text style={styles.cardsTitle}>🎯 Kartlar</Text>
            </View>
          </View>

          <View style={styles.cardsContainer}>
            {cards.length > 0 ? (
              renderMainCard()
            ) : (
              <View style={styles.emptyContainer}>
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  style={styles.emptyIconContainer}
                >
                  <MaterialCommunityIcons
                    name='cards-outline'
                    size={responsiveSize(48)}
                    color='#fff'
                  />
                </LinearGradient>
                <Text style={styles.emptyTitle}>
                  {selectedCategory
                    ? 'Bu kategoride kart yok'
                    : 'Kartlar yükleniyor...'}
                </Text>
                <Text style={styles.emptySubtitle}>
                  {selectedCategory
                    ? 'Başka bir kategori seçin'
                    : 'Lütfen bekleyin...'}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
  },
  loadingText: {
    marginTop: responsiveSize(16),
    fontSize: responsiveFontSize(16),
    color: colors.textSecondary,
  },
  // Header Styles
  header: {
    paddingTop: responsiveSize(10),
    paddingBottom: responsiveSize(20),
    paddingHorizontal: responsiveSize(20),
    zIndex: 1000,
    elevation: 5,
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
  headerRight: {
    width: responsiveSize(40),
  },

  // Main Content
  mainContent: {
    flex: 1,
    paddingHorizontal: responsiveSize(16),
  },

  // Categories Section
  categoriesSection: {
    paddingVertical: responsiveSize(16),
    backgroundColor: '#fff',
    marginTop: responsiveSize(16),
    borderRadius: responsiveSize(20),
    ...shadows.medium,
  },
  sectionHeader: {
    paddingHorizontal: responsiveSize(20),
    marginBottom: responsiveSize(8),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: responsiveSize(4),
  },
  sectionSubtitle: {
    fontSize: responsiveFontSize(14),
    color: colors.textSecondary,
    fontWeight: '500',
  },
  categoriesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoriesFlatList: {
    maxHeight: responsiveSize(100),
  },
  categoriesList: {
    paddingHorizontal: responsiveSize(20),
    paddingRight: responsiveSize(60), // Sağ tarafta daha az boşluk
  },
  categoryCard: {
    width: responsiveSize(120),
    height: responsiveSize(80),
    marginRight: responsiveSize(12),
    borderRadius: responsiveSize(20),
    overflow: 'hidden',
    ...shadows.medium,
  },
  selectedCategoryCard: {
    borderWidth: 5,
    borderColor: '#ffffff',
    elevation: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.55,
    shadowRadius: 20,
    transform: [{ scale: 1.08 }],
  },
  categoryGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsiveSize(8),
  },
  categoryTitle: {
    fontSize: responsiveFontSize(12),
    fontWeight: 'bold',
    color: colors.textWhite,
    marginTop: responsiveSize(2),
    textAlign: 'center',
  },
  categoryCount: {
    fontSize: responsiveFontSize(10),
    color: colors.textWhite,
    marginTop: responsiveSize(1),
    opacity: 0.9,
  },
  selectedIndicator: {
    position: 'absolute',
    top: responsiveSize(4),
    right: responsiveSize(4),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: responsiveSize(8),
    padding: responsiveSize(2),
  },
  // Cards Section
  cardsSection: {
    flex: 1,
    marginTop: responsiveSize(12),
    backgroundColor: '#fff',
    borderRadius: responsiveSize(20),
    padding: responsiveSize(16),
    ...shadows.medium,
  },
  cardsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveSize(20),
  },
  cardsTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardsTitle: {
    fontSize: responsiveFontSize(20),
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginRight: responsiveSize(12),
  },
  cardsCounter: {
    backgroundColor: '#667eea',
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(6),
    borderRadius: responsiveSize(15),
  },
  cardsCounterText: {
    color: '#fff',
    fontSize: responsiveFontSize(12),
    fontWeight: '600',
  },
  clearFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(8),
    borderRadius: responsiveSize(20),
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  clearFilterText: {
    fontSize: responsiveFontSize(12),
    color: colors.textSecondary,
    fontWeight: '500',
    marginLeft: responsiveSize(4),
  },

  cardsContainer: {
    flex: 1,
    minHeight: responsiveSize(450),
  },

  // Main Card Styles
  mainCardContainer: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },

  animatedCard: {
    width: screenWidth - responsiveSize(80),
    height: responsiveSize(400),
  },

  mainCard: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: responsiveSize(24),
    padding: responsiveSize(24),
    ...shadows.large,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },

  cardContent: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: responsiveSize(0),
    paddingTop: responsiveSize(0),
    marginTop: responsiveSize(-20),
  },
  questionContainerCentered: {
    justifyContent: 'center',
  },
  answerContainer: {
    flex: 1,
    paddingVertical: responsiveSize(20),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveSize(5),
  },
  difficultyBadge: {
    backgroundColor: '#667eea',
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(6),
    borderRadius: responsiveSize(12),
  },
  difficultyText: {
    color: colors.textWhite,
    fontSize: responsiveFontSize(12),
    fontWeight: '600',
  },
  cardNumber: {
    fontSize: responsiveFontSize(14),
    color: colors.textSecondary,
    fontWeight: '500',
  },
  questionText: {
    fontSize: responsiveFontSize(16),
    color: colors.textPrimary,
    fontWeight: '600',
    lineHeight: responsiveSize(22),
    textAlign: 'center',
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  cardImage: {
    width: '100%',
    height: responsiveSize(150),
    borderRadius: responsiveSize(12),
    marginTop: responsiveSize(16),
  },
  answerText: {
    fontSize: responsiveFontSize(18),
    color: colors.textPrimary,
    fontWeight: '500',
    lineHeight: responsiveSize(26),
    marginBottom: responsiveSize(16),
  },
  explanationSection: {
    marginTop: responsiveSize(20),
  },
  showExplanationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f4ff',
    paddingVertical: responsiveSize(12),
    paddingHorizontal: responsiveSize(16),
    borderRadius: responsiveSize(12),
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: 'dashed',
  },
  showExplanationText: {
    fontSize: responsiveFontSize(14),
    color: colors.primary,
    fontWeight: '600',
    marginLeft: responsiveSize(8),
  },
  explanationContainer: {
    padding: responsiveSize(16),
    backgroundColor: '#f8fafc',
    borderRadius: responsiveSize(16),
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  explanationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveSize(8),
  },
  explanationTitle: {
    fontSize: responsiveFontSize(14),
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  hideExplanationButton: {
    padding: responsiveSize(4),
  },
  explanationText: {
    fontSize: responsiveFontSize(14),
    color: colors.textSecondary,
    lineHeight: responsiveSize(22),
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: responsiveSize(16),
  },
  tag: {
    backgroundColor: '#667eea',
    paddingHorizontal: responsiveSize(10),
    paddingVertical: responsiveSize(6),
    borderRadius: responsiveSize(12),
    marginRight: responsiveSize(8),
    marginBottom: responsiveSize(6),
  },
  tagText: {
    color: colors.textWhite,
    fontSize: responsiveFontSize(11),
    fontWeight: '500',
  },
  cardFooter: {
    alignItems: 'center',
    marginTop: responsiveSize(10),
  },
  flipHintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(8),
    borderRadius: responsiveSize(20),
  },
  flipHint: {
    fontSize: responsiveFontSize(12),
    color: colors.textTertiary,
    fontStyle: 'italic',
    marginLeft: responsiveSize(4),
  },

  // Swipe Hints
  swipeHints: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: responsiveSize(16),
    width: screenWidth - responsiveSize(80),
  },
  swipeHint: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(6),
    borderRadius: responsiveSize(15),
  },
  swipeHintText: {
    fontSize: responsiveFontSize(11),
    color: colors.textSecondary,
    fontWeight: '500',
    marginHorizontal: responsiveSize(4),
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(40),
  },
  emptyIconContainer: {
    width: responsiveSize(80),
    height: responsiveSize(80),
    borderRadius: responsiveSize(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: responsiveSize(20),
  },
  emptyTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: responsiveSize(8),
  },
  emptySubtitle: {
    fontSize: responsiveFontSize(14),
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: responsiveSize(20),
  },
});

export default CardsScreen;
