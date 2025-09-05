import { getApiBaseUrl, isMongoDbEnabled } from '../config/environment';

// API Base URL - Environment'dan al
const API_BASE_URL = getApiBaseUrl();

// Kullanıcı etkileşim tipleri
export type InteractionType = 
  | 'card_viewed'        // Kart görüntülendi
  | 'card_flipped'       // Kart çevrildi
  | 'explanation_viewed' // Açıklama görüntülendi
  | 'explanation_hidden' // Açıklama gizlendi
  | 'category_selected'  // Kategori seçildi
  | 'card_swiped'        // Kart kaydırıldı
  | 'session_started'    // Oturum başladı
  | 'session_ended';     // Oturum bitti

// Kullanıcı etkileşim veri yapısı
export interface UserInteraction {
  id: string;
  userId?: string;           // Kullanıcı ID'si (opsiyonel)
  sessionId: string;         // Oturum ID'si
  interactionType: InteractionType;
  cardId?: string;           // Kart ID'si (kart etkileşimleri için)
  category?: string;         // Kategori (kategori seçimi için)
  timestamp: Date;           // Etkileşim zamanı
  metadata?: {               // Ek bilgiler
    cardIndex?: number;      // Kart sırası
    totalCards?: number;     // Toplam kart sayısı
    difficulty?: string;     // Kart zorluk seviyesi
    timeSpent?: number;      // Harcanan süre (milisaniye)
    swipeDirection?: 'left' | 'right'; // Kaydırma yönü
  };
}

// API Response Types
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface InteractionResponse extends ApiResponse<UserInteraction> {
  data?: UserInteraction;
}

// Generic HTTP request method
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    // MongoDB kullanımı kapalıysa hata fırlat
    if (!isMongoDbEnabled()) {
      throw new Error('MongoDB API is disabled');
    }

    const url = `${API_BASE_URL}${endpoint}`;

    const defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Benzersiz ID oluştur
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Oturum ID'si oluştur
const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Kullanıcı etkileşimini MongoDB'ye gönder
export const sendUserInteraction = async (
  interaction: Omit<UserInteraction, 'id' | 'timestamp'>
): Promise<boolean> => {
  try {
    // API endpoint'i mevcut değilse hata fırlat
    if (!isMongoDbEnabled()) {
      throw new Error('MongoDB API is disabled');
    }

    const fullInteraction: UserInteraction = {
      ...interaction,
      id: generateId(),
      timestamp: new Date(),
    };

    const response = await apiRequest<InteractionResponse>('/user-interactions', {
      method: 'POST',
      body: JSON.stringify(fullInteraction),
    });

    if (!response.success) {
      throw new Error(response.error || 'Failed to send user interaction');
    }

    console.log(`✅ Kullanıcı etkileşimi gönderildi: ${interaction.interactionType}`);
    return true;
  } catch (error) {
    console.error('❌ Kullanıcı etkileşimi gönderilirken hata:', error);
    return false;
  }
};

// Toplu kullanıcı etkileşimlerini gönder
export const sendBulkUserInteractions = async (
  interactions: Omit<UserInteraction, 'id' | 'timestamp'>[]
): Promise<boolean> => {
  try {
    const fullInteractions: UserInteraction[] = interactions.map(interaction => ({
      ...interaction,
      id: generateId(),
      timestamp: new Date(),
    }));

    const response = await apiRequest<ApiResponse<{ count: number }>>('/user-interactions/bulk', {
      method: 'POST',
      body: JSON.stringify({ interactions: fullInteractions }),
    });

    if (!response.success) {
      throw new Error(response.error || 'Failed to send bulk user interactions');
    }

    console.log(`✅ ${fullInteractions.length} kullanıcı etkileşimi toplu olarak gönderildi`);
    return true;
  } catch (error) {
    console.error('❌ Toplu kullanıcı etkileşimleri gönderilirken hata:', error);
    return false;
  }
};

