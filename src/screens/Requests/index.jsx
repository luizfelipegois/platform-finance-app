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
import { Feather } from "@expo/vector-icons";

export default function Requests() {
  const [moneyValue, setMoneyValue] = useState("0,00");
  const [actionsheetTitle, setActionsheetTitle] = useState("");
  const [actionsheetText, setActionsheetText] = useState("");
  const [typeOfRequest, setTypeOfRequest] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose, onToggle } = useDisclose();
  const { finance, tokenAuthentication, getUserData } = useContext(Context);
  const [alert, setAlert] = useState({
    show: false,
    message: ""
  }); 

  async function registerNewWithdrawal(type) {
    setIsLoading(true);
    const token = tokenAuthentication;
    const { id } = jwtDecode(token);
    const {error, message} = await registerWithdrawal(id, token, moneyValue, type);
    setIsLoading(false);

    if (!error) {
      getUserData();
      onToggle();
      setMoneyValue("0,00");
      setAlert({show: false, message: ""});
    } else {
      setAlert({show: true, message});
    }
  }

  function onOpenActionsheet(type) {
    if (type === "deposit") {
      setActionsheetTitle("Qual é o valor que você deseja depositar?");
      setActionsheetText("O valor mínimo de depósito: R$ 1.000,00");
      setTypeOfRequest(type);
    }

    if (type === "withdrawal") {
      setTypeOfRequest(type);
      setActionsheetTitle("Qual é o valor que você deseja retirar?");
      setActionsheetText(
        finance
          ? `Saldo disponível para retirada: ${finance.available}`
          : "Consultando saldo disponível para retirada..."
      );
    }

    onOpen();
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
              {actionsheetTitle}
            </Text>
            <Text
              mt={2}
              w="100%"
              fontSize={THEME.SIZES.TEXT}
              color={THEME.COLORS.GRAY}
              fontWeight="400"
            >
              {actionsheetText}
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
            {
              alert.show && (
                <Box
                  backgroundColor={THEME.COLORS.RED}
                  mt={6}
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                  paddingLeft={2}
                  paddingRight={2}
                  paddingTop={2}
                  paddingBottom={2}
                  borderRadius={5}
                >
                  <Box
                    flexDirection="row"
                    alignItems="center"
                    width="80%"
                  >
                    <Feather name="alert-triangle" size={24} color="#B91C1B" />
                    <Text marginLeft={4}>{alert.message}</Text>
                  </Box>
                  <Feather name="x" size={24} color={THEME.COLORS.GRAY} onPress={() => setAlert({show: false, message: ""})} />
                </Box>
              )
            }
            <Button
              style={{ backgroundColor: THEME.COLORS.BLUE }}
              mt={6}
              size="lg"
              isLoading={isLoading}
              onPress={() => registerNewWithdrawal(typeOfRequest)}
              isDisabled={moneyValue === "0,00"}
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
          onPressButton={() => onOpenActionsheet("deposit")}
        />
        <SecundaryButton
          text="Resgatar"
          borderRadius={0.1}
          onPressButton={() => onOpenActionsheet("withdrawal")}
          width="50%"
        />
      </HStack>
    </NativeBaseProvider>
  );
};
