import { FlatList, Image, RefreshControl, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images, icons}from '@/constants'
import InfoBox from '@/components/InforBox/InfoBox'
import Trending from '@/components/Trending/trending'
import EmptyState from '@/components/EmptyState/emptyState'
import {GetAllCourses} from '@/services/course'
import { useQuery } from "@tanstack/react-query";
import CardCourse from '@/components/Card/card'
import CustomButton from '@/components/Button/button'
import { useSelector } from 'react-redux'
import { RootState } from "@/redux/store";
import { useNavigation } from '@react-navigation/native'
const ProfilePage = () => {
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const user = useSelector((state: RootState) => state.user);
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

  const hanleLogout = () => {

  }

  const handleUser =() => {

  }

  const handleOpenProfile =() => {
    setIsOpen(false)
  }

  const handleOpenCourseMe =() => {
    setIsOpen(true)
  }


  return (
    <SafeAreaView style={{ backgroundColor: '#161622' }} className="flex-1 border-2 border-red-500">
      <FlatList
        data={[]}
        keyExtractor={(item) => item?.id}
        renderItem={({ item, index }) => <CardCourse course={item} key={index} />}
        ListHeaderComponent={() => (
          <View className="my-6 mb-[24px]  mt-[24px] px-4">
            <View className="mb-6 flex-row items-start justify-between">
              <View></View>
              <View className="mt-1.5">
                <TouchableOpacity onPress={hanleLogout}>
                  <Image source={icons.logout} className="h-10 w-9" resizeMode="contain" />
                </TouchableOpacity>
              </View>
            </View>
            <View className="w-full items-center justify-center">
              <View className="h-16 w-16 items-center justify-center rounded-lg border border-secondary">
                <Image
                  source={images.logoSmall}
                  className="h-[90%] w-[90%] rounded-lg"
                  resizeMode="cover"
                />
              </View>
              <InfoBox title={user.name} containerStyles="mt-5" titleStyles="text-lg" />
              <View className=" flex-row gap-6">
                <InfoBox
                  title="132312"
                  subtitle="Bài đăng"
                  containerStyles="mt-1"
                  titleStyles="text-lg"
                />
                <InfoBox
                  title="123123"
                  subtitle="Khóa học"
                  containerStyles="mt-1"
                  titleStyles="text-lg"
                />
              </View>

              <View className="mx-1 mb-5 mt-5 flex-row gap-2">
                <TouchableOpacity
                  className={`w-[50%] items-center justify-center rounded-md pb-4 pt-4 ${isOpen === false ? 'bg-secondary' : 'bg-black-200'}`}
                  activeOpacity={0.7}
                  onPress={handleOpenProfile}>
                  <Text className="text-white">Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`w-[50%] items-center justify-center rounded-md  pb-4 pt-4 ${isOpen === true ? 'bg-secondary' : 'bg-black-200'}`}
                  activeOpacity={0.7}
                  onPress={handleOpenCourseMe}>
                  <Text className="text-white">Khóa học của tôi</Text>
                </TouchableOpacity>
              </View>

              {isOpen === false ? (
                <View className=" w-full">
                  <TouchableOpacity
                    className={`mb-3 w-full items-center justify-center rounded-lg  bg-black-200 pb-4 pt-4`} 
                    activeOpacity={0.7}>
                    <Image source={icons.blogwrite} className='w-7 h-7 absolute left-6' style={{tintColor: '#fff'}}/>
                    <Text className="text-white">Viết blog</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`mb-3 w-full items-center justify-center rounded-lg  bg-black-200 pb-4 pt-4`}
                    activeOpacity={0.7}>
                      <Image source={icons.blogsave} className='w-7 h-7 absolute left-6' style={{tintColor: '#fff'}}/>
                    <Text className="text-white">Bài viết đã lưu</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`mb-3 w-full items-center justify-center rounded-lg  bg-black-200 pb-4 pt-4`}
                    activeOpacity={0.7}>
                      <Image source={icons.blogme} className='w-7 h-7 absolute left-6' style={{tintColor: '#fff'}}/>
                    <Text className="text-white">Khóa học của tôi</Text>
                  </TouchableOpacity>
                  <View className="mt-4">
                    <TouchableOpacity
                      className={`mb-3 w-full items-center justify-center rounded-lg  bg-black-200 pb-4 pt-4`}
                      activeOpacity={0.7}>
                        <Image source={icons.filekey} className='w-7 h-7 absolute left-6' style={{tintColor: '#fff'}}/>
                      <Text className="text-white">Thông tin trang web</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className={`mb-3 w-full items-center justify-center rounded-lg  bg-black-200 pb-4 pt-4`}
                      activeOpacity={0.7}
                      onPress={()=>  navigation.navigate('SettingScreen')}
                      >
                        <Image source={icons.setting} className='w-7 h-7 absolute left-6' style={{tintColor: '#fff'}}/>
                      <Text className="text-white">Cài đặt</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : isOpen === true ? (
                <View className="w-full">
                  <FlatList
                    data={dataAllCourses}
                    keyExtractor={(item) => item?.id}
                    renderItem={({ item, index }) => <CardCourse course={item} key={index} />}
                    ListEmptyComponent={() => (
                      <EmptyState
                        title="Không có khóa học"
                        subTilte="Hiện tại bạn chưa học khóa học nào"
                      />
                    )}
                  />
                </View>
              ) : (
                ''
              )}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

export default ProfilePage

const styles = StyleSheet.create({})