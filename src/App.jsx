
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home'
import MovieScreen from './screens/MovieScreen'
import PersonScreen from './screens/PersonScreen'
import SearchScreen from './screens/SearchScreen'


const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' options={{ headerShown: false }} component={Home} />
        <Stack.Screen name='Movie' options={{ headerShown: false }} component={MovieScreen} />
        <Stack.Screen name='Person' options={{ headerShown: false }} component={PersonScreen} />
        <Stack.Screen name='Search' options={{ headerShown: false }} component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App