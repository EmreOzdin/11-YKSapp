# MongoDB'ye Soru Yükleme Rehberi

Bu rehber, `sampleData.ts` dosyasındaki soruları MongoDB Atlas'a yüklemek için gerekli adımları açıklar.

## 📋 Gereksinimler

- ✅ MongoDB Atlas hesabı
- ✅ `yksapp` database'i oluşturulmuş
- ✅ `questions` collection'ı oluşturulmuş
- ✅ MongoDB kullanıcısı ve şifresi

## 🚀 Adım Adım Kurulum

### Adım 1: MongoDB Atlas Connection String Alın

1. **MongoDB Atlas Dashboard**'a gidin
2. **"Connect"** butonuna tıklayın
3. **"Connect to your application"** seçin
4. **Connection string**'i kopyalayın

Örnek connection string:

```javascript
mongodb+srv://username:password@cluster.mongodb.net/yksapp?retryWrites=true&w=majority
```

### Adım 2: Connection String'i Güncelleyin

`upload-questions.js` dosyasında connection string'i güncelleyin:

```javascript
const uri = "mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/yksapp?retryWrites=true&w=majority";
```

**Yerine:**

```javascript
const uri = "mongodb+srv://gerçek_kullanıcı_adı:gerçek_şifre@cluster.mongodb.net/yksapp?retryWrites=true&w=majority";
```

### Adım 3: Bağlantıyı Test Edin

```bash
node test-mongodb-connection.js
```

Başarılı çıktı:

```🔗 MongoDB bağlantısı test ediliyor...
✅ MongoDB'ye başarıyla bağlandı!
📊 Veritabanında 0 soru bulunuyor
🎉 MongoDB bağlantısı başarılı! Soruları yükleyebilirsiniz.
```

### Adım 4: Soruları Yükleyin

```bash
node upload-questions.js
```

Başarılı çıktı:

```🚀 Soru yükleme işlemi başlatılıyor...
📋 Yüklenecek soru sayısı: 50

🔗 MongoDB'ye bağlanılıyor...
✅ MongoDB'ye başarıyla bağlandı
📊 Mevcut soru sayısı: 0
📝 50 soru yükleniyor...
✅ 50 soru başarıyla yüklendi!
📊 Toplam soru sayısı: 50

📈 Yüklenen Soruların İstatistikleri:
   Toplam Soru: 50
   TYT Soruları: 30
   AYT Soruları: 15
   YDT Soruları: 5
   Çıkmış Sorular: 10
   Dersler: Türkçe, Matematik, Fen Bilimleri, Sosyal Bilimler, İngilizce
```

## 🔧 Sorun Giderme

### Hata 1: "authentication failed"

```❌ Hata oluştu: authentication failed
🔐 Kimlik doğrulama hatası!
MongoDB Atlas'ta kullanıcı adı ve şifrenizi kontrol edin.
```

**Çözüm:**

1. MongoDB Atlas'ta kullanıcı adı ve şifrenizi kontrol edin
2. Kullanıcının `yksapp` database'ine erişim izni olduğundan emin olun

### Hata 2: "ENOTFOUND"

```❌ Hata oluştu: ENOTFOUND
🌐 Bağlantı hatası!
MongoDB Atlas connection string'inizi kontrol edin.
```

**Çözüm:**

1. Connection string'in doğru olduğundan emin olun
2. Cluster adının doğru olduğunu kontrol edin
3. İnternet bağlantınızı kontrol edin

### Hata 3: "Veritabanında zaten sorular var"

```⚠️  Veritabanında zaten sorular var.
Mevcut soruları silmek için aşağıdaki komutu çalıştırın:
await collection.deleteMany({});
```

**Çözüm:**
MongoDB Compass veya Atlas Dashboard'dan mevcut soruları silin.

## 📊 Yükleme Sonrası Kontrol

### MongoDB Atlas Dashboard'da Kontrol

1. **Browse Collections** > **yksapp** > **questions**
2. Yüklenen soruları görüntüleyin
3. İstatistikleri kontrol edin

### Uygulamada Test

1. Uygulamayı başlatın
2. Soru çözüm ekranına gidin
3. Soruların MongoDB'den geldiğini kontrol edin

## 🎯 Sonraki Adımlar

1. **API Endpoint'leri Oluşturma**: MongoDB Atlas App Services ile API endpoint'leri oluşturun
2. **Environment Güncelleme**: `environment.ts` dosyasında API URL'sini güncelleyin
3. **Test Etme**: Uygulamada MongoDB entegrasyonunu test edin

## 📞 Destek

Herhangi bir sorunla karşılaşırsanız:

1. Bu rehberi tekrar gözden geçirin
2. MongoDB Atlas dokümantasyonunu inceleyin
3. Hata mesajlarını dikkatlice okuyun

---

**Not:** Bu rehber MongoDB Atlas kullanımını temel alır. Kendi MongoDB sunucunuzu kullanıyorsanız, connection string'i ona göre uyarlayın.
