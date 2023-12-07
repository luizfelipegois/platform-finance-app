import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { userData } from "../services/user";
import { Alert } from "react-native";
import { getLatestStocks } from "../services/currency";

export const Context = createContext({});

export const Provider = ({ children }) => {
  const [tokenAuthentication, setTokenAuthentication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: null,
    status: null,
    inputType: null,
  });
  const [user, setUser] = useState({});
  const [finance, setFinance] = useState({});
  const [withdrawals, setWithdrawals] = useState([]);
  const [isLocalAuth, setIsLocalAuth] = useState(true);
  const [showData, setShowData] = useState(false);
  const [stocks, setStocks] = useState([]);

  const loadFromStorage = async () => {
    const storedToken = await AsyncStorage.getItem("tokenAuthentication");
    const status = await AsyncStorage.getItem("authenticantionActivated");

    if (storedToken) {
      setTokenAuthentication(JSON.parse(storedToken));
    } else {
      signOut();
    }

    if (status === "true") {
      setIsLocalAuth(false);
    }
  };

  const signOut = () => {
    setTokenAuthentication(null);
    AsyncStorage.removeItem("tokenAuthentication");
    setFinance({});
    setUser({});
  };

  const getUserData = async () => {
    setLoading(true);
    const token = tokenAuthentication;
    const { id } = jwtDecode(token);
    const response = await userData(id, token);
    const { datas, email, name, phone, requests } = await response;

    setLoading(false);

    if (response.error) {
      Alert.alert(response.message, "Usuario Nao Autenticado");
      signOut();
    } else {
      setUser({ name, email, phone });
      setFinance(datas);
      setWithdrawals(requests);
    }
  };

  const getStocks = async () => {
    try {
      const lastExecutionDate = await AsyncStorage.getItem("lastExecutionDate");

      const currentDate = new Date();

      if (
        !lastExecutionDate ||
        !isSameDay(new Date(lastExecutionDate), currentDate)
      ) {
        const response = await getLatestStocks();

        await AsyncStorage.setItem("stocks", JSON.stringify(response));

        await AsyncStorage.setItem(
          "lastExecutionDate",
          currentDate.toISOString()
        );
      } else {
        const data = await AsyncStorage.getItem("stocks");
        setStocks(JSON.parse(data));
      }
    } catch (error) {
      console.error("Erro ao obter/atualizar os dados de estoque:", error);
    }
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  useEffect(() => {
    loadFromStorage();
  }, []);

  useEffect(() => {
    if (tokenAuthentication) {
      getUserData();
      getStocks();
    }
  }, [tokenAuthentication]);

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
    setShowData,
    withdrawals,
    stocks,
  };

  return <Context.Provider value={values}>{children}</Context.Provider>;
};
