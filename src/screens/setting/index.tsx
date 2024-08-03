import { FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View,ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButtonIcon from '@/components/Button/buttonIcon'
import { useNavigation } from '@react-navigation/native'
import { icons } from '@/constants'
import ComeBack from '@/components/Comback/comeBack'
import ModalComponent from '@/components/Modal/modal'
import FormField from '@/components/FormField/formField'
import ButtonComponent from '@/components/Button/button'
const Setting = () => {
    const navigation =  useNavigation()
    const [isModalVisible, setModalVisible] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const submit =() => {

    }
  return (
    <View style={{backgroundColor:'#161622'}} className=' my-5 flex-1'>
        <ComeBack name="Cài đặt"/>
        <ScrollView className='my-3'>
            <View className='my-1 mx-2'>
                <View>
                    <Text className='text-white text-2xl font-pmedium'>Thông tin cá nhân</Text>
                    <Text className='text-white text-sm '>Quản lý thông tin của bạn</Text>
                </View>

                <View className='mt-4 mx-2 p-2 bg-black-100 rounded-md mb-3'>
                    <View className='mb-4'>
                        <Text className='text-white text-xl font-pmedium'>Thông tin cơ bản</Text>
                        <Text className='text-white text-sm '>Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn</Text>
                    </View>
                    
                    <View>
                        <TouchableOpacity className='p-3 px-4 justify-between flex-row items-center w-full bg-slate-600 rounded-md mb-2'
                        activeOpacity={0.7}
                        onPress={toggleModal}
                        >
                            <View>
                                <Text className='text-white text-xl'>Họ và tên</Text>
                                <Text className='text-white'>Trần Lê Vũ</Text>
                            </View>
                            <View>
                                <Image source={icons.rightArrow} style={{tintColor: 'fff'}} className='w-5 h-'/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className='p-3 px-4 justify-between flex-row items-center w-full bg-slate-600 rounded-md mb-2'
                        activeOpacity={0.7}
                        >
                            <View>
                                <Text className='text-white text-xl'>Tên người dùng</Text>
                                <Text className='text-white'>nhattandn204</Text>
                            </View>
                            <View>
                                <Image source={icons.rightArrow} style={{tintColor: 'fff'}} className='w-5 h-'/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className='p-3 px-4 justify-between flex-row items-center w-full bg-slate-600 rounded-md mb-2'
                        activeOpacity={0.7}
                        >
                            <View>
                                <Text className='text-white text-xl'>Giới thiệu</Text>
                                <Text className='text-white'>Chưa cập nhập</Text>
                            </View>
                            <View>
                                <Image source={icons.rightArrow} style={{tintColor: 'fff'}} className='w-5 h-'/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className='mt-4 mx-2 p-5 bg-black-100 rounded-md mb-3'>
                    <View className='mb-4'>
                        <Text className='text-white text-xl font-pmedium'>Thông tin mạng xã hội</Text>
                        <Text className='text-white text-sm '>Quản lý liên kết tới các trang mạng xã hội của bạn</Text>
                    </View>
                    
                    <View>
                        <TouchableOpacity className='p-3 px-4 justify-between flex-row items-center w-full bg-slate-600 rounded-md mb-2'
                        activeOpacity={0.7}
                        >
                            <View>
                                <Text className='text-white text-xl'>GitHub</Text>
                                <Text className='text-white'>Trần Lê Vũ</Text>
                            </View>
                            <View>
                                <Image source={icons.rightArrow} style={{tintColor: 'fff'}} className='w-5 h-'/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className='p-3 px-4 justify-between flex-row items-center w-full bg-slate-600 rounded-md mb-2'
                        activeOpacity={0.7}
                        >
                            <View>
                                <Text className='text-white text-xl'>Họ và tên</Text>
                                <Text className='text-white'>Trần Lê Vũ</Text>
                            </View>
                            <View>
                                <Image source={icons.rightArrow} style={{tintColor: 'fff'}} className='w-5 h-'/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity className='p-3 px-4 justify-between flex-row items-center w-full bg-slate-600 rounded-md mb-2'
                        activeOpacity={0.7}
                        >
                            <View>
                                <Text className='text-white text-xl'>Họ và tên</Text>
                                <Text className='text-white'>Trần Lê Vũ</Text>
                            </View>
                            <View>
                                <Image source={icons.rightArrow} style={{tintColor: 'fff'}} className='w-5 h-'/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
        {/* Modal */}
        <ModalComponent isVisible={isModalVisible} onClose={toggleModal} 
        title="Cập nhật tên của bạn"
        titleSmail= "Tên sẽ được hiển thị trên trang cá nhân, trong các bình luận và bài viết của bạn">
        <FormField
            title="Email"
            // value={valueLogin.email}
            name="email"
            // handleChangeText={(text) => handleOnchange(text, 'email')}
            otherStyles={`mb-3`}
            keyboardType="email-address"
            placeholder=""
          />
          <FormField
            title="Email"
            // value={valueLogin.email}
            name="email"
            // handleChangeText={(text) => handleOnchange(text, 'email')}
            otherStyles={`mb-2`}
            keyboardType="email-address"
            placeholder=""
          />
          <View>
          <ButtonComponent
            title="Submit"
            handlePress={submit}
            containerStyles={`mt-2`}
            // isLoading={isLoading || isButtonDisabled}
          />
          </View>
      </ModalComponent>
    </View>
  )
}

export default Setting
