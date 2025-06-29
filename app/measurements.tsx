import { useSupabase } from "@/hooks/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';

type Tailor = {
  id: string;
  name: string;
  image: string;
  rating: string;
  description: string;
  location: string;
  distance: string;
  reviews: string | null;
};

const Measurements = () => {
  const [step, setStep] = useState(1);
  const [selectedTailor, setSelectedTailor] = useState<Tailor | null>(null);
  const [tailors, setTailors] = useState<Tailor[]>([]);
  const [bookingStep, setBookingStep] = useState(1);
  const [pickupDate, setPickupDate] = useState<string | null>(null);
  const [deliveryDate, setDeliveryDate] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [measurements, setMeasurements] = useState({
    length: '',
    neck: '',
    shoulder: '',
    armLength: '',
    biceps: '',
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const supabase: SupabaseClient = useSupabase();
  const { name, phone, email, address, deliveryDate: paramDeliveryDate } = useLocalSearchParams();
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number, longitude: number } | null>(null);
  const [userName, setUserName] = useState<string | null>(name || null);
  const [userEmail, setUserEmail] = useState<string | null>(email || null);
  const [userAddress, setUserAddress] = useState<string | null>(address || null);
  const [userDeliveryDate, setUserDeliveryDate] = useState<string | null>(deliveryDate || null);
  const [form, setForm] = useState({
    name: name || '',
    phone: phone || '',
    email: email || '',
    address: address || '',
    deliveryDate: deliveryDate || '',
  });

  useEffect(() => {
    const fetchTailors = async () => {
      let { data: Tailors, error } = await supabase.from("Tailors").select("*");

      if (error) {
        console.error("Error fetching tailors:", error);
      } else {
        setTailors(Tailors as Tailor[]);
      }
    };

    fetchTailors();
  }, [supabase]);

  const handleStep1 = (option) => {
    if (option === 'home') {
      setStep(2);
    } else {
      // Handle Custom Measuring option
    }
  };

  const handleStep2 = (tailor) => {
    setSelectedTailor(tailor);
    setStep(3);
  };

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const getReviews = (reviews: string | null): string[] => {
    if (reviews) {
      return reviews.split('  ');
    }
    return [];
  };

  const handleBookNow = () => {
    setStep(4);
    setBookingStep(1);
  };

  const handleNextBookingStep = () => {
    if (bookingStep < 4) {
      setBookingStep(bookingStep + 1);
    }
  };

  const handlePreviousBookingStep = () => {
    if (bookingStep > 1) {
      setBookingStep(bookingStep - 1);
    }
  };

  const handleAddMeasurements = () => {
    // Logic to expand and show categories
  };

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const handleMeasurementChange = (field: string, value: string) => {
    setMeasurements({ ...measurements, [field]: value });
  };

  const handleCompletePayment = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      Alert.alert("Error", "User not authenticated");
      console.log("User not authenticated:", userError);
      return;
    }

    const { error } = await supabase.from("Orders").insert({
      user_id: user.id,
      name: form.name,
      phone: form.phone || null,
      email: form.email,
      address: form.address,
      delivery_date: form.deliveryDate,
      measurements: {
        length: measurements.length,
        neck: measurements.neck,
        shoulder: measurements.shoulder,
        armLength: measurements.armLength,
        biceps: measurements.biceps,
      },
    });

    if (error) {
      Alert.alert("Error", error.message);
      console.log("Insertion error:", error);
    } else {
      setIsModalVisible(true);
    }
  };

  const handleSave = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      Alert.alert("Error", "User not authenticated");
      console.log("User not authenticated:", userError);
      return;
    }

    const { error } = await supabase.from("Orders").insert({
      user_id: user.id,
      name: form.name,
      phone: form.phone || null,
      email: form.email,
      address: form.address,
      delivery_date: form.deliveryDate,
      measurements: {
        length: measurements.length,
        neck: measurements.neck,
        shoulder: measurements.shoulder,
        armLength: measurements.armLength,
        biceps: measurements.biceps,
      },
    });

    if (error) {
      Alert.alert("Error", error.message);
      console.log("Insertion error:", error);
    } else {
      Alert.alert("Success", "Data saved successfully");
    }
  };

  return (
    <View style={tw`flex-1`}>
      <View style={tw`flex-1 p-4`}>
        {step > 1 && (
          <TouchableOpacity style={tw`bg-gray-500 p-2 rounded mb-4`} onPress={goBack}>
            <Text style={tw`text-white text-center`}>Back</Text>
          </TouchableOpacity>
        )}

        {step === 1 && (
          <View>
            <Text style={tw`text-lg font-bold mb-4`}>Choose Measurement Option</Text>
            <TouchableOpacity style={tw`bg-blue-500 p-4 rounded mb-2`} onPress={() => handleStep1('home')}>
              <Text style={tw`text-white text-center`}>Get Measured at Home by a Tailor</Text>
            </TouchableOpacity>

            {/* Show Measurements */}
            <Text style={tw`text-lg font-bold mt-4`}>Measurements</Text>
            <TextInput
              style={tw`border p-2 mb-4`}
              placeholder="Length"
              value={measurements.length}
              onChangeText={(text) => handleMeasurementChange('length', text)}
            />
            <TextInput
              style={tw`border p-2 mb-4`}
              placeholder="Neck"
              value={measurements.neck}
              onChangeText={(text) => handleMeasurementChange('neck', text)}
            />
            <TextInput
              style={tw`border p-2 mb-4`}
              placeholder="Shoulder"
              value={measurements.shoulder}
              onChangeText={(text) => handleMeasurementChange('shoulder', text)}
            />
            <TextInput
              style={tw`border p-2 mb-4`}
              placeholder="Arm Length"
              value={measurements.armLength}
              onChangeText={(text) => handleMeasurementChange('armLength', text)}
            />
            <TextInput
              style={tw`border p-2 mb-4`}
              placeholder="Biceps"
              value={measurements.biceps}
              onChangeText={(text) => handleMeasurementChange('biceps', text)}
            />

            {/* Add Name, Email, Address, and Delivery Date if null */}
            <TextInput
              style={tw`border p-2 mb-4`}
              placeholder="Name"
              value={form.name}
              onChangeText={(text) => setForm({ ...form, name: text })}
            />
            <TextInput
              style={tw`border p-2 mb-4`}
              placeholder="Email"
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
            />
            <TextInput
              style={tw`border p-2 mb-4`}
              placeholder="Address"
              value={form.address}
              onChangeText={(text) => setForm({ ...form, address: text })}
            />
            <TextInput
              style={tw`border p-2 mb-4`}
              placeholder="Delivery Date"
              value={form.deliveryDate}
              onChangeText={(text) => setForm({ ...form, deliveryDate: text })}
            />

            {/* Save Button */}
            <TouchableOpacity style={tw`bg-blue-500 p-2 rounded`} onPress={handleSave}>
              <Text style={tw`text-white text-center`}>Save</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 2 && (
          <ScrollView>
            <Text style={tw`text-lg font-bold mb-4`}>Select a Tailor</Text>
            {tailors.map((tailor) => (
              <TouchableOpacity key={tailor.id} style={tw`bg-gray-200 p-4 rounded mb-2`} onPress={() => handleStep2(tailor)}>
                <Image
                  source={{ uri: tailor.image }}
                  style={tw`w-[50px] h-[50px] rounded-full mr-4`}
                />
                <View style={tw`flex-1`}>
                  <Text style={tw`text-lg`}>{tailor.name}</Text>
                  <Text style={tw`text-sm`}>{tailor.description}</Text>
                  <Text style={tw`text-sm`}>Rating: {tailor.rating}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {step === 3 && selectedTailor && (
          <View>
            <Image
              source={{ uri: selectedTailor.image }}
              style={tw`w-[100px] h-[100px] rounded-full mb-4`}
            />
            <Text style={tw`text-lg font-bold mb-4`}>{selectedTailor.name}</Text>
            <Text style={tw`text-sm mb-2`}>{selectedTailor.description}</Text>
            <Text style={tw`text-sm mb-2`}>Rating: {selectedTailor.rating}</Text>
            <Text style={tw`text-lg font-bold mb-2`}>Reviews:</Text>
            {getReviews(selectedTailor.reviews).map((review, index) => (
              <Text key={index} style={tw`text-sm mb-1`}>{review}</Text>
            ))}
          </View>
        )}

        {step === 4 && (
          <View>
            <View style={tw`flex-row justify-between mb-4`}>
              <Text style={tw`text-lg font-bold`}>Step {bookingStep} of 4</Text>
            </View>
            {bookingStep === 1 && (
              <View>
                <Text style={tw`text-sm mb-2`}>Pickup Date:</Text>
                <TextInput
                  style={tw`border p-2 mb-4`}
                  placeholder="Pickup Date"
                  value={pickupDate || ''}
                  onChangeText={setPickupDate}
                />
                <Text style={tw`text-sm mb-2`}>Delivery Date:</Text>
                <TextInput
                  style={tw`border p-2 mb-4`}
                  placeholder="Delivery Date"
                  value={deliveryDate || ''}
                  onChangeText={setDeliveryDate}
                />
                {selectedCategory && (
                  <View>
                    <Text style={tw`text-sm mb-2`}>Selected Category: {selectedCategory}</Text>
                    <TextInput
                      style={tw`border p-2 mb-2`}
                      placeholder="Length"
                      value={measurements.length}
                      onChangeText={(text) => handleMeasurementChange('length', text)}
                    />
                    <TextInput
                      style={tw`border p-2 mb-2`}
                      placeholder="Neck"
                      value={measurements.neck}
                      onChangeText={(text) => handleMeasurementChange('neck', text)}
                    />
                    <TextInput
                      style={tw`border p-2 mb-2`}
                      placeholder="Shoulder"
                      value={measurements.shoulder}
                      onChangeText={(text) => handleMeasurementChange('shoulder', text)}
                    />
                    <TextInput
                      style={tw`border p-2 mb-2`}
                      placeholder="Arm Length"
                      value={measurements.armLength}
                      onChangeText={(text) => handleMeasurementChange('armLength', text)}
                    />
                    <TextInput
                      style={tw`border p-2 mb-2`}
                      placeholder="Biceps"
                      value={measurements.biceps}
                      onChangeText={(text) => handleMeasurementChange('biceps', text)}
                    />
                  </View>
                )}
              </View>
            )}
            {bookingStep === 2 && (
              <View>
                <Text style={tw`text-lg font-bold mb-4`}>Location</Text>
                {/* Add location input fields here */}
              </View>
            )}
            {bookingStep === 3 && (
              <View>
                <Text style={tw`text-lg font-bold mb-4`}>Summary</Text>
                <Text style={tw`text-sm mb-2`}>Pickup Date: {pickupDate}</Text>
                <Text style={tw`text-sm mb-2`}>Delivery Date: {deliveryDate}</Text>
                {selectedCategory && (
                  <Text style={tw`text-sm mb-2`}>Selected Category: {selectedCategory}</Text>
                )}
                <Text style={tw`text-sm mb-2`}>Length: {measurements.length}</Text>
                <Text style={tw`text-sm mb-2`}>Neck: {measurements.neck}</Text>
                <Text style={tw`text-sm mb-2`}>Shoulder: {measurements.shoulder}</Text>
                <Text style={tw`text-sm mb-2`}>Arm Length: {measurements.armLength}</Text>
                <Text style={tw`text-sm mb-2`}>Biceps: {measurements.biceps}</Text>
                {selectedLocation && (
                  <Text style={tw`text-sm mb-2`}>Location: Latitude {selectedLocation.latitude}, Longitude {selectedLocation.longitude}</Text>
                )}
                <View style={tw`mb-4`}>
                  <Text style={tw`font-bold`}>Contact Details</Text>
                  <Text>Name: {form.name}</Text>
                  <Text>Phone: {form.phone}</Text>
                  <Text>Email: {form.email}</Text>
                </View>
                <View style={tw`mb-4`}>
                  <Text style={tw`font-bold`}>Address</Text>
                  <Text>{form.address}</Text>
                </View>
              </View>
            )}
            {bookingStep === 4 && (
              <View>
                <Text style={tw`text-lg font-bold mb-4`}>Payment</Text>
                {/* Add payment details here */}
                <TouchableOpacity style={tw`bg-green-500 p-2 rounded`} onPress={handleCompletePayment}>
                  <Text style={tw`text-white text-center`}>Complete Payment</Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={tw`flex-row justify-between mt-4`}>
              {bookingStep > 1 && (
                <TouchableOpacity style={tw`bg-gray-500 p-2 rounded`} onPress={handlePreviousBookingStep}>
                  <Text style={tw`text-white text-center`}>Previous</Text>
                </TouchableOpacity>
              )}
              {bookingStep < 4 && (
                <TouchableOpacity style={tw`bg-blue-500 p-2 rounded`} onPress={handleNextBookingStep}>
                  <Text style={tw`text-white text-center`}>Next</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </View>
      {/* Sticky Footer */}
      {step === 3 && selectedTailor && (
        <View style={tw`absolute bottom-0 left-0 right-0 bg-[#00046B] bg-opacity-75 py-6 px-11`}>
          <TouchableOpacity style={tw`bg-white py-3 rounded-lg`} onPress={handleBookNow}>
            <Text style={tw`text-center text-[#00046B] font-bold`}>Book Now</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Modal for success message */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
          <View style={tw`bg-white p-6 rounded-lg`}>
            <Text style={tw`text-lg font-bold mb-4`}>Appointment Booked Successfully</Text>
            <TouchableOpacity style={tw`bg-blue-500 p-2 rounded`} onPress={() => setIsModalVisible(false)}>
              <Text style={tw`text-white text-center`}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Measurements;