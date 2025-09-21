const fetch = require('node-fetch');

// Tüm biyoloji kartları - biologycards.ts'den alındı
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
  },
  {
    id: 'biology_003',
    category: 'biology',
    question: 'Protein sentezinde kodon nedir?',
    answer: '3 nükleotidden oluşan genetik kod',
    difficulty: 'easy',
    explanation: 'Kodon: mRNA\'da 3 nükleotidden oluşan birim. Her kodon bir amino asidi kodlar.',
    tags: ['kodon', 'protein', 'sentez'],
  },
  {
    id: 'biology_004',
    category: 'biology',
    question: 'Başlangıç kodonu nedir?',
    answer: 'AUG (Metiyonin)',
    difficulty: 'easy',
    explanation: 'AUG kodonu hem Metiyonin amino asidini kodlar hem de protein sentezinin başlangıcını işaretler.',
    tags: ['başlangıç', 'kodon', 'metiyonin'],
  },
  {
    id: 'biology_005',
    category: 'biology',
    question: 'Sonlandırma kodonları nelerdir?',
    answer: 'UAA, UAG, UGA',
    difficulty: 'easy',
    explanation: 'Bu üç kodon amino asit kodlamaz, protein sentezinin sonlanmasını sağlar.',
    tags: ['sonlandırma', 'kodon', 'stop'],
  },
  {
    id: 'biology_006',
    category: 'biology',
    question: 'Mitokondri kaç zar içerir?',
    answer: '2 zar (dış ve iç zar)',
    difficulty: 'easy',
    explanation: 'Mitokondri çift zarlı organeldir. İç zar kıvrımlıdır (krista), ATP sentezi burada gerçekleşir.',
    tags: ['mitokondri', 'zar', 'atp'],
  },
  {
    id: 'biology_007',
    category: 'biology',
    question: 'Kloroplast kaç zar içerir?',
    answer: '2 zar (dış ve iç zar)',
    difficulty: 'easy',
    explanation: 'Kloroplast çift zarlı organeldir. İçinde tilakoid ve stroma bulunur, fotosentez burada gerçekleşir.',
    tags: ['kloroplast', 'zar', 'fotosentez'],
  },
  {
    id: 'biology_008',
    category: 'biology',
    question: 'Hücre zarının yapısı nedir?',
    answer: 'Fosfolipid çift katmanı + proteinler',
    difficulty: 'easy',
    explanation: 'Hücre zarı fosfolipid çift katmanından oluşur. Proteinler bu katman içinde gömülü veya yüzeyde bulunur.',
    tags: ['hücre', 'zar', 'fosfolipid'],
  },
  {
    id: 'biology_009',
    category: 'biology',
    question: 'Osmoz nedir?',
    answer: 'Su moleküllerinin yarı geçirgen zardan geçişi',
    difficulty: 'easy',
    explanation: 'Osmoz: Su moleküllerinin çok yoğun ortamdan az yoğun ortama doğru yarı geçirgen zardan geçişi.',
    tags: ['osmoz', 'su', 'zar'],
  },
  {
    id: 'biology_010',
    category: 'biology',
    question: 'Difüzyon nedir?',
    answer: 'Maddelerin yoğunluk farkından dolayı hareketi',
    difficulty: 'easy',
    explanation: 'Difüzyon: Maddelerin yüksek konsantrasyondan düşük konsantrasyona doğru hareketi.',
    tags: ['difüzyon', 'konsantrasyon', 'hareket'],
  },
  {
    id: 'biology_011',
    category: 'biology',
    question: 'Aktif taşıma nedir?',
    answer: 'Enerji harcayarak madde taşınması',
    difficulty: 'medium',
    explanation: 'Aktif taşıma: ATP enerjisi harcanarak maddelerin düşük konsantrasyondan yüksek konsantrasyona taşınması.',
    tags: ['aktif', 'taşıma', 'atp'],
  },
  {
    id: 'biology_012',
    category: 'biology',
    question: 'Enzim nedir?',
    answer: 'Biyolojik katalizör protein',
    difficulty: 'easy',
    explanation: 'Enzim: Canlı hücrelerde üretilen, kimyasal reaksiyonları hızlandıran protein yapılı katalizörler.',
    tags: ['enzim', 'katalizör', 'protein'],
  },
  {
    id: 'biology_013',
    category: 'biology',
    question: 'Enzim-substrat kompleksi nedir?',
    answer: 'Enzim ile substratın geçici birleşimi',
    difficulty: 'medium',
    explanation: 'Enzim-substrat kompleksi: Enzimin aktif bölgesi ile substratın geçici olarak birleşmesi.',
    tags: ['enzim', 'substrat', 'kompleks'],
  },
  {
    id: 'biology_014',
    category: 'biology',
    question: 'ATP\'nin yapısı nedir?',
    answer: 'Adenin + Riboz + 3 Fosfat grubu',
    difficulty: 'easy',
    explanation: 'ATP: Adenin nükleotidi + riboz şekeri + 3 fosfat grubu. Enerji depolama molekülüdür.',
    tags: ['atp', 'adenin', 'fosfat'],
  },
  {
    id: 'biology_015',
    category: 'biology',
    question: 'Fotosentez denklemi nedir?',
    answer: '6CO₂ + 6H₂O + ışık → C₆H₁₂O₆ + 6O₂',
    difficulty: 'easy',
    explanation: 'Fotosentez: Karbondioksit + su + ışık enerjisi → glikoz + oksijen. Kloroplastta gerçekleşir.',
    tags: ['fotosentez', 'glikoz', 'oksijen'],
  },
  {
    id: 'biology_016',
    category: 'biology',
    question: 'Hücresel solunum denklemi nedir?',
    answer: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP',
    difficulty: 'easy',
    explanation: 'Hücresel solunum: Glikoz + oksijen → karbondioksit + su + ATP. Mitokondride gerçekleşir.',
    tags: ['solunum', 'glikoz', 'atp'],
  },
  {
    id: 'biology_017',
    category: 'biology',
    question: 'Mitoz bölünme kaç aşamada gerçekleşir?',
    answer: '4 aşama (Profaz, Metafaz, Anafaz, Telofaz)',
    difficulty: 'easy',
    explanation: 'Mitoz: Profaz (kromozom yoğunlaşır) → Metafaz (ekvatoral düzlem) → Anafaz (ayrılma) → Telofaz (sitokinez).',
    tags: ['mitoz', 'bölünme', 'aşama'],
  },
  {
    id: 'biology_018',
    category: 'biology',
    question: 'Mayoz bölünme kaç aşamada gerçekleşir?',
    answer: '8 aşama (2 bölünme: Mayoz I ve Mayoz II)',
    difficulty: 'medium',
    explanation: 'Mayoz: Mayoz I (homolog kromozomlar ayrılır) + Mayoz II (kardeş kromatitler ayrılır).',
    tags: ['mayoz', 'bölünme', 'kromozom'],
  },
  {
    id: 'biology_019',
    category: 'biology',
    question: 'Gen nedir?',
    answer: 'Kalıtsal özellikleri taşıyan DNA parçası',
    difficulty: 'easy',
    explanation: 'Gen: Belirli bir özelliği kodlayan DNA parçası. Protein sentezini yönetir.',
    tags: ['gen', 'dna', 'kalıtım'],
  },
  {
    id: 'biology_020',
    category: 'biology',
    question: 'Alel nedir?',
    answer: 'Bir genin farklı formları',
    difficulty: 'easy',
    explanation: 'Alel: Aynı genin farklı versiyonları. Örnek: göz rengi geninin mavi, yeşil, kahverengi alelleri.',
    tags: ['alel', 'gen', 'form'],
  }
];

async function uploadBiologyCards() {
  try {
    console.log('🔄 Biyoloji kartları MongoDB\'ye yükleniyor...');
    console.log(`📊 Toplam ${biologyCards.length} kart yüklenecek...`);
    
    const response = await fetch('http://localhost:3000/cards/bulk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cards: biologyCards }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      console.log(`✅ ${result.data.length} biyoloji kartı başarıyla MongoDB'ye yüklendi!`);
      console.log('📊 Yüklenen kartlar:', result.data.map(card => card.id).join(', '));
    } else {
      console.error('❌ Kartlar yüklenirken hata oluştu:', result.error);
    }
  } catch (error) {
    console.error('❌ API bağlantı hatası:', error.message);
    console.log('💡 API sunucusunun çalıştığından emin olun: npm start (yksapp-api klasöründe)');
  }
}

// Script'i çalıştır
uploadBiologyCards();
