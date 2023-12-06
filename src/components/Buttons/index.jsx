import { Spinner } from "native-base";
import React, { useContext } from "react";
import THEME from '../../theme'
import { Context } from "../../context";
import { Content } from "./styled";
import Text from "../Text";
import { Feather } from "@expo/vector-icons/";

export function PrimaryButton({onPressButton, text, height, width, borderRadius, backgroundColor}) {
  const {loading} = useContext(Context);
  return (
   <Content
    onPress={onPressButton}
    style={{
      height: height || 50,
      width: width || "100%",
      borderRadius: borderRadius || 5,
      backgroundColor: backgroundColor || THEME.COLORS.BLUE
    }}
   >
     {
      loading ? (
        <Spinner color={THEME.COLORS.WHITE} />
      ) : <Text text={text} />
    }
   </Content>
  );
}

export function SecundaryButton({onPressButton, text, backgroundColor, height, width, borderRadius, icon, color}) {
  return (
   <Content
    onPress={onPressButton}
    style={{
      backgroundColor: backgroundColor || THEME.COLORS.BLACK_LIGHT,
      height: height || 50,
      width: width || "100%",
      borderRadius: borderRadius || 10,
    }}
   >
      {
        icon && <Feather name={icon} size={25} color="#909090" />
      }
      <Text marginTop={icon && 10} text={text} color={color} />
   </Content>
  );
}
