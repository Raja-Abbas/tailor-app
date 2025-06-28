import { useSupabase } from "@/hooks/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
  const supabase: SupabaseClient = useSupabase();

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
            <TouchableOpacity style={tw`bg-green-500 p-4 rounded`} onPress={() => handleStep1('custom')}>
              <Text style={tw`text-white text-center`}>Custom Measuring</Text>
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
                <Text style={tw`text-lg font-bold mb-4`}>Measurements</Text>
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
                <TouchableOpacity style={tw`bg-blue-500 p-2 rounded mb-2`} onPress={handleAddMeasurements}>
                  <Text style={tw`text-white text-center`}>Add Measurements</Text>
                </TouchableOpacity>
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
                {/* Add summary details here */}
              </View>
            )}

            {bookingStep === 4 && (
              <View>
                <Text style={tw`text-lg font-bold mb-4`}>Payment</Text>
                {/* Add payment details here */}
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
              {bookingStep === 4 && (
                <TouchableOpacity style={tw`bg-green-500 p-2 rounded`}>
                  <Text style={tw`text-white text-center`}>Complete Payment</Text>
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
    </View>
  );
};

export default Measurements;