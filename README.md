# YKSapp - YKS Hazırlık Uygulaması

YKS (TYT, AYT, YDT) sınavına hazırlık için geliştirilmiş React Native mobil uygulaması.

## Özellikler

- 📚 **Konu Bazlı Çalışma**: Derslere göre konu seçimi ve soru çözümü
- 🎯 **Sınav Denemeleri**: TYT, AYT, YDT formatında deneme sınavları
- 📊 **Performans Takibi**: Detaylı istatistikler ve ilerleme raporları
- 🃏 **Bilgi Kartları**: Hap bilgi kartları ile hızlı tekrar
- 🎨 **Modern UI**: Kullanıcı dostu ve modern arayüz
- 📱 **Responsive Tasarım**: Tüm cihazlarda uyumlu çalışma

## Teknolojiler

- React Native 0.79.5
- TypeScript
- Expo SDK 53
- React Navigation 7
- AsyncStorage
- Expo Linear Gradient

## Kurulum

1. Projeyi klonlayın:

```bash
git clone <repository-url>
cd 11-YKSapp
```

2. Bağımlılıkları yükleyin:

```bash
npm install
```

3. Uygulamayı başlatın:

```bash
npm start
```

4. Expo Go uygulaması ile QR kodu tarayın veya emülatörde çalıştırın.

## Proje Yapısı

```
src/
├── screens/          # Ekranlar
├── components/       # UI bileşenleri
├── navigation/       # Navigasyon
├── context/          # Global state
├── services/         # API ve veri servisleri
└── utils/           # Yardımcı fonksiyonlar
```

## Geliştirme

### Yeni Ekran Ekleme

1. `src/screens/` klasörüne yeni ekran dosyasını ekleyin
2. `src/navigation/` klasöründeki navigasyon dosyalarını güncelleyin
3. Gerekirse `App.tsx`'te route ekleyin

### Yeni Soru Ekleme

1. `src/services/sampleData.ts` dosyasına yeni soruları ekleyin
2. `addSampleData()` fonksiyonunu çağırarak veritabanına ekleyin

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## İletişim

Geliştirici: [Adınız]
Email: [email@example.com]
