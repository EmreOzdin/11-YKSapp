import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  FlatList,
  Dimensions,
  Animated
} from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { responsiveSize, responsiveFontSize } from '../utils/responsive';
import { colors, typography, shadows } from '../utils/theme';

const { width: screenWidth } = Dimensions.get('window');

interface MemoryCard {
  id: string;
  category: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isFavorite: boolean;
}

interface CardCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  cardCount: number;
}

const CardsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [favoriteCards, setFavoriteCards] = useState<string[]>([]);

  // Kart kategorileri
  const cardCategories: CardCategory[] = [
    {
      id: 'math',
      name: 'Matematik',
      icon: 'calculator',
      color: colors.gradients.orange[0],
      cardCount: 45
    },
    {
      id: 'physics',
      name: 'Fizik',
      icon: 'atom',
      color: colors.gradients.blue[0],
      cardCount: 38
    },
    {
      id: 'chemistry',
      name: 'Kimya',
      icon: 'flask',
      color: colors.gradients.purple[0],
      cardCount: 32
    },
    {
      id: 'biology',
      name: 'Biyoloji',
      icon: 'leaf',
      color: colors.gradients.pink[0],
      cardCount: 41
    },
    {
      id: 'turkish',
      name: 'Türkçe',
      icon: 'book-open-variant',
      color: colors.gradients.blue[1],
      cardCount: 28
    },
    {
      id: 'history',
      name: 'Tarih',
      icon: 'castle',
      color: colors.gradients.orange[1],
      cardCount: 35
    }
  ];

  // Örnek hap bilgi kartları
  const memoryCards: MemoryCard[] = [
    {
      id: '1',
      category: 'math',
      question: 'İkinci dereceden denklem formülü nedir?',
      answer: 'x = (-b ± √(b² - 4ac)) / 2a',
      difficulty: 'medium',
      isFavorite: false
    },
    {
      id: '2',
      category: 'physics',
      question: 'Newton\'un 1. Yasası nedir?',
      answer: 'Bir cisim üzerine net kuvvet etki etmiyorsa, cisim durumunu korur (durgun kalır veya sabit hızla hareket eder).',
      difficulty: 'easy',
      isFavorite: true
    },
    {
      id: '3',
      category: 'chemistry',
      question: 'Periyodik tabloda kaç periyot vardır?',
      answer: '7 periyot vardır.',
      difficulty: 'easy',
      isFavorite: false
    },
    {
      id: '4',
      category: 'biology',
      question: 'DNA\'nın açılımı nedir?',
      answer: 'Deoksiribo Nükleik Asit',
      difficulty: 'easy',
      isFavorite: false
    },
    {
      id: '5',
      category: 'turkish',
      question: 'Türkçede kaç ünlü harf vardır?',
      answer: '8 ünlü harf vardır: a, e, ı, i, o, ö, u, ü',
      difficulty: 'easy',
      isFavorite: false
    },
    {
      id: '6',
      category: 'history',
      question: 'İstanbul\'un fethi hangi yılda gerçekleşmiştir?',
      answer: '1453 yılında Fatih Sultan Mehmet tarafından fethedilmiştir.',
      difficulty: 'medium',
      isFavorite: true
    }
  ];

  const filteredCards = selectedCategory 
    ? memoryCards.filter(card => card.category === selectedCategory)
    : memoryCards;

  const toggleFavorite = (cardId: string) => {
    setFavoriteCards(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  const flipCard = () => {
    setIsCardFlipped(!isCardFlipped);
  };

  const nextCard = () => {
    if (currentCardIndex < filteredCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsCardFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsCardFlipped(false);
    }
  };

  const renderCategoryCard = ({ item }: { item: CardCategory }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        selectedCategory === item.id && styles.categoryCardSelected
      ]}
      onPress={() => setSelectedCategory(selectedCategory === item.id ? null : item.id)}
    >
      <LinearGradient
        colors={[item.color, item.color + '80']}
        style={styles.categoryGradient}
      >
        <MaterialCommunityIcons name={item.icon as any} size={32} color={colors.textWhite} />
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryCount}>{item.cardCount} kart</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderMemoryCard = () => {
    if (filteredCards.length === 0) {
      return (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons name="cards-outline" size={64} color={colors.textTertiary} />
          <Text style={styles.emptyStateText}>Bu kategoride henüz kart bulunmuyor</Text>
        </View>
      );
    }

    const currentCard = filteredCards[currentCardIndex];
    const isFavorite = favoriteCards.includes(currentCard.id);

    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardCounter}>
            {currentCardIndex + 1} / {filteredCards.length}
          </Text>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(currentCard.id)}
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={isFavorite ? colors.error : colors.textTertiary} 
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.memoryCard}
          onPress={flipCard}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[colors.primary, colors.primaryLight]}
            style={styles.cardGradient}
          >
            <View style={styles.cardContent}>
              <MaterialCommunityIcons 
                name={isCardFlipped ? "lightbulb-on" : "help-circle"} 
                size={48} 
                color={colors.textWhite} 
              />
              <Text style={styles.cardText}>
                {isCardFlipped ? currentCard.answer : currentCard.question}
              </Text>
              <Text style={styles.cardHint}>
                {isCardFlipped ? 'Cevap' : 'Kartı çevirmek için dokun'}
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.cardNavigation}>
          <TouchableOpacity
            style={[styles.navButton, currentCardIndex === 0 && styles.navButtonDisabled]}
            onPress={prevCard}
            disabled={currentCardIndex === 0}
          >
            <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.navButton, currentCardIndex === filteredCards.length - 1 && styles.navButtonDisabled]}
            onPress={nextCard}
            disabled={currentCardIndex === filteredCards.length - 1}
          >
            <Ionicons name="chevron-forward" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[colors.primary, colors.primaryLight]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.navigate('HomeTab')}
            >
              <Ionicons name="arrow-back" size={24} color={colors.textWhite} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Hap Bilgi Kartları</Text>
            <TouchableOpacity style={styles.searchButton}>
              <Ionicons name="search-outline" size={24} color={colors.textWhite} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Kategoriler</Text>
          <FlatList
            data={cardCategories}
            renderItem={renderCategoryCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Memory Cards */}
        <View style={styles.cardsContainer}>
          <Text style={styles.sectionTitle}>
            {selectedCategory 
              ? cardCategories.find(cat => cat.id === selectedCategory)?.name + ' Kartları'
              : 'Tüm Kartlar'
            }
          </Text>
          {renderMemoryCard()}
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  header: {
    paddingTop: responsiveSize(50),
    paddingBottom: responsiveSize(20),
    paddingHorizontal: responsiveSize(20),
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
  searchButton: {
    padding: responsiveSize(8),
  },
  categoriesContainer: {
    paddingHorizontal: responsiveSize(20),
    marginTop: responsiveSize(20),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: responsiveSize(12),
  },
  categoriesList: {
    paddingHorizontal: responsiveSize(4),
  },
  categoryCard: {
    width: responsiveSize(120),
    height: responsiveSize(100),
    marginHorizontal: responsiveSize(6),
    borderRadius: responsiveSize(12),
    overflow: 'hidden',
    ...shadows.medium,
  },
  categoryCardSelected: {
    borderWidth: 3,
    borderColor: colors.primary,
  },
  categoryGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: responsiveSize(12),
  },
  categoryName: {
    fontSize: responsiveFontSize(14),
    fontWeight: 'bold',
    color: colors.textWhite,
    marginTop: responsiveSize(8),
    textAlign: 'center',
  },
  categoryCount: {
    fontSize: responsiveFontSize(10),
    color: colors.textWhite,
    opacity: 0.8,
    marginTop: responsiveSize(2),
  },
  cardsContainer: {
    paddingHorizontal: responsiveSize(20),
    marginTop: responsiveSize(20),
  },
  cardContainer: {
    alignItems: 'center',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: responsiveSize(16),
  },
  cardCounter: {
    fontSize: responsiveFontSize(14),
    color: colors.textSecondary,
    fontWeight: '500',
  },
  favoriteButton: {
    padding: responsiveSize(8),
  },
  memoryCard: {
    width: screenWidth - responsiveSize(80),
    height: responsiveSize(300),
    borderRadius: responsiveSize(16),
    overflow: 'hidden',
    ...shadows.large,
  },
  cardGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: responsiveSize(24),
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  cardText: {
    fontSize: responsiveFontSize(18),
    fontWeight: '600',
    color: colors.textWhite,
    textAlign: 'center',
    marginTop: responsiveSize(16),
    lineHeight: responsiveFontSize(26),
  },
  cardHint: {
    fontSize: responsiveFontSize(12),
    color: colors.textWhite,
    opacity: 0.7,
    marginTop: responsiveSize(16),
    textAlign: 'center',
  },
  cardNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: responsiveSize(20),
    paddingHorizontal: responsiveSize(40),
  },
  navButton: {
    width: responsiveSize(50),
    height: responsiveSize(50),
    borderRadius: responsiveSize(25),
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.small,
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: responsiveSize(60),
  },
  emptyStateText: {
    fontSize: responsiveFontSize(16),
    color: colors.textTertiary,
    marginTop: responsiveSize(16),
    textAlign: 'center',
  },
  bottomSpacing: {
    height: responsiveSize(20),
  },
});

export default CardsScreen; 