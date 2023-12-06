import React, { useContext, useState } from "react";
import { Box, VStack, Center, NativeBaseProvider } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import THEME from "../../theme";
import { signIn } from "../../services/auth";
import { Context } from "../../context";
import InputForm from "../../components/InputForm";
import { PrimaryButton } from "../../components/Buttons";
import Title from "../../components/Title";
import Text from "../../components/Text";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAlert, setLoading, setTokenAuthentication } = useContext(Context);

  async function login() {
    setLoading(true);
    const { error, token, message } = await signIn(email, password);
    setLoading(false);

    if (error) {
      setAlert({
        show: true,
        message,
        status: null,
        inputType: message === "Usuário não encontrado" ? "email" : "password",
      });
    } else {
      setTokenAuthentication(token);
      AsyncStorage.setItem("tokenAuthentication", JSON.stringify(token));
      setAlert({
        show: false,
        message: null,
        status: null,
        inputType: null,
      });
    }
  }

  return (
    <NativeBaseProvider>
      <Center bg={THEME.COLORS.BLACK} flex={1} px="3">
        <Box safeArea p="2" py="8" w="100%" maxW="100%">
          <VStack space={2} mt="5">
            <Title text="Seja bem-vindo" />
            <Text
              text="Preencha suas credenciais para continuar"
              color={THEME.COLORS.GRAY}
            />
          </VStack>
          <VStack space={6} mt="5" alignItems="center">
            <InputForm
              onChangeText={setEmail}
              value={email}
              type="email"
              placeholder="user@company.com"
              label="Email"
            />
            <InputForm
              onChangeText={setPassword}
              value={password}
              type="password"
              placeholder="Digite sua senha"
              label="Senha"
            />
            <PrimaryButton text="Conectar-se" onPressButton={() => login()} />
            <Text text="Luiz & Co Trading 2023" color={THEME.COLORS.GRAY} />
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}
