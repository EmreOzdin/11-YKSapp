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
  Modal,
  FlatList,
  Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { responsiveSize, responsiveFontSize } from '../utils/responsive';
import { colors, typography, shadows } from '../utils/theme';
import { useUser } from '../context/UserContext';

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
  const { userInfo, updateAvatar } = useUser();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(userInfo.avatar);

  // userInfo.avatar değiştiğinde selectedAvatar'ı güncelle
  React.useEffect(() => {
    setSelectedAvatar(userInfo.avatar);
  }, [userInfo.avatar]);

  // Avatar seçenekleri
  const avatarOptions = [
    { id: '1', url: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: '2', url: 'https://randomuser.me/api/portraits/men/33.jpg' },
    { id: '3', url: 'https://randomuser.me/api/portraits/men/34.jpg' },
    { id: '4', url: 'https://randomuser.me/api/portraits/men/35.jpg' },
    { id: '5', url: 'https://randomuser.me/api/portraits/men/36.jpg' },
    { id: '6', url: 'https://randomuser.me/api/portraits/men/37.jpg' },
    { id: '7', url: 'https://randomuser.me/api/portraits/men/38.jpg' },
    { id: '8', url: 'https://randomuser.me/api/portraits/men/39.jpg' },
    { id: '9', url: 'https://randomuser.me/api/portraits/men/40.jpg' },
    { id: '10', url: 'https://randomuser.me/api/portraits/men/41.jpg' },
    { id: '11', url: 'https://randomuser.me/api/portraits/men/42.jpg' },
    { id: '12', url: 'https://randomuser.me/api/portraits/men/43.jpg' },
  ];

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('İzin Gerekli', 'Fotoğraf seçmek için galeri izni gereklidir.');
        return false;
      }
    }
    return true;
  };

  const requestCameraPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('İzin Gerekli', 'Fotoğraf çekmek için kamera izni gereklidir.');
        return false;
      }
    }
    return true;
  };

  const pickImageFromLibrary = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setSelectedAvatar(result.assets[0].uri);
        setImageSourceModalVisible(false);
      }
    } catch (error) {
      Alert.alert('Hata', 'Fotoğraf seçilirken bir hata oluştu.');
    }
  };

  const takePhotoWithCamera = async () => {
    const hasPermission = await requestCameraPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setSelectedAvatar(result.assets[0].uri);
        setImageSourceModalVisible(false);
      }
    } catch (error) {
      Alert.alert('Hata', 'Fotoğraf çekilirken bir hata oluştu.');
    }
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
              onPress={() => navigation.navigate('HomeTab')}
            >
              <Ionicons name="arrow-back" size={24} color={colors.textWhite} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Profil</Text>
            <View style={styles.editButton} />
          </View>
        </LinearGradient>

        {/* User Info Card */}
        <View style={styles.userCard}>
          <Image source={{ uri: selectedAvatar }} style={styles.avatar} />
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
            
            {/* Avatar Selection */}
            <View style={styles.avatarSection}>
              <View style={styles.currentAvatarContainer}>
                <Image source={{ uri: selectedAvatar }} style={styles.currentAvatar} />
                <Text style={styles.currentAvatarText}>Mevcut Fotoğraf</Text>
              </View>
              
              {/* Photo Source Buttons */}
              <View style={styles.photoSourceButtons}>
                <TouchableOpacity
                  style={styles.photoSourceButton}
                  onPress={pickImageFromLibrary}
                >
                  <MaterialCommunityIcons name="image-multiple" size={24} color={colors.primary} />
                  <Text style={styles.photoSourceButtonText}>Galeriden Seç</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.photoSourceButton}
                  onPress={takePhotoWithCamera}
                >
                  <MaterialCommunityIcons name="camera" size={24} color={colors.primary} />
                  <Text style={styles.photoSourceButtonText}>Kamera ile Çek</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.avatarSectionSubtitle}>Varsayılan avatarlar:</Text>
              <FlatList
                data={avatarOptions}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.avatarOption,
                      selectedAvatar === item.url && styles.avatarOptionSelected
                    ]}
                    onPress={() => setSelectedAvatar(item.url)}
                  >
                    <Image source={{ uri: item.url }} style={styles.avatarOptionImage} />
                    {selectedAvatar === item.url && (
                      <View style={styles.avatarCheckmark}>
                        <Ionicons name="checkmark" size={16} color={colors.textWhite} />
                      </View>
                    )}
                  </TouchableOpacity>
                )}
                contentContainerStyle={styles.avatarListContainer}
              />
            </View>

            {/* Action Buttons */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalButtonSecondary}
                onPress={() => {
                  setSelectedAvatar(userInfo.avatar);
                  setEditModalVisible(false);
                }}
              >
                <Text style={styles.modalButtonSecondaryText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  updateAvatar(selectedAvatar);
                  Alert.alert('Başarılı', 'Profil fotoğrafınız güncellendi!');
                  setEditModalVisible(false);
                }}
              >
                <Text style={styles.modalButtonText}>Kaydet</Text>
              </TouchableOpacity>
            </View>
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
    width: '90%',
    maxWidth: responsiveSize(400),
    maxHeight: '80%',
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
  avatarSection: {
    marginBottom: responsiveSize(20),
  },
  avatarSectionTitle: {
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: responsiveSize(12),
  },
  avatarSectionSubtitle: {
    fontSize: responsiveFontSize(14),
    color: colors.textSecondary,
    marginBottom: responsiveSize(12),
  },
  currentAvatarContainer: {
    alignItems: 'center',
    marginBottom: responsiveSize(16),
  },
  currentAvatar: {
    width: responsiveSize(80),
    height: responsiveSize(80),
    borderRadius: responsiveSize(40),
    marginBottom: responsiveSize(8),
  },
  currentAvatarText: {
    fontSize: responsiveFontSize(12),
    color: colors.textTertiary,
  },
  avatarListContainer: {
    paddingHorizontal: responsiveSize(4),
  },
  avatarOption: {
    marginHorizontal: responsiveSize(6),
    position: 'relative',
  },
  avatarOptionSelected: {
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: responsiveSize(30),
  },
  avatarOptionImage: {
    width: responsiveSize(60),
    height: responsiveSize(60),
    borderRadius: responsiveSize(30),
  },
  avatarCheckmark: {
    position: 'absolute',
    top: responsiveSize(2),
    right: responsiveSize(2),
    backgroundColor: colors.primary,
    borderRadius: responsiveSize(10),
    width: responsiveSize(20),
    height: responsiveSize(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: responsiveSize(12),
  },
  modalButtonSecondary: {
    flex: 1,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: responsiveSize(12),
    padding: responsiveSize(12),
    alignItems: 'center',
  },
  modalButtonSecondaryText: {
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
    color: colors.textSecondary,
  },
  photoSourceButtons: {
    marginBottom: responsiveSize(16),
  },
  photoSourceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: responsiveSize(12),
    padding: responsiveSize(12),
    marginBottom: responsiveSize(8),
  },
  photoSourceButtonText: {
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
    color: colors.primary,
    marginLeft: responsiveSize(8),
  },

});

export default ProfilScreen; 