import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import theme from "../theme";
import Investimentos from '../screens/Home';
import Market from '../screens/Market';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: theme.COLORS.WHITE,
        headerStyle: {
          backgroundColor: theme.COLORS.BLACK,
        },
        headerTitleStyle: {
          fontSize: 24
        },
        headerBackTitleVisible: false
      }}
    >
      <Stack.Screen name="Investments" component={ Investimentos} />
      <Stack.Screen name="Mercados" component={ Market } />
    </Stack.Navigator>
  )
};