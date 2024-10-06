import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormFeild from "../../components/FormFeild";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { signUp } from "../../lib/appwrite.js"

const SignUp = () => {
  const [form, setForm] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);

  const submit = async () => {
    if(!form.username || !form.email || !form.password){
      Alert.alert('Error' ,"Please fill all the fields")
    }

    setLoading(true)
    try {
      const result = await signUp(form.email, form.password, form.username)

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
            Sign up to Lumina
          </Text>
          <FormFeild
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

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
            title={loading ? "Signing Up..." : "Sign Up"} 
            handlepress={submit}
            containerStyles="mt-7"
            isLoading={loading} 
          />

          <View className="justify-center flex-row pt-5">
            <Text className="text-gray-100  font-pregular">
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              className="ml-1 font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
