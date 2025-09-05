import { getApiBaseUrl, isMongoDbEnabled } from '../config/environment';
import { CardCategory, MemoryCard } from './asyncStorageService';

// API Base URL - Environment'dan al
const API_BASE_URL = getApiBaseUrl();

// ==================== API TABANLI KART SERVİSLERİ ====================

// API Response Types
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface CardsResponse extends ApiResponse<MemoryCard[]> {
  data?: MemoryCard[];
}

interface CategoriesResponse extends ApiResponse<CardCategory[]> {
  data?: CardCategory[];
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

// Tüm kartları API'den getir
export const getAllCardsFromAPI = async (): Promise<MemoryCard[]> => {
  try {
    const response = await apiRequest<CardsResponse>('/cards');

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch cards');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching all cards from API:', error);
    throw error;
  }
};

// Kategoriye göre kartları API'den getir
export const getCardsByCategoryFromAPI = async (
  category: string
): Promise<MemoryCard[]> => {
  try {
    const response = await apiRequest<CardsResponse>(
      `/cards/category/${encodeURIComponent(category)}`
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch cards by category');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching cards by category from API:', error);
    throw error;
  }
};

// Kategori istatistiklerini API'den getir
export const getCategoryStatsFromAPI = async (): Promise<CardCategory[]> => {
  try {
    const response = await apiRequest<CategoriesResponse>('/cards/categories');

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch category stats');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching category stats from API:', error);
    throw error;
  }
};

// Zorluk seviyesine göre kartları API'den getir
export const getCardsByDifficultyFromAPI = async (
  difficulty: 'easy' | 'medium' | 'hard'
): Promise<MemoryCard[]> => {
  try {
    const response = await apiRequest<CardsResponse>(
      `/cards/difficulty/${difficulty}`
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch cards by difficulty');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching cards by difficulty from API:', error);
    throw error;
  }
};

// Rastgele kartları API'den getir
export const getRandomCardsFromAPI = async (
  count: number = 10
): Promise<MemoryCard[]> => {
  try {
    const response = await apiRequest<CardsResponse>(
      `/cards/random?count=${count}`
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch random cards');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching random cards from API:', error);
    throw error;
  }
};

// Kartları arama
export const searchCardsFromAPI = async (
  searchTerm: string
): Promise<MemoryCard[]> => {
  try {
    const response = await apiRequest<CardsResponse>(
      `/cards/search?q=${encodeURIComponent(searchTerm)}`
    );

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to search cards');
    }

    return response.data;
  } catch (error) {
    console.error('Error searching cards from API:', error);
    throw error;
  }
};

// API health check
export const checkAPIHealth = async (): Promise<boolean> => {
  try {
    const response =
      await apiRequest<ApiResponse<{ status: string }>>('/cards/health');
    return response.success;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

// ==================== HİBRİT SERVİS (API + FALLBACK) ====================

// Tüm kartları getir (API öncelikli, fallback AsyncStorage)
export const getAllCardsHybrid = async (): Promise<MemoryCard[]> => {
  try {
    // Önce API'yi dene
    if (isMongoDbEnabled()) {
      console.log("🔄 API'den kartlar getiriliyor...");
      const cards = await getAllCardsFromAPI();
      console.log(`✅ ${cards.length} kart API'den başarıyla getirildi`);
      return cards;
    }
  } catch (error) {
    console.warn(
      "⚠️ API'den kartlar getirilemedi, AsyncStorage'a geçiliyor:",
      error
    );
  }

  // API başarısız olursa AsyncStorage'dan getir
  try {
    console.log("🔄 AsyncStorage'dan kartlar getiriliyor...");
    const { getAllQuestionsFromStorage } = await import('./simpleCardsService');
    const cards = await getAllQuestionsFromStorage();
    console.log(`✅ ${cards.length} kart AsyncStorage'dan başarıyla getirildi`);
    return cards;
  } catch (error) {
    console.error("❌ AsyncStorage'dan da kartlar getirilemedi:", error);
    return [];
  }
};

// Kategoriye göre kartları getir (API öncelikli, fallback AsyncStorage)
export const getCardsByCategoryHybrid = async (
  category: string
): Promise<MemoryCard[]> => {
  try {
    // Önce API'yi dene
    if (isMongoDbEnabled()) {
      console.log(`🔄 API'den ${category} kategorisi kartları getiriliyor...`);
      const cards = await getCardsByCategoryFromAPI(category);
      console.log(
        `✅ ${cards.length} ${category} kartı API'den başarıyla getirildi`
      );
      return cards;
    }
  } catch (error) {
    console.warn(
      `⚠️ API'den ${category} kategorisi kartları getirilemedi, AsyncStorage'a geçiliyor:`,
      error
    );
  }

  // API başarısız olursa AsyncStorage'dan getir
  try {
    console.log(
      `🔄 AsyncStorage'dan ${category} kategorisi kartları getiriliyor...`
    );
    const { getQuestionsByCategoryFromStorage } = await import(
      './simpleCardsService'
    );
    const cards = await getQuestionsByCategoryFromStorage(category);
    console.log(
      `✅ ${cards.length} ${category} kartı AsyncStorage'dan başarıyla getirildi`
    );
    return cards;
  } catch (error) {
    console.error(
      `❌ AsyncStorage'dan da ${category} kategorisi kartları getirilemedi:`,
      error
    );
    return [];
  }
};

// Kategori istatistiklerini getir (API öncelikli, fallback AsyncStorage)
export const getCategoryStatsHybrid = async (): Promise<CardCategory[]> => {
  try {
    // Önce API'yi dene
    if (isMongoDbEnabled()) {
      console.log("🔄 API'den kategori istatistikleri getiriliyor...");
      const stats = await getCategoryStatsFromAPI();
      console.log(
        `✅ ${stats.length} kategori istatistiği API'den başarıyla getirildi`
      );
      return stats;
    }
  } catch (error) {
    console.warn(
      "⚠️ API'den kategori istatistikleri getirilemedi, AsyncStorage'a geçiliyor:",
      error
    );
  }

  // API başarısız olursa AsyncStorage'dan getir
  try {
    console.log("🔄 AsyncStorage'dan kategori istatistikleri getiriliyor...");
    const { getAllQuestionsFromStorage, getCategoryStatsFromStorage } =
      await import('./simpleCardsService');
    const allQuestions = await getAllQuestionsFromStorage();
    const stats = getCategoryStatsFromStorage(allQuestions);
    console.log(
      `✅ ${stats.length} kategori istatistiği AsyncStorage'dan başarıyla getirildi`
    );
    return stats;
  } catch (error) {
    console.error(
      "❌ AsyncStorage'dan da kategori istatistikleri getirilemedi:",
      error
    );
    return [];
  }
};
