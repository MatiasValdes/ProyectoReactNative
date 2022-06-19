import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../navigation'
import { Camera } from 'react-native-vision-camera'

const Login = () => {
  const [userText, setUserText] = useState()
  const [userPassword, setUserPassword] = useState()
  const navigation = useNavigation()
  const { auth, setAuth, photo } = useContext(AuthContext)

  const fielFull = userText && userPassword ? false : true

  return (
    <SafeAreaView>

      <View style={{ height: '85%', justifyContent: 'center', padding: 40 }}>
        <View style={{justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={{ uri: `file:///${photo?.path}` }}
            style={{ height: 200, width: 200, borderRadius: 5 }}
          />
        </View>
        <TextInput
          style={{ borderBottomWidth: 1, marginVertical: 5 }}
          placeholder='Usuario'
          onChangeText={e => setUserText(e)}
        />
        <TextInput
          secureTextEntry
          style={{ borderBottomWidth: 1, marginVertical: 5 }}
          placeholder='Password'
          onChangeText={e => setUserPassword(e)}
        />
        <TouchableOpacity
          onPress={() => {
            setAuth(true)
            navigation.navigate('Weather')
          }}
          disabled={fielFull}
          style={{
            backgroundColor: 'black',
            padding: 8,
            borderRadius: 5,
            width: '50%',
            alignItems: 'center',
            marginTop: 10,
            alignSelf: 'center',
          }}>
          <Text style={{ color: 'white' }}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            const newCameraPermission = await Camera.requestCameraPermission();
            const newMicrophonePermission =
              await Camera.requestMicrophonePermission();
            const cameraPermission = await Camera.getCameraPermissionStatus();
            const microphonePermission =
              await Camera.getMicrophonePermissionStatus();
            navigation.navigate('Camera')
          }}
          style={{
            backgroundColor: 'black',
            padding: 8,
            borderRadius: 5,
            width: '50%',
            alignItems: 'center',
            marginTop: 10,
            alignSelf: 'center',
          }}>
          <Text style={{ color: 'white' }}>Subir Foto</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Login