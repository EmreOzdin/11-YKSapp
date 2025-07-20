import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const LogoScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Onboarding');
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
  },
});

export default LogoScreen; 