// Kullanıcı etkileşimlerini getir
export const getUserInteractions = async (
  sessionId?: string,
  userId?: string,
  limit: number = 100
): Promise<UserInteraction[]> => {
  try {
    let endpoint = `/user-interactions?limit=${limit}`;
    if (sessionId) endpoint += `&sessionId=${sessionId}`;
    if (userId) endpoint += `&userId=${userId}`;

    const response = await apiRequest<ApiResponse<UserInteraction[]>>(endpoint);

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch user interactions');
    }

    return response.data;
  } catch (error) {
    console.error('❌ Kullanıcı etkileşimleri getirilirken hata:', error);
    return [];
  }
};

// Kullanıcı istatistiklerini getir
export const getUserStats = async (
  sessionId?: string,
  userId?: string
): Promise<{
  totalInteractions: number;
  cardsViewed: number;
  cardsFlipped: number;
  explanationsViewed: number;
  categoriesSelected: number;
  averageTimePerCard: number;
  mostActiveCategory: string;
  sessionDuration: number;
}> => {
  try {
    let endpoint = '/user-interactions/stats';
    if (sessionId) endpoint += `?sessionId=${sessionId}`;
    if (userId) endpoint += `${sessionId ? '&' : '?'}userId=${userId}`;

    const response = await apiRequest<ApiResponse<any>>(endpoint);

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch user stats');
    }

    return response.data;
  } catch (error) {
    console.error('❌ Kullanıcı istatistikleri getirilirken hata:', error);
    return {
      totalInteractions: 0,
      cardsViewed: 0,
      cardsFlipped: 0,
      explanationsViewed: 0,
      categoriesSelected: 0,
      averageTimePerCard: 0,
      mostActiveCategory: '',
      sessionDuration: 0,
    };
  }
};

// ==================== HİBRİT SERVİS (API + LOCAL STORAGE) ====================

// Local storage için etkileşimleri sakla
const storeInteractionLocally = async (interaction: UserInteraction): Promise<void> => {
  try {
    const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
    const key = 'user_interactions';
    const existing = await AsyncStorage.getItem(key);
    const interactions = existing ? JSON.parse(existing) : [];
    
    interactions.push(interaction);
    
    // Son 1000 etkileşimi sakla
    const recentInteractions = interactions.slice(-1000);
    await AsyncStorage.setItem(key, JSON.stringify(recentInteractions));
  } catch (error) {
    console.error('❌ Etkileşim local storage\'a kaydedilirken hata:', error);
  }
};

// Local storage'dan etkileşimleri getir
const getLocalInteractions = async (): Promise<UserInteraction[]> => {
  try {
    const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
    const key = 'user_interactions';
    const existing = await AsyncStorage.getItem(key);
    return existing ? JSON.parse(existing) : [];
  } catch (error) {
    console.error('❌ Local etkileşimler getirilirken hata:', error);
    return [];
  }
};

// Local storage'dan etkileşimleri temizle
const clearLocalInteractions = async (): Promise<void> => {
  try {
    const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
    await AsyncStorage.removeItem('user_interactions');
  } catch (error) {
    console.error('❌ Local etkileşimler temizlenirken hata:', error);
  }
};

// Hibrit etkileşim gönderme (API öncelikli, local storage fallback)
export const sendUserInteractionHybrid = async (
  interaction: Omit<UserInteraction, 'id' | 'timestamp'>
): Promise<boolean> => {
  try {
    const fullInteraction: UserInteraction = {
      ...interaction,
      id: generateId(),
      timestamp: new Date(),
    };

    // Önce API'ye gönder (sadece MongoDB aktifse)
    if (isMongoDbEnabled()) {
      try {
        const success = await sendUserInteraction(interaction);
        if (success) {
          return true;
        }
      } catch (apiError) {
        console.warn('⚠️ API\'ye gönderilemedi, local storage\'a kaydediliyor:', apiError);
      }
    }

    // API başarısız olursa veya kapalıysa local storage'a kaydet
    try {
      await storeInteractionLocally(fullInteraction);
      console.log(`📱 Etkileşim local storage'a kaydedildi: ${interaction.interactionType}`);
      return true;
    } catch (storageError) {
      console.error('❌ Local storage\'a da kaydedilemedi:', storageError);
      return false;
    }
  } catch (error) {
    console.error('❌ Hibrit etkileşim gönderilirken hata:', error);
    return false;
  }
};

