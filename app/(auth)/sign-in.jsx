import { View, Text, Alert, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormFeild from "../../components/FormFeild";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { signIn } from "../../lib/appwrite";

const SignIn = () => {
  
  const [form, setForm] = React.useState({ email: "", password: "" });
  const [loading, setLoading] = React.useState(false);

  const submit = async () => {
    if(!form.email || !form.password){
      Alert.alert('Error' ,"Please fill all the fields")
    }

    setLoading(true)
    try {
      await signIn(form.email, form.password)

      router.replace('/home')

    } catch (error) {
      Alert.alert('Error', error.message)      
    } finally{
      setLoading(false)
    }

  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[94vh] px-4 my-6">
          <View className="flex-row  items-center ">
            <Image
              className="w-[70px] h-[47px] my-3"
              resizeMode="contain"
              source={images.logoSmall}
            />
            <Text className="text-3xl font-pbold text-white">Lumina</Text>
          </View>
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Log in to Lumina
          </Text>
          <FormFeild
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormFeild
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Log in"
            handlepress={submit}
            containerStyles="mt-7"
            isLoading={loading}
          />

          <View className="justify-center flex-row pt-5">
            <Text className="text-gray-100  font-pregular">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className="ml-1 font-psemibold text-secondary">Sign Up</Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
