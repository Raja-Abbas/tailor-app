import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import Tabs from './(tabs)';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Tabs" component={Tabs} />
    </Drawer.Navigator>
  );
} 