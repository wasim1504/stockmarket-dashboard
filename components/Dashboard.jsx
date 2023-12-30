import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Picker,
  StyleSheet,
} from "react-native";
import { fetchFilteredData } from "./services/api";
import Chart from "./Chart";

const DashboardScreen = () => {
  const [symbol, setSymbol] = useState("");
  const [filter, setFilter] = useState("1m"); // Default filter is 1 month
  const [stockData, setStockData] = useState(null);

  const handleSearch = async () => {
    try {
      const data = await fetchFilteredData(symbol, filter);
      setStockData(data, filter);
    } catch (error) {
      console.error("Error fetching stock data:", error);
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
      <View style={styles.chartContainer}>
        {stockData && <Chart data={stockData} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
