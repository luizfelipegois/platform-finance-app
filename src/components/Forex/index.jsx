import React from "react";
import { Dimensions, View } from "react-native";
import THEME from "../../theme";
import Text from "../Text";
import { LineChart } from "react-native-chart-kit";

const CandlestickChart = ({ data , item, bezier }) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 10 }}>
    <LineChart
      data={data}
      width={Dimensions.get("window").width - 35}
      height={200}
      withShadow={false}
      withInnerLines={false}
      bezier={bezier}
      withOuterLines={false}
      decoratorSize={10}
      style={{ borderRadius: 16 }}
      chartConfig={{
        backgroundGradientFrom: THEME.COLORS.BLACK,
        backgroundGradientTo: THEME.COLORS.BLACK,
        color: () => parseFloat(item.change) < 0 ? THEME.COLORS.RED : THEME.COLORS.GREEN,
        labelColor: () => `rgba(255, 255, 255, 0)`,
      }}
    />
  </View>
);

const Forex = ({ item }) => {
  const chartData = {
    datasets: [{ data: item.map((x) => x.rate) }],
  };

  return (
    <View style={{
      width: Dimensions.get("window").width - 30,
      marginHorizontal: 0,
      marginBottom: 80,
      borderRadius: 12,
      borderWidth: 0,
      borderColor: THEME.COLORS.BLACK_LIGHT,
      padding: 0,
    }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
        <View style={{ width: "70%" }}>
          <Text text={item[0].symbol} fontWeight={700} />
          <Text text={item[0].date} color={THEME.COLORS.GRAY} marginTop={10} />
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text text={item[0].rate} fontWeight={500} />
        </View>
      </View>
      <CandlestickChart data={chartData} item={item} />
    </View>
  );
};

export default Forex;
