# MongoDB Atlas App Services API Kurulum Rehberi

Bu rehber, MongoDB Atlas App Services kullanarak API endpoint'leri oluşturmayı açıklar.

## 📋 Gereksinimler

- ✅ MongoDB Atlas hesabı
- ✅ `yksapp` database'i oluşturulmuş
- ✅ `questions` collection'ında sorular var

## 🚀 Adım Adım Kurulum

### Adım 1: MongoDB Atlas App Services'e Giriş

1. **MongoDB Atlas Dashboard**'a gidin
2. Sol menüden **"App Services"** tıklayın
3. **"Build a new app"** butonuna tıklayın
4. App adı: `yksapp-api` yazın
5. **"Create app"** tıklayın

### Adım 2: Database Bağlantısı

1. **"Link a data source"** tıklayın
2. **"MongoDB Atlas"** seçin
3. **"yksapp"** database'ini seçin
4. **"Link"** tıklayın

### Adım 3: Endpoint'leri Oluşturma

#### 3.1 Endpoints Klasörü Oluşturma

1. Sol menüden **"Functions"** tıklayın
2. **"Create Function"** tıklayın
3. Function adı: `getAllQuestions` yazın
4. **"Create"** tıklayın

#### 3.2 İlk Endpoint Kodu

Aşağıdaki kodu function editörüne yapıştırın:

```javascript
exports = async function(payload, response) {
  const collection = context.services.get("mongodb-atlas").db("yksapp").collection("questions");
  
  try {
    const questions = await collection.find({}).toArray();
    
    return {
      success: true,
      data: questions,
      count: questions.length
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};
```

#### 3.3 Endpoint'i Yayınlama

1. **"Deploy"** tıklayın
2. **"HTTP Endpoints"** sekmesine gidin
3. **"Create HTTP Endpoint"** tıklayın
4. Endpoint adı: `getAllQuestions`
5. HTTP Method: `GET`
6. Route: `/questions`
7. **"Create"** tıklayın

### Adım 4: Diğer Endpoint'leri Oluşturma

Aynı şekilde diğer endpoint'leri de oluşturun:

#### 4.1 Sınav Tipine Göre Sorular

**Function Adı:** `getQuestionsByExamType`
**Route:** `/questions/exam-type/{examType}`
**Method:** `GET`

```javascript
exports = async function(payload, response) {
  const { examType } = payload.query;
  const collection = context.services.get("mongodb-atlas").db("yksapp").collection("questions");
  
  try {
    const questions = await collection.find({ examType: examType }).toArray();
    
    return {
      success: true,
      data: questions,
      count: questions.length
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};
```

#### 4.2 Çıkmış Sorular

**Function Adı:** `getPastQuestions`
**Route:** `/questions/past`
**Method:** `GET`

```javascript
exports = async function(payload, response) {
  const collection = context.services.get("mongodb-atlas").db("yksapp").collection("questions");
  
  try {
    const questions = await collection.find({ isPastQuestion: true }).toArray();
    
    return {
      success: true,
      data: questions,
      count: questions.length
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};
```

#### 4.3 Sağlık Kontrolü

**Function Adı:** `healthCheck`
**Route:** `/health`
**Method:** `GET`

```javascript
exports = async function(payload, response) {
  try {
    const collection = context.services.get("mongodb-atlas").db("yksapp").collection("questions");
    const count = await collection.countDocuments();
    
    return {
      success: true,
      status: "healthy",
      message: "MongoDB connection successful",
      questionCount: count
    };
  } catch (error) {
    return {
      success: false,
      status: "unhealthy",
      error: error.message
    };
  }
};
```

### Adım 5: API URL'sini Alma

1. **"HTTP Endpoints"** sekmesine gidin
2. Endpoint'lerin yanındaki **"Copy URL"** butonuna tıklayın
3. Base URL'yi kopyalayın (örnek: `https://data.mongodb-api.com/app/YOUR_APP_ID/endpoint/data/v1/action`)

### Adım 6: Uygulama Konfigürasyonu

`mobile/src/config/environment.ts` dosyasını güncelleyin:

```typescript
MONGODB_API: {
  BASE_URL: 'https://data.mongodb-api.com/app/YOUR_APP_ID/endpoint/data/v1/action',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
},

FEATURES: {
  USE_MONGODB: true, // MongoDB'yi aktif et
  OFFLINE_MODE: true,
  CACHE_ENABLED: true,
},
```

## 🧪 Test Etme

### 1. Sağlık Kontrolü

```bash
curl https://data.mongodb-api.com/app/YOUR_APP_ID/endpoint/data/v1/action/health
```

### 2. Tüm Soruları Getir

```bash
curl https://data.mongodb-api.com/app/YOUR_APP_ID/endpoint/data/v1/action/questions
```

### 3. TYT Sorularını Getir

```bash
curl "https://data.mongodb-api.com/app/YOUR_APP_ID/endpoint/data/v1/action/questions/exam-type/TYT"
```

## 📊 Beklenen Yanıtlar

### Başarılı Yanıt

```json
{
  "success": true,
  "data": [...],
  "count": 17
}
```

### Hata Yanıtı

```json
{
  "success": false,
  "error": "Error message"
}
```

## 🔧 Sorun Giderme

### Hata 1: "Function not found"

**Çözüm:** Function'ı doğru oluşturduğunuzdan ve deploy ettiğinizden emin olun.

### Hata 2: "Database not linked"

**Çözüm:** Database bağlantısını kontrol edin.

### Hata 3: "Collection not found"

**Çözüm:** `questions` collection'ının var olduğundan emin olun.

## 🎯 Sonraki Adımlar

1. **Tüm endpoint'leri oluşturun** (yukarıdaki listeden)
2. **API URL'sini environment dosyasına ekleyin**
3. **MongoDB'yi aktif edin** (`USE_MONGODB: true`)
4. **Uygulamayı test edin**

## 📞 Destek

Herhangi bir sorunla karşılaşırsanız:

1. MongoDB Atlas dokümantasyonunu inceleyin
2. Function loglarını kontrol edin
3. Endpoint URL'lerini doğrulayın

---

**Not:** Bu rehber MongoDB Atlas App Services kullanımını temel alır. Kendi sunucunuzu kullanıyorsanız, ilgili adımları uyarlayın.
