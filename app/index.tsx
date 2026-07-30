import { Link } from "expo-router";
import "./globals.css"
import { Text, View, Image, TouchableOpacity} from "react-native";
import { Assets } from "@react-navigation/elements";
 
export default function Index() {
  return (
   
    <View className="flex-1 items-center justify-center bg-blue-100">
       <Image source = {require('../assets/images/homepage.png')}/>
      <Text className="text-5xl text-center font-bold text-white-100">
        Welcome to Smart Home App
      </Text>
    <Link href="/start" asChild>
    <TouchableOpacity className="bg-light-100 py-4 px-6 rounded-2xl mb-6 items-center justify-center">
  <Text className="text-lg text-white-100 ">
    Get Started
  </Text>
  </TouchableOpacity>
</Link>

    </View>
  );
}