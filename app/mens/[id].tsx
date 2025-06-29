import { useSupabase } from "@/hooks/supabase";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import tw from "twrnc";

export default function MenDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const supabase = useSupabase();
    const [men, setMen] = useState(null);

    useEffect(() => {
        const fetchMen = async () => {
            const { data, error } = await supabase.from("Men").select("*").eq("id", id).single();
            if (error) console.error("Error fetching men:", error);
            else setMen(data);
        };

        if (id) fetchMen();
    }, [id, supabase]);

    if (!men) return <Text style={tw`m-4`}>Loading...</Text>;

    return (
        <ScrollView style={tw`flex-1 bg-white`}>
            <Image source={{ uri: men.image }} style={tw`w-full h-64`} resizeMode="cover" />
            <View style={tw`p-4`}>
                <Text style={tw`text-2xl font-bold mb-2`}>{men.title}</Text>
                <Text style={tw`text-base text-gray-700 mb-4`}>{men.description || "No description available."}</Text>
                <Text style={tw`text-base font-semibold mb-2`}>Price: {men.prices || "N/A"}</Text>
            </View>
        </ScrollView>
    );
} 