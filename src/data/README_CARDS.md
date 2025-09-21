# YKS Kart Bilgileri

Bu klasörde YKS uygulamasında gösterilecek kart bilgileri bulunmaktadır.

## 📁 Dosyalar

- `cardsData.ts` - Ana kart verileri dosyası
- `README_CARDS.md` - Bu açıklama dosyası

## 📝 Kart Ekleme

### 1. Kart Yapısı

Her kart aşağıdaki yapıya uygun olmalıdır:

```typescript
{
  id: string,           // Benzersiz kart ID'si (örn: 'math_001')
  category: string,     // Kategori (math, physics, chemistry, biology, turkish, history)
  question: string,     // Soru metni
  answer: string,       // Cevap metni
  difficulty: string,   // Zorluk seviyesi (easy, medium, hard)
  explanation?: string, // Açıklama (opsiyonel)
  image?: string,       // Resim URL'si (opsiyonel)
  tags?: string[],      // Etiketler (opsiyonel)
}
```

### 2. Kategoriler

- `math` - Matematik
- `physics` - Fizik
- `chemistry` - Kimya
- `biology` - Biyoloji
- `turkish` - Türkçe
- `history` - Tarih

### 3. Zorluk Seviyeleri

- `easy` - Kolay
- `medium` - Orta
- `hard` - Zor

## 🔧 Nasıl Kullanılır

### Yeni Kart Ekleme

1. `cardsData.ts` dosyasını açın
2. `cardsData` dizisinin sonuna yeni kartı ekleyin:

```typescript
{
  id: 'math_004',
  category: 'math',
  question: 'İkinci derece denklem nedir?',
  answer: 'ax² + bx + c = 0 formundaki denklemlerdir',
  difficulty: 'medium',
  explanation: 'İkinci derece denklemler, en yüksek derecesi 2 olan polinom denklemlerdir.',
  tags: ['denklem', 'ikinci derece', 'polinom'],
},
```

### Kart Düzenleme

1. `cardsData.ts` dosyasında mevcut kartı bulun
2. İstediğiniz alanları değiştirin
3. Uygulamayı yeniden başlatın

### Kart Silme

1. `cardsData.ts` dosyasında silmek istediğiniz kartı bulun
2. Kartı diziden çıkarın
3. Uygulamayı yeniden başlatın

## 📊 Mevcut Kartlar

### Matematik (3 kart)

- Üçgen iç açıları (Kolay)
- İkinci derece denklem (Orta)
- Türev (Zor)

### Fizik (3 kart)

- Newton'un ikinci yasası (Kolay)
- Elektrik akımı (Orta)
- E=mc² (Zor)

### Kimya (3 kart)

- Su molekülü (Kolay)
- pH değeri (Orta)
- Periyodik tablo (Zor)

### Biyoloji (3 kart)

- Mitokondri (Kolay)
- DNA (Orta)
- Fotosentez (Zor)

### Türkçe (3 kart)

- Zıt anlam (Kolay)
- Geçmiş zaman (Orta)
- Ünlü harfler (Zor)

### Tarih (3 kart)

- Osmanlı kuruluşu (Kolay)
- Cumhuriyet ilanı (Orta)
- İstanbul fethi (Zor)

### Toplam: 18 kart

## ⚠️ Önemli Notlar

1. **ID Benzersizliği**: Her kartın ID'si benzersiz olmalıdır
2. **Kategori Tutarlılığı**: Kategori isimleri tam olarak belirtilen şekilde yazılmalıdır
3. **Zorluk Seviyesi**: Sadece 'easy', 'medium', 'hard' değerleri kullanılabilir
4. **Uygulama Yenileme**: Değişikliklerin görünmesi için uygulamayı yeniden başlatın

## 🚀 Hızlı Başlangıç

1. `cardsData.ts` dosyasını açın
2. Yeni kartınızı ekleyin
3. Uygulamayı yeniden başlatın
4. Kartlar ekranında yeni kartınızı görün!

## 📝 Örnek Kart

```typescript
{
  id: 'physics_004',
  category: 'physics',
  question: 'Işık hızı kaç km/s\'dir?',
  answer: '299.792.458 km/s',
  difficulty: 'medium',
  explanation: 'Işık hızı boşlukta saniyede yaklaşık 300.000 kilometredir.',
  tags: ['ışık', 'hız', 'fizik sabitleri'],
},
```

Bu kartı `cardsData` dizisine ekleyerek test edebilirsiniz!
