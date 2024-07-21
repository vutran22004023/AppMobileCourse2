
import { useRoute } from '@react-navigation/native';
import { FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images, icons}from '@/constants'
import SearchInput from '@/components/SearchInput/searchInput'
import Trending from '@/components/Trending/trending'
import EmptyState from '@/components/EmptyState/emptyState'
import {GetSearchCourses} from '@/services/course'
import { useQuery } from "@tanstack/react-query";
import CardCourse from '@/components/Card/card'
import CustomButtonIcon from '@/components/Button/buttonIcon';
import { useNavigation } from '@react-navigation/native';
import { useMutationHook } from '@/hooks';
const SearchScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
const { search } = route.params;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true)
    refreshsearchCourse.mutate(search)
    setRefreshing(false)
  }
  const refreshsearchCourse = useMutationHook(async(data : string) => {
    try {
      const res = await GetSearchCourses(data)
      return res?.data
    }catch(e) {
      console.log(e)
    }
  })
  useEffect(()=> {
    refreshsearchCourse.mutate(search)
  },[search])

  const { data: datasearchCourses, isPending: __isPendingState } = refreshsearchCourse
  return (
    <SafeAreaView style={{backgroundColor:'#161622'}} className='border-2 border-red-500 flex-1'>
      <FlatList
      // data={[{id: 1}, {id: 2},{id: 3}, {id: 4}]}
      data={datasearchCourses}
      // data={[]}
      keyExtractor={(item) => item?.id}
      renderItem={({item, index},)=> (
        <CardCourse course={item} key={index}/>
      )}
      ListHeaderComponent={() => (
        <View className='my-6  mt-[25px] mb-[24px]'>
          <View className='justify-between items-start px-4 flex-row mb-6'>
          <CustomButtonIcon icon={icons.left} handlePress={() => navigation.goBack()}/>
          <View className='mr-3'>
              <Text className='font-pmedium text-sm text-gray-100 text-right'>Từ khóa tìm kiếm</Text>
              <Text className='text-2xl font-psemibold text-white  text-right'>"{search}"</Text>
            </View>
          </View>
          <View className='w-full h-[1px] bg-white'></View>
        
        <View className='my-2'>
        <SearchInput initsearch ={search}/>
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

export default SearchScreen
