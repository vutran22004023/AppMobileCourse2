import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import {images} from '@/constants'
import ButtonComponment from '@/components/buttonComponment/button'
import { useNavigation } from '@react-navigation/native';

const HomeScreens  = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{backgroundColor:'#161622', height:'100%'}}>
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className='w-full items-center h-full px-4 justify-center'>
        <Image
            source={images.logo}
            className='w-[130px] h-[84px]'
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className='max-w-[380px] w-full h-[300px]'
            resizeMode="contain"
          />
          <View>
          <Text className='text-3xl text-white text-center font-bold'>
              Discover Endless Possibilities with{" "}
              <Text className='text-[#eec10c]'>Aora</Text>
            </Text>
            
          </View>

          <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>
            Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora
          </Text>

          <ButtonComponment  
            title="Continue with Email"
            handlePress={() => navigation.navigate('LoginScreens')}
            textStyles=""
            containerStyles="w-full mt-7"
          />
          <ButtonComponment  
            title="Continue with Email"
            handlePress={() => navigation.navigate('TabsBottom')}
            textStyles=""
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreens 