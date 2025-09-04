import Realm from 'realm';

// Soru şeması
export class Question extends Realm.Object {
  static schema = {
    name: 'Question',
    primaryKey: 'id',
    properties: {
      id: 'string',
      category: 'string',
      question: 'string',
      answer: 'string',
      difficulty: 'string',
      explanation: 'string',
      tags: 'string[]',
      createdAt: 'date',
      updatedAt: 'date',
    },
  };
}

// Realm konfigürasyonu
export const realmConfig: Realm.Configuration = {
  schema: [Question],
  schemaVersion: 1,
  deleteRealmIfMigrationNeeded: true, // React Native için güvenli
  onMigration: (oldRealm: Realm, newRealm: Realm) => {
    // Gelecekte şema değişiklikleri için migration
  },
};

// Realm instance'ı oluştur - lazy loading ile
let realmInstance: Realm | null = null;

export const getRealm = (): Realm => {
  if (!realmInstance) {
    try {
      realmInstance = new Realm(realmConfig);
      console.log('✅ Realm instance başarıyla oluşturuldu');
    } catch (error) {
      console.error('❌ Realm instance oluşturulurken hata:', error);
      throw error;
    }
  }
  return realmInstance;
};

// Realm'i kapat
export const closeRealm = () => {
  if (realmInstance) {
    realmInstance.close();
    realmInstance = null;
    console.log('✅ Realm instance kapatıldı');
  }
};

// Soru ekleme fonksiyonu
export const addQuestion = (questionData: {
  id: string;
  category: string;
  question: string;
  answer: string;
  difficulty: string;
  explanation: string;
  tags: string[];
}) => {
  try {
    const realm = getRealm();
    realm.write(() => {
      realm.create('Question', {
        ...questionData,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });
    return true;
  } catch (error) {
    console.error('Soru eklenirken hata:', error);
    return false;
  }
};

// Tüm soruları getir
export const getAllQuestions = () => {
  try {
    const realm = getRealm();
    return realm.objects('Question').sorted('createdAt');
  } catch (error) {
    console.error('Sorular getirilirken hata:', error);
    return [];
  }
};

// Kategoriye göre soruları getir
export const getQuestionsByCategory = (category: string) => {
  try {
    const realm = getRealm();
    return realm.objects('Question').filtered('category == $0', category).sorted('createdAt');
  } catch (error) {
    console.error('Kategori soruları getirilirken hata:', error);
    return [];
  }
};

// Kategori istatistiklerini getir
export const getCategoryStats = () => {
  try {
    const realm = getRealm();
    const questions = realm.objects('Question');
    const categories = ['Matematik', 'Fizik', 'Kimya', 'Biyoloji', 'Türkçe', 'Tarih'];
    
    return categories.map(category => {
      const categoryQuestions = questions.filtered('category == $0', category);
      const easyCount = categoryQuestions.filtered('difficulty == "easy"').length;
      const mediumCount = categoryQuestions.filtered('difficulty == "medium"').length;
      const hardCount = categoryQuestions.filtered('difficulty == "hard"').length;
      
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

// Tüm soruları temizle
export const clearAllQuestions = () => {
  try {
    const realm = getRealm();
    realm.write(() => {
      realm.delete(realm.objects('Question'));
    });
    return true;
  } catch (error) {
    console.error('Sorular temizlenirken hata:', error);
    return false;
  }
};

// Çoklu soru ekleme
export const addManyQuestions = (questionsData: Array<{
  id: string;
  category: string;
  question: string;
  answer: string;
  difficulty: string;
  explanation: string;
  tags: string[];
}>) => {
  try {
    const realm = getRealm();
    realm.write(() => {
      questionsData.forEach(questionData => {
        realm.create('Question', {
          ...questionData,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      });
    });
    return true;
  } catch (error) {
    console.error('Çoklu soru eklenirken hata:', error);
    return false;
  }
};
