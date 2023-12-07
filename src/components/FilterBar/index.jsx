import React from "react";
import { View, Dimensions } from "react-native";
import THEME from "../../theme";
import { SecundaryButton } from "../../components/Buttons";

const FilterBar = ({ activeFilter, onChangeFilter }) => {
  const filters = ["Todos", "Ações", "Índices", "Forex"];

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: THEME.COLORS.BLACK,
        paddingVertical: 10,
      }}
    >
      {filters.map((filter) => (
        <SecundaryButton
          key={filter}
          width={(Dimensions.get("window").width / 4) - 20}
          text={filter}
          onPressButton={() => onChangeFilter(filter)}
          backgroundColor={activeFilter === filter ? THEME.COLORS.BLUE : THEME.COLORS.BLACK_LIGHT}
        />
      ))}
    </View>
  );
};

export default FilterBar;
