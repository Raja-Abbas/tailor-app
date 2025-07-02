import { useSupabase } from "@/hooks/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import tw from "twrnc";

export type Fabric = {
  id: string;
  title: string;
  Image: string;
  description?: string;
  price?: string;
};

export default function Fabrics() {
  const [fabrics, setFabrics] = useState<Fabric[]>([]);
  const supabase: SupabaseClient = useSupabase();
  const router = useRouter();

  useEffect(() => {
    const fetchFabrics = async () => {
      const { data, error } = await supabase.from("Fabric").select("*");
      if (error) console.error("Error fetching fabrics:", error);
      else setFabrics(data as Fabric[]);
    };

    fetchFabrics();
  }, [supabase]);

  return (
    <View style={tw`flex-1 bg-white`}>
      <Text style={tw`text-xl font-bold mx-4 mt-8 mb-4`}>My Fabrics</Text>
      <FlatList
        data={fabrics}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={tw`flex-row flex-wrap justify-center`}
        columnWrapperStyle={tw`justify-center`}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/fabrics/${item.id}`)}
            style={tw`min-w-[135px] bg-white p-4 m-2 rounded-[10px] items-center shadow-sm`}
          >
            <Image
              source={{ uri: item.Image }}
              style={tw`w-[90px] h-[90px] rounded-[10px] mb-2`}
            />
            <View style={tw`flex-1 items-center`}>
              <Text style={tw`text-[16px] font-semibold text-center`}>{item.title}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}