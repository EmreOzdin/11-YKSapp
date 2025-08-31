import { MemoryCard } from './asyncStorageService';

// Matematik için ek kartlar (21-100)
export const matematikEkKartlar2: Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'math_21',
    category: 'Matematik',
    question: 'Bir sayının yüzdesi nasıl hesaplanır?',
    answer: 'Sayı × Yüzde / 100',
    difficulty: 'easy',
    explanation: 'Bir sayının yüzdesi, o sayının yüzde değeri ile çarpılıp 100\'e bölünmesiyle hesaplanır.',
    tags: ['Yüzde', 'Hesaplama', 'Sayılar']
  },
  {
    id: 'math_22',
    category: 'Matematik',
    question: 'Bir sayının yüzde kaçı olduğu nasıl hesaplanır?',
    answer: '(Kısım / Bütün) × 100',
    difficulty: 'easy',
    explanation: 'Bir sayının yüzde kaçı olduğu, kısmın bütüne bölünüp 100 ile çarpılmasıyla hesaplanır.',
    tags: ['Yüzde', 'Hesaplama', 'Sayılar']
  },
  {
    id: 'math_23',
    category: 'Matematik',
    question: 'Bir sayının yüzde artışı nasıl hesaplanır?',
    answer: 'Yeni değer = Eski değer × (1 + Yüzde/100)',
    difficulty: 'medium',
    explanation: 'Bir sayının yüzde artışı, eski değerin (1 + yüzde/100) ile çarpılmasıyla hesaplanır.',
    tags: ['Yüzde', 'Artış', 'Hesaplama']
  },
  {
    id: 'math_24',
    category: 'Matematik',
    question: 'Bir sayının yüzde azalışı nasıl hesaplanır?',
    answer: 'Yeni değer = Eski değer × (1 - Yüzde/100)',
    difficulty: 'medium',
    explanation: 'Bir sayının yüzde azalışı, eski değerin (1 - yüzde/100) ile çarpılmasıyla hesaplanır.',
    tags: ['Yüzde', 'Azalış', 'Hesaplama']
  },
  {
    id: 'math_25',
    category: 'Matematik',
    question: 'Bir sayının karekökü nasıl hesaplanır?',
    answer: 'Kendisiyle çarpıldığında o sayıyı veren pozitif sayı',
    difficulty: 'easy',
    explanation: '√a = b ise b² = a olmalıdır.',
    tags: ['Karekök', 'Sayılar', 'Hesaplama']
  },
  {
    id: 'math_26',
    category: 'Matematik',
    question: 'Bir sayının küp kökü nasıl hesaplanır?',
    answer: 'Kendisiyle üç kez çarpıldığında o sayıyı veren sayı',
    difficulty: 'medium',
    explanation: '∛a = b ise b³ = a olmalıdır.',
    tags: ['Küp Kök', 'Sayılar', 'Hesaplama']
  },
  {
    id: 'math_27',
    category: 'Matematik',
    question: 'Bir sayının n. kuvveti nasıl hesaplanır?',
    answer: 'Sayının kendisiyle n kez çarpımı',
    difficulty: 'easy',
    explanation: 'aⁿ = a × a × a × ... × a (n kez)',
    tags: ['Kuvvet', 'Sayılar', 'Hesaplama']
  },
  {
    id: 'math_28',
    category: 'Matematik',
    question: 'Bir sayının n. kökü nasıl hesaplanır?',
    answer: 'Kendisiyle n kez çarpıldığında o sayıyı veren sayı',
    difficulty: 'medium',
    explanation: 'ⁿ√a = b ise bⁿ = a olmalıdır.',
    tags: ['Kök', 'Sayılar', 'Hesaplama']
  },
  {
    id: 'math_29',
    category: 'Matematik',
    question: 'Bir sayının logaritması nasıl hesaplanır?',
    answer: 'O sayıyı elde etmek için tabanın kaçıncı kuvvetinin alınması gerektiği',
    difficulty: 'hard',
    explanation: 'logₐb = c ise aᶜ = b olmalıdır.',
    tags: ['Logaritma', 'Sayılar', 'Hesaplama']
  },
  {
    id: 'math_30',
    category: 'Matematik',
    question: 'Bir sayının doğal logaritması nedir?',
    answer: 'e tabanına göre logaritması',
    difficulty: 'hard',
    explanation: 'ln(x) = logₑ(x) şeklinde gösterilir.',
    tags: ['Doğal Logaritma', 'e Sayısı', 'Logaritma']
  }
];

