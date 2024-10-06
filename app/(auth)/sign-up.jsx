import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormFeild from "../../components/FormFeild";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";
import { createUser } from "../../lib/appwrite";

const SignUp = () => {
  const [form, setForm] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);

  // Updated submit function with more logs
  const submit = async () => {
    console.log("Submit function triggered"); // To ensure this function runs
    setLoading(true); // Start loading

    try {
      console.log("Calling createUser with:", form.username, form.email, form.password);
      await createUser(form.username, form.email, form.password); // Pass form data to createUser
      console.log("User created successfully!");
      setLoading(false); // Stop loading after success
    } catch (error) {
      console.log("Error signing up:", error); // Log any errors
      setLoading(false); // Stop loading after error
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
            title={loading ? "Signing Up..." : "Sign Up"} // Dynamic button text
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={loading} // Loading state
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
