import { useRoute } from '@react-navigation/native';
import { FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images, icons}from '@/constants'
import SearchInput from '@/components/SearchInputComponment/searchInput'
import Trending from '@/components/TrendingComponment/trending'
import EmptyState from '@/components/EmptyStateComponment/emptyState'
import {GetSearchCourses} from '@/services/course'
import { useQuery } from "@tanstack/react-query";
import CardCourse from '@/components/CardComponment/card'
import CustomButtonIcon from '@/components/buttonComponment/buttonIcon';
import { useNavigation } from '@react-navigation/native';
import { useMutationHook } from '@/hooks';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import VideoComponent from '@/components/YoutubeComponment/youtube'
interface VideoModalComponentProps {
    isVisible: boolean;
    onClose: () => void;
  }
const VideoCourse  = () => {
    const navigation = useNavigation()
    
  return (
    <SafeAreaView style={{backgroundColor:'#161622', flex: 1}} className='border-2 border-red-500 flex-1'>
    <FlatList
    // data={[{id: 1}, {id: 2},{id: 3}, {id: 4}]}
    // data={datasearchCourses}
    data={[]}
    keyExtractor={(item) => item?.id}
    renderItem={({item, index},)=> (
      <CardCourse course={item} key={index}/>
    )}
    ListHeaderComponent={() => (
      <View className='my-6 px-4 mt-[25px] mb-[24px]'>
        <View>
            <VideoComponent/>
        </View>
      
      </View>
    )}
    ListEmptyComponent={() => (
      <EmptyState
      title="Không có khóa học"
      subTilte="Hiện tại không có khóa học này"
      />
    )}
    />
  </SafeAreaView>
  )
}

export default VideoCourse

const styles = StyleSheet.create({})