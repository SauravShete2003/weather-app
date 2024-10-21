import axios from "axios";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WEATHER_API_BASE_URL, WEATHER_API_KEY } from '@env';
import searchIcon from "@/assets/images/search-icon.png";
import weatherBackground from "@/assets/images/weather-background.png";
import modelBackground from "@/assets/images/model-background.png";
import tempLogo from "@/assets/images/logos/temp.png";
import descriptionLogo from "@/assets/images/logos/description .png";
import humidityLogo from "@/assets/images/logos/humidity.png";
import viewLogo from "@/assets/images/logos/view.png";
import windLogo from "@/assets/images/logos/wind.png";

const kelvinToCelsius = (kelvin: number) => {
  return (kelvin - 273.15).toFixed(2);
};

const metersToKilometers = (meters: number) => {
  return (meters / 1000).toFixed(2);
};

export default function Index() {
  const [city, setCity] = useState("ahmednagar");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadWeatherData = async () => {
    if (!city) {
      alert("Please enter a city name.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.get(`${WEATHER_API_BASE_URL}?q=${city}&appid=${WEATHER_API_KEY}`);

      if (data.list && data.list.length > 0) {
        setWeatherData(data.list[0]);
        setIsModalVisible(true);
      } else {
        alert("No weather data found for the entered city.");
      }
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "An error occurred while fetching data."
      );
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
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
        <ActivityIndicator
          size={"large"}
          color={"#000"}
          style={style.loader}
          animating={loading}
        />

        <Modal
          animationType="slide"
          visible={isModalVisible}
          transparent={false}
        >
          <View style={style.modalContainer}>
            <Image source={modelBackground} style={style.weatherBackground} />
            <TouchableOpacity
              style={style.closeBtn}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={{ fontSize: 20, color: "#fff", fontWeight: "bold" }}>
                Close
              </Text>
            </TouchableOpacity>

            <View style={style.modalTextContainer}>
              <Text style={style.modalCity}>{city}</Text>
            </View>

            {weatherData && weatherData.main && (
              <View style={style.modalContent}>
                <View style={style.detailsContainer}>
                  <Image source={tempLogo} style={style.logo} />
                  <Text style={style.tempature}>
                    {kelvinToCelsius(weatherData.main.feels_like)}°C
                  </Text>
                </View>

                <View style={style.detailsContainer}>
                  <Image source={descriptionLogo} style={style.logo} />
                  <Text style={style.description}>
                    {weatherData.weather[0].description}
                  </Text>
                </View>
                <View style={style.detailsContainer}>
                  <Image source={humidityLogo} style={style.logo} />
                  <Text style={style.weatherContain}>
                    Humidity: {weatherData.main.humidity}%
                  </Text>
                </View>
                <View style={style.detailsContainer}>
                  <Image source={windLogo} style={style.logo} />
                  <Text style={style.weatherContain}>
                    Wind: {weatherData.wind.speed} m/s
                  </Text>
                </View>
                <View style={style.detailsContainer}>
                  <Image source={viewLogo} style={style.logo} />
                  <Text style={style.weatherContain}>
                    visibility : {metersToKilometers(weatherData.visibility)}{" "}
                    k/m
                  </Text>
                </View>
              </View>
            )}
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}

const style = StyleSheet.create({
  weatherBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
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
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 5,
    width: "90%",
    marginHorizontal: "5%",
  },

  searchInput: {
    fontSize: 18,
    paddingLeft: 15,
    color: "#333",
    flex: 1,
  },

  searchIcon: {
    width: 30,
    height: 30,
    tintColor: "#555",
  },

  loader: {
    position: "absolute",
    top: "25%",
    left: "44%",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  modalTextContainer: {
    position: "absolute",
    top: "7%",
    width: "80%",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },

  modalCity: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#fff",
    paddingBottom: 5,
    marginBottom: 10,
  },

  closeBtn: {
    position: "absolute",
    bottom: "5%",
    right: "10%",
    padding: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    backgroundColor: "#1a0000",
  },

  modalContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 20,
  },

  weatherContain: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
  },

  description: {
    color: "#fff",
    fontSize: 20,
    textTransform: "capitalize",
    textAlign: "center",
  },

  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginBottom: 10,
  },

  detailsContainer: {
    width: "45%",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
    margin: 8,
    backgroundColor: "#1a0000",
  },

  tempature: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
});
