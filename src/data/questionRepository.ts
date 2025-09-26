import { MemoryCard } from '../services/asyncStorageService';
import { turkceCalismaSorulari } from './calismaSoruları/turkce';

// Türkçe sorularını filtreleyen fonksiyon
export const getTurkishQuestions = (): Omit<
  MemoryCard,
  'createdAt' | 'updatedAt'
>[] => {
  return turkceCalismaSorulari;
};

// Matematik sorularını filtreleyen fonksiyon
export const getMathematicsQuestions = (): Omit<
  MemoryCard,
  'createdAt' | 'updatedAt'
>[] => {
  return [];
};

// Fizik sorularını filtreleyen fonksiyon
export const getPhysicsQuestions = (): Omit<
  MemoryCard,
  'createdAt' | 'updatedAt'
>[] => {
  return [];
};

// Kimya sorularını filtreleyen fonksiyon
export const getChemistryQuestions = (): Omit<
  MemoryCard,
  'createdAt' | 'updatedAt'
>[] => {
  return [];
};

// Biyoloji sorularını filtreleyen fonksiyon
export const getBiologyQuestions = (): Omit<
  MemoryCard,
  'createdAt' | 'updatedAt'
>[] => {
  return [];
};

// Fen Bilimleri sorularını (Fizik, Kimya, Biyoloji) filtreleyen fonksiyon
export const getScienceQuestions = (): Omit<
  MemoryCard,
  'createdAt' | 'updatedAt'
>[] => {
  return [];
};

// 2018 TYT Sınavında Çıkmış Sorular
export const tyt2018Questions: Omit<MemoryCard, 'createdAt' | 'updatedAt'>[] =
  [];

// Tüm soruları birleştir
const allQuestions = [...tyt2018Questions];

// Soru deposu için yardımcı fonksiyonlar
export const getQuestionsByExam = (examYear: number, examType: string) => {
  return allQuestions.filter(
    q => q.examYear === examYear && q.examType === examType
  );
};

export const getQuestionsBySubject = (subject: string) => {
  return allQuestions.filter(q => q.subject === subject);
};

export const getQuestionsByDifficulty = (
  difficulty: 'easy' | 'medium' | 'hard'
) => {
  return allQuestions.filter(q => q.difficulty === difficulty);
};

