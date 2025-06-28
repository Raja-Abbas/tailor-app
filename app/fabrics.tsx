import { useRouter } from 'expo-router';
import { useSupabase } from "@/hooks/supabase";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import tw from "twrnc";
import { SupabaseClient } from "@supabase/supabase-js";

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
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/fabrics/${item.id}`)}
            style={tw`flex-row items-center bg-white p-4 mb-4 mx-4 rounded-[10px] shadow-sm`}
          >
            <Image
              source={{ uri: item.Image }}
              style={tw`w-[50px] h-[50px] rounded-full mr-4`}
            />
            <Text style={tw`text-[16px] font-semibold`}>{item.title}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}