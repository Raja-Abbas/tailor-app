import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

const tailors = [
  {
    id: '1',
    name: 'Tailor A',
    image: require('../../assets/images/user.png'),
    rating: '4.5',
    description: 'Expert in men\'s suits and formal wear.',
    location: 'Downtown',
    distance: '1.2 km',
  },
  {
    id: '2',
    name: 'Tailor B',
    image: require('../../assets/images/user.png'),
    rating: '4.7',
    description: 'Specializes in women\'s dresses and alterations.',
    location: 'Uptown',
    distance: '2.5 km',
  },
  {
    id: '3',
    name: 'Tailor C',
    image: require('../../assets/images/user.png'),
    rating: '4.3',
    description: 'Best for kids\' clothing and school uniforms.',
    location: 'Midtown',
    distance: '3.0 km',
  },
  {
    id: '4',
    name: 'Tailor D',
    image: require('../../assets/images/user.png'),
    rating: '4.6',
    description: 'Custom tailoring for all occasions.',
    location: 'Eastside',
    distance: '1.8 km',
  },
  {
    id: '5',
    name: 'Tailor E',
    image: require('../../assets/images/user.png'),
    rating: '4.4',
    description: 'Quick alterations and repairs.',
    location: 'Westside',
    distance: '2.0 km',
  },
  {
    id: '6',
    name: 'Tailor F',
    image: require('../../assets/images/user.png'),
    rating: '4.8',
    description: 'Luxury tailoring and bespoke suits.',
    location: 'Northside',
    distance: '3.5 km',
  },
  {
    id: '7',
    name: 'Tailor G',
    image: require('../../assets/images/user.png'),
    rating: '4.2',
    description: 'Affordable tailoring for everyday wear.',
    location: 'Southside',
    distance: '2.2 km',
  },
  {
    id: '8',
    name: 'Tailor H',
    image: require('../../assets/images/user.png'),
    rating: '4.9',
    description: 'High-end fashion tailoring.',
    location: 'Central',
    distance: '1.0 km',
  },
  {
    id: '9',
    name: 'Tailor I',
    image: require('../../assets/images/user.png'),
    rating: '4.1',
    description: 'Traditional and modern tailoring.',
    location: 'Old Town',
    distance: '2.8 km',
  },
  {
    id: '10',
    name: 'Tailor J',
    image: require('../../assets/images/user.png'),
    rating: '4.7',
    description: 'Expert in bridal and evening wear.',
    location: 'New Town',
    distance: '3.2 km',
  },
  {
    id: '11',
    name: 'Tailor K',
    image: require('../../assets/images/user.png'),
    rating: '4.6',
    description: 'Custom tailoring for all ages.',
    location: 'Suburbia',
    distance: '4.0 km',
  },
  {
    id: '12',
    name: 'Tailor L',
    image: require('../../assets/images/user.png'),
    rating: '4.3',
    description: 'Specializes in vintage clothing.',
    location: 'Historic District',
    distance: '3.7 km',
  },
];

export default function Tailors() {
  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`flex-row justify-between items-center mx-4 mt-8 mb-4`}>
        <Text style={tw`text-[16px] font-semibold`}>My Tailors</Text>
      </View>
      <FlatList
        data={tailors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={tw`flex-row items-center bg-white p-4 mb-4 mx-4 rounded-[10px] shadow-sm`}>
            <Image source={item.image} style={tw`w-[50px] h-[50px] rounded-full mr-4`} />
            <View style={tw`flex-1`}>
              <Text style={tw`text-[16px] font-semibold`}>{item.name}</Text>
              <Text style={tw`text-[14px] text-gray-600`}>{item.description}</Text>
              <Text style={tw`text-[14px] text-gray-600`}>{item.location}</Text>
              <Text style={tw`text-[14px] text-gray-600`}>{item.distance} away</Text>
            </View>
            <Text style={tw`text-[14px] font-semibold`}>{item.rating} ★</Text>
          </View>
        )}
      />
    </View>
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
