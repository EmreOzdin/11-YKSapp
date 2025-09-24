import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveSize,
  screenHeight,
  screenWidth,
} from '../utils/responsive';
import { colors, shadows } from '../utils/theme';

const ONBOARDING_DATA = [
  {
    key: '1',
    image: require('../../assets/onboarding1.png'),
    title: 'Hayalini Yaşa',
    description:
      'TYT–AYT yolculuğunda seni başarıya taşıyacak akıllı bir rehber artık yanında.',
  },
  {
    key: '2',
    image: require('../../assets/onboarding2.png'),
    title: 'Konu Takibi ve Akıllı Öneriler',
    description:
      'Zayıf olduğun konuları belirle, sana özel çalışma planı ile zamanını verimli kullan.',
  },
  {
    key: '3',
    image: require('../../assets/onboarding3.png'),
    title: 'Deneme Sınavları',
    description:
      'Gerçek sınav deneyimini yaşa, gelişimini anlık takip et, her gün bir adım ileri git.',
  },
];

const Onboarding: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handleSignUp = () => {
    navigation.navigate('EmailLogin');
  };

  const handleLogin = () => {
    // Giriş ekranına yönlendirme eklenebilir
    alert('Giriş ekranına yönlendirilecek!');
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    }
  ).current;

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
            <Image
              source={item.image}
              style={styles.image}
              resizeMode='cover'
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
            {/* Sadece son sayfada butonlar */}
            {index === ONBOARDING_DATA.length - 1 && (
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={handleSignUp}
                >
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

const IMAGE_HEIGHT = screenHeight * 0.32;
const IMAGE_WIDTH = screenWidth * 0.88;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: responsiveSize(35),
  },
  header: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: responsiveSize(40),
    marginBottom: responsiveSize(8),
    paddingHorizontal: responsiveSize(28),
  },
  brand: {
    fontSize: responsiveFontSize(32),
    fontWeight: 'bold',
    color: colors.primary,
    letterSpacing: 1,
  },
  page: {
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
    marginTop: responsiveSize(20),
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: responsiveSize(24),
    marginTop: responsiveSize(12),
    marginBottom: responsiveSize(32),
    backgroundColor: '#eaf0ff',
  },
  title: {
    fontSize: responsiveFontSize(26),
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: responsiveSize(16),
    textAlign: 'center',
    paddingHorizontal: responsiveSize(24),
    marginTop: responsiveSize(32),
  },
  description: {
    fontSize: responsiveFontSize(18),
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: responsiveSize(32),
    paddingHorizontal: responsiveSize(32),
    marginTop: responsiveSize(12),
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center',
    marginTop: responsiveSize(8),
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: responsiveSize(16),
    paddingVertical: responsiveSize(16),
    paddingHorizontal: responsiveSize(64),
    alignItems: 'center',
    marginBottom: responsiveSize(8),
    width: IMAGE_WIDTH * 0.9,
    ...shadows.small,
  },
  primaryButtonText: {
    color: colors.textWhite,
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: responsiveFontSize(16),
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: responsiveSize(48),
    alignSelf: 'center',
  },
  dot: {
    width: responsiveSize(10),
    height: responsiveSize(10),
    borderRadius: responsiveSize(5),
    backgroundColor: '#d1d1e0',
    marginHorizontal: responsiveSize(6),
  },
  dotActive: {
    backgroundColor: colors.primary,
    width: responsiveSize(22),
  },
});

export default Onboarding;