import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

const MatematikScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.backText}>{'<'} Geri</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Matematik</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff9db' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#f7b731' },
  backButton: { position: 'absolute', top: 40, left: 20, padding: 8, backgroundColor: '#fff', borderRadius: 8, elevation: 2 },
  backText: { fontSize: 16, color: '#f7b731', fontWeight: 'bold' },
});

export default MatematikScreen; 