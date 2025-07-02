import { useSupabase } from "@/hooks/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import tw from "twrnc";

type Kids = {
    id: string;
    title: string;
    image: string;
};

export default function Kids() {
    const [kids, setKids] = useState<Kids[]>([]);
    const supabase: SupabaseClient = useSupabase();
    const router = useRouter();

    useEffect(() => {
        const fetchTailors = async () => {
            let { data: Kids, error } = await supabase.from("Kids").select("*");

            if (error) {
                console.error("Error fetching Kids:", error);
            } else {
                setKids(Kids as Kids[]);
            }
        };

        fetchTailors();
    }, [supabase]);

    return (
        <View style={tw`flex-1 bg-white`}>
            <View style={tw`flex-row justify-between items-center mx-4 mt-8 mb-4`}>
                <Text style={tw`text-[16px] font-semibold`}>Kids Collection</Text>
            </View>
            <FlatList
                data={kids}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={tw`flex-row flex-wrap justify-center`}
                columnWrapperStyle={tw`justify-center`}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => router.push(`/kids/${item.id}`)}
                        style={tw`min-w-[135px] bg-white p-4 m-2 rounded-[10px] items-center shadow-sm`}
                    >
                        <Image
                            source={{ uri: item.image }}
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
