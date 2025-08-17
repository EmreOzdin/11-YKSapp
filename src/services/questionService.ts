import AsyncStorage from '@react-native-async-storage/async-storage';

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
      const questionsData = await AsyncStorage.getItem(this.QUESTIONS_KEY);
      return questionsData ? JSON.parse(questionsData) : [];
    } catch (error) {
      console.error('Sorular getirilirken hata:', error);
      return [];
    }
  }

  // Sınav tipine göre soruları getirme
  static async getQuestionsByExamType(
    examType: 'TYT' | 'AYT' | 'YDT'
  ): Promise<QuestionType[]> {
    try {
      const questions = await this.getAllQuestions();
      return questions.filter(question => question.examType === examType);
    } catch (error) {
      console.error('Sınav tipine göre sorular getirilirken hata:', error);
      return [];
    }
  }

  // Derse göre soruları getirme
  static async getQuestionsBySubject(subject: string): Promise<QuestionType[]> {
    try {
      const questions = await this.getAllQuestions();
      return questions.filter(question => question.subject === subject);
    } catch (error) {
      console.error('Derse göre sorular getirilirken hata:', error);
      return [];
    }
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
      const questions = await this.getAllQuestions();
      return questions.filter(question => question.isPastQuestion);
    } catch (error) {
      console.error('Çıkmış sorular getirilirken hata:', error);
      return [];
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
      console.log('Veritabanı temizlendi');
    } catch (error) {
      console.error('Veritabanı temizlenirken hata:', error);
    }
  }
}

export default QuestionService;
