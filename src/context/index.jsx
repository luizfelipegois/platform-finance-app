import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Context = createContext({});

export const Provider = ({ children }) => {
  const [tokenAuthentication, setTokenAuthentication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    status: ''
  });

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
  }

  const values = {
    tokenAuthentication,
    setTokenAuthentication,
    loading,
    setLoading,
    alert,
    setAlert,
    signOut
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
