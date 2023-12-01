import React, { useContext, useEffect, useState } from "react";
import { Container, Title, SubTitle, Text, Column, RowText } from "./Styled";
import { RefreshControl, ScrollView, Dimensions, View } from "react-native";
import { Context } from "../../context";
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
import { VictoryPie } from "victory-native";

export default function Home() {
  const { loading, getUserData, finance, showData } = useContext(Context);
  const [refreshing, setRefreshing] = useState(false);

  const detailsData = [
    {
      id: 0,
      label: "Depósitos",
      description: "Total de depósitos",
      value: finance.deposits
        ? parseFloat(finance.deposits.replace(/\./g, ""))
        : "",
      icon: "arrow-down-left",
      color: "#6001FF",
    },
    {
      id: 1,
      label: "Levantamentos",
      description: "Total de levantamentos",
      value: parseFloat(finance.withdrawals),
      icon: "arrow-up-right",
      color: "#FF4F4E",
    },
    {
      id: 2,
      label: "Lucro Bruto",
      description: "Rendimento antes de taxas, partições e impostos",
      value:
        parseFloat(finance.balance) * 1000 -
        parseFloat(finance.deposits) * 1000,
      icon: "trending-up",
      color: "#248CD9",
    },
    {
      id: 3,
      label: "Lucro Líquido",
      description: "Rendimento após taxas, partições e impostos",
      value:
        (parseFloat(finance.balance) * 1000 -
          parseFloat(finance.deposits) * 1000) *
        0.75,
      icon: "dollar-sign",
      color: "#FEBC2B",
    },
  ];

  const total =
  detailsData[0].value +
  detailsData[1].value +
  detailsData[2].value +
  detailsData[3].value;

  let data = [
    { x: "", y: (detailsData[0].value * 100) / total / 100 },
    { x: "", y: (detailsData[1].value * 100) / total / 100 },
    { x: "", y: (detailsData[2].value * 100) / total / 100 },
    { x: "", y: (detailsData[3].value * 100) / total / 100 },
  ]

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
      style={{ backgroundColor: THEME.COLORS.BLACK }}
      scrollEventThrottle={16}
    >
      <Container>
        <NativeBaseProvider>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 150,
            }}
          >
            {finance.balance && !loading ? (
              <>
                <Text
                  style={{
                    marginBottom: 6,
                    fontWeight: 500,
                    color: THEME.COLORS.GRAY,
                  }}
                >
                  Balanço
                </Text>
                <Title>
                  {showData ? `R$ ${finance.balance}` : "**********"}
                </Title>
              </>
            ) : (
              <VStack w="100%" space={3} alignItems="center">
                <Skeleton
                  h="10"
                  w="40%"
                  startColor={THEME.COLORS.BLACK_LIGHT}
                />
                <Skeleton
                  h="10"
                  w="80%"
                  startColor={THEME.COLORS.BLACK_LIGHT}
                />
              </VStack>
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              height: 180,
            }}
          >
            {finance.progress && !loading ? (
              <>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: THEME.COLORS.BLACK_LIGHT,
                    borderRadius: 5,
                    width: Dimensions.get("window").width / 3 - 20,
                    height: Dimensions.get("window").width / 3 - 20,
                  }}
                >
                  <Button mb={2} backgroundColor="transparent">
                    <Feather name="repeat" size={25} color="#909090" />
                  </Button>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: "#909090",
                    }}
                  >
                    Moedas
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: THEME.COLORS.BLACK_LIGHT,
                    borderRadius: 5,
                    width: Dimensions.get("window").width / 3 - 20,
                    height: Dimensions.get("window").width / 3 - 20,
                  }}
                >
                  <Button backgroundColor="transparent" mb={2}>
                    <Feather name="arrow-down-left" size={25} color="#909090" />
                  </Button>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: "#909090",
                    }}
                  >
                    Depositar
                  </Text>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: THEME.COLORS.BLACK_LIGHT,
                    borderRadius: 5,
                    width: Dimensions.get("window").width / 3 - 20,
                    height: Dimensions.get("window").width / 3 - 20,
                  }}
                >
                  <Button backgroundColor="transparent" mb={2}>
                    <Feather name="arrow-up-right" size={25} color="#909090" />
                  </Button>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 400,
                      color: "#909090",
                    }}
                  >
                    Resgatar
                  </Text>
                </View>
              </>
            ) : (
              <HStack
                w="100%"
                space={3}
                alignItems="center"
                justifyContent="center"
              >
                <Skeleton
                  h={Dimensions.get("window").width / 3 - 20}
                  w={Dimensions.get("window").width / 3 - 20}
                  startColor={THEME.COLORS.BLACK_LIGHT}
                />
                <Skeleton
                  h={Dimensions.get("window").width / 3 - 20}
                  w={Dimensions.get("window").width / 3 - 20}
                  startColor={THEME.COLORS.BLACK_LIGHT}
                />
                <Skeleton
                  h={Dimensions.get("window").width / 3 - 20}
                  w={Dimensions.get("window").width / 3 - 20}
                  startColor={THEME.COLORS.BLACK_LIGHT}
                />
              </HStack>
            )}
          </View>
          <View>
            {finance.progress && !loading ? (
              <SubTitle style={{ marginLeft: 15, marginBottom: 25 }}>
                Detalhes
              </SubTitle>
            ) : (
              <Skeleton
                h={12}
                w="40%"
                ml={15}
                marginBottom={25}
                startColor={THEME.COLORS.BLACK_LIGHT}
              />
            )}
            {finance.progress && !loading ? (
              <View
                style={{
                  backgroundColor: THEME.COLORS.BLACK_LIGHT,
                  borderRadius: 30,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 50,
                    height: 3,
                    backgroundColor: THEME.COLORS.GRAY,
                    marginTop: 10,
                  }}
                />
                <VictoryPie
                  width={Dimensions.get("window").width}
                  height={Dimensions.get("window").width}
                  colorScale={["#6001FF", "#FF4F4E", "#248CD9", "#FEBC2B"]}
                  data={data}
                  labels={({ datum }) => datum.x}
                  innerRadius={120}
                  animate={{
                    duration: 2000,
                  }}
                />
                <View style={{ width: "100%", alignItems: "center" }}>
                  {detailsData.map(
                    ({ id, description, value, icon, color, label }) => (
                      <View
                        style={{
                          width: "90%",
                          paddingBottom: 25,
                          paddingTop: 25,
                          flexDirection: "row",
                          alignItems: "center",
                          borderColor: "#202020",
                          borderBottomWidth: id !== 3 ? 1 : null,
                          justifyContent: "space-between",
                        }}
                        key={id}
                      >
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <View
                            style={{
                              backgroundColor: color,
                              borderRadius: 50,
                              height: 50,
                              width: 50,
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Feather
                              name={icon}
                              size={25}
                              color={THEME.COLORS.WHITE}
                            />
                          </View>
                          <View style={{ marginLeft: 15, width: 150 }}>
                            <Text
                              style={{
                                color: THEME.COLORS.WHITE,
                                fontWeight: 500,
                              }}
                            >
                              {label}
                            </Text>
                            <Text
                              style={{
                                color: THEME.COLORS.GRAY,
                                marginTop: 5,
                                fontWeight: 400,
                                fontSize: 14,
                              }}
                            >
                              {description}
                            </Text>
                          </View>
                        </View>
                        <Text
                          style={{
                            color: THEME.COLORS.WHITE,
                            fontWeight: "500",
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
                    )
                  )}
                </View>
              </View>
            ) : (
              <Skeleton
                h={800}
                w="100%"
                rounded={50}
                marginBottom={25}
                startColor={THEME.COLORS.BLACK_LIGHT}
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
