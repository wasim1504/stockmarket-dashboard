import React from "react";
import { LineChart } from "react-native-chart-kit";
import { View, Text, StyleSheet } from "react-native";

const StockChart = ({ data, symbol }) => {
  // Ensure that data is an array and not empty
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>No data available for the chart.</Text>
      </View>
    );
  }

  const xlabel = data.map((item) => item.priceDate);

  const ylabel = data.map((item) => item.close);

  console.log("x", xlabel);
  console.log("y", ylabel);

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 4,
  };

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{symbol}</Text>
      <LineChart
        data={{
          labels: xlabel,
          datasets: [
            {
              data: ylabel,
              color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            },
          ],
        }}
        width={300}
        height={200}
        yAxisLabel="$"
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderRadius: 10,
    padding: 16,
    marginVertical: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default StockChart;
