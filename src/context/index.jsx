import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode"
import "core-js/stable/atob";
import { userData } from '../services/user';
import { Alert } from "react-native";
import { useDisclose } from "native-base";

export const Context = createContext({});

export const Provider = ({ children }) => {
  const [tokenAuthentication, setTokenAuthentication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    status: ''
  });
  const [user, setUser] = useState({});
  const [finance, setFinance] = useState({});
  async function loadFromStorage() {
    const token = await AsyncStorage.getItem('tokenAuthentication');

    if (token) {
      setTokenAuthentication(JSON.parse(token));
    } else {
      signOut();
    }
  }

  function signOut() {
    setTokenAuthentication(null);
    AsyncStorage.removeItem('tokenAuthentication');
    setFinance({});
    setUser({});
  }

  async function getUserData() {
    setLoading(true);
    const token = tokenAuthentication;
    const { id } = jwtDecode(token);
    const response = await userData(id, token);
    const { datas, email, name } = await response;

    setLoading(false);

    if (response.error) {
      Alert.alert(response.message, "Usuario Nao Autenticado");
      signOut();
    } else {
      setUser({name, email});
      setFinance(datas);
    }
  }

  const values = {
    tokenAuthentication,
    setTokenAuthentication,
    loading,
    setLoading,
    alert,
    setAlert,
    signOut,
    getUserData,
    user,
    finance,
  };

  useEffect(() => {
    loadFromStorage();
  }, []);

  return (
    <Context.Provider value={values}>
      {children}
    </Context.Provider>
  )
};
