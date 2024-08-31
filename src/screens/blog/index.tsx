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
import CardBlog from '@/components/Card/cardBlog';
import { blogPosts } from './data';
import useNavigation from '../../hooks/useNavigation';
import TextThemed from '@/components/Common/TextThemed';
import {ThemedView} from '@/components/Common/ViewThemed'
const BlogPage = () => {
  const navigaion = useNavigation();
  const handleCardBlogPress = (item: any) => {
    navigaion.navigate('BlogDetailScreen', {
      blogDetail: item,
    });
  };
  return (
    <ThemedView>
      <ScrollView>
        <FlatList
          // data={[{id: 1}, {id: 2},{id: 3}, {id: 4}]}
          data={blogPosts}
          keyExtractor={(item) => item?.id}
          renderItem={({ item, index }) => (
            <CardBlog blog={item} key={index} onPress={() => handleCardBlogPress(item)} />
          )}
          ListHeaderComponent={() => (
            <View className="my-6 mb-[24px]  mt-[24px] px-4">
              <View className="mb-6 flex-row items-start">
                <View>
                  <TextThemed type="title">Bài viết nổi bật</TextThemed>
                  <TextThemed className='mt-2'>
                    Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ
                    thuật lập trình web.
                  </TextThemed>
                </View>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </ThemedView>
  );
};

export default BlogPage;

const styles = StyleSheet.create({});
