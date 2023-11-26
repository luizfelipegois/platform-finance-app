import {
  Button,
  Center,
  FormControl,
  Input,
  NativeBaseProvider,
  Spinner,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import React, { useContext } from "react";
import { Context } from "../../context";
import THEME from "../../theme";

export default function ChangeEntry({ value, setValue, onPress, type, placeholder }) {
  const { loading, alert } = useContext(Context);

  return (
    <NativeBaseProvider>
      <Center w="100%">
        <VStack w="95%" space={3} mt="5">
          <FormControl
            isInvalid={alert.show ? true : false}
          >
            <FormControl.Label>{type}</FormControl.Label>
            <Input
              variant="filled"
              size="md"
              color={THEME.COLORS.TEXT}
              backgroundColor={THEME.COLORS.CARDS}
              placeholder={placeholder}
              borderColor={
                alert.show
                  ? THEME.COLORS.ALERT
                  : "transparent"
              }
              padding={3}
              focusOutlineColor={
                alert.show
                  ? THEME.COLORS.ALERT
                  : THEME.COLORS.SECUNDARY
              }
              value={value}
              onChangeText={setValue}
              placeholderTextColor={THEME.COLORS.SECUNDARY}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              {alert.message}
            </FormControl.ErrorMessage>
          </FormControl>
          <Button
            mt="4"
            backgroundColor={THEME.COLORS.PRIMARY}
            onPress={() => onPress()}
          >
            {loading ? <Spinner color={THEME.COLORS.TEXT} /> : "Confirmar"}
          </Button>
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
}
