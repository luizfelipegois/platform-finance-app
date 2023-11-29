import React, { useContext, useState } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { View, useWindowDimensions } from "react-native";
import THEME from "../../theme";
import { TextInputMask } from "react-native-masked-text";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  Actionsheet,
  useDisclose,
  NativeBaseProvider,
  Button,
  Icon,
  Center,
  VStack,
  Skeleton,
  Box,
  Text,
  ScrollView,
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
      <ScrollView backgroundColor={THEME.COLORS.BLACK}>
        <Box flex="1" backgroundColor={THEME.COLORS.BLACK}>
          {loading ? (
            <Center w="100%">
              <VStack
                w="100%"
                space={4}
                overflow="hidden"
                rounded="md"
                marginTop="20px"
              >
                <Skeleton h="20" startColor={THEME.COLORS.BLACK_LIGHT} />
                <Skeleton h="20" startColor={THEME.COLORS.BLACK_LIGHT} />
                <Skeleton h="20" startColor={THEME.COLORS.BLACK_LIGHT} />
                <Skeleton h="20" startColor={THEME.COLORS.BLACK_LIGHT} />
                <Skeleton h="20" startColor={THEME.COLORS.BLACK_LIGHT} />
                <Skeleton h="20" startColor={THEME.COLORS.BLACK_LIGHT} />
                <Skeleton h="20" startColor={THEME.COLORS.BLACK_LIGHT} />
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
                    borderColor: THEME.COLORS.BLACK_LIGHT,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{
                        backgroundColor: THEME.COLORS.ALERT,
                        height: 40,
                        width: 40,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 50,
                      }}
                    >
                      <Feather
                        name="arrow-up-right"
                        size={25}
                        color={THEME.COLORS.BLACK_LIGHT}
                      />
                    </View>
                    <View style={{ marginLeft: 15 }}>
                      <Text fontWeight={500} fontSize={THEME.SIZES.TEXT} color={THEME.COLORS.WHITE}>{`R$ ${value}`}</Text>
                      <Text
                        color={THEME.COLORS.GRAY}
                        fontSize={14}
                        marginTop={1}
                        fontWeight={400}
                      >
                        {date}
                      </Text>
                    </View>
                  </View>
                  <Text fontWeight={400} fontSize={THEME.SIZES.TEXT} color={THEME.COLORS.ALERT}>Processando</Text>
                </View>
              ))
          ) : (
            <Box
              alignItems="center"
              justifyContent="center"
              mt={50}
            >
              <Ionicons
                name="ios-newspaper-outline"
                size={80}
                color={THEME.COLORS.GRAY}
              />
              <Text color={THEME.COLORS.WHITE} fontSize={THEME.SIZES.SUBTITLE} textAlign="center" fontWeight="700">
                Nenhum resgate encontrado
              </Text>
              <Text color={THEME.COLORS.GRAY} fontSize={THEME.SIZES.TEXT} fontWeight="400" w="80%" textAlign="center">
                Para realizar um novo resgate clique no botão abaixo
              </Text>
            </Box>
          )}
        </Box>
      </ScrollView>
    );
  };

  const historicRoute = () => {
    return (
      <ScrollView backgroundColor={THEME.COLORS.BLACK}>
        <Box flex="1" backgroundColor={THEME.COLORS.BLACK}>
          {loading ? (
            <Center w="100%">
              <VStack
                w="100%"
                space={4}
                overflow="hidden"
                rounded="md"
                marginTop="20px"
              >
                <Skeleton h="20" startColor={THEME.COLORS.BLACK_LIGHT} />
                <Skeleton h="20" startColor={THEME.COLORS.BLACK_LIGHT} />
                <Skeleton h="20" startColor={THEME.COLORS.BLACK_LIGHT} />
                <Skeleton h="20" startColor={THEME.COLORS.BLACK_LIGHT} />
                <Skeleton h="20" startColor={THEME.COLORS.BLACK_LIGHT} />
                <Skeleton h="20" startColor={THEME.COLORS.BLACK_LIGHT} />
                <Skeleton h="20" startColor={THEME.COLORS.BLACK_LIGHT} />
              </VStack>
            </Center>
          ) : withdrawals.find(({ status }) => status === "concluded" || status === "refused") ? (
            withdrawals
              .filter(({ status }) => status === "concluded" || status === "refused")
              .map(({ id, value, date, status }) => (
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
                    borderColor: THEME.COLORS.BLACK_LIGHT,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{
                        backgroundColor: status === "concluded" ? THEME.COLORS.SUCCESS : THEME.COLORS.RED,
                        height: 40,
                        width: 40,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 50,
                      }}
                    >
                      <Feather
                        name="arrow-up-right"
                        size={25}
                        color={THEME.COLORS.BLACK_LIGHT}
                      />
                    </View>
                    <View style={{ marginLeft: 15 }}>
                      <Text fontWeight={500} fontSize={THEME.SIZES.TEXT} color={THEME.COLORS.WHITE}>{`R$ ${value}`}</Text>
                      <Text
                        color={THEME.COLORS.GRAY}
                        fontSize={14}
                        marginTop={1}
                        fontWeight={400}
                      >
                        {date}
                      </Text>
                    </View>
                  </View>
                  <Text fontWeight={400} fontSize={THEME.SIZES.TEXT} color={status === "concluded" ? THEME.COLORS.SUCCESS : THEME.COLORS.RED}>{status === "concluded" ? "Concluído" : "Recusado"}</Text>
                </View>
              ))
          ) : (
            <Box
              alignItems="center"
              justifyContent="center"
              mt={50}
            >
              <Ionicons
                name="ios-newspaper-outline"
                size={80}
                color={THEME.COLORS.GRAY}
              />
              <Text color={THEME.COLORS.WHITE} fontSize={THEME.SIZES.SUBTITLE} fontWeight="700">
                Histórico vazio
              </Text>
              <Text color={THEME.COLORS.GRAY} fontSize={THEME.SIZES.TEXT} fontWeight="400" w="80%" textAlign="center">
                No momento você não possui histórico de levantamentos
              </Text>
            </Box>
          )}
        </Box>
      </ScrollView>
    );
  };

  const renderScene = SceneMap({
    opened: openedRoute,
    historic: historicRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: THEME.COLORS.GRAY }}
      style={{ backgroundColor: THEME.COLORS.BLACK }}
      labelStyle={{ color: THEME.COLORS.TEXT, fontSize: 14 }}
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
                  fontWeight: "500"
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
                parseFloat(moneyValue ? moneyValue.replace(/[,.]/g, "") : null) >
                  parseFloat(finance.available ? finance.available.replace(/[,.]/g, "") : null) ||
                parseFloat(moneyValue ? moneyValue.replace(/[,.]/g, "") : null) === 0
              }
            >
              Confirmar
            </Button>
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
      <Button
        onPress={onOpen}
        backgroundColor={THEME.COLORS.BLACK_LIGHT}
        borderRadius={0}
        size="lg"
        startIcon={
          <Feather
            name="arrow-up-right"
            size={25}
            color={THEME.COLORS.WHITE}
          />
        }
      >Resgatar</Button>
    </NativeBaseProvider>
  );
}
