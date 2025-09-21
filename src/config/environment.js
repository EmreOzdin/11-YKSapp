// Environment Configuration
// Bu dosyayı kendi MongoDB API adresinize göre güncelleyin

const ENVIRONMENT = {
  // MongoDB Configuration
  MONGODB: {
    // MongoDB Atlas bağlantı URI'si (kendi URI'nizi buraya yazın)
    URI: process.env.MONGODB_URI || 'mongodb+srv://username:password@cluster.mongodb.net/yksapp?retryWrites=true&w=majority',
    DATABASE_NAME: 'yksapp',
  },

  // MongoDB API Configuration
  MONGODB_API: {
    // MongoDB Atlas App Services (Realm) için örnek URL:
    // BASE_URL: 'https://data.mongodb-api.com/app/YOUR_APP_ID/endpoint/data/v1/action',

    // MongoDB Atlas Data API için örnek URL:
    // BASE_URL: 'https://cloud.mongodb.com/api/atlas/v1.0/groups/YOUR_GROUP_ID/clusters/YOUR_CLUSTER_NAME',

    // Kendi sunucunuz için örnek URL:
    // BASE_URL: 'https://your-server.com/api',

    // Şu anki URL'yi kendi API adresinizle değiştirin:
    BASE_URL: 'http://10.0.2.2:3000/api', // Android emülatörü için

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
const DEV_ENVIRONMENT = {
  ...ENVIRONMENT,
  MONGODB_API: {
    ...ENVIRONMENT.MONGODB_API,
    BASE_URL: 'http://10.0.2.2:3000/api', // Android emülatörü için
  },
  FEATURES: {
    ...ENVIRONMENT.FEATURES,
    DEBUG_MODE: true,
  },
};

// Production Environment
const PROD_ENVIRONMENT = {
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
const isDevelopment = process.env.NODE_ENV !== 'production';
const isProduction = !isDevelopment;

// Export current environment
const CURRENT_ENVIRONMENT = isProduction ? PROD_ENVIRONMENT : DEV_ENVIRONMENT;

// Helper functions
const getApiBaseUrl = () => {
  return CURRENT_ENVIRONMENT.MONGODB_API.BASE_URL;
};

const isMongoDbEnabled = () => {
  return CURRENT_ENVIRONMENT.FEATURES.USE_MONGODB;
};

const isOfflineModeEnabled = () => {
  return CURRENT_ENVIRONMENT.FEATURES.OFFLINE_MODE;
};

const isCacheEnabled = () => {
  return CURRENT_ENVIRONMENT.FEATURES.CACHE_ENABLED;
};

const isDebugMode = () => {
  return CURRENT_ENVIRONMENT.FEATURES.DEBUG_MODE || false;
};

module.exports = {
  ENVIRONMENT,
  DEV_ENVIRONMENT,
  PROD_ENVIRONMENT,
  CURRENT_ENVIRONMENT,
  getApiBaseUrl,
  isMongoDbEnabled,
  isOfflineModeEnabled,
  isCacheEnabled,
  isDebugMode
};
