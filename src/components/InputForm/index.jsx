import React, { useContext, useState } from "react";
import { Pressable } from "react-native";
import { FormControl, Icon, Input, WarningOutlineIcon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import THEME from "../../theme";
import { Context } from "../../context";

export default function InputForm({
  onChangeText,
  value,
  type,
  placeholder,
  label,
}) {
  const { alert } = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl isInvalid={alert.show && alert.inputType === type}>
      <FormControl.Label
        _text={{
          color: THEME.COLORS.WHITE,
          fontSize: THEME.SIZES.TEXT,
          fontWeight: THEME.WEIGHT.MEDIUM,
        }}
      >
        {label}
      </FormControl.Label>
      <Input
        InputRightElement={
          type === "password" && (
            <Pressable onPress={handleTogglePasswordVisibility}>
              <Icon
                as={
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                  />
                }
                size={6}
                mr="2"
                color="muted.400"
              />
            </Pressable>
          )
        }
        type={!showPassword && type === "password" ? "password" : "email"}
        variant="filled"
        size="md"
        placeholder={placeholder}
        color={THEME.COLORS.WHITE}
        backgroundColor={THEME.COLORS.BLACK_LIGHT}
        borderColor={THEME.COLORS.BLACK_LIGHT}
        focusOutlineColor={THEME.COLORS.GRAY}
        padding={3}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={THEME.COLORS.GRAY}
      />
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {alert.message}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
