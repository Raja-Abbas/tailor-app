import { useSupabase } from "@/hooks/supabase";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import tw from "twrnc";
import { SupabaseClient } from "@supabase/supabase-js";

type Kids = {
    id: string;
    title: string;
    image: string;
};

export default function Kids() {
    const [kids, setKids] = useState<Kids[]>([]);
    const supabase: SupabaseClient = useSupabase();

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
