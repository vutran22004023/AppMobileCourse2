import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: string; // Type string for containerStyles
  textStyles?: string; // Type string for textStyles
  isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  handlePress,
  containerStyles = '', // Provide a default empty string
  textStyles = '', // Provide a default empty string
  isLoading = false, // Provide a default value
}) => {
  return (
    <TouchableOpacity
      className={` rounded-full items-center justify-center bg-orange-400 h-14 ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text className={`text-white font-bold ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
