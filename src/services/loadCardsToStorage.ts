import { asyncStorageService } from './asyncStorageService';
import { allCards } from './loadCardsData';

// Kartları AsyncStorage'a yükle
export const loadCardsToStorage = async () => {
  try {
    console.log('Kartlar yükleniyor...');
    
    // Mevcut kartları temizle
    await asyncStorageService.clearAllCards();
    
    // Yeni kartları ekle
    await asyncStorageService.addManyCards(allCards);
    
    console.log(`✅ ${allCards.length} kart başarıyla yüklendi!`);
    console.log('📊 Kategori dağılımı:');
    
    // Kategori istatistiklerini göster
    const stats = await asyncStorageService.getCategoryStats();
    stats.forEach(category => {
      console.log(`   ${category.name}: ${category.count} kart`);
    });
    
  } catch (error) {
    console.error('❌ Kartlar yüklenirken hata oluştu:', error);
  }
};

// Kartları kontrol et
export const checkCards = async () => {
  try {
    const cards = await asyncStorageService.getAllCards();
    console.log(`📚 Toplam ${cards.length} kart bulundu`);
    
    const stats = await asyncStorageService.getCategoryStats();
    console.log('📊 Kategori istatistikleri:');
    stats.forEach(category => {
      console.log(`   ${category.name}: ${category.count} kart (Kolay: ${category.easyCount}, Orta: ${category.mediumCount}, Zor: ${category.hardCount})`);
    });
    
  } catch (error) {
    console.error('❌ Kartlar kontrol edilirken hata oluştu:', error);
  }
};

