const { MongoClient } = require('mongodb');

// MongoDB bağlantı bilgileri
const MONGODB_URI = 'mongodb://127.0.0.1:27017';
const DATABASE_NAME = 'yksapp';
const COLLECTION_NAME = 'cards';

// YKS kartları verisi
const matematikYksKartlari = [
  {
    id: 'math_yks_1',
    category: 'Matematik',
    question: 'x² - 5x + 6 = 0 denkleminin kökleri toplamı kaçtır?',
    answer: '5',
    difficulty: 'easy',
    explanation: 'İkinci dereceden denklemde kökler toplamı -b/a formülü ile bulunur. Burada a=1, b=-5 olduğundan kökler toplamı -(-5)/1 = 5 olur.',
    tags: ['İkinci Dereceden Denklem', 'Kökler Toplamı', 'Vieta Formülleri'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'math_yks_2',
    category: 'Matematik',
    question: '2x² - 8x + 6 = 0 denkleminin diskriminantı kaçtır?',
    answer: '16',
    difficulty: 'easy',
    explanation: 'Diskriminant Δ = b² - 4ac formülü ile hesaplanır. Burada a=2, b=-8, c=6 olduğundan Δ = (-8)² - 4×2×6 = 64 - 48 = 16 olur.',
    tags: ['İkinci Dereceden Denklem', 'Diskriminant', 'Formül'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'math_yks_3',
    category: 'Matematik',
    question: 'log₂(8) + log₂(4) işleminin sonucu kaçtır?',
    answer: '5',
    difficulty: 'medium',
    explanation: 'log₂(8) = 3 ve log₂(4) = 2 olduğundan, log₂(8) + log₂(4) = 3 + 2 = 5 olur.',
    tags: ['Logaritma', 'Logaritma Kuralları', 'Hesaplama'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const fizikYksKartlari = [
  {
    id: 'physics_yks_1',
    category: 'Fizik',
    question: 'Bir cismin hızı 20 m/s ise, 5 saniyede kaç metre yol alır?',
    answer: '100',
    difficulty: 'easy',
    explanation: 'Yol = Hız × Zaman formülü ile hesaplanır. 20 × 5 = 100 metre olur.',
    tags: ['Hız', 'Yol', 'Zaman', 'Hareket'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'physics_yks_2',
    category: 'Fizik',
    question: 'Kütlesi 2 kg olan bir cisme 10 N\'luk kuvvet uygulanırsa ivmesi kaç m/s² olur?',
    answer: '5',
    difficulty: 'easy',
    explanation: 'F = ma formülünden a = F/m = 10/2 = 5 m/s² olur.',
    tags: ['Kuvvet', 'Kütle', 'İvme', 'Newton'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const kimyaYksKartlari = [
  {
    id: 'chemistry_yks_1',
    category: 'Kimya',
    question: 'H₂O molekülünde kaç tane hidrojen atomu vardır?',
    answer: '2',
    difficulty: 'easy',
    explanation: 'H₂O formülünde alt indis 2, hidrojen atomu sayısını gösterir. Oksijen atomu sayısı 1\'dir.',
    tags: ['Molekül', 'Formül', 'Atom Sayısı'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'chemistry_yks_2',
    category: 'Kimya',
    question: 'pH = 3 olan bir çözeltinin H⁺ iyonu derişimi kaç mol/L\'dir?',
    answer: '0.001',
    difficulty: 'medium',
    explanation: 'pH = -log[H⁺] formülünden [H⁺] = 10⁻ᵖᴴ = 10⁻³ = 0.001 mol/L olur.',
    tags: ['pH', 'Asitlik', 'İyon Derişimi'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const biyolojiYksKartlari = [
  {
    id: 'biology_yks_1',
    category: 'Biyoloji',
    question: 'Hücrenin enerji üretim merkezi hangi organeldir?',
    answer: 'Mitokondri',
    difficulty: 'easy',
    explanation: 'Mitokondri, hücrede oksijenli solunum yaparak ATP enerjisi üreten organeldir.',
    tags: ['Hücre', 'Mitokondri', 'Enerji', 'Organel'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'biology_yks_2',
    category: 'Biyoloji',
    question: 'DNA\'nın yapı taşı nedir?',
    answer: 'Nükleotid',
    difficulty: 'easy',
    explanation: 'DNA, nükleotid adı verilen yapı taşlarından oluşur. Her nükleotid şeker, fosfat ve azotlu baz içerir.',
    tags: ['DNA', 'Nükleotid', 'Genetik'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const turkceYksKartlari = [
  {
    id: 'turkish_yks_1',
    category: 'Türkçe',
    question: '"Güzel" kelimesi hangi kelime türüdür?',
    answer: 'Sıfat',
    difficulty: 'easy',
    explanation: '"Güzel" kelimesi, isimleri niteleyen bir sıfattır. Örnek: güzel ev, güzel çiçek.',
    tags: ['Kelime Türü', 'Sıfat', 'Dilbilgisi'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'turkish_yks_2',
    category: 'Türkçe',
    question: '"Geldi" kelimesinin kökü nedir?',
    answer: 'Gel',
    difficulty: 'easy',
    explanation: '"Geldi" kelimesinin kökü "gel"dir. "-di" eki geçmiş zaman ekidir.',
    tags: ['Kök', 'Ek', 'Kelime Yapısı'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const tarihYksKartlari = [
  {
    id: 'history_yks_1',
    category: 'Tarih',
    question: 'Osmanlı Devleti\'nin kurucusu kimdir?',
    answer: 'Osman Bey',
    difficulty: 'easy',
    explanation: 'Osmanlı Devleti, 1299 yılında Osman Bey tarafından Söğüt ve Domaniç yöresinde kurulmuştur.',
    tags: ['Osmanlı', 'Kuruluş', 'Osman Bey'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'history_yks_2',
    category: 'Tarih',
    question: 'İstanbul\'un fethi hangi yılda gerçekleşmiştir?',
    answer: '1453',
    difficulty: 'easy',
    explanation: 'İstanbul, Fatih Sultan Mehmet tarafından 29 Mayıs 1453 tarihinde fethedilmiştir.',
    tags: ['İstanbul Fethi', 'Fatih Sultan Mehmet', 'Osmanlı'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Tüm YKS kartlarını birleştir
const allYksCards = [
  ...matematikYksKartlari,
  ...fizikYksKartlari,
  ...kimyaYksKartlari,
  ...biyolojiYksKartlari,
  ...turkceYksKartlari,
  ...tarihYksKartlari
];

async function loadYksCardsToMongoDB() {
  let client;
  
  try {
    console.log('🔌 MongoDB\'ye bağlanılıyor...');
    
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    console.log('✅ MongoDB bağlantısı başarılı!');
    console.log(`📊 Database: ${DATABASE_NAME}`);
    console.log(`📁 Collection: ${COLLECTION_NAME}`);
    
    console.log('📚 YKS kartları MongoDB\'ye yükleniyor...');
    console.log(`📊 Toplam ${allYksCards.length} YKS kartı hazırlandı`);
    
    // Kategori bazında sayıları göster
    const categoryCounts = allYksCards.reduce((acc, card) => {
      acc[card.category] = (acc[card.category] || 0) + 1;
      return acc;
    }, {});

    console.log('📈 Kategori dağılımı:');
    Object.entries(categoryCounts).forEach(([category, count]) => {
      console.log(`   ${category}: ${count} kart`);
    });

    // Önce mevcut YKS kartlarını temizle (sadece YKS kategorilerindeki kartları)
    const yksCategories = ['Matematik', 'Fizik', 'Kimya', 'Biyoloji', 'Türkçe', 'Tarih'];
    const deleteResult = await collection.deleteMany({ 
      category: { $in: yksCategories } 
    });
    
    console.log(`🗑️ ${deleteResult.deletedCount} eski YKS kartı silindi`);
    
    // Yeni kartları MongoDB'ye ekle
    const result = await collection.insertMany(allYksCards);
    
    console.log(`✅ ${result.insertedCount} YKS kartı başarıyla MongoDB'ye yüklendi!`);
    
    // Yükleme sonrası istatistikleri göster
    console.log('\n🔍 YKS kartları MongoDB\'de kontrol ediliyor...');
    
    for (const category of yksCategories) {
      const count = await collection.countDocuments({ category });
      const easyCount = await collection.countDocuments({ category, difficulty: 'easy' });
      const mediumCount = await collection.countDocuments({ category, difficulty: 'medium' });
      const hardCount = await collection.countDocuments({ category, difficulty: 'hard' });
      
      console.log(`📚 ${category}: ${count} kart (Kolay: ${easyCount}, Orta: ${mediumCount}, Zor: ${hardCount})`);
    }
    
    const totalYksCards = await collection.countDocuments({ 
      category: { $in: yksCategories } 
    });
    
    console.log(`📊 Toplam YKS kartı: ${totalYksCards}`);
    
  } catch (error) {
    console.error('❌ Hata oluştu:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('✅ MongoDB bağlantısı kapatıldı');
    }
  }
}

// Scripti çalıştır
loadYksCardsToMongoDB();
