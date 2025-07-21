import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Onboarding from './src/screens/Onboarding';
import LogoScreen from './src/screens/LogoScreen';
import EmailLoginScreen from './src/screens/EmailLoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import TermsOfServiceScreen from './src/screens/TermsOfServiceScreen';
import PaymentTermsScreen from './src/screens/PaymentTermsScreen';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
import HomeScreen from './src/screens/HomeScreen';
// Yasal ekranlar eklenecek

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Logo">
        <Stack.Screen name="Logo" component={LogoScreen} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="EmailLogin" component={EmailLoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
        <Stack.Screen name="PaymentTerms" component={PaymentTermsScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        {/* Yasal ekranlar burada olacak */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
