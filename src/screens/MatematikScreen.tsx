import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { responsiveSize, responsiveFontSize } from '../utils/responsive';
import { colors, typography, shadows } from '../utils/theme';

const MatematikScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <View style={styles.container}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.backText}>{'<'} Geri</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Matematik</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#fff9db' 
  },
  title: { 
    fontSize: responsiveFontSize(28), 
    fontWeight: 'bold', 
    color: colors.gradients.orange[0] 
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
    color: colors.gradients.orange[0], 
    fontWeight: 'bold' 
  },
});

export default MatematikScreen; 