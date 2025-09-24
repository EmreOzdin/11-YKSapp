import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuthStore } from '../../store/authStore';
import {
  responsiveFontSize,
  responsiveSize,
  screenHeight,
} from '../utils/responsive';
import { colors, shadows } from '../utils/theme';

interface EmailLoginScreenProps {
  onLogin?: () => void;
  onCreateAccount?: () => void;
}

const EmailLoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { user, isLoading, login } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Hata', 'Lütfen e-posta ve şifre alanlarını doldurun');
      return;
    }

    try {
      const result = await login(email, password);

      if (result && result.success) {
        navigation.navigate('MainApp');
      } else {
        Alert.alert(
          'Hata',
          result?.message ||
            'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.'
        );
      }
    } catch (error) {
      Alert.alert('Hata', 'Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const navigation = useNavigation() as any;
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder='E-posta'
          placeholderTextColor='#888'
          value={email}
          onChangeText={setEmail}
          keyboardType='email-address'
          autoCapitalize='none'
        />
        <TextInput
          style={styles.input}
          placeholder='Şifre'
          placeholderTextColor='#888'
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.loginButtonText}>
            {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgot}>Şifremi unuttum?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.createAccountText}>Yeni hesap oluştur</Text>
        </TouchableOpacity>
        <Image
          source={require('../../assets/meta.png')}
          style={styles.metaLogo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: responsiveSize(24),
    paddingTop: responsiveSize(45),
  },
  logoContainer: {
    height: screenHeight / 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: responsiveSize(40),
  },
  logo: {
    width: responsiveSize(110),
    height: responsiveSize(110),
    resizeMode: 'contain',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    width: '100%',
    backgroundColor: colors.background,
    borderRadius: responsiveSize(10),
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: responsiveSize(16),
    paddingVertical: responsiveSize(14),
    fontSize: responsiveFontSize(16),
    marginBottom: responsiveSize(12),
    color: colors.textPrimary,
  },
  loginButton: {
    width: '100%',
    backgroundColor: colors.secondary,
    borderRadius: responsiveSize(24),
    paddingVertical: responsiveSize(14),
    alignItems: 'center',
    marginTop: responsiveSize(8),
    marginBottom: responsiveSize(8),
    ...shadows.small,
  },
  loginButtonText: {
    color: colors.textWhite,
    fontSize: responsiveFontSize(17),
    fontWeight: 'bold',
  },
  forgot: {
    color: colors.secondary,
    fontSize: responsiveFontSize(15),
    marginVertical: responsiveSize(10),
  },
  bottomContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    bottom: 0,
    paddingBottom: responsiveSize(18),
  },
  createAccountButton: {
    width: '90%',
    borderWidth: 1.5,
    borderColor: colors.secondary,
    borderRadius: responsiveSize(24),
    paddingVertical: responsiveSize(14),
    alignItems: 'center',
    backgroundColor: colors.background,
    marginBottom: responsiveSize(5),
    marginTop: responsiveSize(24),
    zIndex: 1,
  },
  createAccountText: {
    color: colors.secondary,
    fontSize: responsiveFontSize(17),
    fontWeight: 'bold',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveSize(2),
  },
  metaLogo: {
    width: responsiveSize(180),
    height: responsiveSize(80),
    resizeMode: 'contain',
    marginRight: 0,
    marginTop: responsiveSize(24),
    zIndex: 0,
  },
  obenText: {
    fontSize: responsiveFontSize(20),
    color: colors.textPrimary,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default EmailLoginScreen;
