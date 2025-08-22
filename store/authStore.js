import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

// Backend URL'ini dinamik olarak ayarla
const getBackendUrl = () => {
  // Android Emulator için
  if (__DEV__) {
    return 'http://10.0.2.2:3000';
  }
  // Gerçek cihaz için (bilgisayarınızın IP adresi)
  return 'http://192.168.1.64:3000'; // Bilgisayarınızın IP adresi
};

export const useAuthStore = create(set => ({
  user: null,
  token: null,
  isLoading: false,

  initializeAuth: async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userJson = await AsyncStorage.getItem('user');
      const user = userJson ? JSON.parse(userJson) : null;

      if (token && user) {
        set({ user, token, isAuthenticated: true });
      } else {
        set({ user: null, token: null, isAuthenticated: false });
      }
    } catch (error) {
      set({ user: null, token: null, isAuthenticated: false });
    }
  },

  register: async (username, email, password) => {
    set({ isLoading: true });
    try {
      const backendUrl = getBackendUrl();
      const response = await fetch(`${backendUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        set({ isLoading: false });
        return {
          success: false,
          message: data.message || 'Registration failed',
        };
      }

      await AsyncStorage.setItem('user', JSON.stringify(data.user));
      await AsyncStorage.setItem('token', data.token);

      set({ user: data.user, token: data.token, isLoading: false });

      return { success: true, message: 'Registration successful' };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, message: error.message || 'Network error' };
    }
  },

  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userJson = await AsyncStorage.getItem('user');
      const user = userJson ? JSON.parse(userJson) : null;

      if (!token || !user) {
        set({ user: null, token: null, isAuthenticated: false });
        return;
      }
    } catch (error) {
      console.error('Auth check failed', error);
    }
  },

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const backendUrl = getBackendUrl();
      const response = await fetch(`${backendUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        set({ isLoading: false });
        return {
          success: false,
          message: data.message || 'Login failed',
        };
      }

      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));

      set({ user: data.user, token: data.token, isLoading: false });

      return { success: true, message: 'Login successful' };
    } catch (error) {
      set({ isLoading: false });
      return { success: false, message: error.message || 'Network error' };
    }
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
  },

  updateProfileImage: async imageUrl => {
    try {
      const currentUser = await AsyncStorage.getItem('user');
      if (currentUser) {
        const user = JSON.parse(currentUser);
        const updatedUser = { ...user, profileImage: imageUrl };

        await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
        set({ user: updatedUser });

        return { success: true };
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
}));