// Fizik için ek kartlar (21-100)
export const fizikEkKartlar2: Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'physics_21',
    category: 'Fizik',
    question: 'Hız formülü nedir?',
    answer: 'v = s/t (Hız = Yol / Zaman)',
    difficulty: 'easy',
    explanation: 'Hız, birim zamanda alınan yol olarak tanımlanır.',
    tags: ['Hız', 'Formül', 'Hareket']
  },
  {
    id: 'physics_22',
    category: 'Fizik',
    question: 'İvme formülü nedir?',
    answer: 'a = Δv/Δt (İvme = Hız Değişimi / Zaman)',
    difficulty: 'medium',
    explanation: 'İvme, birim zamandaki hız değişimi olarak tanımlanır.',
    tags: ['İvme', 'Formül', 'Hareket']
  },
  {
    id: 'physics_23',
    category: 'Fizik',
    question: 'Kuvvet formülü nedir?',
    answer: 'F = m × a (Kuvvet = Kütle × İvme)',
    difficulty: 'medium',
    explanation: 'Newton\'un ikinci yasasına göre kuvvet, kütle ile ivmenin çarpımına eşittir.',
    tags: ['Kuvvet', 'Formül', 'Newton']
  },
  {
    id: 'physics_24',
    category: 'Fizik',
    question: 'İş formülü nedir?',
    answer: 'W = F × s (İş = Kuvvet × Yol)',
    difficulty: 'medium',
    explanation: 'İş, kuvvet ile yolun çarpımına eşittir.',
    tags: ['İş', 'Formül', 'Enerji']
  },
  {
    id: 'physics_25',
    category: 'Fizik',
    question: 'Güç formülü nedir?',
    answer: 'P = W/t (Güç = İş / Zaman)',
    difficulty: 'medium',
    explanation: 'Güç, birim zamanda yapılan iş olarak tanımlanır.',
    tags: ['Güç', 'Formül', 'Enerji']
  },
  {
    id: 'physics_26',
    category: 'Fizik',
    question: 'Kinetik enerji formülü nedir?',
    answer: 'Eₖ = ½mv² (Kinetik Enerji = ½ × Kütle × Hız²)',
    difficulty: 'medium',
    explanation: 'Kinetik enerji, hareket halindeki bir cismin sahip olduğu enerjidir.',
    tags: ['Kinetik Enerji', 'Formül', 'Enerji']
  },
  {
    id: 'physics_27',
    category: 'Fizik',
    question: 'Potansiyel enerji formülü nedir?',
    answer: 'Eₚ = mgh (Potansiyel Enerji = Kütle × Yerçekimi × Yükseklik)',
    difficulty: 'medium',
    explanation: 'Potansiyel enerji, bir cismin konumundan dolayı sahip olduğu enerjidir.',
    tags: ['Potansiyel Enerji', 'Formül', 'Enerji']
  },
  {
    id: 'physics_28',
    category: 'Fizik',
    question: 'Basınç formülü nedir?',
    answer: 'P = F/A (Basınç = Kuvvet / Alan)',
    difficulty: 'medium',
    explanation: 'Basınç, birim alana etki eden kuvvet olarak tanımlanır.',
    tags: ['Basınç', 'Formül', 'Kuvvet']
  },
  {
    id: 'physics_29',
    category: 'Fizik',
    question: 'Yoğunluk formülü nedir?',
    answer: 'ρ = m/V (Yoğunluk = Kütle / Hacim)',
    difficulty: 'easy',
    explanation: 'Yoğunluk, birim hacimdeki kütle olarak tanımlanır.',
    tags: ['Yoğunluk', 'Formül', 'Madde']
  },
  {
    id: 'physics_30',
    category: 'Fizik',
    question: 'Hacim formülü nedir?',
    answer: 'V = m/ρ (Hacim = Kütle / Yoğunluk)',
    difficulty: 'easy',
    explanation: 'Hacim, kütlenin yoğunluğa bölümüne eşittir.',
    tags: ['Hacim', 'Formül', 'Madde']
  }
];

