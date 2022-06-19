import React, { useState, createContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from './StackNavigator'

export const CartContext = createContext({})
export const AuthContext = createContext({})
export const ApiKeyContext = createContext('')

const index = () => {
    const [photo, setPhoto] = useState();
    const [auth, setAuth] = useState(false)
    const [apiKey, setApiKey] = useState('akYKZk8aO5VfbTaFUcmF45rNGy3hOdBy')

    return (
        <AuthContext.Provider value={{ auth, setAuth, photo, setPhoto }}>
            <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>
                <NavigationContainer>
                    <StackNavigator />
                </NavigationContainer>
            </ApiKeyContext.Provider>
        </AuthContext.Provider>
    )
}

export default index