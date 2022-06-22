import { ScrollView, View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native'
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
            enableHighAccuracy: true,
            distanceFilter: 15000, // Meters
            desiredAccuracy: {
                ios: "best",
                android: "balancedPowerAccuracy"
            },
            // Android only
            androidProvider: "auto",
            interval: 5000, // Milliseconds
            fastestInterval: 10000, // Milliseconds
            maxWaitTime: 5000, // Milliseconds
            // iOS Only
            activityType: "other",
            allowsBackgroundLocationUpdates: false,
            headingFilter: 1, // Degrees
            headingOrientation: "portrait",
            pausesLocationUpdatesAutomatically: false,
            showsBackgroundLocationIndicator: false,
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
            else {
                Alert.alert('Ubicación cancelada por el usuario o por otra solicitud')
            }
        })
    }

    if (location.length == 0) {
        return (
            <View>
                <TouchableOpacity
                    onPress={
                        () => {
                            apiCall()
                        }
                    }
                    style={styles.button}>
                    <Text style={{ color: 'white', fontSize: 25, textAlign: 'center' }}>Activar GPS</Text>
                </TouchableOpacity>
            </View>

        )
    }
    return (
        <ScrollView contentContainerStyle={{
            alignItems: 'center',
            width: '100%'
        }}>
            <WeatherItem location={location} />
        </ScrollView>

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

export default Weather