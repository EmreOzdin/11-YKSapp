// Node.js 18+ built-in fetch kullan

// API Base URL
const API_BASE_URL = 'http://localhost:3000/api';

// Kart verilerini manuel olarak tanımla (TypeScript dosyalarından)
const mathCards = [
  {
    id: 'math_001',
    category: 'math',
    question: 'Birinci dereceden bir bilinmeyenli denklemin genel formu nedir?',
    answer: 'ax + b = 0',
    difficulty: 'easy',
    explanation: 'a ve b sabit sayılardır, a ≠ 0 olmalıdır.',
    tags: ['denklem', 'cebir'],
  },
  {
    id: 'math_002',
    category: 'math',
    question: 'Doğal sayılar kümesi hangi sembolle gösterilir?',
    answer: 'ℕ',
    difficulty: 'easy',
    explanation: 'Doğal sayılar 0\'dan başlayan pozitif tam sayılardır.',
    tags: ['küme', 'temel'],
  },
  {
    id: 'math_003',
    category: 'math',
    question: 'Asal sayı nedir?',
    answer: '1 ve kendisi dışında böleni olmayan doğal sayı',
    difficulty: 'easy',
    explanation: '2, 3, 5, 7 asal sayılara örnektir.',
    tags: ['asal', 'aritmetik'],
  }
];

const physicsCards = [
  {
    id: 'physics_001',
    category: 'physics',
    question: 'Newton\'un birinci yasası nedir?',
    answer: 'Bir cisme etki eden net kuvvet sıfır ise, cisim duruyorsa durmaya, hareket ediyorsa sabit hızla hareket etmeye devam eder.',
    difficulty: 'easy',
    explanation: 'Eylemsizlik yasası olarak da bilinir. Cismin doğal hali değişmeye direnç göstermesidir.',
    tags: ['newton', 'eylemsizlik', 'kuvvet'],
  },
  {
    id: 'physics_002',
    category: 'physics',
    question: 'Momentum korunumu yasası nedir?',
    answer: 'Kapalı bir sistemde toplam momentum sabit kalır.',
    difficulty: 'medium',
    explanation: 'Çarpışmalarda ve patlamalarda momentum korunur. p = mv formülü ile hesaplanır.',
    tags: ['momentum', 'korunum', 'çarpışma'],
  }
];

const chemistryCards = [
  {
    id: 'chemistry_001',
    category: 'chemistry',
    question: 'Avogadro sayısı kaçtır?',
    answer: '6.022 × 10²³ mol⁻¹',
    difficulty: 'easy',
    explanation: '1 mol maddede bulunan atom, molekül veya iyon sayısıdır. Nₐ = 6.022 × 10²³ mol⁻¹',
    tags: ['avogadro', 'mol', 'sabit'],
  },
  {
    id: 'chemistry_002',
    category: 'chemistry',
    question: 'İdeal gaz denklemi nedir?',
    answer: 'PV = nRT',
    difficulty: 'easy',
    explanation: 'P: basınç, V: hacim, n: mol sayısı, R: gaz sabiti, T: sıcaklık. İdeal gazlar için geçerlidir.',
    tags: ['ideal', 'gaz', 'denklem'],
  }
];

const biologyCards = [
  {
    id: 'biology_001',
    category: 'biology',
    question: 'DNA\'nın yapı taşları nelerdir?',
    answer: 'Nükleotidler (Adenin, Timin, Guanin, Sitozin)',
    difficulty: 'easy',
    explanation: 'DNA nükleotidlerden oluşur. Her nükleotid: fosfat grubu + deoksiriboz şekeri + azotlu baz içerir.',
    tags: ['dna', 'nükleotid', 'baz'],
  },
  {
    id: 'biology_002',
    category: 'biology',
    question: 'RNA\'nın yapı taşları nelerdir?',
    answer: 'Nükleotidler (Adenin, Urasil, Guanin, Sitozin)',
    difficulty: 'easy',
    explanation: 'RNA nükleotidlerden oluşur. DNA\'dan farkı: riboz şekeri + Urasil bazı (Timin yerine) içerir.',
    tags: ['rna', 'nükleotid', 'urasil'],
  }
];

