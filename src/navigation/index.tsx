import { StyleSheet, View } from 'react-native';
import { NavigationContainer,DefaultTheme, useNavigation  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider,useDispatch, useSelector } from "react-redux";
import { store, persistor,AppDispatch, RootState  } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreens from '@/screens/home'; 
import LoginScreens from '@/screens/auth/login';
import RegisterScreens from '@/screens/auth/register';
import TabsBottom from '@/navigation/TabsBottom';
import SearchScreen from '@/screens/search/search';
import SettingScreen from '@/screens/setting';
import BlogDetailScreen from '@/screens/blogDetail';
import {initializeUser} from '@/contexts/private'
SplashScreen.preventAutoHideAsync();
export type RootStackParamList = {
  Overview: undefined;
  Details: { name: string };
  HomeScreens: { name: string };
  LoginScreens: { name: string };
  RegisterScreens: { name: string };
  TabsBottom: { name: string };
  SearchScreen: {name:string}
  SettingScreen: {name:string}
  BlogDetailScreen: {name:string}
};

const Stack = createStackNavigator<RootStackParamList>();


const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#161622', // Set your desired background color
  },
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  useEffect(() => {
    const checkAuth = async () => {
      initializeUser(dispatch,navigation); // Make sure you call the function
    };
    checkAuth();
  }, [dispatch]);

  return <>{children}</>;
};

export default function RootStack() {
  const queryClient = new QueryClient();

  const [fontsLoaded, error] = useFonts({
    'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'),
    'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
    const hideSplash = async () => {
      if (error) throw error;
      await SplashScreen.preventAutoHideAsync(); // Ngăn chặn tự động ẩn thanh màu trắng
      if (fontsLoaded) {
        await SplashScreen.hideAsync(); // Ẩn thanh màu trắng khi fonts đã được tải
      }
    };

    hideSplash();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <NavigationContainer theme={customTheme}>
        <AuthProvider>
          <Stack.Navigator initialRouteName="HomeScreens">
            <Stack.Screen name="HomeScreens" component={HomeScreens} options={{ headerShown: false }} />
            <Stack.Screen name="LoginScreens" component={LoginScreens} options={{ headerShown: false }} />
            <Stack.Screen name="RegisterScreens" component={RegisterScreens} options={{ headerShown: false }} />
            <Stack.Screen name="TabsBottom" component={TabsBottom} options={{ headerShown: false }} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SettingScreen" component={SettingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="BlogDetailScreen" component={BlogDetailScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
          </AuthProvider>
        </NavigationContainer>
        </GestureHandlerRootView>
    </QueryClientProvider>
    </PersistGate>
    </Provider>
  );
}
