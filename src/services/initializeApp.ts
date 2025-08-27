import { initializeAsyncStorageWithCards } from './loadCardsToAsyncStorage';

export const initializeApp = async () => {
  try {
    console.log('Initializing app...');
    
    // Initialize AsyncStorage with cards
    await initializeAsyncStorageWithCards();
    
    console.log('App initialization completed successfully');
  } catch (error) {
    console.error('App initialization failed:', error);
    // Don't throw error to prevent app from crashing
  }
};
