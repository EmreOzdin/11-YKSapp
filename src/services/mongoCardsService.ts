import { Collection, Db, MongoClient } from 'mongodb';
import { MemoryCard } from './asyncStorageService';
import { generateAllCards } from './generateCards';
import { 
  matematikYksKartlari, 
  fizikYksKartlari, 
  kimyaYksKartlari, 
  biyolojiYksKartlari, 
  turkceYksKartlari, 
  tarihYksKartlari 
} from './yksCardsData';

// MongoDB bağlantı bilgileri
const MONGODB_URI = 'mongodb://127.0.0.1:27017';
const DATABASE_NAME = 'yksapp';
const COLLECTION_NAME = 'cards';

let client: MongoClient | null = null;
let db: Db | null = null;
let collection: Collection | null = null;

// MongoDB bağlantısını kur
export const connectToMongoDB = async (): Promise<boolean> => {
  try {
    console.log('🔌 MongoDB\'ye bağlanılıyor...');
    
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    db = client.db(DATABASE_NAME);
    collection = db.collection(COLLECTION_NAME);
    
    console.log('✅ MongoDB bağlantısı başarılı!');
    console.log(`📊 Database: ${DATABASE_NAME}`);
    console.log(`📁 Collection: ${COLLECTION_NAME}`);
    
    return true;
  } catch (error) {
    console.error('❌ MongoDB bağlantı hatası:', error);
    return false;
  }
};

// MongoDB bağlantısını kapat
export const disconnectFromMongoDB = async (): Promise<void> => {
  try {
    if (client) {
      await client.close();
      client = null;
      db = null;
      collection = null;
      console.log('✅ MongoDB bağlantısı kapatıldı');
    }
  } catch (error) {
    console.error('❌ MongoDB bağlantısı kapatılırken hata:', error);
  }
};

// Soruları MongoDB'ye yükle
export const loadQuestionsToMongoDB = async (): Promise<boolean> => {
  try {
    if (!collection) {
      const connected = await connectToMongoDB();
      if (!connected) return false;
    }

    console.log('📚 Sorular MongoDB\'ye yükleniyor...');
    
    // Önce mevcut soruları temizle
    await collection?.deleteMany({});
    
    // Yeni soruları oluştur
    const allQuestions = generateAllCards();
    
    // MongoDB'ye ekle
    const result = await collection?.insertMany(allQuestions);
    
    console.log(`✅ ${result?.insertedCount || 0} soru başarıyla MongoDB'ye yüklendi!`);
    
    // Kategori istatistiklerini göster
    const stats = await getCategoryStatsFromMongoDB();
    console.log('📊 Kategori dağılımı:');
    stats.forEach(category => {
      console.log(`   ${category.name}: ${category.count} soru`);
    });
    
    return true;
  } catch (error) {
    console.error('❌ Sorular MongoDB\'ye yüklenirken hata:', error);
    return false;
  }
};

// Tüm soruları MongoDB'den getir
export const getAllQuestionsFromMongoDB = async (): Promise<MemoryCard[]> => {
  try {
    if (!collection) {
      const connected = await connectToMongoDB();
      if (!connected) return [];
    }

    const questions = await collection?.find({}).toArray();
    return (questions as unknown as MemoryCard[]) || [];
  } catch (error) {
    console.error('❌ Sorular MongoDB\'den getirilirken hata:', error);
    return [];
  }
};

// Kategoriye göre soruları getir
export const getQuestionsByCategoryFromMongoDB = async (category: string): Promise<MemoryCard[]> => {
  try {
    if (!collection) {
      const connected = await connectToMongoDB();
      if (!connected) return [];
    }

    const questions = await collection?.find({ category }).toArray();
    return (questions as unknown as MemoryCard[]) || [];
  } catch (error) {
    console.error('❌ Kategori soruları MongoDB\'den getirilirken hata:', error);
    return [];
  }
};

// Kategori istatistiklerini getir
export const getCategoryStatsFromMongoDB = async () => {
  try {
    if (!collection) {
      const connected = await connectToMongoDB();
      if (!connected) return [];
    }

    const categories = ['Matematik', 'Fizik', 'Kimya', 'Biyoloji', 'Türkçe', 'Tarih'];
    const stats = [];

    for (const category of categories) {
      const count = await collection?.countDocuments({ category }) || 0;
      const easyCount = await collection?.countDocuments({ category, difficulty: 'easy' }) || 0;
      const mediumCount = await collection?.countDocuments({ category, difficulty: 'medium' }) || 0;
      const hardCount = await collection?.countDocuments({ category, difficulty: 'hard' }) || 0;

      stats.push({
        name: category,
        count,
        easyCount,
        mediumCount,
        hardCount,
      });
    }

    return stats;
  } catch (error) {
    console.error('❌ Kategori istatistikleri MongoDB\'den getirilirken hata:', error);
    return [];
  }
};

