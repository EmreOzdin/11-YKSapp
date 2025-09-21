// Test script to check if math cards are properly loaded
const { mathCards } = require('./src/data/mathscards.ts');

console.log('Math cards loaded:', !!mathCards);
console.log('Math cards count:', mathCards?.length);
console.log('First math card:', mathCards?.[0]);

// Test CARD_DATA
const CARD_DATA = {
  math: mathCards,
};

console.log('CARD_DATA math:', !!CARD_DATA.math);
console.log('CARD_DATA math length:', CARD_DATA.math?.length);
