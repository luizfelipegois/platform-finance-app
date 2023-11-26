import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode"
import "core-js/stable/atob";
import { userData } from '../services/user';
import { Alert } from "react-native";

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
  const [isLocalAuth, setIsLocalAuth] = useState(true);
  const [showData, setShowData] = useState(false);

  async function loadFromStorage() {
    const token = await AsyncStorage.getItem('tokenAuthentication');
    const status = await AsyncStorage.getItem("authenticantionActivated");

    if (token) {
      setTokenAuthentication(JSON.parse(token));
    } else {
      signOut();
    }

    if (status === "true") {
      setIsLocalAuth(false);
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
    isLocalAuth,
    setIsLocalAuth,
    showData,
    setShowData
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
