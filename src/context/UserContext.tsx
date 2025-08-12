import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  updateAvatar: (newAvatar: string) => void;
  updateUserInfo: (newInfo: Partial<UserInfo>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: 'Emre Yılmaz',
    email: 'emre.yilmaz@email.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    joinDate: 'Ocak 2024',
    totalQuestions: 1247,
    correctAnswers: 892,
    accuracy: 71.7,
    studyStreak: 15,
    totalStudyTime: 89,
  });

  const updateAvatar = (newAvatar: string) => {
    setUserInfo(prev => ({
      ...prev,
      avatar: newAvatar
    }));
  };

  const updateUserInfo = (newInfo: Partial<UserInfo>) => {
    setUserInfo(prev => ({
      ...prev,
      ...newInfo
    }));
  };

  return (
    <UserContext.Provider value={{ userInfo, updateAvatar, updateUserInfo }}>
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
