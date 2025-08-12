import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  FlatList,
  Dimensions
} from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { responsiveSize, responsiveFontSize } from '../utils/responsive';
import { colors, shadows } from '../utils/theme';

const { width: screenWidth } = Dimensions.get('window');

interface MemoryCard {
  id: string;
  category: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
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
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  // Kart kategorileri
  const cardCategories: CardCategory[] = [
    {
      id: 'math',
      name: 'Matematik',
      icon: 'calculator',
      color: '#228be6',
      cardCount: 6
    },
    {
      id: 'physics',
      name: 'Fizik',
      icon: 'atom',
      color: '#f7b731',
      cardCount: 6
    },
    {
      id: 'chemistry',
      name: 'Kimya',
      icon: 'flask',
      color: '#6c47ff',
      cardCount: 6
    },
    {
      id: 'biology',
      name: 'Biyoloji',
      icon: 'leaf',
      color: '#ff6b81',
      cardCount: 6
    },
    {
      id: 'turkish',
      name: 'Türkçe',
      icon: 'book-open-variant',
      color: '#17a2b8',
      cardCount: 6
    },
    {
      id: 'history',
      name: 'Tarih',
      icon: 'castle',
      color: '#D2691E',
      cardCount: 6
    }
  ];

  // Örnek hap bilgi kartları
  const memoryCards: MemoryCard[] = [
    // Matematik Kartları
    {
      id: '1',
      category: 'math',
      question: 'İkinci dereceden denklem formülü nedir?',
      answer: 'x = (-b ± √(b² - 4ac)) / 2a',
      difficulty: 'medium'
    },
    {
      id: '2',
      category: 'math',
      question: 'Pisagor teoremi nedir?',
      answer: 'a² + b² = c² (Dik üçgende hipotenüsün karesi, diğer iki kenarın karelerinin toplamına eşittir)',
      difficulty: 'easy'
    },
    {
      id: '3',
      category: 'math',
      question: 'Logaritma nedir?',
      answer: 'Bir sayının belirli bir tabana göre üssüdür. logₐb = c ise a^c = b',
      difficulty: 'hard'
    },
    {
      id: '4',
      category: 'math',
      question: 'Türev nedir?',
      answer: 'Bir fonksiyonun belirli bir noktadaki değişim hızını gösteren matematiksel kavramdır.',
      difficulty: 'hard'
    },
    {
      id: '5',
      category: 'math',
      question: 'İntegral nedir?',
      answer: 'Bir fonksiyonun belirli bir aralıktaki toplam değişimini hesaplayan matematiksel işlemdir.',
      difficulty: 'hard'
    },
    {
      id: '6',
      category: 'math',
      question: 'Trigonometrik fonksiyonlar nelerdir?',
      answer: 'sin, cos, tan, cot, sec, csc fonksiyonlarıdır.',
      difficulty: 'medium'
    },

    // Fizik Kartları
    {
      id: '7',
      category: 'physics',
      question: 'Newton\'un 1. Yasası nedir?',
      answer: 'Bir cisim üzerine net kuvvet etki etmiyorsa, cisim durumunu korur (durgun kalır veya sabit hızla hareket eder).',
      difficulty: 'easy'
    },
    {
      id: '8',
      category: 'physics',
      question: 'Newton\'un 2. Yasası nedir?',
      answer: 'F = m × a (Kuvvet, kütle ile ivmenin çarpımına eşittir)',
      difficulty: 'medium'
    },
    {
      id: '9',
      category: 'physics',
      question: 'Newton\'un 3. Yasası nedir?',
      answer: 'Her etkiye karşılık eşit ve zıt yönde bir tepki vardır.',
      difficulty: 'medium'
    },
    {
      id: '10',
      category: 'physics',
      question: 'Enerji korunumu yasası nedir?',
      answer: 'Enerji yoktan var edilemez, vardan yok edilemez, sadece bir türden diğerine dönüşür.',
      difficulty: 'medium'
    },
    {
      id: '11',
      category: 'physics',
      question: 'Momentum nedir?',
      answer: 'p = m × v (Momentum, kütle ile hızın çarpımıdır)',
      difficulty: 'medium'
    },
    {
      id: '12',
      category: 'physics',
      question: 'Elektrik akımı birimi nedir?',
      answer: 'Amper (A)',
      difficulty: 'easy'
    },

    // Kimya Kartları
    {
      id: '13',
      category: 'chemistry',
      question: 'Periyodik tabloda kaç periyot vardır?',
      answer: '7 periyot vardır.',
      difficulty: 'easy'
    },
    {
      id: '14',
      category: 'chemistry',
      question: 'Atom numarası nedir?',
      answer: 'Bir elementin çekirdeğindeki proton sayısıdır.',
      difficulty: 'easy'
    },
    {
      id: '15',
      category: 'chemistry',
      question: 'Kütle numarası nedir?',
      answer: 'Proton ve nötron sayılarının toplamıdır.',
      difficulty: 'easy'
    },
    {
      id: '16',
      category: 'chemistry',
      question: 'İyon nedir?',
      answer: 'Elektron alarak veya vererek yük kazanmış atom veya atom gruplarıdır.',
      difficulty: 'medium'
    },
    {
      id: '17',
      category: 'chemistry',
      question: 'pH nedir?',
      answer: 'Çözeltinin asitlik veya bazlık derecesini gösteren ölçektir (0-14 arası).',
      difficulty: 'medium'
    },
    {
      id: '18',
      category: 'chemistry',
      question: 'Kovalent bağ nedir?',
      answer: 'İki atom arasında elektron paylaşımı ile oluşan kimyasal bağdır.',
      difficulty: 'medium'
    },

    // Biyoloji Kartları
    {
      id: '19',
      category: 'biology',
      question: 'DNA\'nın açılımı nedir?',
      answer: 'Deoksiribo Nükleik Asit',
      difficulty: 'easy'
    },
    {
      id: '20',
      category: 'biology',
      question: 'RNA\'nın açılımı nedir?',
      answer: 'Ribo Nükleik Asit',
      difficulty: 'easy'
    },
    {
      id: '21',
      category: 'biology',
      question: 'Hücre nedir?',
      answer: 'Canlıların en küçük yapı ve işlev birimidir.',
      difficulty: 'easy'
    },
    {
      id: '22',
      category: 'biology',
      question: 'Mitokondri nedir?',
      answer: 'Hücrede enerji üretiminden sorumlu organeldir.',
      difficulty: 'medium'
    },
    {
      id: '23',
      category: 'biology',
      question: 'Fotosentez nedir?',
      answer: 'Bitkilerin güneş ışığı kullanarak besin üretmesi sürecidir.',
      difficulty: 'medium'
    },
    {
      id: '24',
      category: 'biology',
      question: 'Osmoz nedir?',
      answer: 'Su moleküllerinin yarı geçirgen zar üzerinden yoğunluk farkı nedeniyle hareketidir.',
      difficulty: 'medium'
    },

    // Türkçe Kartları
    {
      id: '25',
      category: 'turkish',
      question: 'Türkçede kaç ünlü harf vardır?',
      answer: '8 ünlü harf vardır: a, e, ı, i, o, ö, u, ü',
      difficulty: 'easy'
    },
    {
      id: '26',
      category: 'turkish',
      question: 'Türkçede kaç ünsüz harf vardır?',
      answer: '21 ünsüz harf vardır.',
      difficulty: 'easy'
    },
    {
      id: '27',
      category: 'turkish',
      question: 'Büyük ünlü uyumu nedir?',
      answer: 'Türkçe kelimelerde ünlülerin kalınlık-incelik bakımından uyum göstermesidir.',
      difficulty: 'medium'
    },
    {
      id: '28',
      category: 'turkish',
      question: 'Küçük ünlü uyumu nedir?',
      answer: 'Türkçe kelimelerde ünlülerin düzlük-yuvarlaklık bakımından uyum göstermesidir.',
      difficulty: 'medium'
    },
    {
      id: '29',
      category: 'turkish',
      question: 'Fiil nedir?',
      answer: 'İş, oluş, hareket ve durum bildiren kelimelerdir.',
      difficulty: 'easy'
    },
    {
      id: '30',
      category: 'turkish',
      question: 'İsim nedir?',
      answer: 'Varlıkları, kavramları karşılayan kelimelerdir.',
      difficulty: 'easy'
    },

    // Tarih Kartları
    {
      id: '31',
      category: 'history',
      question: 'İstanbul\'un fethi hangi yılda gerçekleşmiştir?',
      answer: '1453 yılında Fatih Sultan Mehmet tarafından fethedilmiştir.',
      difficulty: 'medium'
    },
    {
      id: '32',
      category: 'history',
      question: 'Malazgirt Savaşı hangi yılda yapılmıştır?',
      answer: '1071 yılında Alparslan komutasındaki Selçuklular ile Bizans arasında yapılmıştır.',
      difficulty: 'medium'
    },
    {
      id: '33',
      category: 'history',
      question: 'Kurtuluş Savaşı hangi yıllar arasında yapılmıştır?',
      answer: '1919-1923 yılları arasında yapılmıştır.',
      difficulty: 'medium'
    },
    {
      id: '34',
      category: 'history',
      question: 'Cumhuriyet hangi tarihte ilan edilmiştir?',
      answer: '29 Ekim 1923 tarihinde ilan edilmiştir.',
      difficulty: 'easy'
    },
    {
      id: '35',
      category: 'history',
      question: 'TBMM hangi tarihte açılmıştır?',
      answer: '23 Nisan 1920 tarihinde açılmıştır.',
      difficulty: 'easy'
    },
    {
      id: '36',
      category: 'history',
      question: 'Çanakkale Savaşı hangi yıllar arasında yapılmıştır?',
      answer: '1915-1916 yılları arasında yapılmıştır.',
      difficulty: 'medium'
    }
  ];

