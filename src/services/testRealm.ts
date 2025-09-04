import { checkQuestionsInRealm, loadQuestionsToRealm } from './realmCardsService';

// MongoDB Realm'i test et
export const testRealm = async () => {
  try {
    console.log('🧪 MongoDB Realm testi başlatılıyor...');
    
    // Soruları yükle
    const success = await loadQuestionsToRealm();
    
    if (success) {
      console.log('✅ Sorular başarıyla yüklendi!');
      
      // Soruları kontrol et
      checkQuestionsInRealm();
      
      return true;
    } else {
      console.error('❌ Sorular yüklenemedi!');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Test sırasında hata oluştu:', error);
    return false;
  }
};

// Test fonksiyonunu çağır
testRealm();
