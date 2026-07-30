import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const Start = () => {
  return (
    <View className="flex-1 justify-center items-center bg-gray-100 px-4">
      {/* Greeting */}
      <Text className="text-2xl font-bold mb-6">Hello, Welcome Back</Text>

      {/* Image */}
      <Image 
        source={require('../assets/images/living-room.png')} // replace with your image
        resizeMode="contain"
        className="w-full h-64 rounded-xl mb-6"
      />

      {/* Button */}
      <TouchableOpacity className="bg-light-100 py-4 px-6 rounded-2xl mb-6 items-center justify-center w-60">
        <Text className="text-white text-lg font-semibold">
          Living Room
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Start;