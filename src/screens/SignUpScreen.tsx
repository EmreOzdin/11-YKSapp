import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { useUser } from '../context/UserContext';
import { responsiveFontSize, responsiveSize } from '../utils/responsive';
import { colors, shadows } from '../utils/theme';

const policyContents = {
  terms:
    'YKSapp Kullanım Koşulları örnek metni. Burada uygulamanın kullanımına dair tüm kurallar ve şartlar yer alır.',
  payment:
    'YKSapp Ödeme Koşulları örnek metni. Burada ödeme süreçleri, iade ve ücretlendirme detayları yer alır.',
  nondiscrimination:
    'YKSapp Ayrımcılık Karşıtı Politika örnek metni. Burada eşitlik, ayrımcılığın önlenmesi ve kapsayıcılık ilkeleri yer alır.',
  privacy:
    'YKSapp Gizlilik Politikası örnek metni. Burada kişisel verilerin korunması, işlenmesi ve kullanıcı hakları yer alır.',
};

const SignUpScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Validation states
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigation = useNavigation() as any;

  const { user, isLoading, register, token } = useAuthStore();
  const { initializeUser } = useUser();

  // Validation functions
  const validateUsername = (username: string): string => {
    if (!username.trim()) {
      return 'Kullanıcı adı gereklidir';
    }
    if (username.length < 3) {
      return 'Kullanıcı adı en az 3 karakter olmalıdır';
    }
    if (username.length > 20) {
      return 'Kullanıcı adı en fazla 20 karakter olabilir';
    }
    if (!/^[a-zA-Z0-9._]+$/.test(username)) {
      return 'Kullanıcı adı sadece harf, rakam, nokta ve alt çizgi içerebilir';
    }
    return '';
  };

  const validateEmail = (email: string): string => {
    if (!email.trim()) {
      return 'E-posta adresi gereklidir';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Geçerli bir e-posta adresi giriniz';
    }
    return '';
  };

  const validatePassword = (password: string): string => {
    if (!password) {
      return 'Şifre gereklidir';
    }
    if (password.length < 8) {
      return 'Şifre en az 8 karakter olmalıdır';
    }
    if (!/[a-zA-Z]/.test(password)) {
      return 'Şifre en az bir harf içermelidir';
    }
    if (!/[0-9]/.test(password)) {
      return 'Şifre en az bir rakam içermelidir';
    }
    return '';
  };

  const handleSignUp = async () => {
    // Validate all fields
    const usernameValidation = validateUsername(username);
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    // Set error states
    setUsernameError(usernameValidation);
    setEmailError(emailValidation);
    setPasswordError(passwordValidation);

    // Check if there are any errors
    if (usernameValidation || emailValidation || passwordValidation) {
      return;
    }

    // Direkt kayıt işlemini yap
    const result = await register(username, email, password);

    if (result.success) {
      // Kayıt başarılı, ana uygulamaya yönlendir
      navigation.navigate('MainApp');
    } else {
      // Hata durumunda kullanıcıya bilgi ver
      alert(result.message || 'Kayıt işlemi başarısız. Lütfen tekrar deneyin.');
    }
  };

  const openPolicy = (
    type: 'terms' | 'payment' | 'nondiscrimination' | 'privacy',
    title: string
  ) => {
    // setModalContent(policyContents[type]); // This line was removed as per the edit hint
    // setModalTitle(title); // This line was removed as per the edit hint
    // setModalVisible(true); // This line was removed as per the edit hint
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('EmailLogin')}
          accessibilityLabel='Giriş ekranına dön'
        >
          <MaterialCommunityIcons name='arrow-left' size={28} color='#222' />
        </TouchableOpacity>
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>Kayıt Ol</Text>
        </View>
        <View style={{ width: 36 }} />
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>YKSapp'e Hoş Geldiniz!</Text>
        <Text style={styles.welcomeSubtitle}>
          YKS sınavına hazırlanmak için hesabınızı oluşturun
        </Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Kullanıcı Adı</Text>
        <TextInput
          style={[styles.input, usernameError ? styles.inputError : null]}
          placeholder='Örn: ahmet_yilmaz veya ahmet.yilmaz'
          placeholderTextColor='#888'
          autoCapitalize='none'
          value={username}
          onChangeText={text => {
            setUsername(text);
            setUsernameError('');
          }}
        />
        {usernameError ? (
          <Text style={styles.errorText}>{usernameError}</Text>
        ) : null}

        <Text style={styles.label}>E-posta</Text>
        <TextInput
          style={[styles.input, emailError ? styles.inputError : null]}
          placeholder='ornek@email.com'
          placeholderTextColor='#888'
          autoCapitalize='none'
          keyboardType='email-address'
          value={email}
          onChangeText={text => {
            setEmail(text);
            setEmailError('');
          }}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <Text style={styles.label}>Şifre</Text>
        <View style={styles.passwordInputWrapper}>
          <TextInput
            style={[
              styles.input,
              styles.passwordInput,
              passwordError ? styles.inputError : null,
            ]}
            placeholder='En az 8 karakter, harf ve rakam içermeli'
            placeholderTextColor='#888'
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={text => {
              setPassword(text);
              setPasswordError('');
            }}
          />
          <TouchableOpacity
            style={styles.showHideButtonInside}
            onPress={() => setShowPassword(prev => !prev)}
            accessibilityLabel={
              showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'
            }
          >
            <Text style={styles.showHideEmoji}>
              {showPassword ? '🙉' : '🙈'}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={handleSignUp}
          disabled={isLoading}
        >
          <Text style={styles.signUpButtonText}>
            {isLoading ? 'Kaydediliyor...' : 'Kayıt Ol'}
          </Text>
        </TouchableOpacity>
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Zaten hesabın var mı? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('EmailLogin')}>
            <Text style={styles.loginLink}>Giriş yap</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Yasal metinler */}
      <View style={styles.legalContainerFixed}>
        <Text style={styles.legalText}>
          <Text>Devam ederek YKSapp </Text>
          <Text
            style={styles.legalLink}
            onPress={() => navigation.navigate('TermsOfService')}
          >
            Kullanım Koşulları
          </Text>
          <Text>, </Text>
          <Text
            style={styles.legalLink}
            onPress={() => navigation.navigate('PaymentTerms')}
          >
            Ödeme Koşulları
          </Text>
          <Text> ve </Text>
          <Text
            style={styles.legalLink}
            onPress={() => navigation.navigate('PrivacyPolicy')}
          >
            Gizlilik Politikası
          </Text>
          <Text>'nı kabul etmiş oluyorum.</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop:
      Platform.OS === 'android' ? responsiveSize(65) : responsiveSize(45),
    justifyContent: 'flex-start',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveSize(18),
    paddingTop: responsiveSize(10),
    marginBottom: responsiveSize(18),
  },
  backButton: {
    width: responsiveSize(36),
    height: responsiveSize(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: responsiveFontSize(22),
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  skipButton: {
    minWidth: responsiveSize(36),
    alignItems: 'flex-end',
  },
  skipText: {
    fontSize: responsiveFontSize(16),
    color: colors.textTertiary,
    fontWeight: '500',
  },
  welcomeSection: {
    alignItems: 'center',
    paddingHorizontal: responsiveSize(24),
    marginBottom: responsiveSize(30),
  },
  welcomeTitle: {
    fontSize: responsiveFontSize(28),
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: responsiveSize(8),
  },
  welcomeSubtitle: {
    fontSize: responsiveFontSize(16),
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: responsiveSize(24),
  },
  form: {
    width: '100%',
    paddingHorizontal: responsiveSize(24),
    marginTop: responsiveSize(12),
  },
  label: {
    fontSize: responsiveFontSize(15),
    color: colors.textPrimary,
    marginBottom: responsiveSize(6),
    marginTop: responsiveSize(16),
    fontWeight: '500',
  },
  input: {
    width: '100%',
    backgroundColor: colors.background,
    borderRadius: responsiveSize(10),
    borderWidth: 1.2,
    borderColor: colors.border,
    paddingHorizontal: responsiveSize(16),
    paddingVertical: responsiveSize(14),
    fontSize: responsiveFontSize(16),
    marginBottom: responsiveSize(2),
    color: colors.textPrimary,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eyeButton: {
    padding: 8,
    marginLeft: 2,
  },
  eyeIcon: {
    fontSize: 20,
    color: '#888',
  },
  signUpButton: {
    width: '100%',
    backgroundColor: colors.secondary,
    borderRadius: responsiveSize(24),
    paddingVertical: responsiveSize(14),
    alignItems: 'center',
    marginTop: responsiveSize(18),
    marginBottom: responsiveSize(10),
    ...shadows.small,
  },
  signUpButtonText: {
    color: colors.textWhite,
    fontSize: responsiveFontSize(17),
    fontWeight: 'bold',
  },

  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: responsiveSize(18),
    marginBottom: responsiveSize(12),
  },
  loginText: {
    fontSize: responsiveFontSize(15),
    color: colors.textTertiary,
  },
  loginLink: {
    fontSize: responsiveFontSize(15),
    color: colors.textPrimary,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  passwordInputWrapper: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    marginBottom: responsiveSize(8),
  },
  passwordInput: {
    paddingRight: responsiveSize(48), // göz ikonu için sağ boşluk
  },
  showHideButtonInside: {
    position: 'absolute',
    right: responsiveSize(8),
    top: 0,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    paddingHorizontal: responsiveSize(4),
  },
  showHideEmoji: {
    fontSize: responsiveFontSize(20),
    color: colors.primary,
    fontWeight: 'bold',
  },
  legalContainer: {
    marginTop: responsiveSize(8),
    marginBottom: responsiveSize(16),
    paddingHorizontal: responsiveSize(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  legalText: {
    fontSize: responsiveFontSize(12),
    color: '#888',
    textAlign: 'center',
  },
  legalLink: {
    color: '#4F5DFF',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 2,
  },
  errorText: {
    color: colors.error,
    fontSize: responsiveFontSize(12),
    marginTop: responsiveSize(4),
    marginBottom: responsiveSize(8),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: responsiveSize(16),
    padding: responsiveSize(24),
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: responsiveSize(8),
    elevation: 5,
  },
  modalTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    marginBottom: responsiveSize(12),
    color: '#222',
    textAlign: 'center',
  },
  modalText: {
    fontSize: responsiveFontSize(14),
    color: '#444',
    marginBottom: responsiveSize(16),
    textAlign: 'left',
  },
  modalCloseButton: {
    marginTop: responsiveSize(12),
    backgroundColor: '#4F5DFF',
    borderRadius: responsiveSize(8),
    paddingVertical: responsiveSize(8),
    paddingHorizontal: responsiveSize(24),
  },
  modalCloseText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(15),
  },
  legalContainerFixed: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: responsiveSize(36),
    paddingHorizontal: responsiveSize(24),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});

export default SignUpScreen;
