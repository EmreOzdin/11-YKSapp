import React, { useState, useEffect } from 'react';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Modal, FlatList, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CARD_DATA = [
  { title: 'Fen Bilimleri Sınavı', gradient: ['#228be6', '#6ee7b7'] as const, image: require('../../assets/physicsexam.png') },
  { title: 'Türkçe Sınavı', gradient: ['#6c47ff', '#b983ff'] as const, image: require('../../assets/turkishexam.png') },
  { title: 'Matematik Sınavı', gradient: ['#f7b731', '#ffb347'] as const, image: require('../../assets/mathexam.png') },
  { title: 'Sosyal Bilimler Sınavı', gradient: ['#ff6b81', '#ffb6b9'] as const, image: require('../../assets/socialexam.png') },
];

const notifications = [
  { id: '1', title: 'Yeni deneme sınavı eklendi!', date: '2 saat önce' },
  { id: '2', title: 'Çalışma serini 3 gün oldu!', date: 'Dün' },
  { id: '3', title: 'Matematikte yeni konu anlatımı var.', date: '2 gün önce' },
];

const NotificationModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => (
  <Modal visible={visible} animationType="slide" transparent>
    <View
      style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.25)', justifyContent: 'center', alignItems: 'center' }}
      onStartShouldSetResponder={() => true}
      onResponderRelease={onClose}
    >
      <View style={{ width: '85%', backgroundColor: '#fff', borderRadius: 28, paddingTop: 18, paddingHorizontal: 18, paddingBottom: 32, maxHeight: '70%' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>Bildirimler</Text>
        <FlatList
          data={notifications}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderColor: '#eee' }}>
              <Text style={{ fontSize: 16, color: '#222', fontWeight: '500' }}>{item.title}</Text>
              <Text style={{ fontSize: 13, color: '#888', marginTop: 2 }}>{item.date}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={{ color: '#888', textAlign: 'center', marginTop: 24 }}>Henüz bildiriminiz yok.</Text>}
        />
        <Pressable onPress={onClose} style={{ marginTop: 18, alignSelf: 'center', padding: 10 }}>
          <Text style={{ color: '#1877f2', fontWeight: 'bold', fontSize: 16 }}>Kapat</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
);

const SearchModal = ({ visible, onClose, value, onChange, results, onResultPress }: { visible: boolean; onClose: () => void; value: string; onChange: (t: string) => void; results: { title: string; image: any }[]; onResultPress: (item: { title: string; image: any }) => void }) => (
  <Modal visible={visible} animationType="fade" transparent>
    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.18)', justifyContent: 'flex-start', alignItems: 'center' }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ width: '100%' }}>
        <View style={{ marginTop: 60, width: '90%', alignSelf: 'center', backgroundColor: '#fff', borderRadius: 16, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8, elevation: 3 }}>
          <Ionicons name="search" size={22} color="#888" style={{ marginRight: 8 }} />
          <TextInput
            autoFocus
            value={value}
            onChangeText={onChange}
            placeholder="Ara..."
            style={{ flex: 1, fontSize: 17, color: '#222', paddingVertical: 6 }}
            returnKeyType="search"
          />
          <TouchableOpacity onPress={onClose} style={{ marginLeft: 8 }}>
            <MaterialCommunityIcons name="close" size={22} color="#888" />
          </TouchableOpacity>
        </View>
        {/* Sonuçlar */}
        {value.length > 0 && (
          <View style={{ width: '90%', alignSelf: 'center', backgroundColor: '#fff', borderRadius: 16, marginTop: 8, maxHeight: 220, elevation: 2, paddingVertical: 4 }}>
            {results.length > 0 ? (
              results.map((item, idx) => (
                <TouchableOpacity
                  key={item.title}
                  onPress={() => {
                    onResultPress(item);
                    onClose();
                  }}
                  style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 8, borderBottomWidth: idx !== results.length - 1 ? 1 : 0, borderColor: '#f0f0f0' }}
                  activeOpacity={0.7}
                >
                  <Image source={item.image} style={{ width: 32, height: 32, marginRight: 12, borderRadius: 8 }} />
                  <Text style={{ fontSize: 16, color: '#222' }}>{item.title}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{ color: '#888', textAlign: 'center', padding: 16 }}>Sonuç bulunamadı.</Text>
            )}
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  </Modal>
);

