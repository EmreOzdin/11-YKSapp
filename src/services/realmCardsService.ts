import { generateAllCards } from './generateCards';
import {
    addManyQuestions,
    clearAllQuestions,
    getAllQuestions,
    getCategoryStats,
    getQuestionsByCategory
} from './realmConfig';

// Soruları MongoDB Realm'e yükle
export const loadQuestionsToRealm = async () => {
  try {
    console.log('Sorular MongoDB Realm\'e yükleniyor...');
    
    // Önce mevcut soruları temizle
    clearAllQuestions();
    
    // Yeni soruları oluştur
    const allQuestions = generateAllCards();
    
    // Soruları Realm'e ekle - undefined explanation'ları boş string yap
    const questionsWithDefaults = allQuestions.map(q => ({
      ...q,
      explanation: q.explanation || '',
    }));
    
    const success = addManyQuestions(questionsWithDefaults);
    
    if (success) {
      console.log(`✅ ${allQuestions.length} soru başarıyla MongoDB Realm'e yüklendi!`);
      
      // Kategori istatistiklerini göster
      const stats = getCategoryStats();
      console.log('📊 Kategori dağılımı:');
      stats.forEach(category => {
        console.log(`   ${category.name}: ${category.count} soru`);
      });
      
      return true;
    } else {
      console.error('❌ Sorular yüklenirken hata oluştu');
      return false;
    }
    
  } catch (error) {
    console.error('❌ Sorular yüklenirken hata oluştu:', error);
    return false;
  }
};

// Tüm soruları getir
export const getAllQuestionsFromRealm = () => {
  try {
    const questions = getAllQuestions();
    return Array.from(questions);
  } catch (error) {
    console.error('Sorular getirilirken hata:', error);
    return [];
  }
};

// Kategoriye göre soruları getir
export const getQuestionsByCategoryFromRealm = (category: string) => {
  try {
    const questions = getQuestionsByCategory(category);
    return Array.from(questions);
  } catch (error) {
    console.error('Kategori soruları getirilirken hata:', error);
    return [];
  }
};

// Kategori istatistiklerini getir
export const getCategoryStatsFromRealm = () => {
  try {
    return getCategoryStats();
  } catch (error) {
    console.error('Kategori istatistikleri getirilirken hata:', error);
    return [];
  }
};

// Soruları kontrol et
export const checkQuestionsInRealm = () => {
  try {
    const questions = getAllQuestions();
    console.log(`📚 MongoDB Realm'de toplam ${questions.length} soru bulundu`);
    
    const stats = getCategoryStats();
    console.log('📊 Kategori istatistikleri:');
    stats.forEach(category => {
      console.log(`   ${category.name}: ${category.count} soru (Kolay: ${category.easyCount}, Orta: ${category.mediumCount}, Zor: ${category.hardCount})`);
    });
    
  } catch (error) {
    console.error('❌ Sorular kontrol edilirken hata oluştu:', error);
  }
};

// Soruları yeniden yükle
export const reloadQuestionsToRealm = async () => {
  try {
    console.log('Sorular yeniden yükleniyor...');
    const success = await loadQuestionsToRealm();
    
    if (success) {
      console.log('✅ Sorular başarıyla yeniden yüklendi!');
      checkQuestionsInRealm();
    } else {
      console.error('❌ Sorular yeniden yüklenirken hata oluştu');
    }
    
    return success;
  } catch (error) {
    console.error('❌ Sorular yeniden yüklenirken hata oluştu:', error);
    return false;
  }
};
