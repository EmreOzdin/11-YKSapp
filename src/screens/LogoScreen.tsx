import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { responsiveSize, screenWidth } from '../utils/responsive';
import { colors } from '../utils/theme';

const LogoScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { user, token, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Eğer kullanıcı zaten giriş yapmışsa direkt ana uygulamaya yönlendir
      if (isAuthenticated && user && token) {
        navigation.navigate('MainApp');
      } else {
        // Giriş yapmamışsa onboarding'e yönlendir

        navigation.navigate('Onboarding');
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigation, isAuthenticated, user, token]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode='contain'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: responsiveSize(45),
  },
  logo: {
    width: screenWidth * 0.5,
    height: screenWidth * 0.5,
  },
});

export default LogoScreen;
