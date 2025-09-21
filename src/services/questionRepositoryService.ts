import {
    getAYT2018Questions,
    getAYT2018QuestionsBySubject,
    getAYT2019Questions,
    getAYT2019QuestionsBySubject,
    getAYT2020Questions,
    getAYT2020QuestionsBySubject,
    getAYT2021Questions,
    getAYT2021QuestionsBySubject,
    getAYT2022Questions,
    getAYT2022QuestionsBySubject,
    getAYT2023Questions,
    getAYT2023QuestionsBySubject,
    getAYT2024Questions,
    getAYT2024QuestionsBySubject,
    getAYT2025Questions,
    getAYT2025QuestionsBySubject,
    getAYTQuestionsByYearAndSubject,
    getAllTYTQuestions,
    getQuestionStats,
    getQuestionStatsByYear,
    getQuestionsByCategory,
    getQuestionsByDifficulty,
    getQuestionsByExam,
    getRandomQuestions,
    getTYT2018Questions,
    getTYT2018QuestionsBySubject,
    getTYT2019Questions,
    getTYT2019QuestionsBySubject,
    getTYT2020Questions,
    getTYT2020QuestionsBySubject,
    getTYT2021Questions,
    getTYT2021QuestionsBySubject,
    getTYT2022Questions,
    getTYT2022QuestionsBySubject,
    getTYT2023Questions,
    getTYT2023QuestionsBySubject,
    getTYT2024Questions,
    getTYT2024QuestionsBySubject,
    getTYT2025Questions,
    getTYT2025QuestionsBySubject,
    getTYTQuestionsByYearAndSubject,
    getYDT2018Questions,
    getYDT2018QuestionsBySubject,
    getYDTQuestionsByYearAndSubject
} from '../data/questionRepository';
import { MemoryCard } from './asyncStorageService';

// Soru deposu servisi
export class QuestionRepositoryService {
  
