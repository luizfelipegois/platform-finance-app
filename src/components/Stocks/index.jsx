import React from "react";
import { Dimensions, View } from "react-native";
import THEME from "../../theme";
import Text from "../Text";

export default function Stocks({ item, type }) {
  console.log(item)
  return (
    <View
      style={{
        width:
          type === "short"
            ? Dimensions.get("window").width * 0.8
            : Dimensions.get("window").width - 30,
        marginHorizontal: 10,
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        borderWidth: 1,
        borderColor: THEME.COLORS.BLACK_LIGHT,
        padding: 10,
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
        <Text
          text={`$${item.close || item.iexAskPrice}`}
          fontWeight={500}
          marginTop={10}
        />
        <Text
          text={`${item.change}%`}
          color={
            parseFloat(item.change) < 0 ? THEME.COLORS.RED : THEME.COLORS.GREEN
          }
        />
      </View>
    </View>
  );
}
