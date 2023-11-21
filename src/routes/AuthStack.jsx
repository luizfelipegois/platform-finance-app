import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import theme from "../theme";
import SignIn from "../screens/SignIn";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: theme.COLORS.TEXT,
        headerStyle: {
          backgroundColor: theme.COLORS.BACKGROUND,
        }
      }}
    >
      <Stack.Screen name="SignIn"  component={ SignIn } />
    </Stack.Navigator>
  )
};
