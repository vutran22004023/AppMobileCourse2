import { Image, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {icons} from '@/constants'
import {images} from '@/constants'
const CardCourse = ({blog: {title, author,date,content},key,onPress}: any) => {
    const truncateContent = (content: string, maxLength: number) => {
        return content.length > maxLength ? content.substring(0, maxLength) + "..." : content;
    }
  return (
    <TouchableOpacity
      className="mb-14 flex-col items-center px-4"
      key={key}
      onPress={onPress}
      activeOpacity={0.7}>
      <View className="mb-2 w-full flex-row items-center justify-between">
        <View className="flex-row gap-3 ">
          <View className="items-center justify-center rounded-lg border border-secondary p-2">
            <Image
              source={images.logoSmall}
              className="h-[25px] w-[25px] rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View>
            <Text className="text-white">{author}</Text>
            <Text className="text-white">{date}</Text>
          </View>
        </View>
        <View>
          <Image source={icons.menu} className="h-3 w-3" resizeMode="contain" />
        </View>
      </View>
      <View className="flex-row items-start gap-3">
        <View className="flex-1 overflow-hidden rounded-2xl border border-secondary">
          <View className="h-[200px] w-full items-center justify-center">
            <Image source={images.profile} className="h-full w-full" resizeMode="cover" />
          </View>
          <View className="w-full bg-black-100 p-5">
            <Text className="mb-1 font-psemibold text-xl text-white">{title}</Text>
            <View className="mt-2 flex-row items-start gap-4">
              <Text className="text-white">{truncateContent(content, 100)}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default CardCourse

const styles = StyleSheet.create({})