// Kimya için ek kartlar (21-100)
export const kimyaEkKartlar2: Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'chemistry_21',
    category: 'Kimya',
    question: 'Atom numarası nedir?',
    answer: 'Çekirdekteki proton sayısı',
    difficulty: 'easy',
    explanation: 'Atom numarası, bir elementin çekirdeğindeki proton sayısını gösterir.',
    tags: ['Atom Numarası', 'Proton', 'Element']
  },
  {
    id: 'chemistry_22',
    category: 'Kimya',
    question: 'Kütle numarası nedir?',
    answer: 'Proton sayısı + Nötron sayısı',
    difficulty: 'easy',
    explanation: 'Kütle numarası, çekirdekteki proton ve nötron sayılarının toplamıdır.',
    tags: ['Kütle Numarası', 'Proton', 'Nötron']
  },
  {
    id: 'chemistry_23',
    category: 'Kimya',
    question: 'İzotop nedir?',
    answer: 'Aynı atom numarasına sahip farklı kütle numaralı atomlar',
    difficulty: 'medium',
    explanation: 'İzotoplar, aynı elementin farklı nötron sayısına sahip atomlarıdır.',
    tags: ['İzotop', 'Atom', 'Element']
  },
  {
    id: 'chemistry_24',
    category: 'Kimya',
    question: 'İyon nedir?',
    answer: 'Elektron alıp vererek yük kazanmış atom',
    difficulty: 'easy',
    explanation: 'İyonlar, elektron alıp vererek pozitif veya negatif yük kazanmış atomlardır.',
    tags: ['İyon', 'Atom', 'Yük']
  },
  {
    id: 'chemistry_25',
    category: 'Kimya',
    question: 'Katyon nedir?',
    answer: 'Pozitif yüklü iyon',
    difficulty: 'easy',
    explanation: 'Katyonlar, elektron vererek pozitif yük kazanmış atomlardır.',
    tags: ['Katyon', 'İyon', 'Pozitif Yük']
  },
  {
    id: 'chemistry_26',
    category: 'Kimya',
    question: 'Anyon nedir?',
    answer: 'Negatif yüklü iyon',
    difficulty: 'easy',
    explanation: 'Anyonlar, elektron alarak negatif yük kazanmış atomlardır.',
    tags: ['Anyon', 'İyon', 'Negatif Yük']
  },
  {
    id: 'chemistry_27',
    category: 'Kimya',
    question: 'Molekül nedir?',
    answer: 'İki veya daha fazla atomun bir araya gelmesiyle oluşan yapı',
    difficulty: 'easy',
    explanation: 'Moleküller, atomların kimyasal bağlarla bir araya gelmesiyle oluşur.',
    tags: ['Molekül', 'Atom', 'Kimyasal Bağ']
  },
  {
    id: 'chemistry_28',
    category: 'Kimya',
    question: 'Kimyasal bağ nedir?',
    answer: 'Atomları bir arada tutan kuvvet',
    difficulty: 'easy',
    explanation: 'Kimyasal bağlar, atomları bir arada tutan elektriksel kuvvetlerdir.',
    tags: ['Kimyasal Bağ', 'Atom', 'Kuvvet']
  },
  {
    id: 'chemistry_29',
    category: 'Kimya',
    question: 'İyonik bağ nedir?',
    answer: 'Pozitif ve negatif iyonlar arasındaki elektrostatik çekim',
    difficulty: 'medium',
    explanation: 'İyonik bağ, zıt yüklü iyonlar arasındaki elektrostatik çekim kuvvetidir.',
    tags: ['İyonik Bağ', 'İyon', 'Elektrostatik']
  },
  {
    id: 'chemistry_30',
    category: 'Kimya',
    question: 'Kovalent bağ nedir?',
    answer: 'Atomlar arasında elektron paylaşımı',
    difficulty: 'medium',
    explanation: 'Kovalent bağ, atomlar arasında elektron çiftinin paylaşılmasıyla oluşur.',
    tags: ['Kovalent Bağ', 'Atom', 'Elektron Paylaşımı']
  }
];

