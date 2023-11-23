import React, { useContext } from "react";
import {
  Container,
  CapitalContainer,
  Capital,
  PercentageText,
  DetailsContainer,
  ListContainer,
  SubTitle,
  Text,
  Value,
  Table,
  Columns,
  Column,
  Rows,
  Row,
  RowText,
} from "./Styled";
import { RefreshControl, ScrollView, View } from "react-native";
import { Context } from "../../context";
import Ionicons from "@expo/vector-icons/Ionicons";
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
  const { loading, getUserData, finance } = useContext(Context);

  chartConfig = {
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  };

  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => getUserData()}
            tintColor={THEME.COLORS.SECUNDARY}
            colors={THEME.COLORS.SECUNDARY}
          />
        }
      >
        {finance.progress ? (
          <View>
            <CapitalContainer>
              <Capital>{`R$ ${finance.balance}`}</Capital>
              <PercentageText>
                <Ionicons name="analytics" size={28} color={THEME.COLORS.SUCCESS} />
                <Text
                  style={{ color: THEME.COLORS.SECUNDARY, marginLeft: 8 }}
                >{`${finance.yield}% de rendimento total`}</Text>
              </PercentageText>
            </CapitalContainer>
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
            <DetailsContainer>
              <SubTitle>Detalhes</SubTitle>
              <ListContainer>
                <Text>Total de depósitos</Text>
                <Value>{`R$ ${finance.deposits}`}</Value>
              </ListContainer>
              <ListContainer>
                <Text>Total de retiradas</Text>
                <Value>{`R$ ${finance.withdrawals}`}</Value>
              </ListContainer>
              <ListContainer>
                <Text>Lucro Bruto</Text>
                <Value>{`R$ ${
                  parseFloat(finance.balance) * 1000 -
                  parseFloat(finance.deposits) * 1000
                }`}</Value>
              </ListContainer>
              <ListContainer>
                <Text>Lucro Líquido</Text>
                <Value>{`R$ ${
                  (parseFloat(finance.balance) * 1000 -
                    parseFloat(finance.deposits) * 1000) *
                  0.75
                }`}</Value>
              </ListContainer>
            </DetailsContainer>
            <Table>
              <Columns>
                <Column>Mês</Column>
                <Column>CDI</Column>
                <Column>FOREX</Column>
                <Column>Status</Column>
              </Columns>
              <Rows>
                {finance.progress.map(({ name, CDI, Forex, status }) => (
                  <Row key={uuid.v4()}>
                    <RowText>{name}</RowText>
                    <RowText>{CDI}</RowText>
                    <RowText>{Forex}</RowText>
                    <RowText
                      style={{
                        color: status === "progress" ? "#F7C548" : THEME.COLORS.SUCCESS,
                      }}
                    >
                      {status === "progress" ? "Pendente" : "Concluído"}
                    </RowText>
                  </Row>
                ))}
              </Rows>
            </Table>
          </View>
        ) : (
          <View>
            <NativeBaseProvider>
              <Center flex={1} px="0" m="10">
                <Center w="100%">
                  <VStack w="80%" space={3} overflow="hidden" rounded="md">
                    <Skeleton h="10" startColor={THEME.COLORS.CARDS} />
                    <Skeleton h="10" startColor={THEME.COLORS.CARDS} />
                  </VStack>
                </Center>
              </Center>
            </NativeBaseProvider>
            <NativeBaseProvider>
              <Center flex={1}>
                <Center w="100%">
                  <HStack w="100%" space={5}>
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
                </Center>
              </Center>
            </NativeBaseProvider>
            <NativeBaseProvider>
              <Center flex={1} px="0" marginTop="50px">
                <Center w="100%">
                  <VStack w="100%">
                    <Skeleton
                      w="100%"
                      h="350"
                      startColor={THEME.COLORS.CARDS}
                      rounded="md"
                    />
                  </VStack>
                </Center>
              </Center>
            </NativeBaseProvider>
            <NativeBaseProvider>
              <Center flex={1} marginTop="40px" marginBottom="100px">
                <Center w="100%">
                  <VStack w="100%" space={3} overflow="hidden" rounded="md">
                    <Skeleton h="10" startColor={THEME.COLORS.CARDS} />
                    <Skeleton h="10" startColor={THEME.COLORS.CARDS} />
                    <Skeleton h="10" startColor={THEME.COLORS.CARDS} />
                    <Skeleton h="10" startColor={THEME.COLORS.CARDS} />
                  </VStack>
                </Center>
              </Center>
            </NativeBaseProvider>
          </View>
        )}
      </ScrollView>
    </Container>
  );
}
