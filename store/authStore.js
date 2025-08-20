import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isLoading: false,

    register: async (username, email, password) => {
        console.log('=== AUTH STORE REGISTER ===');
        console.log('Registering with:', { username, email, password: '***' });

        set({ isLoading: true });
        try {
          console.log(
            'Making API request to: http://10.0.2.2:3000/api/auth/register'
          );

          const response = await fetch(
            'http://10.0.2.2:3000/api/auth/register',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, email, password }),
            }
          );

          console.log('Response status:', response.status);
          console.log('Response ok:', response.ok);

          const data = await response.json();
          console.log('Response data:', data);

          if (!response.ok) {
            console.log('Registration failed:', data.message);
            set({ isLoading: false });
            return {
              success: false,
              message: data.message || 'Registration failed',
            };
          }

          console.log('Registration successful, saving to AsyncStorage');
          await AsyncStorage.setItem('user', JSON.stringify(data.user));
          await AsyncStorage.setItem('token', data.token);

          console.log('Updating store state');
          set({ user: data.user, token: data.token, isLoading: false });

          console.log('=== REGISTER COMPLETE ===');
          return { success: true, message: 'Registration successful' };
        } catch (error) {
          console.error('=== REGISTRATION ERROR ===');
          console.error('Error details:', error);
          set({ isLoading: false });
          return { success: false, message: error.message || 'Network error' };
        }
    },

    login: (userData) => {
        set({ user: userData, isAuthenticated: true });
    },

    logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
    },
}));



