import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
    NavigationProp,
    ParamListBase,
    useNavigation,
} from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuthStore } from '../../store/authStore';
import { useUser } from '../context/UserContext';
import DefaultAvatar, { getDefaultAvatarUrl } from '../utils/defaultAvatar';
import { responsiveFontSize, responsiveSize } from '../utils/responsive';
import { capitalizeFirstLetter } from '../utils/stringUtils';
import { colors, shadows } from '../utils/theme';

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
  const { user, logout, initializeAuth, updateProfileImage } = useAuthStore();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(
    userInfo.avatar || getDefaultAvatarUrl()
  );
  const [imageSourceModalVisible, setImageSourceModalVisible] = useState(false);
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [helpModalVisible, setHelpModalVisible] = useState(false);
  const [helpFormData, setHelpFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general',
  });

  // Initialize auth on component mount
  React.useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Kullanıcının mevcut profil fotoğrafına göre selectedAvatar'ı ayarla
  React.useEffect(() => {
    setSelectedAvatar(userInfo.avatar || getDefaultAvatarUrl());
  }, [userInfo.avatar]);

  // Avatar seçenekleri - 3 erkek, 3 kadın, 3 hayvan
  const avatarOptions = [
    // Erkek avatarları (3 adet)
    {
      id: '1',
      url: 'https://randomuser.me/api/portraits/men/32.jpg',
      type: 'erkek',
    },
    {
      id: '2',
      url: 'https://randomuser.me/api/portraits/men/33.jpg',
      type: 'erkek',
    },
    {
      id: '3',
      url: 'https://randomuser.me/api/portraits/men/34.jpg',
      type: 'erkek',
    },
    // Kadın avatarları (3 adet)
    {
      id: '4',
      url: 'https://randomuser.me/api/portraits/women/32.jpg',
      type: 'kadın',
    },
    {
      id: '5',
      url: 'https://randomuser.me/api/portraits/women/33.jpg',
      type: 'kadın',
    },
    {
      id: '6',
      url: 'https://randomuser.me/api/portraits/women/34.jpg',
      type: 'kadın',
    },
    // Hayvan avatarları (3 adet)
    {
      id: '7',
      url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150&h=150&fit=crop',
      type: 'hayvan',
    }, // Kedi
    {
      id: '8',
      url: 'https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=150&h=150&fit=crop',
      type: 'hayvan',
    }, // Köpek
    {
      id: '9',
      url: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=150&h=150&fit=crop',
      type: 'hayvan',
    }, // Tavşan
  ];

  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'İzin Gerekli',
          'Fotoğraf seçmek için galeri izni gereklidir.'
        );
        return false;
      }
    }
    return true;
  };

  const requestCameraPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'İzin Gerekli',
          'Fotoğraf çekmek için kamera izni gereklidir.'
        );
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
      }
    } catch (error) {
      Alert.alert('Hata', 'Fotoğraf çekilirken bir hata oluştu.');
    }
  };

  const handleLogout = () => {
    // Auth store'dan logout işlemi
    logout();
    // Login sayfasına yönlendirme
    navigation.reset({
      index: 0,
      routes: [{ name: 'EmailLogin' }],
    });
  };

  const handleHelpFormSubmit = () => {
    // Form validasyonu
    if (
      !helpFormData.name.trim() ||
      !helpFormData.email.trim() ||
      !helpFormData.subject.trim() ||
      !helpFormData.message.trim()
    ) {
      Alert.alert('Hata', 'Lütfen tüm zorunlu alanları doldurun.');
      return;
    }

    // Email formatı kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(helpFormData.email)) {
      Alert.alert('Hata', 'Lütfen geçerli bir e-posta adresi girin.');
      return;
    }

    // Form gönderme simülasyonu
    Alert.alert(
      'Başarılı!',
      'Destek formunuz başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
      [
        {
          text: 'Tamam',
          onPress: () => {
            // Formu sıfırla ve modal'ı kapat
            setHelpFormData({
              name: '',
              email: '',
              subject: '',
              message: '',
              category: 'general',
            });
            setHelpModalVisible(false);
          },
        },
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
      onPress: () => setHelpModalVisible(true),
    },
    {
      id: 'about',
      title: 'Uygulama Hakkında',
      subtitle: 'Versiyon 1.0.0',
      icon: 'information-outline',
      iconColor: colors.textTertiary,
      onPress: () => setAboutModalVisible(true),
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
        <View
          style={[
            styles.optionIcon,
            { backgroundColor: `${option.iconColor}20` },
          ]}
        >
          <MaterialCommunityIcons
            name={option.icon as any}
            size={20}
            color={option.iconColor}
          />
        </View>
        <View style={styles.optionText}>
          <Text style={styles.optionTitle}>{option.title}</Text>
          {option.subtitle && (
            <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
          )}
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
        <MaterialCommunityIcons
          name='chevron-right'
          size={24}
          color={colors.textTertiary}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <LinearGradient
        colors={[colors.primary, colors.primaryLight]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('HomeTab')}
          >
            <Ionicons name='arrow-back' size={24} color={colors.textWhite} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profil</Text>
          <View style={styles.editButton} />
        </View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        {/* User Info Card */}
        <View style={styles.userCard}>
          {userInfo.avatar && userInfo.avatar !== getDefaultAvatarUrl() ? (
            <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
          ) : (
            <DefaultAvatar size={responsiveSize(80)} />
          )}
          <Text style={styles.userName}>
            {capitalizeFirstLetter(user?.username || userInfo.name)}
          </Text>
          <Text style={styles.userEmail}>{user?.email || userInfo.email}</Text>
          <Text style={styles.joinDate}>
            Üye olma tarihi:{' '}
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString('tr-TR')
              : userInfo.joinDate}
          </Text>
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
        animationType='slide'
        transparent
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Profili Düzenle</Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Ionicons name='close' size={24} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            {/* Avatar Selection */}
            <View style={styles.avatarSection}>
              <View style={styles.currentAvatarContainer}>
                {userInfo.avatar &&
                userInfo.avatar !== getDefaultAvatarUrl() ? (
                  <Image
                    source={{ uri: userInfo.avatar }}
                    style={styles.currentAvatar}
                  />
                ) : (
                  <DefaultAvatar size={responsiveSize(80)} />
                )}
                <Text style={styles.currentAvatarText}>Mevcut Fotoğraf</Text>
              </View>

              {/* Photo Source Buttons */}
              <View style={styles.photoSourceButtons}>
                <TouchableOpacity
                  style={styles.photoSourceButton}
                  onPress={pickImageFromLibrary}
                >
                  <MaterialCommunityIcons
                    name='image-multiple'
                    size={24}
                    color={colors.primary}
                  />
                  <Text style={styles.photoSourceButtonText}>
                    Galeriden Seç
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.photoSourceButton}
                  onPress={takePhotoWithCamera}
                >
                  <MaterialCommunityIcons
                    name='camera'
                    size={24}
                    color={colors.primary}
                  />
                  <Text style={styles.photoSourceButtonText}>
                    Kamera ile Çek
                  </Text>
                </TouchableOpacity>
              </View>

              <Text
                style={[
                  styles.avatarSectionSubtitle,
                  { marginTop: responsiveSize(4) },
                ]}
              >
                Avatar Seçenekleri:
              </Text>
              <FlatList
                data={avatarOptions}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.avatarOption,
                      selectedAvatar === item.url &&
                        styles.avatarOptionSelected,
                    ]}
                    onPress={() => setSelectedAvatar(item.url)}
                  >
                    <Image
                      source={{ uri: item.url }}
                      style={styles.avatarOptionImage}
                    />
                    {selectedAvatar === item.url && (
                      <View style={styles.avatarCheckmark}>
                        <Ionicons
                          name='checkmark'
                          size={16}
                          color={colors.textWhite}
                        />
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
                  setSelectedAvatar(userInfo.avatar || getDefaultAvatarUrl());
                  setEditModalVisible(false);
                }}
              >
                <Text style={styles.modalButtonSecondaryText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={async () => {
                  try {
                    // Hem UserContext hem de AuthStore'da avatar'ı güncelle
                    await updateAvatar(selectedAvatar);
                    await updateProfileImage(selectedAvatar);

                    Alert.alert('Başarılı', 'Profil fotoğrafınız güncellendi!');
                    setEditModalVisible(false);
                  } catch (error) {
                    Alert.alert(
                      'Hata',
                      'Profil fotoğrafı güncellenirken bir hata oluştu.'
                    );
                  }
                }}
              >
                <Text style={styles.modalButtonText}>Kaydet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* About Modal */}
      <Modal
        visible={aboutModalVisible}
        animationType='slide'
        transparent
        onRequestClose={() => setAboutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Uygulama Hakkında</Text>
              <TouchableOpacity onPress={() => setAboutModalVisible(false)}>
                <Ionicons name='close' size={24} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.aboutContent}>
                <View style={styles.appInfoSection}>
                  <MaterialCommunityIcons
                    name='school'
                    size={60}
                    color={colors.primary}
                    style={styles.appIcon}
                  />
                  <Text style={styles.appName}>YKS Hazırlık Uygulaması</Text>
                  <Text style={styles.appVersion}>Versiyon 1.0.0</Text>
                </View>

                <View style={styles.aboutSection}>
                  <Text style={styles.aboutSectionTitle}>
                    📚 Uygulama Hakkında
                  </Text>
                  <Text style={styles.aboutText}>
                    YKS Hazırlık Uygulaması, üniversite sınavına hazırlanan
                    öğrenciler için geliştirilmiş kapsamlı bir eğitim
                    platformudur. TYT, AYT ve YDT sınavlarında başarı elde
                    etmenizi sağlayacak içerikler sunar.
                  </Text>
                </View>

                <View style={styles.aboutSection}>
                  <Text style={styles.aboutSectionTitle}>✨ Özellikler</Text>
                  <Text style={styles.aboutText}>
                    • Sınav formatında sorular{'\n'}• Detaylı çözüm açıklamaları
                    {'\n'}• İlerleme takibi{'\n'}• Konu bazında çalışma{'\n'}•
                    Net hesaplama sistemi{'\n'}• Deneme sınavları
                  </Text>
                </View>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setAboutModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Tamam</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Help & Support Modal */}
      <Modal
        visible={helpModalVisible}
        animationType='slide'
        transparent
        onRequestClose={() => {
          setHelpModalVisible(false);
          // Form verilerini sıfırla
          setHelpFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
            category: 'general',
          });
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Yardım & Destek</Text>
              <TouchableOpacity
                onPress={() => {
                  setHelpModalVisible(false);
                  // Form verilerini sıfırla
                  setHelpFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                    category: 'general',
                  });
                }}
              >
                <Ionicons name='close' size={24} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.helpFormContent}>
                <View style={styles.helpSection}>
                  <Text style={styles.helpSectionTitle}>📝 Destek Formu</Text>
                  <Text style={styles.helpFormSubtitle}>
                    Sorununuzu detaylı bir şekilde açıklayın, size en kısa
                    sürede dönüş yapalım.
                  </Text>
                </View>

                <View style={styles.formSection}>
                  <Text style={styles.formLabel}>Ad Soyad *</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder='Adınızı ve soyadınızı girin'
                    value={helpFormData.name}
                    onChangeText={text =>
                      setHelpFormData({ ...helpFormData, name: text })
                    }
                    placeholderTextColor={colors.textTertiary}
                  />
                </View>

                <View style={styles.formSection}>
                  <Text style={styles.formLabel}>E-posta *</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder='E-posta adresinizi girin'
                    value={helpFormData.email}
                    onChangeText={text =>
                      setHelpFormData({ ...helpFormData, email: text })
                    }
                    placeholderTextColor={colors.textTertiary}
                    keyboardType='email-address'
                    autoCapitalize='none'
                  />
                </View>

                <View style={styles.formSection}>
                  <Text style={styles.formLabel}>Kategori</Text>
                  <View style={styles.categoryContainer}>
                    {[
                      { value: 'general', label: 'Genel' },
                      { value: 'technical', label: 'Teknik Sorun' },
                      { value: 'content', label: 'İçerik' },
                      { value: 'payment', label: 'Ödeme' },
                      { value: 'other', label: 'Diğer' },
                    ].map(category => (
                      <TouchableOpacity
                        key={category.value}
                        style={[
                          styles.categoryButton,
                          helpFormData.category === category.value &&
                            styles.categoryButtonActive,
                        ]}
                        onPress={() =>
                          setHelpFormData({
                            ...helpFormData,
                            category: category.value,
                          })
                        }
                      >
                        <Text
                          style={[
                            styles.categoryButtonText,
                            helpFormData.category === category.value &&
                              styles.categoryButtonTextActive,
                          ]}
                        >
                          {category.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.formSection}>
                  <Text style={styles.formLabel}>Konu *</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder='Sorununuzun kısa özetini yazın'
                    value={helpFormData.subject}
                    onChangeText={text =>
                      setHelpFormData({ ...helpFormData, subject: text })
                    }
                    placeholderTextColor={colors.textTertiary}
                  />
                </View>

                <View style={styles.formSection}>
                  <Text style={styles.formLabel}>Mesaj *</Text>
                  <TextInput
                    style={[styles.formInput, styles.formTextArea]}
                    placeholder='Sorununuzu detaylı bir şekilde açıklayın...'
                    value={helpFormData.message}
                    onChangeText={text =>
                      setHelpFormData({ ...helpFormData, message: text })
                    }
                    placeholderTextColor={colors.textTertiary}
                    multiline
                    numberOfLines={6}
                    textAlignVertical='top'
                  />
                </View>
              </View>
            </ScrollView>

            <View style={styles.formActions}>
              <TouchableOpacity
                style={styles.modalButtonSecondary}
                onPress={() => {
                  setHelpModalVisible(false);
                  // Form verilerini sıfırla
                  setHelpFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: '',
                    category: 'general',
                  });
                }}
              >
                <Text style={styles.modalButtonSecondaryText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleHelpFormSubmit}
              >
                <Text style={styles.modalButtonText}>Gönder</Text>
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
    zIndex: 1000,
    elevation: 5,
  },
  scrollView: {
    flex: 1,
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
    padding: responsiveSize(16),
    alignItems: 'center',
    ...shadows.medium,
  },
  avatar: {
    width: responsiveSize(80),
    height: responsiveSize(80),
    borderRadius: responsiveSize(40),
    marginBottom: responsiveSize(8),
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
    marginTop: responsiveSize(-8),
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
  // About Modal Styles
  aboutContent: {
    paddingBottom: responsiveSize(20),
  },
  appInfoSection: {
    alignItems: 'center',
    marginBottom: responsiveSize(24),
    paddingBottom: responsiveSize(20),
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  appIcon: {
    marginBottom: responsiveSize(12),
  },
  appName: {
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: responsiveSize(4),
  },
  appVersion: {
    fontSize: responsiveFontSize(14),
    color: colors.textSecondary,
  },
  aboutSection: {
    marginBottom: responsiveSize(20),
  },
  aboutSectionTitle: {
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: responsiveSize(8),
  },
  aboutText: {
    fontSize: responsiveFontSize(14),
    color: colors.textSecondary,
    lineHeight: 20,
  },
  // Help Modal Styles
  helpContent: {
    paddingBottom: responsiveSize(20),
  },
  helpSection: {
    marginBottom: responsiveSize(24),
  },
  helpSectionTitle: {
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: responsiveSize(12),
  },
  helpText: {
    fontSize: responsiveFontSize(14),
    color: colors.textSecondary,
    lineHeight: 20,
  },
  faqItem: {
    marginBottom: responsiveSize(16),
    padding: responsiveSize(16),
    backgroundColor: colors.backgroundSecondary,
    borderRadius: responsiveSize(12),
  },
  faqQuestion: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: responsiveSize(8),
  },
  faqAnswer: {
    fontSize: responsiveFontSize(13),
    color: colors.textSecondary,
    lineHeight: 18,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: responsiveSize(12),
    backgroundColor: colors.backgroundSecondary,
    borderRadius: responsiveSize(12),
    marginBottom: responsiveSize(8),
  },
  contactText: {
    marginLeft: responsiveSize(12),
    flex: 1,
  },
  contactTitle: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: responsiveSize(2),
  },
  contactSubtitle: {
    fontSize: responsiveFontSize(12),
    color: colors.textSecondary,
  },
  // Help Form Styles
  helpFormButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: responsiveSize(16),
    borderRadius: responsiveSize(12),
    marginTop: responsiveSize(8),
  },
  helpFormButtonText: {
    fontSize: responsiveFontSize(16),
    fontWeight: '600',
    color: colors.textWhite,
    marginLeft: responsiveSize(8),
  },
  helpFormContent: {
    paddingBottom: responsiveSize(20),
  },
  helpFormSubtitle: {
    fontSize: responsiveFontSize(14),
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: responsiveSize(16),
  },
  formSection: {
    marginBottom: responsiveSize(16),
  },
  formLabel: {
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: responsiveSize(8),
  },
  formInput: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: responsiveSize(8),
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(12),
    fontSize: responsiveFontSize(14),
    color: colors.textPrimary,
  },
  formTextArea: {
    height: responsiveSize(120),
    textAlignVertical: 'top',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: responsiveSize(8),
  },
  categoryButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: responsiveSize(8),
    paddingHorizontal: responsiveSize(12),
    paddingVertical: responsiveSize(8),
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryButtonText: {
    fontSize: responsiveFontSize(12),
    color: colors.textSecondary,
  },
  categoryButtonTextActive: {
    color: colors.textWhite,
    fontWeight: '600',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: responsiveSize(12),
  },
});

export default ProfilScreen;
