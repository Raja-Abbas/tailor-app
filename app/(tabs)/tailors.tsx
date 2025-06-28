import { useSupabase } from "@/hooks/supabase";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import tw from "twrnc";

export default function Tailors() {
  const [tailors, setTailors] = useState([]);
  const supabase = useSupabase();

  useEffect(() => {
    const fetchTailors = async () => {
      let { data: Tailors, error } = await supabase.from("Tailors").select("*");

      if (error) {
        console.error("Error fetching tailors:", error);
      } else {
        console.log("Tailors fetched:", Tailors);
        setTailors(Tailors);
      }
    };

    fetchTailors();
  }, [supabase]);

  

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`flex-row justify-between items-center mx-4 mt-8 mb-4`}>
        <Text style={tw`text-[16px] font-semibold`}>My Tailors</Text>
      </View>
      <FlatList
        data={tailors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={tw`flex-row items-center bg-white p-4 mb-4 mx-4 rounded-[10px] shadow-sm`}
          >
            <Image
              source={{ uri: item.image }}
              style={tw`w-[50px] h-[50px] rounded-full mr-4`}
            />
            <View style={tw`flex-1`}>
              <Text style={tw`text-[16px] font-semibold`}>{item.name}</Text>
              <Text style={tw`text-[14px] text-gray-600`}>
                {item.description}
              </Text>
              <Text style={tw`text-[14px] text-gray-600`}>{item.location}</Text>
              <Text style={tw`text-[14px] text-gray-600`}>
                {item.distance} away
              </Text>
            </View>
            <Text style={tw`text-[14px] font-semibold`}>{item.rating} ★</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
