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
    subject: "Türkçe", // YDT için Türkçe kategorisinde
    topic: "İngilizce Dilbilgisi",
    difficulty: 1,
    examType: "YDT",
    isPastQuestion: false
  }
];

// Örnek verileri database'e ekle
export const addSampleData = async () => {
  console.log('Örnek veriler ekleniyor...');
  
  for (let i = 0; i < sampleQuestions.length; i++) {
    const questionData = sampleQuestions[i];
    try {
      await QuestionService.addQuestion(questionData);
      console.log(`Soru ${i + 1} eklendi: ${questionData.questionText.substring(0, 30)}...`);
    } catch (error) {
      console.error(`Soru ${i + 1} eklenirken hata:`, error);
    }
  }
  
  console.log('Örnek veriler eklendi!');
};

// Database'i temizle (sadece geliştirme için)
export const clearDatabase = () => {
  console.log('Database temizleniyor...');
  // Bu fonksiyon sadece geliştirme aşamasında kullanılmalı
  // Production'da kullanılmamalı
};

export default { addSampleData, clearDatabase, sampleQuestions };
