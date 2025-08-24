import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../utils/theme';

interface PastQuestionBadgeProps {
  year: number;
  size?: 'small' | 'medium' | 'large';
}

const PastQuestionBadge: React.FC<PastQuestionBadgeProps> = ({
  year,
  size = 'medium'
}) => {
  const getBadgeStyle = () => {
    switch (size) {
      case 'small': return styles.smallBadge;
      case 'large': return styles.largeBadge;
      default: return styles.mediumBadge;
    }
  };

  const getTextStyle = () => {
    switch (size) {
      case 'small': return styles.smallText;
      case 'large': return styles.largeText;
      default: return styles.mediumText;
    }
  };

  return (
    <View style={[styles.badge, getBadgeStyle()]}>
      <Text style={[styles.text, getTextStyle()]}>
        {year} ÇIKMIŞ
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  smallBadge: { 
    paddingHorizontal: 6, 
    paddingVertical: 2, 
    borderRadius: 8 
  },
  mediumBadge: { 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 12 
  },
  largeBadge: { 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 16 
  },
  text: { 
    color: 'white', 
    fontWeight: 'bold', 
    textAlign: 'center' 
  },
  smallText: { 
    fontSize: 10 
  },
  mediumText: { 
    fontSize: 12 
  },
  largeText: { 
    fontSize: 14 
  },
});

export default PastQuestionBadge;
