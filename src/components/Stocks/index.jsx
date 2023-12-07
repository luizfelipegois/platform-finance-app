import React from "react";
import { Dimensions, View } from "react-native";
import THEME from "../../theme";
import Text from "../Text";
import { LineChart } from "react-native-chart-kit";

const CandlestickChart = ({ data , item}) => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 10 }}>
    <LineChart
      data={data}
      width={Dimensions.get("window").width - 35}
      height={200}
      withShadow={false}
      withInnerLines={false}
      bezier
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

const StockDetails = ({ label, value }) => (
  <View style={{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: THEME.COLORS.BLACK_LIGHT,
  }}>
    <Text text={label} />
    <Text text={value} color={THEME.COLORS.GRAY} />
  </View>
);

const Stocks = ({ item, type }) => {
  const chartData = {
    datasets: [{ data: Array.from({ length: 5 }, () => Math.floor(Math.random() * 101) - 50) }],
  };

  return (
    <View style={{
      width: type === "short" ? Dimensions.get("window").width * 0.8 : Dimensions.get("window").width - 30,
      marginHorizontal: type === "short" ? 10 : 0,
      marginBottom: type === "short" ? 0 : 80,
      borderRadius: 12,
      borderWidth: type === "short" ? 1 : 0,
      borderColor: THEME.COLORS.BLACK_LIGHT,
      padding: type === "short" ? 10 : 0,
    }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
        <View style={{ width: "70%" }}>
          <Text text={item.companyName} fontWeight={700} />
          <Text text={item.symbol} color={THEME.COLORS.GRAY} marginTop={10} />
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text text={`$${item.iexBidPrice || item.iexAskPrice}`} fontWeight={500} />
          <Text text={`${((item.changePercent) * 100).toFixed(2)}%`} color={parseFloat(item.change) < 0 ? THEME.COLORS.RED : THEME.COLORS.GREEN} />
        </View>
      </View>
      {type !== "short" && <CandlestickChart data={chartData} item={item} />}
      {type !== "short" && (
        <>
          <StockDetails label="Mudança Porcentagem" value={item.changePercent} />
          <StockDetails label="Moeda" value={item.currency} />
          <StockDetails label="Preço atrasado" value={item.delayedPrice} />
          <StockDetails label="Preço alto" value={item.high} />
          <StockDetails label="Preço baixo" value={item.low} />
          <StockDetails label="Preço mais recente" value={item.latestPrice} />
          <StockDetails label="Volume" value={item.latestVolume} />
        </>
      )}
    </View>
  );
};

export default Stocks;
