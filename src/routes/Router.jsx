import { NavigationContainer } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import AppTabs from './AppTabs';
import AuthStack from './AuthStack';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from 'expo-local-authentication';

export function Router() {
  const { tokenAuthentication, isLocalAuth, setIsLocalAuth, setTokenAuthentication } = useContext(Context);

  async function checkLocalAuthenticationStatus() {
    const status = await AsyncStorage.getItem("authenticantionActivated");

    if (status === "true") {
      const auth = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login com biometria",
        fallbackLabel: "Biometria nao reconhecida"
      });

      if(auth.success) {
        setIsLocalAuth(auth.success);
      } else {
        setIsLocalAuth(true);
        setTokenAuthentication(null);
      }
    }
  }

  useEffect(() => {
    checkLocalAuthenticationStatus();
  }, []);

  return (
    <NavigationContainer>
      {
        tokenAuthentication && isLocalAuth ? <AppTabs /> : <AuthStack />
      }
    </NavigationContainer>
  )
};