// Local storage'daki etkileşimleri API'ye gönder
export const syncLocalInteractionsToAPI = async (): Promise<boolean> => {
  try {
    const localInteractions = await getLocalInteractions();
    
    if (localInteractions.length === 0) {
      console.log('📱 Senkronize edilecek local etkileşim yok');
      return true;
    }

    if (!isMongoDbEnabled()) {
      console.log('⚠️ MongoDB API kapalı, senkronizasyon atlandı');
      return false;
    }

    try {
      const success = await sendBulkUserInteractions(localInteractions);
      
      if (success) {
        await clearLocalInteractions();
        console.log(`✅ ${localInteractions.length} local etkileşim API'ye senkronize edildi`);
        return true;
      } else {
        console.log('⚠️ API\'ye senkronizasyon başarısız, local etkileşimler korundu');
        return false;
      }
    } catch (apiError) {
      console.warn('⚠️ API senkronizasyonu başarısız:', apiError);
      return false;
    }
  } catch (error) {
    console.error('❌ Local etkileşimler senkronize edilirken hata:', error);
    return false;
  }
};

// ==================== YARDIMCI FONKSİYONLAR ====================

// Oturum ID'si oluştur
export const createSessionId = (): string => {
  return generateSessionId();
};

// Kart görüntüleme etkileşimi
export const trackCardView = async (
  sessionId: string,
  cardId: string,
  cardIndex: number,
  totalCards: number,
  difficulty: string,
  timeSpent?: number
): Promise<boolean> => {
  return await sendUserInteractionHybrid({
    sessionId,
    interactionType: 'card_viewed',
    cardId,
    metadata: {
      cardIndex,
      totalCards,
      difficulty,
      timeSpent,
    },
  });
};

// Kart çevirme etkileşimi
export const trackCardFlip = async (
  sessionId: string,
  cardId: string,
  cardIndex: number,
  totalCards: number,
  difficulty: string
): Promise<boolean> => {
  return await sendUserInteractionHybrid({
    sessionId,
    interactionType: 'card_flipped',
    cardId,
    metadata: {
      cardIndex,
      totalCards,
      difficulty,
    },
  });
};

// Açıklama görüntüleme etkileşimi
export const trackExplanationView = async (
  sessionId: string,
  cardId: string,
  cardIndex: number,
  totalCards: number,
  difficulty: string
): Promise<boolean> => {
  return await sendUserInteractionHybrid({
    sessionId,
    interactionType: 'explanation_viewed',
    cardId,
    metadata: {
      cardIndex,
      totalCards,
      difficulty,
    },
  });
};

// Kategori seçimi etkileşimi
export const trackCategorySelection = async (
  sessionId: string,
  category: string
): Promise<boolean> => {
  return await sendUserInteractionHybrid({
    sessionId,
    interactionType: 'category_selected',
    category,
  });
};

// Kart kaydırma etkileşimi
export const trackCardSwipe = async (
  sessionId: string,
  cardId: string,
  cardIndex: number,
  totalCards: number,
  difficulty: string,
  swipeDirection: 'left' | 'right'
): Promise<boolean> => {
  return await sendUserInteractionHybrid({
    sessionId,
    interactionType: 'card_swiped',
    cardId,
    metadata: {
      cardIndex,
      totalCards,
      difficulty,
      swipeDirection,
    },
  });
};

// Oturum başlatma etkileşimi
export const trackSessionStart = async (sessionId: string): Promise<boolean> => {
  return await sendUserInteractionHybrid({
    sessionId,
    interactionType: 'session_started',
  });
};

// Oturum bitirme etkileşimi
export const trackSessionEnd = async (sessionId: string): Promise<boolean> => {
  return await sendUserInteractionHybrid({
    sessionId,
    interactionType: 'session_ended',
  });
};
