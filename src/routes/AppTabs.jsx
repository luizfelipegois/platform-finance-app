import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Text, View } from "react-native";
import screens from '../screens';
import ProfileStack from "./ProfileStack";
import THEME from '../theme';
import { Context } from "../context";
import Requests from "../screens/Requests";

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
          backgroundColor: THEME.COLORS.BACKGROUND,
          shadowOpacity: 0,
        },
        headerTintColor: THEME.COLORS.TEXT,
        headerTitleStyle: {
          fontSize: 24
        },
        tabBarStyle: {
          backgroundColor: THEME.COLORS.BACKGROUND,
          borderTopColor: THEME.COLORS.BACKGROUND,
        },
        tabBarShowLabel: false,
        headerTitleAlign: "left",
        headerShadowVisible: false
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
          headerRight: () => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: THEME.COLORS.CARDS,
                borderRadius: 50,
                padding: 5,
                marginRight: 10
              }}
            >
              <Ionicons
                onPress={() => setShowData((prev) => !prev)}
                name={showData ? "ios-eye-outline" : "ios-eye-off-outline"}
                size={26}
                color="#f2f2f2"
              />
            </View>
          )
        }}
      />
      <Tab.Screen
        name="Levantamentos"
        component={ Requests }
        options={{
          tabBarIcon: ({ size, focused }) => {
            if(focused) {
              return<Ionicons name="ios-cash-outline" size={size} color="#f2f2f2" />
            }

            return <Ionicons name="ios-cash-outline" size={size} color="#505050" />
          },
          tabBarLabel: ({ focused}) => {
            if(focused) {
              return <Text style={{color: "#f2f2f2", fontSize: 14}}>Perfil</Text>
            }

            return <Text style={{color: "#505050", fontSize: 14}}>Perfil</Text>
          },
          headerShown: true
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
        component={ ProfileStack }
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
          },
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
};
