import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CardCategory,
  MemoryCard,
  asyncStorageService,
} from '../services/asyncStorageService';
import { responsiveFontSize, responsiveSize } from '../utils/responsive';
import { colors, shadows } from '../utils/theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const CardsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [categories, setCategories] = useState<CardCategory[]>([]);

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
    loadCategoriesAndCards();
  }, []);

  // Tüm kartların sayısını al
  const [totalCardsCount, setTotalCardsCount] = useState(0);

  useEffect(() => {
    const getTotalCardsCount = async () => {
      try {
        const allCards = await asyncStorageService.getAllCards();
        setTotalCardsCount(allCards.length);
      } catch (error) {
        // Hata durumunda sessizce devam et
      }
    };
    getTotalCardsCount();
  }, []);

  const loadCategoriesAndCards = async () => {
    try {
      setLoading(true);

      // Kategori istatistiklerini al
      const categoryStats = await asyncStorageService.getCategoryStats();
      setCategories(categoryStats);

      // Tüm kartları al
      const allCards = await asyncStorageService.getAllCards();
      setCards(allCards);
    } catch (error) {
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
      if (categoryName === '') {
        // Tüm kartları göster
        setSelectedCategory(null);
        const allCards = await asyncStorageService.getAllCards();
        setCards(allCards);
      } else {
        // Seçilen kategoriye ait kartları al
        setSelectedCategory(categoryName);
        const categoryCards =
          await asyncStorageService.getCardsByCategory(categoryName);
        setCards(categoryCards);
      }

      setCurrentCardIndex(0);
      setFlippedCards(new Set());
    } catch (error) {
      Alert.alert('Hata', 'Kartlar yüklenirken bir hata oluştu.');
    }
  };

  // Kartı çevir
  const flipCard = (cardId: string) => {
    const newFlippedCards = new Set(flippedCards);
    if (newFlippedCards.has(cardId)) {
      newFlippedCards.delete(cardId);
    } else {
      newFlippedCards.add(cardId);
    }
    setFlippedCards(newFlippedCards);
  };

  // Sonraki kart
  const nextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      const newIndex = currentCardIndex + 1;
      setCurrentCardIndex(newIndex);
      setFlippedCards(new Set()); // Yeni kartta flip durumunu sıfırla
    }
  };

  // Önceki kart
  const previousCard = () => {
    if (currentCardIndex > 0) {
      const newIndex = currentCardIndex - 1;
      setCurrentCardIndex(newIndex);
      setFlippedCards(new Set()); // Yeni kartta flip durumunu sıfırla
    }
  };

  // PanResponder for swipe gestures
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      const { dx, dy } = gestureState;
      return Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10;
    },
    onPanResponderRelease: (evt, gestureState) => {
      const { dx, vx } = gestureState;

      // Swipe detection - daha hassas
      if (dx > 20 || vx > 0.3) {
        previousCard();
      } else if (dx < -20 || vx < -0.3) {
        nextCard();
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
            <Text style={styles.categoryCount}>{totalCardsCount} kart</Text>
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
        <View {...panResponder.panHandlers}>
          <TouchableOpacity
            style={styles.mainCard}
            onPress={() => flipCard(currentCard.id)}
            activeOpacity={0.9}
            delayPressIn={200}
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

                <View style={styles.questionContainer}>
                  <Text style={styles.questionText}>
                    {currentCard.question}
                  </Text>
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
                    <View style={styles.explanationContainer}>
                      <Text style={styles.explanationTitle}>Açıklama:</Text>
                      <Text style={styles.explanationText}>
                        {currentCard.explanation}
                      </Text>
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
        </View>

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
            data={[
              {
                name: 'Tümü',
                count: totalCardsCount,
                easyCount: 0,
                mediumCount: 0,
                hardCount: 0,
              },
              ...categories,
            ]}
            renderItem={renderCategoryCard}
            keyExtractor={item => item.name}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
            style={styles.categoriesFlatList}
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
                    : 'Henüz kart yüklenmemiş'}
                </Text>
                <Text style={styles.emptySubtitle}>
                  {selectedCategory
                    ? 'Başka bir kategori seçin'
                    : 'Kartlar yükleniyor, lütfen bekleyin...'}
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
    paddingTop: responsiveSize(50),
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
    borderWidth: 3,
    borderColor: '#ffffff',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainCard: {
    width: screenWidth - responsiveSize(80),
    height: responsiveSize(400),
    backgroundColor: '#fff',
    borderRadius: responsiveSize(24),
    padding: responsiveSize(24),
    ...shadows.large,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },

  cardContent: {
    flex: 1,
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveSize(20),
  },
  answerContainer: {
    flex: 1,
    paddingVertical: responsiveSize(20),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: responsiveSize(20),
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
    fontSize: responsiveFontSize(20),
    color: colors.textPrimary,
    fontWeight: '600',
    lineHeight: responsiveSize(28),
    textAlign: 'center',
  },
  answerText: {
    fontSize: responsiveFontSize(18),
    color: colors.textPrimary,
    fontWeight: '500',
    lineHeight: responsiveSize(26),
    marginBottom: responsiveSize(16),
  },
  explanationContainer: {
    marginTop: responsiveSize(20),
    padding: responsiveSize(16),
    backgroundColor: '#f8fafc',
    borderRadius: responsiveSize(16),
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  explanationTitle: {
    fontSize: responsiveFontSize(14),
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: responsiveSize(8),
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
    marginTop: responsiveSize(20),
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
