import axios from "axios";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import searchIcon from "@/assets/images/search-icon.png";
import weatherBackground from "@/assets/images/weather-background.png";

export default function Index() {
  const [city, setCity] = useState("pune");
  const [weatherData, setWeatherData] = useState({});

  const loadWeatherData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=fa93a6f0add82945286b4ba23431eb8c`
      );
    } catch (error: any) {
      alert(error?.response?.data?.message);
    }
  };

  // useEffect(() => {
  //   loadWeatherData();
  // }, [city]);
  return (
    <View style={style.weatherContainer}>
      <SafeAreaView>
        <Image source={weatherBackground} style={style.weatherBackground} />
        <Text style={style.heading}>Weather App ☁️</Text>
        <View style={style.searchContainer}>
          <TextInput
            placeholder="Enter City"
            style={style.searchInput}
            value={city}
            onChangeText={(text) => setCity(text)}
          />
          <TouchableOpacity onPress={loadWeatherData}>
            <Image source={searchIcon} style={style.searchIcon} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const style = StyleSheet.create({
  weatherBackground: {
    width: "100%",
    height: "100%"
  },
  
  weatherContainer: {
    position: "relative",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#fff",
    marginTop: 20,
    position: "absolute",
    top: "3%",
    left: "22%",
  },

  searchContainer: {
    position: "absolute",
    top: "15%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    paddingVertical: 12,  
    paddingHorizontal: 20, 
    borderRadius: 30,  
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 5 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 10,
    elevation: 8,  
    width: "90%",
    marginHorizontal: "5%", 
  },
  
  searchInput: {
    fontSize: 18, 
    paddingLeft: 15,  
    color: "#333",  
  },
  
  searchIcon: {
    width: 30, 
    height: 30,
    tintColor: "#555",  
  },
  
});
