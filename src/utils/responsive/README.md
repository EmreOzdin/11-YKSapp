# Responsive Utilities

Bu klasör, React Native uygulamasında responsive tasarım için gerekli tüm utility'leri içerir.

## 📁 Dosya Yapısı

```
src/utils/responsive/
├── index.ts                 # Ana export dosyası
├── README.md               # Bu dosya
└── ../                     # Üst klasör
    ├── responsive.ts       # Temel responsive fonksiyonlar
    ├── useResponsive.ts    # Responsive hook'lar
    ├── ResponsiveComponents.tsx  # Responsive component'ler
    ├── ResponsiveTheme.ts  # Responsive theme sistemi
    └── ResponsiveConstants.ts    # Responsive sabitler
```

## 🚀 Kullanım

### Temel Responsive Fonksiyonlar

```typescript
import { 
  responsiveSize, 
  responsiveFontSize, 
  responsiveWidth, 
  responsiveHeight 
} from '../utils/responsive';

// Boyut ayarlama
const size = responsiveSize(16);
const fontSize = responsiveFontSize(18);
const width = responsiveWidth(200);
const height = responsiveHeight(100);
```

### Responsive Hook'lar

```typescript
import { 
  useScreenDimensions, 
  useDeviceType, 
  useBreakpoint 
} from '../utils/useResponsive';

const MyComponent = () => {
  const { width, height } = useScreenDimensions();
  const { isSmall, isMedium, isLarge } = useDeviceType();
  const breakpoint = useBreakpoint(); // 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  
  return (
    <View style={{ 
      padding: isSmall ? 8 : isMedium ? 16 : 24 
    }}>
      {/* Component içeriği */}
    </View>
  );
};
```

### Responsive Component'ler

```typescript
import { 
  ResponsiveButton, 
  ResponsiveInput, 
  ResponsiveCard 
} from '../utils/ResponsiveComponents';

const MyScreen = () => {
  return (
    <ResponsiveCard size="md">
      <ResponsiveInput 
        placeholder="Kullanıcı adı"
        size="md"
        value={username}
        onChangeText={setUsername}
      />
      <ResponsiveButton 
        title="Giriş Yap"
        size="md"
        variant="primary"
        onPress={handleLogin}
      />
    </ResponsiveCard>
  );
};
```

### Responsive Theme

```typescript
import { 
  useResponsiveTheme, 
  spacing, 
  typography 
} from '../utils/ResponsiveTheme';

const MyComponent = () => {
  const theme = useResponsiveTheme();
  
  return (
    <View style={{
      padding: spacing.md,
      fontSize: typography.md,
    }}>
      {/* Component içeriği */}
    </View>
  );
};
```

### Responsive Constants

```typescript
import { 
  BUTTON_HEIGHT_MD, 
  CARD_RADIUS_MD, 
  SPACING_MD 
} from '../utils/ResponsiveConstants';

const styles = StyleSheet.create({
  button: {
    height: BUTTON_HEIGHT_MD,
    borderRadius: CARD_RADIUS_MD,
    margin: SPACING_MD,
  },
});
```

## 📱 Breakpoint Sistemi

| Breakpoint | Genişlik | Cihaz Tipi |
|------------|----------|------------|
| xs         | < 375px  | Küçük telefon |
| sm         | 375-414px| Orta telefon |
| md         | 414-768px| Büyük telefon |
| lg         | 768-1024px| Tablet |
| xl         | > 1024px | Büyük tablet |

## 🎨 Responsive Tasarım Prensipleri

### 1. Mobile-First Yaklaşım
- Önce mobil tasarım yapın
- Sonra büyük ekranlar için geliştirin

### 2. Esnek Grid Sistemi
```typescript
import { ResponsiveGrid } from '../utils/ResponsiveComponents';

<ResponsiveGrid columns={2} gap={16}>
  <View>Item 1</View>
  <View>Item 2</View>
</ResponsiveGrid>
```

### 3. Adaptive Typography
```typescript
import { useAdaptiveFontSize } from '../utils/useResponsive';

const fontSize = useAdaptiveFontSize(16, 1.2); // Base size * 1.2
```

