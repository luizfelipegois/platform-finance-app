import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import theme from "../theme";
import screens from "../screens";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: theme.COLORS.TEXT,
        headerStyle: {
          backgroundColor: theme.COLORS.BACKGROUND,
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen name="Configurações" component={ screens.Profile } />
      <Stack.Screen name="Minhas Solicitações" component={ screens.Requests } />
      <Stack.Screen name="Alterar Email" component={ screens.ChangeEmail } />
      <Stack.Screen name="Alterar Senha" component={ screens.ChangePassword } />
    </Stack.Navigator>
  )
};