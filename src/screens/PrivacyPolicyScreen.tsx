import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { responsiveFontSize, responsiveSize } from '../utils/responsive';
import { colors } from '../utils/theme';

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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('SignUp')}
        >
          <MaterialCommunityIcons name='arrow-left' size={28} color='#222' />
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
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: responsiveSize(24),
    paddingTop: responsiveSize(59),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveSize(20),
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
    marginTop: responsiveSize(16),
  },
  text: {
    fontSize: responsiveFontSize(15),
    color: colors.textSecondary,
    lineHeight: responsiveFontSize(22),
  },
  backButtonBottom: {
    position: 'absolute',
    bottom: responsiveSize(32),
    alignSelf: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: responsiveSize(24),
    padding: responsiveSize(8),
  },
});

export default PrivacyPolicyScreen;