const HomeScreen: React.FC = () => {
  const [notifModalVisible, setNotifModalVisible] = useState(false);
  const [unreadCount, setUnreadCount] = useState(notifications.length);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [streakDays, setStreakDays] = useState<number[]>([]);

  // Arama sonuçlarını filtrele
  const filteredSearchResults = searchValue.length > 0
    ? CARD_DATA.filter(card => card.title.toLowerCase().includes(searchValue.toLowerCase()))
    : [];
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  // Streak sistemini yönet
  const updateStreak = async () => {
    try {
      const today = new Date().toDateString();
      const storedStreakData = await AsyncStorage.getItem('streakData');
      let streakData = storedStreakData ? JSON.parse(storedStreakData) : { 
        lastLoginDate: null, 
        currentStreak: 0, 
        longestStreak: 0, 
        streakDays: [] 
      };

      // Bugün daha önce giriş yapılmamışsa
      if (streakData.lastLoginDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toDateString();

        if (streakData.lastLoginDate === yesterdayString) {
          // Ardışık gün - streak devam ediyor
          streakData.currentStreak += 1;
        } else if (streakData.lastLoginDate !== today) {
          // Streak kırıldı - yeniden başla
          streakData.currentStreak = 1;
        }

        // En uzun streak'i güncelle
        if (streakData.currentStreak > streakData.longestStreak) {
          streakData.longestStreak = streakData.currentStreak;
        }

        // Son 9 günü takip et
        const todayNum = new Date().getDate();
        streakData.streakDays = [];
        for (let i = 8; i >= 0; i--) {
          const checkDate = new Date();
          checkDate.setDate(checkDate.getDate() - i);
          const checkDateString = checkDate.toDateString();
          
          if (streakData.lastLoginDate === checkDateString || 
              (i === 0 && streakData.lastLoginDate === today)) {
            streakData.streakDays.push(checkDate.getDate());
          } else {
            streakData.streakDays.push(0);
          }
        }

        streakData.lastLoginDate = today;
        await AsyncStorage.setItem('streakData', JSON.stringify(streakData));
      }

      setCurrentStreak(streakData.currentStreak);
      setLongestStreak(streakData.longestStreak);
      setStreakDays(streakData.streakDays);
    } catch (error) {
      console.error('Streak güncellenirken hata:', error);
    }
  };

  // Component mount olduğunda streak'i güncelle
  useEffect(() => {
    updateStreak();
  }, []);

  // Arama sonucuna tıklandığında yönlendirme
  const handleSearchResultPress = (item: { title: string; image: any }) => {
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
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 90 }}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity>
            <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.avatar} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Merhaba!</Text>
            <Text style={styles.userName}>Emre</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={{ marginRight: 12 }} onPress={() => setSearchModalVisible(true)}>
              <Ionicons name="search" size={22} color="#222" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginRight: 12 }}
              onPress={() => {
                setNotifModalVisible(true);
                setUnreadCount(0);
              }}
            >
              <Ionicons name="notifications-outline" size={22} color="#222" />
              {unreadCount > 0 && (
                <View style={{ position: 'absolute', top: -4, left: 9, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: '#ff4757', borderWidth: 2, borderColor: '#fff', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 3 }}>
                  <Text style={{ color: '#fff', fontSize: 11, fontWeight: 'bold' }}>{unreadCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        {/* Swiper sadece kendi bölgesinde */}
        <View style={{ marginHorizontal: 0, marginTop: SCREEN_WIDTH < 400 ? -90 : -120, marginBottom: 8, height: 135, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: '90%', maxWidth: 420, overflow: 'visible', alignSelf: 'flex-start', marginLeft: 0, marginRight: 'auto' }}>
            <Swiper
              cardStyle={{ height: 135 }}
              cards={CARD_DATA}
              renderCard={(item) => {
                // Kart ikonunu kaldır, sadece alarm ikonu göster
                return (
                  <TouchableOpacity
                    onPress={() => {
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
                    activeOpacity={1}
                  >
                    <LinearGradient
                      colors={item.gradient}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={[styles.featureCardStacked, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }]}
                    >
                      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 8 }}>
                        <Text style={styles.featureTitle}>{item.title}</Text>
                        <View style={styles.featureRow}>
                          <MaterialCommunityIcons name="alarm" size={18} color="#fff" />
                          <Text style={styles.featureTime}>45 dakika</Text>
                        </View>
                      </View>
                      <View style={{ 
                        minWidth: item.title === 'Türkçe Sınavı' ? 150 : 130, 
                        maxWidth: item.title === 'Türkçe Sınavı' ? 240 : 220, 
                        width: item.title === 'Türkçe Sınavı' ? '55%' : '50%', 
                        height: item.title === 'Türkçe Sınavı' ? '155%' : '145%', 
                        alignItems: 'flex-end', 
                        justifyContent: 'center', 
                        marginRight: item.title === 'Türkçe Sınavı' ? -20 : -18 
                      }}>
                        <Image
                          source={item.image}
                          style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                        />
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              }}
              stackSize={3}
              stackSeparation={10}
              backgroundColor="transparent"
              cardHorizontalMargin={8}
              cardIndex={0}
              infinite
              showSecondCard
              disableTopSwipe
              disableBottomSwipe
              verticalSwipe={false}
              horizontalSwipe={true}
              pointerEvents="auto"
              onSwipedAll={() => {}}
              onSwiped={(cardIndex) => {}}
              onSwipedLeft={(cardIndex) => {}}
              onSwipedRight={(cardIndex) => {}}
            />
          </View>
        </View>
        {/* Streak Bar */}
        <View style={styles.streakContainer}>
          <View style={styles.streakRow}>
            {/* Sol Bölüm - Streak Sayısı */}
            <View style={styles.streakLeftSection}>
              <View style={styles.streakIconContainer}>
                <MaterialCommunityIcons name="trophy" size={36} color="#ffd700" style={styles.streakIcon} />
              </View>
              <Text style={styles.streakDaysText}>{currentStreak}</Text>
              <Text style={styles.streakLabelText}>günlük streak</Text>
            </View>
            
            {/* Sağ Bölüm - Progress ve Haftalık Aktivite */}
            <View style={styles.streakRightSection}>
              {/* Progress Bar */}
              <View style={styles.progressContainer}>
                <Text style={styles.progressText}>
                  {currentStreak} / 8000
                </Text>
                <View style={styles.progressBarContainer}>
                  <View style={styles.progressBarTrack}>
                    <View 
                      style={[
                        styles.progressBarFill, 
                        { width: `${Math.min((currentStreak / 8000) * 100, 100)}%` }
                      ]} 
                    />
                  </View>
                </View>
              </View>
              
              {/* Haftalık Aktivite */}
              <View style={styles.weeklyActivityContainer}>
                {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map((day, idx) => (
                  <View key={day} style={styles.dayContainer}>
                    <View style={[
                      styles.dayCircle,
                      streakDays[idx] > 0 && styles.dayCircleActive
                    ]}>
                      {streakDays[idx] > 0 && (
                        <MaterialCommunityIcons name="check" size={12} color="#fff" />
                      )}
                    </View>
                    <Text style={styles.dayLabel}>{day}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
        {/* Dersler Grid */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Çalışma Soruları</Text>
        </View>
        <View style={styles.subjectGrid}>
          {/* Fen Bilimleri */}
          <TouchableOpacity
            style={[styles.subjectGridItem, { backgroundColor: '#e0f2fe' }]}
            onPress={() => navigation.navigate('Fen Bilimleri')}
          >
            <Image source={{ uri: 'https://img.icons8.com/3d-fluency/94/physics.png' }} style={{ width: 48, height: 48, marginBottom: 0, marginTop: -10 }} />
            <Text style={[styles.subjectGridLabel, { marginTop: 7 }]}>Fen Bilimleri</Text>
          </TouchableOpacity>
          {/* Türkçe */}
          <TouchableOpacity
            style={[styles.subjectGridItem, { backgroundColor: '#f3e8ff' }]}
            onPress={() => navigation.navigate('Türkçe')}
          >
            <Image source={require('../../assets/turkish.png')} style={{ width: 36, height: 36, marginBottom: 4 }} />
            <Text style={styles.subjectGridLabel}>Türkçe</Text>
          </TouchableOpacity>
          {/* Matematik */}
          <TouchableOpacity
            style={[styles.subjectGridItem, { backgroundColor: '#fff9db' }]}
            onPress={() => navigation.navigate('Matematik')}
          >
            <Image source={require('../../assets/math.png')} style={{ width: 49, height: 36, marginBottom: 4 }} />
            <Text style={styles.subjectGridLabel}>Matematik</Text>
          </TouchableOpacity>
          {/* Sosyal Bilimler */}
          <TouchableOpacity
            style={[styles.subjectGridItem, { backgroundColor: '#ffeaea' }]}
            onPress={() => navigation.navigate('Sosyal Bilimler')}
          >
            <Image source={require('../../assets/social.png')} style={{ width: 50, height: 36, marginBottom: 4 }} />
            <Text style={styles.subjectGridLabel}>Sosyal Bilimler</Text>
          </TouchableOpacity>
        </View>
        {/* Video kurs */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Sınav Denemesi</Text>
        </View>
        {/* Sınav Denemesi Grid */}
        <View style={styles.sınavDenemesiGrid}>
          {/* TYT */}
          <TouchableOpacity
            style={[styles.sınavDenemesiGridItem, { backgroundColor: '#e0f2fe' }]}
            onPress={() => navigation.navigate('TYT')}
          >
            <Image source={require('../../assets/tyt.png')} style={{ width: 80, height: 80, marginBottom: 10, marginTop: -12 }} />
            <Text style={[styles.subjectGridLabel, { marginTop: -5 }]}>TYT</Text>
          </TouchableOpacity>
          {/* AYT */}
          <TouchableOpacity
            style={[styles.sınavDenemesiGridItem, { backgroundColor: '#f3e8ff' }]}
            onPress={() => navigation.navigate('AYT')}
          >
            <Image source={require('../../assets/ayt.png')} style={{ width: 80, height: 80, marginBottom: 10, marginTop: -12 }} />
            <Text style={[styles.subjectGridLabel, { marginTop: -5 }]}>AYT</Text>
          </TouchableOpacity>
          {/* YDT */}
          <TouchableOpacity
            style={[styles.sınavDenemesiGridItem, { backgroundColor: '#fff9db' }]}
            onPress={() => navigation.navigate('YDT')}
          >
            <Image source={require('../../assets/ydt.png')} style={{ width: 80, height: 80, marginBottom: 10, marginTop: -12 }} />
            <Text style={[styles.subjectGridLabel, { marginTop: -5 }]}>YDT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* Alt Tab Bar (Mock) */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <MaterialCommunityIcons name="home-variant" size={26} color="#1877f2" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Cards')}>
          <MaterialCommunityIcons name="cards" size={26} color="#bbb" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Hedefler')}>
          <MaterialCommunityIcons name="clipboard-list-outline" size={26} color="#bbb" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Performans')}>
          <MaterialCommunityIcons name="chart-bar" size={26} color="#bbb" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Profil')}>
          <MaterialCommunityIcons name="account-circle-outline" size={26} color="#bbb" />
        </TouchableOpacity>
      </View>
      <NotificationModal visible={notifModalVisible} onClose={() => setNotifModalVisible(false)} />
             <SearchModal visible={searchModalVisible} onClose={() => setSearchModalVisible(false)} value={searchValue} onChange={setSearchValue} results={filteredSearchResults} onResultPress={handleSearchResultPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 56 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 24, paddingHorizontal: 20 },
  headerTitleContainer: { flex: 1, marginLeft: 12 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#222' },
  userName: { fontSize: 20, fontWeight: '600', color: '#666', marginTop: 2 },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  notificationDot: { position: 'absolute', top: -2, right: -2, width: 12, height: 12, borderRadius: 6, backgroundColor: '#ff4757', borderWidth: 2, borderColor: '#fff' },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#eee' },
  featureCard: { flexDirection: 'row', backgroundColor: '#ff6b81', borderRadius: 24, padding: 20, margin: 20, alignItems: 'center', marginTop: 28 },
  featureCardStacked: { flexDirection: 'row', borderRadius: 24, padding: 12, alignItems: 'center', height: 135, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.10, shadowRadius: 6, elevation: 3, borderWidth: 1, borderColor: '#f2f2f2' },
  featureTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 2, marginTop: 0 },
  featureRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6, marginBottom: 4 },
  featureTime: { color: '#fff', fontSize: 16, marginLeft: 6 },
  featureImage: { width: 80, height: 80, marginLeft: 16, borderRadius: 16, backgroundColor: '#fff' },
  featureImageIcon: { width: 90, height: 90, position: 'relative', right: 0, top: 0, marginLeft: 12, alignSelf: 'center', opacity: 1, resizeMode: 'contain' },
  sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 18, marginHorizontal: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  seeAll: { color: '#1877f2', fontWeight: 'bold', fontSize: 15 },
  subjectGroup: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 14, marginBottom: 8, flex: 1 },
  subjectIconBox: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafd', borderRadius: 16, padding: 14, marginHorizontal: 4 },
  subjectLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginBottom: 8 },
  subjectLabel: { fontSize: 13, color: '#222', fontWeight: '500', textAlign: 'center', flex: 1 },
  videoCard: { flexDirection: 'row', backgroundColor: '#f8fafd', borderRadius: 18, padding: 14, marginHorizontal: 20, marginTop: 10, alignItems: 'center' },
  videoImage: { width: 60, height: 60, borderRadius: 12, backgroundColor: '#fff' },
  videoTitle: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  videoTeacher: { fontSize: 13, color: '#888', marginTop: 2 },
  videoRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  videoRating: { fontSize: 14, color: '#222', marginLeft: 4, marginRight: 8 },
  videoLive: { fontSize: 12, color: '#fff', backgroundColor: '#ff6b81', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2, marginLeft: 8, overflow: 'hidden' },
  tabBar: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', height: 60, borderTopWidth: 1, borderColor: '#eee', backgroundColor: '#fff', position: 'absolute', left: 0, right: 0, bottom: 24 },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  streakContainer: { 
    marginTop: 155, 
    marginHorizontal: 20, 
    marginBottom: 8, 
    backgroundColor: '#1a1a1a', 
    borderRadius: 16, 
    padding: 12, 
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  streakRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  streakLeftSection: {
    alignItems: 'center',
    marginRight: 20,
  },
  streakIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  streakIcon: {
    width: 36,
    height: 36,
    textShadowColor: 'rgba(255, 215, 0, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  streakDaysText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
    textShadowColor: 'rgba(255, 255, 255, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  streakLabelText: {
    fontSize: 12,
    color: '#ccc',
    fontWeight: '500',
  },
  streakRightSection: {
    flex: 1,
    alignItems: 'center',
  },
  progressContainer: {
    width: '100%',
    marginBottom: 10,
  },
  progressText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'left',
    marginBottom: 4,
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarTrack: {
    height: '100%',
    backgroundColor: '#333',
    borderRadius: 4,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#ff4757',
    borderRadius: 4,
    shadowColor: '#ff4757',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  weeklyActivityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 8,
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 8,
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 3,
    backgroundColor: '#333',
  },
  dayCircleActive: {
    backgroundColor: '#ff4757',
    borderColor: '#ff4757',
    shadowColor: '#ff4757',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  dayLabel: {
    fontSize: 10,
    color: '#ccc',
    fontWeight: '500',
  },
  streakInfo: { 
    fontSize: 12, 
    color: '#aaa', 
    textAlign: 'center', 
    marginTop: 2 
  },
  subjectGrid: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 8, marginTop: 10, marginBottom: 8 },
  subjectGridItem: { flex: 1, marginHorizontal: 4, aspectRatio: 0.85, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 12, minWidth: 64, maxWidth: 90 },
  sınavDenemesiGrid: { flexDirection: 'row', justifyContent: 'center', marginHorizontal: 0, marginTop: 8, marginBottom: 16 },
  sınavDenemesiGridItem: { width: 112, height: 112, borderRadius: 26, alignItems: 'center', justifyContent: 'center', marginHorizontal: 8, marginBottom: 12 },
  subjectGridLabel: { fontSize: 13, color: '#222', fontWeight: '500', textAlign: 'center', marginTop: 8 },
});

export default HomeScreen; 