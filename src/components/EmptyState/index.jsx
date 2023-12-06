import React from "react";
import { Box, Text } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import THEME from "../../theme";

const EmptyState = ({ iconName, title, description }) => (
  <Box alignItems="center" justifyContent="center" mt={50}>
    <Ionicons name={iconName} size={80} color={THEME.COLORS.GRAY} />
    <Text
      color={THEME.COLORS.WHITE}
      fontSize={THEME.SIZES.SUBTITLE}
      fontWeight="700"
    >
      {title}
    </Text>
    <Text
      color={THEME.COLORS.GRAY}
      fontSize={THEME.SIZES.TEXT}
      fontWeight="400"
      w="80%"
      textAlign="center"
    >
      {description}
    </Text>
  </Box>
);

export default EmptyState;
