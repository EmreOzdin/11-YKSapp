import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useAuthStore } from '../../store/authStore';
import { useUser } from '../context/UserContext';

import DefaultAvatar, { getDefaultAvatarUrl } from '../utils/defaultAvatar';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveSize,
} from '../utils/responsive';
import { capitalizeFirstLetter } from '../utils/stringUtils';
import { colors, shadows } from '../utils/theme';

const CARD_DATA = [
  {
    title: 'Fen Bilimleri Sınavı',
    gradient: ['#228be6', '#6ee7b7'] as const,
    image: require('../../assets/physicsexam.png'),
  },
  {
    title: 'Türkçe Sınavı',
    gradient: ['#6c47ff', '#b983ff'] as const,
    image: require('../../assets/turkishexam.png'),
  },
  {
    title: 'Matematik Sınavı',
    gradient: ['#f7b731', '#ffb347'] as const,
    image: require('../../assets/mathexam.png'),
  },
  {
    title: 'Sosyal Bilimler Sınavı',
    gradient: ['#ff6b81', '#ffb6b9'] as const,
    image: require('../../assets/socialexam.png'),
  },
];

const notifications = [
  {
    id: '1',
    title: 'Yeni deneme sınavı eklendi!',
    date: '2 saat önce',
    timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 saat önce
  },
  {
    id: '2',
    title: 'Çalışma serini 3 gün oldu!',
    date: 'Dün',
    timestamp: Date.now() - 24 * 60 * 60 * 1000, // 1 gün önce
  },
  {
    id: '3',
    title: 'Matematikte yeni konu anlatımı var.',
    date: '2 gün önce',
    timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 gün önce
  },
];

const NotificationModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => (
  <Modal visible={visible} animationType='slide' transparent>
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.25)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onStartShouldSetResponder={() => true}
      onResponderRelease={onClose}
    >
      <View
        style={{
          width: '85%',
          backgroundColor: '#fff',
          borderRadius: responsiveSize(28),
          paddingTop: responsiveSize(18),
          paddingHorizontal: responsiveSize(18),
          paddingBottom: responsiveSize(32),
          maxHeight: '70%',
        }}
      >
        <Text
          style={{
            fontSize: responsiveFontSize(20),
            fontWeight: 'bold',
            marginBottom: responsiveSize(12),
          }}
        >
          Bildirimler
        </Text>
        <FlatList
          data={notifications}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                paddingVertical: responsiveSize(10),
                borderBottomWidth: 1,
                borderColor: '#eee',
              }}
            >
              <Text
                style={{
                  fontSize: responsiveFontSize(16),
                  color: '#222',
                  fontWeight: '500',
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(13),
                  color: '#888',
                  marginTop: responsiveSize(2),
                }}
              >
                {item.date}
              </Text>
            </View>
          )}
          ListEmptyComponent={
            <Text
              style={{
                color: '#888',
                textAlign: 'center',
                marginTop: responsiveSize(24),
              }}
            >
              Henüz bildiriminiz yok.
            </Text>
          }
        />
        <Pressable
          onPress={onClose}
          style={{
            marginTop: responsiveSize(18),
            alignSelf: 'center',
            padding: responsiveSize(10),
          }}
        >
          <Text
            style={{
              color: '#1877f2',
              fontWeight: 'bold',
              fontSize: responsiveFontSize(16),
            }}
          >
            Kapat
          </Text>
        </Pressable>
      </View>
    </View>
  </Modal>
);

