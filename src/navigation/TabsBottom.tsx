import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
import HomePage from '@/screens/homePage';
import TabIcon from '@/components/TabIcon/tabIcon';
import {icons} from '@/constants'
import CoursePage from '@/screens/course';
import ProfilePage from '@/screens/profile'
import BlogPage from '@/screens/blog';
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store';
import useNavigation from '../hooks/useNavigation';
import {getTokenFrom} from '@/Utils/tokenUtils'
const Tab = createBottomTabNavigator();

const TabsBottom = () => {
  const navigation = useNavigation()
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
      const checkLogin= async() => {
        const token = await getTokenFrom();
        if (!token && !user?.isAdmin && user?.status !== true) {
          navigation.navigate('LoginScreens');
        }
      }
      checkLogin()
  }, []);
  return (
    <Tab.Navigator 
    initialRouteName={'HomePage'}
    screenOptions={{
      tabBarShowLabel: false,
      tabBarActiveTintColor: '#ffA001',
      tabBarInactiveTintColor: '#CDCDE0',
      tabBarStyle: {
        backgroundColor: '#161622',
        borderTopWidth: 1,
        borderTopColor: '#232533',
        height: 55
      },
      
    }}
    >
      <Tab.Screen
        name="HomePage"
        component={HomePage} 
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => ( 
            <TabIcon
              icon={icons.home}
              focused={focused} 
              color={color}
              size={size}
              name="Trang chủ"
            />
            
          )
        }}
      />
      <Tab.Screen
        name="CoursePage"
        component={CoursePage} 
        options={{
          title: 'Course',
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              icon={icons.course}
              focused={focused} 
              color={color}
              size={size}
              name="Khóa học"
            />
            
          )
        }}
      />
      <Tab.Screen
        name="BlogPage"
        component={BlogPage} 
        options={{
          title: 'Blog',
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => ( 
            <TabIcon
              icon={icons.blog}
              focused={focused} 
              color={color}
              size={size}
              name="Bài Viết"
            />
            
          )
        }}
      />
      <Tab.Screen
        name="ProfilePage"
        component={ProfilePage} 
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, focused, size }) => (
            <TabIcon
              icon={icons.profile}
              focused={focused} 
              color={color}
              size={size}
              name="Cá nhân"
            />
            
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default TabsBottom