import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen, SecondPage, ThirdPage, FourthPage} from './src/screens'
import {decode, encode} from 'base-64'



if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {(
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Second" component={SecondPage} />
            <Stack.Screen name="Third" component={ThirdPage} />
            <Stack.Screen name="Fourth" component={FourthPage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}