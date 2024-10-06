import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormFeild = ({
  title,
  value,
  otherStyles,
  placeholder,
  handleChangeText,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-sm text-gray-100 font-pmedium">{title}</Text>

      <View className="border-2 border-black-200 flex-row w-full h-14 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          placeholderTxtColor="#7b7b8b"
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={()=> setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye:icons.eyeHide} className="w-6 h-6" resizeMode="contain" />
          </TouchableOpacity> 
        )}
      </View>
    </View>
  );
};

export default FormFeild;