// Soruları kontrol et
export const checkQuestionsInMongoDB = async () => {
  try {
    if (!collection) {
      const connected = await connectToMongoDB();
      if (!connected) return;
    }

    const totalCount = await collection?.countDocuments({}) || 0;
    console.log(`📚 MongoDB'de toplam ${totalCount} soru bulundu`);
    
    const stats = await getCategoryStatsFromMongoDB();
    console.log('📊 Kategori istatistikleri:');
    stats.forEach(category => {
      console.log(`   ${category.name}: ${category.count} soru (Kolay: ${category.easyCount}, Orta: ${category.mediumCount}, Zor: ${category.hardCount})`);
    });
    
  } catch (error) {
    console.error('❌ Sorular kontrol edilirken hata oluştu:', error);
  }
};

// Soruları yeniden yükle
export const reloadQuestionsToMongoDB = async (): Promise<boolean> => {
  try {
    console.log('🔄 Sorular MongoDB\'ye yeniden yükleniyor...');
    const success = await loadQuestionsToMongoDB();
    
    if (success) {
      console.log('✅ Sorular başarıyla yeniden yüklendi!');
      await checkQuestionsInMongoDB();
    } else {
      console.error('❌ Sorular yeniden yüklenirken hata oluştu');
    }
    
    return success;
  } catch (error) {
    console.error('❌ Sorular yeniden yüklenirken hata oluştu:', error);
    return false;
  }
};

// YKS kartlarını MongoDB'ye yükle
export const loadYksCardsToMongoDB = async (): Promise<boolean> => {
  try {
    if (!collection) {
      const connected = await connectToMongoDB();
      if (!connected) return false;
    }

    console.log('📚 YKS kartları MongoDB\'ye yükleniyor...');
    
    // Tüm YKS kartlarını birleştir
    const allYksCards = [
      ...matematikYksKartlari,
      ...fizikYksKartlari,
      ...kimyaYksKartlari,
      ...biyolojiYksKartlari,
      ...turkceYksKartlari,
      ...tarihYksKartlari
    ];

    // Her karta timestamp ekle
    const cardsWithTimestamps = allYksCards.map(card => ({
      ...card,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    console.log(`📊 Toplam ${cardsWithTimestamps.length} YKS kartı hazırlandı`);
    
    // Kategori bazında sayıları göster
    const categoryCounts = cardsWithTimestamps.reduce((acc, card) => {
      acc[card.category] = (acc[card.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log('📈 Kategori dağılımı:');
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} kart`);
    });

    // Önce mevcut YKS kartlarını temizle (sadece YKS kategorilerindeki kartları)
    const yksCategories = ['Matematik', 'Fizik', 'Kimya', 'Biyoloji', 'Türkçe', 'Tarih'];
    const deleteResult = await collection?.deleteMany({ 
      category: { $in: yksCategories } 
    });
    
    console.log(`🗑️ ${deleteResult?.deletedCount || 0} eski YKS kartı silindi`);
    
    // Yeni kartları MongoDB'ye ekle
    const result = await collection?.insertMany(cardsWithTimestamps);
    
    console.log(`✅ ${result?.insertedCount || 0} YKS kartı başarıyla MongoDB'ye yüklendi!`);
    
    // Yükleme sonrası istatistikleri göster
    await checkQuestionsInMongoDB();
    
    return true;
  } catch (error) {
    console.error('❌ YKS kartları MongoDB\'ye yüklenirken hata:', error);
    return false;
  }
};

// YKS kartlarını kontrol et
export const checkYksCardsInMongoDB = async () => {
  try {
    if (!collection) {
      const connected = await connectToMongoDB();
      if (!connected) return;
    }

    const yksCategories = ['Matematik', 'Fizik', 'Kimya', 'Biyoloji', 'Türkçe', 'Tarih'];
    
    console.log('🔍 YKS kartları MongoDB\'de kontrol ediliyor...');
    
    for (const category of yksCategories) {
      const count = await collection?.countDocuments({ category }) || 0;
      const easyCount = await collection?.countDocuments({ category, difficulty: 'easy' }) || 0;
      const mediumCount = await collection?.countDocuments({ category, difficulty: 'medium' }) || 0;
      const hardCount = await collection?.countDocuments({ category, difficulty: 'hard' }) || 0;
      
      console.log(`📚 ${category}: ${count} kart (Kolay: ${easyCount}, Orta: ${mediumCount}, Zor: ${hardCount})`);
    }
    
    const totalYksCards = await collection?.countDocuments({ 
      category: { $in: yksCategories } 
    }) || 0;
    
    console.log(`📊 Toplam YKS kartı: ${totalYksCards}`);
    
  } catch (error) {
    console.error('❌ YKS kartları kontrol edilirken hata oluştu:', error);
  }
};

// MongoDB bağlantı durumunu kontrol et
export const isMongoDBConnected = (): boolean => {
  return client !== null && db !== null && collection !== null;
};
