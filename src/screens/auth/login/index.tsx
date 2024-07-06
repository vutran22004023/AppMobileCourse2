import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Image, Text, Alert, TouchableOpacity } from 'react-native';
import FormField from '@/components/formFieldComponment/formField';
import { images } from '@/constants';
import ButtonComponent from '@/components/buttonComponment/button';
import { useNavigation } from '@react-navigation/native';
import {LoginService} from '@/services/loginRegister'
import { useMutationHook } from '@/hooks';
import { ILogin } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreens = () => {
  const navigation = useNavigation();
  const [valueLogin, setValueLogin] = useState({
    email: '',
    password: '',
  });

  const saveToken = async (token: string) => {
    try {
      await AsyncStorage.setItem('accessToken', token);
    } catch (error) {
      console.error('Error saving token', error);
    }
  };

  const handleOnchange = (text: string, fieldName: string) => {
    setValueLogin({
      ...valueLogin,
      [fieldName]: text,
    });
  };

  const mutationLogin = useMutationHook(async (data: ILogin) => {
    const res = await LoginService(data);
    return res;
  });

   // Function to check if the input is a valid email format
   const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Function to check if password meets the criteria
  const isValidPassword = (password: string): boolean => {
    // Password must be at least 6 characters, contain special character, and have at least one uppercase letter
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password);
  };

  const { data: dataLogin, isPending: isLoading, isError,error } = mutationLogin;

  useEffect(() => {
    if(dataLogin?.status === 200) {
      saveToken(dataLogin.access_Token);
    }
  },[dataLogin])
  const submit = () => {
    if ( !valueLogin.email || !valueLogin.password ) {
      Alert.alert('Vui lòng nhập đầy đủ thông tin.');
      return;
    }
    mutationLogin.mutate(valueLogin);
  };

  const isButtonDisabled = !valueLogin.email || !valueLogin.password
  return (
    <SafeAreaView style={{ backgroundColor: '#161622', height: '100%' }}>
      <ScrollView>
        <View className="my-6 min-h-[85vh] w-full justify-center px-4">
          <Image source={images.logo} resizeMode="contain" className="h-[84px] w-[130px]" />
          <Text className="text-2xl font-semibold text-white"> Đăng nhập</Text>

          <FormField
            title="Email"
            value={valueLogin.email}
            name="email"
            handleChangeText={(text) => handleOnchange(text, 'email')}
            otherStyles={`mt-7`}
            keyboardType="email-address"
            placeholder=""
          />

          <FormField
            title="Mật khẩu"
            name="password"
            value={valueLogin.password}
            handleChangeText={(text) => handleOnchange(text, 'password')}
            otherStyles={`mt-7`}
            keyboardType="default"
            placeholder=""
          />
                    {dataLogin?.status === 'ERR' && (
            <Text className='text-[#aa232a] mt-3 text-base'>
              {dataLogin?.message}
            </Text>
          )}
          {dataLogin?.status === 200 && (
            <Text className='text-[#3df033] mt-3 text-base'>
              {dataLogin?.message}
            </Text>
          )}

          <ButtonComponent
            title="Đăng nhập"
            handlePress={submit}
            containerStyles={`mt-7`}
            isLoading={isLoading || isButtonDisabled}
          />

          <View className="flex-row justify-center gap-2 pt-5">
            <Text className="text-lg text-gray-100">Bạn chưa có tài khoản ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreens')}>
              <Text className="text-lg font-semibold text-secondary text-[#fff]">Đăng kí</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreens;
