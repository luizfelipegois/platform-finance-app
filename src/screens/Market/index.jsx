import React, { useContext, useState } from "react";
import { Dimensions, RefreshControl, ScrollView, View } from "react-native";
import THEME from "../../theme";
import { Button, Text } from "./styled";
import { Context } from "../../context";
import Stocks from "../../components/Stocks";
import { v4 as uuidv4 } from 'uuid';

export default function Market() {
  const [refreshing, setRefreshing] = useState(false);
  const { stocks } = useContext(Context);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            setTimeout(() => {
              setRefreshing(false);
              // getUserData();
            }, 1000);
          }}
          tintColor={THEME.COLORS.WHITE}
        />
      }
      style={{ backgroundColor: THEME.COLORS.BLACK }}
      scrollEventThrottle={16}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: Dimensions.get("window").width - 30,
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Button
            style={{
              width: Dimensions.get("window").width / 4 - 15,
            }}
          >
            <Text>Todos</Text>
          </Button>
          <Button
            style={{
              width: Dimensions.get("window").width / 4 - 15,
            }}
          >
            <Text>Ações</Text>
          </Button>
          <Button
            style={{
              width: Dimensions.get("window").width / 4 - 15,
            }}
          >
            <Text>Forex</Text>
          </Button>
          <Button
            style={{
              width: Dimensions.get("window").width / 4 - 15,
            }}
          >
            <Text>Commodities</Text>
          </Button>
        </View>
        <View>
          {
            stocks.map((stock) => <Stocks key={uuidv4()} item={stock} width={Dimensions.get("window").width - 30}/>)
          }
        </View>
      </View>
    </ScrollView>
  );
}