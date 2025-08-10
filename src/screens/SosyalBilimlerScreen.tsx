import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { responsiveSize, responsiveFontSize } from '../utils/responsive';
import { colors, typography, shadows } from '../utils/theme';

const SosyalBilimlerScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  
  const handleStartQuestions = () => {
    navigation.navigate('QuestionScreen', {
      examType: 'TYT',
      subject: 'Sosyal Bilimler',
      isPastQuestion: false
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.backText}>{'<'} Geri</Text>
      </TouchableOpacity>
      
      <View style={styles.content}>
        <Text style={styles.title}>Sosyal Bilimler</Text>
        <Text style={styles.subtitle}>Tarih, Coğrafya, Felsefe</Text>
        
        <TouchableOpacity style={styles.startButton} onPress={handleStartQuestions}>
          <Text style={styles.startButtonText}>Çalışma Sorularını Başlat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.backgroundTertiary 
  },
  backButton: { 
    position: 'absolute', 
    top: responsiveSize(40), 
    left: responsiveSize(20), 
    padding: responsiveSize(8), 
    borderRadius: responsiveSize(8), 
    ...shadows.small 
  },
  backText: { 
    fontSize: responsiveFontSize(16), 
    color: colors.gradients.blue[0], 
    fontWeight: 'bold' 
  },
  content: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    paddingHorizontal: responsiveSize(20),
  },
  title: { 
    fontSize: responsiveFontSize(28), 
    fontWeight: 'bold', 
    color: colors.gradients.blue[0],
    marginBottom: responsiveSize(10),
  },
  subtitle: {
    fontSize: responsiveFontSize(18),
    color: colors.textSecondary,
    marginBottom: responsiveSize(40),
  },
  startButton: {
    backgroundColor: colors.gradients.blue[0],
    paddingHorizontal: responsiveSize(30),
    paddingVertical: responsiveSize(15),
    borderRadius: responsiveSize(12),
    ...shadows.medium,
  },
  startButtonText: {
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
    color: colors.white,
  },
});

export default SosyalBilimlerScreen; 