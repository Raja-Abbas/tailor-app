import { useSupabase } from "@/hooks/supabase";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, Text, TextInput } from "react-native";
import tw from "twrnc";

export default function SelectAddress() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    deliveryDate: "",
  });

  const supabase = useSupabase();
  const router = useRouter();

  const handleSubmit = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      Alert.alert("Error", "User not authenticated");
      console.log("User not authenticated:", userError);
      router.replace('/signin');
      return;
    }

    console.log("User:", user);

    const { error } = await supabase.from("Orders").insert({
      user_id: user.id,
      name: form.name,
      phone: form.phone,
      email: form.email,
      address: form.address,
      delivery_date: form.deliveryDate,
    });

    if (error) {
      Alert.alert("Error", error.message);
      console.log("Insertion error:", error);
    } else {
      console.log("Navigating to order summary");
      router.push({
        pathname: "/order-summary",
        params: {
          name: form.name,
          phone: form.phone,
          email: form.email,
          address: form.address,
          deliveryDate: form.deliveryDate,
        },
      });
    }
  };

  return (
    <ScrollView style={tw`flex-1 bg-white`} contentContainerStyle={tw`p-4`}>
      <Text style={tw`text-xl font-bold mb-4`}>Enter Details</Text>

      <TextInput
        placeholder="Full Name"
        value={form.name}
        onChangeText={(t) => setForm({ ...form, name: t })}
        style={tw`border p-3 rounded-lg mb-4`}
      />
      <TextInput
        placeholder="+91"
        keyboardType="phone-pad"
        value={form.phone}
        onChangeText={(t) => setForm({ ...form, phone: t })}
        style={tw`border p-3 rounded-lg mb-4`}
      />
      <TextInput
        placeholder="E-mail"
        keyboardType="email-address"
        value={form.email}
        onChangeText={(t) => setForm({ ...form, email: t })}
        style={tw`border p-3 rounded-lg mb-4`}
      />

      <Text style={tw`text-xl font-bold my-4`}>Address</Text>
      <TextInput
        placeholder="Enter full address"
        value={form.address}
        onChangeText={(t) => setForm({ ...form, address: t })}
        style={tw`border p-3 rounded-lg mb-4`}
      />

      <Text style={tw`text-xl font-bold my-4`}>Delivery Date</Text>
      <TextInput
        placeholder="DD - MM - YYYY"
        value={form.deliveryDate}
        onChangeText={(t) => setForm({ ...form, deliveryDate: t })}
        style={tw`border p-3 rounded-lg mb-6`}
      />

      <Pressable onPress={handleSubmit} style={tw`bg-green-600 py-3 rounded-lg`}>
        <Text style={tw`text-white text-center font-semibold text-base`}>Continue</Text>
      </Pressable>
    </ScrollView>
  );
}