// Biyoloji için ek kartlar (21-100)
export const biyolojiEkKartlar2: Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'biology_21',
    category: 'Biyoloji',
    question: 'Hücre nedir?',
    answer: 'Canlıların en küçük yapı ve işlev birimi',
    difficulty: 'easy',
    explanation: 'Hücre, canlıların temel yapı ve işlev birimidir.',
    tags: ['Hücre', 'Canlı', 'Birim']
  },
  {
    id: 'biology_22',
    category: 'Biyoloji',
    question: 'Hücre zarı nedir?',
    answer: 'Hücreyi çevreleyen seçici geçirgen zar',
    difficulty: 'easy',
    explanation: 'Hücre zarı, hücreyi çevreleyen ve madde alışverişini kontrol eden yapıdır.',
    tags: ['Hücre Zarı', 'Zar', 'Madde Alışverişi']
  },
  {
    id: 'biology_23',
    category: 'Biyoloji',
    question: 'Sitoplazma nedir?',
    answer: 'Hücre zarı ile çekirdek arasındaki sıvı kısım',
    difficulty: 'easy',
    explanation: 'Sitoplazma, hücre organellerinin bulunduğu sıvı ortamdır.',
    tags: ['Sitoplazma', 'Hücre', 'Organel']
  },
  {
    id: 'biology_24',
    category: 'Biyoloji',
    question: 'Çekirdek nedir?',
    answer: 'Hücrenin yönetim merkezi',
    difficulty: 'easy',
    explanation: 'Çekirdek, hücrenin genetik materyalini içeren ve hücreyi yöneten organeldir.',
    tags: ['Çekirdek', 'Hücre', 'Genetik']
  },
  {
    id: 'biology_25',
    category: 'Biyoloji',
    question: 'Mitokondri nedir?',
    answer: 'Hücrenin enerji üretim merkezi',
    difficulty: 'easy',
    explanation: 'Mitokondri, hücrede enerji üretiminden sorumlu organeldir.',
    tags: ['Mitokondri', 'Enerji', 'Organel']
  },
  {
    id: 'biology_26',
    category: 'Biyoloji',
    question: 'Kloroplast nedir?',
    answer: 'Bitki hücrelerinde fotosentez yapan organel',
    difficulty: 'medium',
    explanation: 'Kloroplast, bitki hücrelerinde fotosentez yaparak besin üreten organeldir.',
    tags: ['Kloroplast', 'Fotosentez', 'Bitki']
  },
  {
    id: 'biology_27',
    category: 'Biyoloji',
    question: 'Ribozom nedir?',
    answer: 'Protein sentezi yapan organel',
    difficulty: 'medium',
    explanation: 'Ribozom, hücrede protein sentezi yapan organeldir.',
    tags: ['Ribozom', 'Protein', 'Sentez']
  },
  {
    id: 'biology_28',
    category: 'Biyoloji',
    question: 'Endoplazmik retikulum nedir?',
    answer: 'Hücrede madde taşınması ve depolanması yapan organel',
    difficulty: 'medium',
    explanation: 'Endoplazmik retikulum, hücrede madde taşınması ve depolanmasından sorumlu organeldir.',
    tags: ['Endoplazmik Retikulum', 'Madde Taşınması', 'Organel']
  },
  {
    id: 'biology_29',
    category: 'Biyoloji',
    question: 'Golgi aygıtı nedir?',
    answer: 'Hücrede madde paketleme ve salgılama yapan organel',
    difficulty: 'medium',
    explanation: 'Golgi aygıtı, hücrede madde paketleme ve salgılama işlemlerini yapan organeldir.',
    tags: ['Golgi Aygıtı', 'Paketleme', 'Salgılama']
  },
  {
    id: 'biology_30',
    category: 'Biyoloji',
    question: 'Lizozom nedir?',
    answer: 'Hücrede sindirim yapan organel',
    difficulty: 'medium',
    explanation: 'Lizozom, hücrede sindirim işlemlerini yapan organeldir.',
    tags: ['Lizozom', 'Sindirim', 'Organel']
  }
];

