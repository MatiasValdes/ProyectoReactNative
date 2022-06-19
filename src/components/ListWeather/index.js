import { View, Text, SafeAreaView, Dimensions, Image } from 'react-native'
import React from 'react'
import moment from 'moment'
const width = Dimensions.get('window').width

const ListWeather = ({ weather }) => {
    return (
        <SafeAreaView>
            <View style={{ alignItems: 'center', padding: 20 }}>
                <Text style={{ marginTop: 8, fontSize: 20, fontWeight: '900' }}>Pronóstico para el Día: {moment(weather.Date).format('DD/MM/YYYYY')}</Text>
                <Text style={{ marginTop: 8, fontSize: 16, fontWeight: '800' }}>
                    Temperatura Min: {weather.Temperature.Minimum.Value} {weather.Temperature.Minimum.Unit} - Temperatura Max: {weather.Temperature.Maximum.Value} {weather.Temperature.Maximum.Unit}
                </Text>
            </View>
            <View style={{ alignItems: 'center', padding: 20 }}>
                <Text style={{ marginTop: 8, fontSize: 16, fontWeight: '800' }}>Pronóstico durante el día: {weather.Day.IconPhrase}</Text>
                <Image
                    source={{ uri: `https://developer.accuweather.com/sites/default/files/${weather.Day.Icon < 10 ? "0" + weather.Day.Icon : weather.Day.Icon}-s.png` }}
                    style={{ height: 200, width: width * 0.9, borderRadius: 5 }}
                />
                <Text style={{ marginTop: 8, fontSize: 16, fontWeight: '800' }}>Precipitaciones: {weather.Day.HasPrecipitation ? "Sí" : "No"}</Text>
            </View>
            <View style={{ alignItems: 'center', padding: 20 }}>
                <Text style={{ marginTop: 8, fontSize: 16, fontWeight: '800' }}>Pronóstico durante el Noche: {weather.Night.IconPhrase}</Text>
                <Image
                    source={{ uri: `https://developer.accuweather.com/sites/default/files/${weather.Night.Icon < 10 ? "0" + weather.Night.Icon : weather.Night.Icon}-s.png` }}
                    style={{ height: 200, width: width * 0.9, borderRadius: 5 }}
                />
                <Text style={{ marginTop: 8, fontSize: 16, fontWeight: '800' }}>Precipitaciones: {weather.Night.HasPrecipitation ? "Sí" : "No"}</Text>
            </View>
        </SafeAreaView>
    )
}

export default ListWeather