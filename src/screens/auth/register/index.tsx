import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Image, Text, Alert, TouchableOpacity  } from 'react-native';
import FormField from '@/components/FormField/formField';
import { images } from '@/constants';
import ButtonComponent from '@/components/Button/button'
import { useNavigation } from '@react-navigation/native';
import { useMutationHook } from '@/hooks';
import { IRegister } from '@/types';
import { RegisterService } from '@/services/loginRegister';
const RegisterScreens = () => {
  const navigation = useNavigation()
  const [valueRegister, setValueRegister] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleOnchange = (text: string, fieldName: string) => {
    setValueRegister({
      ...valueRegister,
      [fieldName]: text,
    });
  };

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

  // Function to check if password matches confirmPassword
  const passwordsMatch = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword;
  };


  const mutationRegister = useMutationHook(async (data: IRegister) => {
    const res = await RegisterService(data);
    return res;
  });

  const { data: dataRegister, isPending: isLoading, isError,error } = mutationRegister;

  useEffect(() => {
    if(dataRegister?.status === 200) {
      setValueRegister({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
    }
  },[dataRegister])


  const submit = () => {

    if (!valueRegister.name || !valueRegister.email || !valueRegister.password || !valueRegister.confirmPassword) {
      Alert.alert('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    if (!isValidEmail(valueRegister.email)) {
      Alert.alert('Email không hợp lệ');
      return;
    }

    if (!isValidPassword(valueRegister.password)) {
      Alert.alert('Mật khẩu không hợp lệ. Mật khẩu phải có ít nhất 6 ký tự, bao gồm ít nhất một ký tự đặc biệt và một ký tự viết hoa.');
      return;
    }

    if (!passwordsMatch(valueRegister.password, valueRegister.confirmPassword)) {
      Alert.alert('Mật khẩu và xác nhận mật khẩu không khớp.');
      return;
    }
    mutationRegister.mutate(valueRegister);
  };

  const isButtonDisabled = !valueRegister.name ||
  !valueRegister.email ||
  !valueRegister.password ||
  !valueRegister.confirmPassword ||
  !isValidEmail(valueRegister.email) ||
  !isValidPassword(valueRegister.password) ||
  !passwordsMatch(valueRegister.password, valueRegister.confirmPassword);

  return (
    <SafeAreaView style={{ backgroundColor: '#161622', height: '100%' }}>
      <ScrollView>
        <View className="my-6 min-h-[85vh] w-full justify-center px-4">
          <Image source={images.logo} resizeMode="contain" className="h-[84px] w-[130px]" />
          <Text className="text-2xl font-semibold text-white"> Đăng nhập</Text>

          <FormField
            title="Họ và tên"
            value={valueRegister.name}
            name="name"
            handleChangeText={(text) => handleOnchange(text, 'name')}
            otherStyles={`mt-7`}
            keyboardType="name-address"
            placeholder=""
          />

          <FormField
            title="Email"
            value={valueRegister.email}
            name="email"
            handleChangeText={(text) => handleOnchange(text, 'email')}
            otherStyles={`mt-7`}
            keyboardType="email-address"
            placeholder=""
          />

          <FormField
            title="Mật khẩu"
            name="password"
            value={valueRegister.password}
            handleChangeText={(text) => handleOnchange(text, 'password')}
            otherStyles={`mt-7`}
            keyboardType="password-address"
            placeholder=""
          />
          <FormField
            title="Xác nhận mật khẩu"
            name="confirmPassword"
            value={valueRegister.confirmPassword}
            handleChangeText={(text) => handleOnchange(text, 'confirmPassword')}
            otherStyles={`mt-7`}
            keyboardType="confirmPassword-address"
            placeholder=""
          />

              {dataRegister?.status === 'ERR' && (
                <Text className='text-[#aa232a] mt-3 text-base'>
                  {dataRegister?.message}
                </Text>
              )}
              {dataRegister?.status === 200 && (
                <Text className='text-[#3df033] mt-3 text-base'>
                  {dataRegister?.message}
                </Text>
              )}

          <ButtonComponent
            title="Đăng kí"
            handlePress={submit}
            containerStyles={`mt-7`}
            isLoading={isLoading || isButtonDisabled }
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100'>
              Bạn đã có tài khoản ?
            </Text>
            <TouchableOpacity  onPress={() => navigation.navigate('LoginScreens')}>
              <Text className="text-lg font-semibold text-secondary text-[#fff]">Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RegisterScreens