import { View, Text, ActivityIndicator, SafeAreaView, Image, Dimensions, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ApiKeyContext } from '../../navigation'
const axios = require('axios').default
import { AppBar, Divider } from "@react-native-material/core"

const width = Dimensions.get('window').width

const WeatherItem = ({ location }) => {
  const [weather, setWeather] = useState([])
  const [dataLocation, setDataLocation] = useState(null)
  const navigation = useNavigation()
  const { apiKey, setApiKey } = useContext(ApiKeyContext)

  useEffect(() => {
    apiCall()
  }, [location])

  useEffect(() => {
    if (dataLocation) apiWeatherDayofDaily(dataLocation.Key)
  }, [dataLocation])

  const parseFahrenheitToCelsius = (Fahrenheit) => {
    return Math.round((Fahrenheit - 32) * (5 / 9))
  }

  const apiCall = () => {
    axios.get(`https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${location[0].latitude}%2C${location[0].longitude}`)
      .then(response => {
        setDataLocation(response.data)
      })
      .catch(error => {
        Alert.alert(`error get key ${error}`)
        console.log("error get key ", error)
      })
  }

  const apiWeatherDayofDaily = (value) => {
    axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/1day/${value}?apikey=${apiKey}&language=es-us`)
      .then(response => {
        setWeather(response.data.DailyForecasts)
      })
      .catch(error => {
        Alert.alert(`error get WeatherDay ${error}`)
        console.log("Error get WeatherDay ", error)
      })
  }

  if (weather.length == 0) return (<ActivityIndicator size="large" />)

  return (
    <SafeAreaView style={{ width: '100%' }}>
      <AppBar
        title="Pronóstico para hoy en"
        subtitle={dataLocation.LocalizedName}
        centerTitle={true}
      />
      <View style={{ alignItems: 'center', padding: 20 }}>
        <Text variant="h6">Min: {parseFahrenheitToCelsius(weather[0].Temperature.Minimum.Value)}° - Max: {parseFahrenheitToCelsius(weather[0].Temperature.Maximum.Value)}°</Text>
      </View>
      <Divider style={{ marginTop: 2 }} />

      <View style={{ flexDirection: 'row', paddingTop: 20, paddingBottom: 20 }}>
        <View style={{ alignItems: 'center' }}>
          <Text variant="subtitle1">Día</Text>
          <Image
            source={{ uri: `https://developer.accuweather.com/sites/default/files/${weather[0].Day.Icon < 10 ? "0" + weather[0].Day.Icon : weather[0].Day.Icon}-s.png` }}
            style={{ height: 100, width: width * 0.5, borderRadius: 5 }}
          />
          <Text variant="h6">{weather[0].Day.IconPhrase}</Text>
          <Text variant="overline">Precipitaciones: {weather[0].Day.HasPrecipitation ? "Sí" : "No"}</Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <Text variant="subtitle1">Noche</Text>
          <Image
            source={{ uri: `https://developer.accuweather.com/sites/default/files/${weather[0].Night.Icon < 10 ? "0" + weather[0].Night.Icon : weather[0].Night.Icon}-s.png` }}
            style={{ height: 100, width: width * 0.5, borderRadius: 5 }}
          />
          <Text variant="h6">{weather[0].Night.IconPhrase}</Text>
          <Text variant="overline">Precipitaciones: {weather[0].Night.HasPrecipitation ? "Sí" : "No"}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={
          () => {
            navigation.navigate("Details", dataLocation.Key)
          }
        }>
        <Text style={{ color: 'white', fontSize: 25, textAlign: 'center' }}>Ver los próximos 5 días</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    marginHorizontal: 35
  }
})

export default WeatherItem