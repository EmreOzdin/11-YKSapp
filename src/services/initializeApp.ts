export const initializeApp = async () => {
  try {
    console.log('Initializing app...');

    // MongoDB is now used for card data, no local initialization needed
    console.log('App initialization completed successfully');
  } catch (error) {
    console.error('App initialization failed:', error);
    // Don't throw error to prevent app from crashing
  }
};
