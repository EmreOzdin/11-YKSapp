// Environment Configuration
// Bu dosyayı kendi MongoDB API adresinize göre güncelleyin

export const ENVIRONMENT = {
  // MongoDB API Configuration
  MONGODB_API: {
    // MongoDB Atlas App Services (Realm) için örnek URL:
    // BASE_URL: 'https://data.mongodb-api.com/app/YOUR_APP_ID/endpoint/data/v1/action',

    // MongoDB Atlas Data API için örnek URL:
    // BASE_URL: 'https://cloud.mongodb.com/api/atlas/v1.0/groups/YOUR_GROUP_ID/clusters/YOUR_CLUSTER_NAME',

    // Kendi sunucunuz için örnek URL:
    // BASE_URL: 'https://your-server.com/api',

    // Şu anki URL'yi kendi API adresinizle değiştirin:
    BASE_URL: 'http://localhost:3000/api',

    TIMEOUT: 10000, // 10 saniye
    RETRY_ATTEMPTS: 3,
  },

  // App Configuration
  APP: {
    NAME: 'YKS App',
    VERSION: '1.0.0',
    BUILD_NUMBER: '1',
  },

  // Feature Flags
  FEATURES: {
    USE_MONGODB: true, // MongoDB kullanımını açıp kapatmak için
    OFFLINE_MODE: true, // Offline mod desteği
    CACHE_ENABLED: true, // Cache desteği
  },

  // Cache Configuration
  CACHE: {
    QUESTIONS_TTL: 3600000, // 1 saat (milisaniye)
    USER_DATA_TTL: 86400000, // 24 saat (milisaniye)
  },
};

// Development Environment
export const DEV_ENVIRONMENT = {
  ...ENVIRONMENT,
  MONGODB_API: {
    ...ENVIRONMENT.MONGODB_API,
    BASE_URL: 'http://localhost:3000/api', // Local development için
  },
  FEATURES: {
    ...ENVIRONMENT.FEATURES,
    DEBUG_MODE: true,
  },
};

// Production Environment
export const PROD_ENVIRONMENT = {
  ...ENVIRONMENT,
  MONGODB_API: {
    ...ENVIRONMENT.MONGODB_API,
    BASE_URL: 'https://your-production-api-url.com/api', // Production API URL
  },
  FEATURES: {
    ...ENVIRONMENT.FEATURES,
    DEBUG_MODE: false,
  },
};

// Environment detection
const isDevelopment = __DEV__;
const isProduction = !isDevelopment;

// Export current environment
export const CURRENT_ENVIRONMENT = isProduction ? PROD_ENVIRONMENT : DEV_ENVIRONMENT;

// Helper functions
export const getApiBaseUrl = (): string => {
  return CURRENT_ENVIRONMENT.MONGODB_API.BASE_URL;
};

export const isMongoDbEnabled = (): boolean => {
  return CURRENT_ENVIRONMENT.FEATURES.USE_MONGODB;
};

export const isOfflineModeEnabled = (): boolean => {
  return CURRENT_ENVIRONMENT.FEATURES.OFFLINE_MODE;
};

export const isCacheEnabled = (): boolean => {
  return CURRENT_ENVIRONMENT.FEATURES.CACHE_ENABLED;
};

export const isDebugMode = (): boolean => {
  return CURRENT_ENVIRONMENT.FEATURES.DEBUG_MODE || false;
};
