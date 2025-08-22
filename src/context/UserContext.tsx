import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getDefaultAvatarUrl } from '../utils/defaultAvatar';

interface UserInfo {
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number;
  studyStreak: number;
  totalStudyTime: number;
}

interface UserContextType {
  userInfo: UserInfo;
  updateAvatar: (newAvatar: string) => Promise<void>;
  updateUserInfo: (newInfo: Partial<UserInfo>) => Promise<void>;
  initializeUser: (userData: any) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    email: '',
    avatar: getDefaultAvatarUrl(),
    joinDate: new Date().toLocaleDateString('tr-TR', {
      month: 'long',
      year: 'numeric',
    }),
    totalQuestions: 0,
    correctAnswers: 0,
    accuracy: 0,
    studyStreak: 0,
    totalStudyTime: 0,
  });

  // AsyncStorage'dan kullanıcı bilgilerini yükle
  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    try {
      const storedUserInfo = await AsyncStorage.getItem('userInfo');
      if (storedUserInfo) {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        setUserInfo(parsedUserInfo);
      }
    } catch (error) {
      console.error('Kullanıcı bilgileri yüklenirken hata:', error);
    }
  };

  const saveUserInfo = async (info: UserInfo) => {
    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(info));
    } catch (error) {
      console.error('Kullanıcı bilgileri kaydedilirken hata:', error);
    }
  };

  const updateAvatar = async (newAvatar: string) => {
    const updatedInfo = {
      ...userInfo,
      avatar: newAvatar,
    };
    setUserInfo(updatedInfo);
    await saveUserInfo(updatedInfo);
  };

  const updateUserInfo = async (newInfo: Partial<UserInfo>) => {
    const updatedInfo = {
      ...userInfo,
      ...newInfo,
    };
    setUserInfo(updatedInfo);
    await saveUserInfo(updatedInfo);
  };

  const initializeUser = async (userData: any) => {
    const newUserInfo: UserInfo = {
      name: userData.username || userData.name || '',
      email: userData.email || '',
      avatar: userData.profileImage || getDefaultAvatarUrl(),
      joinDate: new Date().toLocaleDateString('tr-TR', {
        month: 'long',
        year: 'numeric',
      }),
      totalQuestions: 0,
      correctAnswers: 0,
      accuracy: 0,
      studyStreak: 0,
      totalStudyTime: 0,
    };

    setUserInfo(newUserInfo);
    await saveUserInfo(newUserInfo);
  };

  return (
    <UserContext.Provider
      value={{ userInfo, updateAvatar, updateUserInfo, initializeUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
