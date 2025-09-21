import { MemoryCard } from '../services/asyncStorageService';

/**
 * YKS Kart Bilgileri
 * 
 * Bu dosyaya kartlarda gösterilecek bilgileri ekleyebilirsiniz.
 * Her kart aşağıdaki yapıya uygun olmalıdır:
 * 
 * {
 *   id: string,           // Benzersiz kart ID'si
 *   category: string,     // Kategori (math, physics, chemistry, biology, turkish, history)
 *   question: string,     // Soru metni
 *   answer: string,       // Cevap metni
 *   difficulty: string,   // Zorluk seviyesi (easy, medium, hard)
 *   explanation?: string, // Açıklama (opsiyonel)
 *   image?: string,       // Resim URL'si (opsiyonel)
 *   tags: string[],       // Etiketler
 * }
 */

export const cardsData: Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] = [
  // ==================== MATEMATİK KARTLARI ====================
  
  {
    id: 'math_001',
    category: 'math',
    question: 'Bir üçgenin iç açıları toplamı kaç derecedir?',
    answer: '180 derece',
    difficulty: 'easy',
    explanation: 'Üçgenin iç açıları toplamı her zaman 180 derecedir. Bu geometrinin temel kurallarından biridir.',
    tags: ['geometri', 'temel', 'üçgen'],
  },
  
  {
    id: 'math_002',
    category: 'math',
    question: 'x² - 5x + 6 = 0 denkleminin kökleri nelerdir?',
    answer: 'x = 2 ve x = 3',
    difficulty: 'medium',
    explanation: 'Denklemi çarpanlara ayırarak (x-2)(x-3) = 0 şeklinde yazabiliriz. Buradan x = 2 ve x = 3 bulunur.',
    tags: ['denklem', 'çarpanlara ayırma', 'ikinci derece'],
  },
  
  {
    id: 'math_003',
    category: 'math',
    question: 'f(x) = 2x + 3 fonksiyonunun türevi nedir?',
    answer: 'f\'(x) = 2',
    difficulty: 'hard',
    explanation: 'Doğrusal fonksiyonların türevi sabit sayıdır. 2x\'in türevi 2, 3\'ün türevi 0\'dır.',
    tags: ['türev', 'fonksiyon', 'kalkülüs'],
  },

  // ==================== FİZİK KARTLARI ====================
  
  {
    id: 'physics_001',
    category: 'physics',
    question: 'Newton\'un ikinci yasası nedir?',
    answer: 'F = ma (Kuvvet = Kütle × İvme)',
    difficulty: 'easy',
    explanation: 'Newton\'un ikinci yasası, bir cisme uygulanan net kuvvetin, cismin kütlesi ile ivmesinin çarpımına eşit olduğunu belirtir.',
    tags: ['newton', 'kuvvet', 'ivme', 'temel'],
  },
  
  {
    id: 'physics_002',
    category: 'physics',
    question: 'Elektrik akımının birimi nedir?',
    answer: 'Amper (A)',
    difficulty: 'medium',
    explanation: 'Elektrik akımı, birim zamanda geçen yük miktarıdır ve birimi Amper\'dir. 1 Amper = 1 Coulomb/saniye.',
    tags: ['elektrik', 'akım', 'birim', 'amper'],
  },
  
  {
    id: 'physics_003',
    category: 'physics',
    question: 'E = mc² formülü neyi ifade eder?',
    answer: 'Kütle-enerji eşdeğerliği',
    difficulty: 'hard',
    explanation: 'Einstein\'ın özel görelilik teorisinde, kütle ve enerjinin eşdeğer olduğunu gösteren ünlü formüldür.',
    tags: ['einstein', 'görelilik', 'enerji', 'kütle'],
  },

  // ==================== KİMYA KARTLARI ====================
  
  {
    id: 'chemistry_001',
    category: 'chemistry',
    question: 'Su molekülünün formülü nedir?',
    answer: 'H₂O',
    difficulty: 'easy',
    explanation: 'Su molekülü 2 hidrojen atomu ve 1 oksijen atomundan oluşur. Bu yüzden formülü H₂O\'dur.',
    tags: ['su', 'molekül', 'formül', 'temel'],
  },
  
  {
    id: 'chemistry_002',
    category: 'chemistry',
    question: 'pH değeri 7\'den küçük olan çözeltiler nasıl adlandırılır?',
    answer: 'Asidik çözeltiler',
    difficulty: 'medium',
    explanation: 'pH < 7 olan çözeltiler asidik, pH = 7 olanlar nötr, pH > 7 olanlar ise bazik çözeltilerdir.',
    tags: ['pH', 'asit', 'baz', 'çözelti'],
  },
  
  {
    id: 'chemistry_003',
    category: 'chemistry',
    question: 'Periyodik tabloda elementler nasıl sıralanmıştır?',
    answer: 'Atom numarasına göre artan sırada',
    difficulty: 'hard',
    explanation: 'Modern periyodik tabloda elementler atom numaralarına (proton sayılarına) göre artan sırada dizilmiştir.',
    tags: ['periyodik tablo', 'atom numarası', 'element', 'sıralama'],
  },

  // ==================== BİYOLOJİ KARTLARI ====================
  
  {
    id: 'biology_001',
    category: 'biology',
    question: 'Hücrenin enerji üretim merkezi nedir?',
    answer: 'Mitokondri',
    difficulty: 'easy',
    explanation: 'Mitokondri, hücrenin enerji üretim merkezidir. ATP üretimi burada gerçekleşir.',
    tags: ['hücre', 'mitokondri', 'enerji', 'ATP'],
  },
  
  {
    id: 'biology_002',
    category: 'biology',
    question: 'DNA\'nın tam açılımı nedir?',
    answer: 'Deoksiribonükleik asit',
    difficulty: 'medium',
    explanation: 'DNA, Deoksiribonükleik asit\'in kısaltmasıdır ve genetik bilgiyi taşıyan moleküldür.',
    tags: ['DNA', 'genetik', 'molekül', 'nükleik asit'],
  },
  
  {
    id: 'biology_003',
    category: 'biology',
    question: 'Fotosentez sürecinde hangi gazlar alınır ve verilir?',
    answer: 'CO₂ alınır, O₂ verilir',
    difficulty: 'hard',
    explanation: 'Fotosentez sırasında bitkiler karbondioksit (CO₂) alır ve oksijen (O₂) üretir.',
    tags: ['fotosentez', 'CO2', 'O2', 'bitki'],
  },

  // ==================== TÜRKÇE KARTLARI ====================
  
  {
    id: 'turkish_001',
    category: 'turkish',
    question: '"Güzel" kelimesinin zıt anlamlısı nedir?',
    answer: 'Çirkin',
    difficulty: 'easy',
    explanation: 'Güzel kelimesinin zıt anlamlısı çirkin kelimesidir. Zıt anlamlı kelimeler birbirinin karşıtı olan kelimelerdir.',
    tags: ['zıt anlam', 'kelime', 'anlam', 'temel'],
  },
  
  {
    id: 'turkish_002',
    category: 'turkish',
    question: '"Koşmak" fiilinin geçmiş zamanı nedir?',
    answer: 'Koştu',
    difficulty: 'medium',
    explanation: 'Koşmak fiilinin geçmiş zamanı "koştu" şeklindedir. -mak/-mek mastar eki atılarak -tu eki eklenir.',
    tags: ['fiil', 'geçmiş zaman', 'dil bilgisi', 'çekim'],
  },
  
  {
    id: 'turkish_003',
    category: 'turkish',
    question: 'Türkçede kaç tane ünlü harf vardır?',
    answer: '8 tane (a, e, ı, i, o, ö, u, ü)',
    difficulty: 'hard',
    explanation: 'Türkçede 8 ünlü harf vardır: a, e, ı, i, o, ö, u, ü. Bunlar kalın ve ince olmak üzere iki gruba ayrılır.',
    tags: ['ünlü', 'harf', 'alfabe', 'ses bilgisi'],
  },

  // ==================== TARİH KARTLARI ====================
  
  {
    id: 'history_001',
    category: 'history',
    question: 'Osmanlı Devleti hangi yılda kurulmuştur?',
    answer: '1299',
    difficulty: 'easy',
    explanation: 'Osmanlı Devleti, Osman Gazi tarafından 1299 yılında kurulmuştur.',
    tags: ['osmanlı', 'kuruluş', '1299', 'osman gazi'],
  },
  
  {
    id: 'history_002',
    category: 'history',
    question: 'Türkiye Cumhuriyeti hangi yılda ilan edilmiştir?',
    answer: '1923',
    difficulty: 'medium',
    explanation: 'Türkiye Cumhuriyeti, Mustafa Kemal Atatürk önderliğinde 29 Ekim 1923 tarihinde ilan edilmiştir.',
    tags: ['cumhuriyet', '1923', 'atatürk', 'ilan'],
  },
  
  {
    id: 'history_003',
    category: 'history',
    question: 'İstanbul\'un fethi hangi yılda gerçekleşmiştir?',
    answer: '1453',
    difficulty: 'hard',
    explanation: 'İstanbul, Fatih Sultan Mehmet tarafından 29 Mayıs 1453 tarihinde fethedilmiştir.',
    tags: ['istanbul', 'fetih', '1453', 'fatih sultan mehmet'],
  },

  // ==================== YENİ KARTLAR BURAYA EKLENEBİLİR ====================
  
  // Örnek: Yeni bir matematik kartı eklemek için:
  // {
  //   id: 'math_004',
  //   category: 'math',
  //   question: 'Soru metni buraya yazılır',
  //   answer: 'Cevap buraya yazılır',
  //   difficulty: 'easy', // veya 'medium', 'hard'
  //   explanation: 'Açıklama buraya yazılır (opsiyonel)',
  //   tags: ['etiket1', 'etiket2'],
  // },
];

/**
 * Kart kategorileri ve zorluk seviyeleri:
 * 
 * Kategoriler:
 * - math: Matematik
 * - physics: Fizik
 * - chemistry: Kimya
 * - biology: Biyoloji
 * - turkish: Türkçe
 * - history: Tarih
 * 
 * Zorluk Seviyeleri:
 * - easy: Kolay
 * - medium: Orta
 * - hard: Zor
 * 
 * Kullanım:
 * 1. Bu dosyayı düzenleyin
 * 2. Yeni kartları cardsData dizisine ekleyin
 * 3. Uygulamayı yeniden başlatın
 */