const turkishCards = [
  {
    id: 'turkish_001',
    category: 'turkish',
    question: 'Türkçede kaç ünlü harf vardır?',
    answer: '8 ünlü harf (a, e, ı, i, o, ö, u, ü)',
    difficulty: 'easy',
    explanation: 'Türkçede 8 ünlü harf bulunur: a, e, ı, i, o, ö, u, ü. Bunlar kalın-ince ve düz-yuvarlak olarak sınıflandırılır.',
    tags: ['ünlü', 'harf', 'alfabe'],
  },
  {
    id: 'turkish_002',
    category: 'turkish',
    question: 'Türkçede kaç ünsüz harf vardır?',
    answer: '21 ünsüz harf',
    difficulty: 'easy',
    explanation: 'Türkçede 21 ünsüz harf bulunur: b, c, ç, d, f, g, ğ, h, j, k, l, m, n, p, r, s, ş, t, v, y, z.',
    tags: ['ünsüz', 'harf', 'alfabe'],
  }
];

const historyCards = [
  {
    id: 'history_001',
    category: 'history',
    question: 'Osmanlı Devleti ne zaman kuruldu?',
    answer: '1299 yılında',
    difficulty: 'easy',
    explanation: 'Osmanlı Devleti 1299 yılında Osman Bey tarafından Söğüt ve Domaniç çevresinde kuruldu.',
    tags: ['osmanlı', 'kuruluş', '1299'],
  },
  {
    id: 'history_002',
    category: 'history',
    question: 'Osmanlı Devleti\'nin ilk başkenti neresidir?',
    answer: 'Söğüt',
    difficulty: 'easy',
    explanation: 'Osmanlı Devleti\'nin ilk başkenti Söğüt\'tür. Daha sonra Bursa, Edirne ve İstanbul başkent olmuştur.',
    tags: ['osmanlı', 'başkent', 'söğüt'],
  }
];

// Ders kartları mapping'i
const SUBJECT_CARDS = {
  'math': mathCards,
  'physics': physicsCards,
  'chemistry': chemistryCards,
  'biology': biologyCards,
  'turkish': turkishCards,
  'history': historyCards
};

// API'ye kart yükleme fonksiyonu
async function uploadCardsToAPI(cards, category) {
  try {
    console.log(`📚 ${category} kategorisi yükleniyor...`);
    console.log(`   📊 ${cards.length} kart bulundu`);
    
    const response = await fetch(`${API_BASE_URL}/cards/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cards })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.success) {
      console.log(`   ✅ ${result.totalInsertedCount} kart başarıyla yüklendi`);
      return result.totalInsertedCount;
    } else {
      throw new Error(result.error || 'Unknown error');
    }
  } catch (error) {
    console.error(`   ❌ ${category} kategorisi yüklenirken hata:`, error.message);
    return 0;
  }
}

// Tüm kartları API'ye yükle
async function uploadAllCardsToAPI() {
  try {
    console.log('🚀 API\'ye kart yükleme işlemi başlatılıyor...');
    
    // API sağlık kontrolü
    console.log('🔍 API sağlık kontrolü yapılıyor...');
    const healthResponse = await fetch(`${API_BASE_URL}/cards/health`);
    
    if (!healthResponse.ok) {
      throw new Error('API sunucusu çalışmıyor');
    }
    
    const healthData = await healthResponse.json();
    console.log('✅ API sunucusu sağlıklı');
    console.log(`📊 Mevcut kart sayısı: ${healthData.totalCardCount}`);
    
    let totalUploaded = 0;
    
    // Her ders için kartları yükle
    for (const [category, cards] of Object.entries(SUBJECT_CARDS)) {
      const uploadedCount = await uploadCardsToAPI(cards, category);
      totalUploaded += uploadedCount;
    }
    
    console.log(`\n🎉 Tüm kartlar başarıyla yüklendi!`);
    console.log(`📊 Toplam yüklenen kart sayısı: ${totalUploaded}`);
    
    // Son durum kontrolü
    console.log('\n🔍 Son durum kontrolü...');
    const finalHealthResponse = await fetch(`${API_BASE_URL}/cards/health`);
    const finalHealthData = await finalHealthResponse.json();
    console.log(`📊 Final kart sayısı: ${finalHealthData.totalCardCount}`);
    console.log('📊 Collection istatistikleri:', finalHealthData.collectionStats);
    
  } catch (error) {
    console.error('❌ Kart yükleme işlemi başarısız:', error.message);
    process.exit(1);
  }
}

// Script'i çalıştır
if (require.main === module) {
  uploadAllCardsToAPI();
}

module.exports = { uploadAllCardsToAPI };