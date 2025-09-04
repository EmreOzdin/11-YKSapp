import {
  checkQuestionsInMongoDB,
  connectToMongoDB,
  disconnectFromMongoDB,
  loadQuestionsToMongoDB,
} from './mongoCardsService';

// MongoDB bağlantısını test et
export const testMongoDB = async () => {
  try {
    console.log('🧪 MongoDB test başlatılıyor...');
    
    // 1. Bağlantıyı test et
    console.log('1️⃣ MongoDB bağlantısı test ediliyor...');
    const connected = await connectToMongoDB();
    
    if (!connected) {
      console.error('❌ MongoDB bağlantısı başarısız!');
      return false;
    }
    
    console.log('✅ MongoDB bağlantısı başarılı!');
    
    // 2. Soruları yükle
    console.log('2️⃣ Sorular MongoDB\'ye yükleniyor...');
    const loadSuccess = await loadQuestionsToMongoDB();
    
    if (!loadSuccess) {
      console.error('❌ Sorular yüklenemedi!');
      return false;
    }
    
    console.log('✅ Sorular başarıyla yüklendi!');
    
    // 3. Soruları kontrol et
    console.log('3️⃣ Yüklenen sorular kontrol ediliyor...');
    await checkQuestionsInMongoDB();
    
    console.log('🎉 MongoDB test başarıyla tamamlandı!');
    return true;
    
  } catch (error) {
    console.error('❌ MongoDB test sırasında hata:', error);
    return false;
  } finally {
    // Bağlantıyı kapat
    await disconnectFromMongoDB();
  }
};

// Sadece bağlantıyı test et (soru yükleme olmadan)
export const testMongoDBConnection = async () => {
  try {
    console.log('🔌 MongoDB bağlantısı test ediliyor...');
    
    const connected = await connectToMongoDB();
    
    if (connected) {
      console.log('✅ MongoDB bağlantısı başarılı!');
      await disconnectFromMongoDB();
      return true;
    } else {
      console.error('❌ MongoDB bağlantısı başarısız!');
      return false;
    }
    
  } catch (error) {
    console.error('❌ MongoDB bağlantı testi sırasında hata:', error);
    return false;
  }
};
