import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { Text } from "react-native";
import screens from '../screens';
import theme from '../theme';
import { Context } from "../context";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  const { getUserData } = useContext(Context);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.COLORS.BACKGROUND,
          shadowOpacity: 0,
        },
        headerTintColor: theme.COLORS.TEXT,
        tabBarStyle: {
          backgroundColor: theme.COLORS.BACKGROUND,
          borderTopColor: theme.COLORS.BACKGROUND,
          elevation: 0,
          position: "absolute",
          bottom: 0,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Investimentos"
        component={ screens.Home }
        options={{
          tabBarIcon: ({ size, focused }) => {
            if(focused) {
              return <Feather name="bar-chart-2" size={size} color="#f2f2f2" />
            }

            return <Feather name="bar-chart-2" size={size} color="#505050" />
          },
          tabBarLabel: ({ focused }) => {
            if(focused) {
              return <Text style={{color: "#f2f2f2", fontSize: 14}}>Investimentos</Text>
            }

            return <Text style={{color: "#505050", fontSize: 14}}>Investimentos</Text>
          },
        }}
      />
      <Tab.Screen
        name="Notícias"
        component={ screens.News }
        options={{
          tabBarIcon: ({ size, focused }) => {
            if(focused) {
              return <FontAwesome name="newspaper-o" size={size} color="#f2f2f2" />
            }

            return <FontAwesome name="newspaper-o" size={size} color="#505050" />
          },
          tabBarLabel: ({ focused}) => {
            if(focused) {
              return <Text style={{color: "#f2f2f2", fontSize: 14}}>News</Text>
            }

            return <Text style={{color: "#505050", fontSize: 14}}>News</Text>
          }
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ screens.Profile }
        options={{
          tabBarIcon: ({ size, focused }) => {
            if(focused) {
              return <Feather name="user" size={size} color="#f2f2f2" />
            }

            return <Feather name="user" size={size} color="#505050" />
          },
          tabBarLabel: ({ focused}) => {
            if(focused) {
              return <Text style={{color: "#f2f2f2", fontSize: 14}}>Perfil</Text>
            }

            return <Text style={{color: "#505050", fontSize: 14}}>Perfil</Text>
          }
        }}
      />
    </Tab.Navigator>
  );
};
