import AsyncStorage from '@react-native-async-storage/async-storage';
import { isMongoDbEnabled } from '../config/environment';
import apiService from './apiService';

// Konu kategorileri
export interface TopicCategory {
  id: string;
  name: string;
  subject: string;
  examType: 'TYT' | 'AYT' | 'YDT';
  description?: string;
}

// Kullanıcı seçimleri
export interface UserSelections {
  examType: 'TYT' | 'AYT' | 'YDT';
  selectedTopics: string[]; // Topic ID'leri
  selectedSubjects?: string[];
}

// Soru tipi interface'i
export interface QuestionType {
  id?: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  subject: string;
  topic: string;
  topicId: string; // Konu kategorisi ID'si
  difficulty: 1 | 2 | 3; // 1: Kolay, 2: Orta, 3: Zor
  examType: 'TYT' | 'AYT' | 'YDT';
  isPastQuestion: boolean;
  year?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Konu kategorileri tanımları
export const TOPIC_CATEGORIES: TopicCategory[] = [
  // TYT - Türkçe
  {
    id: 'tyt-turkce-paragraf',
    name: 'Paragraf',
    subject: 'Türkçe',
    examType: 'TYT',
  },
  {
    id: 'tyt-turkce-dilbilgisi',
    name: 'Dilbilgisi',
    subject: 'Türkçe',
    examType: 'TYT',
  },
  {
    id: 'tyt-turkce-yazim',
    name: 'Yazım Kuralları',
    subject: 'Türkçe',
    examType: 'TYT',
  },
  {
    id: 'tyt-turkce-noktalama',
    name: 'Noktalama',
    subject: 'Türkçe',
    examType: 'TYT',
  },
  {
    id: 'tyt-turkce-anlatim',
    name: 'Anlatım Bozuklukları',
    subject: 'Türkçe',
    examType: 'TYT',
  },

  // TYT - Matematik
  {
    id: 'tyt-matematik-temel',
    name: 'Temel Matematik',
    subject: 'Matematik',
    examType: 'TYT',
  },
  {
    id: 'tyt-matematik-geometri',
    name: 'Geometri',
    subject: 'Matematik',
    examType: 'TYT',
  },
  {
    id: 'tyt-matematik-problemler',
    name: 'Problemler',
    subject: 'Matematik',
    examType: 'TYT',
  },
  {
    id: 'tyt-matematik-sayilar',
    name: 'Sayılar',
    subject: 'Matematik',
    examType: 'TYT',
  },
  {
    id: 'tyt-matematik-olasilik',
    name: 'Olasılık',
    subject: 'Matematik',
    examType: 'TYT',
  },

  // TYT - Fen Bilimleri
  {
    id: 'tyt-fizik-mekanik',
    name: 'Mekanik',
    subject: 'Fen Bilimleri',
    examType: 'TYT',
  },
  {
    id: 'tyt-fizik-elektrik',
    name: 'Elektrik',
    subject: 'Fen Bilimleri',
    examType: 'TYT',
  },
  {
    id: 'tyt-kimya-madde',
    name: 'Madde ve Özellikleri',
    subject: 'Fen Bilimleri',
    examType: 'TYT',
  },
  {
    id: 'tyt-kimya-karisma',
    name: 'Karışımlar',
    subject: 'Fen Bilimleri',
    examType: 'TYT',
  },
  {
    id: 'tyt-biyoloji-hucre',
    name: 'Hücre',
    subject: 'Fen Bilimleri',
    examType: 'TYT',
  },
  {
    id: 'tyt-biyoloji-sistemler',
    name: 'Sistemler',
    subject: 'Fen Bilimleri',
    examType: 'TYT',
  },

  // TYT - Sosyal Bilimler
  {
    id: 'tyt-tarih-osmanli',
    name: 'Osmanlı Tarihi',
    subject: 'Sosyal Bilimler',
    examType: 'TYT',
  },
  {
    id: 'tyt-tarih-cumhuriyet',
    name: 'Cumhuriyet Tarihi',
    subject: 'Sosyal Bilimler',
    examType: 'TYT',
  },
  {
    id: 'tyt-cografya-fiziki',
    name: 'Fiziki Coğrafya',
    subject: 'Sosyal Bilimler',
    examType: 'TYT',
  },
  {
    id: 'tyt-cografya-beşeri',
    name: 'Beşeri Coğrafya',
    subject: 'Sosyal Bilimler',
    examType: 'TYT',
  },
  {
    id: 'tyt-felsefe-mantik',
    name: 'Mantık',
    subject: 'Sosyal Bilimler',
    examType: 'TYT',
  },
  {
    id: 'tyt-felsefe-psikoloji',
    name: 'Psikoloji',
    subject: 'Sosyal Bilimler',
    examType: 'TYT',
  },

  // AYT - Matematik
  {
    id: 'ayt-matematik-fonksiyonlar',
    name: 'Fonksiyonlar',
    subject: 'Matematik',
    examType: 'AYT',
  },
  {
    id: 'ayt-matematik-turev',
    name: 'Türev',
    subject: 'Matematik',
    examType: 'AYT',
  },
  {
    id: 'ayt-matematik-integral',
    name: 'İntegral',
    subject: 'Matematik',
    examType: 'AYT',
  },
  {
    id: 'ayt-matematik-trigonometri',
    name: 'Trigonometri',
    subject: 'Matematik',
    examType: 'AYT',
  },
  {
    id: 'ayt-matematik-logaritma',
    name: 'Logaritma',
    subject: 'Matematik',
    examType: 'AYT',
  },

  // AYT - Fen Bilimleri
  {
    id: 'ayt-fizik-dalgalar',
    name: 'Dalgalar',
    subject: 'Fen Bilimleri',
    examType: 'AYT',
  },
  {
    id: 'ayt-fizik-optik',
    name: 'Optik',
    subject: 'Fen Bilimleri',
    examType: 'AYT',
  },
  {
    id: 'ayt-fizik-modern',
    name: 'Modern Fizik',
    subject: 'Fen Bilimleri',
    examType: 'AYT',
  },
  {
    id: 'ayt-kimya-organik',
    name: 'Organik Kimya',
    subject: 'Fen Bilimleri',
    examType: 'AYT',
  },
  {
    id: 'ayt-kimya-analitik',
    name: 'Analitik Kimya',
    subject: 'Fen Bilimleri',
    examType: 'AYT',
  },
  {
    id: 'ayt-biyoloji-genetik',
    name: 'Genetik',
    subject: 'Fen Bilimleri',
    examType: 'AYT',
  },
  {
    id: 'ayt-biyoloji-evrim',
    name: 'Evrim',
    subject: 'Fen Bilimleri',
    examType: 'AYT',
  },

  // AYT - Sosyal Bilimler
  {
    id: 'ayt-tarih-inkilap',
    name: 'İnkılap Tarihi',
    subject: 'Sosyal Bilimler',
    examType: 'AYT',
  },
  {
    id: 'ayt-tarih-cagdas',
    name: 'Çağdaş Türk Tarihi',
    subject: 'Sosyal Bilimler',
    examType: 'AYT',
  },
  {
    id: 'ayt-cografya-ekonomik',
    name: 'Ekonomik Coğrafya',
    subject: 'Sosyal Bilimler',
    examType: 'AYT',
  },
  {
    id: 'ayt-cografya-cevre',
    name: 'Çevre Coğrafyası',
    subject: 'Sosyal Bilimler',
    examType: 'AYT',
  },
  {
    id: 'ayt-felsefe-etik',
    name: 'Etik',
    subject: 'Sosyal Bilimler',
    examType: 'AYT',
  },
  {
    id: 'ayt-felsefe-sosyoloji',
    name: 'Sosyoloji',
    subject: 'Sosyal Bilimler',
    examType: 'AYT',
  },

  // YDT - İngilizce
  {
    id: 'ydt-ingilizce-dilbilgisi',
    name: 'Dilbilgisi',
    subject: 'İngilizce',
    examType: 'YDT',
  },
  {
    id: 'ydt-ingilizce-kelime',
    name: 'Kelime Bilgisi',
    subject: 'İngilizce',
    examType: 'YDT',
  },
  {
    id: 'ydt-ingilizce-paragraf',
    name: 'Paragraf',
    subject: 'İngilizce',
    examType: 'YDT',
  },
  {
    id: 'ydt-ingilizce-diyalog',
    name: 'Diyalog',
    subject: 'İngilizce',
    examType: 'YDT',
  },
  {
    id: 'ydt-ingilizce-cumle',
    name: 'Cümle Tamamlama',
    subject: 'İngilizce',
    examType: 'YDT',
  },
];

// Soru servisi sınıfı
export class QuestionService {
  private static readonly QUESTIONS_KEY = 'questions';

