import { MemoryCard } from './asyncStorageService';
import { generateAllCards } from './generateCards';

// Tüm kartları oluştur (600 kart - her kategoride 100 kart)
export const allCards: Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] =
  generateAllCards();

// Kartları yüklemek için fonksiyon
export const loadAllCards = async () => {
  const { asyncStorageService } = await import('./asyncStorageService');
  await asyncStorageService.addManyCards(allCards);
  console.log(`${allCards.length} kart başarıyla yüklendi!`);
};
