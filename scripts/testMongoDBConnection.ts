const { 
  connectToMongoDB, 
  checkMongoDBConnection, 
  getCollectionStats,
  closeMongoDBConnection 
} = require('../src/services/mongodbService');

// MongoDB bağlantısını test et
async function testMongoDBConnection() {
  try {
    console.log('🧪 MongoDB bağlantı testi başlatılıyor...');
    
    // Bağlantı kontrolü
    const isConnected = await checkMongoDBConnection();
    if (!isConnected) {
      throw new Error('MongoDB bağlantısı başarısız');
    }
    
    console.log('✅ MongoDB bağlantısı başarılı');
    
    // Collection istatistiklerini getir
    console.log('\n📊 Collection istatistikleri:');
    const stats = await getCollectionStats();
    
    for (const [subject, count] of Object.entries(stats)) {
      console.log(`   ${subject}: ${count} kart`);
    }
    
    const totalCards = Object.values(stats).reduce((sum, count) => (sum as number) + (count as number), 0);
    console.log(`\n📈 Toplam kart sayısı: ${totalCards}`);
    
    console.log('\n🎉 MongoDB testi başarıyla tamamlandı!');
    
  } catch (error) {
    console.error('❌ MongoDB testi başarısız:', error);
    process.exit(1);
  } finally {
    await closeMongoDBConnection();
  }
}

// Script'i çalıştır
if (require.main === module) {
  testMongoDBConnection();
}

module.exports = { testMongoDBConnection };
