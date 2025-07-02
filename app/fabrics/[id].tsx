import { useSupabase } from "@/hooks/supabase";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import tw from "twrnc";

const dummyReviews = [
  { id: 1, user: "Ali", rating: 5, comment: "Very soft and breathable!" },
  { id: 2, user: "Sara", rating: 4, comment: "Good quality for the price." },
  { id: 3, user: "Zain", rating: 4.5, comment: "Color was exactly as shown." },
];

// Match the Fabric type from the list page
interface Fabric {
  id: string;
  title: string;
  Image: string;
  description?: string;
  price?: string;
}

export default function FabricDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const supabase = useSupabase();
  const [fabric, setFabric] = useState<Fabric | null>(null);

  useEffect(() => {
    const fetchFabric = async () => {
      const { data, error } = await supabase.from("Fabric").select("*").eq("id", id).single();
      if (error) console.error("Error fetching fabric:", error);
      else setFabric(data as Fabric);
    };

    if (id) fetchFabric();
  }, [id, supabase]);

  if (!fabric) return <Text style={tw`m-4`}>Loading...</Text>;

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <Image source={{ uri: fabric.Image }} style={tw`w-full h-64`} resizeMode="cover" />
      <View style={tw`p-4`}>
        <Text style={tw`text-2xl font-bold mb-2`}>{fabric.title}</Text>
        <Text style={tw`text-base text-gray-700 mb-4`}>{fabric.description || "No description available."}</Text>
        <Text style={tw`text-base font-semibold mb-2`}>Price: {fabric.price || "N/A"}</Text>

        <Text style={tw`text-xl font-bold mt-6 mb-2`}>Reviews & Ratings</Text>
        {dummyReviews.map((review) => (
          <View key={review.id} style={tw`mb-4 p-3 bg-gray-100 rounded-lg`}>
            <Text style={tw`font-semibold`}>{review.user}</Text>
            <Text style={tw`text-yellow-500`}>{"★".repeat(Math.round(review.rating))}</Text>
            <Text>{review.comment}</Text>
          </View>
        ))}

        <Pressable
          onPress={() => router.push("/checkout/select-address")}
          style={tw`bg-blue-600 mt-6 py-3 rounded-lg`}
        >
          <Text style={tw`text-white text-center font-semibold text-base`}>Buy Now</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
