


import React, { useEffect } from 'react';
 
import { Chat, StartUpScreen } from '../screens'

import { createStackNavigator } from "@react-navigation/stack";
 

import BottomTabNavigator from './BottomTabNavigator';
import Introduction from '../screens/Introduction';
import {   useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
 
 

const Stack = createStackNavigator();

   

const AppNavigator = () => {
  const navigation = useNavigation();
 
  const isAuth = useSelector(state => state.auth.token !== null && state.auth.token !== ""  )
  
   
   
  const didTryAutoLogin =   useSelector(state => state.auth.didTryAutoLogin);
  const isNewUser = useSelector(state => state.auth.isNewUser);
   
  useEffect(() => {
    if (isAuth) {
      if (isNewUser) {
        navigation.navigate('Introduction');
      } else {
        navigation.navigate('Home');
      }
    } else {
      navigation.navigate('Login');
    }
  }, [isAuth, isNewUser, navigation]);
 

 

  return (
    <Stack.Navigator  >

         {!isAuth && didTryAutoLogin && (
      <>
       <Stack.Screen name="Auth"
          component={AuthNavigator}
          options={{ headerShown: false }}/>
      </>
    )}

    {!isAuth && !didTryAutoLogin && (
      <>
        <Stack.Screen name='Startup' component={StartUpScreen} options={{ headerShown: false }} />
      </>
    )}

    {isAuth && (
      <>
        <Stack.Screen name='Home' component={BottomTabNavigator} options={{ headerShown: false }} />
      
        <Stack.Screen name='Chat' component={Chat} options={{ headerShown: false }} />

        <Stack.Screen name='Introduction' component={Introduction} options={{ headerShown: false }} />
      </>
    )}
    </Stack.Navigator>
  )
}

export default AppNavigator