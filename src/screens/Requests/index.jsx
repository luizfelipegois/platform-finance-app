import React, { useContext, useState } from "react";
import { TextInputMask } from "react-native-masked-text";
import {
  Actionsheet,
  useDisclose,
  NativeBaseProvider,
  Box,
  Text,
  HStack,
  Button,
} from "native-base";
import { Context } from "../../context";
import { registerWithdrawal } from "../../services/user";
import { jwtDecode } from "jwt-decode";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import THEME from "../../theme";
import { SecundaryButton } from "../../components/Buttons";
import HistoryScreen from '../HistoryScreen';
import OnOpenScreen from '../OnOpenScreen';

export default function Requests() {
  const [moneyValue, setMoneyValue] = useState("0,00");
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose, onToggle } = useDisclose();
  const { finance, tokenAuthentication, getUserData } = useContext(Context);

  async function registerNewWithdrawal() {
    setIsLoading(true);
    const token = tokenAuthentication;
    const { id } = jwtDecode(token);
    const { error } = await registerWithdrawal(id, token, moneyValue);
    setIsLoading(false);

    if (!error) {
      getUserData();
      onToggle();
      setMoneyValue("0,00");
    }
  }

  const Tab = createMaterialTopTabNavigator();

  return (
    <NativeBaseProvider>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: THEME.COLORS.WHITE,
          tabBarInactiveTintColor: THEME.COLORS.GRAY,
          tabBarStyle: {
            backgroundColor: THEME.COLORS.BLACK,
          },
          tabBarIndicatorStyle: {
            backgroundColor: THEME.COLORS.GRAY,
          },
        }}
      >
        <Tab.Screen name="Em Aberto" component={OnOpenScreen} />
        <Tab.Screen name="Histórico" component={HistoryScreen} />
      </Tab.Navigator>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content h={600} backgroundColor={THEME.COLORS.BLACK}>
          <Box w="100%" px={4} justifyContent="center">
            <Text
              w="80%"
              fontSize={THEME.SIZES.SUBTITLE}
              color={THEME.COLORS.WHITE}
              fontWeight="500"
            >
              Qual é o valor que você deseja retirar?
            </Text>
            <Text
              mt={2}
              w="100%"
              fontSize={THEME.SIZES.TEXT}
              color={THEME.COLORS.GRAY}
              fontWeight="400"
            >
              {finance
                ? `Saldo disponível para retirada R$ ${finance.available}`
                : "Consultando saldo disponível para retirada..."}
            </Text>
            <Box
              mt={6}
              flexDirection="row"
              borderColor={THEME.COLORS.GRAY}
              borderBottomWidth={1}
            >
              <Text
                fontSize={THEME.SIZES.TITLE}
                color={THEME.COLORS.WHITE}
                fontWeight="400"
                mr={2}
              >
                R$
              </Text>
              <TextInputMask
                type={"money"}
                style={{
                  fontSize: 30,
                  width: "85%",
                  color: THEME.COLORS.WHITE,
                  fontWeight: "500",
                }}
                options={{
                  precision: 2,
                  separator: ",",
                  delimiter: ".",
                  unit: "",
                  suffixUnit: "",
                }}
                value={moneyValue}
                onChangeText={setMoneyValue}
              />
            </Box>
            <Button
              style={{ backgroundColor: THEME.COLORS.BLUE }}
              mt={30}
              size="lg"
              isLoading={isLoading}
              onPress={registerNewWithdrawal}
              isDisabled={
                parseFloat(
                  moneyValue ? moneyValue.replace(/[,.]/g, "") : null
                ) >
                  parseFloat(
                    finance.available
                      ? finance.available.replace(/[,.]/g, "")
                      : null
                  ) ||
                parseFloat(
                  moneyValue ? moneyValue.replace(/[,.]/g, "") : null
                ) === 0
              }
            >
              Confirmar
            </Button>
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
      <HStack>
        <SecundaryButton
          text="Depositar"
          borderRadius={0.1}
          width="50%"
          backgroundColor={THEME.COLORS.BLUE}
        />
        <SecundaryButton
          text="Resgatar"
          borderRadius={0.1}
          onPressButton={onOpen}
          width="50%"
        />
      </HStack>
    </NativeBaseProvider>
  );
};
