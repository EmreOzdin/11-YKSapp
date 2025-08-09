import AsyncStorage from '@react-native-async-storage/async-storage';

// Soru tipi interface'i
export interface QuestionType {
  id?: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  subject: string;
  topic: string;
  difficulty: 1 | 2 | 3; // 1: Kolay, 2: Orta, 3: Zor
  examType: "TYT" | "AYT" | "YDT";
  isPastQuestion: boolean;
  year?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Soru servisi sınıfı
export class QuestionService {
  private static readonly QUESTIONS_KEY = 'questions';
  private static readonly USERS_KEY = 'users';

  // Soru ekleme
  static async addQuestion(questionData: Omit<QuestionType, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const questions = await this.getAllQuestions();
      const newQuestion: QuestionType = {
        ...questionData,
        id: this.generateId(),
        createdAt: new Date(),
        updatedAt: new Date()
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
  static async getQuestionsByExamType(examType: "TYT" | "AYT" | "YDT"): Promise<QuestionType[]> {
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
  static async getQuestionsByDifficulty(difficulty: 1 | 2 | 3): Promise<QuestionType[]> {
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
  static async updateQuestion(id: string, updatedData: Partial<QuestionType>): Promise<boolean> {
    try {
      const questions = await this.getAllQuestions();
      const questionIndex = questions.findIndex(q => q.id === id);
      
      if (questionIndex === -1) {
        throw new Error('Soru bulunamadı');
      }

      questions[questionIndex] = {
        ...questions[questionIndex],
        ...updatedData,
        updatedAt: new Date()
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
      await AsyncStorage.setItem(this.QUESTIONS_KEY, JSON.stringify(filteredQuestions));
      return true;
    } catch (error) {
      console.error('Soru silinirken hata:', error);
      return false;
    }
  }

  // Rastgele soru getirme
  static async getRandomQuestions(count: number, filters?: {
    examType?: "TYT" | "AYT" | "YDT";
    subject?: string;
    difficulty?: 1 | 2 | 3;
    isPastQuestion?: boolean;
  }): Promise<QuestionType[]> {
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
        questions = questions.filter(q => q.isPastQuestion === filters.isPastQuestion);
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
      console.log('Veritabanı temizlendi');
    } catch (error) {
      console.error('Veritabanı temizlenirken hata:', error);
    }
  }
}

export default QuestionService;
