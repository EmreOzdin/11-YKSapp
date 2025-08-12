import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { responsiveSize, responsiveFontSize } from '../utils/responsive';
import { colors, typography, shadows } from '../utils/theme';
import { QuestionService } from '../services/questionService';

const AytScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [hasSelections, setHasSelections] = useState(false);

  useEffect(() => {
    checkUserSelections();
  }, []);

  const checkUserSelections = async () => {
    try {
      const selections = await QuestionService.getUserSelections();
      setHasSelections(selections?.examType === 'AYT' && selections.selectedTopics.length > 0);
    } catch (error) {
      console.error('Kullanıcı seçimleri kontrol edilirken hata:', error);
    }
  };

  const handleStartQuestions = async () => {
    if (!hasSelections) {
      navigation.navigate('TopicSelectionScreen', { examType: 'AYT' });
      return;
    }

    navigation.navigate('QuestionScreen', { examType: 'AYT' });
  };

  const handleTopicSelection = () => {
    navigation.navigate('TopicSelectionScreen', { examType: 'AYT' });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.backText}>{'<'} Geri</Text>
      </TouchableOpacity>
      
      <View style={styles.content}>
        <Text style={styles.title}>AYT</Text>
        <Text style={styles.subtitle}>Alan Yeterlilik Testi</Text>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>AYT Hakkında</Text>
          <Text style={styles.infoText}>
            • 160 soru, 180 dakika{'\n'}
            • Matematik: 40 soru{'\n'}
            • Fen Bilimleri: 40 soru{'\n'}
            • Türk Dili ve Edebiyatı: 24 soru{'\n'}
            • Sosyal Bilimler: 40 soru{'\n'}
            • Yabancı Dil: 16 soru
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={handleStartQuestions}
          >
            <Text style={styles.primaryButtonText}>
              {hasSelections ? 'Sorularla Çalış' : 'Konu Seç ve Başla'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={handleTopicSelection}
          >
            <Text style={styles.secondaryButtonText}>
              {hasSelections ? 'Konuları Değiştir' : 'Konu Seç'}
            </Text>
          </TouchableOpacity>
        </View>

        {hasSelections && (
          <View style={styles.selectionInfo}>
            <Text style={styles.selectionText}>
              ✓ Konularınız seçildi, sorularla çalışmaya başlayabilirsiniz!
            </Text>
          </View>
        )}
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
    zIndex: 1,
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
    fontSize: responsiveFontSize(32), 
    fontWeight: 'bold', 
    color: colors.gradients.blue[0],
    marginBottom: responsiveSize(8),
  },
  subtitle: {
    fontSize: responsiveFontSize(18),
    color: colors.textSecondary,
    marginBottom: responsiveSize(30),
  },
  infoCard: {
    backgroundColor: colors.backgroundSecondary,
    padding: responsiveSize(20),
    borderRadius: responsiveSize(12),
    marginBottom: responsiveSize(30),
    width: '100%',
    ...shadows.medium,
  },
  infoTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: responsiveSize(10),
    textAlign: 'center',
  },
  infoText: {
    fontSize: responsiveFontSize(14),
    color: colors.textSecondary,
    lineHeight: responsiveFontSize(20),
  },
  buttonContainer: {
    width: '100%',
    gap: responsiveSize(15),
  },
  primaryButton: {
    backgroundColor: colors.primary,
    padding: responsiveSize(16),
    borderRadius: responsiveSize(12),
    alignItems: 'center',
    ...shadows.medium,
  },
  primaryButtonText: {
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
    color: colors.textWhite,
  },
  secondaryButton: {
    backgroundColor: colors.backgroundSecondary,
    padding: responsiveSize(16),
    borderRadius: responsiveSize(12),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  secondaryButtonText: {
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  selectionInfo: {
    marginTop: responsiveSize(20),
    padding: responsiveSize(15),
    backgroundColor: colors.success + '20',
    borderRadius: responsiveSize(8),
    borderWidth: 1,
    borderColor: colors.success,
  },
  selectionText: {
    fontSize: responsiveFontSize(14),
    color: colors.success,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default AytScreen; 