# YKS Bilgi Kartları Sistemi

Bu dokümanda YKS uygulamasındaki bilgi kartları sisteminin nasıl kullanılacağı açıklanmaktadır.

## 📊 Kart İstatistikleri

Toplam **200 adet** bilgi kartı oluşturulmuştur:

- **Matematik**: 34 kart
- **Fizik**: 33 kart  
- **Kimya**: 33 kart
- **Biyoloji**: 33 kart
- **Türkçe**: 33 kart
- **Tarih**: 34 kart

## 🗄️ MongoDB Veritabanı Yapısı

### Veritabanı Bilgileri

- **Veritabanı Adı**: `yksapp`
- **Koleksiyon Adı**: `memoryCards`
- **Bağlantı URI**: `mongodb://localhost:27017`

### Kart Yapısı

```typescript
interface MemoryCard {
  _id?: ObjectId;
  id: string;                    // Benzersiz kart ID'si
  category: string;              // Kategori (math, physics, chemistry, biology, turkish, history)
  question: string;              // Soru metni
  answer: string;                // Cevap metni
  difficulty: 'easy' | 'medium' | 'hard';  // Zorluk seviyesi
  imageUrl?: string;             // Opsiyonel resim URL'i
  explanation?: string;          // Opsiyonel açıklama
  tags?: string[];               // Opsiyonel etiketler
  createdAt?: Date;              // Oluşturulma tarihi
  updatedAt?: Date;              // Güncellenme tarihi
}
```

## 🚀 Kartları Yükleme

### 1. MongoDB Kurulumu

Önce MongoDB'nin sisteminizde kurulu ve çalışır durumda olduğundan emin olun.

### 2. Kartları Yükleme

Kartları MongoDB'ye yüklemek için aşağıdaki kodu kullanın:

```typescript
import { loadAllCardsToMongo } from './src/services/loadCardsToMongo';

// Tüm kartları yükle
const result = await loadAllCardsToMongo();
console.log(result);
```

### 3. Kategoriye Göre Yükleme

Belirli bir kategorinin kartlarını yüklemek için:

```typescript
import { loadCardsByCategory } from './src/services/loadCardsToMongo';

// Matematik kartlarını yükle
const result = await loadCardsByCategory('math');
console.log(result);
```

### 4. Zorluk Seviyesine Göre Yükleme

Belirli zorluk seviyesindeki kartları yüklemek için:

```typescript
import { loadCardsByDifficulty } from './src/services/loadCardsToMongo';

// Kolay kartları yükle
const result = await loadCardsByDifficulty('easy');
console.log(result);
```

## 📱 Uygulama Kullanımı

### CardsScreen Özellikleri

- **Kategori Seçimi**: Üst kısımda kategoriler arası geçiş yapabilirsiniz
- **Kart Çevirme**: Kartlara dokunarak soru ve cevap arasında geçiş yapabilirsiniz
- **Navigasyon**: Önceki/Sonraki butonları ile kartlar arası geçiş
- **Zorluk Seviyesi**: Her kartta zorluk seviyesi gösterilir
- **Açıklama**: Kartların arkasında detaylı açıklamalar bulunur
- **Etiketler**: Kartları kategorize eden etiketler

### Kart İçeriği

Her kart şu bilgileri içerir:

- **Soru**: Kartın ön yüzünde yer alan soru
- **Cevap**: Kartın arka yüzünde yer alan cevap
- **Açıklama**: Cevabın detaylı açıklaması
- **Etiketler**: Kartın konusuyla ilgili anahtar kelimeler
- **Zorluk**: Kolay, Orta, Zor seviyeleri

## 🔧 Geliştirici Araçları

### MongoDB Servisi

```typescript
import { mongoService } from './src/services/mongoService';

// Bağlantı
await mongoService.connect();

// Kartları getir
const cards = await mongoService.getAllCards();
const mathCards = await mongoService.getCardsByCategory('math');
const easyCards = await mongoService.getCardsByDifficulty('easy');

// Kategori istatistikleri
const stats = await mongoService.getCategoryStats();

// Bağlantıyı kapat
await mongoService.disconnect();
```

### Yeni Kart Ekleme

```typescript
const newCard: MemoryCard = {
  id: 'unique_id',
  category: 'math',
  question: 'Yeni soru?',
  answer: 'Yeni cevap',
  difficulty: 'medium',
  explanation: 'Detaylı açıklama',
  tags: ['etiket1', 'etiket2']
};

await mongoService.addCard(newCard);
```

### Kart Güncelleme

```typescript
await mongoService.updateCard('card_id', {
  question: 'Güncellenmiş soru',
  answer: 'Güncellenmiş cevap'
});
```

### Kart Silme

```typescript
await mongoService.deleteCard('card_id');
```

## 📁 Dosya Yapısı

```src/
├── services/
│   ├── mongoService.ts          # MongoDB bağlantı ve işlemler
│   ├── cardData.ts              # Matematik ve Fizik kartları
│   ├── cardData2.ts             # Kimya ve Biyoloji kartları
│   ├── cardData3.ts             # Türkçe ve Tarih kartları
│   └── loadCardsToMongo.ts      # Kart yükleme fonksiyonları
├── screens/
│   └── CardsScreen.tsx          # Kartlar ekranı
└── utils/
    ├── responsive.ts            # Responsive tasarım
    └── theme.ts                 # Tema renkleri
```

## 🎯 Özellikler

### ✅ Mevcut Özellikler

- 200 adet kapsamlı bilgi kartı
- 6 farklı kategori
- 3 zorluk seviyesi
- MongoDB entegrasyonu
- Responsive tasarım
- Kart çevirme animasyonu
- Kategori filtreleme
- Navigasyon kontrolleri
- Açıklama ve etiket sistemi

### 🔮 Gelecek Özellikler

- Resimli kartlar
- Ses desteği
- İlerleme takibi
- Favori kartlar
- Arama fonksiyonu
- Offline mod
- Çoklu dil desteği

## 🐛 Sorun Giderme

### MongoDB Bağlantı Hatası

```Error: MongoDB bağlantı hatası
```

**Çözüm**: MongoDB servisinin çalıştığından emin olun.

### Kartlar Yüklenmiyor

```Error: Kartlar yüklenirken hata oluştu
```

**Çözüm**:

1. MongoDB bağlantısını kontrol edin
2. Veritabanı ve koleksiyon izinlerini kontrol edin
3. Kart verilerinin doğru formatta olduğundan emin olun

### Performans Sorunları

- Büyük veri setleri için sayfalama kullanın
- Gereksiz re-render'ları önlemek için React.memo kullanın
- Kartları lazy loading ile yükleyin

## 📞 Destek

Herhangi bir sorun yaşarsanız:

1. Console loglarını kontrol edin
2. MongoDB bağlantısını test edin
3. Kart verilerinin formatını kontrol edin
4. Gerekirse veritabanını temizleyip yeniden yükleyin

---

**Not**: Bu sistem YKS sınavına hazırlık için tasarlanmıştır ve sürekli güncellenmektedir.