const SearchModal = ({
  visible,
  onClose,
  value,
  onChange,
  results,
  onResultPress,
}: {
  visible: boolean;
  onClose: () => void;
  value: string;
  onChange: (t: string) => void;
  results: { title: string; image: any }[];
  onResultPress: (item: { title: string; image: any }) => void;
}) => (
  <Modal visible={visible} animationType='fade' transparent>
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.18)',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
      onStartShouldSetResponder={() => true}
      onResponderRelease={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ width: '100%' }}
      >
        <View
          style={{
            marginTop: responsiveSize(60),
            width: '90%',
            alignSelf: 'center',
            backgroundColor: '#fff',
            borderRadius: responsiveSize(16),
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: responsiveSize(14),
            paddingVertical: responsiveSize(8),
            elevation: 3,
          }}
        >
          <Ionicons
            name='search'
            size={responsiveSize(22)}
            color='#888'
            style={{ marginRight: responsiveSize(8) }}
          />
          <TextInput
            autoFocus
            value={value}
            onChangeText={onChange}
            placeholder='Ne aramak istiyorsunuz?'
            placeholderTextColor='#888'
            style={{
              flex: 1,
              fontSize: responsiveFontSize(17),
              color: '#222',
              paddingVertical: responsiveSize(6),
            }}
            returnKeyType='search'
            clearButtonMode='while-editing'
            autoCorrect={false}
            autoCapitalize='none'
            blurOnSubmit={false}
          />
          <TouchableOpacity
            onPress={onClose}
            style={{ marginLeft: responsiveSize(8) }}
          >
            <MaterialCommunityIcons
              name='close'
              size={responsiveSize(22)}
              color='#888'
            />
          </TouchableOpacity>
        </View>
        {/* Sonuçlar */}
        {value.length > 0 && (
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              backgroundColor: '#fff',
              borderRadius: responsiveSize(16),
              marginTop: responsiveSize(8),
              maxHeight: responsiveSize(220),
              elevation: 2,
              paddingVertical: responsiveSize(4),
            }}
          >
            {results.length > 0 ? (
              results.map((item, idx) => (
                <TouchableOpacity
                  key={item.title}
                  onPress={() => {
                    onResultPress(item);
                    onClose();
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: responsiveSize(10),
                    paddingHorizontal: responsiveSize(8),
                    borderBottomWidth: idx !== results.length - 1 ? 1 : 0,
                    borderColor: '#f0f0f0',
                  }}
                  activeOpacity={0.7}
                >
                  <Image
                    source={item.image}
                    style={{
                      width: responsiveSize(32),
                      height: responsiveSize(32),
                      marginRight: responsiveSize(12),
                      borderRadius: responsiveSize(8),
                    }}
                  />
                  <Text
                    style={{ fontSize: responsiveFontSize(16), color: '#222' }}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text
                style={{
                  color: '#888',
                  textAlign: 'center',
                  padding: responsiveSize(16),
                }}
              >
                Sonuç bulunamadı.
              </Text>
            )}
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  </Modal>
);

const HomeScreen: React.FC = () => {
  const { userInfo } = useUser();
  const { user, initializeAuth, updateProfileImage } = useAuthStore();
  const [notifModalVisible, setNotifModalVisible] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const swiperRef = React.useRef<any>(null);
  const [cardData, setCardData] = useState(CARD_DATA);

  // Bildirim durumunu yükle
  useEffect(() => {
    const loadNotificationStatus = async () => {
      try {
        const lastViewedTime = await AsyncStorage.getItem(
          'lastNotificationViewTime'
        );
        const currentTime = Date.now();

        if (lastViewedTime) {
          const lastViewed = parseInt(lastViewedTime);
          // Son görüntüleme zamanından sonra gelen bildirimleri say
          const newNotificationsCount = notifications.filter(
            notification => notification.timestamp > lastViewed
          ).length;

          setUnreadCount(newNotificationsCount);
        } else {
          // İlk kez açılıyorsa tüm bildirimleri okunmamış olarak göster
          setUnreadCount(notifications.length);
        }
      } catch (error) {
        console.error('Bildirim durumu yüklenirken hata:', error);
        setUnreadCount(notifications.length);
      }
    };

    loadNotificationStatus();
  }, []);

  // Bildirim modalını açma fonksiyonu
  const openNotificationModal = async () => {
    setNotifModalVisible(true);
    setUnreadCount(0);

    // Bildirim görüntüleme zamanını kaydet
    try {
      await AsyncStorage.setItem(
        'lastNotificationViewTime',
        Date.now().toString()
      );
    } catch (error) {
      console.error('Bildirim durumu kaydedilirken hata:', error);
    }
  };

  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  // Initialize auth on component mount
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Navigation focus listener to handle card index when returning from other screens
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      try {
        const savedCardIndex = await AsyncStorage.getItem(
          'lastVisitedCardIndex'
        );
        if (savedCardIndex !== null) {
          const cardIndex = parseInt(savedCardIndex);

          // Reorder cards to show the visited card first
          const reorderedCards = [...CARD_DATA];
          const visitedCard = reorderedCards[cardIndex];
          reorderedCards.splice(cardIndex, 1);
          reorderedCards.unshift(visitedCard);
          setCardData(reorderedCards);
          setCurrentCardIndex(0);
          await AsyncStorage.removeItem('lastVisitedCardIndex');
        }
      } catch (error) {}
    });

    return unsubscribe;
  }, [navigation]);

  // Arama sonuçlarını filtrele
  const filteredSearchResults =
    searchText.length > 0
      ? cardData.filter(card =>
          card.title.toLowerCase().includes(searchText.toLowerCase())
        )
      : [];

  // Arama sonucuna tıklandığında yönlendirme
  const handleSearchResultPress = async (item: {
    title: string;
    image: any;
  }) => {
    // Store the current card index before navigating
    const cardIndex = cardData.findIndex(card => card.title === item.title);
    try {
      await AsyncStorage.setItem('lastVisitedCardIndex', cardIndex.toString());
    } catch (error) {}

    switch (item.title) {
      case 'Fen Bilimleri Sınavı':
        navigation.navigate('Fen Bilimleri');
        break;
      case 'Türkçe Sınavı':
        navigation.navigate('Türkçe');
        break;
      case 'Matematik Sınavı':
        navigation.navigate('Matematik');
        break;
      case 'Sosyal Bilimler Sınavı':
        navigation.navigate('Sosyal Bilimler');
        break;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: responsiveSize(20) }}
        scrollEnabled={true}
        bounces={true}
        style={{ flex: 1 }}
        nestedScrollEnabled={false}
        keyboardShouldPersistTaps='handled'
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfilScreen')}
            style={styles.avatarContainer}
          >
            {userInfo.avatar && userInfo.avatar !== getDefaultAvatarUrl() ? (
              <Image source={{ uri: userInfo.avatar }} style={styles.avatar} />
            ) : (
              <DefaultAvatar size={responsiveSize(48)} />
            )}
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Merhaba!</Text>
            <Text style={styles.userName}>
              {capitalizeFirstLetter(
                user?.username || userInfo.name.split(' ')[0]
              )}
            </Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              style={{
                marginRight: 12,
                padding: 12,
                borderRadius: 24,
                backgroundColor: 'rgba(0,0,0,0.05)',
                minWidth: 48,
                minHeight: 48,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                setSearchModalVisible(true);
              }}
              activeOpacity={0.6}
              hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            >
              <Ionicons name='search' size={28} color='#222' />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                marginRight: 12,
                padding: 12,
                borderRadius: 24,
                backgroundColor: 'rgba(0,0,0,0.05)',
                minWidth: 48,
                minHeight: 48,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={openNotificationModal}
              activeOpacity={0.6}
              hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            >
              <Ionicons name='notifications-outline' size={28} color='#222' />
              {unreadCount > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    top: -4,
                    right: 4,
                    minWidth: 18,
                    height: 18,
                    borderRadius: 9,
                    backgroundColor: '#ff4757',
                    borderWidth: 2,
                    borderColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 3,
                  }}
                >
                  <Text
                    style={{ color: '#fff', fontSize: 11, fontWeight: 'bold' }}
                  >
                    {unreadCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Test Butonu */}
        <TouchableOpacity
          style={{
            backgroundColor: '#007AFF',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 8,
            marginHorizontal: 20,
            marginBottom: 20,
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('YksCardsTest')}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
            YKS Kartları MongoDB Test
          </Text>
        </TouchableOpacity>

        {/* Swiper Cards */}
        <View style={styles.swiperContainer}>
          <View style={styles.swiperWrapper}>
            <Swiper
              ref={swiperRef}
              cardStyle={{ height: 135 }}
              cards={cardData}
              renderCard={item => {
                return (
                  <TouchableOpacity
                    onPress={async () => {
                      // Store the current card index before navigating
                      const cardIndex = cardData.findIndex(
                        card => card.title === item.title
                      );
                      try {
                        await AsyncStorage.setItem(
                          'lastVisitedCardIndex',
                          cardIndex.toString()
                        );
                      } catch (error) {}

                      switch (item.title) {
                        case 'Fen Bilimleri Sınavı':
                          navigation.navigate('Fen Bilimleri');
                          break;
                        case 'Türkçe Sınavı':
                          navigation.navigate('Türkçe');
                          break;
                        case 'Matematik Sınavı':
                          navigation.navigate('Matematik');
                          break;
                        case 'Sosyal Bilimler Sınavı':
                          navigation.navigate('Sosyal Bilimler');
                          break;
                      }
                    }}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={item.gradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={[
                        styles.featureCardStacked,
                        {
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          position: 'relative',
                        },
                      ]}
                    >
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                          paddingLeft: 8,
                        }}
                      >
                        <Text style={styles.featureTitle}>{item.title}</Text>
                        <View style={styles.featureRow}>
                          <MaterialCommunityIcons
                            name='alarm'
                            size={18}
                            color='#fff'
                          />
                          <Text style={styles.featureTime}>45 dakika</Text>
                        </View>
                      </View>
                      <View style={styles.swiperImageContainer}>
                        <Image source={item.image} style={styles.swiperImage} />
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              }}
              stackSize={3}
              stackSeparation={10}
              backgroundColor='transparent'
              cardHorizontalMargin={8}
              cardIndex={currentCardIndex}
              infinite
              showSecondCard
              verticalSwipe={false}
              horizontalSwipe={true}
              onSwipedAll={() => {}}
              onSwiped={cardIndex => {
                setCurrentCardIndex(cardIndex);
              }}
              onSwipedLeft={cardIndex => {}}
              onSwipedRight={cardIndex => {}}
            />
          </View>
        </View>

        {/* Dersler Grid */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Çalışma Soruları</Text>
        </View>
        <View style={styles.subjectGrid}>
          {/* Fen Bilimleri */}
          <TouchableOpacity
            style={[styles.subjectGridItem, { backgroundColor: '#e3f2fd' }]}
            onPress={() => navigation.navigate('Fen Bilimleri')}
          >
            <Image
              source={{
                uri: 'https://img.icons8.com/3d-fluency/94/physics.png',
              }}
              style={styles.subjectIcon}
            />
            <Text style={styles.subjectGridLabel}>Fen Bilimleri</Text>
          </TouchableOpacity>
          {/* Türkçe */}
          <TouchableOpacity
            style={[styles.subjectGridItem, { backgroundColor: '#ffebee' }]}
            onPress={() => navigation.navigate('Türkçe')}
          >
            <Image
              source={require('../../assets/turkish.png')}
              style={styles.subjectIcon}
            />
            <Text style={styles.subjectGridLabel}>Türkçe</Text>
          </TouchableOpacity>
          {/* Matematik */}
          <TouchableOpacity
            style={[styles.subjectGridItem, { backgroundColor: '#fff3e0' }]}
            onPress={() => navigation.navigate('Matematik')}
          >
            <Image
              source={require('../../assets/math.png')}
              style={styles.subjectIcon}
            />
            <Text style={styles.subjectGridLabel}>Matematik</Text>
          </TouchableOpacity>
          {/* Sosyal Bilimler */}
          <TouchableOpacity
            style={[styles.subjectGridItem, { backgroundColor: '#e8f5e8' }]}
            onPress={() => navigation.navigate('Sosyal Bilimler')}
          >
            <Image
              source={require('../../assets/social.png')}
              style={styles.subjectIcon}
            />
            <Text style={styles.subjectGridLabel}>Sosyal Bilimler</Text>
          </TouchableOpacity>
        </View>
        {/* Video kurs */}
        <View style={styles.sectionRowExam}>
          <Text style={styles.sectionTitle}>Sınav Denemesi</Text>
        </View>
        {/* Sınav Denemesi Grid */}
        <View style={styles.sınavDenemesiGrid}>
          {/* TYT */}
          <TouchableOpacity
            style={[
              styles.sınavDenemesiGridItem,
              { backgroundColor: '#e1f5fe' },
            ]}
            onPress={() => navigation.navigate('TYT')}
          >
            <Image
              source={require('../../assets/tyt.png')}
              style={styles.examIcon}
            />
            <Text style={styles.subjectGridLabel}>TYT</Text>
          </TouchableOpacity>
          {/* AYT */}
          <TouchableOpacity
            style={[
              styles.sınavDenemesiGridItem,
              { backgroundColor: '#f1e8ff' },
            ]}
            onPress={() => navigation.navigate('AYT')}
          >
            <Image
              source={require('../../assets/ayt.png')}
              style={styles.examIcon}
            />
            <Text style={styles.subjectGridLabel}>AYT</Text>
          </TouchableOpacity>
          {/* YDT */}
          <TouchableOpacity
            style={[
              styles.sınavDenemesiGridItem,
              { backgroundColor: '#fff8e1' },
            ]}
            onPress={() => navigation.navigate('YDT')}
          >
            <Image
              source={require('../../assets/ydt.png')}
              style={styles.examIcon}
            />
            <Text style={styles.subjectGridLabel}>YDT</Text>
          </TouchableOpacity>
        </View>
        {/* Video kurs */}
        <View style={styles.sectionRowPast}>
          <Text style={styles.sectionTitle}>Çıkmış Sorular</Text>
        </View>
        {/* Sınav Denemesi Grid */}
        <View style={styles.sınavDenemesiGrid}>
          {/* TYT */}
          <TouchableOpacity
            style={[
              styles.sınavDenemesiGridItem,
              { backgroundColor: '#e0f7fa' },
            ]}
            onPress={() => navigation.navigate('TYT Past')}
          >
            <Image
              source={{
                uri: 'https://threedio-prod-var-cdn.icons8.com/tr/preview_sets/previews/a4Ynggh7Gc4mgfHp.webp',
              }}
              style={styles.examIcon}
            />
            <Text style={styles.subjectGridLabel}>TYT</Text>
          </TouchableOpacity>
          {/* AYT */}
          <TouchableOpacity
            style={[
              styles.sınavDenemesiGridItem,
              { backgroundColor: '#f3e5f5' },
            ]}
            onPress={() => navigation.navigate('AYT Past')}
          >
            <Image
              source={{
                uri: 'https://img.icons8.com/3d-fluency/94/graduation-cap.png',
              }}
              style={styles.examIcon}
            />
            <Text style={styles.subjectGridLabel}>AYT</Text>
          </TouchableOpacity>
          {/* YDT */}
          <TouchableOpacity
            style={[
              styles.sınavDenemesiGridItem,
              { backgroundColor: '#fffde7' },
            ]}
            onPress={() => navigation.navigate('YDT Past')}
          >
            <Image
              source={{
                uri: 'https://img.icons8.com/3d-fluency/94/language.png',
              }}
              style={styles.examIcon}
            />
            <Text style={styles.subjectGridLabel}>YDT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <NotificationModal
        visible={notifModalVisible}
        onClose={() => setNotifModalVisible(false)}
      />
      <SearchModal
        visible={searchModalVisible}
        onClose={() => setSearchModalVisible(false)}
        value={searchText}
        onChange={setSearchText}
        results={filteredSearchResults}
        onResultPress={handleSearchResultPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: responsiveSize(20),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: responsiveSize(2),
    paddingHorizontal: responsiveSize(20),
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: responsiveSize(12),
  },
  headerTitle: {
    fontSize: responsiveFontSize(26),
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  userName: {
    fontSize: responsiveFontSize(20),
    fontWeight: '600',
    color: colors.textTertiary,
    marginTop: responsiveSize(2),
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: responsiveSize(12),
    height: responsiveSize(12),
    borderRadius: responsiveSize(6),
    backgroundColor: colors.error,
    borderWidth: 2,
    borderColor: colors.background,
  },
  avatar: {
    width: responsiveSize(48),
    height: responsiveSize(48),
    borderRadius: responsiveSize(24),
  },
  avatarContainer: {
    borderRadius: responsiveSize(24),
    overflow: 'hidden',
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: colors.gradients.pink[0],
    borderRadius: responsiveSize(24),
    padding: responsiveSize(20),
    margin: responsiveSize(20),
    alignItems: 'center',
    marginTop: responsiveSize(28),
  },
  featureCardStacked: {
    flexDirection: 'row',
    borderRadius: responsiveSize(24),
    padding: responsiveSize(12),
    alignItems: 'center',
    height: responsiveHeight(135),
    ...shadows.small,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  featureTitle: {
    color: colors.textWhite,
    fontSize: responsiveFontSize(22),
    fontWeight: 'bold',
    marginBottom: responsiveSize(2),
    marginTop: 0,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveSize(6),
    marginBottom: responsiveSize(4),
  },
  featureTime: {
    color: colors.textWhite,
    fontSize: responsiveFontSize(16),
    marginLeft: responsiveSize(6),
  },
  featureImage: {
    width: responsiveSize(80),
    height: responsiveSize(80),
    marginLeft: responsiveSize(16),
    borderRadius: responsiveSize(16),
    backgroundColor: colors.background,
  },
  featureImageIcon: {
    width: responsiveSize(90),
    height: responsiveSize(90),
    position: 'relative',
    right: 0,
    top: 0,
    marginLeft: responsiveSize(12),
    alignSelf: 'center',
    opacity: 1,
    resizeMode: 'contain',
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: responsiveSize(165),
    marginBottom: responsiveSize(6),
    marginHorizontal: responsiveSize(20),
  },
  sectionRowExam: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: responsiveSize(185),
    marginBottom: responsiveSize(6),
    marginHorizontal: responsiveSize(20),
  },
  sectionRowPast: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: responsiveSize(185),
    marginBottom: responsiveSize(6),
    marginHorizontal: responsiveSize(20),
  },
  sectionTitle: {
    fontSize: responsiveFontSize(20),
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  seeAll: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(15),
  },
  subjectGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: responsiveSize(20),
    marginTop: responsiveSize(14),
    marginBottom: responsiveSize(8),
    flex: 1,
  },
  subjectIconBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafd',
    borderRadius: responsiveSize(16),
    padding: responsiveSize(14),
    marginHorizontal: responsiveSize(4),
  },
  subjectLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: responsiveSize(20),
    marginBottom: responsiveSize(8),
  },
  subjectLabel: {
    fontSize: responsiveFontSize(13),
    color: '#222',
    fontWeight: '500',
    textAlign: 'center',
    flex: 1,
  },
  videoCard: {
    flexDirection: 'row',
    backgroundColor: '#f8fafd',
    borderRadius: responsiveSize(18),
    padding: responsiveSize(14),
    marginHorizontal: responsiveSize(20),
    marginTop: responsiveSize(10),
    alignItems: 'center',
  },
  videoImage: {
    width: responsiveSize(60),
    height: responsiveSize(60),
    borderRadius: responsiveSize(12),
    backgroundColor: '#fff',
  },
  videoTitle: {
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
    color: '#222',
  },
  videoTeacher: {
    fontSize: responsiveFontSize(13),
    color: '#888',
    marginTop: responsiveSize(2),
  },
  videoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveSize(4),
  },
  videoRating: {
    fontSize: responsiveFontSize(14),
    color: '#222',
    marginLeft: responsiveSize(4),
    marginRight: responsiveSize(8),
  },
  videoLive: {
    fontSize: responsiveFontSize(12),
    color: '#fff',
    backgroundColor: '#ff6b81',
    borderRadius: responsiveSize(8),
    paddingHorizontal: responsiveSize(8),
    paddingVertical: responsiveSize(2),
    marginLeft: responsiveSize(8),
    overflow: 'hidden',
  },

  swiperContainer: {
    position: 'absolute',
    top: responsiveSize(-45),
    left: -23,
    right: 0,
    height: responsiveSize(135),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    elevation: 0,
  },
  swiperWrapper: {
    width: '90%',
    maxWidth: responsiveSize(420),
    overflow: 'visible',
    pointerEvents: 'box-none',
  },
  swiperImageContainer: {
    width: '50%',
    height: '140%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: responsiveSize(-10),
  },
  swiperImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  subjectGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: responsiveSize(20),
    marginTop: responsiveSize(8),
    marginBottom: responsiveSize(-170),
  },
  subjectGridItem: {
    flex: 1,
    marginHorizontal: responsiveSize(6),
    aspectRatio: 1,
    borderRadius: responsiveSize(16),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: responsiveSize(16),
    paddingHorizontal: responsiveSize(8),
    minHeight: responsiveSize(100),
    maxHeight: responsiveSize(120),
  },
  sınavDenemesiGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: responsiveSize(20),
    marginTop: responsiveSize(8),
    marginBottom: responsiveSize(-170),
  },
  sınavDenemesiGridItem: {
    width: responsiveSize(100),
    height: responsiveSize(100),
    borderRadius: responsiveSize(20),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: responsiveSize(12),
    paddingHorizontal: responsiveSize(8),
  },
  subjectGridLabel: {
    fontSize: responsiveFontSize(13),
    color: colors.textPrimary,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: responsiveSize(3),
  },
  subjectIcon: {
    width: responsiveSize(40),
    height: responsiveSize(40),
    marginBottom: responsiveSize(3),
  },
  examIcon: {
    width: responsiveSize(60),
    height: responsiveSize(60),
    marginBottom: responsiveSize(2),
  },
});

export default HomeScreen;
