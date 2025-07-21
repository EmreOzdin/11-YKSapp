import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

const FenBilimleriScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.backText}>{'<'} Geri</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Fen Bilimleri</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e0f2fe' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#228be6' },
  backButton: { position: 'absolute', top: 40, left: 20, padding: 8, backgroundColor: '#fff', borderRadius: 8, elevation: 2 },
  backText: { fontSize: 16, color: '#228be6', fontWeight: 'bold' },
});

export default FenBilimleriScreen; 