import { asyncStorageService } from './asyncStorageService';
import { memoryCardsData } from './cardData';
import { memoryCardsData2 } from './cardData2';
import { memoryCardsData3 } from './cardData3';

const allCards = [
  ...memoryCardsData,
  ...memoryCardsData2,
  ...memoryCardsData3
];

export const loadAllCardsToAsyncStorage = async () => {
  try {
    const hasCards = await asyncStorageService.hasCards();
    
    if (hasCards) {
      console.log('Cards already exist in AsyncStorage, skipping load');
      return;
    }
    
    await asyncStorageService.addManyCards(allCards);
    console.log(`Successfully loaded ${allCards.length} cards to AsyncStorage`);
  } catch (error) {
    console.error('Error loading cards to AsyncStorage:', error);
    throw error;
  }
};

export const loadCardsByCategory = async (category: string) => {
  try {
    const categoryCards = allCards.filter(card => card.category === category);
    await asyncStorageService.addManyCards(categoryCards);
    console.log(`Successfully loaded ${categoryCards.length} cards for category: ${category}`);
  } catch (error) {
    console.error('Error loading cards by category:', error);
    throw error;
  }
};

export const loadCardsByDifficulty = async (difficulty: 'easy' | 'medium' | 'hard') => {
  try {
    const difficultyCards = allCards.filter(card => card.difficulty === difficulty);
    await asyncStorageService.addManyCards(difficultyCards);
    console.log(`Successfully loaded ${difficultyCards.length} cards for difficulty: ${difficulty}`);
  } catch (error) {
    console.error('Error loading cards by difficulty:', error);
    throw error;
  }
};

export const clearAllCards = async () => {
  try {
    await asyncStorageService.clearAllCards();
    console.log('All cards cleared from AsyncStorage');
  } catch (error) {
    console.error('Error clearing cards:', error);
    throw error;
  }
};

export const initializeAsyncStorageWithCards = async () => {
  try {
    await loadAllCardsToAsyncStorage();
  } catch (error) {
    console.error('Failed to initialize AsyncStorage with cards:', error);
  }
};
