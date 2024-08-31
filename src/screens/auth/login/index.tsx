import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Image, Text, Alert, TouchableOpacity } from 'react-native';
import FormField from '@/components/Common/FormField/formField';
import { images } from '@/constants';
import ButtonComponent from '@/components/Common/Button/button';
import { LoginService } from '@/apis/loginRegister';
import { useMutationHook } from '@/hooks';
import { ILogin } from '@/types';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '@/redux/Slide/userSlide';
import { store, persistor, AppDispatch, RootState } from '@/redux/store';
import { initializeUser } from '@/contexts/private';
import TextThemed from '@/components/Common/TextThemed';
import useNavigation from '@/hooks/useNavigation';
import { ThemedView } from '@/components/Common/ViewThemed';
type DataLogin = {
  status?: any;
  access_Token?: string;
  message?: string;
  id?: string;
};
const LoginScreens = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();
  const [valueLogin, setValueLogin] = useState({
    email: '',
    password: '',
  });

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

  const { data: dataLogin, isPending: isLoading, isError, error } = mutationLogin;

  useEffect(() => {
    const login = async () => {
      if (dataLogin?.status === 200) {
        setValueLogin({
          email: '',
          password: '',
        });
        dispatch(
          updateUser({
            _id: (dataLogin as DataLogin).id,
            access_Token: (dataLogin as DataLogin).access_Token,
          })
        );
        await initializeUser(dispatch, navigation);
      }
    };
    login();
  }, [dataLogin]);

  useEffect(() => {
    const checkAuth = async () => {
      await initializeUser(dispatch, navigation);
    };
    checkAuth();
  }, [dispatch, navigation]);
  const submit = () => {
    if (!valueLogin.email || !valueLogin.password) {
      Alert.alert('Vui lòng nhập đầy đủ thông tin.');
      return;
    }
    mutationLogin.mutate(valueLogin);
  };

  // const isButtonDisabled = !valueLogin.email || !valueLogin.password
  return (
    <ThemedView>
      <ScrollView>
        <View className="my-6 min-h-[85vh] w-full justify-center px-4">
          <Image source={images.logo} resizeMode="contain" className="h-[84px] w-[130px]" />
          <TextThemed type="title"> Đăng nhập</TextThemed>

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

          <ButtonComponent
            title="Đăng nhập"
            handlePress={submit}
            containerStyles={`mt-7`}
            isLoading={isLoading}
          />

          <View className="flex-row justify-center gap-2 pt-5">
            <TextThemed type="subtitle">Bạn chưa có tài khoản ?</TextThemed>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreens')}>
              <Text className="text-secondary text-lg font-bold font-pregular">
                Đăng kí
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default LoginScreens;
