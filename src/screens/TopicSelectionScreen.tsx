import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
} from 'react-native';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import { responsiveSize, responsiveFontSize } from '../utils/responsive';
import { colors, typography, shadows } from '../utils/theme';
import {
  QuestionService,
  TopicCategory,
  UserSelections,
} from '../services/questionService';

type TopicSelectionScreenRouteProp = RouteProp<
  {
    TopicSelectionScreen: {
      examType: 'TYT' | 'AYT' | 'YDT';
    };
  },
  'TopicSelectionScreen'
>;

const TopicSelectionScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute<TopicSelectionScreenRouteProp>();
  const { examType } = route.params;

  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [topicCategories, setTopicCategories] = useState<TopicCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTopicCategories();
    loadUserSelections();
  }, [examType]);

  const loadTopicCategories = () => {
    const categories = QuestionService.getTopicCategories(examType);
    setTopicCategories(categories);
    setLoading(false);
  };

  const loadUserSelections = async () => {
    try {
      const selections = await QuestionService.getUserSelections();
      if (selections && selections.examType === examType) {
        setSelectedTopics(selections.selectedTopics);
      }
    } catch (error) {
      console.error('Kullanıcı seçimleri yüklenirken hata:', error);
    }
  };

  const toggleTopic = (topicId: string) => {
    setSelectedTopics(prev => {
      if (prev.includes(topicId)) {
        return prev.filter(id => id !== topicId);
      } else {
        return [...prev, topicId];
      }
    });
  };

  const selectAllTopics = () => {
    const allTopicIds = topicCategories.map(cat => cat.id);
    setSelectedTopics(allTopicIds);
  };

  const clearAllTopics = () => {
    setSelectedTopics([]);
  };

  const saveSelections = async () => {
    if (selectedTopics.length === 0) {
      Alert.alert('Uyarı', 'En az bir konu seçmelisiniz!', [{ text: 'Tamam' }]);
      return;
    }

    try {
      const selections: UserSelections = {
        examType,
        selectedTopics,
        selectedSubjects: [
          ...new Set(
            topicCategories
              .filter(cat => selectedTopics.includes(cat.id))
              .map(cat => cat.subject)
          ),
        ],
      };

      await QuestionService.saveUserSelections(selections);

      // Direkt sorulara geçiş yap
      navigation.navigate('QuestionScreen', { examType });
    } catch (error) {
      Alert.alert('Hata', 'Seçimler kaydedilemedi. Lütfen tekrar deneyin.');
    }
  };

  const getSubjectColor = (subject: string) => {
    const colors = {
      Türkçe: '#FF6B6B',
      Matematik: '#4ECDC4',
      'Fen Bilimleri': '#45B7D1',
      'Sosyal Bilimler': '#96CEB4',
      İngilizce: '#FFEAA7',
    };
    return colors[subject as keyof typeof colors] || '#95A5A6';
  };

  const groupedTopics = topicCategories.reduce(
    (acc, topic) => {
      if (!acc[topic.subject]) {
        acc[topic.subject] = [];
      }
      acc[topic.subject].push(topic);
      return acc;
    },
    {} as Record<string, TopicCategory[]>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Konular yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>{'<'} Geri</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{examType} Konu Seçimi</Text>
        <View style={styles.headerRight}>
          <Text style={styles.selectedCount}>
            {selectedTopics.length} seçili
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={selectAllTopics}>
          <Text style={styles.actionButtonText}>Tümünü Seç</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={clearAllTopics}>
          <Text style={styles.actionButtonText}>Temizle</Text>
        </TouchableOpacity>
      </View>

      {/* Topics List */}
      <ScrollView
        style={styles.topicsContainer}
        showsVerticalScrollIndicator={false}
      >
        {Object.entries(groupedTopics).map(([subject, topics]) => (
          <View key={subject} style={styles.subjectGroup}>
            <View style={styles.subjectHeader}>
              <View
                style={[
                  styles.subjectColor,
                  { backgroundColor: getSubjectColor(subject) },
                ]}
              />
              <Text style={styles.subjectTitle}>{subject}</Text>
            </View>

            {topics.map(topic => (
              <TouchableOpacity
                key={topic.id}
                style={[
                  styles.topicItem,
                  selectedTopics.includes(topic.id) && styles.selectedTopicItem,
                ]}
                onPress={() => toggleTopic(topic.id)}
              >
                <View style={styles.topicContent}>
                  <Text
                    style={[
                      styles.topicName,
                      selectedTopics.includes(topic.id) &&
                        styles.selectedTopicName,
                    ]}
                  >
                    {topic.name}
                  </Text>
                  {topic.description && (
                    <Text style={styles.topicDescription}>
                      {topic.description}
                    </Text>
                  )}
                </View>
                <Switch
                  value={selectedTopics.includes(topic.id)}
                  onValueChange={() => toggleTopic(topic.id)}
                  trackColor={{
                    false: colors.borderLight,
                    true: colors.primary,
                  }}
                  thumbColor={
                    selectedTopics.includes(topic.id)
                      ? colors.textWhite
                      : colors.textSecondary
                  }
                />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.saveButton,
            selectedTopics.length === 0 && styles.saveButtonDisabled,
          ]}
          onPress={saveSelections}
          disabled={selectedTopics.length === 0}
        >
          <Text style={styles.saveButtonText}>
            {selectedTopics.length > 0
              ? `${selectedTopics.length} Konu Seç - Çalışmaya Başla`
              : 'En Az 1 Konu Seçin'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundTertiary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundTertiary,
  },
  loadingText: {
    fontSize: responsiveFontSize(18),
    color: colors.textSecondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveSize(20),
    paddingTop: responsiveSize(40),
    paddingBottom: responsiveSize(20),
    backgroundColor: colors.backgroundSecondary,
    ...shadows.small,
  },
  backButton: {
    padding: responsiveSize(8),
    borderRadius: responsiveSize(8),
  },
  backText: {
    fontSize: responsiveFontSize(16),
    color: colors.gradients.blue[0],
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: responsiveFontSize(20),
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  selectedCount: {
    fontSize: responsiveFontSize(14),
    color: colors.textSecondary,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: responsiveSize(20),
    paddingVertical: responsiveSize(15),
    gap: responsiveSize(10),
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
    padding: responsiveSize(12),
    borderRadius: responsiveSize(8),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  actionButtonText: {
    fontSize: responsiveFontSize(14),
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  topicsContainer: {
    flex: 1,
    paddingHorizontal: responsiveSize(20),
  },
  subjectGroup: {
    marginBottom: responsiveSize(20),
  },
  subjectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveSize(10),
  },
  subjectColor: {
    width: responsiveSize(4),
    height: responsiveSize(20),
    borderRadius: responsiveSize(2),
    marginRight: responsiveSize(10),
  },
  subjectTitle: {
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSecondary,
    padding: responsiveSize(15),
    marginBottom: responsiveSize(8),
    borderRadius: responsiveSize(12),
    borderWidth: 1,
    borderColor: colors.borderLight,
    ...shadows.small,
  },
  selectedTopicItem: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  topicContent: {
    flex: 1,
  },
  topicName: {
    fontSize: responsiveFontSize(16),
    color: colors.textPrimary,
    fontWeight: '500',
  },
  selectedTopicName: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  topicDescription: {
    fontSize: responsiveFontSize(12),
    color: colors.textSecondary,
    marginTop: responsiveSize(4),
  },
  footer: {
    paddingHorizontal: responsiveSize(20),
    paddingVertical: responsiveSize(20),
    backgroundColor: colors.backgroundSecondary,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: responsiveSize(16),
    borderRadius: responsiveSize(12),
    alignItems: 'center',
    ...shadows.medium,
  },
  saveButtonDisabled: {
    backgroundColor: colors.borderLight,
  },
  saveButtonText: {
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
    color: colors.textWhite,
  },
});

export default TopicSelectionScreen;
