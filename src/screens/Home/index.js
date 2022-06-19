import { SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import Weather from '../Weather';

const Index = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Weather />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Index