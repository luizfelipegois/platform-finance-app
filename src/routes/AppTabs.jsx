import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import screens from "../screens";
import ProfileStack from "./ProfileStack";
import THEME from "../theme";
import { Context } from "../context";
import Requests from "../screens/Requests";
import { Badge, Box, Button, NativeBaseProvider, VStack } from "native-base";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  const { getUserData, setShowData, showData } = useContext(Context);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: THEME.COLORS.BLACK,
          shadowOpacity: 0,
        },
        headerTintColor: THEME.COLORS.WHITE,
        headerTitleStyle: {
          fontSize: 24,
        },
        tabBarStyle: {
          backgroundColor: THEME.COLORS.BLACK,
          borderTopColor: THEME.COLORS.BLACK,
        },
        tabBarShowLabel: false,
        headerTitleAlign: "left",
        headerShadowVisible: false,
      }}
    >
      <Tab.Screen
        name="Investimentos"
        component={screens.Home}
        options={{
          tabBarIcon: ({ size, focused }) => {
            if (focused) {
              return (
                <Feather
                  name="bar-chart-2"
                  size={size}
                  color={THEME.COLORS.WHITE}
                />
              );
            }

            return (
              <Feather
                name="bar-chart-2"
                size={size}
                color={THEME.COLORS.GRAY}
              />
            );
          },
          tabBarLabel: ({ focused }) => {
            if (focused) {
              return (
                <Text style={{ color: THEME.COLORS.WHITE, fontSize: 14 }}>
                  Investimentos
                </Text>
              );
            }

            return (
              <Text style={{ color: THEME.COLORS.GRAY, fontSize: 14 }}>
                Investimentos
              </Text>
            );
          },
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <Feather
                name={showData ? "eye" : "eye-off"}
                size={25}
                color={THEME.COLORS.WHITE}
                onPress={() => setShowData((prev) => !prev)}
                style={{
                  marginRight: 24,
                }}
              />
              <Feather
                name="bell"
                size={25}
                color={THEME.COLORS.WHITE}
                style={{
                  marginRight: 16,
                }}
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: "#232428",
          },
        }}
      />
      <Tab.Screen
        name="Levantamentos"
        component={Requests}
        options={{
          tabBarIcon: ({ size, focused }) => {
            if (focused) {
              return (
                <Ionicons
                  name="ios-cash-outline"
                  size={size}
                  color={THEME.COLORS.WHITE}
                />
              );
            }

            return (
              <Ionicons
                name="ios-cash-outline"
                size={size}
                color={THEME.COLORS.GRAY}
              />
            );
          },
          tabBarLabel: ({ focused }) => {
            if (focused) {
              return (
                <Text style={{ color: THEME.COLORS.WHITE, fontSize: 14 }}>
                  Perfil
                </Text>
              );
            }

            return (
              <Text style={{ color: THEME.COLORS.GRAY, fontSize: 14 }}>
                Perfil
              </Text>
            );
          },
        }}
      />
      <Tab.Screen
        name="Notícias"
        component={screens.News}
        options={{
          tabBarIcon: ({ size, focused }) => {
            if (focused) {
              return (
                <FontAwesome
                  name="newspaper-o"
                  size={size}
                  color={THEME.COLORS.WHITE}
                />
              );
            }

            return (
              <FontAwesome
                name="newspaper-o"
                size={size}
                color={THEME.COLORS.GRAY}
              />
            );
          },
          tabBarLabel: ({ focused }) => {
            if (focused) {
              return (
                <Text style={{ color: THEME.COLORS.WHITE, fontSize: 14 }}>
                  News
                </Text>
              );
            }

            return (
              <Text style={{ color: THEME.COLORS.GRAY, fontSize: 14 }}>
                News
              </Text>
            );
          },
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ size, focused }) => {
            if (focused) {
              return (
                <Feather name="user" size={size} color={THEME.COLORS.WHITE} />
              );
            }

            return (
              <Feather name="user" size={size} color={THEME.COLORS.GRAY} />
            );
          },
          tabBarLabel: ({ focused }) => {
            if (focused) {
              return (
                <Text style={{ color: THEME.COLORS.WHITE, fontSize: 14 }}>
                  Perfil
                </Text>
              );
            }

            return (
              <Text style={{ color: THEME.COLORS.GRAY, fontSize: 14 }}>
                Perfil
              </Text>
            );
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
