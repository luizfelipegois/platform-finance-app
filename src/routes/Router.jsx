import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import { Context } from "../context";
import AppTabs from './AppTabs';
import AuthStack from './AuthStack';

export function Router() {
  const { tokenAuthentication } = useContext(Context);
  return (
    <NavigationContainer>
      {
        tokenAuthentication ? <AppTabs /> : <AuthStack />
      }
    </NavigationContainer>
  )
};