  // Subject mapping - uygulamadaki subject'ler ile questionRepository'deki subject'ler arasında eşleştirme
  private static getSubjectMapping(subject: string): string[] {
    const mapping: { [key: string]: string[] } = {
      Türkçe: ['Türkçe'],
      Matematik: ['Matematik'],
      Fizik: ['Fizik'],
      Kimya: ['Kimya'],
      Biyoloji: ['Biyoloji'],
      Tarih: ['Tarih'],
      Coğrafya: ['Coğrafya'],
      Felsefe: ['Felsefe'],
      'Din Kültürü': ['Din Kültürü'],
      'Fen Bilimleri': ['Fizik', 'Kimya', 'Biyoloji'],
      'Sosyal Bilimler': ['Tarih', 'Coğrafya', 'Felsefe', 'Din Kültürü'],
    };

    return mapping[subject] || [subject];
  }
  private static readonly USERS_KEY = 'users';
  private static readonly USER_SELECTIONS_KEY = 'user_selections';

  // Kullanıcı seçimlerini kaydetme
  static async saveUserSelections(selections: UserSelections): Promise<void> {
    try {
      await AsyncStorage.setItem(
        this.USER_SELECTIONS_KEY,
        JSON.stringify(selections)
      );
    } catch (error) {
      console.error('Kullanıcı seçimleri kaydedilirken hata:', error);
      throw new Error('Seçimler kaydedilemedi');
    }
  }

