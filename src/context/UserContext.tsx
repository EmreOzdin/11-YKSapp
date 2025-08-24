import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  ReactNode,
  createContext,
  useCallback,
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
  const [isLoaded, setIsLoaded] = useState(false);

  // AsyncStorage'dan kullanıcı bilgilerini yükle
  useEffect(() => {
    loadUserInfo();
  }, []);

  // Kullanıcı değiştiğinde userInfo'yu yeniden yükle
  useEffect(() => {
    const checkUserChange = async () => {
      try {
        const currentUser = await AsyncStorage.getItem('user');
        if (currentUser) {
          const user = JSON.parse(currentUser);
          if (user.email !== userInfo.email) {
            // Kullanıcı değişmiş, userInfo'yu yeniden yükle
            console.log(
              'Kullanıcı değişikliği tespit edildi:',
              user.email,
              '->',
              userInfo.email
            );
            await loadUserInfo();
          }
        }
      } catch (error) {
        console.error('Kullanıcı değişikliği kontrol edilirken hata:', error);
      }
    };

    checkUserChange();
  }, [userInfo.email]);

  const loadUserInfo = async () => {
    try {
      // Önce mevcut kullanıcıyı al
      const currentUser = await AsyncStorage.getItem('user');
      if (!currentUser) {
        setIsLoaded(true);
        return;
      }

      const user = JSON.parse(currentUser);
      const userEmail = user.email;

      // Kullanıcıya özel userInfo key'i oluştur
      const userInfoKey = `userInfo_${userEmail}`;
      const storedUserInfo = await AsyncStorage.getItem(userInfoKey);

      if (storedUserInfo) {
        const parsedUserInfo = JSON.parse(storedUserInfo);

        // Avatar değerini doğrula - geçersizse default kullan
        const validatedUserInfo = {
          ...parsedUserInfo,
          avatar:
            parsedUserInfo.avatar && parsedUserInfo.avatar.trim() !== ''
              ? parsedUserInfo.avatar
              : getDefaultAvatarUrl(),
        };

        setUserInfo(validatedUserInfo);
      }
      // AsyncStorage'da veri yoksa, hiçbir şey yapma - default state'i koru
      setIsLoaded(true);
    } catch (error) {
      console.error('Kullanıcı bilgileri yüklenirken hata:', error);
      setIsLoaded(true);
    }
  };

  const saveUserInfo = async (info: UserInfo) => {
    try {
      // Önce mevcut kullanıcıyı al
      const currentUser = await AsyncStorage.getItem('user');
      if (!currentUser) {
        console.error('Kullanıcı bilgisi bulunamadı');
        return;
      }

      const user = JSON.parse(currentUser);
      const userEmail = user.email;

      // Kullanıcıya özel userInfo key'i oluştur
      const userInfoKey = `userInfo_${userEmail}`;

      // Avatar değerini son kez doğrula
      const validatedInfo = {
        ...info,
        avatar:
          info.avatar && info.avatar.trim() !== ''
            ? info.avatar
            : getDefaultAvatarUrl(),
      };

      await AsyncStorage.setItem(userInfoKey, JSON.stringify(validatedInfo));
    } catch (error) {
      console.error('Kullanıcı bilgileri kaydedilirken hata:', error);
    }
  };

  const updateAvatar = async (newAvatar: string) => {
    // Avatar değişikliğini doğrula - boş string veya geçersiz değer kontrolü
    if (!newAvatar || newAvatar.trim() === '') {
      console.warn('Geçersiz avatar değeri:', newAvatar);
      return;
    }

    const updatedInfo = {
      ...userInfo,
      avatar: newAvatar,
    };

    setUserInfo(updatedInfo);
    await saveUserInfo(updatedInfo);
  };

  const updateUserInfo = async (newInfo: Partial<UserInfo>) => {
    // Avatar değişikliği varsa, sadece geçerli değerlerle güncelle
    const updatedInfo = {
      ...userInfo,
      ...newInfo,
      // Avatar'ı koruma - sadece updateAvatar fonksiyonu ile değiştirilebilir
      avatar:
        newInfo.avatar && newInfo.avatar.trim() !== ''
          ? newInfo.avatar
          : userInfo.avatar,
    };
    setUserInfo(updatedInfo);
    await saveUserInfo(updatedInfo);
  };

  const initializeUser = useCallback(
    async (userData: any) => {
      // loadUserInfo henüz tamamlanmamışsa bekle
      if (!isLoaded) {
        return;
      }

      const userEmail = userData.email;
      if (!userEmail) {
        console.error('Kullanıcı email bilgisi bulunamadı');
        return;
      }

      // Kullanıcıya özel userInfo key'i oluştur
      const userInfoKey = `userInfo_${userEmail}`;

      // Mevcut userInfo state'ini kontrol et - eğer email aynıysa hiçbir şey yapma
      if (userInfo.email === userEmail) {
        // Aynı kullanıcı için hiçbir şey yapma - mevcut avatar'ı koru
        return;
      }

      // Farklı kullanıcı için AsyncStorage'ı kontrol et
      const storedUserInfo = await AsyncStorage.getItem(userInfoKey);
      let existingUserInfo: UserInfo | null = null;

      if (storedUserInfo) {
        try {
          existingUserInfo = JSON.parse(storedUserInfo);
        } catch (error) {
          console.error(
            'Mevcut kullanıcı bilgileri parse edilirken hata:',
            error
          );
        }
      }

      // Eğer aynı email ile kayıtlı kullanıcı varsa, mevcut bilgileri yükle
      if (existingUserInfo && existingUserInfo.email === userEmail) {
        // Avatar değerini doğrula
        const validatedUserInfo = {
          ...existingUserInfo,
          avatar:
            existingUserInfo.avatar && existingUserInfo.avatar.trim() !== ''
              ? existingUserInfo.avatar
              : getDefaultAvatarUrl(),
        };
        setUserInfo(validatedUserInfo);
        return;
      }

      // Yeni kullanıcı için yeni bilgiler oluştur
      const newUserInfo: UserInfo = {
        name: userData.username || userData.name || '',
        email: userEmail,
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
      };

      setUserInfo(newUserInfo);
      await saveUserInfo(newUserInfo);
    },
    [userInfo.email, isLoaded]
  );

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
