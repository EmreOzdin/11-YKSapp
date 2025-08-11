import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  Alert,
  Switch,
  Modal
} from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { responsiveSize, responsiveFontSize } from '../utils/responsive';
import { colors, typography, shadows } from '../utils/theme';

interface ProfileOption {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  iconColor: string;
  onPress: () => void;
  showSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
}

const ProfilScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  // Kullanıcı bilgileri (gerçek uygulamada API'den gelecek)
  const userInfo = {
    name: 'Emre Yılmaz',
    email: 'emre.yilmaz@email.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    joinDate: 'Ocak 2024',
    totalQuestions: 1247,
    correctAnswers: 892,
    accuracy: 71.7,
    studyStreak: 15,
    totalStudyTime: 89,
  };

  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Hesabınızdan çıkış yapmak istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Çıkış Yap', 
          style: 'destructive',
          onPress: () => {
            // Burada logout işlemi yapılacak
            console.log('Logout pressed');
          }
        }
      ]
    );
  };

  const profileOptions: ProfileOption[] = [
    {
      id: 'edit',
      title: 'Profili Düzenle',
      subtitle: 'Kişisel bilgilerinizi güncelleyin',
      icon: 'account-edit',
      iconColor: colors.primary,
      onPress: () => setEditModalVisible(true),
    },
    {
      id: 'notifications',
      title: 'Bildirimler',
      subtitle: 'Bildirim ayarlarınızı yönetin',
      icon: 'bell-outline',
      iconColor: colors.warning,
      onPress: () => {},
      showSwitch: true,
      switchValue: notificationsEnabled,
      onSwitchChange: setNotificationsEnabled,
    },
    {
      id: 'darkMode',
      title: 'Karanlık Mod',
      subtitle: 'Karanlık tema kullanın',
      icon: 'moon-waning-crescent',
      iconColor: colors.secondary,
      onPress: () => {},
      showSwitch: true,
      switchValue: darkModeEnabled,
      onSwitchChange: setDarkModeEnabled,
    },
    {
      id: 'privacy',
      title: 'Gizlilik',
      subtitle: 'Gizlilik ayarlarınızı yönetin',
      icon: 'shield-account',
      iconColor: colors.success,
      onPress: () => navigation.navigate('PrivacyPolicyScreen'),
    },
    {
      id: 'terms',
      title: 'Kullanım Koşulları',
      subtitle: 'Kullanım koşullarını okuyun',
      icon: 'file-document-outline',
      iconColor: colors.info,
      onPress: () => navigation.navigate('TermsOfServiceScreen'),
    },
    {
      id: 'help',
      title: 'Yardım & Destek',
      subtitle: 'Sorularınız için bize ulaşın',
      icon: 'help-circle-outline',
      iconColor: colors.accent,
      onPress: () => {},
    },
    {
      id: 'about',
      title: 'Uygulama Hakkında',
      subtitle: 'Versiyon 1.0.0',
      icon: 'information-outline',
      iconColor: colors.textTertiary,
      onPress: () => {},
    },
    {
      id: 'logout',
      title: 'Çıkış Yap',
      subtitle: 'Hesabınızdan güvenli çıkış',
      icon: 'logout',
      iconColor: colors.error,
      onPress: handleLogout,
    },
  ];



  const renderProfileOption = (option: ProfileOption) => (
    <TouchableOpacity
      key={option.id}
      style={styles.optionCard}
      onPress={option.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.optionLeft}>
        <View style={[styles.optionIcon, { backgroundColor: `${option.iconColor}20` }]}>
          <MaterialCommunityIcons name={option.icon as any} size={20} color={option.iconColor} />
        </View>
        <View style={styles.optionText}>
          <Text style={styles.optionTitle}>{option.title}</Text>
          {option.subtitle && <Text style={styles.optionSubtitle}>{option.subtitle}</Text>}
        </View>
      </View>
      {option.showSwitch ? (
        <Switch
          value={option.switchValue}
          onValueChange={option.onSwitchChange}
          trackColor={{ false: colors.border, true: colors.primary }}
          thumbColor={colors.background}
        />
      ) : (
        <MaterialCommunityIcons name="chevron-right" size={24} color={colors.textTertiary} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[colors.primary, colors.primaryLight]}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.navigate('HomeScreen')}
            >
              <Ionicons name="arrow-back" size={24} color={colors.textWhite} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profil</Text>
            <View style={styles.editButton} />
          </View>
        </LinearGradient>

        {/* User Info Card */}
        <View style={styles.userCard}>
          <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
          <Text style={styles.userName}>{userInfo.name}</Text>
          <Text style={styles.userEmail}>{userInfo.email}</Text>
          <Text style={styles.joinDate}>Üye olma tarihi: {userInfo.joinDate}</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          <Text style={styles.sectionTitle}>Ayarlar</Text>
          {profileOptions.map(renderProfileOption)}
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Profili Düzenle</Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSubtitle}>
              Bu özellik yakında eklenecektir.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setEditModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Tamam</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  header: {
    paddingTop: responsiveSize(50),
    paddingBottom: responsiveSize(20),
    paddingHorizontal: responsiveSize(20),
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: responsiveSize(8),
  },
  headerTitle: {
    fontSize: responsiveFontSize(20),
    fontWeight: 'bold',
    color: colors.textWhite,
  },
  editButton: {
    padding: responsiveSize(8),
  },
  userCard: {
    backgroundColor: colors.background,
    margin: responsiveSize(20),
    borderRadius: responsiveSize(16),
    padding: responsiveSize(20),
    alignItems: 'center',
    ...shadows.medium,
  },
  avatar: {
    width: responsiveSize(80),
    height: responsiveSize(80),
    borderRadius: responsiveSize(40),
    marginBottom: responsiveSize(12),
  },
  userName: {
    fontSize: responsiveFontSize(20),
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: responsiveSize(4),
  },
  userEmail: {
    fontSize: responsiveFontSize(14),
    color: colors.textSecondary,
    marginBottom: responsiveSize(8),
  },
  joinDate: {
    fontSize: responsiveFontSize(12),
    color: colors.textTertiary,
  },
  sectionTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: responsiveSize(12),
  },
  optionsContainer: {
    paddingHorizontal: responsiveSize(20),
  },
  optionCard: {
    backgroundColor: colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: responsiveSize(16),
    borderRadius: responsiveSize(12),
    marginBottom: responsiveSize(8),
    ...shadows.small,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    width: responsiveSize(40),
    height: responsiveSize(40),
    borderRadius: responsiveSize(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: responsiveSize(12),
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: responsiveSize(2),
  },
  optionSubtitle: {
    fontSize: responsiveFontSize(12),
    color: colors.textTertiary,
  },
  bottomSpacing: {
    height: responsiveSize(20),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: responsiveSize(16),
    padding: responsiveSize(20),
    width: '80%',
    maxWidth: responsiveSize(300),
    ...shadows.large,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: responsiveSize(16),
  },
  modalTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  modalSubtitle: {
    fontSize: responsiveFontSize(14),
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: responsiveSize(20),
  },
  modalButton: {
    backgroundColor: colors.primary,
    borderRadius: responsiveSize(12),
    padding: responsiveSize(12),
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
    color: colors.textWhite,
  },
});

export default ProfilScreen; 