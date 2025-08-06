import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { responsiveSize, responsiveFontSize } from '../utils/responsive';
import { colors, typography } from '../utils/theme';

const TERMS_TEXT = `YKSapp Kullanım Koşulları

1. Giriş
Bu uygulamayı kullanarak aşağıdaki şartları kabul etmiş olursunuz. Lütfen dikkatlice okuyunuz.

2. Hizmet Tanımı
YKSapp, YKS sınavına hazırlık için dijital içerik, test ve istatistik sunar. Uygulama içeriği bilgilendirme amaçlıdır.

3. Kullanıcı Sorumlulukları
- Hesap bilgilerinizin güvenliğinden siz sorumlusunuz.
- Uygulama içeriğini izinsiz kopyalamak, dağıtmak yasaktır.
- Yasalara aykırı, zararlı veya saldırgan içerik paylaşmak yasaktır.

4. Fikri Mülkiyet
Tüm içerik ve yazılım YKSapp'e aittir. İzinsiz çoğaltılamaz.

5. Sözleşme Değişiklikleri
YKSapp, kullanım koşullarını güncelleme hakkını saklı tutar. Değişiklikler uygulama üzerinden duyurulur.

6. Sorumluluğun Sınırlandırılması
YKSapp, uygulamanın kesintisiz veya hatasız çalışacağını taahhüt etmez. Kullanıcı, uygulamayı "olduğu gibi" kullanır.

7. Yürürlük
Bu koşullar, uygulamanın kullanımıyla birlikte yürürlüğe girer.`;

const TermsOfServiceScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('SignUp')}>
          <MaterialCommunityIcons name="arrow-left" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.title}>Kullanım Koşulları</Text>
      </View>
      <ScrollView style={styles.scroll}>
        <Text style={styles.text}>{TERMS_TEXT}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background, 
    padding: responsiveSize(24) 
  },
  headerRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: responsiveSize(48), 
    marginBottom: responsiveSize(16) 
  },
  backButton: { 
    marginRight: responsiveSize(8) 
  },
  title: { 
    fontSize: responsiveFontSize(22), 
    fontWeight: 'bold', 
    color: colors.textPrimary, 
    textAlign: 'left' 
  },
  scroll: { 
    flex: 1, 
    marginTop: responsiveSize(32) 
  },
  text: { 
    fontSize: responsiveFontSize(15), 
    color: colors.textSecondary, 
    lineHeight: responsiveFontSize(22) 
  },
});

export default TermsOfServiceScreen; 