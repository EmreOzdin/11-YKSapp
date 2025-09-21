const { connectToMongoDB, initializeCollections, uploadCardsToMongoDB, COLLECTIONS, closeMongoDBConnection } = require('../src/services/mongodbService');

// Kart verilerini import et
const { mathCards } = require('../src/data/mathscards');
const { physicsCards } = require('../src/data/phsyicscards');
const { chemistryCards } = require('../src/data/chemistrycards');
const { biologyCards } = require('../src/data/biologycards');
const { turkishCards } = require('../src/data/turkishcards');
const { historyCards } = require('../src/data/historycards');

// Ders kartları mapping'i
const SUBJECT_CARDS = {
  [COLLECTIONS.MATH]: mathCards,
  [COLLECTIONS.PHYSICS]: physicsCards,
  [COLLECTIONS.CHEMISTRY]: chemistryCards,
  [COLLECTIONS.BIOLOGY]: biologyCards,
  [COLLECTIONS.TURKISH]: turkishCards,
  [COLLECTIONS.HISTORY]: historyCards
} as const;

// Tüm kartları MongoDB'ye yükle
async function uploadAllCardsToMongoDB(): Promise<void> {
  try {
    console.log('🚀 MongoDB\'ye kart yükleme işlemi başlatılıyor...');
    
    // MongoDB'ye bağlan
    await connectToMongoDB();
    
    // Collection'ları oluştur
    await initializeCollections();
    
    let totalUploaded = 0;
    
    // Her ders için kartları yükle
    for (const [collectionName, cards] of Object.entries(SUBJECT_CARDS)) {
      console.log(`\n📚 ${collectionName} yükleniyor...`);
      console.log(`   📊 ${cards.length} kart bulundu`);
      
      const uploadedCount = await uploadCardsToMongoDB(cards, collectionName);
      totalUploaded += uploadedCount;
      
      console.log(`   ✅ ${uploadedCount} kart başarıyla yüklendi`);
    }
    
    console.log(`\n🎉 Tüm kartlar başarıyla yüklendi!`);
    console.log(`📊 Toplam yüklenen kart sayısı: ${totalUploaded}`);
    
    // Bağlantıyı kapat
    await closeMongoDBConnection();
    
  } catch (error) {
    console.error('❌ Kart yükleme işlemi başarısız:', error);
    await closeMongoDBConnection();
    process.exit(1);
  }
}

// Script'i çalıştır
if (require.main === module) {
  uploadAllCardsToMongoDB();
}

module.exports = { uploadAllCardsToMongoDB };