export const getRandomQuestions = (count: number) => {
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getQuestionsByCategory = (category: string) => {
  return allQuestions.filter(q => q.category === category);
};

// TYT sınavları için özel fonksiyonlar
export const getTYT2018Questions = () => {
  return tyt2018Questions;
};

export const getTYT2019Questions = () => {
  return allQuestions.filter(q => q.examYear === 2019 && q.examType === 'TYT');
};

export const getTYT2020Questions = () => {
  return allQuestions.filter(q => q.examYear === 2020 && q.examType === 'TYT');
};

export const getTYT2021Questions = () => {
  return allQuestions.filter(q => q.examYear === 2021 && q.examType === 'TYT');
};

export const getTYT2022Questions = () => {
  return allQuestions.filter(q => q.examYear === 2022 && q.examType === 'TYT');
};

export const getTYT2023Questions = () => {
  return allQuestions.filter(q => q.examYear === 2023 && q.examType === 'TYT');
};

export const getTYT2024Questions = () => {
  return allQuestions.filter(q => q.examYear === 2024 && q.examType === 'TYT');
};

export const getTYT2025Questions = () => {
  return allQuestions.filter(q => q.examYear === 2025 && q.examType === 'TYT');
};

export const getAYT2018Questions = () => {
  return allQuestions.filter(q => q.examYear === 2018 && q.examType === 'AYT');
};

export const getAYT2019Questions = () => {
  return allQuestions.filter(q => q.examYear === 2019 && q.examType === 'AYT');
};

export const getAYT2020Questions = () => {
  return allQuestions.filter(q => q.examYear === 2020 && q.examType === 'AYT');
};

export const getAYT2021Questions = () => {
  return allQuestions.filter(q => q.examYear === 2021 && q.examType === 'AYT');
};

export const getAYT2022Questions = () => {
  return allQuestions.filter(q => q.examYear === 2022 && q.examType === 'AYT');
};

export const getAYT2023Questions = () => {
  return allQuestions.filter(q => q.examYear === 2023 && q.examType === 'AYT');
};

export const getAYT2024Questions = () => {
  return allQuestions.filter(q => q.examYear === 2024 && q.examType === 'AYT');
};

export const getAYT2025Questions = () => {
  return allQuestions.filter(q => q.examYear === 2025 && q.examType === 'AYT');
};

export const getYDT2018Questions = () => {
  return allQuestions.filter(q => q.examYear === 2018 && q.examType === 'YDT');
};

export const getAllTYTQuestions = () => {
  return allQuestions.filter(q => q.examType === 'TYT');
};

export const getTYT2018QuestionsBySubject = (subject: string) => {
  return tyt2018Questions.filter(
    q => q.examYear === 2018 && q.examType === 'TYT' && q.subject === subject
  );
};

export const getTYT2019QuestionsBySubject = (subject: string) => {
  return allQuestions.filter(
    q => q.examYear === 2019 && q.examType === 'TYT' && q.subject === subject
  );
};

export const getTYT2020QuestionsBySubject = (subject: string) => {
  return allQuestions.filter(
    q => q.examYear === 2020 && q.examType === 'TYT' && q.subject === subject
  );
};

export const getTYT2021QuestionsBySubject = (subject: string) => {
  return allQuestions.filter(
    q => q.examYear === 2021 && q.examType === 'TYT' && q.subject === subject
  );
};

export const getTYT2022QuestionsBySubject = (subject: string) => {
  return allQuestions.filter(
    q => q.examYear === 2022 && q.examType === 'TYT' && q.subject === subject
  );
};

export const getTYT2023QuestionsBySubject = (subject: string) => {
  return allQuestions.filter(
    q => q.examYear === 2023 && q.examType === 'TYT' && q.subject === subject
  );
};

export const getTYT2024QuestionsBySubject = (subject: string) => {
  return allQuestions.filter(
    q => q.examYear === 2024 && q.examType === 'TYT' && q.subject === subject
  );
};

export const getTYT2025QuestionsBySubject = (subject: string) => {
  return allQuestions.filter(
    q => q.examYear === 2025 && q.examType === 'TYT' && q.subject === subject
  );
};

export const getAYT2018QuestionsBySubject = (subject: string) => {
  return allQuestions.filter(
    q => q.examYear === 2018 && q.examType === 'AYT' && q.subject === subject
  );
};

export const getAYT2019QuestionsBySubject = (subject: string) => {
  return allQuestions.filter(
    q => q.examYear === 2019 && q.examType === 'AYT' && q.subject === subject
  );
};

export const getAYT2020QuestionsBySubject = (subject: string) => {
  return allQuestions.filter(
    q => q.examYear === 2020 && q.examType === 'AYT' && q.subject === subject
  );
};

export const getAYT2021QuestionsBySubject = (subject: string) => {
  return allQuestions.filter(
    q => q.examYear === 2021 && q.examType === 'AYT' && q.subject === subject
  );
};

export const getAYT2022QuestionsBySubject = (subject: string) => {
  return allQuestions.filter(
    q => q.examYear === 2022 && q.examType === 'AYT' && q.subject === subject
  );
};

export const getAYT2023QuestionsBySubject = (subject: string) => {
  return allQuestions.filter(
    q => q.examYear === 2023 && q.examType === 'AYT' && q.subject === subject
  );
};

export const getAYT2024QuestionsBySubject = (subject: string) => {
  return allQuestions.filter(
    q => q.examYear === 2024 && q.examType === 'AYT' && q.subject === subject
  );
};

export const getAYT2025QuestionsBySubject = (subject: string) => {
  return allQuestions.filter(
    q => q.examYear === 2025 && q.examType === 'AYT' && q.subject === subject
  );
};

export const getYDT2018QuestionsBySubject = (subject: string) => {
  return allQuestions.filter(
    q => q.examYear === 2018 && q.examType === 'YDT' && q.subject === subject
  );
};

export const getTYTQuestionsByYearAndSubject = (
  year: number,
  subject: string
) => {
  return allQuestions.filter(
    q => q.examYear === year && q.examType === 'TYT' && q.subject === subject
  );
};

export const getAYTQuestionsByYearAndSubject = (
  year: number,
  subject: string
) => {
  return allQuestions.filter(
    q => q.examYear === year && q.examType === 'AYT' && q.subject === subject
  );
};

export const getYDTQuestionsByYearAndSubject = (
  year: number,
  subject: string
) => {
  return allQuestions.filter(
    q => q.examYear === year && q.examType === 'YDT' && q.subject === subject
  );
};

// İstatistik fonksiyonları
export const getQuestionStats = () => {
  const stats = {
    total: allQuestions.length,
    bySubject: {} as Record<string, number>,
    byDifficulty: {} as Record<string, number>,
    byCategory: {} as Record<string, number>,
    byYear: {} as Record<string, number>,
  };

  allQuestions.forEach(q => {
    if (q.subject)
      stats.bySubject[q.subject] = (stats.bySubject[q.subject] || 0) + 1;
    if (q.difficulty)
      stats.byDifficulty[q.difficulty] =
        (stats.byDifficulty[q.difficulty] || 0) + 1;
    if (q.category)
      stats.byCategory[q.category] = (stats.byCategory[q.category] || 0) + 1;
    if (q.examYear)
      stats.byYear[q.examYear.toString()] =
        (stats.byYear[q.examYear.toString()] || 0) + 1;
  });

  return stats;
};

// Yıl bazında istatistikler
export const getQuestionStatsByYear = (year: number) => {
  const yearQuestions = allQuestions.filter(q => q.examYear === year);
  const stats = {
    total: yearQuestions.length,
    bySubject: {} as Record<string, number>,
    byDifficulty: {} as Record<string, number>,
    byCategory: {} as Record<string, number>,
  };

  yearQuestions.forEach(q => {
    if (q.subject)
      stats.bySubject[q.subject] = (stats.bySubject[q.subject] || 0) + 1;
    if (q.difficulty)
      stats.byDifficulty[q.difficulty] =
        (stats.byDifficulty[q.difficulty] || 0) + 1;
    if (q.category)
      stats.byCategory[q.category] = (stats.byCategory[q.category] || 0) + 1;
  });

  return stats;
};