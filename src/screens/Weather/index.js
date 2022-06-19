import { ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import RNLocation from 'react-native-location'
import WeatherItem from '../../components/WeatherItem'

const Weather = () => {
    const [location, setLocation] = useState([])

    useEffect(() => {
        apiCall()
    }, [])

    const apiCall = () => {
        RNLocation.configure({
            distanceFilter: 100, // Meters
            desiredAccuracy: {
                ios: "best",
                android: "balancedPowerAccuracy"
            },
        })

        RNLocation.requestPermission({
            ios: "whenInUse",
            android: {
                detail: "coarse"
            }
        }).then(granted => {
            if (granted) {
                RNLocation.subscribeToLocationUpdates(locations => {
                    setLocation(locations)
                })
            }
        })
    }

    if (location.length == 0) return (<ActivityIndicator size="large" />)

    return (
        <ScrollView contentContainerStyle={{
            alignItems: 'center',
            width: '100%'
        }}>
            <WeatherItem location={location} />
        </ScrollView>

    )
}

export default Weather