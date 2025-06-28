import { useSupabase } from "@/hooks/supabase";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import tw from "twrnc";
import { SupabaseClient } from "@supabase/supabase-js";

type Women = {
    id: string;
    title: string;
    image: string;
};

export default function Women() {
    const [women, setWomen] = useState<Women[]>([]);
    const supabase: SupabaseClient = useSupabase();

    useEffect(() => {
        const fetchTailors = async () => {
            let { data: Women, error } = await supabase.from("Women").select("*");

            if (error) {
                console.error("Error fetching Women:", error);
            } else {
                console.log("Women fetched:", Women);
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