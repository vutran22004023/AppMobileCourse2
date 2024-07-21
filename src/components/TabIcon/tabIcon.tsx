import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const tabIcon = ({icon, color, name, focused}: any) => {
  return (
    <View className='items-center justify-center gap-2'>
      <Image
      source={icon}
      resizeMode='contain'
      tintColor={color}
      className='w-7 h-7'
      />
      <Text className={`${focused ? 'font-psemibold': 'font-pregular'} text-xs`} style={{color: color}}>{name}</Text>
    </View>
  )
}

export default tabIcon

const styles = StyleSheet.create({})