import { View, Text, SafeAreaView, Dimensions, Image } from 'react-native'
import React from 'react'
import moment from 'moment'
const width = Dimensions.get('window').width
import { AppBar, Divider } from "@react-native-material/core"

const ListWeather = ({ weather }) => {
    const parseFahrenheitToCelsius = (Fahrenheit) => {
        return Math.round((Fahrenheit - 32) * (5 / 9))
    }
    return (
        <SafeAreaView style={{ width: '100%' }}>
            <AppBar
                title={moment(weather.Date).format('DD/MM/YYYY')}
            // subtitle={dataLocation.LocalizedName}
            // centerTitle={true}
            />
            <View style={{ alignItems: 'center', padding: 10 }}>
                <Text variant="h6">Min: {parseFahrenheitToCelsius(weather.Temperature.Minimum.Value)}° - Max: {parseFahrenheitToCelsius(weather.Temperature.Maximum.Value)}°</Text>
            </View>
            <Divider style={{ marginTop: 2 }} />
            <View style={{ flexDirection: 'row', paddingTop: 20, paddingBottom: 20 }}>
                <View style={{ alignItems: 'center' }}>
                    <Text variant="subtitle1">Día</Text>
                    <Image
                        source={{ uri: `https://developer.accuweather.com/sites/default/files/${weather.Day.Icon < 10 ? "0" + weather.Day.Icon : weather.Day.Icon}-s.png` }}
                        style={{ height: 100, width: width * 0.5, borderRadius: 5 }}
                    />
                    <Text variant="h6">{weather.Day.IconPhrase}</Text>
                    <Text variant="overline">Precipitaciones: {weather.Day.HasPrecipitation ? "Sí" : "No"}</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Text variant="subtitle1">Noche</Text>
                    <Image
                        source={{ uri: `https://developer.accuweather.com/sites/default/files/${weather.Night.Icon < 10 ? "0" + weather.Night.Icon : weather.Night.Icon}-s.png` }}
                        style={{ height: 100, width: width * 0.5, borderRadius: 5 }}
                    />
                    <Text variant="h6">{weather.Night.IconPhrase}</Text>
                    <Text variant="overline">Precipitaciones: {weather.Night.HasPrecipitation ? "Sí" : "No"}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ListWeather