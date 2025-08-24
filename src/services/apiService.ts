import { getApiBaseUrl, isMongoDbEnabled } from '../config/environment';
import { QuestionType } from './questionService';

// MongoDB API Base URL - Environment'dan al
const API_BASE_URL = getApiBaseUrl();

// API Response Types
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface QuestionsResponse extends ApiResponse<QuestionType[]> {
  data?: QuestionType[];
}

interface QuestionResponse extends ApiResponse<QuestionType> {
  data?: QuestionType;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Generic HTTP request method
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    try {
      // MongoDB kullanımı kapalıysa hata fırlat
      if (!isMongoDbEnabled()) {
        throw new Error('MongoDB API is disabled');
      }

      const url = `${this.baseURL}${endpoint}`;
      
      const defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
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
  }

  // Get all questions
  async getAllQuestions(): Promise<QuestionType[]> {
    try {
      const response = await this.request<QuestionsResponse>('/questions');
      
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch questions');
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching all questions:', error);
      throw error;
    }
  }

  // Get questions by exam type
  async getQuestionsByExamType(examType: 'TYT' | 'AYT' | 'YDT'): Promise<QuestionType[]> {
    try {
      const response = await this.request<QuestionsResponse>(`/questions/exam-type/${examType}`);
      
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch questions by exam type');
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching questions by exam type:', error);
      throw error;
    }
  }

  // Get questions by subject
  async getQuestionsBySubject(subject: string): Promise<QuestionType[]> {
    try {
      const response = await this.request<QuestionsResponse>(`/questions/subject/${encodeURIComponent(subject)}`);
      
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch questions by subject');
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching questions by subject:', error);
      throw error;
    }
  }

  // Get questions by topic
  async getQuestionsByTopic(topic: string): Promise<QuestionType[]> {
    try {
      const response = await this.request<QuestionsResponse>(`/questions/topic/${encodeURIComponent(topic)}`);
      
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch questions by topic');
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching questions by topic:', error);
      throw error;
    }
  }

  // Get past questions
  async getPastQuestions(): Promise<QuestionType[]> {
    try {
      const response = await this.request<QuestionsResponse>('/questions/past');
      
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch past questions');
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching past questions:', error);
      throw error;
    }
  }

  // Get past questions by year
  async getPastQuestionsByYear(year: number): Promise<QuestionType[]> {
    try {
      const response = await this.request<QuestionsResponse>(`/questions/past/year/${year}`);
      
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch past questions by year');
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching past questions by year:', error);
      throw error;
    }
  }

  // Get past questions by exam type
  async getPastQuestionsByExamType(examType: 'TYT' | 'AYT' | 'YDT'): Promise<QuestionType[]> {
    try {
      const response = await this.request<QuestionsResponse>(`/questions/past/exam-type/${examType}`);
      
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch past questions by exam type');
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching past questions by exam type:', error);
      throw error;
    }
  }

  // Get questions by difficulty
  async getQuestionsByDifficulty(difficulty: number): Promise<QuestionType[]> {
    try {
      const response = await this.request<QuestionsResponse>(`/questions/difficulty/${difficulty}`);
      
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch questions by difficulty');
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching questions by difficulty:', error);
      throw error;
    }
  }

  // Get random questions (for practice)
  async getRandomQuestions(count: number = 10): Promise<QuestionType[]> {
    try {
      const response = await this.request<QuestionsResponse>(`/questions/random?count=${count}`);
      
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch random questions');
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching random questions:', error);
      throw error;
    }
  }

  // Search questions by text
  async searchQuestions(searchTerm: string): Promise<QuestionType[]> {
    try {
      const response = await this.request<QuestionsResponse>(`/questions/search?q=${encodeURIComponent(searchTerm)}`);
      
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to search questions');
      }

      return response.data;
    } catch (error) {
      console.error('Error searching questions:', error);
      throw error;
    }
  }

  // Get question by ID
  async getQuestionById(id: string): Promise<QuestionType> {
    try {
      const response = await this.request<QuestionResponse>(`/questions/${id}`);
      
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch question');
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching question by ID:', error);
      throw error;
    }
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.request<ApiResponse<{ status: string }>>('/health');
      return response.success;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

// Singleton instance
const apiService = new ApiService();

export default apiService;
