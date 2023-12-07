// Market.js
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, RefreshControl, ScrollView, View } from "react-native";
import THEME from "../../theme";
import Stocks from "../../components/Stocks";
import Forex from "../../components/Forex";
import { v4 as uuidv4 } from "uuid";
import { Context } from "../../context";
import FilterBar from "../../components/FilterBar";
import { historicalForexDailyRate } from "../../services/currency";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Market() {
  const [refreshing, setRefreshing] = useState(false);
  const { stocks } = useContext(Context);
  const [activeFilter, setActiveFilter] = useState("Ações");
  const [forex, setForex] = useState([]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  async function getHistoricalForexDailyRate() {
    const data = await AsyncStorage.getItem('forex');

    if(data === null) {
      const response = await historicalForexDailyRate();
  
      await AsyncStorage.setItem('forex', JSON.stringify(response));

    } else {
      setForex(JSON.parse(data));
    }
  }

  useEffect(() => {
    getHistoricalForexDailyRate();
  }, []);

  const renderContent = () => {
    switch (activeFilter) {
      case "Ações":
        return (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  setTimeout(() => {
                    setRefreshing(false);
                    // getUserData();
                  }, 1000);
                }}
                tintColor={THEME.COLORS.WHITE}
              />
            }
            style={{ backgroundColor: THEME.COLORS.BLACK }}
            scrollEventThrottle={16}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <View>
                {stocks.map((stock) => (
                  <Stocks key={uuidv4()} item={stock} width={Dimensions.get("window").width - 30} />
                ))}
              </View>
            </View>
          </ScrollView>
        );
      case "Índices":
        return <View style={{ backgroundColor: THEME.COLORS.BLACK, flex: 1 }} />;
      case "Forex":
        return (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => {
                  setRefreshing(true);
                  setTimeout(() => {
                    setRefreshing(false);
                    // getUserData();
                  }, 1000);
                }}
                tintColor={THEME.COLORS.WHITE}
              />
            }
            style={{ backgroundColor: THEME.COLORS.BLACK }}
            scrollEventThrottle={16}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <View>
                {forex.map((forex) => (
                  <Forex key={uuidv4()} item={forex} width={Dimensions.get("window").width - 30} />
                ))}
              </View>
            </View>
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FilterBar activeFilter={activeFilter} onChangeFilter={handleFilterChange} />
      {renderContent()}
    </View>
  );
}
