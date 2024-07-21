import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButtonIcon from '../Button/buttonIcon'
import { icons } from '@/constants'
import { useNavigation } from '@react-navigation/native'

interface Props {
    name: string
}
const ComeBack = ({name}: Props) => {
    const navigation = useNavigation()
  return (
    <View className='my-6 mt-[25px] mb-[24px]'>
    <View className=' flex-row mb-6 px-4 gap-5 items-center'>
        <CustomButtonIcon icon={icons.left} handlePress={() => navigation.goBack()}/>
        <View className='mr-3'>
            <Text className='font-pmedium text-xl text-gray-100 text-right'>{name}</Text>
        </View>
    </View>
    <View className='w-full h-[1px] bg-white'></View>
</View>
  )
}

export default ComeBack

const styles = StyleSheet.create({})