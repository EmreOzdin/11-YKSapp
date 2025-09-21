// MongoDB bağlantısı olmadan test script'i
console.log('🧪 MongoDB entegrasyonu test ediliyor...');

// Environment dosyasını test et
try {
  const { ENVIRONMENT } = require('../src/config/environment');
  console.log('✅ Environment dosyası başarıyla yüklendi');
  console.log('📊 MongoDB URI:', ENVIRONMENT.MONGODB.URI);
  console.log('📊 Database Name:', ENVIRONMENT.MONGODB.DATABASE_NAME);
  console.log('📊 MongoDB Enabled:', ENVIRONMENT.FEATURES.USE_MONGODB);
} catch (error) {
  console.error('❌ Environment dosyası yüklenemedi:', error);
}

// MongoDB servisini test et
try {
  const { COLLECTIONS } = require('../src/services/mongodbService');
  console.log('✅ MongoDB servisi başarıyla yüklendi');
  console.log('📊 Collection\'lar:', Object.keys(COLLECTIONS));
} catch (error) {
  console.error('❌ MongoDB servisi yüklenemedi:', error);
}

// Kart verilerini test et
try {
  const { mathCards } = require('../src/data/mathscards');
  const { physicsCards } = require('../src/data/phsyicscards');
  const { chemistryCards } = require('../src/data/chemistrycards');
  const { biologyCards } = require('../src/data/biologycards');
  const { turkishCards } = require('../src/data/turkishcards');
  const { historyCards } = require('../src/data/historycards');
  
  console.log('✅ Tüm kart verileri başarıyla yüklendi');
  console.log(`📊 Matematik: ${mathCards.length} kart`);
  console.log(`📊 Fizik: ${physicsCards.length} kart`);
  console.log(`📊 Kimya: ${chemistryCards.length} kart`);
  console.log(`📊 Biyoloji: ${biologyCards.length} kart`);
  console.log(`📊 Türkçe: ${turkishCards.length} kart`);
  console.log(`📊 Tarih: ${historyCards.length} kart`);
  
  const totalCards = mathCards.length + physicsCards.length + chemistryCards.length + 
                    biologyCards.length + turkishCards.length + historyCards.length;
  console.log(`📈 Toplam kart sayısı: ${totalCards}`);
  
} catch (error) {
  console.error('❌ Kart verileri yüklenemedi:', error);
}

console.log('\n🎉 MongoDB entegrasyonu testi tamamlandı!');
console.log('\n📝 Sonraki adımlar:');
console.log('1. MongoDB Atlas hesabı oluşturun');
console.log('2. MONGODB_SETUP.md dosyasını takip edin');
console.log('3. environment.js dosyasında MongoDB URI\'yi güncelleyin');
console.log('4. npm run mongodb:test komutunu çalıştırın');
console.log('5. npm run mongodb:upload komutunu çalıştırın');
