import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import ComeBack from '@/components/Common/Comback/comeBack';
import { ThemedView } from '@/components/Common/ViewThemed';
const BlogDetailScreen = () => {
  const route = useRoute();
  const { blogDetail } = route.params as { blogDetail: any }; // Adjust type as needed
  return (
    <ThemedView>
      <ComeBack name="Bài viết" />
    </ThemedView>
  );
};

export default BlogDetailScreen;

const styles = StyleSheet.create({});
