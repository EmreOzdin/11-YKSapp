# Express.js API Kurulum Rehberi (MongoDB Data API Alternatifi)

## 🚨 MongoDB Data API Deprecated

MongoDB Atlas App Services'teki Data API ve HTTPS Endpoints artık deprecated durumda ve 30 Eylül 2025'te tamamen kaldırılacak.

## 🚀 Express.js Çözümü

### Adım 1: Yeni Proje Oluşturma

```bash
# Yeni klasör oluştur
mkdir yksapp-api
cd yksapp-api

# Node.js projesi başlat
npm init -y

# Gerekli paketleri yükle
npm install express mongodb cors dotenv
npm install --save-dev nodemon
```

### Adım 2: package.json Güncelleme

```json
{
  "name": "yksapp-api",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongodb": "^6.3.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

### Adım 3: .env Dosyası

```env
MONGODB_URI=mongodb+srv://yksapp_user:yksapp123456@cluster0.i7uic8g.mongodb.net/yksapp?retryWrites=true&w=majority&appName=Cluster0
PORT=3000
```

### Adım 4: server.js Dosyası

```javascript
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB bağlantısı
let db;

async function connectToMongoDB() {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db('yksapp');
    console.log('✅ MongoDB\'ye başarıyla bağlandı');
  } catch (error) {
    console.error('❌ MongoDB bağlantı hatası:', error);
  }
}

// API Endpoints

// 1. Tüm soruları getir
app.get('/api/questions', async (req, res) => {
  try {
    const collection = db.collection('questions');
    const questions = await collection.find({}).toArray();
    
    res.json({
      success: true,
      data: questions,
      count: questions.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 2. Sınav tipine göre sorular
app.get('/api/questions/exam-type/:examType', async (req, res) => {
  try {
    const { examType } = req.params;
    const collection = db.collection('questions');
    const questions = await collection.find({ examType }).toArray();
    
    res.json({
      success: true,
      data: questions,
      count: questions.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 3. Çıkmış sorular
app.get('/api/questions/past', async (req, res) => {
  try {
    const collection = db.collection('questions');
    const questions = await collection.find({ isPastQuestion: true }).toArray();
    
    res.json({
      success: true,
      data: questions,
      count: questions.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 4. Sınav tipine göre çıkmış sorular
app.get('/api/questions/past/exam-type/:examType', async (req, res) => {
  try {
    const { examType } = req.params;
    const collection = db.collection('questions');
    const questions = await collection.find({ 
      isPastQuestion: true, 
      examType 
    }).toArray();
    
    res.json({
      success: true,
      data: questions,
      count: questions.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// 5. Sağlık kontrolü
app.get('/api/health', async (req, res) => {
  try {
    const collection = db.collection('questions');
    const count = await collection.countDocuments();
    
    res.json({
      success: true,
      status: "healthy",
      message: "MongoDB connection successful",
      questionCount: count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: "unhealthy",
      error: error.message
    });
  }
});

// Server başlatma
async function startServer() {
  await connectToMongoDB();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server ${PORT} portunda çalışıyor`);
    console.log(`📡 API URL: http://localhost:${PORT}/api`);
  });
}

startServer();
```

### Adım 5: API'yi Test Etme

```bash
# API'yi başlat
npm run dev

# Test et
curl http://localhost:3000/api/health
curl http://localhost:3000/api/questions
curl http://localhost:3000/api/questions/exam-type/TYT
```

## 🌐 Deployment Seçenekleri

### 1. Vercel (Önerilen)

```bash
npm install -g vercel
vercel
```

### 2. Railway

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### 3. Render

- GitHub'a push edin
- Render.com'da yeni Web Service oluşturun
- GitHub repo'nuzu bağlayın

## 📱 React Native Uygulamasını Güncelleme

Environment dosyasını güncelleyin:

```typescript
// mobile/src/config/environment.ts
MONGODB_API: {
  BASE_URL: 'https://your-vercel-app.vercel.app/api', // Vercel URL'niz
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
},

FEATURES: {
  USE_MONGODB: true, // MongoDB'yi aktif et
  OFFLINE_MODE: true,
  CACHE_ENABLED: true,
},
```

## 🎯 Avantajlar

1. **Tam kontrol** - Kendi API'nizi yönetirsiniz
2. **Özelleştirilebilir** - İhtiyacınıza göre endpoint'ler ekleyebilirsiniz
3. **Performans** - Daha hızlı ve güvenilir
4. **Gelecek güvenli** - MongoDB'nin deprecated API'sine bağımlı değil

## 🚀 Hızlı Başlangıç

1. Yukarıdaki dosyaları oluşturun
2. `npm install` çalıştırın
3. `.env` dosyasını MongoDB URI'nizle güncelleyin
4. `npm run dev` ile API'yi başlatın
5. React Native uygulamanızı yeni API URL'si ile güncelleyin

Bu çözüm MongoDB'nin resmi önerisi ve gelecek güvenli! 🎉
