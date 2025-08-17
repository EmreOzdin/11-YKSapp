import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { responsiveSize, responsiveFontSize } from '../utils/responsive';
import { colors, typography } from '../utils/theme';

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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('SignUp')}
        >
          <MaterialCommunityIcons name='arrow-left' size={28} color='#222' />
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
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: responsiveSize(24),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveSize(48),
    marginBottom: responsiveSize(16),
  },
  backButton: {
    marginRight: responsiveSize(8),
  },
  title: {
    fontSize: responsiveFontSize(22),
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'left',
  },
  scroll: {
    flex: 1,
    marginTop: responsiveSize(32),
  },
  backButtonBottom: {
    position: 'absolute',
    bottom: responsiveSize(32),
    alignSelf: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: responsiveSize(24),
    padding: responsiveSize(8),
  },
  text: {
    fontSize: responsiveFontSize(15),
    color: colors.textSecondary,
    lineHeight: responsiveFontSize(22),
  },
});

export default PaymentTermsScreen;
