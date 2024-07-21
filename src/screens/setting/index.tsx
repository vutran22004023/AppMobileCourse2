import { FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButtonIcon from '@/components/Button/buttonIcon'
import { useNavigation } from '@react-navigation/native'
import { icons } from '@/constants'
import ComeBack from '@/components/Comback/comeBack'
const Setting = () => {
    const navigation =  useNavigation()
  return (
    <SafeAreaView style={{backgroundColor:'#161622'}} className='border-2 border-red-500 flex-1'>
        <ComeBack name="Cài đặt"/>
        <View className='my-1 mx-3'>
            <View>
                <Text className='text-white text-2xl font-pmedium'>Thông tin cá nhân</Text>
                <Text className='text-white text-sm '>Quản lý thông tin của bạn</Text>
            </View>

            <View className='mt-4 mx-4 p-5 bg-black-100 rounded-md'>
                <View>
                    <Text className='text-white text-xl font-pmedium'>Thông tin cơ bản</Text>
                    <Text className='text-white text-sm '>Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn</Text>
                </View>
                
                <View>
                    <View>

                    </View>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}

export default Setting
