import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import ComeBack from '@/components/Common/Comback/comeBack';
const BlogDetailScreen = () => {
    const route = useRoute();
    const { blogDetail } = route.params as { blogDetail: any }; // Adjust type as needed
  return (
    <View style={{backgroundColor:'#161622'}} className=' my-5 flex-1'>
    <ComeBack name="Bài viết"/>
    </View>
  )
}

export default BlogDetailScreen

const styles = StyleSheet.create({})