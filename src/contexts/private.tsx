
import {jwtDecode} from 'jwt-decode';
import { AppDispatch, store } from '@/redux/store';
import { resetUser, updateUser } from '@/redux/Slide/userSlide';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetDetailUser } from '@/services/user';
import { useNavigation } from '@react-navigation/native';
export const getTokenFrom = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    return token;
  } catch (error) {
    console.error('Error getting token from storage:', error);
    return null;
  }
};

export const setToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('accessToken', token);
  } catch (error) {
    console.error('Error setting token:', error);
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('accessToken');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken: { exp?: number } = jwtDecode(token);
    if (!decodedToken.exp) {
      return true;
    }
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  } catch (e) {
    console.error('Failed to decode token', e);
    return true;
  }
};

export const initializeUser = async (dispatch: AppDispatch,navigation) => {
  const token = await getTokenFrom();  // Await the token retrieval

  const state = store.getState();
  const id = state.user.id;
  if (token) {
    if (isTokenExpired(token)) {
      dispatch(resetUser());
      await removeToken();  // Remove expired token
    } else {
      try {
        const response = await GetDetailUser(id, token);
        if (response.status === 200) {
          dispatch(
            updateUser({
              name: response.data.name || '',
              email: response.data.email || '',
              avatar: response.data.avatar || '',
              _id: response.data._id || '',
              isAdmin: response.data.isAdmin || false,
              status: response.data.status || false,
            })
          );
          navigation.navigate('TabsBottom');
        }
      } catch (error) {
        console.error('Failed to authenticate user', error);
      }
    }
  } else {
    dispatch(resetUser());  // Reset user if no token is found
  }
};
