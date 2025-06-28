import { useSupabase } from "@/hooks/supabase";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import tw from "twrnc";
import { SupabaseClient } from "@supabase/supabase-js";

type Men = {
    id: string;
    title: string;
    image: string;
};

export default function Men() {
    const [men, setMen] = useState<Men[]>([]);
    const supabase: SupabaseClient = useSupabase();

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
                renderItem={({ item }) => (
                    <View style={tw`flex-row items-center bg-white p-4 mb-4 mx-4 rounded-[10px] shadow-sm`}>
                        <Image
                            source={{ uri: item.image }}
                            style={tw`w-[50px] h-[50px] rounded-full mr-4`}
                        />
                        <View style={tw`flex-1`}>
                            <Text style={tw`text-[16px] font-semibold`}>{item.title}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}
