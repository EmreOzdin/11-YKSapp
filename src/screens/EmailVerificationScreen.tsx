import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { responsiveFontSize, responsiveSize } from '../utils/responsive';
import { colors, shadows } from '../utils/theme';

interface RouteParams {
  email: string;
  username: string;
  password: string;
}

const EmailVerificationScreen: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(false);

  const navigation = useNavigation() as any;
  const route = useRoute();
  const { email, username, password } = route.params as RouteParams;

  const { register } = useAuthStore();

  // Geri sayım efekti
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // İlk yüklemede doğrulama kodu gönder
  useEffect(() => {
    sendVerificationCode();
  }, []);

  const sendVerificationCode = async () => {
    try {
      setIsLoading(true);
      
      // Backend URL'ini dinamik olarak ayarla
      const getBackendUrl = () => {
        if (__DEV__) {
          return 'http://10.0.2.2:3000'; // Android Emulator için
        }
        return 'http://192.168.1.64:3000'; // Gerçek cihaz için
      };
      
      const backendUrl = getBackendUrl();
      const response = await fetch(`${backendUrl}/api/auth/send-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setCountdown(60); // 60 saniye bekle
        setCanResend(false);
        Alert.alert('Başarılı', 'Doğrulama kodu e-posta adresinize gönderildi.');
      } else {
        Alert.alert('Hata', data.message || 'Doğrulama kodu gönderilemedi.');
      }
    } catch (error) {
      Alert.alert('Hata', 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyAndRegister = async () => {
    const codeString = verificationCode.join('');
    if (codeString.length !== 6) {
      Alert.alert('Hata', 'Lütfen 6 haneli doğrulama kodunu girin.');
      return;
    }

    try {
      setIsLoading(true);
      const result = await register(username, email, password, codeString);

      if (result && result.success) {
        Alert.alert('Başarılı', 'Hesabınız başarıyla oluşturuldu!', [
          {
            text: 'Tamam',
            onPress: () => navigation.navigate('MainApp'),
          },
        ]);
      } else {
        Alert.alert('Hata', result?.message || 'Kayıt işlemi başarısız');
      }
    } catch (error) {
      Alert.alert('Hata', 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityLabel='Geri dön'
        >
          <MaterialCommunityIcons name='arrow-left' size={28} color='#222' />
        </TouchableOpacity>
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>E-posta Doğrulama</Text>
        </View>
        <View style={{ width: 36 }} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name='email-check' size={80} color={colors.primary} />
        </View>

        <Text style={styles.title}>E-posta Adresinizi Doğrulayın</Text>
        <Text style={styles.subtitle}>
          {email} adresine gönderdiğimiz 6 haneli doğrulama kodunu girin
        </Text>

        <View style={styles.codeContainer}>
          <View style={styles.codeInputRow}>
            {verificationCode.map((digit, index) => (
              <View key={index} style={styles.codeInputBox}>
                <Text style={styles.codeInputText}>{digit}</Text>
              </View>
            ))}
          </View>
          <TextInput
            style={styles.hiddenInput}
            value={verificationCode.join('')}
            onChangeText={(text) => {
              const digits = text.split('').slice(0, 6);
              const newCode = [...verificationCode];
              digits.forEach((digit, index) => {
                newCode[index] = digit;
              });
              for (let i = digits.length; i < 6; i++) {
                newCode[i] = '';
              }
              setVerificationCode(newCode);
            }}
            keyboardType='numeric'
            maxLength={6}
            autoFocus={true}
            selectionColor='transparent'
            caretHidden={true}
          />
        </View>

        <TouchableOpacity
          style={[styles.verifyButton, isLoading && styles.verifyButtonDisabled]}
          onPress={handleVerifyAndRegister}
          disabled={isLoading}
        >
          <Text style={styles.verifyButtonText}>
            {isLoading ? 'Doğrulanıyor...' : 'Doğrula ve Kayıt Ol'}
          </Text>
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Kod gelmedi mi? </Text>
          {canResend ? (
            <TouchableOpacity onPress={sendVerificationCode} disabled={isLoading}>
              <Text style={styles.resendLink}>Tekrar Gönder</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.countdownText}>
              {formatCountdown(countdown)} sonra tekrar gönderebilirsiniz
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'android' ? responsiveSize(36) : 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveSize(18),
    paddingTop: responsiveSize(24),
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
  content: {
    flex: 1,
    paddingHorizontal: responsiveSize(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: responsiveSize(32),
  },
  title: {
    fontSize: responsiveFontSize(24),
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: responsiveSize(12),
  },
  subtitle: {
    fontSize: responsiveFontSize(16),
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: responsiveSize(24),
    marginBottom: responsiveSize(40),
  },
  codeContainer: {
    width: '100%',
    marginBottom: responsiveSize(32),
    position: 'relative',
  },
  codeInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  codeInputBox: {
    width: responsiveSize(45),
    height: responsiveSize(55),
    backgroundColor: colors.background,
    borderRadius: responsiveSize(12),
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  codeInputText: {
    fontSize: responsiveFontSize(24),
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  hiddenInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    zIndex: 1,
  },
  verifyButton: {
    width: '100%',
    backgroundColor: colors.primary,
    borderRadius: responsiveSize(24),
    paddingVertical: responsiveSize(16),
    alignItems: 'center',
    marginBottom: responsiveSize(24),
    ...shadows.small,
  },
  verifyButtonDisabled: {
    backgroundColor: colors.textTertiary,
  },
  verifyButtonText: {
    color: colors.textWhite,
    fontSize: responsiveFontSize(17),
    fontWeight: 'bold',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendText: {
    fontSize: responsiveFontSize(15),
    color: colors.textSecondary,
  },
  resendLink: {
    fontSize: responsiveFontSize(15),
    color: colors.primary,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  countdownText: {
    fontSize: responsiveFontSize(15),
    color: colors.textTertiary,
  },
});

export default EmailVerificationScreen;
