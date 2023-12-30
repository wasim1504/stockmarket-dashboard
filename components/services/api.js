import axios from "axios";
import toast from "react-hot-toast";
const baseUrl = "https://cloud.iexapis.com/stable";
const apiKey = "pk_ae81ce6b66064d9d90a964d771dcb026";

export async function fetchFilteredData(name, range = "1m") {
  const apiUrl = `${baseUrl}/stock/${name}/chart/${range}?token=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const data = await response.data;
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("Error filtering record", error.message);
  }
}

export async function fetchTodayStockData(name) {
  const apiUrl = `${baseUrl}/stock/${name}/quote?token=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const data = await response.data;
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("Error fetching today's data", error.message);
  }
}

export async function searchSymbol(query) {
  try {
    const url = `${baseUrl}/search/${query}?token=${apiKey}`;
    const response = await axios.get(url);
    const data = await response.json();
    console.log(data);
    if (!data) return toast.error("Stock information not found");
    return data[0].symbol;
  } catch (err) {
    throw new Error("Error fetching search symbol", err.message);
  }
}
