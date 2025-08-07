import React, { useState, useEffect } from 'react';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Modal, FlatList, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveSize, responsiveFontSize, responsiveWidth, responsiveHeight, isSmallDevice, isMediumDevice, isLargeDevice, screenWidth } from '../utils/responsive';
import { colors, typography, shadows } from '../utils/theme';

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


  // Arama sonuçlarını filtrele
  const filteredSearchResults = searchValue.length > 0
    ? CARD_DATA.filter(card => card.title.toLowerCase().includes(searchValue.toLowerCase()))
    : [];
  const navigation = useNavigation<NavigationProp<ParamListBase>>();



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
      <ScrollView 
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{ paddingBottom: responsiveSize(20) }}
        scrollEnabled={true}
        bounces={true}
        style={{ flex: 1 }}
        nestedScrollEnabled={false}
        keyboardShouldPersistTaps="handled"
      >
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
        {/* Swiper Cards */}
        <View style={styles.swiperContainer}>
          <View style={styles.swiperWrapper}>
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
                      <View style={styles.swiperImageContainer}>
                        <Image
                          source={item.image}
                          style={styles.swiperImage}
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
            <Image source={{ uri: 'https://img.icons8.com/3d-fluency/94/physics.png' }} style={styles.subjectIcon} />
            <Text style={styles.subjectGridLabel}>Fen Bilimleri</Text>
          </TouchableOpacity>
          {/* Türkçe */}
          <TouchableOpacity
            style={[styles.subjectGridItem, { backgroundColor: '#f3e8ff' }]}
            onPress={() => navigation.navigate('Türkçe')}
          >
            <Image source={require('../../assets/turkish.png')} style={styles.subjectIcon} />
            <Text style={styles.subjectGridLabel}>Türkçe</Text>
          </TouchableOpacity>
          {/* Matematik */}
          <TouchableOpacity
            style={[styles.subjectGridItem, { backgroundColor: '#fff9db' }]}
            onPress={() => navigation.navigate('Matematik')}
          >
            <Image source={require('../../assets/math.png')} style={styles.subjectIcon} />
            <Text style={styles.subjectGridLabel}>Matematik</Text>
          </TouchableOpacity>
          {/* Sosyal Bilimler */}
          <TouchableOpacity
            style={[styles.subjectGridItem, { backgroundColor: '#ffeaea' }]}
            onPress={() => navigation.navigate('Sosyal Bilimler')}
          >
            <Image source={require('../../assets/social.png')} style={styles.subjectIcon} />
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
            style={[styles.sınavDenemesiGridItem, { backgroundColor: '#e0f2fe' }]}
            onPress={() => navigation.navigate('TYT')}
          >
            <Image source={require('../../assets/tyt.png')} style={styles.examIcon} />
            <Text style={styles.subjectGridLabel}>TYT</Text>
          </TouchableOpacity>
          {/* AYT */}
          <TouchableOpacity
            style={[styles.sınavDenemesiGridItem, { backgroundColor: '#f3e8ff' }]}
            onPress={() => navigation.navigate('AYT')}
          >
            <Image source={require('../../assets/ayt.png')} style={styles.examIcon} />
            <Text style={styles.subjectGridLabel}>AYT</Text>
          </TouchableOpacity>
          {/* YDT */}
          <TouchableOpacity
            style={[styles.sınavDenemesiGridItem, { backgroundColor: '#fff9db' }]}
            onPress={() => navigation.navigate('YDT')}
          >
            <Image source={require('../../assets/ydt.png')} style={styles.examIcon} />
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
            style={[styles.sınavDenemesiGridItem, { backgroundColor: '#e0f2fe' }]}
            onPress={() => navigation.navigate('TYT')}
          >
            <Image source={require('../../assets/tyt.png')} style={styles.examIcon} />
            <Text style={styles.subjectGridLabel}>TYT</Text>
          </TouchableOpacity>
          {/* AYT */}
          <TouchableOpacity
            style={[styles.sınavDenemesiGridItem, { backgroundColor: '#f3e8ff' }]}
            onPress={() => navigation.navigate('AYT')}
          >
            <Image source={require('../../assets/ayt.png')} style={styles.examIcon} />
            <Text style={styles.subjectGridLabel}>AYT</Text>
          </TouchableOpacity>
          {/* YDT */}
          <TouchableOpacity
            style={[styles.sınavDenemesiGridItem, { backgroundColor: '#fff9db' }]}
            onPress={() => navigation.navigate('YDT')}
          >
            <Image source={require('../../assets/ydt.png')} style={styles.examIcon} />
            <Text style={styles.subjectGridLabel}>YDT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <NotificationModal visible={notifModalVisible} onClose={() => setNotifModalVisible(false)} />
             <SearchModal visible={searchModalVisible} onClose={() => setSearchModalVisible(false)} value={searchValue} onChange={setSearchValue} results={filteredSearchResults} onResultPress={handleSearchResultPress} />
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
    paddingHorizontal: responsiveSize(20) 
  },
  headerTitleContainer: { 
    flex: 1, 
    marginLeft: responsiveSize(12) 
  },
  headerTitle: { 
    fontSize: responsiveFontSize(26), 
    fontWeight: 'bold', 
    color: colors.textPrimary 
  },
  userName: { 
    fontSize: responsiveFontSize(20), 
    fontWeight: '600', 
    color: colors.textTertiary, 
    marginTop: responsiveSize(2) 
  },
  headerIcons: { 
    flexDirection: 'row', 
    alignItems: 'center' 
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
    borderColor: colors.background 
  },
  avatar: { 
    width: responsiveSize(48), 
    height: responsiveSize(48), 
    borderRadius: responsiveSize(24), 
    backgroundColor: colors.borderLight 
  },
  featureCard: { 
    flexDirection: 'row', 
    backgroundColor: colors.gradients.pink[0], 
    borderRadius: responsiveSize(24), 
    padding: responsiveSize(20), 
    margin: responsiveSize(20), 
    alignItems: 'center', 
    marginTop: responsiveSize(28) 
  },
  featureCardStacked: { 
    flexDirection: 'row', 
    borderRadius: responsiveSize(24), 
    padding: responsiveSize(12), 
    alignItems: 'center', 
    height: responsiveHeight(135), 
    ...shadows.small,
    borderWidth: 1, 
    borderColor: colors.borderLight 
  },
  featureTitle: { 
    color: colors.textWhite, 
    fontSize: responsiveFontSize(22), 
    fontWeight: 'bold', 
    marginBottom: responsiveSize(2), 
    marginTop: 0 
  },
  featureRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: responsiveSize(6), 
    marginBottom: responsiveSize(4) 
  },
  featureTime: { 
    color: colors.textWhite, 
    fontSize: responsiveFontSize(16), 
    marginLeft: responsiveSize(6) 
  },
  featureImage: { 
    width: responsiveSize(80), 
    height: responsiveSize(80), 
    marginLeft: responsiveSize(16), 
    borderRadius: responsiveSize(16), 
    backgroundColor: colors.background 
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
    resizeMode: 'contain' 
  },
  sectionRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginTop: responsiveSize(170), 
    marginBottom: responsiveSize(6),
    marginHorizontal: responsiveSize(20) 
  },
  sectionRowExam: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginTop: responsiveSize(185), 
    marginBottom: responsiveSize(6),
    marginHorizontal: responsiveSize(20) 
  },
  sectionRowPast: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginTop: responsiveSize(185), 
    marginBottom: responsiveSize(6),
    marginHorizontal: responsiveSize(20) 
  },
  sectionTitle: { 
    fontSize: responsiveFontSize(18), 
    fontWeight: 'bold', 
    color: colors.textPrimary 
  },
  seeAll: { 
    color: colors.secondary, 
    fontWeight: 'bold', 
    fontSize: responsiveFontSize(15) 
  },
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

  swiperContainer: {
    position: 'absolute',
    top: responsiveSize(-30),
    left: -23,
    right: 0,
    height: responsiveSize(135),
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    pointerEvents: 'none',
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
    marginBottom: responsiveSize(-170) 
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
    marginBottom: responsiveSize(-170) 
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
    marginTop: responsiveSize(3) 
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