  const filteredCards = selectedCategory 
    ? memoryCards.filter(card => card.category === selectedCategory)
    : memoryCards;

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
    setFlippedCards(new Set());
    setCurrentCardIndex(0);
  };

  const handleCardFlip = (cardId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const renderCategoryCard = ({ item }: { item: CardCategory }) => (
    <TouchableOpacity
      style={[
        styles.categoryCard,
        selectedCategory === item.id && styles.categoryCardSelected
      ]}
      onPress={() => handleCategoryChange(item.id)}
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

  const renderMemoryCard = ({ item, index }: { item: MemoryCard; index: number }) => {
    const isCardFlipped = flippedCards.has(item.id);
    
    // Kategori rengini bul
    const categoryColor = selectedCategory 
      ? cardCategories.find(cat => cat.id === selectedCategory)?.color || colors.primary
      : cardCategories.find(cat => cat.id === item.category)?.color || colors.primary;

    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardCounter}>
            {index + 1} / {filteredCards.length}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.memoryCard}
          onPress={() => handleCardFlip(item.id)}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[categoryColor, categoryColor + '80']}
            style={styles.cardGradient}
          >
            <View style={styles.cardContent}>
              <MaterialCommunityIcons 
                name={isCardFlipped ? "lightbulb-on" : "help-circle"} 
                size={40} 
                color={colors.textWhite} 
              />
              <Text style={styles.cardText}>
                {isCardFlipped ? item.answer : item.question}
              </Text>
              <Text style={styles.cardHint}>
                {isCardFlipped ? 'Cevap' : 'Kartı çevirmek için dokun'}
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <MaterialCommunityIcons name="cards-outline" size={64} color={colors.textTertiary} />
      <Text style={styles.emptyStateText}>Bu kategoride henüz kart bulunmuyor</Text>
    </View>
  );

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
            <Text style={styles.headerTitle}>Bilgi Kartları</Text>
            <View style={styles.searchButton} />
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
          <View style={styles.cardsWrapper}>
            {filteredCards.length > 0 ? (
              <FlatList
                data={filteredCards}
                renderItem={renderMemoryCard}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                snapToInterval={screenWidth - responsiveSize(40)}
                decelerationRate={0.95}
                contentContainerStyle={styles.cardsList}
                onMomentumScrollEnd={(event) => {
                  const newIndex = Math.round(event.nativeEvent.contentOffset.x / (screenWidth - responsiveSize(40)));
                  setCurrentCardIndex(newIndex);
                }}
                getItemLayout={(data, index) => ({
                  length: screenWidth - responsiveSize(40),
                  offset: (screenWidth - responsiveSize(40)) * index,
                  index,
                })}
                initialNumToRender={1}
                maxToRenderPerBatch={3}
                windowSize={5}
                snapToAlignment="center"
              />
            ) : (
              renderEmptyState()
            )}
          </View>
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
    fontSize: responsiveFontSize(16),
    fontWeight: '800',
    color: colors.textWhite,
    marginTop: responsiveSize(8),
    textAlign: 'center',
    lineHeight: responsiveFontSize(26),
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  categoryCount: {
    fontSize: responsiveFontSize(10),
    color: colors.textWhite,
    opacity: 0.8,
    marginTop: responsiveSize(2),
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  cardsContainer: {
    paddingHorizontal: responsiveSize(20),
    marginTop: responsiveSize(20),
    flex: 1,
  },
  cardsWrapper: {
    height: responsiveSize(450),
    justifyContent: 'center',
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth - responsiveSize(40),
    paddingHorizontal: responsiveSize(10),
    minHeight: responsiveSize(400),
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: responsiveSize(12),
    paddingHorizontal: responsiveSize(10),
  },
  cardCounter: {
    fontSize: responsiveFontSize(14),
    color: colors.textSecondary,
    fontWeight: '500',
  },
  memoryCard: {
    width: '100%',
    height: responsiveSize(320),
    borderRadius: responsiveSize(16),
    overflow: 'hidden',
    ...shadows.large,
    marginVertical: responsiveSize(5),
  },
  cardGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: responsiveSize(20),
  },
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: responsiveSize(20),
    width: '100%',
  },
  cardText: {
    fontSize: responsiveFontSize(18),
    fontWeight: '800',
    color: colors.textWhite,
    textAlign: 'center',
    marginTop: responsiveSize(12),
    lineHeight: responsiveFontSize(26),
    width: '100%',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  cardHint: {
    fontSize: responsiveFontSize(14),
    color: colors.textWhite,
    opacity: 1,
    marginTop: responsiveSize(12),
    textAlign: 'center',
    width: '100%',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  cardsList: {
    alignItems: 'center',
    justifyContent: 'center',
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