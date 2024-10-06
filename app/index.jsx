import { ScrollView, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import 'react-native-url-polyfill/auto'
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {

  const {isLoading, isLoggedIn} = useGlobalContext();

  if(!isLoading && isLoggedIn){
    return <Redirect href="/home" />
  }
  
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[95vh] px-4">
          <View className="flex-row justify-center items-center ">
            <Image
              className="w-[70px] h-[47px] my-3"
              resizeMode="contain"
              source={images.logoSmall}
            />
            <Text className="text-3xl font-pbold text-white">
              Lumina
            </Text>
          </View>
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Lumina</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[155px] h-[15px] relative bottom-2 -right-10"
              resizeMode="contain"
            />
  </View>
          <Text className="text-sm font-pregular text-gray-100 mt-3 text-center">
            Where creativity meets innovation: embark on a journey of limitless
            exploration with Lumina
          </Text>
          <CustomButton
            title="Continue with Email"
            handlepress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
