import { Text, View, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import ListWeather from '../../components/ListWeather'
import { ApiKeyContext } from '../../navigation'
import { useRoute } from '@react-navigation/native'
const axios = require('axios').default

const Details = () => {
  const route = useRoute()
  const key = route?.params
  const [data, setData] = useState([])
  const { apiKey, setApiKey } = useContext(ApiKeyContext)

  useEffect(() => {
    callApi()
  }, [])

  const callApi = () => {
    axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${apiKey}&language=es-us`)
      .then(response => {
        setData(response.data.DailyForecasts)
      })
      .catch(error => {
        console.log("error data 5day")
      })
  }

  if (data.length == 0) return (<ActivityIndicator size="large" />)

  return (
    <ScrollView contentContainerStyle={{
      alignItems: 'center',
      width: '100%'
    }}>

      {
        data.map((item, index) => {
          return (
            <View key={index}>
              <ListWeather weather={item} />
            </View>
          )
        })
      }
    </ScrollView>
  )
}

export default Details