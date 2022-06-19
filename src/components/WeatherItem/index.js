import { View, Text, ActivityIndicator, SafeAreaView, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ApiKeyContext } from '../../navigation'
const axios = require('axios').default

const width = Dimensions.get('window').width

const WeatherItem = ({ location }) => {
  const [weather, setWeather] = useState([])
  const [key, setKey] = useState(null)
  const navigation = useNavigation()
  const { apiKey, setApiKey } = useContext(ApiKeyContext)

  useEffect(() => {
    apiCall()
  }, [location])

  useEffect(() => {
    if (key) apiWeatherDayofDaily(key)
  }, [key])

  const apiCall = () => {
    axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${location[0].latitude}%2C${location[0].longitude}`)
      .then(response => {
        setKey(response.data.Key)
      })
      .catch(error => {
        console.log("error get key")
      })
  }

  const apiWeatherDayofDaily = (value) => {
    axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${value}?apikey=${apiKey}&language=es-us`)
      .then(response => {
        setWeather(response.data.DailyForecasts)
      })
      .catch(error => {
        console.log("error ", error)
      })
  }

  if (weather.length == 0) return (<ActivityIndicator size="large" />)

  return (
    <SafeAreaView>
      <View style={{ alignItems: 'center', padding: 20 }}>
        <Text style={{ marginTop: 8, fontSize: 20, fontWeight: '900' }}>Pronóstico para hoy</Text>
        <Text style={{ marginTop: 8, fontSize: 16, fontWeight: '800' }}>
          Temperatura Min: {weather[0].Temperature.Minimum.Value} {weather[0].Temperature.Minimum.Unit} - Temperatura Max: {weather[0].Temperature.Maximum.Value} {weather[0].Temperature.Maximum.Unit}
        </Text>
      </View>
      <View style={{ alignItems: 'center', padding: 16 }}>
        <Text style={{ marginTop: 8, fontSize: 16, fontWeight: '800' }}>Pronóstico durante el Día: {weather[0].Day.IconPhrase}</Text>
        <Image
          source={{ uri: `https://developer.accuweather.com/sites/default/files/${weather[0].Day.Icon < 10 ? "0" + weather[0].Day.Icon : weather[0].Day.Icon}-s.png` }}
          style={{ height: 200, width: width * 0.9, borderRadius: 5 }}
        />
        <Text style={{ marginTop: 8, fontSize: 16, fontWeight: '800' }}>Precipitaciones: {weather[0].Day.HasPrecipitation ? "Sí" : "No"}</Text>
      </View>
      <View style={{ alignItems: 'center', padding: 20 }}>
        <Text style={{ marginTop: 8, fontSize: 16, fontWeight: '800' }}>Pronóstico durante la Noche: {weather[0].Night.IconPhrase}</Text>
        <Image
          source={{ uri: `https://developer.accuweather.com/sites/default/files/${weather[0].Night.Icon < 10 ? "0" + weather[0].Night.Icon : weather[0].Night.Icon}-s.png` }}
          style={{ height: 200, width: width * 0.9, borderRadius: 5 }}
        />
        <Text style={{ marginTop: 8, fontSize: 16, fontWeight: '800' }}>Precipitaciones: {weather[0].Night.HasPrecipitation ? "Sí" : "No"}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={
          () => {
            navigation.navigate("Details", key)
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