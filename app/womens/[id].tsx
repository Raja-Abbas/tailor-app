import { useSupabase } from "@/hooks/supabase";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import tw from "twrnc";

export default function WomenDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const supabase = useSupabase();
    const [women, setWomen] = useState(null);

    useEffect(() => {
        const fetchWomen = async () => {
            const { data, error } = await supabase.from("Women").select("*").eq("id", id).single();
            if (error) console.error("Error fetching women:", error);
            else setWomen(data);
        };

        if (id) fetchWomen();
    }, [id, supabase]);

    if (!women) return <Text style={tw`m-4`}>Loading...</Text>;

    return (
        <ScrollView style={tw`flex-1 bg-white`}>
            <Image source={{ uri: women.image }} style={tw`w-full h-64`} resizeMode="cover" />
            <View style={tw`p-4`}>
                <Text style={tw`text-2xl font-bold mb-2`}>{women.title}</Text>
                <Text style={tw`text-base text-gray-700 mb-4`}>{women.description || "No description available."}</Text>
                <Text style={tw`text-base font-semibold mb-2`}>Price: {women.prices || "N/A"}</Text>
            </View>
        </ScrollView>
    );
} 