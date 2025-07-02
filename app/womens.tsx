import { useSupabase } from "@/hooks/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import tw from "twrnc";

type Women = {
    id: string;
    title: string;
    image: string;
};

export default function Women() {
    const [women, setWomen] = useState<Women[]>([]);
    const supabase: SupabaseClient = useSupabase();
    const router = useRouter();

    useEffect(() => {
        const fetchTailors = async () => {
            let { data: Women, error } = await supabase.from("Women").select("*");

            if (error) {
                console.error("Error fetching Women:", error);
            } else {
                setWomen(Women as Women[]);
            }
        };

        fetchTailors();
    }, [supabase]);

    return (
        <View style={tw`flex-1 bg-white`}>
            <View style={tw`flex-row justify-between items-center mx-4 mt-8 mb-4`}>
                <Text style={tw`text-[16px] font-semibold`}>Women Collection</Text>
            </View>
            <FlatList
                data={women}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={tw`flex-row flex-wrap justify-center`}
                columnWrapperStyle={tw`justify-center`}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => router.push(`/womens/${item.id}`)}
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