  // Kullanıcı seçimlerini getirme
  static async getUserSelections(): Promise<UserSelections | null> {
    try {
      const selectionsData = await AsyncStorage.getItem(
        this.USER_SELECTIONS_KEY
      );
      return selectionsData ? JSON.parse(selectionsData) : null;
    } catch (error) {
      console.error('Kullanıcı seçimleri getirilirken hata:', error);
      return null;
    }
  }

  // Seçilen konulara göre soruları getirme
  static async getQuestionsByUserSelections(): Promise<QuestionType[]> {
    try {
      const selections = await this.getUserSelections();
      if (!selections || selections.selectedTopics.length === 0) {
        return [];
      }

      const questions = await this.getAllQuestions();
      return questions.filter(
        question =>
          selections.selectedTopics.includes(question.topicId) &&
          question.examType === selections.examType
      );
    } catch (error) {
      console.error('Seçimlere göre sorular getirilirken hata:', error);
      return [];
    }
  }

  // Derse göre soruları getirme (sınav tipi belirtilmeden)
  static async getQuestionsBySubjectOnly(
    subject: string
  ): Promise<QuestionType[]> {
    try {
      const questions = await this.getAllQuestions();
      return questions.filter(question => question.subject === subject);
    } catch (error) {
      console.error('Derse göre sorular getirilirken hata:', error);
      return [];
    }
  }

  // Konu kategorilerini getirme
  static getTopicCategories(
    examType?: 'TYT' | 'AYT' | 'YDT',
    subject?: string
  ): TopicCategory[] {
    let categories = TOPIC_CATEGORIES;

    if (examType) {
      categories = categories.filter(cat => cat.examType === examType);
    }

    if (subject) {
      categories = categories.filter(cat => cat.subject === subject);
    }

    return categories;
  }

  // Konuya göre soruları getirme
  static async getQuestionsByTopic(topicId: string): Promise<QuestionType[]> {
    try {
      const questions = await this.getAllQuestions();
      return questions.filter(question => question.topicId === topicId);
    } catch (error) {
      console.error('Konuya göre sorular getirilirken hata:', error);
      return [];
    }
  }

