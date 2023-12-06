import React, { useContext, useEffect, useState } from "react";
import { Container } from "./Styled";
import { Context } from "../../context";
import { changeEmail, changePassword, changePhone } from "../../services/auth";
import { jwtDecode } from "jwt-decode";
import { useNavigation } from "@react-navigation/native";
import InputForm from "../../components/InputForm";
import { NativeBaseProvider, VStack } from "native-base";
import { PrimaryButton } from "../../components/Buttons";

export function ChangeItem({ type, placeholder, serviceFunction }) {
  const [value, setValue] = useState("");
  const { setLoading, tokenAuthentication, setAlert, getUserData, user } =
    useContext(Context);
  const navigation = useNavigation();

  async function onPress() {
    setLoading(true);
    const token = tokenAuthentication;
    const { id } = jwtDecode(token);
    const response = await serviceFunction(id, token, value);
    setLoading(false);

    if (response.error) {
      setAlert({
        show: true,
        message: response.message,
        status: "error",
      });
    } else {
      navigation.navigate("Configurações");
      getUserData();
    }
  }

  useEffect(() => {
    setAlert({
      show: false,
      message: "",
      status: "",
    });
  }, []);

  return (
    <NativeBaseProvider>
      <Container>
        <VStack w="95%" space={4}>
          <InputForm
            onChangeText={setValue}
            label={type}
            placeholder={user[type.toLowerCase()] || "Digite sua nova senha"}
            type={type}
            value={value}
          />
          <PrimaryButton text="Continuar" onPressButton={onPress} />
        </VStack>
      </Container>
    </NativeBaseProvider>
  );
}

export function ChangeEmail() {
  return <ChangeItem type="Email" serviceFunction={changeEmail} />;
}

export function ChangePassword() {
  return <ChangeItem type="Senha" serviceFunction={changePassword} />;
}

export function ChangePhone() {
  return <ChangeItem type="Phone" serviceFunction={changePhone} />;
}
