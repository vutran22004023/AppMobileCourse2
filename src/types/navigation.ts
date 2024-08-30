import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    Home: undefined;
    LoginScreens: undefined;
    RegisterScreens: undefined;
    VideoCourse: undefined;
    BlogDetailScreen: { blogDetail: any };
    SettingScreen: undefined;
  };
  
  export type NavigationProps<T extends keyof RootStackParamList> = {
    navigation: StackNavigationProp<RootStackParamList, T>;
  };