  // Soru ekleme
  static async addQuestion(
    questionData: Omit<QuestionType, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<string> {
    try {
      const questions = await this.getAllQuestions();
      const newQuestion: QuestionType = {
        ...questionData,
        id: this.generateId(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      questions.push(newQuestion);
      await AsyncStorage.setItem(this.QUESTIONS_KEY, JSON.stringify(questions));

      return newQuestion.id!;
    } catch (error) {
      console.error('Soru eklenirken hata:', error);
      throw new Error('Soru eklenemedi');
    }
  }

  // Tüm soruları getirme
  static async getAllQuestions(): Promise<QuestionType[]> {
    try {
      // MongoDB kullanımı açıksa MongoDB'den al
      if (isMongoDbEnabled()) {
        try {
          const mongoQuestions = await apiService.getAllQuestions();

          // Eğer MongoDB'den soru gelirse onları kullan
          if (mongoQuestions && mongoQuestions.length > 0) {
            return mongoQuestions;
          }
        } catch (mongoError) {
          console.error("MongoDB'den sorular alınırken hata:", mongoError);
        }
      }

      // MongoDB kapalıysa veya hata varsa local storage'dan al (fallback)
      const questionsData = await AsyncStorage.getItem(this.QUESTIONS_KEY);
      return questionsData ? JSON.parse(questionsData) : [];
    } catch (error) {
      console.error('Sorular getirilirken hata:', error);

      // Hata durumunda local storage'dan al (fallback)
      try {
        const questionsData = await AsyncStorage.getItem(this.QUESTIONS_KEY);
        return questionsData ? JSON.parse(questionsData) : [];
      } catch (localError) {
        console.error("Local storage'dan sorular alınırken hata:", localError);
        return [];
      }
    }
  }

  // Sınav tipine göre soruları getirme
  static async getQuestionsByExamType(
    examType: 'TYT' | 'AYT' | 'YDT'
  ): Promise<QuestionType[]> {
    try {
      // Timeout ile API çağrısını sınırla (3 saniye)
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('API timeout')), 1000);
      });

      const apiPromise = apiService.getQuestionsByExamType(examType);

      let mongoQuestions: QuestionType[] = [];
      try {
        mongoQuestions = await Promise.race([apiPromise, timeoutPromise]);
      } catch (timeoutError) {
        console.warn(
          'API çağrısı timeout oldu, local storage kullanılıyor:',
          timeoutError
        );
        mongoQuestions = [];
      }

      // Eğer MongoDB'den soru gelirse onları kullan
      if (mongoQuestions && mongoQuestions.length > 0) {
        return mongoQuestions;
      }

      // MongoDB'den soru gelmezse local storage'dan al ve filtrele
      const questions = await this.getAllQuestions();
      return questions.filter(question => question.examType === examType);
    } catch (error) {
      console.error('Sınav tipine göre sorular getirilirken hata:', error);

      // Hata durumunda local storage'dan al ve filtrele (fallback)
      try {
        const questions = await this.getAllQuestions();
        return questions.filter(question => question.examType === examType);
      } catch (localError) {
        console.error("Local storage'dan sorular alınırken hata:", localError);
        return [];
      }
    }
  }

