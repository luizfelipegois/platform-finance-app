import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import theme from "../theme";
import { ChangeEmail, ChangePassword, ChangePhone } from '../screens/UserSettingsChange';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
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
      <Stack.Screen name="Configurações" component={ Profile } />
      <Stack.Screen name="Alterar Email" component={ ChangeEmail } />
      <Stack.Screen name="Alterar Senha" component={ ChangePassword } />
      <Stack.Screen name="Alterar Phone" component={ ChangePhone } />
    </Stack.Navigator>
  )
};