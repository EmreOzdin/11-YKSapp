import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isLoading: false,

    register: async (username, email, password) => {
        set({ isLoading: true });
        try {
            const response = await fetch('http://10.0.2.2:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if(!response.ok) {
                set({ isLoading: false });
                return { success: false, message: data.message || 'Registration failed' };
            }

            await AsyncStorage.setItem('user', JSON.stringify(data.user));
            await AsyncStorage.setItem('token', data.token);

            set({ user: data.user, token: data.token, isLoading: false });

            return { success: true, message: 'Registration successful' };
        } catch (error) {
            set({ isLoading: false });
            console.error('Registration error:', error);
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



