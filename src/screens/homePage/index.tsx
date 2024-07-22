import { FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images}from '@/constants'
import SearchInput from '@/components/SearchInput/searchInput'
import Trending from '@/components/Trending/trending'
import EmptyState from '@/components/EmptyState/emptyState'
import {GetAllCourses} from '@/services/course'
import { useQuery } from "@tanstack/react-query";
import CardCourse from '@/components/Card/card'
import { useSelector } from 'react-redux'
import { RootState } from "@/redux/store";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Modal from 'react-native-modal';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import VideoCourse from '@/screens/videoCourse/videoCourse';
const HomePages = () => {
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user?.access_Token && !user?.isAdmin && user?.status !== true) {
        navigation.navigate('LoginScreens');
      }
    }, 3000); // 3000 milliseconds = 3 seconds

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
    queryKey: ["dataCouse"],
    queryFn: refreshAllCourse,
  });

  const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
  
    const onGestureEvent = ({ nativeEvent }:any) => {
      if (nativeEvent.translationY > 100) {
        setModalVisible(false);
      }
    };
  
    const onHandlerStateChange = ({ nativeEvent }: any) => {
      if (nativeEvent.state === State.END && nativeEvent.translationY > 100) {
        setModalVisible(false);
      }
    };


    const handleCardPress = (course: any) => {
      setSelectedCourse(course);
      toggleModal();
    }

  return (
    <SafeAreaView style={{backgroundColor:'#161622'}} className='border-2 border-red-500 flex-1'>
      <FlatList
      // data={[{id: 1}, {id: 2},{id: 3}, {id: 4}]}
      data={dataAllCourses}
      // data={[]}
      keyExtractor={(item) => item?.id}
      renderItem={({item, index}) => (
        <CardCourse course={item} key={index} onPress={() => handleCardPress(item)} />
      )}
      ListHeaderComponent={() => (
        <View className='my-6 px-4  mt-[24px] mb-[24px]'>
          <View className='justify-between items-start flex-row mb-6'>
            <View>
              <Text className='font-pmedium text-sm text-gray-100'>Chào mừng bạn !!</Text>
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

      <Modal
        isVisible={isModalVisible}
        swipeDirection={['down']}
        onSwipeComplete={toggleModal}
        style={{ justifyContent: 'flex-end', margin: 0 }}
        propagateSwipe
      >
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <View style={{ height: '100%'}}>
            {selectedCourse && <VideoCourse course={selectedCourse} />}
          </View>
        </PanGestureHandler>
      </Modal>
    </SafeAreaView>
  )
}

export default HomePages

const styles = StyleSheet.create({})