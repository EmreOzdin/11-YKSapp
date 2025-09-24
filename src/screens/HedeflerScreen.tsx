import { Ionicons } from '@expo/vector-icons';
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  getSafeAreaPadding,
  platformSelect,
  responsiveFontSize,
  responsiveSize,
} from '../utils/responsive';
import { colors } from '../utils/theme';

const HedeflerScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
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
          <Text style={styles.headerTitle}>Hedefler</Text>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Hedefler</Text>
          {/* Buraya hedef içerikleri eklenecek */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    paddingTop: platformSelect(
      responsiveSize(35) + getSafeAreaPadding().top,
      responsiveSize(35) + getSafeAreaPadding().top
    ),
    paddingBottom: platformSelect(
      getSafeAreaPadding().bottom,
      getSafeAreaPadding().bottom
    ),
  },
  header: {
    paddingTop: responsiveSize(5),
    paddingBottom: responsiveSize(10),
    paddingHorizontal: responsiveSize(20),
    zIndex: 1000,
    elevation: 5,
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
    textAlign: 'center',
    flex: 1,
  },
  placeholder: {
    width: responsiveSize(40),
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: responsiveSize(40),
  },
  title: {
    fontSize: responsiveFontSize(28),
    fontWeight: 'bold',
    color: colors.secondary,
  },
});

export default HedeflerScreen;
