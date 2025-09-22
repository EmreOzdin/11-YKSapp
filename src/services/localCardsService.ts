import AsyncStorage from '@react-native-async-storage/async-storage';
import { MemoryCard } from './asyncStorageService';

// Import all card data
import { biologyCards } from '../data/biologycards';
import { chemistryCards } from '../data/chemistrycards';
import { historyCards } from '../data/historycards';
import { mathCards } from '../data/mathscards';
import { physicsCards } from '../data/phsyicscards';
import { turkishCards } from '../data/turkishcards';

// Storage keys for card categories only
const STORAGE_KEYS = {
  math: 'yks_math_cards_data',
  biology: 'yks_biology_cards_data',
  chemistry: 'yks_chemistry_cards_data',
  history: 'yks_history_cards_data',
  physics: 'yks_physics_cards_data',
  turkish: 'yks_turkish_cards_data',
};

// Card data mapping - sadece ders kategorileri
const CARD_DATA = {
  math: mathCards,
  biology: biologyCards,
  chemistry: chemistryCards,
  history: historyCards,
  physics: physicsCards,
  turkish: turkishCards,
};

// Load cards to storage for a specific category
export const loadCardsToStorage = async (
  category: string
): Promise<boolean> => {
  try {
    const cards = CARD_DATA[category as keyof typeof CARD_DATA];
    if (!cards) {
      console.error(`❌ ${category} kategorisi için veri bulunamadı`);
      return false;
    }

    // Convert to MemoryCard format
    const cardsWithTimestamps: MemoryCard[] = cards.map(card => ({
      ...card,
      tags: card.tags || [],
      difficulty: card.difficulty as 'easy' | 'medium' | 'hard',
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Save to AsyncStorage
    const storageKey = STORAGE_KEYS[category as keyof typeof STORAGE_KEYS];
    await AsyncStorage.setItem(storageKey, JSON.stringify(cardsWithTimestamps));
    return true;
  } catch (error) {
    console.error(`❌ ${category} kartları yüklenirken hata:`, error);
    return false;
  }
};

// Load all cards to storage
export const loadAllCardsToStorage = async (): Promise<boolean> => {
  try {
    const results = await Promise.all(
      Object.keys(CARD_DATA).map(category => loadCardsToStorage(category))
    );

    const successCount = results.filter(result => result).length;
    const totalCount = results.length;

    return successCount === totalCount;
  } catch (error) {
    console.error('❌ Tüm kartlar yüklenirken hata:', error);
    return false;
  }
};

// Get cards from storage for a specific category
export const getCardsFromStorage = async (
  category: string
): Promise<MemoryCard[]> => {
  try {
    const storageKey = STORAGE_KEYS[category as keyof typeof STORAGE_KEYS];
    const jsonValue = await AsyncStorage.getItem(storageKey);

    if (jsonValue != null) {
      const cards: MemoryCard[] = JSON.parse(jsonValue);
      return cards;
    }

    return [];
  } catch (error) {
    console.error(
      `❌ AsyncStorage'dan ${category} kartları getirilirken hata:`,
      error
    );
    return [];
  }
};

// Get all cards from all categories
export const getAllCardsFromStorage = async (): Promise<MemoryCard[]> => {
  try {
    const allCards: MemoryCard[] = [];

    for (const category of Object.keys(CARD_DATA)) {
      const categoryCards = await getCardsFromStorage(category);
      allCards.push(...categoryCards);
    }

    return allCards;
  } catch (error) {
    console.error('❌ Tüm kartlar getirilirken hata:', error);
    return [];
  }
};

// Get cards by category (with fallback to loading from data)
export const getCardsByCategory = async (
  category: string
): Promise<MemoryCard[]> => {
  try {
    let cards = await getCardsFromStorage(category);

    // If no cards in storage, load from data
    if (cards.length === 0) {
      const loadResult = await loadCardsToStorage(category);
      if (loadResult) {
        cards = await getCardsFromStorage(category);
      }
    }
    return cards;
  } catch (error) {
    console.error(
      `❌ ${category} kategorisi kartları getirilirken hata:`,
      error
    );
    return [];
  }
};

// Get category statistics
export const getCategoryStats = async (): Promise<
  Array<{
    _id: string;
    name: string;
    count: number;
    easyCount: number;
    mediumCount: number;
    hardCount: number;
    lastAccessed: Date;
  }>
> => {
  try {
    const stats = [];

    for (const category of Object.keys(CARD_DATA)) {
      const cards = await getCardsFromStorage(category);
      const easyCount = cards.filter(card => card.difficulty === 'easy').length;
      const mediumCount = cards.filter(
        card => card.difficulty === 'medium'
      ).length;
      const hardCount = cards.filter(card => card.difficulty === 'hard').length;

      stats.push({
        _id: category,
        name: getCategoryDisplayName(category),
        count: cards.length,
        easyCount,
        mediumCount,
        hardCount,
        lastAccessed: new Date(),
      });
    }

    return stats;
  } catch (error) {
    console.error('❌ Kategori istatistikleri getirilirken hata:', error);
    return [];
  }
};

// Get category display name - sadece ders kategorileri
const getCategoryDisplayName = (category: string): string => {
  const displayNames: { [key: string]: string } = {
    math: 'Matematik',
    biology: 'Biyoloji',
    chemistry: 'Kimya',
    history: 'Tarih',
    physics: 'Fizik',
    turkish: 'Türkçe',
  };

  return displayNames[category] || category;
};

// Check if cards exist in storage for a category
export const checkCardsInStorage = async (
  category: string
): Promise<boolean> => {
  try {
    const cards = await getCardsFromStorage(category);
    return cards.length > 0;
  } catch (error) {
    console.error(`❌ ${category} kategorisi kontrol edilirken hata:`, error);
    return false;
  }
};

// Clear all cards from storage
export const clearAllCardsFromStorage = async (): Promise<boolean> => {
  try {
    const keys = Object.values(STORAGE_KEYS);
    await Promise.all(keys.map(key => AsyncStorage.removeItem(key)));

    return true;
  } catch (error) {
    console.error('❌ Kartlar temizlenirken hata:', error);
    return false;
  }
};

// Soru deposu için özel fonksiyonlar
export const getTYT2018Questions = async (): Promise<MemoryCard[]> => {
  return await getCardsFromStorage('tyt2018');
};

export const getTYT2018QuestionsBySubject = async (
  subject: string
): Promise<MemoryCard[]> => {
  const allQuestions = await getTYT2018Questions();
  return allQuestions.filter(q => q.subject === subject);
};

export const getTYT2018QuestionsByDifficulty = async (
  difficulty: 'easy' | 'medium' | 'hard'
): Promise<MemoryCard[]> => {
  const allQuestions = await getTYT2018Questions();
  return allQuestions.filter(q => q.difficulty === difficulty);
};

export const getRandomTYT2018Questions = async (
  count: number
): Promise<MemoryCard[]> => {
  const allQuestions = await getTYT2018Questions();
  const shuffled = allQuestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getMockExamQuestions = async (
  year?: number
): Promise<MemoryCard[]> => {
  const allQuestions = year
    ? await getCardsFromStorage(
        year === 2018
          ? 'tyt2018'
          : year === 2019
            ? 'tyt2019'
            : year === 2020
              ? 'tyt2020'
              : year === 2021
                ? 'tyt2021'
                : year === 2022
                  ? 'tyt2022'
                  : year === 2023
                    ? 'tyt2023'
                    : year === 2024
                      ? 'tyt2024'
                      : year === 2025
                        ? 'tyt2025'
                        : 'tytAll'
      )
    : await getCardsFromStorage('tytAll');

  // TYT formatına uygun soru dağılımı
  const subjectDistribution = {
    Türkçe: 40,
    Matematik: 40,
    Fizik: 7,
    Kimya: 7,
    Biyoloji: 6,
    Tarih: 5,
    Coğrafya: 5,
    Felsefe: 5,
    'Din Kültürü': 5,
  };

  const questions: MemoryCard[] = [];

  // Her dersten belirtilen sayıda soru al
  Object.entries(subjectDistribution).forEach(([subject, count]) => {
    const subjectQuestions = allQuestions.filter(q => q.subject === subject);
    const shuffled = subjectQuestions.sort(() => 0.5 - Math.random());
    questions.push(...shuffled.slice(0, count));
  });

  // Deneme sınavı için soruları karıştır
  return questions.sort(() => 0.5 - Math.random());
};
