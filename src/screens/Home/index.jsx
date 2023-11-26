import React, { useContext, useState } from "react";
import {
  Container,
  Section,
  Title,
  SubTitle,
  Text,
  Column,
  RowText,
} from "./Styled";
import { RefreshControl, ScrollView, View } from "react-native";
import { Context } from "../../context";
import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import uuid from "react-native-uuid";
import THEME from "../../theme";
import {
  Center,
  HStack,
  NativeBaseProvider,
  Skeleton,
  VStack,
} from "native-base";

export default function Home() {
  const { loading, getUserData, finance, showData } = useContext(Context);
  const [refreshing, setRefreshing] = useState(false);

  chartConfig = {
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };

  const detailsData = [
    {
      id: 0,
      text: "Total de depósitos",
      value: `R$ ${finance.deposits}`
    },
    {
      id: 1,
      text: "Total de retiradas",
      value: `R$ ${finance.withdrawals}`
    },
    {
      id: 2,
      text: "Lucro Bruto",
      value: `R$ ${
        parseFloat(finance.balance) * 1000 -
        parseFloat(finance.deposits) * 1000
      }`
    },
    {
      id: 3,
      text: "Lucro Líquido",
      value: `R$ ${
        (parseFloat(finance.balance) * 1000 -
          parseFloat(finance.deposits) * 1000) *
        0.75
      }`
    }
  ]

  return (
    <Container>
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
        {finance.progress && !loading ? (
          <>
            <Section style={{marginTop: 30}}>
              <Text style={{marginBottom: 5}}>Balanço</Text>
              <Title>{showData ? `R$ ${finance.balance}` : "**********"}</Title>
            </Section>
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
              height={220}
              chartConfig={chartConfig}
              accessor={"population"}
              backgroundColor={"transparent"}
              avoidFalseZero={false}
            />
            <Section>
              <SubTitle>Detalhes</SubTitle>
              {
                detailsData.map(({id, text, value}) => (
                  <View style={{marginTop: 20}} key={id}>
                    <Text>{text}</Text>
                    <Text style={{color: THEME.COLORS.TEXT, fontWeight: "500", marginTop: 5}}>{showData ? value : "R$ ********"}</Text>
                  </View>
                ))
              }
            </Section>
            <View style={{marginTop: 25}}>
              <SubTitle>Histórico</SubTitle>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: THEME.COLORS.CARDS,
                  borderRadius: 5,
                  padding: 10,
                  marginTop: 20
                }}
              >
                <Column>Mês</Column>
                <Column>CDI</Column>
                <Column>FOREX</Column>
                <Column>Status</Column>
              </View>
              <View style={{padding: 10}}>
                {finance.progress.map(({ name, CDI, Forex, status }) => (
                  <View
                    key={uuid.v4()}
                    style={{
                      flexDirection: "row",
                      marginTop: 10,
                      marginBottom: 10
                    }}
                  >
                    <RowText>{name}</RowText>
                    <RowText>{showData ? CDI : "******"}</RowText>
                    <RowText>{showData ? Forex : "******"}</RowText>
                    <RowText
                      style={{
                        color: status === "progress" ? "#F7C548" : THEME.COLORS.SUCCESS,
                      }}
                    >
                      {status === "progress" ? "Pendente" : "Concluído"}
                    </RowText>
                  </View>
                ))}
              </View>
            </View>
          </>
        ) : (
          <NativeBaseProvider>
            <VStack w="70%" space={3} mt={50} rounded="md">
              <Skeleton h="10" w="70%" startColor={THEME.COLORS.CARDS} />
              <Skeleton h="10" startColor={THEME.COLORS.CARDS} />
            </VStack>
            <HStack mt={50} w="100%" space={5}>
              <Skeleton
                size="180"
                rounded="full"
                startColor={THEME.COLORS.CARDS}
              />
              <VStack w="80%" space={3} overflow="hidden" rounded="md">
                <Skeleton h="5" startColor={THEME.COLORS.CARDS} />
                <Skeleton h="5" startColor={THEME.COLORS.CARDS} />
                <Skeleton h="5" startColor={THEME.COLORS.CARDS} />
                <Skeleton h="5" startColor={THEME.COLORS.CARDS} />
                <Skeleton h="5" startColor={THEME.COLORS.CARDS} />
                <Skeleton h="5" startColor={THEME.COLORS.CARDS} />
              </VStack>
            </HStack>
            <VStack mt={50} w="100%">
              <Skeleton
                w="100%"
                h="350"
                startColor={THEME.COLORS.CARDS}
                rounded="md"
              />
            </VStack>
            <VStack mt={50} w="100%" space={3} overflow="hidden" rounded="md">
              <Skeleton h="10" startColor={THEME.COLORS.CARDS} />
              <Skeleton h="10" startColor={THEME.COLORS.CARDS} />
              <Skeleton h="10" startColor={THEME.COLORS.CARDS} />
              <Skeleton h="10" startColor={THEME.COLORS.CARDS} />
            </VStack>
          </NativeBaseProvider>
        )}
      </ScrollView>
    </Container>
  );
}
