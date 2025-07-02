import { useSupabase } from "@/hooks/supabase";
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import tw from "twrnc";

export default function KidsDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const supabase = useSupabase();
    const [kid, setKid] = useState(null);

    useEffect(() => {
        const fetchKid = async () => {
            const { data, error } = await supabase.from("Kids").select("*").eq("id", id).single();
            if (error) console.error("Error fetching kid:", error);
            else setKid(data);
        };

        if (id) fetchKid();
    }, [id, supabase]);

    if (!kid) return <Text style={tw`m-4`}>Loading...</Text>;

    return (
        <ScrollView style={tw`flex-1 bg-white`}>
            <Image source={{ uri: kid.image }} style={tw`w-full h-64`} resizeMode="cover" />
            <View style={tw`p-4`}>
                <Text style={tw`text-2xl font-bold mb-2`}>{kid.title}</Text>
                <Text style={tw`text-base text-gray-700 mb-4`}>{kid.description || "No description available."}</Text>
                <Text style={tw`text-base font-semibold mb-2`}>Price: {kid.prices || "N/A"}</Text>
            </View>
        </ScrollView>
    );
} 