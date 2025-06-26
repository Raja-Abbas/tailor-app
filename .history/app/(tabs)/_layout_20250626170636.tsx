import { Tabs } from "expo-router";
import React from "react";
import { Image, Platform, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import sewingMachineImage from '@/assets/images/sewing-machine-1.png';
import Header from '@/components/Header';
import CartImage from '../../assets/images/cart.png';
import ProfileImage from '../../assets/images/user.png';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
              backgroundColor: '#3f428f',
              marginHorizontal: 5,
              marginBottom: 10,
              borderRadius: 50,
              height: 66,
            },
            default: {
              backgroundColor: '#3f428f',
              marginHorizontal: 5,
              marginBottom: 10,
              borderRadius: 50,
              height: 60,
            },
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={'#fff'} />
            ),
          }}
        />

        <Tabs.Screen
          name="tailors"
          options={{
            title: "Tailors",
            tabBarIcon: ({ color }) => (
              <Image
                source={sewingMachineImage}
                style={{ width: 28, height: 28, tintColor: "#fff" }}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="cart"
          options={{
            title: "Cart",
            tabBarIcon: ({ color }) => (
              <Image
                source={CartImage}
                style={{ width: 28, height: 28, tintColor: "#fff" }}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <Image
                source={ProfileImage}
                style={{ width: 28, height: 28, tintColor: "#fff" }}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
