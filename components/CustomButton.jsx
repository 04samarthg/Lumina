import { TouchableOpacity, Text, View } from 'react-native'
import React from 'react'

const CustomButton = ({title, handlepress, containerStyles, textStyles, isLoading})  => {
  return (
    <TouchableOpacity onPress={handlepress} activeOpacity={0.7} disabled={isLoading} className={`bg-secondary rounded-xl min-h-[55px] justify-center ${containerStyles} ${isLoading ? 'opacity-50': ''}`}>
      <Text className={`text-primary text-center font-semibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton
