import React, { useContext, useEffect, useState } from "react";
import { Container } from "./Styled";
import { Context } from "../../context";
import { useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";
import ChangeEntry from "../../components/ChangeEntry";
import { changePhone } from "../../services/auth";

export default function ChangePhone() {
  const [value, setValue] = useState('');
  const { setLoading, tokenAuthentication, setAlert, getUserData } = useContext(Context);
  const navigation = useNavigation();

  async function onPress() {
    setLoading(true);
    const token = tokenAuthentication;
    const { id } = jwtDecode(token);
    const response = await changePhone(id, token, value);
    setLoading(false);

    if(response.error) {
      setAlert({
        show: true,
        message: response.message,
        status: "error"
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
      status: ""
    });
  }, []);

  return (
    <Container>
      <ChangeEntry value={value} setValue={setValue} onPress={onPress} type="Phone"/>
    </Container>
  )
}