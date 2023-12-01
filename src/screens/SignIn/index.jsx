import React, { useContext, useState } from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Icon,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
  WarningOutlineIcon,
  Spinner
} from "native-base";
import THEME from '../../theme';
import { Pressable } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { signIn } from '../../services/auth';
import { Context } from '../../context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { alert, setAlert, loading, setLoading, setTokenAuthentication } = useContext(Context);

  async function login() {
    setLoading(true);
    const {error, token, message} = await signIn(email, password);
    setLoading(false);

    if (error) {
      setAlert({
        show: true,
        message,
        status: '',
      })

    } else {
      setTokenAuthentication(token);
      AsyncStorage.setItem('tokenAuthentication', JSON.stringify(token));
      setAlert({
        show: false,
        message: '',
        status: '',
      })
    }
  }

  return (
    <NativeBaseProvider>
      <Center bg={THEME.COLORS.BLACK} flex={1} px="3">
        <Center w="100%">
          <Box safeArea p="2" py="8" w="100%" maxW="100%">
            <Heading fontSize={THEME.SIZES.TITLE} fontWeight="bold" color={THEME.COLORS.WHITE} _dark={{
            color: "warmGray.50"
          }}>
              Seja bem-vindo
            </Heading>
            <Heading mt="1" _dark={{
            color: "warmGray.200"
          }} color={THEME.COLORS.GRAY} fontSize={THEME.SIZES.TEXT} fontWeight="semibold">
              Faça o login para continuar!
            </Heading>
            <VStack space={3} mt="5">
              <FormControl
                isInvalid={
                  alert.message === "Usuário não encontrado" ? true : false
                }
              >
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  variant="filled"
                  size="md"
                  placeholder="Digite seu email"
                  color={THEME.COLORS.WHITE}
                  backgroundColor={THEME.COLORS.BLACK_LIGHT}
                  borderColor={alert.message === "Usuário não encontrado" ? THEME.COLORS.RED : THEME.COLORS.BLACK_LIGHT}
                  padding={3}
                  focusOutlineColor={ alert.message === "Usuário não encontrado" ? THEME.COLORS.RED : THEME.COLORS.BLACK_LIGHT}
                  value={email}
                  onChangeText={setEmail}
                  placeholderTextColor={THEME.COLORS.GRAY}
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                  Email inválido
                </FormControl.ErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  alert.message === "Senha incorreta" || alert.message === "Senha é necessária" ? true : false
                }
              >
                <FormControl.Label>Senha</FormControl.Label>
                <Input
                  placeholderTextColor={THEME.COLORS.GRAY}
                  variant="filled"
                  size="md"
                  placeholder="Digite sua senha"
                  color={THEME.COLORS.WHITE}
                  backgroundColor={THEME.COLORS.BLACK_LIGHT}
                  borderColor={alert.message === "Senha incorreta" || alert.message === "Senha é necessária" ? THEME.COLORS.RED : THEME.COLORS.BLACK_LIGHT}
                  padding={3}
                  focusOutlineColor={alert.message === "Senha incorreta" || alert.message === "Senha é necessária" ? THEME.COLORS.RED : THEME.COLORS.BLACK_LIGHT}
                  type={showPassword ? "text" : "password"}
                  InputRightElement={
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                      <Icon as={
                        <MaterialIcons
                          name={showPassword ? "visibility" : "visibility-off"} />}
                          size={6}
                          mr="2"
                          color="muted.400"
                        />
                    </Pressable>
                  }
                  value={password}
                  onChangeText={setPassword}
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                  {alert.message}
                </FormControl.ErrorMessage>
              </FormControl>
              <Button mt="4" size="lg" backgroundColor={THEME.COLORS.BLUE} onPress={() => login()}>
                {
                  loading ? <Spinner color={THEME.COLORS.WHITE} /> : "Conectar-se"
                }
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text fontSize="sm" color={THEME.COLORS.GRAY} _dark={{
                color: "warmGray.200"
              }}>
                  Luiz & cotrading 2023
                </Text>
              </HStack>
            </VStack>
          </Box>
        </Center>
      </Center>
    </NativeBaseProvider>
  )
}