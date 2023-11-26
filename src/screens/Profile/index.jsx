import React, { useContext, useEffect, useState } from "react";
import { Center, NativeBaseProvider, Skeleton, VStack } from "native-base";
import { Feather } from '@expo/vector-icons';
import THEME from '../../theme';
import { Context } from '../../context';
import { SubTitle, ListItem, Text } from './Styled';
import { Alert, ScrollView, Switch, View, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const { signOut, user, loading, getUserData } = useContext(Context);
  const [type, setType] = useState('');
  const [isCompatible, setIsCompatible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const datas = [
    {
      id: 0,
      icon: 'key',
      text: `Ativar ${type}`,
      show: isCompatible,
    },
    {
      id: 1,
      icon: 'at-sign',
      text: 'Alterar Email',
      onPress: () => navigation.navigate("Alterar Email"),
      show: true,
    },
    {
      id: 2,
      icon: 'lock',
      text: 'Alterar Senha',
      onPress: () => navigation.navigate("Alterar Senha"),
      show: true,
    },
    {
      id: 3,
      icon: 'phone',
      text: 'Alterar Phone',
      onPress: () => navigation.navigate("Alterar Phone"),
      show: true,
    },
    {
      id: 4,
      icon: 'log-out',
      text: 'Encerrar Sessão',
      onPress: signOut,
      show: true,
    }
  ]

  async function verifyAvaiableAuthentication() {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    const typeArray = types.map((type => LocalAuthentication.AuthenticationType[type]));

    if (compatible) setIsCompatible(compatible);
    if(typeArray) setType(typeArray[0]);
  }

  async function toggleSwitch () {
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();

    if(!isBiometricEnrolled) {
      Alert.alert('Nenhuma Biometria Encontrada', 'Antes de ativar essa função, verifique se o dispositivo possui alguma biometria cadastrada.');
    } else {
      setIsEnabled(previousState => !previousState);
      await AsyncStorage.setItem("authenticantionActivated", JSON.stringify(!isEnabled));
    }
  };

  async function checkAuthenticationStatus() {
    const status = await AsyncStorage.getItem("authenticantionActivated");

    if(status === "true") {
      setIsEnabled(true);
    } else {
      setIsEnabled(false);
    };
  };

  useEffect(() => {
    verifyAvaiableAuthentication();
    checkAuthenticationStatus();
  }, []);

  return (
    <View style={{flex: "1", backgroundColor: THEME.COLORS.BACKGROUND}}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              setTimeout(() => {
                setRefreshing(false);
                getUserData();
              }, 1000);
            }}
            tintColor={THEME.COLORS.TEXT}
          />
        }
      >
        <NativeBaseProvider>
          <Center bg={THEME.COLORS.BACKGROUND} flex={1} alignItems="center" justifyContent="start">
            {
              loading ? (
                <Center w="100%">
                  <VStack w="80%" space={3} overflow="hidden" rounded="md" marginTop="50px">
                    <Skeleton h="10" startColor={THEME.COLORS.CARDS} />
                    <Skeleton m="auto" w="50%" h="5" startColor={THEME.COLORS.CARDS} />
                  </VStack>
                </Center>
              ) : (
                <View style={{alignItems: "center", marginTop: 50}}>
                  <SubTitle>{user.name}</SubTitle>
                  <Text style={{marginTop: 5}}>{user.email}</Text>
                </View>
              )
            }
            <View style={{marginTop: 50, width: "100%"}}>
              {
                datas.map(({id, icon, text, onPress, show}) => (
                  show && (
                    <ListItem key={id} onPress={onPress}>
                      <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Feather name={icon} size={22} color={id === 4 ? THEME.COLORS.ALERT : "#f2f2f2"} />
                        <Text style={{color: id === 4 ? THEME.COLORS.ALERT : "#f2f2f2", marginLeft: 10}}>{text}</Text>
                      </View>
                      {
                        id === 0 && 
                          <Switch
                            trackColor={{false: THEME.COLORS.SECUNDARY, true: THEME.COLORS.SUCCESS}}
                            thumbColor={isEnabled ? THEME.COLORS.TEXT : THEME.COLORS.TEXT}
                            ios_backgroundColor={THEME.COLORS.SECUNDARY}
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                          />
                      }
                      {
                        (id !== 4 && id !== 0) && <Feather name="chevron-right" size={22} color="white"/>
                      }
                    </ListItem>
                  )
                ))
              }
            </View>
          </Center>
        </NativeBaseProvider>
      </ScrollView>
    </View>
  )
}