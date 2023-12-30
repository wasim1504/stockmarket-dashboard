import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Picker,
  StyleSheet,
  FlatList,
} from "react-native";
import { fetchFilteredData, fetchTodayStockData } from "./services/api";
import Chart from "./Chart";

const DashboardScreen = () => {
  const [symbol, setSymbol] = useState("");
  const [filter, setFilter] = useState("1m");
  const [stockData, setStockData] = useState(null);
  const [latestData, setLatestData] = useState(null);

  const handleSearch = async () => {
    try {
      const data = await fetchFilteredData(symbol, filter);
      setStockData(data);
      fetchLatestData();
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const fetchLatestData = async () => {
    try {
      const data = await fetchTodayStockData(symbol);
      setLatestData(data);
    } catch (err) {
      console.error("Error fetching latest data", err);
    }
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  useEffect(() => {
    if (symbol) {
      handleSearch();
    }
  }, [symbol, filter]);

  const renderLatestData = () => {
    if (!latestData) return null;
    return (
      <View style={styles.tableContainer}>
        <Text>Stock Information</Text>
        <FlatList
          data={[latestData]}
          keyExtractor={(item) => item.companyName}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text>Company Name: {item.companyName}</Text>
              <Text>Last Open: {item.iexOpen}</Text>
              <Text>Last Close: {item.iexClose}</Text>
              <Text>Market Cap: {item.marketCap}</Text>
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter stock symbol"
          value={symbol}
          onChangeText={(text) => setSymbol(text)}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
      <View style={styles.filterContainer}>
        <Text>Filter:</Text>
        <Picker
          selectedValue={filter}
          style={styles.picker}
          onValueChange={handleFilterChange}
        >
          <Picker.Item label="1 Month" value="1m" />
          <Picker.Item label="2 Months" value="2m" />
          <Picker.Item label="3 Months" value="3m" />
        </Picker>
      </View>
      {renderLatestData()}
      <View style={styles.chartContainer}>
        {stockData && <Chart data={stockData} symbol={symbol} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    marginTop: 20,
  },
  tableRow: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingVertical: 8,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  searchBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: "70%",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  picker: {
    height: 40,
    width: 120,
  },
  chartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DashboardScreen;
