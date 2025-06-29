/* eslint-disable import/no-unresolved */
import { useSupabase } from "@/hooks/supabase";
import { RootStackParamList } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

const categories = [
  {
    id: '1',
    name: 'Give Measurements',
    image: require('../../assets/images/ruler-combined.png'),
  },
  {
    id: '2',
    name: 'Fabric collections',
    image: require('../../assets/images/ruler-combined-2.png'),
  },
  {
    id: '3',
    name: 'Men',
    image: require('../../assets/images/ruler-combined-4.png'),
  },
  {
    id: '4',
    name: 'Women',
    image: require('../../assets/images/ruler-combined-5.png'),
  },
  {
    id: '5',
    name: 'Kids',
    image: require('../../assets/images/ruler-combined-6.png'),
  },
];

type Tailor = {
  id: string;
  name: string;
  image: string;
  rating: string;
  description: string;
  location: string;
  distance: string;
};

export default function HomeScreen() {
  const navigation = useNavigation<RootStackParamList>();
  const [topTailors, setTopTailors] = useState<Tailor[]>([]);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const supabase: SupabaseClient = useSupabase();

  useEffect(() => {
    const fetchTopTailors = async () => {
      let { data: Tailors, error } = await supabase
        .from("Tailors")
        .select("*")
        .order("rating", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Error fetching tailors:", error);
      } else {
        setTopTailors(Tailors as Tailor[]);
      }
    };

    fetchTopTailors();
  }, [supabase]);

  return (
    <ScrollView style={tw`flex-1`}>
      <TextInput
        style={tw`w-[95%] h-12 px-4 border border-white bg-white rounded-[16px] mb-[31px] mx-auto mt-4`}
        placeholder="Search..."
        placeholderTextColor="#9CA3AF"
      />
      <Text style={tw`text-[16px] font-semibold mb-4 ml-4`}>Category</Text>
      <View style={tw`flex-row flex-wrap gap-[27px] justify-center`}>
        {categories.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            activeOpacity={0.7}
            onPress={() => {
              if (item.name === 'Men') {
                navigation.navigate('mens');
              } else if (item.name === 'Women') {
                navigation.navigate('womens');
              } else if (item.name === 'Kids') {
                navigation.navigate('kids');
              } else if (item.name === 'Give Measurements') {
                navigation.navigate('measurements');
              } else if (item.name === 'Fabric collections') {
                navigation.navigate('fabrics');
              }
            }}
            onPressIn={() => setHoveredItemId(item.id)}
            onPressOut={() => setHoveredItemId(null)}
          >
            <View style={[
              tw`min-w-[135px] p-[6px] rounded-[5px] justify-between items-center`,
              { backgroundColor: hoveredItemId === item.id ? '#E5E7EB' : '#FFFFFF' }
            ]}>
              <Image source={item.image} style={tw`w-[50px] h-[50px] rounded-[5px] mb-2`} />
              <Text style={tw`text-[13px] font-normal text-center`}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View style={tw`flex-row justify-between items-center mx-4 mt-[32px] mb-[19px]`}>
        <Text style={tw`text-[16px] font-semibold`}>Top 5 Tailors</Text>
        <TouchableOpacity onPress={() => navigation.navigate('tailors')}>
          <Text style={tw`text-[14px] text-blue-500`}>See All</Text>
        </TouchableOpacity>
      </View>
      <View>
        {topTailors.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            onPress={() => navigation.navigate('measurements', { tailor: JSON.stringify(item) })}
            style={tw`flex-row items-center bg-white p-4 mb-4 mx-4 rounded-[10px] shadow-sm`}
          >
            <Image source={{ uri: item.image }} style={tw`w-[50px] h-[50px] rounded-full mr-4`} />
            <View style={tw`flex-1`}>
              <Text style={tw`text-[14px] font-semibold`}>★ {item.rating}</Text>
              <Text style={tw`text-[16px] font-semibold`}>{item.name}</Text>
              <Text style={tw`text-[14px] text-gray-600`}>{item.description}</Text>
              <Text style={tw`text-[14px] text-gray-600`}>{item.location}</Text>
              <Text style={tw`text-[14px] text-gray-600`}>{item.distance} away</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