// Türkçe için ek kartlar (21-100)
export const turkceEkKartlar2: Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'turkish_21',
    category: 'Türkçe',
    question: 'İsim nedir?',
    answer: 'Varlıkları, kavramları karşılayan kelime türü',
    difficulty: 'easy',
    explanation: 'İsimler, varlıkları, kavramları, duyguları karşılayan kelime türüdür.',
    tags: ['İsim', 'Kelime Türü', 'Dilbilgisi']
  },
  {
    id: 'turkish_22',
    category: 'Türkçe',
    question: 'Sıfat nedir?',
    answer: 'İsimleri niteleyen veya belirten kelime türü',
    difficulty: 'easy',
    explanation: 'Sıfatlar, isimleri niteleyen veya belirten kelime türüdür.',
    tags: ['Sıfat', 'Kelime Türü', 'Dilbilgisi']
  },
  {
    id: 'turkish_23',
    category: 'Türkçe',
    question: 'Zamir nedir?',
    answer: 'İsimlerin yerini tutan kelime türü',
    difficulty: 'easy',
    explanation: 'Zamirler, isimlerin yerini tutan kelime türüdür.',
    tags: ['Zamir', 'Kelime Türü', 'Dilbilgisi']
  },
  {
    id: 'turkish_24',
    category: 'Türkçe',
    question: 'Zarf nedir?',
    answer: 'Fiilleri, sıfatları veya zarfları niteleyen kelime türü',
    difficulty: 'medium',
    explanation: 'Zarflar, fiilleri, sıfatları veya zarfları niteleyen kelime türüdür.',
    tags: ['Zarf', 'Kelime Türü', 'Dilbilgisi']
  },
  {
    id: 'turkish_25',
    category: 'Türkçe',
    question: 'Fiil nedir?',
    answer: 'İş, oluş, hareket bildiren kelime türü',
    difficulty: 'easy',
    explanation: 'Fiiller, iş, oluş, hareket bildiren kelime türüdür.',
    tags: ['Fiil', 'Kelime Türü', 'Dilbilgisi']
  },
  {
    id: 'turkish_26',
    category: 'Türkçe',
    question: 'Edat nedir?',
    answer: 'Kendi başına anlamı olmayan, isimlerle birlikte kullanılan kelime türü',
    difficulty: 'medium',
    explanation: 'Edatlar, kendi başına anlamı olmayan, isimlerle birlikte kullanılan kelime türüdür.',
    tags: ['Edat', 'Kelime Türü', 'Dilbilgisi']
  },
  {
    id: 'turkish_27',
    category: 'Türkçe',
    question: 'Bağlaç nedir?',
    answer: 'Cümleleri veya kelime gruplarını birbirine bağlayan kelime türü',
    difficulty: 'medium',
    explanation: 'Bağlaçlar, cümleleri veya kelime gruplarını birbirine bağlayan kelime türüdür.',
    tags: ['Bağlaç', 'Kelime Türü', 'Dilbilgisi']
  },
  {
    id: 'turkish_28',
    category: 'Türkçe',
    question: 'Ünlem nedir?',
    answer: 'Sevinç, korku, şaşkınlık gibi duyguları ifade eden kelime türü',
    difficulty: 'easy',
    explanation: 'Ünlemler, sevinç, korku, şaşkınlık gibi duyguları ifade eden kelime türüdür.',
    tags: ['Ünlem', 'Kelime Türü', 'Dilbilgisi']
  },
  {
    id: 'turkish_29',
    category: 'Türkçe',
    question: 'Cümle nedir?',
    answer: 'Bir düşünceyi, duyguyu, isteği tam olarak anlatan kelime grubu',
    difficulty: 'easy',
    explanation: 'Cümle, bir düşünceyi, duyguyu, isteği tam olarak anlatan kelime grubudur.',
    tags: ['Cümle', 'Kelime Grubu', 'Dilbilgisi']
  },
  {
    id: 'turkish_30',
    category: 'Türkçe',
    question: 'Özne nedir?',
    answer: 'Cümlede işi yapan veya oluşu gerçekleştiren öğe',
    difficulty: 'easy',
    explanation: 'Özne, cümlede işi yapan veya oluşu gerçekleştiren öğedir.',
    tags: ['Özne', 'Cümle Öğesi', 'Dilbilgisi']
  }
];

