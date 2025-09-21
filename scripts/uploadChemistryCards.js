// Node.js 18+ built-in fetch kullan

// API Base URL
const API_BASE_URL = 'http://localhost:3000/api';

// Chemistry kartlarını manuel olarak tanımla (chemistrycards.ts'den)
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
  },
  {
    id: 'chemistry_003',
    category: 'chemistry',
    question: 'Gaz sabiti (R) değeri nedir?',
    answer: 'R = 0.082 L·atm/(mol·K) = 8.314 J/(mol·K)',
    difficulty: 'easy',
    explanation: 'Evrensel gaz sabiti. Birimlere göre farklı değerler alır.',
    tags: ['gaz', 'sabit', 'r'],
  },
  {
    id: 'chemistry_004',
    category: 'chemistry',
    question: 'pH formülü nedir?',
    answer: 'pH = -log[H⁺]',
    difficulty: 'easy',
    explanation: 'pH: hidrojen iyon konsantrasyonunun negatif logaritması. Asitlik ölçüsüdür.',
    tags: ['ph', 'asitlik', 'logaritma'],
  },
  {
    id: 'chemistry_005',
    category: 'chemistry',
    question: 'pOH formülü nedir?',
    answer: 'pOH = -log[OH⁻]',
    difficulty: 'easy',
    explanation: 'pOH: hidroksit iyon konsantrasyonunun negatif logaritması. Bazlık ölçüsüdür.',
    tags: ['poh', 'bazlık', 'logaritma'],
  },
  {
    id: 'chemistry_006',
    category: 'chemistry',
    question: 'pH + pOH = ?',
    answer: 'pH + pOH = 14',
    difficulty: 'easy',
    explanation: '25°C\'de su için geçerli olan temel bağıntı. Kw = [H⁺][OH⁻] = 10⁻¹⁴',
    tags: ['ph', 'poh', 'su'],
  },
  {
    id: 'chemistry_007',
    category: 'chemistry',
    question: 'Asit iyonlaşma sabiti (Ka) nedir?',
    answer: 'Ka = [H⁺][A⁻]/[HA]',
    difficulty: 'medium',
    explanation: 'Ka: asit iyonlaşma sabiti, HA: asit, A⁻: konjuge baz. Asit gücünü gösterir.',
    tags: ['ka', 'asit', 'iyonlaşma'],
  },
  {
    id: 'chemistry_008',
    category: 'chemistry',
    question: 'Baz iyonlaşma sabiti (Kb) nedir?',
    answer: 'Kb = [OH⁻][BH⁺]/[B]',
    difficulty: 'medium',
    explanation: 'Kb: baz iyonlaşma sabiti, B: baz, BH⁺: konjuge asit. Baz gücünü gösterir.',
    tags: ['kb', 'baz', 'iyonlaşma'],
  },
  {
    id: 'chemistry_009',
    category: 'chemistry',
    question: 'Ka × Kb = ?',
    answer: 'Ka × Kb = Kw = 10⁻¹⁴',
    difficulty: 'medium',
    explanation: 'Konjuge asit-baz çifti için geçerli bağıntı. 25°C\'de Kw = 10⁻¹⁴',
    tags: ['ka', 'kb', 'kw'],
  },
  {
    id: 'chemistry_010',
    category: 'chemistry',
    question: 'Henderson-Hasselbalch denklemi nedir?',
    answer: 'pH = pKa + log([A⁻]/[HA])',
    difficulty: 'medium',
    explanation: 'Tampon çözeltilerin pH\'ını hesaplamak için kullanılır. HA: asit, A⁻: konjuge baz.',
    tags: ['henderson', 'hasselbalch', 'tampon'],
  },
  {
    id: 'chemistry_011',
    category: 'chemistry',
    question: 'Çözünürlük çarpımı (Ksp) nedir?',
    answer: 'Ksp = [Mⁿ⁺]ᵃ[Aᵐ⁻]ᵇ',
    difficulty: 'medium',
    explanation: 'Ksp: çözünürlük çarpımı, Mⁿ⁺: katyon, Aᵐ⁻: anyon. Doymuş çözelti için geçerlidir.',
    tags: ['ksp', 'çözünürlük', 'çarpım'],
  },
  {
    id: 'chemistry_012',
    category: 'chemistry',
    question: 'Nernst denklemi nedir?',
    answer: 'E = E° - (RT/nF)lnQ',
    difficulty: 'hard',
    explanation: 'E: elektrot potansiyeli, E°: standart potansiyel, R: gaz sabiti, T: sıcaklık, n: elektron sayısı, F: Faraday sabiti, Q: reaksiyon katsayısı.',
    tags: ['nernst', 'elektrokimya', 'potansiyel'],
  },
  {
    id: 'chemistry_013',
    category: 'chemistry',
    question: 'Faraday sabiti kaçtır?',
    answer: 'F = 96485 C/mol',
    difficulty: 'easy',
    explanation: '1 mol elektronun yükü. Elektrokimyasal hesaplamalarda kullanılır.',
    tags: ['faraday', 'sabit', 'elektron'],
  },
  {
    id: 'chemistry_014',
    category: 'chemistry',
    question: 'Arrhenius denklemi nedir?',
    answer: 'k = A·e^(-Ea/RT)',
    difficulty: 'hard',
    explanation: 'k: hız sabiti, A: ön-üstel faktör, Ea: aktivasyon enerjisi, R: gaz sabiti, T: sıcaklık.',
    tags: ['arrhenius', 'kinetik', 'aktivasyon'],
  },
  {
    id: 'chemistry_015',
    category: 'chemistry',
    question: 'Van\'t Hoff denklemi nedir?',
    answer: 'ln(K2/K1) = -(ΔH°/R)(1/T2 - 1/T1)',
    difficulty: 'hard',
    explanation: 'Sıcaklık değişiminin denge sabitine etkisini gösterir. ΔH°: standart entalpi değişimi.',
    tags: ['vant', 'hoff', 'denge'],
  }
];

