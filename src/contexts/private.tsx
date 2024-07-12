import React, { useEffect, ReactNode } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { updateUser } from '@/redux/Slide/userSlide'; // Adjust path as necessary
import { url } from '@/services/url';

export interface JwtDecodeOptions {
  header?: boolean;
}

interface DecodedToken {
  id: string;
  exp: number;
  isAdmin: boolean;
}

interface GlobalProviderProps {
  children: ReactNode;
}

const PrivateLogin: React.FC<GlobalProviderProps> = ({ children }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      const checkAuth = async () => {
        const accessToken = await getAccessTokenFromStorage();
        if (!accessToken) {
          console.log('Hiện tại bạn chưa đăng nhập');
          return;
        }

        const decodedToken = decodeAccessToken(accessToken);

        if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
          try {
            const refreshToken = await getRefreshTokenFromStorage();
            if (!refreshToken) {
              console.log('Hiện tại bạn chưa đăng nhập');
              return;
            }
            const refreshedToken = await refreshAccessToken(refreshToken);
            if (refreshedToken) {
              await setAccessTokenToStorage(refreshedToken);
              handleGetDetailsUser(decodedToken.id, refreshedToken);
            } else {
              console.log('Hiện tại bạn chưa đăng nhập');
            }
          } catch (error) {
            console.error('Error refreshing token:', error);
          }
        } else if (decodedToken) {
          handleGetDetailsUser(decodedToken.id, accessToken);
          navigation.navigate('TabsBottom'); // Chuyển hướng khi đã có accessToken hợp lệ
        }
      };

      checkAuth();
    }, [navigation])
  );

  const getAccessTokenFromStorage = async (): Promise<string | null> => {
    return await AsyncStorage.getItem('accessToken');
  };

  const getRefreshTokenFromStorage = async (): Promise<string | null> => {
    return await AsyncStorage.getItem('refreshToken'); // Lấy refreshToken thay vì lấy lại accessToken
  };

  const setAccessTokenToStorage = async (token: string) => {
    await AsyncStorage.setItem('accessToken', token);
  };

  const decodeAccessToken = (token: string): DecodedToken | null => {
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Error decoding access token:', error);
      return null;
    }
  };

  const refreshAccessToken = async (token: string): Promise<string | null> => {
    try {
      const response = await axios.post<{ accessToken: string }>('/api/refresh-token', {
        refreshToken: token,
      });
      if (response.data.accessToken) {
        return response.data.accessToken;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error;
    }
  };

  const handleGetDetailsUser = async (userId: string, accessToken: string) => {
    try {
      const response = await axios.get(`${url}/api/user/get-detail-user/${userId}`, {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      });
      
      dispatch(updateUser({ ...response.data.data, access_Token: accessToken }));
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  return <>{children}</>;
};

export default PrivateLogin;