  // Tüm TYT sorularını getir
  static getAllTYTQuestions(): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getAllTYTQuestions();
  }

  // Tüm 2018 TYT sorularını getir
  static getAllTYT2018Questions(): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getTYT2018Questions();
  }

  // Tüm 2019 TYT sorularını getir
  static getAllTYT2019Questions(): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getTYT2019Questions();
  }

  // Tüm 2020 TYT sorularını getir
  static getAllTYT2020Questions(): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getTYT2020Questions();
  }

  // Tüm 2021 TYT sorularını getir
  static getAllTYT2021Questions(): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getTYT2021Questions();
  }

  // Tüm 2022 TYT sorularını getir
  static getAllTYT2022Questions(): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getTYT2022Questions();
  }

  // Tüm 2023 TYT sorularını getir
  static getAllTYT2023Questions(): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getTYT2023Questions();
  }

  // Tüm 2024 TYT sorularını getir
  static getAllTYT2024Questions(): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getTYT2024Questions();
  }

  // Tüm 2025 TYT sorularını getir
  static getAllTYT2025Questions(): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getTYT2025Questions();
  }

  // Tüm 2018 AYT sorularını getir
  static getAllAYT2018Questions(): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getAYT2018Questions();
  }

  // Tüm 2019 AYT sorularını getir
  static getAllAYT2019Questions(): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getAYT2019Questions();
  }

  // Tüm 2020 AYT sorularını getir
  static getAllAYT2020Questions(): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getAYT2020Questions();
  }

  // Tüm 2021 AYT sorularını getir
  static getAllAYT2021Questions(): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getAYT2021Questions();
  }

  // Tüm 2022 AYT sorularını getir
  static getAllAYT2022Questions(): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getAYT2022Questions();
  }

  // Tüm 2023 AYT sorularını getir
  static getAllAYT2023Questions(): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getAYT2023Questions();
  }

  // Tüm 2024 AYT sorularını getir
  static getAllAYT2024Questions(): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getAYT2024Questions();
  }

  // Tüm 2025 AYT sorularını getir
  static getAllAYT2025Questions(): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getAYT2025Questions();
  }

  // Tüm 2018 YDT sorularını getir
  static getAllYDT2018Questions(): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getYDT2018Questions();
  }

  // Belirli bir derse ait 2018 TYT sorularını getir
  static getTYT2018QuestionsBySubject(subject: string): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getTYT2018QuestionsBySubject(subject);
  }

  // Belirli bir derse ait 2019 TYT sorularını getir
  static getTYT2019QuestionsBySubject(subject: string): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getTYT2019QuestionsBySubject(subject);
  }

  // Belirli bir derse ait 2020 TYT sorularını getir
  static getTYT2020QuestionsBySubject(subject: string): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getTYT2020QuestionsBySubject(subject);
  }

  // Belirli bir derse ait 2021 TYT sorularını getir
  static getTYT2021QuestionsBySubject(subject: string): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getTYT2021QuestionsBySubject(subject);
  }

  // Belirli bir derse ait 2022 TYT sorularını getir
  static getTYT2022QuestionsBySubject(subject: string): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getTYT2022QuestionsBySubject(subject);
  }

  // Belirli bir derse ait 2023 TYT sorularını getir
  static getTYT2023QuestionsBySubject(subject: string): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getTYT2023QuestionsBySubject(subject);
  }

  // Belirli bir derse ait 2024 TYT sorularını getir
  static getTYT2024QuestionsBySubject(subject: string): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getTYT2024QuestionsBySubject(subject);
  }

  // Belirli bir derse ait 2025 TYT sorularını getir
  static getTYT2025QuestionsBySubject(subject: string): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getTYT2025QuestionsBySubject(subject);
  }

  // Belirli bir derse ait 2018 AYT sorularını getir
  static getAYT2018QuestionsBySubject(subject: string): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getAYT2018QuestionsBySubject(subject);
  }

  // Belirli bir derse ait 2019 AYT sorularını getir
  static getAYT2019QuestionsBySubject(subject: string): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getAYT2019QuestionsBySubject(subject);
  }

  // Belirli bir derse ait 2020 AYT sorularını getir
  static getAYT2020QuestionsBySubject(subject: string): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getAYT2020QuestionsBySubject(subject);
  }

  // Belirli bir derse ait 2021 AYT sorularını getir
  static getAYT2021QuestionsBySubject(subject: string): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getAYT2021QuestionsBySubject(subject);
  }

  // Belirli bir derse ait 2022 AYT sorularını getir
  static getAYT2022QuestionsBySubject(subject: string): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getAYT2022QuestionsBySubject(subject);
  }

  // Belirli bir derse ait 2023 AYT sorularını getir
  static getAYT2023QuestionsBySubject(subject: string): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getAYT2023QuestionsBySubject(subject);
  }

  // Belirli bir derse ait 2024 AYT sorularını getir
  static getAYT2024QuestionsBySubject(subject: string): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getAYT2024QuestionsBySubject(subject);
  }

  // Belirli bir derse ait 2025 AYT sorularını getir
  static getAYT2025QuestionsBySubject(subject: string): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getAYT2025QuestionsBySubject(subject);
  }

  // Belirli bir derse ait 2018 YDT sorularını getir
  static getYDT2018QuestionsBySubject(subject: string): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getYDT2018QuestionsBySubject(subject);
  }

  // Belirli yıl ve derse ait TYT sorularını getir
  static getTYTQuestionsByYearAndSubject(year: number, subject: string): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getTYTQuestionsByYearAndSubject(year, subject);
  }

  // Belirli yıl ve derse ait AYT sorularını getir
  static getAYTQuestionsByYearAndSubject(year: number, subject: string): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getAYTQuestionsByYearAndSubject(year, subject);
  }

  // Belirli yıl ve derse ait YDT sorularını getir
  static getYDTQuestionsByYearAndSubject(year: number, subject: string): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getYDTQuestionsByYearAndSubject(year, subject);
  }

  // Zorluk seviyesine göre soruları getir
  static getQuestionsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getQuestionsByDifficulty(difficulty);
  }

  // Rastgele sorular getir
  static getRandomQuestions(count: number): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getRandomQuestions(count);
  }

  // Kategoriye göre soruları getir
  static getQuestionsByCategory(category: string): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getQuestionsByCategory(category);
  }

  // Sınav yılı ve tipine göre soruları getir
  static getQuestionsByExam(examYear: number, examType: string): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return getQuestionsByExam(examYear, examType);
  }

  // Soru istatistiklerini getir
  static getQuestionStatistics() {
    return getQuestionStats();
  }

  // Çalışma soruları için optimize edilmiş sorular getir
  static getStudyQuestions(subject?: string, difficulty?: 'easy' | 'medium' | 'hard', year?: number): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    let questions = year ? this.getQuestionsByExam(year, 'TYT') : this.getAllTYTQuestions();
    
    if (subject) {
      questions = questions.filter(q => q.subject === subject);
    }
    
    if (difficulty) {
      questions = questions.filter(q => q.difficulty === difficulty);
    }
    
    // Çalışma için soruları karıştır
    return this.shuffleArray(questions);
  }

  // Çıkmış sorular için optimize edilmiş sorular getir
  static getPastExamQuestions(examYear: number, examType: string, subject?: string): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    let questions = this.getQuestionsByExam(examYear, examType);
    
    if (subject) {
      questions = questions.filter(q => q.subject === subject);
    }
    
    // Çıkmış sorular için sıralı getir (soru numarasına göre)
    return questions.sort((a, b) => (a.questionNumber || 0) - (b.questionNumber || 0));
  }

  // Deneme sınavı için optimize edilmiş sorular getir
  static getMockExamQuestions(year?: number): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    const questions: Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] = [];
    
    // TYT formatına uygun soru dağılımı
    const subjectDistribution = {
      'Türkçe': 40,
      'Matematik': 40,
      'Fizik': 7,
      'Kimya': 7,
      'Biyoloji': 6,
      'Tarih': 5,
      'Coğrafya': 5,
      'Felsefe': 5,
      'Din Kültürü': 5
    };

    // Her dersten belirtilen sayıda soru al
    Object.entries(subjectDistribution).forEach(([subject, count]) => {
      const subjectQuestions = year 
        ? this.getTYTQuestionsByYearAndSubject(year, subject)
        : this.getQuestionsByCategory(subject.toLowerCase());
      const shuffled = this.shuffleArray(subjectQuestions);
      questions.push(...shuffled.slice(0, count));
    });

    // Deneme sınavı için soruları karıştır
    return this.shuffleArray(questions);
  }

  // Belirli bir ders için deneme sınavı soruları getir
  static getSubjectMockExamQuestions(subject: string, questionCount: number, year?: number): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    const subjectQuestions = year 
      ? this.getTYTQuestionsByYearAndSubject(year, subject)
      : this.getQuestionsByCategory(subject.toLowerCase());
    const shuffled = this.shuffleArray(subjectQuestions);
    return shuffled.slice(0, questionCount);
  }

  // Zorluk seviyesine göre deneme sınavı soruları getir
  static getDifficultyBasedMockExamQuestions(
    easyCount: number = 30,
    mediumCount: number = 50,
    hardCount: number = 20
  ): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    const easyQuestions = this.getQuestionsByDifficulty('easy');
    const mediumQuestions = this.getQuestionsByDifficulty('medium');
    const hardQuestions = this.getQuestionsByDifficulty('hard');

    const questions = [
      ...this.shuffleArray(easyQuestions).slice(0, easyCount),
      ...this.shuffleArray(mediumQuestions).slice(0, mediumCount),
      ...this.shuffleArray(hardQuestions).slice(0, hardCount)
    ];

    return this.shuffleArray(questions);
  }

  // Soru arama fonksiyonu
  static searchQuestions(query: string, year?: number): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    const lowercaseQuery = query.toLowerCase();
    const questions = year ? this.getQuestionsByExam(year, 'TYT') : this.getAllTYTQuestions();
    return questions.filter(q => 
      q.question.toLowerCase().includes(lowercaseQuery) ||
      q.answer.toLowerCase().includes(lowercaseQuery) ||
      (q.explanation?.toLowerCase().includes(lowercaseQuery)) ||
      q.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  // Favori sorular için (gelecekte kullanılabilir)
  static getFavoriteQuestions(favoriteIds: string[]): Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] {
    return this.getAllTYTQuestions().filter(q => favoriteIds.includes(q.id));
  }

  // Yıl bazında istatistikler
  static getQuestionStatisticsByYear(year: number) {
    return getQuestionStatsByYear(year);
  }

  // Yardımcı fonksiyon: Array karıştırma
  private static shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Soru zorluk dağılımını getir
  static getDifficultyDistribution() {
    const stats = this.getQuestionStatistics();
    return {
      easy: stats.byDifficulty.easy || 0,
      medium: stats.byDifficulty.medium || 0,
      hard: stats.byDifficulty.hard || 0,
      total: stats.total
    };
  }

  // Ders bazında soru sayılarını getir
  static getSubjectDistribution() {
    const stats = this.getQuestionStatistics();
    return stats.bySubject;
  }

  // Kategori bazında soru sayılarını getir
  static getCategoryDistribution() {
    const stats = this.getQuestionStatistics();
    return stats.byCategory;
  }
}
