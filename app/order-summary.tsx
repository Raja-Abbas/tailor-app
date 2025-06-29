import { useNavigation } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';
import tw from 'twrnc';

export default function OrderSummary() {
  const { name, phone, email, address, deliveryDate } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();

  const handleBookTailor = () => {
    navigation.navigate('measurements', {
      name,
      phone,
      email,
      address,
      deliveryDate,
    });
  };

  return (
    <ScrollView style={tw`flex-1 bg-white`} contentContainerStyle={tw`p-4`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Order Summary</Text>

      <View style={tw`mb-4`}>
        <Text style={tw`font-bold`}>Contact Details</Text>
        <Text>Name: {name}</Text>
        <Text>Phone: {phone}</Text>
        <Text>Email: {email}</Text>
      </View>

      <View style={tw`mb-4`}>
        <Text style={tw`font-bold`}>Address</Text>
        <Text>{address}</Text>
      </View>

      <View style={tw`mb-6`}>
        <Text style={tw`font-bold`}>Delivery Date</Text>
        <Text>{deliveryDate}</Text>
      </View>

      <Pressable
        onPress={handleBookTailor}
        style={tw`bg-blue-600 py-3 rounded-lg`}
      >
        <Text style={tw`text-white text-center font-semibold text-base`}>
          Book a Tailor
        </Text>
      </Pressable>
    </ScrollView>
  );
}
