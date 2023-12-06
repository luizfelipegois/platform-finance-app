import React, { useContext, useEffect, useState } from "react";
import { Box, NativeBaseProvider, Skeleton, VStack, Switch } from "native-base";
import { Feather } from "@expo/vector-icons";
import { Alert, ScrollView, View, RefreshControl } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { ListItem } from "./Styled";
import THEME from "../../theme";
import { Context } from "../../context";
import Text from "../../components/Text";
import SubTitle from "../../components/SubTitle";

const UserInfo = ({ loading, user }) => {
  if (loading || !user.name) {
    return (
      <VStack w="100%" h={150} alignItems="center" justifyContent="center">
        <Skeleton h="10" w="80%" startColor={THEME.COLORS.BLACK_LIGHT} />
        <Skeleton h="5" w="80%" mt={5} startColor={THEME.COLORS.BLACK_LIGHT} />
      </VStack>
    );
  }

  return (
    <>
      <SubTitle text={user.name} />
      <Text color={THEME.COLORS.GRAY} marginTop={5} text={user.email} />
    </>
  );
};

const ProfileListItem = ({ id, icon, text, onPress, show, isEnabled }) =>
  show && (
    <ListItem key={id} onPress={() => onPress && onPress()}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Feather
          name={icon}
          size={25}
          color={id === 4 ? THEME.COLORS.RED : THEME.COLORS.WHITE}
          marginRight={10}
        />
        <Text
          fontWeight={500}
          text={text}
          color={id === 4 && THEME.COLORS.RED}
        />
      </View>
      {id === 0 && (
        <Switch
          trackColor={{
            false: THEME.COLORS.BLACK_LIGHT,
            true: THEME.COLORS.GREEN,
          }}
          thumbColor={isEnabled ? THEME.COLORS.WHITE : THEME.COLORS.WHITE}
          ios_backgroundColor={THEME.COLORS.BLACK_LIGHT}
          value={isEnabled}
        />
      )}
      {id !== 4 && id !== 0 && (
        <Feather name="chevron-right" size={22} color={THEME.COLORS.WHITE} />
      )}
    </ListItem>
  );

export default function Profile() {
  const { signOut, user, loading, getUserData } = useContext(Context);
  const [type, setType] = useState("");
  const [isCompatible, setIsCompatible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const datas = [
    {
      id: 0,
      icon: "key",
      text: `Ativar ${type}`,
      show: isCompatible,
      onPress: () => toggleSwitch(),
    },
    {
      id: 1,
      icon: "at-sign",
      text: "Alterar Email",
      onPress: () => navigateTo("Alterar Email", user.email),
      show: true,
    },
    {
      id: 2,
      icon: "lock",
      text: "Alterar Senha",
      onPress: () => navigateTo("Alterar Senha", user.email),
      show: true,
    },
    {
      id: 3,
      icon: "phone",
      text: "Alterar Phone",
      onPress: () => navigateTo("Alterar Phone", user.email),
      show: true,
    },
    {
      id: 4,
      icon: "log-out",
      text: "Encerrar Sessão",
      onPress: signOut,
      show: true,
    },
  ];

  const navigateTo = (screen, condition) => {
    if (condition) {
      navigation.navigate(screen);
    }
  };

  const verifyAvailableAuthentication = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    const typeArray = types.map(
      (type) => LocalAuthentication.AuthenticationType[type]
    );

    if (compatible) setIsCompatible(compatible);
    if (typeArray) setType(typeArray[0]);
  };

  const toggleSwitch = async () => {
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!isBiometricEnrolled) {
      Alert.alert(
        "Nenhuma Biometria Encontrada",
        "Antes de ativar essa função, verifique se o dispositivo possui alguma biometria cadastrada."
      );
    } else {
      setIsEnabled((prev) => !prev);
      await AsyncStorage.setItem(
        "authenticationActivated",
        JSON.stringify(!isEnabled)
      );
    }
  };

  const checkAuthenticationStatus = async () => {
    const status = await AsyncStorage.getItem("authenticationActivated");
    setIsEnabled(status === "true");
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getUserData();
    }, 1000);
  };

  useEffect(() => {
    verifyAvailableAuthentication();
    checkAuthenticationStatus();
  }, []);

  return (
    <NativeBaseProvider>
      <Box flex="1" backgroundColor={THEME.COLORS.BLACK}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={THEME.COLORS.WHITE}
            />
          }
        >
          <View
            style={{
              alignItems: "center",
              height: 150,
              justifyContent: "center",
            }}
          >
            <UserInfo loading={loading} user={user} />
          </View>
          <View style={{ marginTop: 50, width: "100%" }}>
            {datas.map((item) => (
              <ProfileListItem key={item.id} isEnabled={isEnabled} {...item} />
            ))}
          </View>
        </ScrollView>
      </Box>
    </NativeBaseProvider>
  );
}
