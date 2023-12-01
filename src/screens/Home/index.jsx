import React, { useContext, useState } from "react";
import { Container, Title, SubTitle, Text, Column, RowText } from "./Styled";
import { RefreshControl, ScrollView, Dimensions, View } from "react-native";
import { Context } from "../../context";
import { PieChart } from "react-native-chart-kit";
import uuid from "react-native-uuid";
import THEME from "../../theme";
import {
  Button,
  Center,
  HStack,
  NativeBaseProvider,
  Skeleton,
  VStack,
} from "native-base";
import { Feather } from "@expo/vector-icons";

export default function Home() {
  const { loading, getUserData, finance, showData } = useContext(Context);
  const [refreshing, setRefreshing] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  chartConfig = {
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };

  const detailsData = [
    {
      id: 0,
      text: "Total de depósitos",
      value: finance.deposits
        ? parseFloat(finance.deposits.replace(/\./g, ""))
        : "",
    },
    {
      id: 1,
      text: "Total de retiradas",
      value: parseFloat(finance.withdrawals),
    },
    {
      id: 2,
      text: "Lucro Bruto",
      value:
        parseFloat(finance.balance) * 1000 -
        parseFloat(finance.deposits) * 1000,
    },
    {
      id: 3,
      text: "Lucro Líquido",
      value:
        (parseFloat(finance.balance) * 1000 -
          parseFloat(finance.deposits) * 1000) *
        0.75,
    },
  ];

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setScrollPosition(offsetY);
  };

  const getBackgroundColor = () => {
    const threshold = 100;

    return scrollPosition > threshold ? "#050505" : "#232428";
  };

  return (
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
          tintColor={THEME.COLORS.WHITE}
        />
      }
      style={{ backgroundColor: getBackgroundColor() }}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      <Container>
        <NativeBaseProvider>
          <View
            style={{
              backgroundColor: "#232428",
              height: 250,
              justifyContent: "center",
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 25,
                height: 70,
              }}
            >
              {finance.progress && !loading ? (
                <>
                  <Text
                    style={{
                      marginBottom: 5,
                      fontWeight: 500,
                      color: THEME.COLORS.GRAY,
                    }}
                  >
                    Balanço
                  </Text>
                  <Title>
                    {showData ? `R$ ${finance.balance}` : "R$ **********"}
                  </Title>
                </>
              ) : (
                <VStack w="100%" alignItems="center" space={3} rounded="md">
                  <Skeleton
                    h="5"
                    w="50%"
                    startColor={THEME.COLORS.BLACK_LIGHT}
                  />
                  <Skeleton h="10" w="70%" startColor={THEME.COLORS.BLACK_LIGHT} />
                </VStack>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Button
                  backgroundColor="#2d2e33"
                  borderRadius={50}
                  h={60}
                  w={60}
                  mb={2}
                >
                  <Feather name="repeat" size={25} color={THEME.COLORS.WHITE} />
                </Button>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: THEME.COLORS.WHITE,
                  }}
                >
                  Currrency
                </Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  marginLeft: 40,
                  marginRight: 40,
                }}
              >
                <Button
                  backgroundColor="#475AA8"
                  borderRadius={50}
                  h={60}
                  w={60}
                  mb={2}
                >
                  <Feather
                    name="arrow-down-left"
                    size={25}
                    color={THEME.COLORS.WHITE}
                  />
                </Button>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: THEME.COLORS.WHITE,
                  }}
                >
                  Depositar
                </Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Button
                  backgroundColor="#2d2e33"
                  borderRadius={50}
                  h={60}
                  w={60}
                  mb={2}
                >
                  <Feather
                    name="arrow-up-right"
                    size={25}
                    color={THEME.COLORS.WHITE}
                  />
                </Button>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: THEME.COLORS.WHITE,
                  }}
                >
                  Resgatar
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              paddingLeft: 15,
              paddingRight: 15,
              height: 300,
              justifyContent: "center",
              borderColor: THEME.COLORS.BLACK_LIGHT,
              borderBottomWidth: 1,
            }}
          >
            {finance.progress && !loading ? (
              <>
                <SubTitle style={{ marginBottom: 10 }}>Porcentagens</SubTitle>
                <PieChart
                  data={[
                    {
                      name: "Depósito",
                      population: parseFloat(finance.balance) * 1000,
                      color: "#F7C548",
                      legendFontColor: "silver",
                      legendFontSize: 14,
                    },
                    {
                      name: "Retiradas",
                      population: parseFloat(finance.withdrawals) * 1000,
                      color: "#A22522",
                      legendFontColor: "silver",
                      legendFontSize: 14,
                    },
                    {
                      name: "Luiz",
                      population:
                        parseFloat(finance.balance) * 1000 -
                        parseFloat(finance.deposits) * 1000 -
                        (parseFloat(finance.balance) * 1000 -
                          parseFloat(finance.deposits) * 1000) *
                          0.75,
                      color: "#505050",
                      legendFontColor: "silver",
                      legendFontSize: 14,
                    },
                    {
                      name: "P/L",
                      population:
                        (parseFloat(finance.balance) * 1000 -
                          parseFloat(finance.deposits) * 1000) *
                        0.75,
                      color: "#2A7F62",
                      legendFontColor: "silver",
                      legendFontSize: 14,
                    },
                  ]}
                  width={Dimensions.get("window").width}
                  height={200}
                  chartConfig={chartConfig}
                  accessor={"population"}
                  backgroundColor="transparent"
                />
              </>
            ) : (
              <VStack w="100%">
                <Skeleton
                  mb={5}
                  w="60%"
                  h="10"
                  startColor={THEME.COLORS.BLACK_LIGHT}
                />
                <HStack w="100%">
                  <Skeleton
                    size="160"
                    rounded="full"
                    startColor={THEME.COLORS.BLACK_LIGHT}
                    mr={10}
                  />
                  <VStack space={3} w="80%">
                    <Skeleton h="7" startColor={THEME.COLORS.BLACK_LIGHT} />
                    <Skeleton h="7" startColor={THEME.COLORS.BLACK_LIGHT} />
                    <Skeleton h="7" startColor={THEME.COLORS.BLACK_LIGHT} />
                    <Skeleton h="7" startColor={THEME.COLORS.BLACK_LIGHT} />
                  </VStack>
                </HStack>
              </VStack>
            )}
          </View>
          <View
            style={{
              paddingLeft: 15,
              paddingRight: 15,
              height: 400,
              justifyContent: "center",
              borderColor: THEME.COLORS.BLACK_LIGHT,
              borderBottomWidth: 1,
            }}
          >
            {finance.progress && !loading ? (
              <>
                <SubTitle style={{ marginBottom: 10 }}>Detalhes</SubTitle>
                {detailsData.map(({ id, text, value }) => (
                  <View style={{ marginTop: 20 }} key={id}>
                    <Text style={{ color: THEME.COLORS.GRAY }}>{text}</Text>
                    <Text
                      style={{
                        color: THEME.COLORS.WHITE,
                        fontWeight: "500",
                        marginTop: 5,
                        fontSize: 18,
                      }}
                    >
                      {showData
                        ? value.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })
                        : "R$ ********"}
                    </Text>
                  </View>
                ))}
              </>
            ) : (
              <Skeleton
                w="100%"
                h="300"
                startColor={THEME.COLORS.BLACK_LIGHT}
                rounded="md"
              />
            )}
          </View>
          <View
            style={{
              justifyContent: "center",
              borderColor: THEME.COLORS.BLACK_LIGHT,
              borderBottomWidth: 1,
            }}
          >
            {finance.progress && !loading ? (
              <>
                <SubTitle
                  style={{ marginBottom: 10, marginTop: 50, marginLeft: 15 }}
                >
                  Histórico
                </SubTitle>
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: THEME.COLORS.BLACK_LIGHT,
                    borderRadius: 5,
                    paddingTop: 10,
                    paddingBottom: 10,
                    marginTop: 20,
                  }}
                >
                  <Column>Mês</Column>
                  <Column>CDI</Column>
                  <Column>FOREX</Column>
                  <Column>Status</Column>
                </View>
                <View>
                  {finance.progress.map(({ name, CDI, Forex, status }) => (
                    <View
                      key={uuid.v4()}
                      style={{
                        flexDirection: "row",
                        paddingTop: 15,
                        paddingBottom: 15,
                        borderBottomWidth: 1,
                        borderColor: THEME.COLORS.BLACK_LIGHT,
                      }}
                    >
                      <RowText>{name}</RowText>
                      <RowText>
                        {showData
                          ? parseFloat(CDI).toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })
                          : "******"}
                      </RowText>
                      <RowText>
                        {showData
                          ? parseFloat(Forex).toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })
                          : "******"}
                      </RowText>
                      <RowText
                        style={{
                          color:
                            status === "progress"
                              ? THEME.COLORS.ALERT
                              : THEME.COLORS.SUCCESS,
                        }}
                      >
                        {status === "progress" ? "Pendente" : "Concluído"}
                      </RowText>
                    </View>
                  ))}
                </View>
              </>
            ) : (
              <VStack
                mt={50}
                mb={50}
                w="100%"
                space={3}
                overflow="hidden"
                rounded="md"
              >
                <Skeleton
                  h="10"
                  w="30%"
                  startColor={THEME.COLORS.BLACK_LIGHT}
                />
                <Skeleton h="10" startColor={THEME.COLORS.BLACK_LIGHT} />
                <Skeleton h="10" startColor={THEME.COLORS.BLACK_LIGHT} />
                <Skeleton h="10" startColor={THEME.COLORS.BLACK_LIGHT} />
              </VStack>
            )}
          </View>
        </NativeBaseProvider>
      </Container>
    </ScrollView>
  );
}
