import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { responsiveSize, responsiveFontSize } from '../utils/responsive';
import { colors, typography, shadows } from '../utils/theme';

const PerformansScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.backText}>{'<'} Geri</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Performans</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: colors.backgroundSecondary 
  },
  title: { 
    fontSize: responsiveFontSize(28), 
    fontWeight: 'bold', 
    color: colors.secondary 
  },
  backButton: { 
    position: 'absolute', 
    top: responsiveSize(40), 
    left: responsiveSize(20), 
    padding: responsiveSize(8), 
    backgroundColor: colors.background, 
    borderRadius: responsiveSize(8), 
    ...shadows.small 
  },
  backText: { 
    fontSize: responsiveFontSize(16), 
    color: colors.secondary, 
    fontWeight: 'bold' 
  },
});

export default PerformansScreen; 