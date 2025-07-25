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
import FenBilimleriScreen from './src/screens/FenBilimleriScreen';
import TurkceScreen from './src/screens/TurkceScreen';
import MatematikScreen from './src/screens/MatematikScreen';
import SosyalBilimlerScreen from './src/screens/SosyalBilimlerScreen';
import TytScreen from './src/screens/TytScreen';
import AytScreen from './src/screens/AytScreen';
import YdtScreen from './src/screens/YdtScreen';
import CardsScreen from './src/screens/CardsScreen';
import HedeflerScreen from './src/screens/HedeflerScreen';
import PerformansScreen from './src/screens/PerformansScreen';
import ProfilScreen from './src/screens/ProfilScreen';
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
        <Stack.Screen name="Fen Bilimleri" component={FenBilimleriScreen} />
        <Stack.Screen name="Türkçe" component={TurkceScreen} />
        <Stack.Screen name="Matematik" component={MatematikScreen} />
        <Stack.Screen name="Sosyal Bilimler" component={SosyalBilimlerScreen} />
        <Stack.Screen name="TYT" component={TytScreen} />
        <Stack.Screen name="AYT" component={AytScreen} />
        <Stack.Screen name="YDT" component={YdtScreen} />
        <Stack.Screen name="Cards" component={CardsScreen} />
        <Stack.Screen name="Hedefler" component={HedeflerScreen} />
        <Stack.Screen name="Performans" component={PerformansScreen} />
        <Stack.Screen name="Profil" component={ProfilScreen} />
        <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
        <Stack.Screen name="PaymentTerms" component={PaymentTermsScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        {/* Yasal ekranlar burada olacak */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
