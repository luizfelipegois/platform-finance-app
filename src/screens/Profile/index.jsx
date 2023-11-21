import React, { useContext } from "react";
import { Button, Actionsheet, useDisclose, Icon, Center, NativeBaseProvider, CloseIcon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import THEME from '../../theme';
import { Context } from '../../context';

export default function Profile() {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  const { signOut } = useContext(Context);

  return (
    <NativeBaseProvider>
      <Center justifyContent={"flex-end"} bg={THEME.COLORS.BACKGROUND} flex={1} px="3">
        <Center>
          <Button
            backgroundColor={THEME.COLORS.SECUNDARY}
            marginBottom={100}
            onPress={onOpen}
            leftIcon={<Icon as={MaterialIcons} size="6" name="settings"/>}
          >Ajustes</Button>
          <Actionsheet paddingBottom={10} isOpen={isOpen} onClose={onClose}>
            <Actionsheet.Content>
              <Actionsheet.Item
                onPress={() => signOut()}
                startIcon={<CloseIcon size="5" mt="0.5" color={THEME.COLORS.ALERT}/>}
                _text={
                  {
                    color: `${THEME.COLORS.ALERT}`
                  }
                }
              >Encerrar Sessão</Actionsheet.Item>
            </Actionsheet.Content>
          </Actionsheet>
        </Center>
      </Center>
    </NativeBaseProvider>
  )
}