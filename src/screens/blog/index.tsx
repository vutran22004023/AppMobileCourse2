import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CardBlog from '@/components/Card/cardBlog'
import {blogPosts} from './data';
const BlogPage = () => {
  const handleCardBlogPress = (item: any) => {

  }
  return (
    <SafeAreaView style={{ backgroundColor: '#161622' }} className="flex-1 border-2 border-red-500">
    <ScrollView>
      <FlatList
      // data={[{id: 1}, {id: 2},{id: 3}, {id: 4}]}
      data={blogPosts}
      keyExtractor={(item) => item?.id}
      renderItem={({item, index}) => (
        <CardBlog blog={item} key={index} onPress={() => handleCardBlogPress(item)} />
      )}
      ListHeaderComponent={() => (
        <View className="my-6 mb-[24px]  mt-[24px] px-4">
        <View className="mb-6 flex-row items-start">
          <View>
            <Text className="font-psemibold text-2xl text-white">Bài viết nổi bật</Text>
            <Text className="font-pmedium text-sm text-gray-100">
              Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình web.
            </Text>
          </View>
        </View>
        </View>
      )}
      />
      </ScrollView>
    </SafeAreaView>
  )
}

export default BlogPage

const styles = StyleSheet.create({})