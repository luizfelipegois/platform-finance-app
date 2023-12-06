import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Text } from "./Styled";
import THEME from "../../theme";

export default function Transactions({ id, value, date, status, type }) {
  const [backgroundColor, setBackgroundColor] = useState("#f2f2f2");
  const [text, setText] = useState("");

  const handleChangeBackgroundColor = () => {
    switch (status) {
      case "pending":
        setBackgroundColor(THEME.COLORS.YELLOW);
        break;
      case "concluded":
        setBackgroundColor(THEME.COLORS.GREEN);
        break;
      case "refused":
        setBackgroundColor(THEME.COLORS.RED);
        break;
      default:
        setBackgroundColor(THEME.COLORS.YELLOW);
    }
  };

  const handleChangeText = () => {
    switch (status) {
      case "pending":
        setText("Processando");
        break;
      case "concluded":
        setText("Concluído");
        break;
      case "refused":
        setText("Recusado");
        break;
      default:
        setText("Processando");
    }
  };

  useEffect(() => {
    handleChangeBackgroundColor();
    handleChangeText();
  }, []);

  return (
    <View
      key={id}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: 1,
        alignItems: "center",
        borderColor: THEME.COLORS.BLACK_LIGHT,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: THEME.COLORS.BLACK_LIGHT,
            height: 50,
            width: 50,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50,
          }}
        >
          <Feather
            name={type === "deposit" ? "arrow-down-left" : "arrow-up-right"}
            size={25}
            color={THEME.COLORS.WHITE}
          />
        </View>
        <View style={{ marginLeft: 15 }}>
          <Text
            style={{
              fontWeight: 500,
              fontSize: 16,
              color: THEME.COLORS.WHITE,
            }}
          >{`R$ ${value}`}</Text>
          <Text
            style={{
              fontWeight: 500,
              fontSize: 14,
              marginTop: 2,
              fontWeight: 400,
              color: THEME.COLORS.GRAY,
            }}
          >
            {date}
          </Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: backgroundColor,
          paddingTop: 6,
          paddingBottom: 6,
          borderRadius: 50,
          width: 110,
        }}
      >
        <Text
          style={{
            fontWeight: 400,
            fontSize: 16,
            textAlign: "center",
            color: THEME.COLORS.BLACK_LIGHT,
          }}
        >
          {text}
        </Text>
      </View>
    </View>
  );
}