### 4. Responsive Spacing
```typescript
import { useAdaptiveSpacing } from '../utils/useResponsive';

const padding = useAdaptiveSpacing(16, 1.5); // Base spacing * 1.5
```

## 🔧 Özelleştirme

### Custom Responsive Fonksiyonlar

```typescript
// src/utils/responsive.ts
export const customResponsiveSize = (size: number, multiplier: number = 1) => {
  return responsiveSize(size * multiplier);
};

export const customResponsiveFontSize = (size: number, multiplier: number = 1) => {
  return responsiveFontSize(size * multiplier);
};
```

### Custom Responsive Hook'lar

```typescript
// src/utils/useResponsive.ts
export const useCustomResponsive = (baseValue: number) => {
  const deviceType = useDeviceType();
  
  if (deviceType.isSmall) return baseValue * 0.8;
  if (deviceType.isMedium) return baseValue;
  if (deviceType.isLarge) return baseValue * 1.2;
  
  return baseValue;
};
```

## 📊 Performance Optimizasyonu

### 1. Memoization
```typescript
import { useMemo } from 'react';
import { useAdaptiveSize } from '../utils/useResponsive';

const MyComponent = () => {
  const size = useMemo(() => useAdaptiveSize(16), []);
  
  return <View style={{ width: size, height: size }} />;
};
```

### 2. Conditional Rendering
```typescript
import { useDeviceType } from '../utils/useResponsive';

const MyComponent = () => {
  const { isSmall } = useDeviceType();
  
  return (
    <View>
      {isSmall ? <CompactLayout /> : <FullLayout />}
    </View>
  );
};
```

## 🧪 Test

### Responsive Utility Testleri

```typescript
// __tests__/responsive.test.ts
import { responsiveSize, responsiveFontSize } from '../utils/responsive';

describe('Responsive Utilities', () => {
  test('responsiveSize should return correct size', () => {
    const size = responsiveSize(16);
    expect(typeof size).toBe('number');
    expect(size).toBeGreaterThan(0);
  });
  
  test('responsiveFontSize should return correct font size', () => {
    const fontSize = responsiveFontSize(18);
    expect(typeof fontSize).toBe('number');
    expect(fontSize).toBeGreaterThan(0);
  });
});
```

## 📚 Best Practices

### 1. Tutarlı Kullanım
- Tüm boyutlar için responsive fonksiyonları kullanın
- Sabit değerlerden kaçının

### 2. Semantic Naming
```typescript
// ✅ İyi
const buttonHeight = responsiveSize(44);
const titleFontSize = responsiveFontSize(24);

// ❌ Kötü
const size1 = responsiveSize(44);
const size2 = responsiveFontSize(24);
```

### 3. Theme Integration
```typescript
// ✅ İyi
import { spacing, typography } from '../utils/ResponsiveTheme';

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    fontSize: typography.md,
  },
});

// ❌ Kötü
const styles = StyleSheet.create({
  container: {
    padding: 16,
    fontSize: 16,
  },
});
```

### 4. Accessibility
```typescript
import { TOUCH_TARGET_MIN } from '../utils/ResponsiveConstants';

const styles = StyleSheet.create({
  button: {
    minHeight: TOUCH_TARGET_MIN, // 44px minimum touch target
    minWidth: TOUCH_TARGET_MIN,
  },
});
```

## 🔄 Migration Guide

### Eski Kod'dan Yeni Sisteme Geçiş

```typescript
// ❌ Eski kod
const styles = StyleSheet.create({
  container: {
    padding: 16,
    fontSize: 16,
    borderRadius: 8,
  },
});

// ✅ Yeni kod
import { spacing, typography, borderRadius } from '../utils/ResponsiveTheme';

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    fontSize: typography.md,
    borderRadius: borderRadius.md,
  },
});
```

## 📞 Destek

Herhangi bir sorun veya öneri için:
- Issue açın
- Documentation'ı güncelleyin
- Test ekleyin

## 📄 Lisans

Bu responsive utility sistemi MIT lisansı altında lisanslanmıştır.
