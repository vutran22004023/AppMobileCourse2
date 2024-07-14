import { useRoute } from '@react-navigation/native';
import { FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images, icons } from '@/constants';
import EmptyState from '@/components/EmptyStateComponment/emptyState';
import { useQuery } from '@tanstack/react-query';
import CardCourse from '@/components/CardComponment/card';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import WebViewPlayer from '@/components/YoutubeComponment/youtube';
import Accordion from '@/components/accordionComponment/accordion';
import { ScrollView } from 'react-native-gesture-handler';
import CircularProgress from '@/components/CircularProgressComponment/circularProgress';
import {formatDate} from '@/libs/utils'
interface VideoModalComponentProps {
  isVisible: boolean;
  onClose: () => void;

}
const VideoCourse = ({course}:any) => {
  const timeVideo = useSelector((state: RootState) => state.timesVideo);
  console.log(timeVideo)
  const user = useSelector((state: RootState) => state.user);
  return (
    <SafeAreaView
      style={{ backgroundColor: '#161622', flex: 1 }}
      className="flex-1 border-2 border-red-500">
      <FlatList
        // data={[{id: 1}, {id: 2},{id: 3}, {id: 4}]}
        // data={datasearchCourses}
        data={[]}
        keyExtractor={(item) => item?.id}
        renderItem={({ item, index }) => <CardCourse course={item} key={index} />}
        ListHeaderComponent={() => (
          <View className="my-6 mb-[24px] mt-[25px] ">
              <WebViewPlayer src="https://www.youtube.com/embed/2Qx4SEYeVj8" />
            <View className='flex-row justify-between mx-1'>
              <View className=' my-4 mx-2 w-[80%]'>
                <Text className='text-xl font-extrabold text-white font-pmedium'>{course?.name}</Text>
                <View className='mt-2 flex-row gap-3'>
                <Text className='text-ml font-normal text-white font-pmedium '>{course?.view} lượt xem</Text>
                <Text className='text-ml font-normal text-white font-pmedium '>Cập nhập: {formatDate(course?.updatedAt)}</Text>
                </View>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%' }}>
                <CircularProgress 
                  size={45}
                  width={5}
                  fill={11}
                  tintColor="blue"
                  backgroundColor="#e0e0e0"
                />
                <Text className='text-sm text-white mt-1'>2/19 bài học</Text>
              </View>
            </View>
            <View className='flex-row justify-between my-5 mx-3'>
              <View></View>
              <View className='flex-row justify-center items-center gap-10'>
                <TouchableOpacity activeOpacity={0.7} className='justify-center items-center'>
                  <Image source={icons.blog} className='w-9 h-10' resizeMode='contain' style={{ tintColor: '#fff' }}/>
                  <Text className='text-sm text-white mt-1'>Thêm ghi chú</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} className='justify-center items-center'>
                  <Image source={icons.blogme} className='w-10 h-10' resizeMode='contain' style={{ tintColor: '#fff' }}/>
                  <Text className='text-sm text-white mt-1'>Chú thích</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} className='justify-center items-center'>
                  <Image source={icons.bookmark} className='w-9 h-9' resizeMode='contain' style={{ tintColor: '#fff' }}/>
                  <Text className='text-sm text-white mt-1'>Hướng dẫn</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <SafeAreaView>
                <ScrollView>
                  <Accordion title="Chương 1">
                    <TouchableOpacity className='bg-gray-700 py-3 mb-2 ' activeOpacity={0.7}>
                      <Text className='text-white font-medium text-xl'>ádasdsadas</Text>
                      <Text className='text-white font-medium text-xl'>03:33</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='bg-gray-700 py-2 mb-2' activeOpacity={0.7}>
                    <Text className='text-white font-medium text-xl'>ádasdsadas</Text>
                    <Text className='text-white font-medium text-xl'>03:33</Text>
                    </TouchableOpacity>
                  </Accordion>
                  <Accordion title="Chương 1">
                    <TouchableOpacity className='bg-gray-700 py-3 mb-2 ' activeOpacity={0.7}>
                    <Text className='text-white font-medium text-xl'>ádasdsadas</Text>
                    <Text className='text-white font-medium text-xl'>03:33</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='bg-gray-700 py-2 mb-2' activeOpacity={0.7}>
                    <Text className='text-white font-medium text-xl'>ádasdsadas</Text>
                    <Text className='text-white font-medium text-xl'>03:33</Text>
                    </TouchableOpacity>
                  </Accordion>
                </ScrollView>
              </SafeAreaView>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="Không có chương khóa học" subTilte="Hiện tại khóa học này chưa có chương" />
        )}
      />
      <View className='absolute bottom-0 left-0 right-0 h-[60px] bg-primary items-center justify-around border-t-2 border-[#434343] flex-row'>
          <TouchableOpacity className='justify-center items-center flex-row gap-2'>
            <Image source={icons.leftArrow} className='w-4 h-4' resizeMode='contain' style={{ tintColor: '#fff' }}/>
            <Text className='text-[16px] text-white'>BÀI TRƯỚC</Text>
          </TouchableOpacity>
          <TouchableOpacity className='justify-center items-center flex-row gap-2'>
            <Text className='text-[16px] text-white'>BÀI TIẾP THEO</Text>
            <Image source={icons.rightArrow} className='w-4 h-4' resizeMode='contain' style={{ tintColor: '#fff' }}/>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VideoCourse;


