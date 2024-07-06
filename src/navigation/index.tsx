import { StyleSheet, View } from 'react-native';
import { NavigationContainer,DefaultTheme  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import HomeScreens from '@/screens/home'; 
import LoginScreens from '@/screens/auth/login';
import RegisterScreens from '@/screens/auth/register';
import HomePage from '@/screens/homePage';
import TabsBottom from '@/navigation/TabsBottom'
SplashScreen.preventAutoHideAsync();
export type RootStackParamList = {
  Overview: undefined;
  Details: { name: string };
  HomeScreens: { name: string };
  LoginScreens: { name: string };
  RegisterScreens: { name: string };
  TabsBottom: { name: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622', // Thiết lập màu nền ở đây
  },
});
const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#161622', // Set your desired background color
  },
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
    <QueryClientProvider client={queryClient}>
        <NavigationContainer theme={customTheme}>
          <Stack.Navigator initialRouteName="HomeScreens">
            <Stack.Screen name="HomeScreens" component={HomeScreens} options={{ headerShown: false }} />
            <Stack.Screen name="LoginScreens" component={LoginScreens} options={{ headerShown: false }} />
            <Stack.Screen name="RegisterScreens" component={RegisterScreens} options={{ headerShown: false }} />
            <Stack.Screen name="TabsBottom" component={TabsBottom} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
    </QueryClientProvider>
  );
}
