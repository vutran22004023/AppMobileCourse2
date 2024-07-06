import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
const SearchScreen = () => {
const route = useRoute();
    const { search } = route.params;
  return (
    <View>
      <Text className='text-3xl text-white'>{search}</Text>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})