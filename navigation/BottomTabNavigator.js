import React from 'react'
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigationState, createNavigationContainerRef } from '@react-navigation/native';

import { Color } from '../theme';
import ArticaleNavigator from './ArticaleNavigator';
import ProfileNavigator from './ProfileNavigator';
import ConcertNavigator from './ConcertNavigator';
import ChatNavigator from './ChatNavigator';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { height } = useWindowDimensions()

  return (
    <Tab.Navigator screenOptions={{

      tabBarHideOnKeyboard: true,
      tabBarLabel: () => {
        return null
      },
      tabBarStyle: {

        height: height * .10,
        backgroundColor: Color.colorGray_200,
        elevation: 0,
        shadowOpacity: 0,
        borderWidth: 0,
        borderColor: Color.colorGray_200
      },


    }}>
      <Tab.Screen
      
        name="Home Tab"
        component={ArticaleNavigator}
        initialParams='Home'
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            const routeName = useNavigationState(state =>
              state.routes[state.index]?.state?.routes[state.routes[state.index]?.state?.index]?.name
            );

            const isActive = routeName === 'Articale_Detail'

            return (<>
              {focused ? (

                <View style={{ alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <Image
                    source={require('../assets/app_icon/navigation/home.png')}
                    style={{ position: 'absolute' ,width: 23, height:27}}
                  />
                  {!isActive && (
                    <Image
                      source={require('../assets/img/bottomTab/Blur.png')}

                    />
                  )}
                </View>

              ) : ( <Image
                source={require('../assets/app_icon/navigation/home.png')}
                style={{width: 23, height:27}}
              />)}
            </>)
          },
          unmountOnBlur: true
        }}


 
      />
      <Tab.Screen
      
        name="Concert Tab"
        component={ConcertNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            const routeName = useNavigationState(state =>
              state.routes[state.index]?.state?.routes[state.routes[state.index]?.state?.index]?.name
            );

            const isActive = routeName === 'Concert_Detail'

            
            return (
              <>
                {focused ? (

                  <View style={{ alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <Image
                      source={require('../assets/app_icon/navigation/concert.png')}
                      style={{ position: 'absolute' ,width: 23, height:27}}
                    />
                    {!isActive && (
                      <Image
                        source={require('../assets/img/bottomTab/Blur.png')}

                      />
                    )}
                  </View>

                ) : (<Image
                  source={require('../assets/app_icon/navigation/concert.png')}
                  style={{width: 23, height:27}}
                />)}
              </>
            )
          },
          unmountOnBlur: true
        }}
      />


      <Tab.Screen
        name="Inbox Tab"
        component={ChatNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            const routeName = useNavigationState(state =>
              state.routes[state.index]?.state?.routes[state.routes[state.index]?.state?.index]?.name
            );



            const isActive = routeName === 'Group_Profile' && 'User_Profile';

            return (
              <>
                {focused ? (

                  <View style={{ alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <Image
                      source={require('../assets/app_icon/navigation/chat.png')}
                      style={{ position: 'absolute', width: 28, height:28 }}
                    />

                    {
                      !isActive && (
                        <Image
                          source={require('../assets/img/bottomTab/Blur.png')}

                        />
                      )
                    }

                  </View>

                ) : (<Image
                  source={require('../assets/app_icon/navigation/chat.png')}
                  style={{width: 28, height:28 }}
                />)}
              </>
            )
          },
        }}
      />


      <Tab.Screen
        name="Profile Tab"
        component={ProfileNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              {focused ? (

                <View style={{ alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <Image
                    source={require('../assets/app_icon/navigation/account.png')}
                    style={{ position: 'absolute', width: 26, height: 26 }}
                  />
                  <Image
                    source={require('../assets/img/bottomTab/Blur.png')}

                  />
                </View>

              ) : (<Image
                source={require('../assets/app_icon/navigation/account.png')}
                style={{ width: 26, height: 26 }}
              />)}
            </>
          ),
          unmountOnBlur: true
        }}
      />

    </Tab.Navigator>
  )
}

export default BottomTabNavigator

const styles = StyleSheet.create({})