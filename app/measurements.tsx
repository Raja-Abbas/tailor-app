import { useSupabase } from "@/hooks/supabase";
import DateTimePicker from '@react-native-community/datetimepicker';
import { SupabaseClient } from "@supabase/supabase-js";
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
  const { name, phone, email, address, deliveryDate: paramDeliveryDate, tailor } = useLocalSearchParams();
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number, longitude: number } | null>(null);
  const [userName, setUserName] = useState<string | null>(typeof name === 'string' ? name : null);
  const [userEmail, setUserEmail] = useState<string | null>(typeof email === 'string' ? email : null);
  const [userAddress, setUserAddress] = useState<string | null>(typeof address === 'string' ? address : null);
  const [userDeliveryDate, setUserDeliveryDate] = useState<string | null>(typeof deliveryDate === 'string' ? deliveryDate : null);
  const [form, setForm] = useState({
    name: typeof name === 'string' ? name : '',
    phone: typeof phone === 'string' ? phone : '',
    email: typeof email === 'string' ? email : '',
    address: typeof address === 'string' ? address : '',
    deliveryDate: typeof deliveryDate === 'string' ? deliveryDate : '',
    city: '',
  });
  const [showPickupDatePicker, setShowPickupDatePicker] = useState(false);
  const [showDeliveryDatePicker, setShowDeliveryDatePicker] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);
  const router = useRouter();
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvc, setCvc] = useState('');

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

  useEffect(() => {
    if (tailor && typeof tailor === 'string') {
      const parsedTailor = JSON.parse(tailor);
      setSelectedTailor(parsedTailor);
      setStep(3);
    }
  }, [tailor]);

  const handleStep1 = (option: string) => {
    if (option === 'home') {
      setStep(2);
    } else {
      // Handle Custom Measuring option
    }
  };

  const handleStep2 = (tailor: Tailor) => {
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

  const isContactInfoComplete = () => {
    return form.name && form.phone && form.email && form.city && form.address;
  };

  const isMeasurementsComplete = () => {
    return measurements.length && measurements.neck && measurements.shoulder && measurements.armLength && measurements.biceps;
  };

  const isDatesComplete = () => {
    return pickupDate && deliveryDate;
  };

  const TOTAL_BOOKING_STEPS = 5;

  const handleNextBookingStep = () => {
    setStepError(null);
    if (bookingStep === 1 && !isContactInfoComplete()) {
      setStepError('Please fill all contact information fields.');
      return;
    }
    if (bookingStep === 2 && !isMeasurementsComplete()) {
      setStepError('Please fill all measurement fields.');
      return;
    }
    if (bookingStep === 3 && !isDatesComplete()) {
      setStepError('Please select both pickup and delivery dates.');
      return;
    }
    if (bookingStep < TOTAL_BOOKING_STEPS) {
      setBookingStep(bookingStep + 1);
    }
  };

  async function handleTestPayment() {
    setPaymentLoading(true);
    setPaymentError(null);
    // Simulate Stripe test payment (replace with real integration in production)
    try {
      // Stripe test card: 4242 4242 4242 4242, any future date, any CVC
      if (cardNumber.replace(/\s/g, '') === '4242424242424242' && expMonth && expYear && cvc) {
        setTimeout(() => {
          setPaymentLoading(false);
          setPaymentSuccess(true);
          setTimeout(() => {
            setPaymentSuccess(false);
            router.replace('/tabs');
          }, 2000);
        }, 1500);
      } else {
        setPaymentLoading(false);
        setPaymentError('Invalid test card details. Use 4242 4242 4242 4242.');
      }
    } catch (e) {
      setPaymentLoading(false);
      setPaymentError('Payment failed.');
    }
  }

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
            <TouchableOpacity style={tw`bg-[#000080] p-4 rounded-[10px] mb-2`} onPress={() => handleStep1('home')}>
              <Text style={tw`text-white text-center`}>Get Measured at Home by a Tailor</Text>
            </TouchableOpacity>

            {/* Show Measurements */}
            <Text style={tw`text-lg font-bold mt-4`}>Measurements</Text>
            <TextInput
              style={tw`border p-2 mb-4 rounded-[10px]`}
              placeholder="Length"
              value={measurements.length}
              onChangeText={(text) => handleMeasurementChange('length', text)}
            />
            <TextInput
              style={tw`border p-2 mb-4 rounded-[10px]`}
              placeholder="Neck"
              value={measurements.neck}
              onChangeText={(text) => handleMeasurementChange('neck', text)}
            />
            <TextInput
              style={tw`border p-2 mb-4 rounded-[10px]`}
              placeholder="Shoulder"
              value={measurements.shoulder}
              onChangeText={(text) => handleMeasurementChange('shoulder', text)}
            />
            <TextInput
              style={tw`border p-2 mb-4 rounded-[10px]`}
              placeholder="Arm Length"
              value={measurements.armLength}
              onChangeText={(text) => handleMeasurementChange('armLength', text)}
            />
            <TextInput
              style={tw`border p-2 mb-4 rounded-[10px]`}
              placeholder="Biceps"
              value={measurements.biceps}
              onChangeText={(text) => handleMeasurementChange('biceps', text)}
            />

            {/* Add Name, Email, Address, and Delivery Date if null */}
            <TextInput
              style={tw`border p-2 mb-4 rounded-[10px]`}
              placeholder="Name"
              value={form.name}
              onChangeText={(text) => setForm({ ...form, name: text })}
            />
            <TextInput
              style={tw`border p-2 mb-4 rounded-[10px]`}
              placeholder="Email"
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
            />
            <TextInput
              style={tw`border p-2 mb-4 rounded-[10px]`}
              placeholder="Address"
              value={form.address}
              onChangeText={(text) => setForm({ ...form, address: text })}
            />
            <TextInput
              style={tw`border p-2 mb-4 rounded-[10px]`}
              placeholder="Delivery Date"
              value={form.deliveryDate}
              onChangeText={(text) => setForm({ ...form, deliveryDate: text })}
            />

            {/* Save Button */}
            <TouchableOpacity style={tw`bg-[#000080] p-2 rounded-[10px]`} onPress={handleSave}>
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
              <Text style={tw`text-lg font-bold`}>Step {bookingStep} of {TOTAL_BOOKING_STEPS}</Text>
            </View>
            {stepError && (
              <Text style={tw`text-red-500 mb-2`}>{stepError}</Text>
            )}
            {bookingStep === 1 && (
              <View>
                <Text style={tw`text-lg font-bold mb-4`}>Contact Information</Text>
                <TextInput style={tw`border p-2 mb-2 rounded-[10px]`} placeholder="Name" value={form.name} onChangeText={text => setForm({ ...form, name: text })} />
                <TextInput style={tw`border p-2 mb-2 rounded-[10px]`} placeholder="Phone" value={form.phone} onChangeText={text => setForm({ ...form, phone: text })} keyboardType="phone-pad" />
                <TextInput style={tw`border p-2 mb-2 rounded-[10px]`} placeholder="Email" value={form.email} onChangeText={text => setForm({ ...form, email: text })} keyboardType="email-address" />
                <TextInput style={tw`border p-2 mb-2 rounded-[10px]`} placeholder="City" value={form.city || ''} onChangeText={text => setForm({ ...form, city: text })} />
                <TextInput style={tw`border p-2 mb-2 rounded-[10px]`} placeholder="Address" value={form.address} onChangeText={text => setForm({ ...form, address: text })} />
              </View>
            )}
            {bookingStep === 2 && (
              <View>
                <Text style={tw`text-lg font-bold mb-4`}>Measurements</Text>
                <TextInput style={tw`border p-2 mb-2 rounded-[10px]`} placeholder="Length" value={measurements.length} onChangeText={text => handleMeasurementChange('length', text)} />
                <TextInput style={tw`border p-2 mb-2 rounded-[10px]`} placeholder="Neck" value={measurements.neck} onChangeText={text => handleMeasurementChange('neck', text)} />
                <TextInput style={tw`border p-2 mb-2 rounded-[10px]`} placeholder="Shoulder" value={measurements.shoulder} onChangeText={text => handleMeasurementChange('shoulder', text)} />
                <TextInput style={tw`border p-2 mb-2 rounded-[10px]`} placeholder="Arm Length" value={measurements.armLength} onChangeText={text => handleMeasurementChange('armLength', text)} />
                <TextInput style={tw`border p-2 mb-2 rounded-[10px]`} placeholder="Biceps" value={measurements.biceps} onChangeText={text => handleMeasurementChange('biceps', text)} />
              </View>
            )}
            {bookingStep === 3 && (
              <View>
                <Text style={tw`text-lg font-bold mb-4`}>Dates</Text>
                <Text style={tw`text-sm mb-2`}>Pickup Date:</Text>
                <TouchableOpacity style={tw`border p-2 mb-4 rounded-[10px]`} onPress={() => setShowPickupDatePicker(true)}>
                  <Text>{pickupDate ? pickupDate : 'Select Pickup Date'}</Text>
                </TouchableOpacity>
                {showPickupDatePicker && (
                  <DateTimePicker
                    value={pickupDate ? new Date(pickupDate) : new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowPickupDatePicker(false);
                      if (selectedDate) {
                        setPickupDate(selectedDate.toISOString().split('T')[0]);
                      }
                    }}
                    {...(Platform.OS === 'ios' ? { textColor: '#000080' } : { accentColor: '#000080' })}
                  />
                )}
                <Text style={tw`text-sm mb-2`}>Delivery Date:</Text>
                <TouchableOpacity style={tw`border p-2 mb-4 rounded-[10px]`} onPress={() => setShowDeliveryDatePicker(true)}>
                  <Text>{deliveryDate ? deliveryDate : 'Select Delivery Date'}</Text>
                </TouchableOpacity>
                {showDeliveryDatePicker && (
                  <DateTimePicker
                    value={deliveryDate ? new Date(deliveryDate) : new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      setShowDeliveryDatePicker(false);
                      if (selectedDate) {
                        setDeliveryDate(selectedDate.toISOString().split('T')[0]);
                      }
                    }}
                    {...(Platform.OS === 'ios' ? { textColor: '#000080' } : { accentColor: '#000080' })}
                  />
                )}
              </View>
            )}
            {bookingStep === 4 && (
              <View>
                <Text style={tw`text-lg font-bold mb-4`}>Summary</Text>
                <Text style={tw`text-sm mb-2`}>Pickup Date: {pickupDate}</Text>
                <Text style={tw`text-sm mb-2`}>Delivery Date: {deliveryDate}</Text>
                <Text style={tw`text-sm mb-2`}>Length: {measurements.length}</Text>
                <Text style={tw`text-sm mb-2`}>Neck: {measurements.neck}</Text>
                <Text style={tw`text-sm mb-2`}>Shoulder: {measurements.shoulder}</Text>
                <Text style={tw`text-sm mb-2`}>Arm Length: {measurements.armLength}</Text>
                <Text style={tw`text-sm mb-2`}>Biceps: {measurements.biceps}</Text>
                <View style={tw`mb-4`}>
                  <Text style={tw`font-bold`}>Contact Details</Text>
                  <Text>Name: {form.name}</Text>
                  <Text>Phone: {form.phone}</Text>
                  <Text>Email: {form.email}</Text>
                  <Text>City: {form.city}</Text>
                </View>
                <View style={tw`mb-4`}>
                  <Text style={tw`font-bold`}>Address</Text>
                  <Text>{form.address}</Text>
                </View>
              </View>
            )}
            {bookingStep === 5 && (
              <View>
                <Text style={tw`text-lg font-bold mb-4`}>Payment</Text>
                {paymentSuccess ? (
                  <Text style={tw`text-green-600 text-center mb-4`}>Order confirmed! Redirecting to homepage...</Text>
                ) : (
                  <>
                    <Text style={tw`mb-2`}>Test Card: 4242 4242 4242 4242, any future date, any CVC</Text>
                    <TextInput
                      style={tw`border p-2 mb-2 rounded-[10px]`}
                      placeholder="Card Number"
                      keyboardType="number-pad"
                      value={cardNumber}
                      onChangeText={setCardNumber}
                    />
                    <View style={tw`flex-row mb-2`}> 
                      <TextInput
                        style={tw`border p-2 rounded-[10px] flex-1 mr-2`}
                        placeholder="MM"
                        keyboardType="number-pad"
                        value={expMonth}
                        onChangeText={setExpMonth}
                        maxLength={2}
                      />
                      <TextInput
                        style={tw`border p-2 rounded-[10px] flex-1 mr-2`}
                        placeholder="YY"
                        keyboardType="number-pad"
                        value={expYear}
                        onChangeText={setExpYear}
                        maxLength={2}
                      />
                      <TextInput
                        style={tw`border p-2 rounded-[10px] flex-1`}
                        placeholder="CVC"
                        keyboardType="number-pad"
                        value={cvc}
                        onChangeText={setCvc}
                        maxLength={4}
                      />
                    </View>
                    {paymentError && <Text style={tw`text-red-500 mb-2`}>{paymentError}</Text>}
                    <TouchableOpacity
                      style={tw`bg-green-500 p-2 rounded mb-2`}
                      onPress={handleTestPayment}
                      disabled={paymentLoading}
                    >
                      <Text style={tw`text-white text-center`}>{paymentLoading ? 'Processing...' : 'Pay & Confirm Order'}</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            )}
            <View style={tw`flex-row justify-between mt-4`}>
              {bookingStep > 1 && (
                <TouchableOpacity style={tw`bg-gray-500 p-2 rounded`} onPress={handlePreviousBookingStep}>
                  <Text style={tw`text-white text-center`}>Previous</Text>
                </TouchableOpacity>
              )}
              {bookingStep < TOTAL_BOOKING_STEPS && (
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
            <TouchableOpacity style={tw`bg-[#000080] p-2 rounded-[10px]`} onPress={() => setIsModalVisible(false)}>
              <Text style={tw`text-white text-center`}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Measurements;