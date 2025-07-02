import { supabase } from "@/hooks/supabase";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import Svg, { Path } from "react-native-svg";

export default function Profile() {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    email: "",
    phone: "+1234567890",
  });
  const [address, setAddress] = useState({
    street: "123 Main St, Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10001",
  });
  const [walletBalance, setWalletBalance] = useState("$100.00");
  const [orderHistory, setOrderHistory] = useState([
    { id: "12345", status: "Delivered" },
    { id: "12346", status: "In Transit" },
  ]);
  const [settings, setSettings] = useState({
    notifications: "On",
    language: "English",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchUserEmail = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setPersonalInfo((prev) => ({ ...prev, email: user.email || "" }));
      }
    };

    fetchUserEmail();
  }, []);

  const handleSave = () => {
    setModalVisible(false);
  };

  const renderModalContent = () => {
    switch (activeSection) {
      case "My Profile":
        return (
          <View>
            <Text style={tw`text-lg font-semibold mb-2`}>
              Personal Information
            </Text>
            <TextInput
              style={tw`border border-gray-300 p-2 mb-2`}
              value={personalInfo.name}
              onChangeText={(text) =>
                setPersonalInfo({ ...personalInfo, name: text })
              }
            />
            <TextInput
              style={tw`border border-gray-300 p-2 mb-2`}
              value={personalInfo.email}
              onChangeText={(text) =>
                setPersonalInfo({ ...personalInfo, email: text })
              }
              editable={false}
            />
            <TextInput
              style={tw`border border-gray-300 p-2 mb-2`}
              value={personalInfo.phone}
              onChangeText={(text) =>
                setPersonalInfo({ ...personalInfo, phone: text })
              }
            />
            <TouchableOpacity
              style={tw`bg-red-500 p-2 rounded-lg mt-4`}
              onPress={async () => {
                const { error } = await supabase.auth.signOut();
                if (error) {
                  alert(`Logout failed: ${error.message}`);
                } else {
                  alert("Logged out successfully!");
                  router.replace("/(auth)");
                }
              }}
            >
              <Text style={tw`text-white text-center`}>Logout</Text>
            </TouchableOpacity>
          </View>
        );
      case "Address":
        return (
          <View>
            <Text style={tw`text-lg font-semibold mb-2`}>Address</Text>
            <TextInput
              style={tw`border border-gray-300 p-2 mb-2`}
              value={address.street}
              onChangeText={(text) => setAddress({ ...address, street: text })}
            />
            <TextInput
              style={tw`border border-gray-300 p-2 mb-2`}
              value={address.city}
              onChangeText={(text) => setAddress({ ...address, city: text })}
            />
            <TextInput
              style={tw`border border-gray-300 p-2 mb-2`}
              value={address.state}
              onChangeText={(text) => setAddress({ ...address, state: text })}
            />
            <TextInput
              style={tw`border border-gray-300 p-2 mb-2`}
              value={address.zip}
              onChangeText={(text) => setAddress({ ...address, zip: text })}
            />
          </View>
        );
      case "My Wallet":
        return (
          <View>
            <Text style={tw`text-lg font-semibold mb-2`}>My Wallet</Text>
            <TextInput
              style={tw`border border-gray-300 p-2 mb-2`}
              value={walletBalance}
              onChangeText={(text) => setWalletBalance(text)}
            />
          </View>
        );
      case "Order History":
        return (
          <View>
            <Text style={tw`text-lg font-semibold mb-2`}>Order History</Text>
            {orderHistory.map((order) => (
              <View key={order.id} style={tw`mb-2`}>
                <Text>
                  Order #{order.id} - {order.status}
                </Text>
              </View>
            ))}
          </View>
        );
      case "Settings":
        return (
          <View>
            <Text style={tw`text-lg font-semibold mb-2`}>Settings</Text>
            <TextInput
              style={tw`border border-gray-300 p-2 mb-2`}
              value={settings.notifications}
              onChangeText={(text) =>
                setSettings({ ...settings, notifications: text })
              }
            />
            <TextInput
              style={tw`border border-gray-300 p-2 mb-2`}
              value={settings.language}
              onChangeText={(text) =>
                setSettings({ ...settings, language: text })
              }
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={tw`flex-1 bg-white`}>
      <View style={tw`p-4`}>
        <TouchableOpacity
          style={tw`bg-gray-100 p-4 rounded-lg mb-4 flex flex-row justify-between items-center`}
          onPress={() => {
            setActiveSection("Address");
            setModalVisible(true);
          }}
        >
          <Text style={tw`text-xl font-bold`}>Address</Text>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M8.00589 21.3079L6.94189 20.2439L15.1869 11.9999L6.94189 3.75589L8.00589 2.69189L17.3139 11.9999L8.00589 21.3079Z"
              fill="#878787"
            />
          </Svg>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-gray-100 p-4 rounded-lg mb-4 flex flex-row justify-between items-center`}
          onPress={() => {
            setActiveSection("My Wallet");
            setModalVisible(true);
          }}
        >
          <Text style={tw`text-xl font-bold`}>My Wallet</Text>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M8.00589 21.3079L6.94189 20.2439L15.1869 11.9999L6.94189 3.75589L8.00589 2.69189L17.3139 11.9999L8.00589 21.3079Z"
              fill="#878787"
            />
          </Svg>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-gray-100 p-4 rounded-lg mb-4 flex flex-row justify-between items-center`}
          onPress={() => {
            setActiveSection("Order History");
            setModalVisible(true);
          }}
        >
          <Text style={tw`text-xl font-bold`}>Order History</Text>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M8.00589 21.3079L6.94189 20.2439L15.1869 11.9999L6.94189 3.75589L8.00589 2.69189L17.3139 11.9999L8.00589 21.3079Z"
              fill="#878787"
            />
          </Svg>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-gray-100 p-4 rounded-lg mb-4 flex flex-row justify-between items-center`}
          onPress={() => {
            setActiveSection("Settings");
            setModalVisible(true);
          }}
        >
          <Text style={tw`text-xl font-bold`}>Settings</Text>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M8.00589 21.3079L6.94189 20.2439L15.1869 11.9999L6.94189 3.75589L8.00589 2.69189L17.3139 11.9999L8.00589 21.3079Z"
              fill="#878787"
            />
          </Svg>
        </TouchableOpacity>

        <TouchableOpacity
          style={tw`bg-gray-100 p-4 rounded-lg mb-4 flex flex-row justify-between items-center`}
          onPress={() => {
            setActiveSection("Settings");
            setModalVisible(true);
          }}
        >
          <Text style={tw`text-xl font-bold`}>Settings</Text>
           <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M8.00589 21.3079L6.94189 20.2439L15.1869 11.9999L6.94189 3.75589L8.00589 2.69189L17.3139 11.9999L8.00589 21.3079Z"
              fill="#878787"
            />
          </Svg>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
        >
          <View style={tw`bg-white p-4 rounded-lg w-11/12`}>
            {renderModalContent()}
            <Button title="Save" onPress={handleSave} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    position: "absolute",
  },
});
