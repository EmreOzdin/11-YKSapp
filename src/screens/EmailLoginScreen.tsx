import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

interface EmailLoginScreenProps {
  onLogin?: () => void;
}

const EmailLoginScreen: React.FC<EmailLoginScreenProps> = ({ onLogin }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Kullanıcı adı, e-posta veya telefon"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Şifre"
          placeholderTextColor="#888"
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
          <Text style={styles.loginButtonText}>Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.forgot}>Şifremi unuttum?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.createAccountButton} onPress={onLogin}>
          <Text style={styles.createAccountText}>Yeni hesap oluştur</Text>
        </TouchableOpacity>
        <Image source={require('../../assets/meta.png')} style={styles.metaLogo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafd',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
  },
  logoContainer: {
    height: height / 3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop:66,
  },
  logo: {
    width: 110,
    height: 110,
    resizeMode: 'contain',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 12,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#1877f2',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  forgot: {
    color: '#1877f2',
    fontSize: 15,
    marginVertical: 10,
  },
  bottomContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    bottom: 0,
    paddingBottom: 18,
  },
  createAccountButton: {
    width: '90%',
    borderWidth: 1.5,
    borderColor: '#1877f2',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 5,
    marginTop: 24,
    zIndex: 1,
  },
  createAccountText: {
    color: '#1877f2',
    fontSize: 17,
    fontWeight: 'bold',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  metaLogo: {
    width: 280,
    height: 130,
    resizeMode: 'contain',
    marginRight: 0,
    zIndex: 0,
  },
  obenText: {
    fontSize: 20,
    color: '#222',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default EmailLoginScreen; 