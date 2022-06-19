import { Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useRef, useContext } from 'react'
import { useCameraDevices, Camera } from 'react-native-vision-camera'
import { AuthContext } from '../../navigation'

const Index = () => {
    const { setPhoto, photo } = useContext(AuthContext)
    const camera = useRef()
    const devices = useCameraDevices()
    const device = devices.front

    if (device == null) return (<ActivityIndicator size="large" />)

    const doPhoto = async () => {
        const photoLocal = await camera.current.takeSnapshot({});
        setPhoto(photoLocal);
    };

    return (
        <>
            <Camera
                ref={camera}
                photo={true}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
            />
            <TouchableOpacity
                onPress={doPhoto}
            >
                <Text>Take Photo</Text>
            </TouchableOpacity>
        </>
    )
}

export default Index