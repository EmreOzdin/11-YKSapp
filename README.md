# YKS Mobil Uygulaması

YKS (TYT, AYT, YDT) sınavına hazırlık için geliştirilmiş React Native mobil uygulaması.

## Özellikler

- 📚 **Konu Bazlı Çalışma**: Seçilen konularda soru çözümü
- 🎯 **Sınav Türleri**: TYT, AYT, YDT desteği
- 📊 **İstatistikler**: Performans takibi ve analiz
- 🃏 **Bilgi Kartları**: Hap bilgi kartları ile hızlı öğrenme
- 📱 **Responsive Tasarım**: Tüm cihazlarda uyumlu
- 🌙 **Modern UI**: Kullanıcı dostu arayüz

## Kurulum

### Gereksinimler

- Node.js (v18 veya üzeri)
- npm veya yarn
- Expo CLI
- Android Studio (Android için)
- Xcode (iOS için)

### Adımlar

1. **Projeyi klonlayın**
```bash
git clone <repository-url>
cd YKSapp
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Expo CLI'yi yükleyin**
```bash
npm install -g @expo/cli
```

## Geliştirme

### Geliştirme Sunucusunu Başlatın
```bash
npm start
```

### Platform Spesifik Çalıştırma
```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

## Build ve Dağıtım

### EAS Build Kurulumu
```bash
npm install -g eas-cli
eas login
```

### Build Konfigürasyonu
```bash
eas build:configure
```

### Build İşlemleri

#### Android APK (Test için)
```bash
npm run build:android
```

#### iOS IPA (Test için)
```bash
npm run build:ios
```

#### Production Build
```bash
# Android AAB
eas build --platform android --profile production

# iOS IPA
eas build --platform ios --profile production
```

### Preview Build (Lokal Test)
```bash
# Android
npm run preview:android

# iOS
npm run preview:ios
```

## Proje Yapısı

```
src/
├── components/     # UI bileşenleri
├── screens/        # Ekranlar
├── navigation/     # Navigasyon
├── services/       # API ve servisler
├── context/        # Global state
├── utils/          # Yardımcı fonksiyonlar
└── assets/         # Statik dosyalar
```

## Teknolojiler

- **React Native** - Mobil uygulama framework'ü
- **Expo** - Geliştirme platformu
- **TypeScript** - Tip güvenliği
- **React Navigation** - Navigasyon
- **Realm** - Yerel veritabanı
- **Expo Linear Gradient** - Gradient efektleri

## Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## İletişim

- Proje Linki: [https://github.com/username/YKSapp](https://github.com/username/YKSapp)
