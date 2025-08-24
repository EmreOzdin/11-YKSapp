# MongoDB Kurulum Rehberi

Bu rehber, YKS App'in MongoDB ile entegrasyonu için gerekli adımları açıklar.

## 📋 Gereksinimler

- MongoDB Atlas hesabı (ücretsiz)
- Veya kendi MongoDB sunucunuz
- API endpoint'leri

## 🚀 Kurulum Adımları

### 1. MongoDB Atlas Kurulumu (Önerilen)

#### 1.1 MongoDB Atlas Hesabı Oluşturma

1. [MongoDB Atlas](https://www.mongodb.com/atlas) sitesine gidin
2. Ücretsiz hesap oluşturun
3. Yeni bir cluster oluşturun (M0 Free tier önerilir)

#### 1.2 Database ve Collection Oluşturma

1. Atlas Dashboard'da "Browse Collections" tıklayın
2. "Create Database" butonuna tıklayın
3. Database adı: `yksapp`
4. Collection adı: `questions`
5. "Create" butonuna tıklayın

#### 1.3 API Key Oluşturma

1. Atlas Dashboard'da "Access Manager" > "API Keys" gidin
2. "Create API Key" butonuna tıklayın
3. API Key adı: `yksapp-api`
4. Permissions: "Read and write to any database"
5. API Key'i kaydedin

### 2. Soruları MongoDB'ye Yükleme

#### 2.1 MongoDB Compass ile Manuel Yükleme

1. [MongoDB Compass](https://www.mongodb.com/products/compass) indirin
2. Atlas connection string'inizi kullanarak bağlanın
3. `yksapp.questions` collection'ını açın
4. `sampleData.ts` dosyasındaki soruları JSON formatında yükleyin

#### 2.2 Script ile Otomatik Yükleme

```javascript
// upload-questions.js
const { MongoClient } = require('mongodb');
const sampleData = require('./src/services/sampleData');

const uri = "mongodb+srv://username:password@cluster.mongodb.net/yksapp";
const client = new MongoClient(uri);

async function uploadQuestions() {
  try {
    await client.connect();
    const database = client.db('yksapp');
    const collection = database.collection('questions');
    
    // Mevcut soruları temizle
    await collection.deleteMany({});
    
    // Yeni soruları ekle
    const result = await collection.insertMany(sampleData);
    console.log(`${result.insertedCount} soru yüklendi`);
  } finally {
    await client.close();
  }
}

uploadQuestions().catch(console.error);
```

### 3. API Endpoint'leri Oluşturma

#### 3.1 MongoDB Atlas App Services (Realm) Kullanımı

1. Atlas Dashboard'da "App Services" gidin
2. "Build a new app" tıklayın
3. App adı: `yksapp-api`
4. "Create app" tıklayın

#### 3.2 Endpoint'leri Tanımlama

```javascript
// Endpoints/Questions.js
exports = async function(payload, response) {
  const { action, examType, subject, topic, year, difficulty } = payload.query;
  
  const collection = context.services.get("mongodb-atlas").db("yksapp").collection("questions");
  
  let query = {};
  
  switch(action) {
    case 'getAll':
      break;
    case 'getByExamType':
      query.examType = examType;
      break;
    case 'getBySubject':
      query.subject = subject;
      break;
    case 'getPastQuestions':
      query.isPastQuestion = true;
      break;
    case 'getPastQuestionsByYear':
      query.isPastQuestion = true;
      query.year = parseInt(year);
      break;
  }
  
  const questions = await collection.find(query).toArray();
  
  return {
    success: true,
    data: questions
  };
};
```

### 4. Uygulama Konfigürasyonu

#### 4.1 Environment Dosyasını Güncelleme

`mobile/src/config/environment.ts` dosyasında API URL'sini güncelleyin:

```typescript
MONGODB_API: {
  // MongoDB Atlas App Services için:
  BASE_URL: 'https://data.mongodb-api.com/app/YOUR_APP_ID/endpoint/data/v1/action',
  
  // Veya kendi sunucunuz için:
  // BASE_URL: 'https://your-server.com/api',
}
```

#### 4.2 API Key'i Güvenli Şekilde Saklama

```typescript
// mobile/src/config/secrets.ts (gitignore'a ekleyin)
export const MONGODB_API_KEY = 'your-api-key-here';
```

### 5. Test Etme

#### 5.1 API Bağlantısını Test Etme

```typescript
import apiService from '../services/apiService';

// Test fonksiyonu
async function testMongoDBConnection() {
  try {
    const questions = await apiService.getAllQuestions();
    console.log(`${questions.length} soru başarıyla yüklendi`);
    return true;
  } catch (error) {
    console.error('MongoDB bağlantı hatası:', error);
    return false;
  }
}
```

#### 5.2 Offline Mode Test Etme

```typescript
// MongoDB kapalıyken local storage'dan soruları al
import { QuestionService } from '../services/questionService';

async function testOfflineMode() {
  const questions = await QuestionService.getAllQuestions();
  console.log('Offline mode çalışıyor:', questions.length > 0);
}
```

## 🔧 Sorun Giderme

### Yaygın Hatalar

#### 1. "MongoDB API is disabled" Hatası

**Çözüm:** `environment.ts` dosyasında `USE_MONGODB: true` olduğundan emin olun.

#### 2. "HTTP error! status: 401" Hatası

**Çözüm:** API key'inizin doğru olduğundan ve gerekli izinlere sahip olduğundan emin olun.

#### 3. "Network request failed" Hatası

**Çözüm:**

- İnternet bağlantınızı kontrol edin
- API URL'sinin doğru olduğundan emin olun
- Firewall ayarlarını kontrol edin

#### 4. "No questions found" Hatası

**Çözüm:**

- MongoDB'de soruların yüklü olduğundan emin olun
- Collection adının `questions` olduğunu kontrol edin
- Database adının `yksapp` olduğunu kontrol edin

## 📊 Performans Optimizasyonu

### 1. Caching

```typescript
// Soruları cache'leme
const CACHE_KEY = 'questions_cache';
const CACHE_TTL = 3600000; // 1 saat

async function getCachedQuestions() {
  const cached = await AsyncStorage.getItem(CACHE_KEY);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TTL) {
      return data;
    }
  }
  return null;
}
```

### 2. Pagination

```typescript
// Sayfalama ile soruları alma
async function getQuestionsWithPagination(page = 1, limit = 20) {
  const skip = (page - 1) * limit;
  return await apiService.getQuestionsWithPagination(skip, limit);
}
```

## 🔒 Güvenlik

### 1. API Key Güvenliği

- API key'leri asla client-side kodda saklamayın
- Environment variables kullanın
- API key'leri düzenli olarak yenileyin

### 2. Rate Limiting

```typescript
// Rate limiting implementasyonu
class RateLimiter {
  private requests: number = 0;
  private lastReset: number = Date.now();
  
  async checkLimit(): Promise<boolean> {
    const now = Date.now();
    if (now - this.lastReset > 60000) { // 1 dakika
      this.requests = 0;
      this.lastReset = now;
    }
    
    if (this.requests >= 100) { // Dakikada max 100 istek
      return false;
    }
    
    this.requests++;
    return true;
  }
}
```

## 📱 Offline Desteği

### 1. Local Storage Sync

```typescript
// Offline veri senkronizasyonu
async function syncOfflineData() {
  const offlineQuestions = await AsyncStorage.getItem('offline_questions');
  if (offlineQuestions) {
    // Online olduğunda verileri senkronize et
    await apiService.syncQuestions(JSON.parse(offlineQuestions));
  }
}
```

### 2. Background Sync

```typescript
// Arka plan senkronizasyonu
import BackgroundFetch from 'react-native-background-fetch';

BackgroundFetch.configure({
  minimumFetchInterval: 15, // 15 dakika
  stopOnTerminate: false,
  enableHeadless: true,
}, async (taskId) => {
  await syncOfflineData();
  BackgroundFetch.finish(taskId);
});
```

## 🎯 Sonraki Adımlar

1. **Analytics Ekleme**: Kullanıcı davranışlarını takip etme
2. **Real-time Updates**: WebSocket ile gerçek zamanlı güncellemeler
3. **Advanced Filtering**: Gelişmiş filtreleme özellikleri
4. **Performance Monitoring**: Performans izleme ve optimizasyon

## 📞 Destek

Herhangi bir sorunla karşılaşırsanız:

1. Bu rehberi tekrar gözden geçirin
2. MongoDB Atlas dokümantasyonunu inceleyin
3. GitHub Issues'da sorun bildirin

---

**Not:** Bu rehber MongoDB Atlas kullanımını temel alır. Kendi MongoDB sunucunuzu kullanıyorsanız, ilgili adımları kendi kurulumunuza göre uyarlayın.
