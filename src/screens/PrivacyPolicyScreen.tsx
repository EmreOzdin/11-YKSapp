import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PRIVACY_TEXT = `YKSapp Gizlilik Politikası

1. Kişisel Verilerin Toplanması
YKSapp, yalnızca hizmet sunumu için gerekli olan kişisel verileri toplar.

2. Verilerin Kullanımı
Toplanan veriler, uygulama işlevselliği ve kullanıcı deneyimini geliştirmek için kullanılır. Üçüncü şahıslarla paylaşılmaz.

3. Güvenlik
Kişisel verileriniz güvenli şekilde saklanır ve korunur.

4. Haklarınız
Kullanıcılar, verilerine erişme, düzeltme ve silme hakkına sahiptir. Talepler için destek ekibiyle iletişime geçebilirsiniz.

5. Değişiklikler
Gizlilik politikası zaman zaman güncellenebilir. Değişiklikler uygulama üzerinden duyurulur.`;

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('SignUp')}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.title}>Gizlilik Politikası</Text>
      </View>
      <ScrollView style={styles.scroll}>
        <Text style={styles.text}>{PRIVACY_TEXT}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 48, marginBottom: 16 },
  backButton: { marginRight: 8 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#222', textAlign: 'left' },
  scroll: { flex: 1, marginTop: 32 },
  text: { fontSize: 15, color: '#333', lineHeight: 22 },
  backButtonBottom: { position: 'absolute', bottom: 32, alignSelf: 'center', backgroundColor: '#f5f5f5', borderRadius: 24, padding: 8 },
});

export default PrivacyPolicyScreen; 