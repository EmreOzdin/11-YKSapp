import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PAYMENT_TEXT = `YKSapp Ödeme Koşulları

1. Genel
Uygulama içi satın alımlar, kredi kartı veya dijital ödeme yöntemleriyle yapılır. Satın alma işlemi tamamlandığında ücret tahsil edilir.

2. İade Politikası
Satın alınan dijital içeriklerde, yasal zorunluluklar dışında iade yapılmaz. Yanlış veya hatalı işlem durumunda destek ekibiyle iletişime geçiniz.

3. Abonelikler
Abonelikler otomatik olarak yenilenir. İptal edilmediği sürece ücret tahsil edilmeye devam eder.

4. Güvenlik
Ödeme bilgileriniz güvenli şekilde işlenir ve saklanmaz.

5. Değişiklikler
YKSapp, ödeme koşullarını güncelleme hakkını saklı tutar. Değişiklikler uygulama üzerinden duyurulur.`;

const PaymentTermsScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('SignUp')}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.title}>Ödeme Koşulları</Text>
      </View>
      <ScrollView style={styles.scroll}>
        <Text style={styles.text}>{PAYMENT_TEXT}</Text>
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
  backButtonBottom: { position: 'absolute', bottom: 32, alignSelf: 'center', backgroundColor: '#f5f5f5', borderRadius: 24, padding: 8 },
  text: { fontSize: 15, color: '#333', lineHeight: 22 },
});

export default PaymentTermsScreen; 