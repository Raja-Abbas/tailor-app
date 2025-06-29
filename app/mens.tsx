import { useSupabase } from "@/hooks/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import tw from "twrnc";

type Men = {
    id: string;
    title: string;
    image: string;
};

export default function Men() {
    const [men, setMen] = useState<Men[]>([]);
    const supabase: SupabaseClient = useSupabase();
    const router = useRouter();

    useEffect(() => {
        const fetchTailors = async () => {
            let { data: Men, error } = await supabase.from("Men").select("*");

            if (error) {
                console.error("Error fetching Men:", error);
            } else {
                setMen(Men as Men[]);
            }
        };

        fetchTailors();
    }, [supabase]);

    return (
        <View style={tw`flex-1 bg-white`}>
            <View style={tw`flex-row justify-between items-center mx-4 mt-8 mb-4`}>
                <Text style={tw`text-[16px] font-semibold`}>Men Collection</Text>
            </View>
            <FlatList
                data={men}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={tw`flex-row flex-wrap`}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => router.push(`/mens/${item.id}`)}
                        style={tw`flex-col items-center bg-white p-4 mb-4 mx-4 shadow-sm`}
                    >
                        <Image
                            source={{ uri: item.image }}
                            style={tw`w-[50px] h-[50px]`}
                        />
                        <View style={tw`flex-1`}>
                            <Text style={tw`text-[16px] font-semibold`}>{item.title}</Text>
                        </View>
                    </Pressable>
                )}
            />
        </View>
    );
}
