import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { loadYksCardsToMongoDB, checkYksCardsInMongoDB } from '../services/mongoCardsService';

const YksCardsTestScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any[]>([]);

  const handleLoadYksCards = async () => {
    setLoading(true);
    try {
      const success = await loadYksCardsToMongoDB();
      if (success) {
        Alert.alert('Başarılı', 'YKS kartları MongoDB\'ye başarıyla yüklendi!');
        await handleCheckCards();
      } else {
        Alert.alert('Hata', 'YKS kartları yüklenirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('YKS kartları yükleme hatası:', error);
      Alert.alert('Hata', 'YKS kartları yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckCards = async () => {
    try {
      await checkYksCardsInMongoDB();
      // İstatistikleri güncelle
      // Bu kısım console.log ile gösterilecek
    } catch (error) {
      console.error('Kart kontrol hatası:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>YKS Kartları MongoDB Test</Text>
      
      <ScrollView style={styles.content}>
        <Text style={styles.description}>
          Bu ekran YKS kartlarını MongoDB'ye aktarmak için kullanılır.
        </Text>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleLoadYksCards}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Yükleniyor...' : 'YKS Kartlarını MongoDB\'ye Yükle'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleCheckCards}
        >
          <Text style={styles.buttonText}>Kartları Kontrol Et</Text>
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Yüklenecek Kartlar:</Text>
          <Text style={styles.infoText}>• Matematik: 20 kart</Text>
          <Text style={styles.infoText}>• Fizik: 10 kart</Text>
          <Text style={styles.infoText}>• Kimya: 10 kart</Text>
          <Text style={styles.infoText}>• Biyoloji: 10 kart</Text>
          <Text style={styles.infoText}>• Türkçe: 10 kart</Text>
          <Text style={styles.infoText}>• Tarih: 10 kart</Text>
          <Text style={styles.infoText}>• Toplam: 70 kart</Text>
        </View>

        <View style={styles.noteContainer}>
          <Text style={styles.noteTitle}>Not:</Text>
          <Text style={styles.noteText}>
            MongoDB bağlantısı için önce MongoDB'nin yüklü ve çalışır durumda olması gerekir.
          </Text>
          <Text style={styles.noteText}>
            Veya MongoDB Atlas (cloud) kullanabilirsiniz.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  noteContainer: {
    backgroundColor: '#FFF3CD',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#856404',
  },
  noteText: {
    fontSize: 14,
    color: '#856404',
    marginBottom: 5,
    lineHeight: 20,
  },
});

export default YksCardsTestScreen;
