import React,{useEffect, useState} from 'react'
import {icons} from '@/constants'
import { Image, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import useNavigation from '../../hooks/useNavigation';
interface IProps {
    title: string;
    value: string |undefined;
    placeholder: string;
    handleChangeText: (text: string) => void;
    otherStyles?: string;
    [key: string]: any; // Để chấp nhận các thuộc tính khác nếu cần
  }

  const SearchInput: React.FC<any> = ({  ...props }) => {
    const {initsearch} =props
    const navigation = useNavigation();
    const [isFocused, setIsFocused] = useState(false);
    const [query, setQuery] = useState<string>()
    useEffect(() => {
      setQuery(initsearch)
    },[initsearch])
    return (

        <View className={`w-full h-16 px-4 bg-black-100 rounded-2xl flex-row items-center border-2 space-x-4 ${isFocused ? 'border-orange-400' : 'border-black-100'}`}>
          <TextInput
            className='text-base mt-0.5 text-white flex-1 font-pregular'
            value={query}
            placeholder="Tìm kiếm khóa học"
            placeholderTextColor="#7b7b8b"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChangeText={(e) => setQuery(e)}
            {...props}
          />
            <TouchableOpacity onPress={()=> {
              if(query) {
                navigation.navigate('SearchScreen', { search: query });
              }else {
                 Toast.show({
                  type: 'error',
                  text1: 'Vui nhập thông tin tìm kiếm',
              });
              }
            }}>
                <Image source={icons.search} className='w-5 h-5' resizeMode='contain'/>
            </TouchableOpacity>
        </View>
    );
  };
  
  export default SearchInput