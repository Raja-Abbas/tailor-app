import { useSupabase } from "@/hooks/supabase";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import tw from "twrnc";
import { SupabaseClient } from "@supabase/supabase-js";

type Fabrics = {
    id: string;
    title: string;
    Image: string;
};

export default function Fabrics() {
    const [fabrics, setFabrics] = useState<Fabrics[]>([]);
    const supabase: SupabaseClient = useSupabase();

    useEffect(() => {
        const fetchTailors = async () => {
            let { data: Fabrics, error } = await supabase.from("Fabric").select("*");

            if (error) {
                console.error("Error fetching Fabrics:", error);
            } else {
                setFabrics(Fabrics as Fabrics[]);
            }
        };

        fetchTailors();
    }, [supabase]);

    return (
        <View style={tw`flex-1 bg-white`}>
            <View style={tw`flex-row justify-between items-center mx-4 mt-8 mb-4`}>
                <Text style={tw`text-[16px] font-semibold`}>My Fabrics</Text>
            </View>
            <FlatList
                data={fabrics}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={tw`flex-row items-center bg-white p-4 mb-4 mx-4 rounded-[10px] shadow-sm`}>
                        <Image
                            source={{ uri: item.Image }}
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