import { QuestionService, QuestionType } from './questionService';

// Örnek soru verileri
export const sampleQuestions: QuestionType[] = [
  // Fen Bilimleri - TYT
  {
    questionText: "Aşağıdakilerden hangisi fiziksel bir değişimdir?",
    options: [
      "Sütün ekşimesi",
      "Demirin paslanması", 
      "Buzun erimesi",
      "Odunun yanması"
    ],
    correctAnswer: "C",
    explanation: "Buzun erimesi sadece fiziksel hal değişimidir, kimyasal yapı değişmez.",
    subject: "Fen Bilimleri",
    topic: "Maddenin Halleri",
    topicId: "tyt-kimya-madde",
    difficulty: 1,
    examType: "TYT",
    isPastQuestion: false
  },
  {
    questionText: "Hangi element periyodik tabloda en solda yer alır?",
    options: [
      "Helyum",
      "Hidrojen",
      "Lityum", 
      "Berilyum"
    ],
    correctAnswer: "B",
    explanation: "Hidrojen periyodik tabloda en solda yer alır.",
    subject: "Fen Bilimleri",
    topic: "Periyodik Tablo",
    topicId: "tyt-kimya-madde",
    difficulty: 2,
    examType: "TYT",
    isPastQuestion: true,
    year: 2023
  },

  // Türkçe - TYT
  {
    questionText: "Aşağıdaki cümlelerden hangisinde yazım yanlışı vardır?",
    options: [
      "Bu konuyu daha önce de konuşmuştuk.",
      "Yarın sabah erken kalkacağım.",
      "O da bu işe dahil olacak.",
      "Hiç bir şey söylemedi."
    ],
    correctAnswer: "D",
    explanation: "'Hiç bir' ayrı yazılır, 'hiçbir' bitişik yazılmalıdır.",
    subject: "Türkçe",
    topic: "Yazım Kuralları",
    topicId: "tyt-turkce-yazim",
    difficulty: 2,
    examType: "TYT",
    isPastQuestion: false
  },

  // Matematik - TYT
  {
    questionText: "2x + 3 = 11 denkleminin çözümü kaçtır?",
    options: [
      "2",
      "3", 
      "4",
      "5"
    ],
    correctAnswer: "C",
    explanation: "2x + 3 = 11 → 2x = 8 → x = 4",
    subject: "Matematik",
    topic: "Birinci Dereceden Denklemler",
    topicId: "tyt-matematik-temel",
    difficulty: 1,
    examType: "TYT",
    isPastQuestion: false
  },

  // Sosyal Bilimler - TYT
  {
    questionText: "Türkiye'nin en yüksek dağı hangisidir?",
    options: [
      "Erciyes Dağı",
      "Ağrı Dağı",
      "Uludağ",
      "Kaçkar Dağı"
    ],
    correctAnswer: "B",
    explanation: "Ağrı Dağı 5137 metre ile Türkiye'nin en yüksek dağıdır.",
    subject: "Sosyal Bilimler",
    topic: "Türkiye Coğrafyası",
    topicId: "tyt-cografya-fiziki",
    difficulty: 1,
    examType: "TYT",
    isPastQuestion: true,
    year: 2022
  },

  // Fen Bilimleri - AYT
  {
    questionText: "Hangi bağ türü en güçlü kimyasal bağdır?",
    options: [
      "İyonik bağ",
      "Kovalent bağ",
      "Hidrojen bağı",
      "Van der Waals bağı"
    ],
    correctAnswer: "B",
    explanation: "Kovalent bağ, atomlar arasındaki en güçlü kimyasal bağdır.",
    subject: "Fen Bilimleri",
    topic: "Kimyasal Bağlar",
    topicId: "ayt-kimya-organik",
    difficulty: 3,
    examType: "AYT",
    isPastQuestion: false
  },

  // Matematik - AYT
  {
    questionText: "f(x) = x² + 2x + 1 fonksiyonunun minimum değeri kaçtır?",
    options: [
      "-1",
      "0",
      "1",
      "2"
    ],
    correctAnswer: "B",
    explanation: "f(x) = (x+1)² olduğundan minimum değer 0'dır.",
    subject: "Matematik",
    topic: "İkinci Dereceden Fonksiyonlar",
    topicId: "ayt-matematik-fonksiyonlar",
    difficulty: 3,
    examType: "AYT",
    isPastQuestion: false
  },

  // YDT - İngilizce
  {
    questionText: "What is the past tense of 'go'?",
    options: [
      "goed",
      "went",
      "gone",
      "going"
    ],
    correctAnswer: "B",
    explanation: "The past tense of 'go' is 'went'.",
    subject: "İngilizce",
    topic: "İngilizce Dilbilgisi",
    topicId: "ydt-ingilizce-dilbilgisi",
    difficulty: 1,
    examType: "YDT",
    isPastQuestion: false
  },

  // Ek örnek sorular - Fen Bilimleri
  {
    questionText: "Bir cismin ivmesi nedir?",
    options: [
      "Yerdeğiştirme / zaman²",
      "Kütle * hız",
      "Kuvvet / kütle",
      "Enerji * zaman"
    ],
    correctAnswer: "C",
    explanation: "İvme, kuvvetin kütleye bölümüne eşittir. Newton'un ikinci yasasına göre F = m*a formülünden a = F/m olarak hesaplanır.",
    subject: "Fen Bilimleri",
    topic: "Dinamik",
    topicId: "tyt-fizik-mekanik",
    difficulty: 2,
    examType: "TYT",
    isPastQuestion: false
  },
  {
    questionText: "Hangi element periyodik tabloda en aktif metaldir?",
    options: [
      "Sodyum",
      "Potasyum",
      "Lityum",
      "Sezyum"
    ],
    correctAnswer: "D",
    explanation: "Sezyum periyodik tabloda en aktif metaldir ve en düşük iyonlaşma enerjisine sahiptir.",
    subject: "Fen Bilimleri",
    topic: "Periyodik Tablo",
    topicId: "tyt-kimya-madde",
    difficulty: 2,
    examType: "TYT",
    isPastQuestion: false
  },
  {
    questionText: "Hücre zarının temel yapısı nedir?",
    options: [
      "Protein tabakası",
      "Fosfolipid çift tabakası",
      "Karbonhidrat tabakası",
      "Nükleik asit tabakası"
    ],
    correctAnswer: "B",
    explanation: "Hücre zarı fosfolipid çift tabakasından oluşur ve bu yapı hücrenin temel koruyucu bariyeridir.",
    subject: "Fen Bilimleri",
    topic: "Hücre",
    topicId: "tyt-biyoloji-hucre",
    difficulty: 1,
    examType: "TYT",
    isPastQuestion: false
  },

  // Ek örnek sorular - Türkçe
  {
    questionText: "Aşağıdaki cümlelerden hangisinde anlatım bozukluğu vardır?",
    options: [
      "Bu konuyu daha önce de konuşmuştuk.",
      "Hem çalışıyor hem de okuyor.",
      "Bu kitabı okudum ve beğendim.",
      "Hem güzel hem de güzel bir ev aldı."
    ],
    correctAnswer: "D",
    explanation: "'Hem güzel hem de güzel' ifadesinde gereksiz tekrar vardır.",
    subject: "Türkçe",
    topic: "Anlatım Bozuklukları",
    topicId: "tyt-turkce-anlatim",
    difficulty: 2,
    examType: "TYT",
    isPastQuestion: false
  },
  {
    questionText: "Aşağıdaki kelimelerden hangisi büyük ünlü uyumuna uymaz?",
    options: [
      "Kitap",
      "Kalem",
      "Telefon",
      "Masa"
    ],
    correctAnswer: "C",
    explanation: "'Telefon' kelimesi büyük ünlü uyumuna uymaz çünkü 'e' ve 'o' sesleri aynı kelimede bulunur.",
    subject: "Türkçe",
    topic: "Dilbilgisi",
    topicId: "tyt-turkce-dilbilgisi",
    difficulty: 2,
    examType: "TYT",
    isPastQuestion: false
  },
  {
    questionText: "Aşağıdaki cümlelerden hangisinde noktalama yanlışı vardır?",
    options: [
      "Ahmet, Mehmet ve Ali okula gitti.",
      "Evet, haklısın.",
      "Ne yapıyorsun?",
      "Güzel bir gün, değil mi."
    ],
    correctAnswer: "D",
    explanation: "'Güzel bir gün, değil mi.' cümlesinde soru işareti kullanılmalıdır.",
    subject: "Türkçe",
    topic: "Noktalama",
    topicId: "tyt-turkce-noktalama",
    difficulty: 1,
    examType: "TYT",
    isPastQuestion: false
  },

  // Ek örnek sorular - Matematik
  {
    questionText: "Bir üçgenin iç açıları toplamı kaç derecedir?",
    options: [
      "90",
      "180",
      "270",
      "360"
    ],
    correctAnswer: "B",
    explanation: "Bir üçgenin iç açıları toplamı 180 derecedir.",
    subject: "Matematik",
    topic: "Geometri",
    topicId: "tyt-matematik-geometri",
    difficulty: 1,
    examType: "TYT",
    isPastQuestion: false
  },
  {
    questionText: "3x + 5 = 20 denkleminin çözümü kaçtır?",
    options: [
      "3",
      "5",
      "7",
      "15"
    ],
    correctAnswer: "B",
    explanation: "3x + 5 = 20 → 3x = 15 → x = 5",
    subject: "Matematik",
    topic: "Birinci Dereceden Denklemler",
    topicId: "tyt-matematik-temel",
    difficulty: 1,
    examType: "TYT",
    isPastQuestion: false
  },
  {
    questionText: "Bir zar atıldığında 6 gelme olasılığı kaçtır?",
    options: [
      "1/2",
      "1/3",
      "1/6",
      "1/12"
    ],
    correctAnswer: "C",
    explanation: "Bir zarın 6 yüzü vardır ve her yüzün gelme olasılığı 1/6'dır.",
    subject: "Matematik",
    topic: "Olasılık",
    topicId: "tyt-matematik-olasilik",
    difficulty: 1,
    examType: "TYT",
    isPastQuestion: false
  },

  // Ek örnek sorular - Sosyal Bilimler
  {
    questionText: "Osmanlı Devleti'nin kurucusu kimdir?",
    options: [
      "Osman Bey",
      "Orhan Bey",
      "Murat Bey",
      "Fatih Sultan Mehmet"
    ],
    correctAnswer: "A",
    explanation: "Osmanlı Devleti 1299 yılında Osman Bey tarafından kurulmuştur.",
    subject: "Sosyal Bilimler",
    topic: "Osmanlı Tarihi",
    topicId: "tyt-tarih-osmanli",
    difficulty: 1,
    examType: "TYT",
    isPastQuestion: false
  },
  {
    questionText: "Türkiye'nin en büyük gölü hangisidir?",
    options: [
      "Van Gölü",
      "Tuz Gölü",
      "Beyşehir Gölü",
      "İznik Gölü"
    ],
    correctAnswer: "A",
    explanation: "Van Gölü 3.713 km² alanıyla Türkiye'nin en büyük gölüdür.",
    subject: "Sosyal Bilimler",
    topic: "Türkiye Coğrafyası",
    topicId: "tyt-cografya-fiziki",
    difficulty: 1,
    examType: "TYT",
    isPastQuestion: false
  },
  {
    questionText: "Aşağıdakilerden hangisi mantık biliminin konularından biri değildir?",
    options: [
      "Önermeler",
      "Çıkarımlar",
      "Kimyasal tepkimeler",
      "Kavramlar"
    ],
    correctAnswer: "C",
    explanation: "Kimyasal tepkimeler kimya biliminin konusudur, mantık biliminin değil.",
    subject: "Sosyal Bilimler",
    topic: "Mantık",
    topicId: "tyt-felsefe-mantik",
    difficulty: 2,
    examType: "TYT",
    isPastQuestion: false
  }
];

// Örnek verileri database'e ekle
export const addSampleData = async () => {
  console.log('Örnek veriler ekleniyor...');
  
  // Önce mevcut soruları kontrol et
  const existingQuestions = await QuestionService.getAllQuestions();
  
  if (existingQuestions.length > 0) {
    console.log('Veritabanında zaten sorular mevcut, ekleme yapılmıyor.');
    return;
  }
  
  for (let i = 0; i < sampleQuestions.length; i++) {
    const questionData = sampleQuestions[i];
    try {
      await QuestionService.addQuestion(questionData);
      console.log(`Soru ${i + 1} eklendi: ${questionData.questionText.substring(0, 30)}...`);
    } catch (error) {
      console.error(`Soru ${i + 1} eklenirken hata:`, error);
    }
  }
  
  console.log('Örnek veriler başarıyla eklendi!');
};

// Database'i temizle (sadece geliştirme için)
export const clearDatabase = async () => {
  console.log('Database temizleniyor...');
  try {
    await QuestionService.clearDatabase();
    console.log('Database başarıyla temizlendi!');
  } catch (error) {
    console.error('Database temizlenirken hata:', error);
  }
};

export default { addSampleData, clearDatabase, sampleQuestions };
