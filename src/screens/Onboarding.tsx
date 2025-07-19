import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ViewToken,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const ONBOARDING_DATA = [
  {
    key: '1',
    image: require('../../assets/onboarding1.png'),
    title: 'Sınır Tanımayan Eğitim',
    description: 'Bilgi dünyasını keşfet, kendi hızında yeni beceriler kazan.',
  },
  {
    key: '2',
    image: require('../../assets/onboarding2.png'),
    title: 'İlerlemeni Takip Et',
    description: 'Günlük istatistikler ve net hesaplama ile gelişimini anlık olarak gör.',
  },
  {
    key: '3',
    image: require('../../assets/onboarding3.png'),
    title: 'Başarıya Birlikte Ulaş',
    description: 'Yapay zekâ destekli öneriler ve offline destek her zaman yanında!',
  },
];

const Onboarding: React.FC<{ onDone?: () => void }> = ({ onDone }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleSignUp = () => {
    onDone && onDone();
  };

  const handleLogin = () => {
    // Giriş ekranına yönlendirme eklenebilir
    alert('Giriş ekranına yönlendirilecek!');
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  }).current;

  return (
    <View style={styles.root}>
      {/* Üstte marka adı */}
      <View style={styles.header}>
        <Text style={styles.brand}>YKSapp</Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={ONBOARDING_DATA}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.key}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        renderItem={({ item, index }) => (
          <View style={styles.page}>
            <Image source={item.image} style={styles.image} resizeMode="cover" />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            {/* Sadece son sayfada butonlar */}
            {index === ONBOARDING_DATA.length - 1 && (
              <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.primaryButton} onPress={handleSignUp}>
                  <Text style={styles.primaryButtonText}>BAŞLA</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
      {/* Dot yapısı */}
      <View style={styles.pagination}>
        {ONBOARDING_DATA.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, currentIndex === i && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
};

const IMAGE_HEIGHT = height * 0.32;
const IMAGE_WIDTH = width * 0.88;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 80,
    marginBottom: 8,
    paddingHorizontal: 28,
  },
  brand: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4F5DFF',
    letterSpacing: 1,
  },
  page: {
    width,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
    marginTop: 40,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 24,
    marginTop: 12,
    marginBottom: 32,
    backgroundColor: '#eaf0ff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#22223b',
    marginBottom: 16,
    textAlign: 'center',
    paddingHorizontal: 24,
    marginTop: 32,
  },
  description: {
    fontSize: 18,
    color: '#4F5D75',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 32,
    marginTop: 12,
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: '#4F5DFF',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 64,
    alignItems: 'center',
    marginBottom: 8,
    width: IMAGE_WIDTH * 0.9,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#4F5DFF',
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 48,
    alignSelf: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#d1d1e0',
    marginHorizontal: 6,
  },
  dotActive: {
    backgroundColor: '#4F5DFF',
    width: 22,
  },
});

export default Onboarding; 