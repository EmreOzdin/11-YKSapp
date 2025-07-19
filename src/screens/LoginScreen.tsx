import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const LoginScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Devam etmek için kaydol</Text>
      <Text style={styles.subtitle}>Zaten hesabın varsa, seni otomatik olarak giriş yapacağız.</Text>

      <TouchableOpacity style={styles.button}>
        <Image source={require('../../assets/apple.png')} style={styles.icon} />
        <Text style={styles.buttonText}>Apple ile devam et</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Image source={require('../../assets/google.png')} style={styles.icon} />
        <Text style={styles.buttonText}>Google ile devam et</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Image source={require('../../assets/facebook.png')} style={styles.icon} />
        <Text style={styles.buttonText}>Facebook ile devam et</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Image source={require('../../assets/email.png')} style={styles.icon} />
        <Text style={styles.buttonText}>E-posta ile devam et</Text>
      </TouchableOpacity>

      <Text style={styles.altText}>Başka bir yol ile devam et</Text>

      <Text style={styles.terms}>
        Devam ederek YKSapp'in Kullanım Şartları'nı kabul etmiş olursun. Gizlilik Politikamızı oku.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#22223b',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    width: '100%',
    marginBottom: 12,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 16,
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: 16,
    color: '#22223b',
    fontWeight: '500',
  },
  altText: {
    marginTop: 12,
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
  },
  terms: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 32,
    paddingHorizontal: 12,
  },
});

export default LoginScreen; 