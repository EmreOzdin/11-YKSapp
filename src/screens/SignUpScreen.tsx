import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const policyContents = {
  terms: 'YKSapp Kullanım Koşulları örnek metni. Burada uygulamanın kullanımına dair tüm kurallar ve şartlar yer alır.',
  payment: 'YKSapp Ödeme Koşulları örnek metni. Burada ödeme süreçleri, iade ve ücretlendirme detayları yer alır.',
  nondiscrimination: 'YKSapp Ayrımcılık Karşıtı Politika örnek metni. Burada eşitlik, ayrımcılığın önlenmesi ve kapsayıcılık ilkeleri yer alır.',
  privacy: 'YKSapp Gizlilik Politikası örnek metni. Burada kişisel verilerin korunması, işlenmesi ve kullanıcı hakları yer alır.'
};

const SignUpScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const openPolicy = (type: 'terms' | 'payment' | 'nondiscrimination' | 'privacy', title: string) => {
    // setModalContent(policyContents[type]); // This line was removed as per the edit hint
    // setModalTitle(title); // This line was removed as per the edit hint
    // setModalVisible(true); // This line was removed as per the edit hint
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('EmailLogin')} accessibilityLabel="Giriş ekranına dön">
          <MaterialCommunityIcons name="arrow-left" size={28} color="#222" />
        </TouchableOpacity>
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>Kayıt Ol</Text>
        </View>
        <View style={{ width: 36 }} />
      </View>
      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.label}>E-posta</Text>
        <TextInput
          style={styles.input}
          placeholder="E-posta"
          placeholderTextColor="#888"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Şifre</Text>
        <View style={styles.passwordInputWrapper}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Şifre"
            placeholderTextColor="#888"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.showHideButtonInside}
            onPress={() => setShowPassword((prev) => !prev)}
            accessibilityLabel={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
          >
            <Text style={styles.showHideEmoji}>{showPassword ? '🙉' : '🙈'}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signUpButton}>
          <Text style={styles.signUpButtonText}>Kayıt Ol</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>veya</Text>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../../assets/apple.png')} style={styles.socialIcon} />
          <Text style={[styles.socialButtonText, styles.socialButtonTextCenter]}>Apple ile devam et</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../../assets/google.png')} style={styles.socialIcon} />
          <Text style={[styles.socialButtonText, styles.socialButtonTextCenter]}>Google ile devam et</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../../assets/facebook.png')} style={styles.socialIcon} />
          <Text style={[styles.socialButtonText, styles.socialButtonTextCenter]}>Facebook ile devam et</Text>
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
          <Text style={styles.legalLink} onPress={() => navigation.navigate('TermsOfService')}>Kullanım Koşulları</Text>
          <Text>, </Text>
          <Text style={styles.legalLink} onPress={() => navigation.navigate('PaymentTerms')}>Ödeme Koşulları</Text>
          <Text> ve </Text>
          <Text style={styles.legalLink} onPress={() => navigation.navigate('PrivacyPolicy')}>Gizlilik Politikası</Text>
          <Text>'nı kabul etmiş oluyorum.</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 36 : 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 24,
    marginBottom: 18,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
  },
  skipButton: {
    minWidth: 36,
    alignItems: 'flex-end',
  },
  skipText: {
    fontSize: 16,
    color: '#888',
    fontWeight: '500',
  },
  form: {
    width: '100%',
    paddingHorizontal: 24,
    marginTop: 12,
  },
  label: {
    fontSize: 15,
    color: '#222',
    marginBottom: 6,
    marginTop: 16,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1.2,
    borderColor: '#d1d1d1',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 2,
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
    backgroundColor: '#222',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 10,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 15,
    marginVertical: 10,
    fontWeight: '500',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.2,
    borderColor: '#d1d1d1',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 18,
    width: '100%',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
    resizeMode: 'contain',
  },
  socialButtonText: {
    fontSize: 16,
    color: '#222',
    fontWeight: '600',
  },
  socialButtonTextCenter: {
    flex: 1,
    textAlign: 'center',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
    marginBottom: 12,
  },
  loginText: {
    fontSize: 15,
    color: '#888',
  },
  loginLink: {
    fontSize: 15,
    color: '#222',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  passwordInputWrapper: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 8,
  },
  passwordInput: {
    paddingRight: 48, // göz ikonu için sağ boşluk
  },
  showHideButtonInside: {
    position: 'absolute',
    right: 8,
    top: 0,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    paddingHorizontal: 4,
  },
  showHideEmoji: {
    fontSize: 20,
    color: '#4F5DFF',
    fontWeight: 'bold',
  },
  legalContainer: {
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  legalText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  legalLink: {
    color: '#4F5DFF',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#222',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 16,
    textAlign: 'left',
  },
  modalCloseButton: {
    marginTop: 12,
    backgroundColor: '#4F5DFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  modalCloseText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  legalContainerFixed: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingBottom: 36,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default SignUpScreen; 