import AsyncStorage from '@react-native-async-storage/async-storage';

export interface MemoryCard {
  id: string;
  category: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string;
  image?: string; // Görsel URL'i
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CardCategory {
  name: string;
  count: number;
  easyCount: number;
  mediumCount: number;
  hardCount: number;
}

const CARDS_STORAGE_KEY = 'memory_cards';
const CATEGORIES_STORAGE_KEY = 'card_categories';

class AsyncStorageService {
  // Get all cards
  async getAllCards(): Promise<MemoryCard[]> {
    try {
      const cardsJson = await AsyncStorage.getItem(CARDS_STORAGE_KEY);
      if (cardsJson) {
        const cards = JSON.parse(cardsJson);
        return cards.map((card: any) => ({
          ...card,
          createdAt: new Date(card.createdAt),
          updatedAt: new Date(card.updatedAt)
        }));
      }
      return [];
    } catch (error) {
      console.error('Error getting all cards:', error);
      return [];
    }
  }

  // Get cards by category
  async getCardsByCategory(category: string): Promise<MemoryCard[]> {
    try {
      const allCards = await this.getAllCards();
      return allCards.filter(card => card.category === category);
    } catch (error) {
      console.error('Error getting cards by category:', error);
      return [];
    }
  }

  // Get cards by difficulty
  async getCardsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Promise<MemoryCard[]> {
    try {
      const allCards = await this.getAllCards();
      return allCards.filter(card => card.difficulty === difficulty);
    } catch (error) {
      console.error('Error getting cards by difficulty:', error);
      return [];
    }
  }

  // Add a single card
  async addCard(card: Omit<MemoryCard, 'createdAt' | 'updatedAt'>): Promise<void> {
    try {
      const allCards = await this.getAllCards();
      const newCard: MemoryCard = {
        ...card,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      allCards.push(newCard);
      await AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(allCards));
    } catch (error) {
      console.error('Error adding card:', error);
    }
  }

  // Add multiple cards
  async addManyCards(cards: Omit<MemoryCard, 'createdAt' | 'updatedAt'>[]): Promise<void> {
    try {
      const allCards = await this.getAllCards();
      const newCards: MemoryCard[] = cards.map(card => ({
        ...card,
        createdAt: new Date(),
        updatedAt: new Date()
      }));
      allCards.push(...newCards);
      await AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(allCards));
    } catch (error) {
      console.error('Error adding many cards:', error);
    }
  }

  // Update a card
  async updateCard(id: string, updates: Partial<Omit<MemoryCard, 'id' | 'createdAt'>>): Promise<void> {
    try {
      const allCards = await this.getAllCards();
      const cardIndex = allCards.findIndex(card => card.id === id);
      if (cardIndex !== -1) {
        allCards[cardIndex] = {
          ...allCards[cardIndex],
          ...updates,
          updatedAt: new Date()
        };
        await AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(allCards));
      }
    } catch (error) {
      console.error('Error updating card:', error);
    }
  }

  // Delete a card
  async deleteCard(id: string): Promise<void> {
    try {
      const allCards = await this.getAllCards();
      const filteredCards = allCards.filter(card => card.id !== id);
      await AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(filteredCards));
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  }

  // Get category statistics
  async getCategoryStats(): Promise<CardCategory[]> {
    try {
      const allCards = await this.getAllCards();
      const categoryMap = new Map<string, { count: number; easy: number; medium: number; hard: number }>();

      allCards.forEach(card => {
        if (!categoryMap.has(card.category)) {
          categoryMap.set(card.category, { count: 0, easy: 0, medium: 0, hard: 0 });
        }
        
        const stats = categoryMap.get(card.category)!;
        stats.count++;
        
        switch (card.difficulty) {
          case 'easy':
            stats.easy++;
            break;
          case 'medium':
            stats.medium++;
            break;
          case 'hard':
            stats.hard++;
            break;
        }
      });

      const categories: CardCategory[] = [];
      categoryMap.forEach((stats, name) => {
        categories.push({
          name,
          count: stats.count,
          easyCount: stats.easy,
          mediumCount: stats.medium,
          hardCount: stats.hard
        });
      });

      return categories;
    } catch (error) {
      console.error('Error getting category stats:', error);
      return [];
    }
  }

  // Clear all cards
  async clearAllCards(): Promise<void> {
    try {
      await AsyncStorage.removeItem(CARDS_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing cards:', error);
    }
  }

  // Check if cards exist
  async hasCards(): Promise<boolean> {
    try {
      const allCards = await this.getAllCards();
      return allCards.length > 0;
    } catch (error) {
      console.error('Error checking if cards exist:', error);
      return false;
    }
  }
}

export const asyncStorageService = new AsyncStorageService();
