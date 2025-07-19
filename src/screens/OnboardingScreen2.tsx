import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const OnboardingScreen2: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/onboarding2.png')} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>İlerlemeni Takip Et</Text>
      <Text style={styles.description}>Günlük istatistikler ve net hesaplama ile gelişimini anlık olarak gör.</Text>
    </View>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F6FA',
    padding: 24,
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
    marginBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2D3142',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#4F5D75',
    textAlign: 'center',
  },
});

export default OnboardingScreen2; 