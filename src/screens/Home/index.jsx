import React, { useContext, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  Dimensions,
  FlatList,
  View,
} from "react-native";
import {
  NativeBaseProvider,
  VStack,
  HStack,
  Box,
  Skeleton,
} from "native-base";
import { Feather } from "@expo/vector-icons/";
import { VictoryPie } from "victory-native";
import uuid from "react-native-uuid";

import THEME from "../../theme";
import { Context } from "../../context";
import { Container } from "./Styled";
import Transactions from "../../components/Transactions";
import Stocks from "../../components/Stocks";
import SubTitle from "../../components/SubTitle";
import Text from "../../components/Text";
import { SecundaryButton } from "../../components/Buttons";

export default function Home({ navigation }) {
  const { loading, getUserData, finance, showData, stocks, withdrawals } =
    useContext(Context);
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
      color: "#248CD9",
    },
    {
      id: 1,
      label: "Levantamentos",
      description: "Total de levantamentos",
      value: parseFloat(finance.withdrawals),
      icon: "arrow-up-right",
      color: "#ff7c7c",
    },
    {
      id: 2,
      label: "Lucro Bruto",
      description: "Rendimento antes de taxas, partições e impostos",
      value:
        parseFloat(finance.balance) * 1000 -
        parseFloat(finance.deposits) * 1000,
      icon: "trending-up",
      color: "#ffcf66",
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
      color: "#5cd560",
    },
  ];

  const total = detailsData.reduce((acc, detail) => acc + detail.value, 0);

  const initialData = [
    { x: "", y: 1 },
    { x: "", y: 2 },
    { x: "", y: 3 },
    { x: "", y: 4 },
  ];

  const data = detailsData.map((detail) => ({
    x: "",
    y: (detail.value * 100) / total / 100,
  }));

  const financeActions = [
    {
      id: 0,
      route: "Mercados",
      icon: "trending-up",
      label: "Mercados",
    },
    {
      id: 1,
      route: "Depósitos/Levantamentos",
      icon: "arrow-down-left",
      label: "Depositar",
    },
    {
      id: 2,
      route: "Depósitos/Levantamentos",
      icon: "arrow-up-right",
      label: "Resgatar",
    },
  ];

  const renderRefreshControl = () => (
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
  );

  const renderBalance = () => (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: Dimensions.get("window").width * 0.43,
        left: Dimensions.get("window").width * 0.28,
        width: 180,
      }}
    >
      {finance.balance && !loading ? (
        <>
          <Text text="Balanço" color={THEME.COLORS.GRAY} marginBottom={5} />
          <SubTitle text={showData ? `R$ ${finance.balance}` : "**********"} />
        </>
      ) : (
        <VStack w="100%" space={3} alignItems="center" justifyContent="center">
          {Array.from({ length: 2 }).map((_, index) => (
            <Skeleton
              key={index}
              h={5}
              w={40}
              startColor={THEME.COLORS.BLACK_LIGHT}
            />
          ))}
        </VStack>
      )}
    </View>
  );

  const renderActions = () => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      {finance.progress && !loading ? (
        financeActions.map((action) => (
          <SecundaryButton
            key={action.id}
            icon={action.icon}
            text={action.label}
            height={Dimensions.get("window").width / financeActions.length - 20}
            width={Dimensions.get("window").width / financeActions.length - 20}
            onPressButton={() => navigation.navigate(action.route)}
          />
        ))
      ) : (
        <HStack w="100%" alignItems="center" justifyContent="space-evenly">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              h={Dimensions.get("window").width / financeActions.length - 20}
              w={Dimensions.get("window").width / financeActions.length - 20}
              startColor={THEME.COLORS.BLACK_LIGHT}
              borderRadius={10}
            />
          ))}
        </HStack>
      )}
    </View>
  );

  const renderFinanceDetails = () => (
    <View
      style={{
        backgroundColor: THEME.COLORS.BLACK_LIGHT,
        borderRadius: 30,
        alignItems: "center",
        marginTop: 50,
      }}
    >
      {finance.progress && !loading ? (
        <>
          <View
            style={{
              width: 50,
              height: 3,
              backgroundColor: THEME.COLORS.GRAY,
              marginTop: 10,
            }}
          />
          <View style={{ width: "100%", alignItems: "center" }}>
            {detailsData.map(renderDetail)}
          </View>
        </>
      ) : (
        <Skeleton
          h={450}
          w="100%"
          rounded={50}
          marginBottom={25}
          startColor={THEME.COLORS.BLACK_LIGHT}
        />
      )}
    </View>
  );

  const renderDetail = ({ id, description, value, icon, color, label }) => (
    <View
      key={uuid.v4()}
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
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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
          <Feather name={icon} size={25} color={THEME.COLORS.WHITE} />
        </View>
        <View style={{ marginLeft: 15, width: 150 }}>
          <Text text={label} fontWeight={500} />
          <Text text={description} color={THEME.COLORS.GRAY} marginTop={5} />
        </View>
      </View>
      <Text
        fontWeight={500}
        text={
          showData
            ? value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            : "*********"
        }
      />
    </View>
  );

  const renderTransactions = () => (
    <View style={{ marginTop: 50 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 15,
          paddingRight: 15,
          marginBottom: 20,
        }}
      >
        {withdrawals && !loading ? (
          <>
            <SubTitle text="Transações" />
            <SecundaryButton
              color={THEME.COLORS.BLUE}
              text="Ver mais"
              height={40}
              width={80}
              backgroundColor={THEME.COLORS.BLACK}
              onPressButton={() => navigation.navigate("Depósitos/Levantamentos")}
            />
          </>
        ) : (
          <HStack
            w="100%"
            space={3}
            alignItems="center"
            justifyContent="space-between"
          >
            <Skeleton h="12" w="60%" startColor={THEME.COLORS.BLACK_LIGHT} />
            <Skeleton h="10" w="20%" startColor={THEME.COLORS.BLACK_LIGHT} />
          </HStack>
        )}
      </View>
      {withdrawals && !loading ? (
        withdrawals.length !== 0 ? (
          withdrawals
            .slice(-5)
            .reverse()
            .map(({ id, value, date, status, type }) => (
              <Transactions
                key={id}
                value={value}
                date={date}
                status={status}
                type={type}
              />
            ))
        ) : (
          <Box alignItems="center" justifyContent="center">
            <Feather name="refresh-ccw" size={60} color={THEME.COLORS.GRAY} />
            <Text
              width="60%"
              color={THEME.COLORS.GRAY}
              marginTop={10}
              textAlign="center"
              text="No momento você não possui histórico de transações"
            />
          </Box>
        )
      ) : (
        <VStack w="100%" space={3} alignItems="center" justifyContent="center">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={index}
              h="16"
              w={Dimensions.get("window").width - 30}
              startColor={THEME.COLORS.BLACK_LIGHT}
            />
          ))}
        </VStack>
      )}
    </View>
  );

  const renderStocks = () => (
    <View style={{ marginTop: 50 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 15,
          paddingRight: 15,
          marginBottom: 20,
        }}
      >
        {stocks && !loading ? (
          <>
            <SubTitle text="Principais Ações" />
            <SecundaryButton
              color={THEME.COLORS.BLUE}
              text="Ver mais"
              height={40}
              width={80}
              backgroundColor={THEME.COLORS.BLACK}
              onPressButton={() => navigation.navigate("Mercados")}
            />
          </>
        ) : (
          <HStack
            w="100%"
            space={3}
            alignItems="center"
            justifyContent="space-between"
          >
            <Skeleton h="12" w="60%" startColor={THEME.COLORS.BLACK_LIGHT} />
            <Skeleton h="10" w="20%" startColor={THEME.COLORS.BLACK_LIGHT} />
          </HStack>
        )}
      </View>
      {stocks && !loading ? (
        <FlatList
          data={stocks}
          keyExtractor={(item) => String(item.symbol)}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item }) => <Stocks item={item} type="short" />}
        />
      ) : (
        <HStack>
          {Array.from({ length: 2 }).map((_, index) => (
            <Skeleton
              key={index}
              h="24"
              w={Dimensions.get("window").width * 0.8}
              startColor={THEME.COLORS.BLACK_LIGHT}
              borderRadius={12}
              ml={15}
            />
          ))}
        </HStack>
      )}
    </View>
  );

  return (
    <ScrollView
      refreshControl={renderRefreshControl()}
      style={{ backgroundColor: THEME.COLORS.BLACK }}
      scrollEventThrottle={16}
    >
      <Container>
        <NativeBaseProvider>
          <View style={{ position: "relative" }}>
            <VictoryPie
              width={Dimensions.get("window").width}
              height={Dimensions.get("window").width}
              colorScale={["#248CD9", "#ff7c7c", "#ffcf66", "#5cd560"]}
              data={finance.deposits && !loading ? data : initialData}
              innerRadius={120}
              labels={({ datum }) => datum.x}
              padAngle={({ datum }) => datum.y + 1}
              animate={{
                duration: 1000,
                easing: "linear",
              }}
            />
            {renderBalance()}
          </View>
          {renderActions()}
          {renderFinanceDetails()}
          {renderTransactions()}
          {renderStocks()}
        </NativeBaseProvider>
      </Container>
    </ScrollView>
  );
}
