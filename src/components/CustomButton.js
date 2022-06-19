import React, { useState } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const CustomButton = ({ screenName, text }) => {
    const [loading, setLoading] = useState(false)
    const [counter, setCounter] = useState(0)
    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate(screenName)
        }} style={styles.button}>
            <Text style={{ color: 'white', fontSize: 19 }}>{text}</Text>
        </TouchableOpacity>
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

export default CustomButton