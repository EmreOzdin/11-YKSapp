import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';

const CARD_DATA = [
  { title: 'Fen Bilimleri Sınavı', gradient: ['#228be6', '#6ee7b7'] as const, image: { uri: 'https://img.icons8.com/3d-fluency/94/physics.png' } },
  { title: 'Türkçe Sınavı', gradient: ['#6c47ff', '#b983ff'] as const, image: { uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991108.png' } },
  { title: 'Matematik Sınavı', gradient: ['#f7b731', '#ffb347'] as const, image: { uri: 'https://cdn-icons-png.flaticon.com/512/4341/4341139.png' } },
  { title: 'Sosyal Bilimler Sınavı', gradient: ['#ff6b81', '#ffb6b9'] as const, image: { uri: 'https://cdn-icons-png.flaticon.com/512/4149/4149643.png' } },
];

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity>
          <Image source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }} style={styles.avatar} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Merhaba! Emre</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={{ marginRight: 12 }}>
            <Ionicons name="search" size={22} color="#222" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 12 }}>
            <Ionicons name="notifications-outline" size={22} color="#222" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Öne çıkan kartlar */}
        <View style={{ marginHorizontal: 0, marginTop: -130, marginBottom: 8, height: 200, alignItems: 'flex-start', justifyContent: 'center', pointerEvents: 'box-only' }}>
          <View style={{ width: '90%', maxWidth: 420, overflow: 'visible', alignSelf: 'flex-start', marginLeft: 0, marginRight: 'auto' }}>
            <Swiper
              cards={CARD_DATA}
              renderCard={(item) => {
                // Kart ikonunu kaldır, sadece alarm ikonu göster
                return (
                  <LinearGradient
                    colors={item.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={[styles.featureCardStacked, { position: 'relative' }]}
                  >
                    <View style={{ flex: 1, justifyContent: 'space-between' }}>
                      <Text style={styles.featureTitle}>{item.title}</Text>
                      <View style={styles.featureRow}>
                        <MaterialCommunityIcons name="alarm" size={18} color="#fff" />
                        <Text style={styles.featureTime}>45 dakika</Text>
                      </View>
                    </View>
                    <Image source={item.image} style={styles.featureImageIcon} />
                  </LinearGradient>
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
          <View style={styles.streakLabelRow}>
            <Text style={styles.streakLabel}>current streak <Text style={{ color: '#ff4757', fontWeight: 'bold' }}>2</Text></Text>
            <Text style={styles.streakLabel}>longest streak <Text style={{ color: '#ffa502', fontWeight: 'bold' }}>18</Text></Text>
          </View>
          <View style={styles.streakBar}>
            {[17, 18, 1, 2, 3, 4, 5, 6, 7].map((num, idx) => (
              <View key={idx} style={styles.streakBox}>
                {idx < 2 ? (
                  <MaterialCommunityIcons name="fire-off" size={20} color="#ddd" />
                ) : idx < 4 ? (
                  <MaterialCommunityIcons name="fire" size={20} color="#ff4757" />
                ) : (
                  <MaterialCommunityIcons name="fire-off" size={20} color="#eee" />
                )}
                <Text style={styles.streakDay}>{num}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.streakInfo}>Her gün giriş yap, serini kaybetme!</Text>
        </View>
        {/* Dersler Grid */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Dersler</Text>
          <TouchableOpacity><Text style={styles.seeAll}>Tümünü Gör</Text></TouchableOpacity>
        </View>
        <View style={styles.subjectGrid}>
          {/* Fen Bilimleri */}
          <View style={[styles.subjectGridItem, { backgroundColor: '#e0f2fe' }]}> 
            <Image source={{ uri: 'https://img.icons8.com/3d-fluency/94/physics.png' }} style={{ width: 48, height: 48, marginBottom: 4 }} />
            <Text style={styles.subjectGridLabel}>Fen Bilimleri</Text>
          </View>
          {/* Türkçe */}
          <View style={[styles.subjectGridItem, { backgroundColor: '#f3e8ff' }]}> 
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991108.png' }} style={{ width: 36, height: 36, marginBottom: 4 }} />
            <Text style={styles.subjectGridLabel}>Türkçe</Text>
          </View>
          {/* Matematik */}
          <View style={[styles.subjectGridItem, { backgroundColor: '#fff9db' }]}> 
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4341/4341139.png' }} style={{ width: 36, height: 36, marginBottom: 4 }} />
            <Text style={styles.subjectGridLabel}>Matematik</Text>
          </View>
          {/* Sosyal Bilimler */}
          <View style={[styles.subjectGridItem, { backgroundColor: '#ffeaea' }]}> 
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4149/4149643.png' }} style={{ width: 36, height: 36, marginBottom: 4 }} />
            <Text style={styles.subjectGridLabel}>Sosyal Bilimler</Text>
          </View>
        </View>
        {/* Video kurs */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Video Kurs</Text>
          <TouchableOpacity><Text style={styles.seeAll}>Tümünü Gör</Text></TouchableOpacity>
        </View>
        <View style={styles.videoCard}>
          <Image source={require('../../assets/onboarding1.png')} style={styles.videoImage} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.videoTitle}>Bilim Teknolojisi</Text>
            <Text style={styles.videoTeacher}>Öğr. Ayşe Yılmaz</Text>
            <View style={styles.videoRow}>
              <MaterialCommunityIcons name="star" size={16} color="#f7b731" />
              <Text style={styles.videoRating}>4.6</Text>
              <Text style={styles.videoLive}>Canlı</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Alt Tab Bar (Mock) */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}><MaterialCommunityIcons name="credit-card-outline" size={26} color="#bbb" /></TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}><MaterialCommunityIcons name="home-variant" size={26} color="#1877f2" /></TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}><MaterialCommunityIcons name="clipboard-list-outline" size={26} color="#bbb" /></TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}><MaterialCommunityIcons name="chart-bar" size={26} color="#bbb" /></TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}><MaterialCommunityIcons name="account-circle-outline" size={26} color="#bbb" /></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 56 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 24, paddingHorizontal: 20 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#222', marginLeft: 12, flex: 1 },
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
  streakContainer: { marginTop: 160, marginHorizontal: 20, marginBottom: 18, backgroundColor: '#fff', borderRadius: 16, padding: 16, elevation: 1 },
  streakLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  streakLabel: { fontSize: 13, color: '#888', fontWeight: '500' },
  streakBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  streakBox: { alignItems: 'center', justifyContent: 'center', width: 32 },
  streakDay: { fontSize: 12, color: '#bbb', marginTop: 2 },
  streakInfo: { fontSize: 12, color: '#aaa', textAlign: 'center', marginTop: 2 },
  subjectGrid: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 8, marginTop: 10, marginBottom: 8 },
  subjectGridItem: { flex: 1, marginHorizontal: 4, aspectRatio: 0.85, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 12, minWidth: 64, maxWidth: 90 },
  subjectGridLabel: { fontSize: 13, color: '#222', fontWeight: '500', textAlign: 'center', marginTop: 8 },
});

export default HomeScreen; 