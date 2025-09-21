export const initializeApp = async () => {
  try {
    // MongoDB is now used for card data, no local initialization needed
  } catch (error) {
    console.error('App initialization failed:', error);
    // Don't throw error to prevent app from crashing
  }
};
