// sampleData.js - JavaScript formatında soru verileri
const sampleQuestions = [
  // Fen Bilimleri - TYT
  {
    questionText: 'Aşağıdakilerden hangisi fiziksel bir değişimdir?',
    options: [
      'Sütün ekşimesi',
      'Demirin paslanması',
      'Buzun erimesi',
      'Odunun yanması',
    ],
    correctAnswer: 'C',
    explanation:
      'Buzun erimesi sadece fiziksel hal değişimidir, kimyasal yapı değişmez.',
    subject: 'Fen Bilimleri',
    topic: 'Maddenin Halleri',
    topicId: 'tyt-kimya-madde',
    difficulty: 1,
    examType: 'TYT',
    isPastQuestion: false,
  },
  {
    questionText: 'Hangi element periyodik tabloda en solda yer alır?',
    options: ['Helyum', 'Hidrojen', 'Lityum', 'Berilyum'],
    correctAnswer: 'B',
    explanation: 'Hidrojen periyodik tabloda en solda yer alır.',
    subject: 'Fen Bilimleri',
    topic: 'Periyodik Tablo',
    topicId: 'tyt-kimya-madde',
    difficulty: 2,
    examType: 'TYT',
    isPastQuestion: true,
    year: 2023,
  },

  // Türkçe - TYT
  {
    questionText: 'Aşağıdaki cümlelerden hangisinde yazım yanlışı vardır?',
    options: [
      'Bu konuyu daha önce de konuşmuştuk.',
      'Yarın sabah erken kalkacağım.',
      'O da bu işe dahil olacak.',
      'Hiç bir şey söylemedi.',
    ],
    correctAnswer: 'D',
    explanation: "'Hiç bir' ayrı yazılır, 'hiçbir' bitişik yazılmalıdır.",
    subject: 'Türkçe',
    topic: 'Yazım Kuralları',
    topicId: 'tyt-turkce-yazim',
    difficulty: 2,
    examType: 'TYT',
    isPastQuestion: false,
  },

  // Matematik - TYT
  {
    questionText: '2x + 3 = 11 denkleminin çözümü kaçtır?',
    options: ['2', '3', '4', '5'],
    correctAnswer: 'C',
    explanation: '2x + 3 = 11 → 2x = 8 → x = 4',
    subject: 'Matematik',
    topic: 'Birinci Dereceden Denklemler',
    topicId: 'tyt-matematik-temel',
    difficulty: 1,
    examType: 'TYT',
    isPastQuestion: false,
  },

  // Sosyal Bilimler - TYT
  {
    questionText: "Türkiye'nin en yüksek dağı hangisidir?",
    options: ['Erciyes Dağı', 'Ağrı Dağı', 'Uludağ', 'Kaçkar Dağı'],
    correctAnswer: 'B',
    explanation: "Ağrı Dağı 5137 metre ile Türkiye'nin en yüksek dağıdır.",
    subject: 'Sosyal Bilimler',
    topic: 'Türkiye Coğrafyası',
    topicId: 'tyt-cografya-fiziki',
    difficulty: 1,
    examType: 'TYT',
    isPastQuestion: true,
    year: 2022,
  },

  // Fen Bilimleri - AYT
  {
    questionText: 'Hangi bağ türü en güçlü kimyasal bağdır?',
    options: [
      'İyonik bağ',
      'Kovalent bağ',
      'Hidrojen bağı',
      'Van der Waals bağı',
    ],
    correctAnswer: 'B',
    explanation: 'Kovalent bağ, atomlar arasındaki en güçlü kimyasal bağdır.',
    subject: 'Fen Bilimleri',
    topic: 'Kimyasal Bağlar',
    topicId: 'ayt-kimya-organik',
    difficulty: 3,
    examType: 'AYT',
    isPastQuestion: false,
  },

  // Matematik - AYT
  {
    questionText: 'f(x) = x² + 2x + 1 fonksiyonunun türevi nedir?',
    options: ['2x + 2', 'x² + 2', '2x + 1', 'x + 2'],
    correctAnswer: 'A',
    explanation: 'f(x) = x² + 2x + 1 → f\'(x) = 2x + 2',
    subject: 'Matematik',
    topic: 'Türev',
    topicId: 'ayt-matematik-turev',
    difficulty: 2,
    examType: 'AYT',
    isPastQuestion: true,
    year: 2021,
  },

  // YDT - İngilizce
  {
    questionText: 'Choose the correct form: "She _____ to school every day."',
    options: ['go', 'goes', 'going', 'gone'],
    correctAnswer: 'B',
    explanation: 'Present Simple tense\'de 3. tekil şahıs için -s eki eklenir.',
    subject: 'İngilizce',
    topic: 'Present Simple',
    topicId: 'ydt-ingilizce-dilbilgisi',
    difficulty: 1,
    examType: 'YDT',
    isPastQuestion: false,
  },

  // Ek sorular - Fen Bilimleri
  {
    questionText: 'Hangi organel hücrenin enerji üretim merkezidir?',
    options: ['Golgi aygıtı', 'Mitokondri', 'Endoplazmik retikulum', 'Lizozom'],
    correctAnswer: 'B',
    explanation: 'Mitokondri, hücrenin enerji üretim merkezidir.',
    subject: 'Fen Bilimleri',
    topic: 'Hücre',
    topicId: 'tyt-biyoloji-hucre',
    difficulty: 1,
    examType: 'TYT',
    isPastQuestion: false,
  },

  // Ek sorular - Matematik
  {
    questionText: 'Bir zar atıldığında 6 gelme olasılığı kaçtır?',
    options: ['1/2', '1/3', '1/6', '1/12'],
    correctAnswer: 'C',
    explanation: "Bir zarın 6 yüzü vardır ve her yüzün gelme olasılığı 1/6'dır.",
    subject: 'Matematik',
    topic: 'Olasılık',
    topicId: 'tyt-matematik-olasilik',
    difficulty: 1,
    examType: 'TYT',
    isPastQuestion: false,
  },

  // Ek sorular - Sosyal Bilimler
  {
    questionText: "Osmanlı Devleti'nin kurucusu kimdir?",
    options: ['Osman Bey', 'Orhan Bey', 'Murat Bey', 'Fatih Sultan Mehmet'],
    correctAnswer: 'A',
    explanation: 'Osmanlı Devleti 1299 yılında Osman Bey tarafından kurulmuştur.',
    subject: 'Sosyal Bilimler',
    topic: 'Osmanlı Tarihi',
    topicId: 'tyt-tarih-osmanli',
    difficulty: 1,
    examType: 'TYT',
    isPastQuestion: false,
  },

  {
    questionText: "Türkiye'nin en büyük gölü hangisidir?",
    options: ['Van Gölü', 'Tuz Gölü', 'Beyşehir Gölü', 'İznik Gölü'],
    correctAnswer: 'A',
    explanation: "Van Gölü 3.713 km² alanıyla Türkiye'nin en büyük gölüdür.",
    subject: 'Sosyal Bilimler',
    topic: 'Türkiye Coğrafyası',
    topicId: 'tyt-cografya-fiziki',
    difficulty: 1,
    examType: 'TYT',
    isPastQuestion: false,
  },

  {
    questionText: 'Aşağıdakilerden hangisi mantık biliminin konularından biri değildir?',
    options: ['Önermeler', 'Çıkarımlar', 'Kimyasal tepkimeler', 'Kavramlar'],
    correctAnswer: 'C',
    explanation: 'Kimyasal tepkimeler kimya biliminin konusudur, mantık biliminin değil.',
    subject: 'Sosyal Bilimler',
    topic: 'Mantık',
    topicId: 'tyt-felsefe-mantik',
    difficulty: 2,
    examType: 'TYT',
    isPastQuestion: false,
  },

  // AYT - Fen Bilimleri ek sorular
  {
    questionText: 'Hangi dalga türü en yüksek frekansa sahiptir?',
    options: ['Radyo dalgaları', 'Mikrodalgalar', 'Görünür ışık', 'Gamma ışınları'],
    correctAnswer: 'D',
    explanation: 'Gamma ışınları en yüksek frekansa sahip elektromanyetik dalgalardır.',
    subject: 'Fen Bilimleri',
    topic: 'Dalgalar',
    topicId: 'ayt-fizik-dalgalar',
    difficulty: 3,
    examType: 'AYT',
    isPastQuestion: true,
    year: 2020,
  },

  {
    questionText: 'Hangi organik bileşik sınıfı en basit yapıya sahiptir?',
    options: ['Alkoller', 'Alkanlar', 'Alkenler', 'Alkinler'],
    correctAnswer: 'B',
    explanation: 'Alkanlar, sadece tek bağ içeren en basit organik bileşik sınıfıdır.',
    subject: 'Fen Bilimleri',
    topic: 'Organik Kimya',
    topicId: 'ayt-kimya-organik',
    difficulty: 2,
    examType: 'AYT',
    isPastQuestion: false,
  },

  // YDT - İngilizce ek sorular
  {
    questionText: 'Complete the sentence: "If it rains tomorrow, I _____ at home."',
    options: ['stay', 'will stay', 'stayed', 'staying'],
    correctAnswer: 'B',
    explanation: 'First conditional yapısında if clause\'da present, main clause\'da will kullanılır.',
    subject: 'İngilizce',
    topic: 'Conditionals',
    topicId: 'ydt-ingilizce-dilbilgisi',
    difficulty: 2,
    examType: 'YDT',
    isPastQuestion: false,
  },

  {
    questionText: 'Choose the correct word: "The weather is _____ today."',
    options: ['sun', 'sunny', 'sunshine', 'sunning'],
    correctAnswer: 'B',
    explanation: 'Weather ile kullanılan sıfat "sunny" olmalıdır.',
    subject: 'İngilizce',
    topic: 'Kelime Bilgisi',
    topicId: 'ydt-ingilizce-kelime',
    difficulty: 1,
    examType: 'YDT',
    isPastQuestion: false,
  }
];

module.exports = sampleQuestions;
