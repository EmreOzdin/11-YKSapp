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
  Alert,
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
import { addSampleData } from '../services/sampleData';
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
  { id: '1', title: 'Yeni deneme sınavı eklendi!', date: '2 saat önce' },
  { id: '2', title: 'Çalışma serini 3 gün oldu!', date: 'Dün' },
  { id: '3', title: 'Matematikte yeni konu anlatımı var.', date: '2 gün önce' },
];

// Arama verileri
const searchData = [
  {
    id: '1',
    title: 'Fen Bilimleri Sınavı',
    type: 'exam',
    route: 'Fen Bilimleri',
    icon: 'flask',
  },
  {
    id: '2',
    title: 'Türkçe Sınavı',
    type: 'exam',
    route: 'Türkçe',
    icon: 'book',
  },
  {
    id: '3',
    title: 'Matematik Sınavı',
    type: 'exam',
    route: 'Matematik',
    icon: 'calculator',
  },
  {
    id: '4',
    title: 'Sosyal Bilimler Sınavı',
    type: 'exam',
    route: 'Sosyal Bilimler',
    icon: 'globe',
  },
  {
    id: '5',
    title: 'TYT Deneme Sınavı',
    type: 'exam',
    route: 'TytScreen',
    icon: 'school',
  },
  {
    id: '6',
    title: 'AYT Deneme Sınavı',
    type: 'exam',
    route: 'AytScreen',
    icon: 'school',
  },
  {
    id: '7',
    title: 'YDT Deneme Sınavı',
    type: 'exam',
    route: 'YdtScreen',
    icon: 'school',
  },
  {
    id: '8',
    title: 'TYT Geçmiş Sınavlar',
    type: 'past',
    route: 'TytPastScreen',
    icon: 'time',
  },
  {
    id: '9',
    title: 'AYT Geçmiş Sınavlar',
    type: 'past',
    route: 'AytPastScreen',
    icon: 'time',
  },
  {
    id: '10',
    title: 'YDT Geçmiş Sınavlar',
    type: 'past',
    route: 'YdtPastScreen',
    icon: 'time',
  },
  {
    id: '11',
    title: 'Bilgi Kartları',
    type: 'cards',
    route: 'CardsScreen',
    icon: 'card',
  },
  {
    id: '12',
    title: 'Hedefler',
    type: 'goals',
    route: 'HedeflerScreen',
    icon: 'target',
  },
  {
    id: '13',
    title: 'Performans',
    type: 'performance',
    route: 'PerformansScreen',
    icon: 'stats-chart',
  },
  {
    id: '14',
    title: 'Profil',
    type: 'profile',
    route: 'ProfilScreen',
    icon: 'person',
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
            placeholder='Ara...'
            style={{
              flex: 1,
              fontSize: responsiveFontSize(17),
              color: '#222',
              paddingVertical: responsiveSize(6),
            }}
            returnKeyType='search'
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
  const [unreadCount, setUnreadCount] = useState(notifications.length);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const swiperRef = React.useRef<any>(null);
  const [cardData, setCardData] = useState(CARD_DATA);

  // Örnek verileri yükleme fonksiyonu
  const loadSampleData = async () => {
    try {
      await addSampleData();
      Alert.alert('Başarılı', 'Örnek veriler yüklendi!');
    } catch (error) {
      Alert.alert('Hata', 'Veriler yüklenirken bir hata oluştu.');
    }
  };

  // Arama sonuçlarını filtrele
  const filteredSearchResults =
    searchValue.length > 0
      ? cardData.filter(card =>
          card.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      : [];
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
          console.log('Setting card index to:', cardIndex);
          // Reorder cards to show the visited card first
          const reorderedCards = [...CARD_DATA];
          const visitedCard = reorderedCards[cardIndex];
          reorderedCards.splice(cardIndex, 1);
          reorderedCards.unshift(visitedCard);
          setCardData(reorderedCards);
          setCurrentCardIndex(0);
          await AsyncStorage.removeItem('lastVisitedCardIndex');
        }
      } catch (error) {
        console.log('Error loading card index:', error);
      }
    });

    return unsubscribe;
  }, [navigation]);

  // Arama sonucuna tıklandığında yönlendirme
  const handleSearchResultPress = async (item: {
    title: string;
    image: any;
  }) => {
    // Store the current card index before navigating
    const cardIndex = cardData.findIndex(card => card.title === item.title);
    try {
      await AsyncStorage.setItem('lastVisitedCardIndex', cardIndex.toString());
    } catch (error) {
      console.log('Error saving card index:', error);
    }

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

  // SearchModal component
  const SearchModal = () => {
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(searchData);

    const handleSearch = (text: string) => {
      setSearchText(text);
      if (text.trim() === '') {
        setFilteredData(searchData);
      } else {
        const filtered = searchData.filter(item =>
          item.title.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
      }
    };

    const handleItemPress = (item: any) => {
      setSearchModalVisible(false);
      setSearchText('');
      setFilteredData(searchData);

      // Navigate to the selected item
      switch (item.route) {
        case 'Fen Bilimleri':
          navigation.navigate('Fen Bilimleri');
          break;
        case 'Türkçe':
          navigation.navigate('Türkçe');
          break;
        case 'Matematik':
          navigation.navigate('Matematik');
          break;
        case 'Sosyal Bilimler':
          navigation.navigate('Sosyal Bilimler');
          break;
        case 'TytScreen':
          navigation.navigate('TytScreen');
          break;
        case 'AytScreen':
          navigation.navigate('AytScreen');
          break;
        case 'YdtScreen':
          navigation.navigate('YdtScreen');
          break;
        case 'TytPastScreen':
          navigation.navigate('TytPastScreen');
          break;
        case 'AytPastScreen':
          navigation.navigate('AytPastScreen');
          break;
        case 'YdtPastScreen':
          navigation.navigate('YdtPastScreen');
          break;
        case 'CardsScreen':
          navigation.navigate('CardsScreen');
          break;
        case 'HedeflerScreen':
          navigation.navigate('HedeflerScreen');
          break;
        case 'PerformansScreen':
          navigation.navigate('PerformansScreen');
          break;
        case 'ProfilScreen':
          navigation.navigate('ProfilScreen');
          break;
      }
    };

    const getIconName = (icon: string) => {
      switch (icon) {
        case 'flask':
          return 'flask';
        case 'book':
          return 'book';
        case 'calculator':
          return 'calculator';
        case 'globe':
          return 'globe';
        case 'school':
          return 'school';
        case 'time':
          return 'time';
        case 'card':
          return 'card';
        case 'target':
          return 'locate';
        case 'stats-chart':
          return 'stats-chart';
        case 'person':
          return 'person';
        default:
          return 'search';
      }
    };

    return (
      <Modal visible={searchModalVisible} animationType='slide' transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.25)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onStartShouldSetResponder={() => true}
          onResponderRelease={() => setSearchModalVisible(false)}
        >
          <View
            style={{
              width: '90%',
              backgroundColor: '#fff',
              borderRadius: responsiveSize(16),
              paddingTop: responsiveSize(20),
              paddingHorizontal: responsiveSize(20),
              paddingBottom: responsiveSize(20),
              maxHeight: '80%',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: responsiveSize(16),
              }}
            >
              <Text
                style={{
                  fontSize: responsiveFontSize(20),
                  fontWeight: 'bold',
                  flex: 1,
                }}
              >
                Arama
              </Text>
              <TouchableOpacity onPress={() => setSearchModalVisible(false)}>
                <Ionicons name='close' size={24} color='#666' />
              </TouchableOpacity>
            </View>

            {/* Arama Çubuğu */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                borderRadius: responsiveSize(12),
                paddingHorizontal: responsiveSize(12),
                marginBottom: responsiveSize(16),
              }}
            >
              <Ionicons
                name='search'
                size={20}
                color='#666'
                style={{ marginRight: responsiveSize(8) }}
              />
              <TextInput
                value={searchText}
                onChangeText={handleSearch}
                placeholder='Ara...'
                style={{
                  flex: 1,
                  fontSize: responsiveFontSize(16),
                  paddingVertical: responsiveSize(12),
                  color: '#333',
                }}
                autoFocus
              />
              {searchText.length > 0 && (
                <TouchableOpacity onPress={() => handleSearch('')}>
                  <Ionicons name='close-circle' size={20} color='#666' />
                </TouchableOpacity>
              )}
            </View>

            {/* Arama Sonuçları */}
            <ScrollView showsVerticalScrollIndicator={false}>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <TouchableOpacity
                    key={item.id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: responsiveSize(12),
                      borderBottomWidth:
                        index !== filteredData.length - 1 ? 1 : 0,
                      borderBottomColor: '#f0f0f0',
                    }}
                    onPress={() => handleItemPress(item)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={{
                        width: responsiveSize(40),
                        height: responsiveSize(40),
                        borderRadius: responsiveSize(20),
                        backgroundColor: '#f0f0f0',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: responsiveSize(12),
                      }}
                    >
                      <Ionicons
                        name={getIconName(item.icon) as any}
                        size={20}
                        color='#666'
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(16),
                          fontWeight: '600',
                          color: '#222',
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(12),
                          color: '#888',
                          marginTop: responsiveSize(2),
                        }}
                      >
                        {item.type === 'exam'
                          ? 'Sınav'
                          : item.type === 'past'
                            ? 'Geçmiş Sınavlar'
                            : item.type === 'cards'
                              ? 'Bilgi Kartları'
                              : item.type === 'goals'
                                ? 'Hedefler'
                                : item.type === 'performance'
                                  ? 'Performans'
                                  : item.type === 'profile'
                                    ? 'Profil'
                                    : 'Diğer'}
                      </Text>
                    </View>
                    <Ionicons name='chevron-forward' size={20} color='#ccc' />
                  </TouchableOpacity>
                ))
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    paddingVertical: responsiveSize(40),
                  }}
                >
                  <Ionicons name='search' size={48} color='#ccc' />
                  <Text
                    style={{
                      fontSize: responsiveFontSize(16),
                      color: '#888',
                      marginTop: responsiveSize(12),
                      textAlign: 'center',
                    }}
                  >
                    Sonuç bulunamadı
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
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
              style={{ marginRight: 12 }}
              onPress={() => setSearchModalVisible(true)}
            >
              <Ionicons name='search' size={28} color='#222' />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginRight: 12 }}
              onPress={() => {
                setNotifModalVisible(true);
                setUnreadCount(0);
              }}
            >
              <Ionicons name='notifications-outline' size={28} color='#222' />
              {unreadCount > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    top: -4,
                    left: 9,
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

        {/* Geliştirici Butonu - Sadece geliştirme için */}
        <TouchableOpacity style={styles.devButton} onPress={loadSampleData}>
          <Text style={styles.devButtonText}>Örnek Verileri Yükle</Text>
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
                      } catch (error) {
                        console.log('Error saving card index:', error);
                      }

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
      <SearchModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: responsiveSize(56),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: responsiveSize(24),
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
    marginTop: responsiveSize(125),
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
    top: responsiveSize(-30),
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
  devButton: {
    backgroundColor: colors.warning,
    paddingHorizontal: responsiveSize(20),
    paddingVertical: responsiveSize(10),
    borderRadius: responsiveSize(8),
    marginHorizontal: responsiveSize(20),
    marginTop: responsiveSize(10),
    alignItems: 'center',
  },
  devButtonText: {
    fontSize: responsiveFontSize(14),
    fontWeight: 'bold',
    color: colors.textWhite,
  },
});

export default HomeScreen;
