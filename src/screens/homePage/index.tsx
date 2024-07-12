import { FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images}from '@/constants'
import SearchInput from '@/components/SearchInputComponment/searchInput'
import Trending from '@/components/TrendingComponment/trending'
import EmptyState from '@/components/EmptyStateComponment/emptyState'
import {GetAllCourses} from '@/services/course'
import { useQuery } from "@tanstack/react-query";
import CardCourse from '@/components/CardComponment/card'
import { useSelector } from 'react-redux'
import { RootState } from "@/redux/store";
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const HomePages = () => {
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user?.access_Token && !user?.isAdmin && user?.status !== true) {
        navigation.navigate('LoginScreens');
      }
    }, 2000); // 3000 milliseconds = 3 seconds

    // Cleanup the timeout if the component unmounts or user changes
    return () => clearTimeout(timer);
  }, [user, navigation]);
  const onRefresh = async () => {
    setRefreshing(true)
    refreshAllCourse()
    setRefreshing(false)
  }
  const refreshAllCourse = async() => {
    try {
      const res = await GetAllCourses()
      return res?.data
    }catch(e) {
      console.log(e)
    }
  }

  const { data: dataAllCourses, isPending: __isPendingState } = useQuery({
    queryKey: ["dataLUserCouse"],
    queryFn: refreshAllCourse,
  });




  return (
    <SafeAreaView style={{backgroundColor:'#161622'}} className='border-2 border-red-500 flex-1'>
      <FlatList
      // data={[{id: 1}, {id: 2},{id: 3}, {id: 4}]}
      data={dataAllCourses}
      // data={[]}
      keyExtractor={(item) => item?.id}
      renderItem={({item, index},)=> (
        <CardCourse course={item} key={index}/>
      )}
      ListHeaderComponent={() => (
        <View className='my-6 px-4  mt-[24px] mb-[24px]'>
          <View className='justify-between items-start flex-row mb-6'>
            <View>
              <Text className='font-pmedium text-sm text-gray-100'>Wecome Back</Text>
              <Text className='text-2xl font-psemibold text-white'>{user.name}</Text>
            </View>
            <View className='mt-1.5'>
            <Image source={images.logoSmall} className='w-9 h-10' resizeMode='contain'/>
          </View>
          </View>

          <SearchInput/>

          <View className='w-full flex-1 pt-5 pb-8'>
            <Text className='text-gray-100 text-lg font-pregular mb-3 mt-1'>
                
            </Text>
            <Trending posts={[{id: 1},{id: 2},{id: 3},{id: 4}] ?? []}/>
          </View>
        </View>
      )}
      ListEmptyComponent={() => (
        <EmptyState
        title="Không có khóa học"
        subTilte="Hiện tại ko có khóa học này"
        />
      )}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default HomePages

const styles = StyleSheet.create({})