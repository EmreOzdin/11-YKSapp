import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const OnboardingScreen3: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/onboarding3.png')} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>Başarıya Birlikte Ulaşalım</Text>
      <Text style={styles.description}>Yapay zekâ destekli öneriler ve offline destek ile her zaman yanında!</Text>
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

export default OnboardingScreen3; 