// API'ye chemistry kartlarını yükleme fonksiyonu
async function uploadChemistryCardsToAPI() {
  try {
    console.log('🚀 Chemistry kartları API\'ye yükleniyor...');
    console.log(`📊 ${chemistryCards.length} chemistry kartı bulundu`);
    
    // API sağlık kontrolü
    console.log('🔍 API sağlık kontrolü yapılıyor...');
    const healthResponse = await fetch(`${API_BASE_URL}/cards/health`);
    
    if (!healthResponse.ok) {
      throw new Error('API sunucusu çalışmıyor');
    }
    
    const healthData = await healthResponse.json();
    console.log('✅ API sunucusu sağlıklı');
    console.log(`📊 Mevcut chemistry kart sayısı: ${healthData.collectionStats.CHEMISTRY}`);
    
    // Chemistry kartlarını yükle
    console.log('📚 Chemistry kartları yükleniyor...');
    const response = await fetch(`${API_BASE_URL}/cards/bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cards: chemistryCards })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.success) {
      console.log(`✅ ${result.totalInsertedCount} chemistry kartı başarıyla yüklendi`);
      console.log('📊 Yükleme sonuçları:', result.results);
    } else {
      throw new Error(result.error || 'Unknown error');
    }
    
    // Son durum kontrolü
    console.log('\n🔍 Son durum kontrolü...');
    const finalHealthResponse = await fetch(`${API_BASE_URL}/cards/health`);
    const finalHealthData = await finalHealthResponse.json();
    console.log(`📊 Final chemistry kart sayısı: ${finalHealthData.collectionStats.CHEMISTRY}`);
    
    // Chemistry kartlarını test et
    console.log('\n🧪 Chemistry kartları test ediliyor...');
    const testResponse = await fetch(`${API_BASE_URL}/cards/category/chemistry`);
    const testData = await testResponse.json();
    console.log(`📊 API'den ${testData.count} chemistry kartı getirildi`);
    
  } catch (error) {
    console.error('❌ Chemistry kartları yüklenirken hata:', error.message);
    process.exit(1);
  }
}

// Script'i çalıştır
if (require.main === module) {
  uploadChemistryCardsToAPI();
}

module.exports = { uploadChemistryCardsToAPI };
