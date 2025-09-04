import AsyncStorage from '@react-native-async-storage/async-storage';
import { MemoryCard } from './asyncStorageService';
import { generateAllCards } from './generateCards';

const CARDS_STORAGE_KEY = 'yks_cards_data';

// Soruları AsyncStorage'a yükle
export const loadQuestionsToStorage = async () => {
  try {
    console.log('Sorular AsyncStorage\'a yükleniyor...');
    
    // Yeni soruları oluştur
    const allQuestions = generateAllCards();
    
    // Soruları AsyncStorage'a kaydet
    await AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(allQuestions));
    
    console.log(`✅ ${allQuestions.length} soru başarıyla AsyncStorage'a yüklendi!`);
    
    // Kategori istatistiklerini göster
    const stats = getCategoryStatsFromStorage(allQuestions);
    console.log('📊 Kategori dağılımı:');
    stats.forEach(category => {
      console.log(`   ${category.name}: ${category.count} soru`);
    });
    
    return true;
  } catch (error) {
    console.error('❌ Sorular yüklenirken hata oluştu:', error);
    return false;
  }
};

// Tüm soruları getir
export const getAllQuestionsFromStorage = async (): Promise<MemoryCard[]> => {
  try {
    const data = await AsyncStorage.getItem(CARDS_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Sorular getirilirken hata:', error);
    return [];
  }
};

// Kategoriye göre soruları getir
export const getQuestionsByCategoryFromStorage = async (category: string): Promise<MemoryCard[]> => {
  try {
    const allQuestions = await getAllQuestionsFromStorage();
    return allQuestions.filter(q => q.category === category);
  } catch (error) {
    console.error('Kategori soruları getirilirken hata:', error);
    return [];
  }
};

// Kategori istatistiklerini getir
export const getCategoryStatsFromStorage = (questions: any[] = []) => {
  try {
    const categories = ['Matematik', 'Fizik', 'Kimya', 'Biyoloji', 'Türkçe', 'Tarih'];
    
    return categories.map(category => {
      const categoryQuestions = questions.filter(q => q.category === category);
      const easyCount = categoryQuestions.filter(q => q.difficulty === 'easy').length;
      const mediumCount = categoryQuestions.filter(q => q.difficulty === 'medium').length;
      const hardCount = categoryQuestions.filter(q => q.difficulty === 'hard').length;
      
      return {
        name: category,
        count: categoryQuestions.length,
        easyCount,
        mediumCount,
        hardCount,
      };
    });
  } catch (error) {
    console.error('Kategori istatistikleri getirilirken hata:', error);
    return [];
  }
};

// Soruları kontrol et
export const checkQuestionsInStorage = async () => {
  try {
    const questions = await getAllQuestionsFromStorage();
    console.log(`📚 AsyncStorage'da toplam ${questions.length} soru bulundu`);
    
    const stats = getCategoryStatsFromStorage(questions);
    console.log('📊 Kategori istatistikleri:');
    stats.forEach(category => {
      console.log(`   ${category.name}: ${category.count} soru (Kolay: ${category.easyCount}, Orta: ${category.mediumCount}, Zor: ${category.hardCount})`);
    });
    
  } catch (error) {
    console.error('❌ Sorular kontrol edilirken hata oluştu:', error);
  }
};

// Soruları yeniden yükle
export const reloadQuestionsToStorage = async () => {
  try {
    console.log('Sorular yeniden yükleniyor...');
    const success = await loadQuestionsToStorage();
    
    if (success) {
      console.log('✅ Sorular başarıyla yeniden yüklendi!');
      await checkQuestionsInStorage();
    } else {
      console.error('❌ Sorular yeniden yüklenirken hata oluştu');
    }
    
    return success;
  } catch (error) {
    console.error('❌ Sorular yeniden yüklenirken hata oluştu:', error);
    return false;
  }
};