  // Derse göre soruları getirme - questionRepository.ts'den
  static async getQuestionsBySubject(subject: string): Promise<QuestionType[]> {
    try {
      // Önce questionRepository'den dene
      const { QuestionRepositoryService } = await import(
        './questionRepositoryService.js'
      );
      const repoQuestions =
        QuestionRepositoryService.getStudyQuestions(subject);

      if (repoQuestions.length > 0) {
        // MemoryCard formatını QuestionType formatına dönüştür
        const convertedQuestions: QuestionType[] = repoQuestions.map(
          (card: any) => ({
            id: card.id,
            questionText: card.question,
            options: [
              card.answer,
              'Yanlış Seçenek 1',
              'Yanlış Seçenek 2',
              'Yanlış Seçenek 3',
            ].sort(() => 0.5 - Math.random()),
            correctAnswer: card.answer,
            explanation: card.explanation || '',
            subject: card.subject || subject,
            difficulty:
              card.difficulty === 'easy'
                ? 1
                : card.difficulty === 'medium'
                  ? 2
                  : 3,
            category: card.category,
            topic: card.subject || subject,
            topicId: card.category,
            examType: 'TYT',
            isPastQuestion: true,
          })
        );

        return convertedQuestions;
      }

      // Fallback: Timeout ile API çağrısını sınırla (3 saniye)
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('API timeout')), 1000);
      });

      const apiPromise = apiService.getQuestionsBySubject(subject);

      let mongoQuestions: QuestionType[] = [];
      try {
        mongoQuestions = await Promise.race([apiPromise, timeoutPromise]);
      } catch (timeoutError) {
        console.warn(
          'API çağrısı timeout oldu, local storage kullanılıyor:',
          timeoutError
        );
        mongoQuestions = [];
      }

      // Eğer MongoDB'den soru gelirse onları kullan
      if (mongoQuestions && mongoQuestions.length > 0) {
        return mongoQuestions;
      }

      // MongoDB'den soru gelmezse local storage'dan al ve filtrele
      const questions = await this.getAllQuestions();
      return questions.filter(question => question.subject === subject);
    } catch (error) {
      console.error('Derse göre sorular getirilirken hata:', error);

      // Hata durumunda local storage'dan al ve filtrele (fallback)
      try {
        const questions = await this.getAllQuestions();
        return questions.filter(question => question.subject === subject);
      } catch (localError) {
        console.error("Local storage'dan sorular alınırken hata:", localError);
        return [];
      }
    }
  }

  // Sınav için ders bazlı soruları getirme - questionRepository.ts'den
  static async getExamQuestionsBySubject(
    subject: string,
    examType?: 'TYT' | 'AYT' | 'YDT'
  ): Promise<QuestionType[]> {
    try {
      // Önce questionRepository'den dene
      const { QuestionRepositoryService } = await import(
        './questionRepositoryService.js'
      );
      let repoQuestions: any[] = [];

      if (examType === 'TYT') {
        repoQuestions = QuestionRepositoryService.getAllTYTQuestions();
      } else if (examType === 'AYT') {
        repoQuestions = QuestionRepositoryService.getAllAYTQuestions();
      } else {
        repoQuestions = QuestionRepositoryService.getStudyQuestions(subject);
      }

      // Derse göre filtrele - subject mapping kullan
      if (subject) {
        const mappedSubjects = this.getSubjectMapping(subject);
        repoQuestions = repoQuestions.filter(q =>
          mappedSubjects.includes(q.subject)
        );
      }

      if (repoQuestions.length > 0) {
        // MemoryCard formatını QuestionType formatına dönüştür
        const convertedQuestions: QuestionType[] = repoQuestions.map(
          (card: any) => ({
            id: card.id,
            questionText: card.question,
            options: [
              card.answer,
              'Yanlış Seçenek 1',
              'Yanlış Seçenek 2',
              'Yanlış Seçenek 3',
            ].sort(() => 0.5 - Math.random()),
            correctAnswer: card.answer,
            explanation: card.explanation || '',
            subject: card.subject || subject,
            difficulty:
              card.difficulty === 'easy'
                ? 1
                : card.difficulty === 'medium'
                  ? 2
                  : 3,
            category: card.category,
            topic: card.subject || subject,
            topicId: card.category,
            examType: examType || 'TYT',
            isPastQuestion: true,
          })
        );

        // 45 soru al ve karıştır
        const shuffled = convertedQuestions.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 45);
      }

      // Fallback: Eski yöntem
      let questions: QuestionType[] = [];

      // Timeout ile API çağrısını sınırla (5 saniye)
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('API timeout')), 2000);
      });

      const questionsPromise = (async () => {
        if (examType) {
          // Sınav tipine göre soruları al
          questions = await this.getQuestionsByExamType(examType);
          // Derse göre filtrele
          questions = questions.filter(q => q.subject === subject);
        } else {
          // Sadece derse göre soruları al
          questions = await this.getQuestionsBySubject(subject);
        }
        return questions;
      })();

      // Timeout veya API çağrısından hangisi önce tamamlanırsa onu kullan
      try {
        questions = await Promise.race([questionsPromise, timeoutPromise]);
      } catch (timeoutError) {
        console.warn(
          'API çağrısı timeout oldu, örnek sorular kullanılıyor:',
          timeoutError
        );
        questions = [];
      }

      // Eğer yeterli soru yoksa, örnek sorular oluştur
      if (questions.length < 45) {
        const sampleQuestions = this.generateSampleQuestions(subject, examType);
        questions = [...questions, ...sampleQuestions];
      }

      // 45 soru al ve karıştır
      const shuffled = questions.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 45);
    } catch (error) {
      console.error('Sınav soruları getirilirken hata:', error);

      // Hata durumunda örnek sorular döndür
      return this.generateSampleQuestions(subject, examType).slice(0, 45);
    }
  }

  // Örnek sorular oluşturma (sınav için)
  static generateSampleQuestions(
    subject: string,
    examType?: 'TYT' | 'AYT' | 'YDT'
  ): QuestionType[] {
    const sampleQuestions: QuestionType[] = [];

    // Her ders için örnek sorular
    const subjectQuestions = this.getSubjectSampleQuestions(subject, examType);
    sampleQuestions.push(...subjectQuestions);

    return sampleQuestions;
  }

  // Ders bazlı örnek sorular
  private static getSubjectSampleQuestions(
    subject: string,
    examType?: 'TYT' | 'AYT' | 'YDT'
  ): QuestionType[] {
    const questions: QuestionType[] = [];

    switch (subject) {
      case 'Fen Bilimleri':
        questions.push(
          {
            questionText: 'Aşağıdakilerden hangisi fiziksel bir değişimdir?',
            options: [
              'A) Kağıdın yanması',
              'B) Suyun donması',
              'C) Sütün ekşimesi',
              'D) Demirin paslanması',
            ],
            correctAnswer: 'B) Suyun donması',
            explanation:
              'Suyun donması sadece fiziksel hal değişimidir, kimyasal yapı değişmez.',
            subject: 'Fen Bilimleri',
            topic: 'Fiziksel ve Kimyasal Değişimler',
            topicId: 'tyt-fizik-mekanik',
            difficulty: 1,
            examType: examType || 'TYT',
            isPastQuestion: false,
          },
          {
            questionText:
              'Hangi element periyodik tabloda 1A grubunda yer alır?',
            options: ['A) Karbon', 'B) Azot', 'C) Sodyum', 'D) Klor'],
            correctAnswer: 'C) Sodyum',
            explanation:
              'Sodyum (Na) alkali metaller grubunda yer alır ve 1A grubundadır.',
            subject: 'Fen Bilimleri',
            topic: 'Periyodik Tablo',
            topicId: 'tyt-kimya-madde',
            difficulty: 2,
            examType: examType || 'TYT',
            isPastQuestion: false,
          }
        );
        break;

      case 'Türkçe':
        questions.push(
          {
            questionText:
              'Aşağıdaki cümlelerden hangisinde yazım hatası vardır?',
            options: [
              'A) Yarın okula gideceğim',
              'B) Bu kitabı okudum',
              'C) Çok güzel bir gün',
              'D) Hiç bir şey yapmadım',
            ],
            correctAnswer: 'D) Hiç bir şey yapmadım',
            explanation: '"Hiçbir" kelimesi bitişik yazılır.',
            subject: 'Türkçe',
            topic: 'Yazım Kuralları',
            topicId: 'tyt-turkce-yazim',
            difficulty: 1,
            examType: examType || 'TYT',
            isPastQuestion: false,
          },
          {
            questionText:
              'Aşağıdaki cümlelerden hangisinde "de" eki yanlış yazılmıştır? Bu soru çok uzun bir soru metni içeriyor ve ekran dışına taşmaması gerekiyor.',
            options: [
              'A) Okulda ders çalışıyorum',
              'B) Evde kitap okuyorum',
              'C) Parkda oyun oynuyorum',
              'D) Bahçede çiçek yetiştiriyorum',
            ],
            correctAnswer: 'C) Parkda oyun oynuyorum',
            explanation: '"Parkda" yerine "parkta" yazılmalıdır.',
            subject: 'Türkçe',
            topic: 'Yazım Kuralları',
            topicId: 'tyt-turkce-yazim',
            difficulty: 2,
            examType: examType || 'TYT',
            isPastQuestion: false,
          },
          {
            questionText: 'Aşağıdaki cümlelerden hangisi devrik cümledir?',
            options: [
              'A) Kitap okuyorum',
              'B) Güzel bir gün',
              'C) Geldi misafirler',
              'D) Çalışıyor öğrenci',
            ],
            correctAnswer: 'C) Geldi misafirler',
            explanation: 'Devrik cümle, yüklemi sonda olmayan cümledir.',
            subject: 'Türkçe',
            topic: 'Cümle Türleri',
            topicId: 'tyt-turkce-dilbilgisi',
            difficulty: 2,
            examType: examType || 'TYT',
            isPastQuestion: false,
          }
        );
        break;

      case 'Matematik':
        questions.push(
          {
            questionText: '2x + 5 = 13 denkleminin çözümü nedir?',
            options: ['A) x = 3', 'B) x = 4', 'C) x = 5', 'D) x = 6'],
            correctAnswer: 'B) x = 4',
            explanation: '2x + 5 = 13 → 2x = 8 → x = 4',
            subject: 'Matematik',
            topic: 'Birinci Dereceden Denklemler',
            topicId: 'tyt-matematik-temel',
            difficulty: 1,
            examType: examType || 'TYT',
            isPastQuestion: false,
          },
          {
            questionText: 'Bir üçgenin iç açıları toplamı kaç derecedir?',
            options: ['A) 90°', 'B) 180°', 'C) 270°', 'D) 360°'],
            correctAnswer: 'B) 180°',
            explanation: 'Üçgenin iç açıları toplamı her zaman 180 derecedir.',
            subject: 'Matematik',
            topic: 'Geometri',
            topicId: 'tyt-matematik-geometri',
            difficulty: 1,
            examType: examType || 'TYT',
            isPastQuestion: false,
          },
          {
            questionText:
              "Bir dikdörtgenin uzun kenarı 12 cm, kısa kenarı 8 cm ise, bu dikdörtgenin çevresi kaç cm'dir? Bu soru matematik problemlerini test etmek için tasarlanmıştır.",
            options: ['A) 20 cm', 'B) 40 cm', 'C) 60 cm', 'D) 80 cm'],
            correctAnswer: 'B) 40 cm',
            explanation:
              'Çevre = 2 × (uzun kenar + kısa kenar) = 2 × (12 + 8) = 2 × 20 = 40 cm',
            subject: 'Matematik',
            topic: 'Geometri',
            topicId: 'tyt-matematik-geometri',
            difficulty: 2,
            examType: examType || 'TYT',
            isPastQuestion: false,
          }
        );
        break;

      case 'Sosyal Bilimler':
        questions.push(
          {
            questionText: 'Osmanlı Devleti hangi yılda kurulmuştur?',
            options: ['A) 1299', 'B) 1300', 'C) 1301', 'D) 1302'],
            correctAnswer: 'A) 1299',
            explanation:
              'Osmanlı Devleti 1299 yılında Osman Bey tarafından kurulmuştur.',
            subject: 'Sosyal Bilimler',
            topic: 'Osmanlı Tarihi',
            topicId: 'tyt-tarih-osmanli',
            difficulty: 1,
            examType: examType || 'TYT',
            isPastQuestion: false,
          },
          {
            questionText: "Türkiye'nin en büyük gölü hangisidir?",
            options: [
              'A) Tuz Gölü',
              'B) Van Gölü',
              'C) Eğirdir Gölü',
              'D) Sapanca Gölü',
            ],
            correctAnswer: 'B) Van Gölü',
            explanation: "Van Gölü, Türkiye'nin en büyük gölüdür.",
            subject: 'Sosyal Bilimler',
            topic: 'Coğrafya',
            topicId: 'tyt-cografya-fiziki',
            difficulty: 1,
            examType: examType || 'TYT',
            isPastQuestion: false,
          }
        );
        break;
    }

    return questions;
  }

  // Zorluk seviyesine göre soruları getirme
  static async getQuestionsByDifficulty(
    difficulty: 1 | 2 | 3
  ): Promise<QuestionType[]> {
    try {
      const questions = await this.getAllQuestions();
      return questions.filter(question => question.difficulty === difficulty);
    } catch (error) {
      console.error('Zorluk seviyesine göre sorular getirilirken hata:', error);
      return [];
    }
  }

  // Çıkmış soruları getirme
  static async getPastQuestions(): Promise<QuestionType[]> {
    try {
      // Önce MongoDB'den çıkmış soruları al
      const mongoQuestions = await apiService.getPastQuestions();

      // Eğer MongoDB'den soru gelirse onları kullan
      if (mongoQuestions && mongoQuestions.length > 0) {
        return mongoQuestions;
      }

      // MongoDB'den soru gelmezse local storage'dan al ve filtrele
      const questions = await this.getAllQuestions();
      return questions.filter(question => question.isPastQuestion);
    } catch (error) {
      console.error('Çıkmış sorular getirilirken hata:', error);

      // Hata durumunda local storage'dan al ve filtrele (fallback)
      try {
        const questions = await this.getAllQuestions();
        return questions.filter(question => question.isPastQuestion);
      } catch (localError) {
        console.error("Local storage'dan sorular alınırken hata:", localError);
        return [];
      }
    }
  }

  // Yıla göre çıkmış soruları getirme
  static async getPastQuestionsByYear(year: number): Promise<QuestionType[]> {
    try {
      // Önce MongoDB'den yıla göre çıkmış soruları al
      const mongoQuestions = await apiService.getPastQuestionsByYear(year);

      // Eğer MongoDB'den soru gelirse onları kullan
      if (mongoQuestions && mongoQuestions.length > 0) {
        return mongoQuestions;
      }

      // MongoDB'den soru gelmezse local storage'dan al ve filtrele
      const questions = await this.getAllQuestions();
      return questions.filter(
        question => question.isPastQuestion && question.year === year
      );
    } catch (error) {
      console.error('Yıla göre çıkmış sorular getirilirken hata:', error);

      // Hata durumunda local storage'dan al ve filtrele (fallback)
      try {
        const questions = await this.getAllQuestions();
        return questions.filter(
          question => question.isPastQuestion && question.year === year
        );
      } catch (localError) {
        console.error("Local storage'dan sorular alınırken hata:", localError);
        return [];
      }
    }
  }

  // Sınav tipine göre çıkmış soruları getirme
  static async getPastQuestionsByExamType(
    examType: 'TYT' | 'AYT' | 'YDT'
  ): Promise<QuestionType[]> {
    try {
      // Önce MongoDB'den sınav tipine göre çıkmış soruları al
      const mongoQuestions =
        await apiService.getPastQuestionsByExamType(examType);

      // Eğer MongoDB'den soru gelirse onları kullan
      if (mongoQuestions && mongoQuestions.length > 0) {
        return mongoQuestions;
      }

      // MongoDB'den soru gelmezse local storage'dan al ve filtrele
      const questions = await this.getAllQuestions();
      return questions.filter(
        question => question.isPastQuestion && question.examType === examType
      );
    } catch (error) {
      console.error(
        'Sınav tipine göre çıkmış sorular getirilirken hata:',
        error
      );

      // Hata durumunda local storage'dan al ve filtrele (fallback)
      try {
        const questions = await this.getAllQuestions();
        return questions.filter(
          question => question.isPastQuestion && question.examType === examType
        );
      } catch (localError) {
        console.error("Local storage'dan sorular alınırken hata:", localError);
        return [];
      }
    }
  }

  // Soru güncelleme
  static async updateQuestion(
    id: string,
    updatedData: Partial<QuestionType>
  ): Promise<boolean> {
    try {
      const questions = await this.getAllQuestions();
      const questionIndex = questions.findIndex(q => q.id === id);

      if (questionIndex === -1) {
        throw new Error('Soru bulunamadı');
      }

      questions[questionIndex] = {
        ...questions[questionIndex],
        ...updatedData,
        updatedAt: new Date(),
      };

      await AsyncStorage.setItem(this.QUESTIONS_KEY, JSON.stringify(questions));
      return true;
    } catch (error) {
      console.error('Soru güncellenirken hata:', error);
      return false;
    }
  }

  // Soru silme
  static async deleteQuestion(id: string): Promise<boolean> {
    try {
      const questions = await this.getAllQuestions();
      const filteredQuestions = questions.filter(q => q.id !== id);
      await AsyncStorage.setItem(
        this.QUESTIONS_KEY,
        JSON.stringify(filteredQuestions)
      );
      return true;
    } catch (error) {
      console.error('Soru silinirken hata:', error);
      return false;
    }
  }

  // Rastgele soru getirme (seçimlere göre)
  static async getRandomQuestionsBySelections(
    count: number
  ): Promise<QuestionType[]> {
    try {
      const questions = await this.getQuestionsByUserSelections();

      if (questions.length === 0) {
        return [];
      }

      // Rastgele karıştır
      const shuffled = questions.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, Math.min(count, questions.length));
    } catch (error) {
      console.error(
        'Seçimlere göre rastgele sorular getirilirken hata:',
        error
      );
      return [];
    }
  }

  // Rastgele soru getirme (genel)
  static async getRandomQuestions(
    count: number,
    filters?: {
      examType?: 'TYT' | 'AYT' | 'YDT';
      subject?: string;
      difficulty?: 1 | 2 | 3;
      isPastQuestion?: boolean;
      topicId?: string;
    }
  ): Promise<QuestionType[]> {
    try {
      let questions = await this.getAllQuestions();

      // Filtreleri uygula
      if (filters?.examType) {
        questions = questions.filter(q => q.examType === filters.examType);
      }
      if (filters?.subject) {
        questions = questions.filter(q => q.subject === filters.subject);
      }
      if (filters?.difficulty) {
        questions = questions.filter(q => q.difficulty === filters.difficulty);
      }
      if (filters?.isPastQuestion !== undefined) {
        questions = questions.filter(
          q => q.isPastQuestion === filters.isPastQuestion
        );
      }
      if (filters?.topicId) {
        questions = questions.filter(q => q.topicId === filters.topicId);
      }

      // Rastgele karıştır
      const shuffled = questions.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    } catch (error) {
      console.error('Rastgele sorular getirilirken hata:', error);
      return [];
    }
  }

  // ID oluşturma
  private static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Veritabanını temizleme (sadece geliştirme için)
  static async clearDatabase(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.QUESTIONS_KEY);
      await AsyncStorage.removeItem(this.USER_SELECTIONS_KEY);
    } catch (error) {
      console.error('Veritabanı temizlenirken hata:', error);
    }
  }
}

export default QuestionService;
