import { View, Text, FlatList, Image, RefreshControl, Alert } from "react-native";
import React, {useEffect, useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getAllPosts, getLatestPosts, searchPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  
  const {query} = useLocalSearchParams();
  const {data:posts, refetch} = useAppwrite(searchPosts)

  const [refreshing, setRefreshing] = useState(false);

  useEffect(()=>{
    refetch()
  }, [query])

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard vedio={item} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100 ">
                  {" "}
                  Search Reults,
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {query}
                </Text>
              </View>
            </View>

            <SearchInput initialQuery={query} />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Be the first to upload a video"
          /> 
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
