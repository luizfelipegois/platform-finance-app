import React from "react";
import { Dimensions, View } from "react-native";
import THEME from "../../theme";
import Text from "../Text";
import { LineChart } from "react-native-chart-kit";

const CandlestickChart = () => {
  const generateRandomData = () => {
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * 101) - 50);
  };

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: generateRandomData(),
      },
    ],
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 10}}>
      <LineChart
        data={data}
        width={Dimensions.get("window").width - 35}
        height={100}
        withShadow={false}
        withInnerLines={false}
        withOuterLines={false}
        chartConfig={{
          backgroundGradientFrom: THEME.COLORS.BLACK,
          backgroundGradientTo: THEME.COLORS.BLACK,
          color: () => `rgba(26, 255, 146, 1)`,
          labelColor: () => `rgba(255, 255, 255, 0)`,
        }}
      />
    </View>
  );
};

export default function Stocks({ item, type }) {
  return (
    <View
      style={{
        width:
          type === "short"
            ? Dimensions.get("window").width * 0.8
            : Dimensions.get("window").width - 30,
        marginHorizontal: type === "short" ? 10 : 0,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: THEME.COLORS.BLACK_LIGHT,
        padding: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <View
          style={{
            width: "70%",
          }}
        >
          <Text text={item.companyName} fontWeight={700} />
          <Text text={item.symbol} color={THEME.COLORS.GRAY} marginTop={10} />
        </View>
        <View
          style={{
            alignItems: "flex-end",
          }}
        >
          <Text text={`$${item.close || item.iexAskPrice}`} fontWeight={500} />
          <Text
            text={`${item.change}%`}
            color={
              parseFloat(item.change) < 0
                ? THEME.COLORS.RED
                : THEME.COLORS.GREEN
            }
          />
        </View>
      </View>
      {type !== "short" && <CandlestickChart />}
    </View>
  );
}
