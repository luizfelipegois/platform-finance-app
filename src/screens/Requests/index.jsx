import React, { useContext, useState } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { View, useWindowDimensions } from "react-native";
import { Text, SubTitle } from "./Styled";
import THEME from "../../theme";
import { TextInputMask } from "react-native-masked-text";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  Actionsheet,
  useDisclose,
  NativeBaseProvider,
  Button,
  Icon,
  Center,
  VStack,
  Skeleton,
} from "native-base";
import { Context } from "../../context";
import { registerWithdrawal } from "../../services/user";
import { jwtDecode } from "jwt-decode";

export default function Requests() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [moneyValue, setMoneyValue] = useState("0,00");
  const [isLoading, setIsLoading] = useState(false);
  const [routes] = useState([
    { key: "opened", title: "Em Aberto" },
    { key: "historic", title: "Histórico" },
  ]);
  const { isOpen, onOpen, onClose, onToggle } = useDisclose();
  const { withdrawals, finance, tokenAuthentication, getUserData, loading } =
    useContext(Context);

  const openedRoute = () => {
    return (
      <View style={{ flex: "1", backgroundColor: THEME.COLORS.BACKGROUND }}>
        {loading ? (
          <Center w="100%">
            <VStack
              w="100%"
              space={4}
              overflow="hidden"
              rounded="md"
              marginTop="20px"
            >
              <Skeleton h="20" startColor={THEME.COLORS.CARDS} />
              <Skeleton h="20" startColor={THEME.COLORS.CARDS} />
              <Skeleton h="20" startColor={THEME.COLORS.CARDS} />
              <Skeleton h="20" startColor={THEME.COLORS.CARDS} />
            </VStack>
          </Center>
        ) : withdrawals.find(({ status }) => status === "pending") ? (
          withdrawals
            .filter(({ status }) => status === "pending")
            .map(({ id, value, date }) => (
              <View
                key={id}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingTop: 25,
                  paddingBottom: 25,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderBottomWidth: 1,
                  alignItems: "center",
                  borderColor: THEME.COLORS.CARDS,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      backgroundColor: "#F4F8DB",
                      height: 35,
                      width: 35,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 50,
                    }}
                  >
                    <Feather
                      name="arrow-up-right"
                      size={20}
                      color={THEME.COLORS.CARDS}
                    />
                  </View>
                  <View style={{ marginLeft: 15 }}>
                    <Text>{`R$ ${value}`}</Text>
                    <Text
                      style={{
                        color: THEME.COLORS.SECUNDARY,
                        fontSize: 14,
                        marginTop: 5,
                      }}
                    >
                      {date}
                    </Text>
                  </View>
                </View>
                <Text style={{ color: THEME.COLORS.ALERT }}>Processando</Text>
              </View>
            ))
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: "1",
            }}
          >
            <Ionicons
              name="ios-newspaper-outline"
              size={80}
              color={THEME.COLORS.SECUNDARY}
            />
            <SubTitle style={{ width: "100%", textAlign: "center" }}>
              Sem dados
            </SubTitle>
            <Text
              style={{ textAlign: "center", color: THEME.COLORS.SECUNDARY }}
            >
              No momento você não possui levantamentos em andamento
            </Text>
          </View>
        )}
      </View>
    );
  };

  const historicRoute = () => {
    return (
      <View style={{ flex: "1", backgroundColor: THEME.COLORS.BACKGROUND }}>
        {loading ? (
          <Center w="100%">
            <VStack
              w="100%"
              space={4}
              overflow="hidden"
              rounded="md"
              marginTop="20px"
            >
              <Skeleton h="20" startColor={THEME.COLORS.CARDS} />
              <Skeleton h="20" startColor={THEME.COLORS.CARDS} />
              <Skeleton h="20" startColor={THEME.COLORS.CARDS} />
              <Skeleton h="20" startColor={THEME.COLORS.CARDS} />
            </VStack>
          </Center>
        ) : withdrawals.find(({ status }) => status === "concluded") ? (
          withdrawals
            .filter(({ status }) => status === "concluded")
            .map(({ id, value, date }) => (
              <View
                key={id}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingTop: 25,
                  paddingBottom: 25,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderBottomWidth: 1,
                  alignItems: "center",
                  borderColor: THEME.COLORS.CARDS,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      backgroundColor: "#F4F8DB",
                      height: 35,
                      width: 35,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 50,
                    }}
                  >
                    <Feather
                      name="arrow-up-right"
                      size={20}
                      color={THEME.COLORS.CARDS}
                    />
                  </View>
                  <View style={{ marginLeft: 15 }}>
                    <Text>{`R$ ${value}`}</Text>
                    <Text
                      style={{
                        color: THEME.COLORS.SECUNDARY,
                        fontSize: 14,
                        marginTop: 5,
                      }}
                    >
                      {date}
                    </Text>
                  </View>
                </View>
                <Text style={{ color: THEME.COLORS.SUCCESS }}>Concluído</Text>
              </View>
            ))
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              flex: "1",
            }}
          >
            <MaterialCommunityIcons
              name="history"
              size={80}
              color={THEME.COLORS.SECUNDARY}
            />
            <SubTitle style={{ width: "100%", textAlign: "center" }}>
              Histórico vazio
            </SubTitle>
            <Text
              style={{ textAlign: "center", color: THEME.COLORS.SECUNDARY }}
            >
              Você ainda não possui registros de levantamentos
            </Text>
          </View>
        )}
      </View>
    );
  };

  const renderScene = SceneMap({
    opened: openedRoute,
    historic: historicRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: THEME.COLORS.SECUNDARY }}
      style={{ backgroundColor: THEME.COLORS.BACKGROUND }}
      labelStyle={{ color: THEME.COLORS.TEXT, fontSize: 12 }}
    />
  );

  async function registerNewWithdrawal() {
    setIsLoading(true);
    const token = tokenAuthentication;
    const { id } = jwtDecode(token);
    const { error } = await registerWithdrawal(id, token, moneyValue);
    setIsLoading(false);

    if (!error) {
      getUserData();
      onToggle();
    }
  }

  return (
    <NativeBaseProvider>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
      {finance && (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content h={600} backgroundColor="#101010">
            <View
              style={{
                flex: "1",
                width: "100%",
                padding: 10,
                paddingTop: 30,
              }}
            >
              <SubTitle>Qual é o valor você deseja retirar?</SubTitle>
              <Text style={{ color: "#505050" }}>
                {finance
                  ? `Saldo disponível para retirada R$ ${finance.available}`
                  : "Consultando saldo disponível para retirada..."}
              </Text>
              <View
                style={{
                  borderColor: "#505050",
                  borderBottomWidth: 1,
                  padding: 1,
                  fontSize: 32,
                  flexDirection: "row",
                  justifyContent: "start",
                  alignItems: "center",
                  marginTop: 30,
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    marginRight: 10,
                  }}
                >
                  R$
                </Text>
                <TextInputMask
                  type={"money"}
                  style={{
                    fontSize: 30,
                    width: "85%",
                    color: THEME.COLORS.TEXT,
                  }}
                  options={{
                    precision: 2, // Número de casas decimais
                    separator: ",", // Separador de milhares
                    delimiter: ".", // Separador de decimal
                    unit: "", // Símbolo da moeda ou unidade
                    suffixUnit: "", // Sufixo da unidade
                  }}
                  value={moneyValue}
                  onChangeText={setMoneyValue}
                />
              </View>
              <Button
                style={{ backgroundColor: THEME.COLORS.PRIMARY }}
                mt={30}
                size="lg"
                isLoading={isLoading}
                onPress={registerNewWithdrawal}
                isDisabled={
                  parseFloat(moneyValue.replace(/[,.]/g, "")) >
                    parseFloat(finance.available.replace(/[,.]/g, "")) ||
                  parseFloat(moneyValue.replace(/[,.]/g, "")) === 0
                }
              >
                Confirmar
              </Button>
            </View>
          </Actionsheet.Content>
        </Actionsheet>
      )}
      <Button
        onPress={onOpen}
        style={{
          borderRadius: 0,
          backgroundColor: THEME.COLORS.PRIMARY,
        }}
        startIcon={<Icon as={Ionicons} name="md-add-outline" size={26} />}
      ></Button>
    </NativeBaseProvider>
  );
}
