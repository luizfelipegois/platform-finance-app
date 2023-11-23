import React, { useContext, useEffect, useState } from "react";
import { Container } from "./Styled";
import ChangeEntry from "../../components/ChangeEntry";
import { Context } from "../../context";
import { changeEmail } from '../../services/auth';
import { jwtDecode } from "jwt-decode";
import { useNavigation } from "@react-navigation/native";

export default function ChangeEmail() {
  const [value, setValue] = useState('');
  const { setLoading, tokenAuthentication, setAlert, getUserData } = useContext(Context);
  const navigation = useNavigation();

  async function onPress() {
    setLoading(true);
    const token = tokenAuthentication;
    const { id } = jwtDecode(token);
    const response = await changeEmail(id, token, value);
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
      <ChangeEntry value={value} setValue={setValue} onPress={onPress} type="Email"/>
    </Container>
  )
}