// Tarih için ek kartlar (21-100)
export const tarihEkKartlar2: Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] = [
  {
    id: 'history_21',
    category: 'Tarih',
    question: 'Türklerin ilk anayurdu neresidir?',
    answer: 'Orta Asya',
    difficulty: 'easy',
    explanation: 'Türklerin ilk anayurdu Orta Asya\'dır.',
    tags: ['Türkler', 'Orta Asya', 'Anayurt']
  },
  {
    id: 'history_22',
    category: 'Tarih',
    question: 'İlk Türk devleti hangisidir?',
    answer: 'Hun İmparatorluğu',
    difficulty: 'easy',
    explanation: 'İlk Türk devleti Hun İmparatorluğu\'dur.',
    tags: ['İlk Türk Devleti', 'Hun İmparatorluğu', 'Türk Tarihi']
  },
  {
    id: 'history_23',
    category: 'Tarih',
    question: 'Göktürk Devleti hangi yıllar arasında hüküm sürmüştür?',
    answer: '552-745',
    difficulty: 'medium',
    explanation: 'Göktürk Devleti 552-745 yılları arasında hüküm sürmüştür.',
    tags: ['Göktürk Devleti', 'Türk Tarihi', '552-745']
  },
  {
    id: 'history_24',
    category: 'Tarih',
    question: 'Uygur Devleti hangi yıllar arasında hüküm sürmüştür?',
    answer: '745-840',
    difficulty: 'medium',
    explanation: 'Uygur Devleti 745-840 yılları arasında hüküm sürmüştür.',
    tags: ['Uygur Devleti', 'Türk Tarihi', '745-840']
  },
  {
    id: 'history_25',
    category: 'Tarih',
    question: 'Selçuklu Devleti hangi yıllar arasında hüküm sürmüştür?',
    answer: '1037-1194',
    difficulty: 'medium',
    explanation: 'Büyük Selçuklu Devleti 1037-1194 yılları arasında hüküm sürmüştür.',
    tags: ['Selçuklu Devleti', 'Türk Tarihi', '1037-1194']
  },
  {
    id: 'history_26',
    category: 'Tarih',
    question: 'Osmanlı Devleti hangi yıllar arasında hüküm sürmüştür?',
    answer: '1299-1922',
    difficulty: 'easy',
    explanation: 'Osmanlı Devleti 1299-1922 yılları arasında hüküm sürmüştür.',
    tags: ['Osmanlı Devleti', 'Türk Tarihi', '1299-1922']
  },
  {
    id: 'history_27',
    category: 'Tarih',
    question: 'Osmanlı Devleti\'nin ilk padişahı kimdir?',
    answer: 'Osman Bey',
    difficulty: 'easy',
    explanation: 'Osmanlı Devleti\'nin ilk padişahı Osman Bey\'dir.',
    tags: ['Osman Bey', 'Osmanlı', 'İlk Padişah']
  },
  {
    id: 'history_28',
    category: 'Tarih',
    question: 'Osmanlı Devleti\'nin son padişahı kimdir?',
    answer: 'Vahdettin',
    difficulty: 'easy',
    explanation: 'Osmanlı Devleti\'nin son padişahı Vahdettin\'dir.',
    tags: ['Vahdettin', 'Osmanlı', 'Son Padişah']
  },
  {
    id: 'history_29',
    category: 'Tarih',
    question: 'Fatih Sultan Mehmet kaç yıl padişahlık yapmıştır?',
    answer: '30 yıl',
    difficulty: 'medium',
    explanation: 'Fatih Sultan Mehmet 30 yıl padişahlık yapmıştır.',
    tags: ['Fatih Sultan Mehmet', 'Osmanlı', 'Padişah']
  },
  {
    id: 'history_30',
    category: 'Tarih',
    question: 'Kanuni Sultan Süleyman kaç yıl padişahlık yapmıştır?',
    answer: '46 yıl',
    difficulty: 'medium',
    explanation: 'Kanuni Sultan Süleyman 46 yıl padişahlık yapmıştır.',
    tags: ['Kanuni Sultan Süleyman', 'Osmanlı', 'Padişah']
  }
];
