import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images, icons } from '@/constants';
import InfoBox from '@/components/Common/InforBox/InfoBox';
import Trending from '@/components/Trending/trending';
import EmptyState from '@/components/Common/EmptyState/emptyState';
import { GetAllCourses } from '@/apis/course';
import { useQuery } from '@tanstack/react-query';
import CardCourse from '@/components/Card/card';
import CustomButton from '@/components/Common/Button/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
// import { useNavigation } from '@react-navigation/native'
import { resetUser } from '@/redux/Slide/userSlide';
import { useDispatch } from 'react-redux';
import { removeToken } from '@/Utils/tokenUtils';
import useNavigation from '../../hooks/useNavigation';
import {ThemedView} from '@/components/Common/ViewThemed'
import TextThemed from '@/components/Common/TextThemed';
import { useThemeColor } from '@/hooks/useThemeColor';

const BG_LIGHT= "bg-[#f3f3f3]";
const BG_DARK="bg-black-200"
const ProfilePage = () => {
  const bg = useThemeColor({ light: BG_LIGHT , dark: BG_DARK }, 'background');
  const tinsIcon = useThemeColor({ light: '' , dark: '' }, 'tint');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const onRefresh = async () => {
    setRefreshing(true);
    refreshAllCourse();
    setRefreshing(false);
  };
  const refreshAllCourse = async () => {
    try {
      const res = await GetAllCourses();
      return res?.data;
    } catch (e) {
      console.log(e);
    }
  };

  const { data: dataAllCourses, isPending: __isPendingState } = useQuery({
    queryKey: ['dataLUserCouse'],
    queryFn: refreshAllCourse,
  });

  const hanleLogout = () => {
    dispatch(resetUser());
    navigation.navigate('LoginScreens');
  };

  const handleUser = () => {};

  const handleOpenProfile = () => {
    setIsOpen(false);
  };

  const handleOpenCourseMe = () => {
    setIsOpen(true);
  };

  return (
    <ThemedView>
      <FlatList
        data={[]}
        keyExtractor={(item) => item?.id}
        renderItem={({ item, index }) => <CardCourse course={item} key={index} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-1">
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
                  className={`w-[50%] items-center justify-center rounded-md pb-4 pt-4 ${isOpen === false ? 'bg-secondary' : bg}`}
                  activeOpacity={0.7}
                  onPress={handleOpenProfile}>
                  <TextThemed >Profile</TextThemed>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`w-[50%] items-center justify-center rounded-md  pb-4 pt-4 ${isOpen === true ? 'bg-secondary' : bg}`}
                  activeOpacity={0.7}
                  onPress={handleOpenCourseMe}>
                  <TextThemed >Khóa học của tôi</TextThemed>
                </TouchableOpacity>
              </View>

              {isOpen === false ? (
                <View className=" w-full">
                  <TouchableOpacity
                    className={`mb-3 w-full items-center justify-center rounded-lg  ${bg} pb-4 pt-4`}
                    activeOpacity={0.7}>
                    <Image
                      source={icons.blogwrite}
                      className="absolute left-6 h-7 w-7"
                      style={{ tintColor: tinsIcon }}
                    />
                    <TextThemed >Viết blog</TextThemed>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`mb-3 w-full items-center justify-center rounded-lg  ${bg} pb-4 pt-4`}
                    activeOpacity={0.7}>
                    <Image
                      source={icons.blogsave}
                      className="absolute left-6 h-7 w-7"
                      style={{ tintColor: tinsIcon }}
                    />
                    <TextThemed>Bài viết đã lưu</TextThemed>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`mb-3 w-full items-center justify-center rounded-lg  ${bg} pb-4 pt-4`}
                    activeOpacity={0.7}>
                    <Image
                      source={icons.blogme}
                      className="absolute left-6 h-7 w-7"
                      style={{ tintColor: tinsIcon }}
                    />
                    <TextThemed >Khóa học của tôi</TextThemed>
                  </TouchableOpacity>
                  <View className="mt-4">
                    <TouchableOpacity
                      className={`mb-3 w-full items-center justify-center rounded-lg  ${bg} pb-4 pt-4`}
                      activeOpacity={0.7}>
                      <Image
                        source={icons.filekey}
                        className="absolute left-6 h-7 w-7"
                        style={{ tintColor: tinsIcon }}
                      />
                      <TextThemed >Thông tin trang web</TextThemed>
                    </TouchableOpacity>
                    <TouchableOpacity
                      className={`mb-3 w-full items-center justify-center rounded-lg  ${bg} pb-4 pt-4`}
                      activeOpacity={0.7}
                      onPress={() => navigation.navigate('SettingScreen')}>
                      <Image
                        source={icons.setting}
                        className="absolute left-6 h-7 w-7"
                        style={{ tintColor: tinsIcon }}
                      />
                      <TextThemed >Cài đặt</TextThemed>
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
    </ThemedView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({});
