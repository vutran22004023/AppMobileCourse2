import { useNavigation as useReactNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation';

// Tạo một hook điều hướng tùy chỉnh
function useNavigation<T extends keyof RootStackParamList>() {
  const navigation = useReactNavigation<StackNavigationProp<RootStackParamList, T>>();
  return navigation;
}

export default useNavigation;