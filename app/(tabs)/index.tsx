import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, ScrollView, Text, View } from "react-native";

const API_KEY = "apikey here";

export default function Weather() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}&aqi=no`
        );
        const data = await response.json();
        setWeather(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        Alert.alert("Error", "Could not connect to weather service.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-slate-900">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-4 dark:text-gray-400">Finding your location...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white dark:bg-slate-900">
      <View className="p-8 items-center mt-10">
        
        {weather ? (
          <>
            <Text className="text-gray-500 dark:text-gray-400 text-lg font-medium">
              {weather.location.name}, {weather.location.region}
            </Text>
            
            <Image 
              source={{ uri: `https:${weather.current.condition.icon}` }} 
              className="w-32 h-32"
            />
            
            <Text className="text-7xl font-bold dark:text-white">
              {Math.round(weather.current.temp_f)}°F
            </Text>
            
            <Text className="text-xl text-gray-600 dark:text-gray-300 mt-2">
              {weather.current.condition.text}
            </Text>

            <View className="flex-row mt-10 w-full justify-around bg-gray-50 dark:bg-slate-800 p-6 rounded-3xl">
              <View className="items-center">
                <Text className="text-gray-400 text-xs uppercase">Humidity</Text>
                <Text className="font-bold dark:text-white">{weather.current.humidity}%</Text>
              </View>
              <View className="items-center">
                <Text className="text-gray-400 text-xs uppercase">Wind</Text>
                <Text className="font-bold dark:text-white">{weather.current.wind_mph} mph</Text>
              </View>
              <View className="items-center">
                <Text className="text-gray-400 text-xs uppercase">Feels Like</Text>
                <Text className="font-bold dark:text-white">{Math.round(weather.current.feelslike_f)}°F</Text>
              </View>
            </View>
          </>
        ) : (
          <Text className="dark:text-white">{errorMsg || "Unable to load weather"}</Text>
        )}
      </View>
    </ScrollView>
  );
}