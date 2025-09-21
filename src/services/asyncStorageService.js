const AsyncStorage = require('@react-native-async-storage/async-storage');

const CARDS_STORAGE_KEY = 'memory_cards';
const CATEGORIES_STORAGE_KEY = 'card_categories';

class AsyncStorageService {
  // Get all cards
  async getAllCards() {
    try {
      const cardsJson = await AsyncStorage.getItem(CARDS_STORAGE_KEY);
      if (cardsJson) {
        const cards = JSON.parse(cardsJson);
        return cards.map((card) => ({
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
  async getCardsByCategory(category) {
    try {
      const allCards = await this.getAllCards();
      return allCards.filter(card => card.category === category);
    } catch (error) {
      console.error('Error getting cards by category:', error);
      return [];
    }
  }

  // Get cards by difficulty
  async getCardsByDifficulty(difficulty) {
    try {
      const allCards = await this.getAllCards();
      return allCards.filter(card => card.difficulty === difficulty);
    } catch (error) {
      console.error('Error getting cards by difficulty:', error);
      return [];
    }
  }

  // Save all cards
  async saveAllCards(cards) {
    try {
      const cardsJson = JSON.stringify(cards);
      await AsyncStorage.setItem(CARDS_STORAGE_KEY, cardsJson);
      return true;
    } catch (error) {
      console.error('Error saving all cards:', error);
      return false;
    }
  }

  // Add a new card
  async addCard(card) {
    try {
      const allCards = await this.getAllCards();
      const newCard = {
        ...card,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      allCards.push(newCard);
      await this.saveAllCards(allCards);
      return newCard;
    } catch (error) {
      console.error('Error adding card:', error);
      return null;
    }
  }

  // Update a card
  async updateCard(cardId, updates) {
    try {
      const allCards = await this.getAllCards();
      const cardIndex = allCards.findIndex(card => card.id === cardId);
      
      if (cardIndex !== -1) {
        allCards[cardIndex] = {
          ...allCards[cardIndex],
          ...updates,
          updatedAt: new Date()
        };
        await this.saveAllCards(allCards);
        return allCards[cardIndex];
      }
      return null;
    } catch (error) {
      console.error('Error updating card:', error);
      return null;
    }
  }

  // Delete a card
  async deleteCard(cardId) {
    try {
      const allCards = await this.getAllCards();
      const filteredCards = allCards.filter(card => card.id !== cardId);
      await this.saveAllCards(filteredCards);
      return true;
    } catch (error) {
      console.error('Error deleting card:', error);
      return false;
    }
  }

  // Get category statistics
  async getCategoryStats() {
    try {
      const allCards = await this.getAllCards();
      const categoryMap = {};
      
      allCards.forEach(card => {
        if (!categoryMap[card.category]) {
          categoryMap[card.category] = {
            name: card.category,
            count: 0,
            easyCount: 0,
            mediumCount: 0,
            hardCount: 0
          };
        }
        
        categoryMap[card.category].count++;
        categoryMap[card.category][`${card.difficulty}Count`]++;
      });
      
      return Object.values(categoryMap);
    } catch (error) {
      console.error('Error getting category stats:', error);
      return [];
    }
  }

  // Clear all cards
  async clearAllCards() {
    try {
      await AsyncStorage.removeItem(CARDS_STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing all cards:', error);
      return false;
    }
  }

  // Search cards
  async searchCards(searchTerm) {
    try {
      const allCards = await this.getAllCards();
      const lowerSearchTerm = searchTerm.toLowerCase();
      
      return allCards.filter(card => 
        card.question.toLowerCase().includes(lowerSearchTerm) ||
        card.answer.toLowerCase().includes(lowerSearchTerm) ||
        card.explanation?.toLowerCase().includes(lowerSearchTerm) ||
        card.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm))
      );
    } catch (error) {
      console.error('Error searching cards:', error);
      return [];
    }
  }

  // Get random cards
  async getRandomCards(count = 10) {
    try {
      const allCards = await this.getAllCards();
      const shuffled = allCards.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    } catch (error) {
      console.error('Error getting random cards:', error);
      return [];
    }
  }
}

// Create singleton instance
const asyncStorageService = new AsyncStorageService();

module.exports = {
  AsyncStorageService,
  asyncStorageService,
  // Export types for compatibility
  MemoryCard: null, // Will be defined in TypeScript files
  CardCategory: null // Will be defined in TypeScript files
};
