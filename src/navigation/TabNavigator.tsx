import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AytPastScreen from '../screens/AytPastScreen';
import AytScreen from '../screens/AytScreen';
import CardsScreen from '../screens/CardsScreen';
import ExamScreen from '../screens/ExamScreen';
import FenBilimleriScreen from '../screens/FenBilimleriScreen';
import HedeflerScreen from '../screens/HedeflerScreen';
import HomeScreen from '../screens/HomeScreen';
import MatematikScreen from '../screens/MatematikScreen';
import PdfViewerScreen from '../screens/PdfViewerScreen';
import PerformansScreen from '../screens/PerformansScreen';
import ProfilScreen from '../screens/ProfilScreen';
import QuestionScreen from '../screens/QuestionScreen';
import SosyalBilimlerScreen from '../screens/SosyalBilimlerScreen';
import TopicSelectionScreen from '../screens/TopicSelectionScreen';
import TurkceScreen from '../screens/TurkceScreen';
import TytPastScreen from '../screens/TytPastScreen';
import TytScreen from '../screens/TytScreen';
import YdtPastScreen from '../screens/YdtPastScreen';
import YdtScreen from '../screens/YdtScreen';
import { responsiveSize } from '../utils/responsive';
import { colors } from '../utils/theme';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='HomeScreen' component={HomeScreen} />
      <Stack.Screen name='Fen Bilimleri' component={FenBilimleriScreen} />
      <Stack.Screen name='Türkçe' component={TurkceScreen} />
      <Stack.Screen name='Matematik' component={MatematikScreen} />
      <Stack.Screen name='Sosyal Bilimler' component={SosyalBilimlerScreen} />
      <Stack.Screen name='TYT' component={TytScreen} />
      <Stack.Screen name='AYT' component={AytScreen} />
      <Stack.Screen name='YDT' component={YdtScreen} />
      <Stack.Screen name='TYT Past' component={TytPastScreen} />
      <Stack.Screen name='AYT Past' component={AytPastScreen} />
      <Stack.Screen name='YDT Past' component={YdtPastScreen} />
      <Stack.Screen
        name='TopicSelectionScreen'
        component={TopicSelectionScreen}
      />
      <Stack.Screen name='QuestionScreen' component={QuestionScreen} />
      <Stack.Screen name='ExamScreen' component={ExamScreen} />
      <Stack.Screen name='PdfViewerScreen' component={PdfViewerScreen} />
      <Stack.Screen name='ProfilScreen' component={ProfilScreen} />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 1,
          borderColor: colors.border,
          height: responsiveSize(70),
          paddingBottom: responsiveSize(2),
          paddingTop: responsiveSize(3),
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarLabelStyle: {
          fontSize: responsiveSize(12),
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name='HomeTab'
        component={HomeStack}
        options={{
          tabBarLabel: 'Ana Sayfa',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='home-variant'
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name='CardsTab'
        component={CardsScreen}
        options={{
          tabBarLabel: 'Kartlar',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='cards' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='HedeflerTab'
        component={HedeflerScreen}
        options={{
          tabBarLabel: 'Hedefler',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='clipboard-list-outline'
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name='PerformansTab'
        component={PerformansScreen}
        options={{
          tabBarLabel: 'Performans',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='chart-bar'
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name='ProfilTab'
        component={ProfilScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='account-circle-outline'
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
