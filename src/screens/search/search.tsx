import { useRoute } from '@react-navigation/native';
import { FlatList, Image, RefreshControl, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images, icons } from '@/constants';
import SearchInput from '@/components/SearchInput/searchInput';
import Trending from '@/components/Trending/trending';
import EmptyState from '@/components/Common/EmptyState/emptyState';
import { GetSearchCourses } from '@/apis/course';
import { useQuery } from '@tanstack/react-query';
import CardCourse from '@/components/Card/card';
import CustomButtonIcon from '@/components/Common/Button/buttonIcon';
import { useNavigation } from '@react-navigation/native';
import { useMutationHook } from '@/hooks';
import { ThemedView } from '@/components/Common/ViewThemed';
import TextThemed from '@/components/Common/TextThemed';
const SearchScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { search } = route.params;
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    refreshsearchCourse.mutate(search);
    setRefreshing(false);
  };
  const refreshsearchCourse = useMutationHook(async (data: string) => {
    try {
      const res = await GetSearchCourses(data);
      return res?.data;
    } catch (e) {
      console.log(e);
    }
  });
  useEffect(() => {
    refreshsearchCourse.mutate(search);
  }, [search]);

  const { data: datasearchCourses, isPending: __isPendingState } = refreshsearchCourse;
  return (
    <ThemedView>
      <FlatList
        // data={[{id: 1}, {id: 2},{id: 3}, {id: 4}]}
        data={datasearchCourses}
        // data={[]}
        keyExtractor={(item) => item?.id}
        renderItem={({ item, index }) => <CardCourse course={item} key={index} />}
        ListHeaderComponent={() => (
          <View className="my-6  mb-[24px] mt-[25px]">
            <View className="mb-6 flex-row items-start justify-between px-4">
              <CustomButtonIcon icon={icons.left} handlePress={() => navigation.goBack()} />
              <View className="mr-3">
                <TextThemed className="text-right font-pmedium text-sm text-gray-100">
                  Từ khóa tìm kiếm
                </TextThemed>
                <TextThemed type='title' className="text-right">"{search}"</TextThemed>
              </View>
            </View>
            <View className="h-[1px] w-full bg-orange-400"></View>

            <View className="my-2">
              <SearchInput initsearch={search} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="Không có khóa học" subTilte="Hiện tại không có khóa học này" />
        )}
      />
    </ThemedView>
  );
};

export default SearchScreen;
