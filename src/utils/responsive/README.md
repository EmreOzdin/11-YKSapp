# Responsive System - YKS App

Bu responsive sistem, YKS uygulamasının hem Android hem de iOS platformlarında tutarlı bir deneyim sunmasını sağlar.

## 🎯 Özellikler

- **Cross-platform uyumluluk**: Android ve iOS için optimize edilmiş
- **Cihaz tipi algılama**: Telefon, tablet ve farklı ekran boyutları
- **Adaptif boyutlandırma**: Ekran boyutuna göre otomatik ölçeklendirme
- **Breakpoint sistemi**: Farklı ekran boyutları için responsive tasarım
- **Hazır component'ler**: Responsive button, input, card, modal vb.
- **Hook sistemi**: Kolay kullanım için React hook'ları
- **Theme sistemi**: Tutarlı tasarım için responsive theme

## 📱 Desteklenen Cihazlar

### Telefonlar

- **Küçük cihazlar**: < 375px (iPhone SE, küçük Android)
- **Orta cihazlar**: 375px - 414px (iPhone 11, standart Android)
- **Büyük cihazlar**: > 414px (iPhone 11 Pro Max, büyük Android)

### Tabletler

- **iPad**: 768px+ (Portrait/Landscape)
- **Android Tablet**: 768px+ (Portrait/Landscape)

## 🚀 Kullanım

### 1. Temel Hook'lar

```typescript
import { useDeviceType, useBreakpoint, useAdaptiveSize } from '../utils/useResponsive';

const MyComponent = () => {
  const { isTablet, isSmallDevice } = useDeviceType();
  const { current } = useBreakpoint();
  const adaptiveSize = useAdaptiveSize(20);
  
  return (
    <View style={{ padding: adaptiveSize }}>
      <Text>Device: {isTablet ? 'Tablet' : 'Phone'}</Text>
      <Text>Breakpoint: {current}</Text>
    </View>
  );
};
```

### 2. Responsive Component'ler

```typescript
import { ResponsiveButton, ResponsiveInput, ResponsiveCard } from '../utils/ResponsiveComponents';

const MyScreen = () => {
  return (
    <ResponsiveCard>
      <ResponsiveInput
        label="Email"
        placeholder="Enter your email"
        size="md"
      />
      <ResponsiveButton
        title="Submit"
        variant="primary"
        size="lg"
        fullWidth
      />
    </ResponsiveCard>
  );
};
```

### 3. Responsive Theme

```typescript
import { ResponsiveThemeProvider, useResponsiveTheme } from '../utils/ResponsiveTheme';

const App = () => {
  return (
    <ResponsiveThemeProvider>
      <MyApp />
    </ResponsiveThemeProvider>
  );
};

const MyComponent = () => {
  const theme = useResponsiveTheme();
  
  return (
    <View style={{ padding: theme.spacing.md }}>
      <Text style={theme.typography.h1}>Title</Text>
    </View>
  );
};
```

## 📐 Breakpoint Sistemi

| Breakpoint | Min Width | Cihaz Tipi | Kullanım |
|------------|-----------|------------|---------|
| xs | 320px | Küçük telefon | Tek kolon layout |
| sm | 375px | Standart telefon | İki kolon layout |
| md | 414px | Büyük telefon | İki kolon layout |
| lg | 768px | Tablet | Üç-dört kolon layout |
| xl | 1024px | Büyük tablet | Dört kolon layout |
| xxl | 1366px | Desktop | Maksimum layout |

## 🎨 Responsive Sizing

### Font Boyutları

```typescript
// Otomatik ölçeklendirme
const fontSize = useAdaptiveFontSize(16); // Base: 16px

// Manuel ölçeklendirme
const fontSize = responsiveFontSize(16);
```

### Spacing

```typescript
// Otomatik ölçeklendirme
const padding = useAdaptiveSpacing(16); // Base: 16px

// Manuel ölçeklendirme
const padding = responsiveSize(16);
```

### Genel Boyutlar

```typescript
// Genişlik
const width = useAdaptiveWidth(200);

// Yükseklik
const height = useAdaptiveHeight(100);
```

## 🧩 Component API'leri

### ResponsiveButton

```typescript
interface ResponsiveButtonProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
}
```

### ResponsiveInput

```typescript
interface ResponsiveInputProps {
  label?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}
```

### ResponsiveCard

```typescript
interface ResponsiveCardProps {
  children: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: boolean;
  fullWidth?: boolean;
}
```

## 📱 Platform Özel Ayarlar

### Safe Area

```typescript
import { getSafeAreaPadding } from '../utils/responsive';

const safeArea = getSafeAreaPadding();
// iOS: { top: 44, bottom: 34 }
// Android: { top: 24, bottom: 0 }
```

### Platform Seçimi

```typescript
import { platformSelect } from '../utils/responsive';

const styles = {
  paddingTop: platformSelect(44, 24), // iOS: 44, Android: 24
};
```

## 🔧 Özelleştirme

### Yeni Breakpoint Ekleme

```typescript
// useResponsive.ts
const breakpoints = {
  xs: 320,
  sm: 375,
  md: 414,
  lg: 768,
  xl: 1024,
  xxl: 1366,
  custom: 1200, // Yeni breakpoint
};
```

### Yeni Component Boyutu

```typescript
// ResponsiveComponents.tsx
const sizeStyles = {
  sm: { paddingVertical: 8, paddingHorizontal: 16 },
  md: { paddingVertical: 12, paddingHorizontal: 24 },
  lg: { paddingVertical: 16, paddingHorizontal: 32 },
  xl: { paddingVertical: 20, paddingHorizontal: 40 }, // Yeni boyut
};
```

## 🧪 Test Etme

Responsive sisteminizi test etmek için `ResponsiveTestScreen` component'ini kullanabilirsiniz:

```typescript
import ResponsiveTestScreen from '../utils/ResponsiveTestScreen';

// Navigation'a ekleyin ve test edin
```

## 📋 Best Practices

1. **Hook'ları kullanın**: Her zaman responsive hook'ları kullanın
2. **Component'leri tercih edin**: Hazır responsive component'leri kullanın
3. **Breakpoint'leri kontrol edin**: Farklı ekran boyutlarını test edin
4. **Platform farklılıklarını göz önünde bulundurun**: iOS ve Android farklılıkları
5. **Performance'ı optimize edin**: Gereksiz re-render'ları önleyin

## 🐛 Sorun Giderme

### Yaygın Sorunlar

1. **Import hatası**: Hook'ları doğru dosyadan import ettiğinizden emin olun
2. **Boyut sorunları**: Base boyutları kontrol edin (375px base width)
3. **Platform farklılıkları**: platformSelect kullanın
4. **Performance**: useMemo ile hesaplamaları optimize edin

### Debug

```typescript
const { width, height } = useScreenDimensions();
console.log('Screen size:', width, 'x', height);

const { isTablet } = useDeviceType();
console.log('Is tablet:', isTablet);
```

## 📚 Örnekler

Daha fazla örnek için `TytPastScreen.tsx` dosyasını inceleyebilirsiniz. Bu dosya responsive sistemin tüm özelliklerini kullanmaktadır.
